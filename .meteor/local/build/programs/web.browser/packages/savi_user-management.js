//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var Mongo = Package.mongo.Mongo;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Iron = Package['iron:core'].Iron;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var dealers, roles;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/savi:user-management/both/router.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// --------                                                                                                           // 1
// Route Configs                                                                                                      // 2
// --------                                                                                                           // 3
var config = {                                                                                                        // 4
    route: '/admin',                                                                                                  // 5
    name: 'user-management',                                                                                          // 6
    template: 'adminLayout'                                                                                           // 7
};                                                                                                                    // 8
// --------                                                                                                           // 9
// Determine project router to be used                                                                                // 10
// --------                                                                                                           // 11
if (typeof FlowRouter !== 'undefined') {                                                                              // 12
    /*                                                                                                                // 13
     * FlowRouter: Is it using FlowLayout?                                                                            // 14
     */                                                                                                               // 15
    FlowRouter.route(config.route, {                                                                                  // 16
        name: config.name,                                                                                            // 17
        subscriptions: function() {                                                                                   // 18
            this.register('dealers', Meteor.subscribe('dealers'));                                                    // 19
            this.register('users',Meteor.subscribe('users'));                                                         // 20
        },                                                                                                            // 21
        action: function() {                                                                                          // 22
            var access = roles.findOne(Meteor.userId());                                                              // 23
            if (access && access.isAdmin) {                                                                           // 24
                Meteor.call('getUsers', function(err, res) {                                                          // 25
                    if (!err)                                                                                         // 26
                        return Session.set('users', res);                                                             // 27
                    return;                                                                                           // 28
                });                                                                                                   // 29
                // Subscriptions will load reactively - no wait                                                       // 30
                this.render(config.template);                                                                         // 31
            } else                                                                                                    // 32
                FlowRouter.go('/');                                                                                   // 33
        }                                                                                                             // 34
    });                                                                                                               // 35
} else if (typeof Router !== 'undefined') {                                                                           // 36
    /*                                                                                                                // 37
     * Iron-Router: Or Matching Router                                                                                // 38
     */                                                                                                               // 39
    Router.route(config.route, {                                                                                      // 40
        name: config.name,                                                                                            // 41
        path: config.route,                                                                                           // 42
        template: config.template,                                                                                    // 43
        waitOn: function() {                                                                                          // 44
            return [Meteor.subscribe('dealers'), Meteor.subscribe('users')];                                          // 45
        },                                                                                                            // 46
        action: function() {                                                                                          // 47
            var access = roles.findOne(Meteor.userId());                                                              // 48
            if (!this.ready())                                                                                        // 49
                this.render('loading');                                                                               // 50
            else if (access && access.isAdmin)                                                                        // 51
                this.render();                                                                                        // 52
            else                                                                                                      // 53
                Router.go('/');                                                                                       // 54
        }                                                                                                             // 55
    });                                                                                                               // 56
} else                                                                                                                // 57
    throw new Meteor.Error('(Dependency) User-Management', 'User-Management could not find a router. Make sure one is added to the project.');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/savi:user-management/both/collections.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
dealers = new Mongo.Collection('dealers');                                                                            // 1
roles = new Mongo.Collection('roles');                                                                                // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/savi:user-management/client/template.userManagement.js                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("adminButton");                                                                                  // 2
Template["adminButton"] = new Template("Template.adminButton", (function() {                                          // 3
  var view = this;                                                                                                    // 4
  return Blaze.If(function() {                                                                                        // 5
    return Spacebars.call(view.lookup("isAdmin"));                                                                    // 6
  }, function() {                                                                                                     // 7
    return [ "\n    ", HTML.P("\n        ", HTML.A({                                                                  // 8
      href: "/admin"                                                                                                  // 9
    }, "\n            ", HTML.CharRef({                                                                               // 10
      html: "&nbsp;",                                                                                                 // 11
      str: " "                                                                                                        // 12
    }), "Admin\n            ", HTML.I({                                                                               // 13
      "class": "fa fa-users"                                                                                          // 14
    }), "\n        "), "\n    "), "\n    " ];                                                                         // 15
  });                                                                                                                 // 16
}));                                                                                                                  // 17
                                                                                                                      // 18
