(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/savi:user-management/both/router.js                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// --------                                                                                                          // 1
// Route Configs                                                                                                     // 2
// --------                                                                                                          // 3
var config = {                                                                                                       // 4
    route: '/admin',                                                                                                 // 5
    name: 'user-management',                                                                                         // 6
    template: 'adminLayout'                                                                                          // 7
};                                                                                                                   // 8
// --------                                                                                                          // 9
// Determine project router to be used                                                                               // 10
// --------                                                                                                          // 11
if (typeof FlowRouter !== 'undefined') {                                                                             // 12
    /*                                                                                                               // 13
     * FlowRouter: Is it using FlowLayout?                                                                           // 14
     */                                                                                                              // 15
    FlowRouter.route(config.route, {                                                                                 // 16
        name: config.name,                                                                                           // 17
        subscriptions: function() {                                                                                  // 18
            this.register('dealers', Meteor.subscribe('dealers'));                                                   // 19
            this.register('users',Meteor.subscribe('users'));                                                        // 20
        },                                                                                                           // 21
        action: function() {                                                                                         // 22
            var access = roles.findOne(Meteor.userId());                                                             // 23
            if (access && access.isAdmin) {                                                                          // 24
                Meteor.call('getUsers', function(err, res) {                                                         // 25
                    if (!err)                                                                                        // 26
                        return Session.set('users', res);                                                            // 27
                    return;                                                                                          // 28
                });                                                                                                  // 29
                // Subscriptions will load reactively - no wait                                                      // 30
                this.render(config.template);                                                                        // 31
            } else                                                                                                   // 32
                FlowRouter.go('/');                                                                                  // 33
        }                                                                                                            // 34
    });                                                                                                              // 35
} else if (typeof Router !== 'undefined') {                                                                          // 36
    /*                                                                                                               // 37
     * Iron-Router: Or Matching Router                                                                               // 38
     */                                                                                                              // 39
    Router.route(config.route, {                                                                                     // 40
        name: config.name,                                                                                           // 41
        path: config.route,                                                                                          // 42
        template: config.template,                                                                                   // 43
        waitOn: function() {                                                                                         // 44
            return [Meteor.subscribe('dealers'), Meteor.subscribe('users')];                                         // 45
        },                                                                                                           // 46
        action: function() {                                                                                         // 47
            var access = roles.findOne(Meteor.userId());                                                             // 48
            if (!this.ready())                                                                                       // 49
                this.render('loading');                                                                              // 50
            else if (access && access.isAdmin)                                                                       // 51
                this.render();                                                                                       // 52
            else                                                                                                     // 53
                Router.go('/');                                                                                      // 54
        }                                                                                                            // 55
    });                                                                                                              // 56
} else                                                                                                               // 57
    throw new Meteor.Error('(Dependency) User-Management', 'User-Management could not find a router. Make sure one is added to the project.');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/savi:user-management/both/collections.js                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
dealers = new Mongo.Collection('dealers');                                                                           // 1
roles = new Mongo.Collection('roles');                                                                               // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/savi:user-management/server/publish.js                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('dealers', function() {                                                                               // 1
    var access = roles.findOne(this.userId);                                                                         // 2
	if (access && access.isAdmin)                                                                                       // 3
		return dealers.find();                                                                                             // 4
    return [];                                                                                                       // 5
});                                                                                                                  // 6
Meteor.publish('users', function() {                                                                                 // 7
	var access = roles.findOne(this.userId);                                                                            // 8
	if (access && access.isAdmin)                                                                                       // 9
		return Meteor.users.find();                                                                                        // 10
    return [];                                                                                                       // 11
});                                                                                                                  // 12
Meteor.publish('roles',function(){                                                                                   // 13
    if(this.userId)                                                                                                  // 14
        return roles.find(this.userId);                                                                              // 15
    return [];                                                                                                       // 16
});                                                                                                                  // 17
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/savi:user-management/server/methods.js                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
    'addUser': function(dealerId) {                                                                                  // 2
        var dealer = dealers.findOne(dealerId);                                                                      // 3
        if (dealer) {                                                                                                // 4
            var user = {                                                                                             // 5
                username: dealer.email,                                                                              // 6
                email: dealer.email,                                                                                 // 7
                profile: {                                                                                           // 8
                    'company': dealer.company,                                                                       // 9
                    'firstName': dealer.firstName,                                                                   // 10
                    'lastName': dealer.lastName,                                                                     // 11
                    'phoneNumber': dealer.phoneNumber,                                                               // 12
                    'mailingList': dealer.mailList || false,                                                         // 13
                    'comments': dealer.comments,                                                                     // 14
                    'dealerId': dealer._id,                                                                          // 15
                    'isAdmin': false                                                                                 // 16
                }                                                                                                    // 17
            };                                                                                                       // 18
            var userId = Accounts.createUser(user);                                                                  // 19
            if (userId) {                                                                                            // 20
                Accounts.sendEnrollmentEmail(userId);                                                                // 21
                console.log('Enrollment Email sent to:', userId, user.email);                                        // 22
                dealers.update(dealerId, {                                                                           // 23
                    $set: {                                                                                          // 24
                        'isUser': true                                                                               // 25
                    }                                                                                                // 26
                });                                                                                                  // 27
                return userId;                                                                                       // 28
            }                                                                                                        // 29
        } else {                                                                                                     // 30
            console.log('An error occured adding dealer ', dealerId, ' - not found');                                // 31
            Meteor.Error('SAVI:User-Management: Adding-User', 'Dealer was not found - ' + dealerId);                 // 32
        }                                                                                                            // 33
    },                                                                                                               // 34
    'removeUser': function(id) {                                                                                     // 35
        var update = Meteor.users.remove(id, function(err, res) {                                                    // 36
            if (!err)                                                                                                // 37
                console.log(Meteor.userId(), 'removed:', res, 'user(s)', id);                                        // 38
            else {                                                                                                   // 39
                console.log('An error occured during user removal ', err);                                           // 40
                Meteor.Error('SAVI:User-Management: Removing-User', 'User could not be removed - ' + id, err);       // 41
            }                                                                                                        // 42
        });                                                                                                          // 43
        return update;                                                                                               // 44
    },                                                                                                               // 45
    'removeDealer': function(id) {                                                                                   // 46
        var update = dealers.remove(id, function(err, res) {                                                         // 47
            if (!err)                                                                                                // 48
                console.log(Meteor.userId(), 'removed:', res, 'dealer(s)', id);                                      // 49
            else {                                                                                                   // 50
                console.log('An error occured during dealer removal ', err);                                         // 51
                Meteor.Error('SAVI:User-Management: Removing-Dealer', 'Dealer could not be removed - ' + id, err);   // 52
            }                                                                                                        // 53
        });                                                                                                          // 54
        return update;                                                                                               // 55
    },                                                                                                               // 56
    'addDealer': function(opts) {                                                                                    // 57
                                                                                                                     // 58
    },                                                                                                               // 59
    'updateUser': function(selector, query) {                                                                        // 60
        query = {                                                                                                    // 61
            $set: query                                                                                              // 62
        };                                                                                                           // 63
        var update = Meteor.users.update(selector, query, function(err, res) {                                       // 64
            if (!err)                                                                                                // 65
                console.log(Meteor.userId(), 'updated:', res, 'user(s)', selector);                                  // 66
            else {                                                                                                   // 67
                console.log('An error occured during user update', err);                                             // 68
                Meteor.Error('SAVI:User-Management: Updating-User', 'User could not be updated - ' + selector, err); // 69
            }                                                                                                        // 70
        });                                                                                                          // 71
        return update;                                                                                               // 72
    },                                                                                                               // 73
    'updateDealer': function(selector, query) {                                                                      // 74
        query = {                                                                                                    // 75
            $set: query                                                                                              // 76
        };                                                                                                           // 77
        var update = dealers.update(selector, query, function(err, res) {                                            // 78
            if (!err)                                                                                                // 79
                console.log(Meteor.userId(), 'updated:', res, 'dealer(s)', selector);                                // 80
            else {                                                                                                   // 81
                console.log('An error occured during dealer update', err);                                           // 82
                Meteor.Error('SAVI:User-Management: Updating-Dealer', 'Dealer could not be updated - ' + selector, err);
            }                                                                                                        // 84
        });                                                                                                          // 85
        return update;                                                                                               // 86
    }                                                                                                                // 87
});                                                                                                                  // 88
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/savi:user-management/server/email.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
absoluteUrl = 'http://meteor.l2share.net:3001'; // Leave off trailing slash                                          // 1
Accounts.emailTemplates.siteName = 'savicontrols.com';                                                               // 2
Accounts.emailTemplates.from = 'SAVI Controls <info@savicontrols.com>';                                              // 3
Accounts.emailTemplates.enrollAccount.subject = function(user) {                                                     // 4
    return 'SAVI Controls - Your Dealer Account has been accepted!';                                                 // 5
};                                                                                                                   // 6
Accounts.emailTemplates.enrollAccount.html = function(user, url) {                                                   // 7
    url = url.split('#')[1];                                                                                         // 8
    var host = absoluteUrl;                                                                                          // 9
    return 'Hello, ' + user.profile.firstName + '<br><br>' +                                                         // 10
        'Your account is not yet activated. You must first <a href="' + host + url + '">verify your email by clicking here</a><br>' +
        'After verifying your account/email you may login.<br><br>'+                                                 // 12
        '- SAVI Controls<br><br>' +                                                                                  // 13
        'Do not reply to this email - Please contact <a href="mailto:support@savicontrols.com">support@savicontrols.com</a> for additional help';
};                                                                                                                   // 15
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
