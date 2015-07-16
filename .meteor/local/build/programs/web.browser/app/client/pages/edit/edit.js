(function(){_parentDep = new Tracker.Dependency;
Template.edit.events({
	'click .remove_article': function(e) {
		var t = $(e.currentTarget);
		var id = t.attr('data-id');
		var title = (t.attr('data-title').length > 0) ? t.attr('data-title') : null;
		if(!title) console.log('Article unsaved - cannot delete. Continued anyway.');
		console.log(id,title);
		var c = confirm('Are you sure you want to delete this article \"' + title + '\"?');
		if (c) {
			c = Meteor.call('remove_article',id);
			notifier('Article Removed','success');
			console.log('Removed Article', id, c);
			Router.go('landing');
		}
	},
	'mouseup .edit': function(e) {
		if (!$('#parent').is(':focus') && $(e.currentTarget).attr('class') !== 'parent_select')
			$('#parent_search').hide();
	},
	'keyup #parent': function(e) {
		// 38 - Up .. 40 - Down .. 13 - Enter/Return
		var key = e.keyCode;
		var selected;
		switch (key){
			case 38:	// Up Arrow
				if(!selected)
					selected = 0;
				break;
			case 40:	// Down Arrow
				
				break;
			case 13:	// Return/Enter
				
				break;
			default:
				_parentDep.changed();
				break;
		}
	},
	'mouseup #openUploads': function(e){
		$('.lightbox').show();
	},
	'mouseup .lightbox,mouseup .close_uploads': function(e){
		var t = $(e.target);
		var tClass = t.attr('class');
		if(tClass && (tClass.indexOf('lightbox') >= 0 || tClass.indexOf('close_uploads')) >= 0){
			$('.lightbox').hide();
		}
	},
	'mouseup .parent_select': function(e) {
		var t = $(e.currentTarget);
		$('#parent').val(t.attr('data-title'));
		$('#parent_id').val(t.attr('data-id'));
		$('#parent_search').hide();
	},
	'mouseup #prereq_controls #new': function() {
		UI.render(Template.prereqEdit, $('div.prereq')[0]);
	},
	'mouseup #steps_controls #new': function() {
		UI.render(Template.stepEdit, $('div.steps')[0]);
	},
	'change #add_prereq': function(e) {
		if ($(e.currentTarget).prop('checked') === true)
			$('#prereq').show();
		else
			$('#prereq').hide();
	},
	'keyup .step .note-editable': function(e){
		var jq_ns = $(e.currentTarget).parents('.step');
		var ea = jq_ns.find('.editArea').code().trim().replace(/(\r\n|\n|\r)/gm,"");
		var cm = jq_ns.find('.compare_me').val().trim().replace(/(\r\n|\n|\r)/gm,"");
		var un = jq_ns.find('.unsaved_notifier');
		if(ea.length !== cm.length){
			un.show();
			if($('#article_title').val().length > 0)
				update_title('*Edit: ' + $('#article_title').val() + ' -',false,true);
			else
				update_title('*New Document -',false,true);
			settings.saved = false;
		}else{
			if(ea !== cm){
				un.show();
				if($('#article_title').val().length > 0)
					update_title('*Edit: ' + $('#article_title').val() + ' -',false,true);
				else
					update_title('*New Document -',false,true);
				settings.saved = false;
			}else
				un.hide();
		}
	},
	'click .fa-save': function() {
		var articleStatus = parseInt($('#statusSelect').val());
		var articleTitle = $('#article_title').val();
		var group_order = ($('#article_sort_number').val()) ? parseInt($('#article_sort_number').val()) : 1;
		if(articleTitle.length > 0)
			update_title('Edit: ' + articleTitle + ' -',false,true);
		else
			update_title('New Document -',false,true);
		var q = {
			// creator_id: Meteor.userId(), // Set serverside 
			title: articleTitle,
			parent: {
				_id: $('#parent_id').val(),
				title: $('#parent').val(),
				group_order: group_order
			},
			status: articleStatus,
			// last_updated: new Date().getTime(), // Set Serverside
			prereq_enable: $('#add_prereq').prop('checked'),
			steps: [],
			prereq: []
		};
		var text = $('.editArea');
		var titles = [];
		for(var i = 0; i < text.length; i++){
			var gotHtml = text.eq(i).code();
			text.eq(i).siblings('.compare_me').val(gotHtml);
			q.steps.push({
				_id: new Meteor.Collection.ObjectID(),
				title: text.eq(i).siblings('.edit_step_title').val(),
				text: {
					htmlcode: gotHtml
				}
			});
		}
		if (q.prereq_enable) {
			$('#prereq input').each(function() {
				var t = $(this);
				q.prereq.push({
					_id: new Meteor.Collection.ObjectID(),
					text: t.val()
				});
			});
		}
		q.last_updated_by = Meteor.userId();
		console.log('Saved:',q);
		Meteor.call('post_article', $('#article_id').val(), q, function(e, r) {
			if (e)
				console.log('error posting article',e, r);
			else {
				if(r){
					settings.saved = true;
					notifier('Article Saved','success');
				}else
					console.log('There was a problem with the insert..', e, r);
			}
		});
	}
});
Template.edit.helpers({
	'setArticleId': function() {
		if (typeof this._id !== 'undefined' && this._id !== null)
			return this._id.toHexString();
		else
			return document.URL.split('/').pop();
	},
	'parentSearch': function() {
		_parentDep.depend();
		var v = $('#parent').val();
		if (v) {
			$('#parent_search').show();
			var a = [];
			var tmp = [];
			var q = articles.find({
				'parent.title': {
					$regex: v,
					$options: 'i'
				}
			}, {
				sort: {
					'parent.title': 1
				}
			}).fetch();
			for (var i = 0; i < q.length; i++) {
				tmp[q[i].parent.title] = true;
			}
			for (var p in tmp) {
				if (p !== v) {
					a.push({
						parent: {
							title: p
						}
					});
				}
			}
			return (a.length !== 0) ? a : false;
		} else {
			$('#parent_search').hide();
			return false;
		}
	},
	'checkPrereq': function(b) {
		if (!b){
			$('#prereq').hide();
			return false;
		} else {
			$('#prereq').show();
			return true;
		}
	},
	'rendered': function() {
		if ($('#add_prereq').prop('checked') === true)
			$('#prereq').show();
		else
			$('#prereq').hide();
	},
	'isSelected': function(s,v){
		if(s == v)
			return 'selected';
	}
});
Template.edit.rendered = function(){
	// Set title
	if(!this.data.title)
		update_title('New Document -',false,true);
	else
		update_title('Edit: ' + this.data.title + ' -',false,true);
	// Ctrl+s save feature
	$(window).keydown(function(e) {
		if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
			console.log('Ctrl+S');
			e.preventDefault();
			$('#save').trigger('click');
		}
	});
	// Set prereq display status
	var showPrereq = $('#add_prereq').prop('checked');
	if(!showPrereq)
		$('#prereq').hide();
	// Prevent random page leaves if unsaved - From: Open.js
	window.onbeforeunload = function(e) {
		if(!settings.saved){
			if(!e) e = window.event;
			// e.cancelBubble is supported by IE - this will kill the bubbling process.
			e.cancelBubble = true;
			e.returnValue = 'You have unsaved changes. Leave without saving?'; //This is displayed on the dialog
			// e.stopPropagation works in Firefox.
			if (e.stopPropagation){
				e.stopPropagation();
				e.preventDefault();
			}
		}
	};
};
Template.edit.created = function(){
	// Instantiate global mobile browser check to global var jQuery.browser.mobile
	settings.saved = true;
	if(jQuery.browser.mobile){
		notifier('Edit is disalbed in mobile','error');
		Router.go('landing');
	}
};

})();