Template.__checkName("adminLayout");                                                                                  // 19
Template["adminLayout"] = new Template("Template.adminLayout", (function() {                                          // 20
  var view = this;                                                                                                    // 21
  return HTML.DIV({                                                                                                   // 22
    id: "adminTabs"                                                                                                   // 23
  }, HTML.Raw('\n        <span id="dealers" class="selectedTab">Dealers</span><span id="users">Users</span>\n        '), HTML.SECTION({
    id: "user-manager"                                                                                                // 25
  }, "\n            ", Spacebars.include(view.lookupTemplate("usersManagement")), "\n            ", Spacebars.include(view.lookupTemplate("dealersManagement")), "\n        "), "\n    ");
}));                                                                                                                  // 27
                                                                                                                      // 28
Template.__checkName("usersManagement");                                                                              // 29
Template["usersManagement"] = new Template("Template.usersManagement", (function() {                                  // 30
  var view = this;                                                                                                    // 31
  return HTML.DIV({                                                                                                   // 32
    "class": "users",                                                                                                 // 33
    style: "display:none;"                                                                                            // 34
  }, "\n        ", Blaze.Each(function() {                                                                            // 35
    return Spacebars.call(view.lookup("users"));                                                                      // 36
  }, function() {                                                                                                     // 37
    return [ "\n        ", HTML.ARTICLE("\n            ", HTML.H2("\n                ", Blaze.View("lookup:emails.0.address", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("emails"), "0", "address"));                                // 39
    }), "\n            "), "\n            ", HTML.LABEL("Company"), "\n            ", HTML.P("\n                ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("profile"), "company"));                                        // 41
    }, function() {                                                                                                   // 42
      return Blaze.View("lookup:profile.company", function() {                                                        // 43
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "company"));                                  // 44
      });                                                                                                             // 45
    }, function() {                                                                                                   // 46
      return HTML.I("null");                                                                                          // 47
    }), "\n            "), "\n            ", HTML.INPUT({                                                             // 48
      "class": "company",                                                                                             // 49
      type: "text",                                                                                                   // 50
      value: function() {                                                                                             // 51
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "company"));                                  // 52
      }                                                                                                               // 53
    }), "\n            ", HTML.LABEL("First Name"), "\n            ", HTML.P("\n                ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("profile"), "firstName"));                                      // 55
    }, function() {                                                                                                   // 56
      return Blaze.View("lookup:profile.firstName", function() {                                                      // 57
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "firstName"));                                // 58
      });                                                                                                             // 59
    }, function() {                                                                                                   // 60
      return HTML.I("null");                                                                                          // 61
    }), "\n            "), "\n            ", HTML.INPUT({                                                             // 62
      "class": "firstName",                                                                                           // 63
      type: "text",                                                                                                   // 64
      value: function() {                                                                                             // 65
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "firstName"));                                // 66
      }                                                                                                               // 67
    }), "\n            ", HTML.LABEL("Last Name"), "\n            ", HTML.P("\n                ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("profile"), "lastName"));                                       // 69
    }, function() {                                                                                                   // 70
      return Blaze.View("lookup:profile.lastName", function() {                                                       // 71
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "lastName"));                                 // 72
      });                                                                                                             // 73
    }, function() {                                                                                                   // 74
      return HTML.I("null");                                                                                          // 75
    }), "\n            "), "\n            ", HTML.INPUT({                                                             // 76
      "class": "lastName",                                                                                            // 77
      type: "text",                                                                                                   // 78
      value: function() {                                                                                             // 79
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "lastName"));                                 // 80
      }                                                                                                               // 81
    }), "\n            ", HTML.LABEL("Phone #"), "\n            ", HTML.P("\n                ", Blaze.If(function() { // 82
      return Spacebars.call(Spacebars.dot(view.lookup("profile"), "phoneNumber"));                                    // 83
    }, function() {                                                                                                   // 84
      return Blaze.View("lookup:profile.phoneNumber", function() {                                                    // 85
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "phoneNumber"));                              // 86
      });                                                                                                             // 87
    }, function() {                                                                                                   // 88
      return HTML.I("null");                                                                                          // 89
    }), "\n            "), "\n            ", HTML.INPUT({                                                             // 90
      "class": "phoneNumber",                                                                                         // 91
      type: "text",                                                                                                   // 92
      value: function() {                                                                                             // 93
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "phoneNumber"));                              // 94
      }                                                                                                               // 95
    }), "\n            ", Blaze.If(function() {                                                                       // 96
      return Spacebars.call(Spacebars.dot(view.lookup("profile"), "comments"));                                       // 97
    }, function() {                                                                                                   // 98
      return [ "\n            ", HTML.LABEL("Comment(s)"), "\n            ", HTML.P("\n                ", Blaze.View("lookup:profile.comments", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "comments"));                                 // 100
      }), "\n            "), "\n            ", HTML.TEXTAREA({                                                        // 101
        "class": "comments",                                                                                          // 102
        value: function() {                                                                                           // 103
          return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "comments"));                               // 104
        }                                                                                                             // 105
      }), "\n            " ];                                                                                         // 106
    }), "\n            ", HTML.DIV("\n                ", HTML.I(Blaze.View("lookup:createdAt", function() {           // 107
      return Spacebars.mustache(view.lookup("createdAt"));                                                            // 108
    })), "\n            "), "\n            ", HTML.DIV({                                                              // 109
      "class": "controls"                                                                                             // 110
    }, "\n                ", HTML.BUTTON({                                                                            // 111
      "class": "removeUser",                                                                                          // 112
      value: function() {                                                                                             // 113
        return Spacebars.mustache(view.lookup("_id"));                                                                // 114
      }                                                                                                               // 115
    }, "\n                    ", HTML.I({                                                                             // 116
      "class": "fa fa-user-times fa-fw"                                                                               // 117
    }), "\n                    Remove User\n                "), "\n            "), "\n        "), "\n        " ];     // 118
  }), "\n    ");                                                                                                      // 119
}));                                                                                                                  // 120
                                                                                                                      // 121
