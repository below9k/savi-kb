Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});
Router.map(function() {
	// First page
	this.route('landing',{
		path: '/',
		template: 'landing',
		waitOn: function(){
			return [Meteor.subscribe('articles'),Meteor.subscribe('personalArticles')];
			//return [Meteor.subscribe('articles'),Meteor.subscribe('personalArticles')];
		},
		action: function(){
			if(!this.ready())
				this.render('loading');
			else
				this.render();
		}
	});
	this.route('view',{
		path: '/view/:_id',
		template: 'view',
		waitOn: function(){
			return [Meteor.subscribe('articles'),Meteor.subscribe('personalArticles'),Meteor.subscribe('comments',this.params._id)];
		},
		action: function(){
			if(!this.ready())
				this.render('loading');
			else
				this.render();
		},
		data: function(){
			var id = new Meteor.Collection.ObjectID(this.params._id);
			return articles.findOne({_id: id});
		}
	});
	// Edit an Article
	this.route('edit',{
		path: '/edit/:_id',
		template: 'edit',
		onBeforeAction: function(){
			if(!Meteor.userId()){
				Router.go('landing');
				$('.dropdown-toggle').trigger('click');
			}
			$('body,html').scrollTop(0);
			this.next();
		},
		waitOn: function(){
			return [Meteor.subscribe('articles'),Meteor.subscribe('personalArticles'),Meteor.subscribe('files',this.params._id),Meteor.subscribe('comments',this.params._id)]; //[Meteor.subscribe('articles'),Meteor.subscribe('upImages',this.params._id),Meteor.subscribe('upFiles',this.params._id)];
		},
		action: function(){
			if(!this.ready())
				this.render('loading');
			else
				this.render();
		},
		data: function(){
			var id = new Meteor.Collection.ObjectID(this.params._id);
			if(this.ready())
				return articles.findOne({_id: id},{reactive: false});
		}
	});
	this.route('support',{
		path: '/support',
		template: 'support',
		action: function(){
			if(!this.ready())
				this.render('loading');
			else
				this.render();
		}
	});
	this.route('loading',{
		path: '/loading',
		template: 'loading'
	});
	// Server Sides
	//---
	// Login
	this.route('/inject', function() {
		var req = this.request;
		var res = this.response;
		console.log(this.params.query);

		res.end(
			'<html>' +
			'<head>' +
			'<script type="text/javascript">\n' +
			'localStorage.setItem("Meteor.loginToken", "' + this.params.query.loginToken + '");\n' +
			'localStorage.setItem("Meteor.userId", "' + this.params.query.userId + '");\n' +
			'window.location.href="/";\n' +
			'</script>' +
			'</head>' +
			'<body>You will be redirected</body>' +
			'</html>');
	}, {
		where: 'server'
	});
});