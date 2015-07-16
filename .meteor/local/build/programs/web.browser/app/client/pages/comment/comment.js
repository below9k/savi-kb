(function(){Template.comments.events({
	'click .comment_reply': function(){
		var reply = $('.comment_input').code();
		var article_id = $('#article_id').val();
		$('.comment_input').code('');
		Meteor.call('post_comment',article_id,reply);
	},
	'keydown .comment_wrapper .note-editable': function(e){
		if(e.keyCode == 13) { 
			e.preventDefault();
			var reply = $('.comment_input').code().replace('<p><br></p>','');
			var article_id = $('#article_id').val();
			$('.comment_input').code('');
			Meteor.call('post_comment',article_id,reply);
		}
	},
	'click .remove_comment': function(e){
		var id = $(e.currentTarget).find('.comment_id').val();
		Meteor.call('remove_comment',id);
		console.log('Removed Comment',id);
	}
});
Template.comments.helpers({
	'getComments': function(){
		return comments.find({},{sort:{last_updated: 1}});
	},
	'isCreator': function(creator_id){
		var current_user = Meteor.userId();
		return _.isEqual(creator_id,current_user);
	}
});
Template.comments.rendered = function(){
	$('.comment_input').summernote();
};

})();