Template.__checkName("dealersManagement");                                                                            // 122
Template["dealersManagement"] = new Template("Template.dealersManagement", (function() {                              // 123
  var view = this;                                                                                                    // 124
  return HTML.DIV({                                                                                                   // 125
    "class": "dealers"                                                                                                // 126
  }, "\n        ", Blaze.Each(function() {                                                                            // 127
    return Spacebars.call(view.lookup("dealers"));                                                                    // 128
  }, function() {                                                                                                     // 129
    return [ "\n        ", HTML.ARTICLE("\n            ", HTML.H2("\n                ", Blaze.View("lookup:company", function() {
      return Spacebars.mustache(view.lookup("company"));                                                              // 131
    }), HTML.CharRef({                                                                                                // 132
      html: "&nbsp;",                                                                                                 // 133
      str: " "                                                                                                        // 134
    }), "-", HTML.CharRef({                                                                                           // 135
      html: "&nbsp;",                                                                                                 // 136
      str: " "                                                                                                        // 137
    }), Blaze.View("lookup:email", function() {                                                                       // 138
      return Spacebars.mustache(view.lookup("email"));                                                                // 139
    }), "\n            "), "\n            ", HTML.LABEL("First Name"), "\n            ", HTML.P("\n                ", Blaze.View("lookup:firstName", function() {
      return Spacebars.mustache(view.lookup("firstName"));                                                            // 141
    }), "\n            "), "\n            ", HTML.INPUT({                                                             // 142
      "class": "firstName",                                                                                           // 143
      type: "text",                                                                                                   // 144
      value: function() {                                                                                             // 145
        return Spacebars.mustache(view.lookup("firstName"));                                                          // 146
      }                                                                                                               // 147
    }), "\n            ", HTML.LABEL("Last Name"), "\n            ", HTML.P("\n                ", Blaze.View("lookup:lastName", function() {
      return Spacebars.mustache(view.lookup("lastName"));                                                             // 149
    }), "\n            "), "\n            ", HTML.INPUT({                                                             // 150
      "class": "lastName",                                                                                            // 151
      type: "text",                                                                                                   // 152
      value: function() {                                                                                             // 153
        return Spacebars.mustache(view.lookup("lastName"));                                                           // 154
      }                                                                                                               // 155
    }), "\n            ", HTML.LABEL("Phone #"), "\n            ", HTML.P("\n                ", Blaze.View("lookup:phoneNumber", function() {
      return Spacebars.mustache(view.lookup("phoneNumber"));                                                          // 157
    }), "\n            "), "\n            ", HTML.INPUT({                                                             // 158
      "class": "phoneNumber",                                                                                         // 159
      type: "text",                                                                                                   // 160
      value: function() {                                                                                             // 161
        return Spacebars.mustache(view.lookup("phoneNumber"));                                                        // 162
      }                                                                                                               // 163
    }), "\n            ", Blaze.If(function() {                                                                       // 164
      return Spacebars.call(view.lookup("comments"));                                                                 // 165
    }, function() {                                                                                                   // 166
      return [ "\n            ", HTML.LABEL("Comment(s)"), "\n            ", HTML.P("\n                ", Blaze.View("lookup:comments", function() {
        return Spacebars.mustache(view.lookup("comments"));                                                           // 168
      }), "\n            "), "\n            ", HTML.TEXTAREA({                                                        // 169
        "class": "comments",                                                                                          // 170
        value: function() {                                                                                           // 171
          return Spacebars.mustache(view.lookup("comments"));                                                         // 172
        }                                                                                                             // 173
      }), "\n            " ];                                                                                         // 174
    }), "\n            ", HTML.DIV({                                                                                  // 175
      "class": "controls"                                                                                             // 176
    }, "\n                ", HTML.BUTTON({                                                                            // 177
      "class": "addUser",                                                                                             // 178
      value: function() {                                                                                             // 179
        return Spacebars.mustache(view.lookup("_id"));                                                                // 180
      }                                                                                                               // 181
    }, "\n                    ", HTML.I({                                                                             // 182
      "class": "fa fa-user-plus fa-fw"                                                                                // 183
    }), "\n                    Add User\n                "), "\n                ", HTML.BUTTON({                      // 184
      "class": "removeDealer",                                                                                        // 185
      value: function() {                                                                                             // 186
        return Spacebars.mustache(view.lookup("_id"));                                                                // 187
      }                                                                                                               // 188
    }, "\n                    ", HTML.I({                                                                             // 189
      "class": "fa fa-times fa-fw"                                                                                    // 190
    }), "\n                    Remove Dealer\n                "), "\n            "), "\n        "), "\n        " ];   // 191
  }, function() {                                                                                                     // 192
    return [ "\n        ", HTML.DIV("\n            ", HTML.H1("\n                No Dealers Awaiting Approval..\n            "), "\n        "), "\n        " ];
  }), "\n    ");                                                                                                      // 194
}));                                                                                                                  // 195
                                                                                                                      // 196
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/savi:user-management/client/userManagement.js                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.subscribe('roles');                                                                                            // 1
                                                                                                                      // 2
