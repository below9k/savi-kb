(function(){if(Meteor.isServer){
	Accounts.config({
		forbidClientAccountCreation : true
	});
	Meteor.publish('upImages', function(id){
		if(id)
			return  images.find({ 'metadata._Resumable': { $exists: false }, 'metadata.article_id': new Meteor.Collection.ObjectID(id)});
		else{
			if (this.userId) {
				return images.find({ 'metadata._Resumable': { $exists: false } });
			}else       // Prevent client race condition:
				return null;
		}
	});
	images.allow({
		insert: function(){
			return true;
		},
		remove: function(){
			return true;
		},
		read: function(){
			return true;
		},
		write: function(){
			return true;
		}
	});
	Meteor.publish('upFiles', function(id){
		if(id)
			return files.find({ 'metadata._Resumable': { $exists: false }, 'metadata.article_id': new Meteor.Collection.ObjectID(id)});
		else{
			if (this.userId){
				return files.find({ 'metadata._Resumable': { $exists: false } });
			}else
				return null;
		}
	});
	files.allow({
		insert: function(){
			return true;
		},
		remove: function(){
			return true;
		},
		read: function(){
			return true;
		},
		write: function(){
			return true;
		}
	});
	Meteor.publish('articles',function(id){
		if(id)
			return articles.find({_id: new Meteor.Collection.ObjectID(id), status: {$gt: 0}});
		else
			return articles.find({status: {$gt: 0}});
	});
}

})();
