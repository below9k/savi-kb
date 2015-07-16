(function(){Template.view.events({
	'click #edit img': function(e){
		var t = $(e.target);
		var i = $('.lightbox img');
		var l = $('.lightbox');
		i.attr('src',t.attr('src')).load(function(){
			l.css({'padding-top': ((l.height()-i.height())/2)/2}).show();
		});
	},
	'click .lightbox': function(e){
		var t = $(e.target);
		if(t.attr('class') === 'lightbox'){
			$('.lightbox').hide();
			$('.lightbox img').panzoom("reset");
			console.log(t.attr('class'));
		}
	}
});

})();
