Template.view.events({
	'click #edit img': function(e){
		var t = $(e.target);
		var i = $('.lightbox img');
		var l = $('.lightbox');
		if(i.attr('src') !== t.attr('src')){
			i.attr('src',t.attr('src')).load(function(){
				l.css({'padding-top': ((l.height()-i.height())/2)/2}).show();
				$(this).css({'zoom':'1'});
			});
		}else{
			l.css({'padding-top': ((l.height()-i.height())/2)/2}).show();
			$(this).css({'zoom':'1'});
		}
	},
	'mouseup .lightbox': function(e){
		var t = $(e.target);
		if(t.attr('class') === 'lightbox'){
			$('.lightbox').hide();
			$('.lightbox img').panzoom("reset");
			//console.log(t.attr('class'));
		}
	},
	'dblclick .lightbox img': function(e){
		var t = $(e.target);
		var z = t.css('zoom');
		//console.log(z);
		if(z < 2)
			t.css({'zoom':'2'});
		else
			t.css({'zoom':'1'});
	}
});
Template.view.helpers({
	'setArticleId': function() {
		if (typeof this._id !== 'undefined' && this._id !== null)
			return this._id.toHexString();
		else
			return document.URL.split('/').pop();
	}
});
Template.view.rendered = function(){
	update_title(this.data.title + ' -',false,true);
};