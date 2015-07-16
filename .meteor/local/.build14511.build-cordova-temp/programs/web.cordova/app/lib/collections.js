(function(){articles = new Meteor.Collection('articles');
images = new FileCollection('images',{
	resumable: true,   // Enable built-in resumable.js upload support
	http: [{
		method: 'get',
		path: '/:md5',  // this will be at route "/gridfs/myFiles/:md5"
		lookup: function(params, query){  // uses express style url params
			return { md5: params.md5 };       // a query mapping url to myFiles
		}
	}]
});
files = new FileCollection('files',{
	resumable: true,   // Enable built-in resumable.js upload support
	http: [{
		method: 'get',
		path: '/:md5',  // this will be at route "/gridfs/myFiles/:md5"
		lookup: function(params, query){  // uses express style url params
			return { md5: params.md5 };       // a query mapping url to myFiles
		}
	}]
});

})();
