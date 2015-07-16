(function(){if(Meteor.isServer){
	Accounts.config({
		forbidClientAccountCreation : false
	});
	Meteor.publish('files',function(id){
		if(!id || !this.userId) return [];
		return files.find({article_id:id}); //files.find({_id: new Meteor.Collection.ObjectID(id)});
	});
	files.allow({
		insert: function(){ 
			return true;
		},
		remove: function(){
			return true;
		},
		update: function(){
			return true;
		},
		download: function(){
			return true;
		}
	});
	Meteor.publish('comments',function(id){
		if(this.userId)
			return comments.find({article_id: id});
		return [];
	});
	Meteor.publish('personalArticles',function(){
		return articles.find({status:5,creator_id:this.userId});
	});
	Meteor.publish('articles',function(id){
		var diemManagement = ["HtrWbQBW7Wn6umma9","Ece7K9Stt7A7yHCEk","8q7DHBe74vWexJctc"];
		// Updated (1-15-15)
		// dwilson@diemdigital.com. cchase@diemdigital.com, cdaniel@diemdigital.com
		//console.log(diemManagement,this.userId,diemManagement.indexOf(this.userId));
		if(this.userId){
			if(diemManagement.indexOf(this.userId) !== -1){
				if(id)
					return articles.find({_id: new Meteor.Collection.ObjectID(id), status: {$gt: 0, $lt: 5}});
				else
					return articles.find({status: {$gt: 0, $lt: 5}});
			}else{
				if(id)
					return articles.find({_id: new Meteor.Collection.ObjectID(id), status: {$gt: 0, $lt: 4}});
				else
					return articles.find({status: {$gt: 0, $lt: 4}});
			}
		}else{
			if(id)
				return articles.find({_id: new Meteor.Collection.ObjectID(id), status: 1});
			else
				return articles.find({status: 1});
		}
	});
}

})();
