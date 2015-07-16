(function(){Template.layout.events({
	'click #openNavi': function() {
		//alert('layout->click #openNavi');
		var t = $('.sb-left');
		//w = $('.wrapper');
		if (t.css('left') === '0px') {
			t.animate({
				'left': '-12.5em'
			});
			//w.animate({'margin-left': '0'});
		} else {
			t.animate({
				'left': '0'
			});
			//w.animate({'margin-left': '+11.5em'});
		}
	},
	'change #notifier': function() {
		//alert('layout-> change #notifier');
		console.log('notifer going');
		$("#notifier").fadeIn(3000).delay(250).fadeOut(2500);
	},
	'click .wrapper': function() {
		//alert('layout->click .wrapper');
		var t = $('.sb-left');
		if (t.css('left') === '0px') {
			t.animate({
				'left': '-12.5em'
			});
		}
	}
});
Template.layout.rendered = function() {
	Hammer($('.wrapper')[0]).on('swiperight', function() {
		//alert('layout->Hammer swiperight');
		var t = $('.sb-left');
		//r = $('sb-right');
		//w = $('.wrapper');
		t.animate({
			'left': '0'
		});
		//w.animate({'margin-left': '+11.5em'});
	});
	Hammer($('.wrapper')[0]).on('swipeleft', function() {
		//alert('layout->Hammer swipeleft');
		var t = $('.sb-left');
		var p = t.css('left');
		if (p === '0px') {
			t.animate({
				'left': '-12.5em'
			});
			//w.animate({'margin-left': '0'});
		}
	});
}
Template.layout.getNotifier = function() {
	var s = SessionAmplify.get('notifier');
	return s;
}
Template.registerHelper('setNotifier', function(n) {
	var s = SessionAmplify.set('notifier', n);
});
Template.registerHelper('loggedIn', function() {
	if (Meteor.userId())
		return true;
	else
		return false;
});
Template.registerHelper('status', function(s) {
	var out = '<ul>';
	for (var i = 0; i < s.length; i++) {
		out += '<li>' + s[i] + '</li>';
	}
	out += '</ul>';
	SessionAmplify.set('status', out);
});
Template.registerHelper('newObjId', function() {
	return new Meteor.Collection.ObjectID()._str;
});
Template.registerHelper('timeSinceUpdate', function(previous) {
	previous = parseInt(previous);
	var current = new Date().getTime();
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;
	var elapsed = current - previous;

	if (elapsed < msPerMinute) {
		return Math.round(elapsed / 1000) + ' seconds ago';
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + ' minutes ago';
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + ' hours ago';
	} else if (elapsed < msPerMonth) {
		return 'about ' + Math.round(elapsed / msPerDay) + ' days ago';
	} else if (elapsed < msPerYear) {
		return 'about ' + Math.round(elapsed / msPerMonth) + ' months ago';
	} else {
		return 'about ' + Math.round(elapsed / msPerYear) + ' years ago';
	}
});

})();
