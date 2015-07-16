(function(){_searchDep = new Deps.Dependency();
Template.landing.events({
	'click span#new_article': function() {
		Router.go('edit', {
			_id: new Meteor.Collection.ObjectID().toHexString()
		});
	},
	'keyup #search': function() {
		setTimeout(function(){_searchDep.changed(); }, 1500);
	},
	'click .remove_article': function(e) {
		var t = $(e.currentTarget);
		var id = t.attr('data-id');
		var title = t.attr('data-title');
		var c = confirm('Are you sure you want to delete article \"' + title + '\"?');
		if (c) {
			c = Meteor.call('updateStatus', id, 0);
			SessionAmplify.set('notifier', {
				msgs: ['Article Removed']
			});
			console.log('updated', id, c);
		}
	},
	'click .expand_full_search': function(e) {
		var t = $(e.currentTarget);
		t.siblings().toggle();
		t.removeClass('expand_full_search fa-plus-square-o');
		t.addClass('collapse_full_search fa-minus-square-o');
	},
	'click .collapse_full_search': function(e) {
		var t = $(e.currentTarget);
		t.siblings().toggle();
		t.addClass('expand_full_search fa-plus-square-o');
		t.removeClass('collapse_full_search fa-minus-square-o');
	}
});
Template.landing.getRecentArticles = function() {
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
};
Template.landing.getArticleList = function() {
	return articles.find({}, {
		sort: {
			'title': 1
		},
		'title': 1,
		'last_updated': 1,
		'creator_id': 1,
		'parent': 1
	});
};
Template.landing.getUserArticles = function() {
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
};
Template.landing.getArticleGroups = function() {
	var out = []
	var a = articles.find({}, {
		sort: {
			'last_updated': -1
		},
		'title': 1,
		'last_updated': 1,
		'parent': 1,
		'steps': 1
	}).fetch();
	for (var i = 0; i < a.length; i++) {
		var p = a[i].parent.title;
		var found = false;
		for (var k = 0; k < out.length; k++) {
			if (out[k].parent === p && out[k].articles.length <= 5) {
				out[k].articles.push(a[i]);
				found = true;
			} else if (out[k].articles.length >= 6) {
				if (!out[k].count)
					out[k].count = out[k].articles.length;
				else
					out[k].count++;
				found = true;
			}
		}
		if (!found) {
			l = out.push({
				parent: a[i].parent.title,
				articles: []
			});
			out[l - 1].articles.push(a[i]);
		}
	}
	out.sort(function(a, b) {
		return (a.articles < b.articles) ? 1 : (a.articles > b.articles) ? -1 : 0;
	});
	return out;
}
Template.landing.articleSearch = function() {
	_searchDep.depend();
	var v = $('#search').val();
	var a = []
	var adv = $('#advSearch').prop('checked');
	if (v) {
		v = v.split(' ');
		//console.log('searching for: ', v);
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
					return (a.steps < b.steps) ? 1 : (a.steps > b.steps) ? -1 : 0
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
					return (a.steps < b.steps) ? 1 : (a.steps > b.steps) ? -1 : 0
				});
			//console.log('adding this: ', m);
			a = _.uniq($.merge(a, m), false, function(a) {
				return a.title;
			});
			//console.log('check this: ', a);
		}
		return a;
	}
	return false;
};
//
// Fix returns to highlight all searches 
// currently does 1 keyword per step.. wrong..
//
Template.landing.searchTextSample = function(t) {
	var text = t;
	var v = $('#search').val().split(' ');
	var out = '';
	text = text.replace(/<\/?\w+((\s+\w+(\s*=\s*(?:\".*?"|'.*?'|[^'\">\s]+))?)+\s*|\s*)\/?>/gi, '');
	for (var j = 0; j < v.length; j++) {
		var ts = text.search(new RegExp(v[j], 'gi'));
		if (ts > -1) {
			ts = text.substr(ts, v[j].length);
			text = text.replace(new RegExp(v[j], 'gi'), '<mark>' + ts + '</mark>');
		}
	}
	var sample = $('<span>' + text + '</span>').truncate({
		length: 35,
		words: true,
		noBreaks: true
	}).html();
	var full = '<span class="search_text_full" style="display: none;">' + text + '</span>';
	if (sample.length > 0)
		out += '<li><i class="fa fa-plus-square-o fa-1x expand_full_search"></i> ' + full + '<span class="search_text_sample">' + sample + '</span></li>';
	return out;
};
Template.landing.link = function() {
	if (Meteor.userId())
		return (this.parent.title) ? '<a class="parent_article_link" href="view/' + this._id + '"><i class="fa fa-2x fa-file-text"> ' + this.title + ' <p class="under_parent"><i class="fa fa-1x fa-angle-double-up"> ' + this.parent.title + '</i></p></i></a> <p><a class="article_option_link" href="edit/' + this._id + '"><i class="fa fa-1x fa-pencil-square-o">Edit</i></a> <a class="article_option_link" href="#"><i data-id="' + this._id + '" data-title="' + this.title + '" class="fa fa-1x fa-times remove_article">Delete</i></a></p>' : '<a class="article_link" href="view/' + this._id + '"><i class="fa fa-2x fa-file-text"> ' + this.title + '</i></a> <p><a class="article_option_link" href="edit/' + this._id + '"><i class="fa fa-1x fa-pencil-square-o">Edit</i></a> <a href="#"><i data-id="' + this._id + '" data-title="' + this.title + '" class="fa fa-1x fa-times remove_article">Delete</i></a></p>';
	else
		return (this.parent.title) ? '<a class="parent_article_link" href="view/' + this._id + '"><i class="fa fa-2x fa-file-text"> ' + this.title + ' <p class="under_parent"><i class="fa fa-1x fa-angle-double-up"> ' + this.parent.title + '</i></p></i></a>' : '<a class="article_link" href="view/' + this._id + '"><i class="fa fa-2x fa-file-text"> ' + this.title + '</i></a></p>';
};
Template.landing.rendered = function() {
	$('.scrollable').bind('mousewheel DOMMouseScroll', function(e) {
		var e0 = e.originalEvent,
			delta = e0.wheelDelta || -e0.detail;
		this.scrollTop += (delta < 0 ? 1 : -1) * 30;
		e.preventDefault();
	});
}

})();