Template.registerHelper('isAdmin', function() {                                                                       // 3
    var role = roles.findOne(Meteor.userId());                                                                        // 4
    var access = role ? role.isAdmin : false;                                                                         // 5
    return access;                                                                                                    // 6
});                                                                                                                   // 7
                                                                                                                      // 8
/*                                                                                                                    // 9
 * Admin Layout Template (Combines Dealer & User Management)                                                          // 10
 */                                                                                                                   // 11
                                                                                                                      // 12
Template.adminLayout.helpers({                                                                                        // 13
                                                                                                                      // 14
});                                                                                                                   // 15
                                                                                                                      // 16
Template.adminLayout.events({                                                                                         // 17
    // Tab for Users Management                                                                                       // 18
    'click #users': function() {                                                                                      // 19
        $('#users').addClass('selectedTab').prev('#dealers').removeClass('selectedTab');                              // 20
        $('div.users').show().next('.dealers').hide();                                                                // 21
    },                                                                                                                // 22
    // Tab for Dealers Management                                                                                     // 23
    'click #dealers': function() {                                                                                    // 24
        $('#dealers').addClass('selectedTab').next('#users').removeClass('selectedTab');                              // 25
        $('div.dealers').show().prev('.users').hide();                                                                // 26
    },                                                                                                                // 27
    // Start Field Edit                                                                                               // 28
    'click article p': function(e) {                                                                                  // 29
        var t = $(e.currentTarget);                                                                                   // 30
        t.hide().next('input,textarea').show().focus();                                                               // 31
    },                                                                                                                // 32
    // Save and End Field Edit                                                                                        // 33
    'blur .dealers input,.dealers textarea': function(e) {                                                            // 34
        var t = $(e.currentTarget),                                                                                   // 35
            update = {},                                                                                              // 36
            value = t.val();                                                                                          // 37
        update[t.attr('class')] = value;                                                                              // 38
        t.hide().prev('p').show();                                                                                    // 39
        Meteor.call('updateDealer', this._id, update);                                                                // 40
    },                                                                                                                // 41
    // Save and End Field Edit                                                                                        // 42
    'blur .users input,.users textarea': function(e) {                                                                // 43
        var t = $(e.currentTarget),                                                                                   // 44
            update = {},                                                                                              // 45
            value = t.val();                                                                                          // 46
        update['profile.' + t.attr('class')] = value;                                                                 // 47
        t.hide().prev('p').show();                                                                                    // 48
        Meteor.call('updateUser', this._id, update);                                                                  // 49
    }                                                                                                                 // 50
});                                                                                                                   // 51
                                                                                                                      // 52
/*                                                                                                                    // 53
 * Dealer Management Template                                                                                         // 54
 */                                                                                                                   // 55
                                                                                                                      // 56
