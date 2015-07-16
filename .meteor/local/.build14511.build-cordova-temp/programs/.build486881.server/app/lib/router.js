(function(){Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});
Router.map(function() {
	// First page
	this.route('landing',{
		path: '/',
		template: 'landing',
		waitOn: function(){
			return Meteor.subscribe('articles');
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
			return Meteor.subscribe('articles');
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
		},
		waitOn: function(){
			return [Meteor.subscribe('articles'),Meteor.subscribe('upImages',this.params._id),Meteor.subscribe('upFiles',this.params._id)];
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
	this.route('imex',{
		path: '/imex',
		template: 'imex',
		onBeforeAction: function(){
			if(!Meteor.userId()){
				Router.go('landing');
				$('.dropdown-toggle').trigger('click');
			}
		},
		waitOn: function(){
			SessionAmplify.set('buildMe',{});
		},
		action: function(){
			if(!this.ready())
				this.render('loading');
			else
				this.render();
		}
	});
	this.route('imexImport',{
		path: '/imex/import',
		template: 'imexImport',
		onBeforeAction: function(){
			if(!Meteor.userId()){
				Router.go('landing');
				$('.dropdown-toggle').trigger('click');
			}
		},
		waitOn: function(){
			SessionAmplify.set('importMe',{});
			SessionAmplify.set('fin',{});
		},
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
	this.route('tbio_test',{
		path: '/tbio_test',
		template: 'tbio'
	});
});

})();
