Meteor.subscribe('roles');

Template.registerHelper('isAdmin', function() {
    var role = roles.findOne(Meteor.userId());
    var access = role ? role.isAdmin : false;
    return access;
});

/*
 * Admin Layout Template (Combines Dealer & User Management)
 */

Template.adminLayout.helpers({

});

Template.adminLayout.events({
    // Tab for Users Management
    'click #users': function() {
        $('#users').addClass('selectedTab').prev('#dealers').removeClass('selectedTab');
        $('div.users').show().next('.dealers').hide();
    },
    // Tab for Dealers Management
    'click #dealers': function() {
        $('#dealers').addClass('selectedTab').next('#users').removeClass('selectedTab');
        $('div.dealers').show().prev('.users').hide();
    },
    // Start Field Edit
    'click article p': function(e) {
        var t = $(e.currentTarget);
        t.hide().next('input,textarea').show().focus();
    },
    // Save and End Field Edit
    'blur .dealers input,.dealers textarea': function(e) {
        var t = $(e.currentTarget),
            update = {},
            value = t.val();
        update[t.attr('class')] = value;
        t.hide().prev('p').show();
        Meteor.call('updateDealer', this._id, update);
    },
    // Save and End Field Edit
    'blur .users input,.users textarea': function(e) {
        var t = $(e.currentTarget),
            update = {},
            value = t.val();
        update['profile.' + t.attr('class')] = value;
        t.hide().prev('p').show();
        Meteor.call('updateUser', this._id, update);
    }
});

/*
 * Dealer Management Template
 */

Template.dealersManagement.helpers({
    // Retrieves Dealers List for Data Context
    'dealers': function() {
        var d = dealers.find({
            $or: [{
                'isUser': false
            }, {
                'isUser': {
                    $exists: false
                }
            }]
        });
        console.log('dealers', d.fetch());
        return d;
    }
});

Template.dealersManagement.events({
    // Button to Add User
    'click .addUser': function(e) {
        var dealerId = this._id,
            dealer = dealers.findOne(dealerId),
            user;
        if (dealer) {
            user = {
                username: dealer.email,
                email: dealer.email,
                profile: {
                    company: dealer.company,
                    firstName: dealer.firstName,
                    lastName: dealer.lastName,
                    phoneNumber: dealer.phoneNumber,
                    mailingList: dealer.mailList || false,
                    comments: dealer.comments,
                    dealerId: dealer._id
                }
            };
            Meteor.call('addUser', dealerId, function(err, res) {
                if (!err)
                    console.log('Added User:', res);
                else
                    console.log('Error adding user:', err);
            });
        } else
            console.log('Error moving dealer to users');
    },
    // Button to Remove Dealer
    'click .removeDealer': function(e) {
        var dealerId = this._id;
        var dealer = dealers.findOne(dealerId);
        if (dealer) {
            var remove = confirm('Delete ' + dealer.email + ' dealer? This cannot be undone.');
            if (remove) {
                Meteor.call('removeDealer', dealerId, function(err, res) {
                    if (!err)
                        console.log('Removed Dealer:', dealerId);
                    else
                        console.log('Error removing dealer:', err);
                });
            }
        } else
            console.log('Error removing dealer.');
    },
});

/*
 * Users Management Template
 */

Template.usersManagement.helpers({
    // Retrieves User List for Data Context
    'users': function() {
        var u = Meteor.users.find();
        console.log('users', u.fetch());
        return u;
    }
});

Template.usersManagement.events({
    // Button to Remove User
    'click .removeUser': function(e) {
        var userId = this._id;
        var user = Meteor.users.findOne(userId);
        if (user) {
            var remove = confirm('Delete ' + user.emails[0].address + ' user? This cannot be undone.');
            if (remove) {
                Meteor.call('removeUser', userId, function(err, res) {
                    if (!err)
                        console.log('Removed User:', userId);
                    else
                        console.log('Error removing user:', err);
                });
            }
        } else
            console.log('Error removing user.');
    }
});