Template.dealersManagement.helpers({                                                                                  // 57
    // Retrieves Dealers List for Data Context                                                                        // 58
    'dealers': function() {                                                                                           // 59
        var d = dealers.find({                                                                                        // 60
            $or: [{                                                                                                   // 61
                'isUser': false                                                                                       // 62
            }, {                                                                                                      // 63
                'isUser': {                                                                                           // 64
                    $exists: false                                                                                    // 65
                }                                                                                                     // 66
            }]                                                                                                        // 67
        });                                                                                                           // 68
        console.log('dealers', d.fetch());                                                                            // 69
        return d;                                                                                                     // 70
    }                                                                                                                 // 71
});                                                                                                                   // 72
                                                                                                                      // 73
Template.dealersManagement.events({                                                                                   // 74
    // Button to Add User                                                                                             // 75
    'click .addUser': function(e) {                                                                                   // 76
        var dealerId = this._id,                                                                                      // 77
            dealer = dealers.findOne(dealerId),                                                                       // 78
            user;                                                                                                     // 79
        if (dealer) {                                                                                                 // 80
            user = {                                                                                                  // 81
                username: dealer.email,                                                                               // 82
                email: dealer.email,                                                                                  // 83
                profile: {                                                                                            // 84
                    company: dealer.company,                                                                          // 85
                    firstName: dealer.firstName,                                                                      // 86
                    lastName: dealer.lastName,                                                                        // 87
                    phoneNumber: dealer.phoneNumber,                                                                  // 88
                    mailingList: dealer.mailList || false,                                                            // 89
                    comments: dealer.comments,                                                                        // 90
                    dealerId: dealer._id                                                                              // 91
                }                                                                                                     // 92
            };                                                                                                        // 93
            Meteor.call('addUser', dealerId, function(err, res) {                                                     // 94
                if (!err)                                                                                             // 95
                    console.log('Added User:', res);                                                                  // 96
                else                                                                                                  // 97
                    console.log('Error adding user:', err);                                                           // 98
            });                                                                                                       // 99
        } else                                                                                                        // 100
            console.log('Error moving dealer to users');                                                              // 101
    },                                                                                                                // 102
    // Button to Remove Dealer                                                                                        // 103
    'click .removeDealer': function(e) {                                                                              // 104
        var dealerId = this._id;                                                                                      // 105
        var dealer = dealers.findOne(dealerId);                                                                       // 106
        if (dealer) {                                                                                                 // 107
            var remove = confirm('Delete ' + dealer.email + ' dealer? This cannot be undone.');                       // 108
            if (remove) {                                                                                             // 109
                Meteor.call('removeDealer', dealerId, function(err, res) {                                            // 110
                    if (!err)                                                                                         // 111
                        console.log('Removed Dealer:', dealerId);                                                     // 112
                    else                                                                                              // 113
                        console.log('Error removing dealer:', err);                                                   // 114
                });                                                                                                   // 115
            }                                                                                                         // 116
        } else                                                                                                        // 117
            console.log('Error removing dealer.');                                                                    // 118
    },                                                                                                                // 119
});                                                                                                                   // 120
                                                                                                                      // 121
/*                                                                                                                    // 122
 * Users Management Template                                                                                          // 123
 */                                                                                                                   // 124
                                                                                                                      // 125
Template.usersManagement.helpers({                                                                                    // 126
    // Retrieves User List for Data Context                                                                           // 127
    'users': function() {                                                                                             // 128
        var u = Meteor.users.find();                                                                                  // 129
        console.log('users', u.fetch());                                                                              // 130
        return u;                                                                                                     // 131
    }                                                                                                                 // 132
});                                                                                                                   // 133
                                                                                                                      // 134
Template.usersManagement.events({                                                                                     // 135
    // Button to Remove User                                                                                          // 136
    'click .removeUser': function(e) {                                                                                // 137
        var userId = this._id;                                                                                        // 138
        var user = Meteor.users.findOne(userId);                                                                      // 139
        if (user) {                                                                                                   // 140
            var remove = confirm('Delete ' + user.emails[0].address + ' user? This cannot be undone.');               // 141
            if (remove) {                                                                                             // 142
                Meteor.call('removeUser', userId, function(err, res) {                                                // 143
                    if (!err)                                                                                         // 144
                        console.log('Removed User:', userId);                                                         // 145
                    else                                                                                              // 146
                        console.log('Error removing user:', err);                                                     // 147
                });                                                                                                   // 148
            }                                                                                                         // 149
        } else                                                                                                        // 150
            console.log('Error removing user.');                                                                      // 151
    }                                                                                                                 // 152
});                                                                                                                   // 153
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['savi:user-management'] = {
  dealers: dealers,
  roles: roles
};

})();
