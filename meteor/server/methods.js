//
//	TODO:
//	Add checks for html injection - id swapping to delete other user's stuff
//	More security checks.

Meteor.methods({
	'post_article': function(id,query){
		if(Meteor.user()){
			console.log(id);
			id = new Meteor.Collection.ObjectID(id);
			var exists_already = articles.findOne(id);
			var q = {};
			q.creator_id = (exists_already) ? exists_already.creator_id : Meteor.userId();
			q.last_updated = new Date().getTime();
			_.extend(query,q);
			articles.upsert(id,{$set: query},function(r,e){
				if(typeof r === 'undefined')
					return [r,e];
			});
			return true;
		}else
			return [false,console.log('Permission Denied - Attempt to upsert an article was denied, current user is not logged in.',id)];
	},
	'post_comment': function(article_id,comment,id){
		if(Meteor.user()){
			if(!article_id)
				return [false,console.log('Invalid article_id - Attempt to post comment failed, no article_id found')];
			id = (id) ? new Meteor.Collection.ObjectID(id) : new Meteor.Collection.ObjectID();
			var q = {
				'creator_id': Meteor.userId(),
				'creator_email': Meteor.user().emails[0].address,
				'article_id': article_id,
				'last_updated': new Date().getTime(),
				'comment': {
					'text': comment
				}
			};
			if(id){
				comments.upsert(id,{$set: q});
				return true;
			}
		}else
			return [false,console.log('Permission Denied - Attempt to add comment on an article was denied, current user is not logged in.',id)];
	},
	'remove_comment': function(id){
		var comment = comments.findOne(new Meteor.Collection.ObjectID(id),{creator_id:1});
		if(Meteor.userId() === comment.creator_id){
			comments.remove(new Meteor.Collection.ObjectID(id));
			console.log('Comment Removed - Comment ' + id + ' was removed by user.',Meteor.user().emails[0].address);
			return true;
		}else
			return [false,console.log('Permission Denied - Attempt to remove comment on an article was denied - current user does not match creator_id.',id)];
	},
	'remove_article': function(article_id){
		if(Meteor.user()){
			if(!article_id)
				return [false,console.log('Invalid article_id - Attempt hide/remove article failed, no article_id found')];
			var c = articles.update(new Meteor.Collection.ObjectID(article_id),{$set:{status:'0'}});
			if(c > 0) console.log('Article Hidden - Article ' + article_id + ' has been hidden/removed by user:',Meteor.user().emails[0].address);
			else return [false,console.log('Article was not removed - There was a problem! article:',article_id + 'user:',Meteor.user().emails[0].address)];
			return true;
		}
	}
});