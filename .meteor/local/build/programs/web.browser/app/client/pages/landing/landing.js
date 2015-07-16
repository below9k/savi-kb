(function(){_searchDep = new Deps.Dependency();
Template.landing.events({
	'click span#new_article': function() {
		var new_id = new Meteor.Collection.ObjectID().toHexString();
		Router.go('edit', {
			_id: new_id
		});
	},
	'keyup #search': function() {
		setTimeout(function() {
			_searchDep.changed();
		},1500);
	},
	'click .remove_article': function(e) {
		var t = $(e.currentTarget);
		var id = t.attr('data-id');
		var title = t.attr('data-title');
		var c = confirm('Are you sure you want to delete article \"' + title + '\"?');
		if (c) {
			c = Meteor.call('remove_article', id, 0);
			notifier('Article Removed','success');
			console.log('Removed Article', id, c);
		}
	},
	'mouseup .expand_full_search': function(e) {
		var t = $(e.currentTarget);
		t.next().toggleClass('truncate');
		t.removeClass('expand_full_search fa-plus-square-o').addClass('collapse_full_search fa-minus-square-o');
	},
	'mouseup .collapse_full_search': function(e) {
		var t = $(e.currentTarget);
		t.next().toggleClass('truncate');
		t.addClass('expand_full_search fa-plus-square-o').removeClass('collapse_full_search fa-minus-square-o');
	},
	'mouseup p.plus_articles': function(e){
		var t = $(e.currentTarget);
		t.children('i').toggleClass('fa-minus-circle','fa-plus-circle');
		t.siblings('div.plus-article').each(function(){
			$(this).fadeToggle('fast');
		});
	},
	'mouseup .toggleGroup': function(e){
		var t = $(e.currentTarget);
		if(t.attr('class').indexOf('fa-minus-square-o') >= 0){
			t.addClass('fa-plus-square-o').removeClass('fa-minus-square-o');
			t.siblings('.fa-folder-open').addClass('fa-folder').removeClass('fa-folder-open');
		}else if(t.attr('class').indexOf('fa-plus-square-o') >= 0){
			t.addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
			t.siblings('.fa-folder').addClass('fa-folder-open').removeClass('fa-folder');
		}else if(t.attr('class').indexOf('fa-folder-open') >= 0){
			t.addClass('fa-folder').removeClass('fa-folder-open');
			t.siblings('.fa-minus-square-o').addClass('fa-plus-square-o').removeClass('fa-minus-square-o');
		}else if(t.attr('class').indexOf('fa-folder') >= 0){
			t.addClass('fa-folder-open').removeClass('fa-folder');
			t.siblings('.fa-plus-square-o').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
		}
		t.parents('.group-item-group').find('.group-item-list').toggle();
	},
	'mouseup .allGroupPlus': function(){
		$('.group-item-list').each(function(){
			var t = $(this);
			t.css({'display':'block'});
			t.siblings('.group-title').find('.fa-plus-square-o').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
			t.siblings('.group-title').find('.fa-folder').addClass('fa-folder-open').removeClass('fa-folder');
		});
	},
	'mouseup .allGroupMinus': function(){
		$('.group-item-list').each(function(){
			var t = $(this);
			t.css({'display':'none'});
			t.siblings('.group-title').find('.fa-minus-square-o').addClass('fa-plus-square-o').removeClass('fa-minus-square-o');
			t.siblings('.group-title').find('.fa-folder-open').addClass('fa-folder').removeClass('fa-folder-open');
		});
	}
});
Template.landing.helpers({
	'getRecentArticles': function() {
		return articles.find({}, {
			limit: 10,
			sort: {
				'last_updated': -1
			},
			'title': 1,
			'last_updated': 1,
			'creator_id': 1,
			'parent': 1
		});
	},
	'getArticleList': function() {
		return articles.find({}, {
			sort: {
				'title': 1
			},
			'title': 1,
			'last_updated': 1,
			'creator_id': 1,
			'parent': 1
		});
	},
	'getUserArticles': function() {
		return articles.find({
			'creator_id': Meteor.userId()
		}, {
			limit: 10,
			sort: {
				'last_updated': -1
			},
			'title': 1,
			'last_updated': 1,
			'creator_id': 1,
			'parent': 1
		});
	},
	'getArticleGroups': function() {
		var out = [];
		var a = articles.find({}, {
			sort: {
				'parent.group_order': -1
			},
			'title': 1,
			'last_updated': 1,
			'parent': 1,
			'steps': 1
		}).fetch();
		for(var i = 0; i < a.length; i++){
			var p = a[i].parent.title;
			var found = false;
			for (var k = 0; k < out.length; k++) {
				if (out[k].parent === p && out[k].articles.length < 5) {
					out[k].articles.push(a[i]);
					found = true;
				} else if (out[k].parent === p && out[k].articles.length >= 5) {
					if(!out[k].count) out[k].count = out[k].articles.length - 4; else out[k].count++;
					if(!out[k].plus)
						out[k].plus = [];
					out[k].plus.push(a[i]);
					found = true;
				}
			}
			if(!found){
				var l = out.push({
					parent: a[i].parent.title,
					articles: []
				});
				out[l - 1].articles.push(a[i]);
			}
		}
		out.sort(function(a, b) {
			return (a.parent < b.parent) ? -1 : (a.parent > b.parent) ? 1 : 0;
		});
		return out;
	},
	'articleSearch': function() {
		_searchDep.depend();
		var v = $('#search').val();
		var a = [];
		var adv = $('#advSearch').prop('checked');
		if (v) {
			v = v.split(' ');
			for (var j = 0; j < v.length; j++) {
				if (adv)
					var m = articles.find({
						$or: [{
							title: {
								$regex: v[j],
								$options: 'i'
							}
						}, {
							parent: {
								$regex: v[j],
								$options: 'i'
							}
						}, {
							'steps.text.htmlcode': {
								$regex: v[j],
								$options: 'i'
							}
						}]
					}, {
						limit: 20,
						sort: {
							title: -1
						}
					}).fetch().sort(function(a, b) {
						return (a.steps < b.steps) ? 1 : (a.steps > b.steps) ? -1 : 0;
					});
				else
					var m = articles.find({
						$or: [{
							title: {
								$regex: v[j],
								$options: 'i'
							}
						}, {
							parent: {
								$regex: v[j],
								$options: 'i'
							}
						}]
					}, {
						limit: 20,
						sort: {
							title: -1
						}
					}).fetch().sort(function(a, b) {
						return (a.steps < b.steps) ? 1 : (a.steps > b.steps) ? -1 : 0;
					});
				a = _.uniq($.merge(a, m), false, function(a) {
					return a.title;
				});
			}
			return a;
		}
		return false;
	},
//	'searchTextSample': function(t) {
//		var text = t;
//		var v = $('#search').val().split(' ');
//		var out = '';
//		text = text.replace(/<\/?\w+((\s+\w+(\s*=\s*(?:\".*?"|'.*?'|[^'\">\s]+))?)+\s*|\s*)\/?>/gi, '');
//		for (var j = 0; j < v.length; j++) {
//			var ts = text.search(new RegExp(v[j], 'gi'));
//			if (ts > -1) {
//				ts = text.substr(ts, v[j].length);
//				text = text.replace(new RegExp(v[j], 'gi'), '<mark>' + ts + '</mark>');
//			}
//		}
//		var full = '<span class="search_text_full" style="display: none;">' + text + '</span>';
//		if (sample.length > 0)
//			out += '<li><i class="fa fa-plus-square-o fa-1x expand_full_search"></i> ' + full + '</li>';
//		return out;
//	},
//	'article_link': function() {
//		if (Meteor.userId())
//			return (this.parent.title) ? '<a class="article_option_link" href="#"><p class="fa fa-bookmark deleteButton"><i data-id="' + this._id + '" data-title="' + this.title + '" class="fa fa-1x fa-times remove_article"  data-toggle="tooltip" data-placement="top" title="Remove Article"><!-- Delete --></i></p></a><a class="article_option_link" href="edit/' + this._id + '"  data-toggle="tooltip" data-placement="top" title="Edit Article"><p class="fa fa-bookmark editButton"><i class="fa fa-1x fa-pencil-square-o"><!-- edit --></i></p></a><a class="parent_article_link" href="view/' + this._id + '"><div><i class="fa fa-file-text"></i>&nbsp;' + this.title + ' <p class="under_parent"><i class="fa fa-1x fa-angle-double-up"></i> ' + this.parent.title + '</p></div></a>' : '<a class="article_option_link" href="#"><p class="fa fa-bookmark deleteButton"><i data-id="' + this._id + '" data-title="' + this.title + '" class="fa fa-1x fa-times remove_article"  data-toggle="tooltip" data-placement="top" title="Remove Article"><!-- Delete --></i></p></a><a class="article_option_link" href="edit/' + this._id + '"  data-toggle="tooltip" data-placement="top" title="Edit Article"><p class="fa fa-bookmark editButton"><i class="fa fa-1x fa-pencil-square-o"><!-- Edit --></i></p></a><a class="article_link" href="view/' + this._id + '"><div><i class="fa fa-file-text"></i>&nbsp;' + this.title + '</div></a>';
//		else
//			return (this.parent.title) ? '<a class="parent_article_link" href="view/' + this._id + '"><div><i class="fa fa-file-text"></i>&nbsp;' + this.title + ' <p class="under_parent"><i class="fa fa-1x fa-angle-double-up"></i> ' + this.parent.title + '</p></div></a>' : '<a class="article_link" href="view/' + this._id + '"><div><i class="fa fa-file-text"></i>&nbsp;' + this.title + '</div></a>';
//	},
//	'article_option_link': function(){
//		return false;
//	},
	'statusMarker': function(s){
		if(Meteor.user()){
			switch (s) {
				case 1: // Public
					return false; //'<div class="statusMarker"><i class="fa fa-unlock status1" data-toggle="tooltip" data-placement="top" title="Public"></i></div>';
				case 2: // Diem
					return '<div class="statusMarker"><i class="fa fa-lock status2" data-toggle="tooltip" data-placement="top" title="Diem Users"></i></div>';
				case 3: // 2kool4skool!11!1
					return '<div class="statusMarker"><i class="fa fa-warning status3" data-toggle="tooltip" data-placement="top" title="Incomplete"></i></div>';
				case 4: // God Teir
					return '<div class="statusMarker"><i class="fa fa-trophy status4" data-toggle="tooltip" data-placement="top" title="God Tier"></i></div>';
				case 5: // Personal
					return '<div class="statusMarker"><i class="fa fa-user status5" data-toggle="tooltip" data-placement="top" title="Personal"></i></div>';
			}
		}
	}
});
Template.landing.rendered = function(){
	// Set page title
	update_title(false,false,true);
	// Set height of landing items to match tallest item
	var tallestLandingItem = 0;
	$('.landing-item').each(function(){
		var h = $(this).innerHeight();
		tallestLandingItem = (tallestLandingItem < h) ? h : tallestLandingItem;
	});
	$('.landing-item').each(function(){
		$(this).innerHeight(tallestLandingItem);
	});
};

})();
