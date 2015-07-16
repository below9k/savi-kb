(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var Dealers;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/savi:user-management/both/router.js                      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// --------                                                          // 1
// Route Configs                                                     // 2
// --------                                                          // 3
var config = {                                                       // 4
	route: '/admin',                                                    // 5
	name: 'user-management',                                            // 6
	template: 'user-management'                                         // 7
};                                                                   // 8
// --------                                                          // 9
// Determine project router to be used                               // 10
// --------                                                          // 11
if(typeof FlowRouter !== 'undefined'){                               // 12
	/*                                                                  // 13
	 * FlowRouter: Is it using FlowLayout?                              // 14
	 */                                                                 // 15
	FlowRouter.route(config.route,{                                     // 16
		name: config.name,                                                 // 17
		subscriptions: function(){                                         // 18
			this.register('Dealers',Meteor.subscribe('dealers'));             // 19
			this.register('Users',Meteor.subscribe('users'));                 // 20
		},                                                                 // 21
		action: function(){                                                // 22
			this.render(config.template);                                     // 23
		}                                                                  // 24
	});                                                                 // 25
}else if(typeof Router !== 'undefined'){                             // 26
	/*                                                                  // 27
	 * Iron-Router:                                                     // 28
	 */                                                                 // 29
	Router.route(config.route,{                                         // 30
		name: config.name,                                                 // 31
		path: config.route,                                                // 32
		template: config.template,                                         // 33
		subscription: function(){                                          // 34
			this.subscribe('Dealers').wait();                                 // 35
			this.subscribe('Users').wait();                                   // 36
		},                                                                 // 37
		data: function(){                                                  // 38
			return [Dealers.find(),Meteor.users.find()];                      // 39
		},                                                                 // 40
		action: function(){                                                // 41
			this.render();                                                    // 42
		}                                                                  // 43
	});                                                                 // 44
}else                                                                // 45
	throw new Meteor.error('(Dependency)User-Management: Missing Router','User-Management could not find a router. Make sure one is added to the project.');
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/savi:user-management/server/publish.js                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.publish('users', function(selector, opts) {                   // 1
	var user = Meteor.users.findOne(this.userId);                       // 2
	if(user && user.profile.isAdmin){                                   // 3
    	return Meteor.users.find();                                     // 4
	}                                                                   // 5
});                                                                  // 6
Dealers = CollectionManager.create('dealers');                       // 7
Meteor.publish('dealers', function(selector, opts) {                 // 8
	var user = Meteor.users.findOne(this.userId);                       // 9
	if(user && user.profile.isAdmin){                                   // 10
    	return Dealers.find();                                          // 11
	}                                                                   // 12
});                                                                  // 13
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['savi:user-management'] = {};

})();

//# sourceMappingURL=savi_user-management.js.map
