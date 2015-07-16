(function(){Meteor.methods({
	'post_article': function(id,query){
		if(Meteor.user()){
			id = new Meteor.Collection.ObjectID(id);
			q = {}
			q['creator_id'] = Meteor.userId();
			q['last_updated'] = new Date().getTime();
			_.extend(query,q);
			articles.upsert(id,{$set: query},function(r,e){
				if(typeof r === 'undefined')
					return [r,e];
			});
			return true;
		}else
				console.log('Permission Denied - Attempt to upsert an article was denied, current user is not logged in.');
	},
	'updateStatus': function(id,s){
		if(Meteor.user()){
			id = new Meteor.Collection.ObjectID(id);
			q = {}
			q['last_updated'] = new Date().getTime();
			q['status'] = parseInt(s);
			articles.update(id,{$set:{'last_updated':q.last_updated,'status':q.status}},function(r,e){
				if(typeof r === 'undefined')
					return [r,e];
			});
			return true;
		}else
			console.log('Permission Denied - Attempt to update status was denied, current user is not logged in.');
	}
});

})();
