(function(){_parentDep = new Deps.Dependency;
Template.edit.events({
	'click .edit': function(e) {
		//alert('edit->click .edit');
		if (!$('#parent').is(':focus') && $(e.currentTarget).attr('class') !== 'parent_select')
			$('#parent_search').hide();
	},
	//	'mouseenter .ephox-polish-editor-container': function(e){
	//		var t1 = $(e.currentTarget)[0];
	//		var t2 = textboxio.getActiveEditor().element();
	//		if($(t1).attr('aria-label') === $(t2).attr('aria-label')){
	//			//console.log($(t1).attr('class'));
	//			if($(t1).attr('class').indexOf('ephox-polish-fullscreen-maximized') >= 0){
	//				$(t1).height($(document).height());
	//				$(t1).find('.ephox-hare-content-iframe').height($(document).height());
	//			}else
	//				console.log('fk..');
	//		}
	//	},
	'keyup #parent': function(e) {
		_parentDep.changed();
	},
	'click #openUploads': function(e){
		$('.lightbox').show();
	},
	'click .lightbox,click .close_uploads': function(e){
		var t = $(e.target);
		console.log(t.attr('class'));
		if(t.attr('class').indexOf('lightbox') >= 0 || t.attr('class').indexOf('close_uploads') >= 0){
			$('.lightbox').hide();
		}
	},
	'mouseenter .edit': function(){
		$('.top_bar').css({'z-index':'10'});
	},
	'click .editArea': function(e) {
		//alert('edit->click #editArea');
		var t = $(e.currentTarget);
		console.log(t);
		var w = $(document).width();
		var dh = $(document).height();
		var h = t.height();
		var css = {
			ui: {
				toolbar: {
					items: ['undo', 'insert', 'style', 'emphasis', 'align', 'listindent', 'format', 'tools']
				}
			},
			css: {
				stylesheets: ['/css/tbio.css'],
				styles: [{
					rule: 'p',
					text: 'block.p'
				}, {
					rule: 'h1',
					text: 'block.h1'
				}, {
					rule: 'h2',
					text: 'block.h2'
				}, {
					rule: 'h3',
					text: 'block.h3'
				}, {
					rule: 'h4',
					text: 'block.h4'
				}, {
					rule: 'div',
					text: 'block.div'
				}, {
					rule: 'pre',
					text: 'block.pre'
				}]
			},
			paste: {
				style: 'prompt'
			}

		}
		if (w > 640) {
			console.log('> 640');
			if (typeof tbio !== 'undefined') {
				if (Array.isArray(tbio)) {
					for (var i = 0; i < tbio.length; i++) {
						console.log('tbio[' + i + '] restored');
						tbio[i].restore();
					}
					tbio = textboxio.replace(t[0],css);
					t.children().find('iframe').height(h);
				} else if (t.children().find('iframe').contents()[0] !== tbio.content.documentElement()) {
					tbio.restore();
					tbio = textboxio.replace(t[0],css);
					t.children().find('iframe').height(h);
				} else {
					return false;
				}
			} else {
				tbio = textboxio.replace(t[0],css);
				t.children().find('iframe').height(h);
			}
			t.children().find('iframe').contents().find('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />');
			t.children().find('iframe').contents().find('body').mouseenter(function(){
				$('.top_bar').css({'z-index':'0'});
			});
		}else{
			console.log('! > 640');
			if (typeof tbio !== 'undefined') {
				if (Array.isArray(tbio)) {
					for (var i = 0; i < tbio.length; i++) {
						tbio[i].restore();
					}
					tbio = textboxio.replace(t[0],css);
				} else if (t.children().find('iframe').contents()[0] !== tbio.content.documentElement()) {
					tbio.restore();
					tbio = textboxio.replace(t[0],css);
				} else {
					return false;
				}
			} else {
				console.log('no tbio - now there is');
				tbio = textboxio.replace(t[0],css);
			}
			t.children().find('iframe').contents().find('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />');
			t.children().find('iframe').contents().find('body').mouseenter(function(){
				$('.top_bar').css({'z-index':'0'});
			});
		}
	},
	'click .parent_select': function(e) {
		//alert('edit->click .paren_select');
		var t = $(e.currentTarget);
		$('#parent').val(t.attr('data-title'));
		$('#parent_id').val(t.attr('data-id'));
		$('#parent_search').hide();
	},
	'click #prereq_controls #new': function() {
		//alert('edit->click #prereq_controls #new');
		UI.insert(UI.renderWithData(Template.prereqEdit, {
			'order': 1
		}), $('div.prereq')[0]);
	},
	'click #steps_controls #new': function() {
		//alert('edit->click #steps_controls #new');
		UI.insert(UI.renderWithData(Template.stepEdit, {
			'order': 1
		}), $('div.steps')[0]);
	},
	'click #add_prereq': function(e) {
		//alert('edit->click #add_prereq');
		if ($(e.currentTarget).prop('checked') === true)
			$('#prereq').show();
		else
			$('#prereq').hide();
	},
	'click #save': function() {
		//alert('edit->click #save');
		var q = {
			// creator_id: Meteor.userId(), // Set serverside 
			title: $('#article_title').val(),
			parent: {
				_id: $('#parent_id').val(),
				title: $('#parent').val()
			},
			status: 1,
			// last_updated: new Date().getTime(), // Set Serverside
			prereq_enable: $('#add_prereq').prop('checked'),
			steps: [],
			prereq: []
		}
		var text = $('.editArea');
		var titles = []
		var tbio = textboxio.get('#editArea');
		if (Array.isArray(tbio)) {
			for (var j = 0; j < tbio.length; j++) {
				tbio[j].restore();
			}
		} else if (tbio)
			tbio.restore();
		$('#steps .stepBlock').each(function() {
			q.steps.push({
				_id: new Meteor.Collection.ObjectID(),
				title: $(this).children().find('#step_title').val(),
				text: {
					//bbcode: t.children().find('.editArea').bbcode(), // Deprecated no more bbcode all live html5
					htmlcode: $(this).children().find('#editArea').html()
				}
			});
		});
		if (q.prereq_enable) {
			$('#prereq input').each(function() {
				var t = $(this);
				q.prereq.push({
					_id: new Meteor.Collection.ObjectID(),
					text: t.val()
				});
			});
		}
		console.log(q);
		Meteor.call('post_article', $('#article_id').val(), q, function(e, r) {
			if (e)
				console.log('error posting article',e, r);
			else {
				if (r){
					console.log('Saved apparently', e, r);
					SessionAmplify.set('notifier',{msgs:['Article Saved']});
				}
				else
					console.log('There was a problem with the insert..', e, r);
			}
		});
	}
});
Template.edit.setArticleId = function() {
	if (typeof _id !== 'undefined' && _id !== null)
		return _id.toHexString();
	else
		return document.URL.split('/').pop();
}
Template.edit.parentSearch = function() {
	_parentDep.depend();
	var v = $('#parent').val();
	if (v) {
		$('#parent_search').show();
		var a = []
		var tmp = []
		var q = articles.find({
			'parent.title': {
				$regex: v,
				$options: 'i'
			}
		}, {
			limit: 7,
			sort: {
				'parent.title': -1
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
}
Template.edit.checkPrereq = function(b) {
	if (!b){
		$('#prereq').hide();
		return false;
	} else {
		$('#prereq').show();
		return true;
	}
}
Template.edit.rendered = function() {
	if ($('#add_prereq').prop('checked') === true)
			$('#prereq').show();
		else
			$('#prereq').hide();
	//tbio = textboxio.replaceAll('.editArea');
}

})();
