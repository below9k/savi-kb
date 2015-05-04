Meteor.methods({
    'addUser': function(dealerId) {
        var dealer = dealers.findOne(dealerId);
        if (dealer) {
            var user = {
                username: dealer.email,
                email: dealer.email,
                profile: {
                    'company': dealer.company,
                    'firstName': dealer.firstName,
                    'lastName': dealer.lastName,
                    'phoneNumber': dealer.phoneNumber,
                    'mailingList': dealer.mailList || false,
                    'comments': dealer.comments,
                    'dealerId': dealer._id,
                    'isAdmin': false
                }
            };
            var userId = Accounts.createUser(user);
            if (userId) {
                Accounts.sendEnrollmentEmail(userId);
                console.log('Enrollment Email sent to:', userId, user.email);
                dealers.update(dealerId, {
                    $set: {
                        'isUser': true
                    }
                });
                return userId;
            }
        } else {
            console.log('An error occured adding dealer ', dealerId, ' - not found');
            Meteor.Error('SAVI:User-Management: Adding-User', 'Dealer was not found - ' + dealerId);
        }
    },
    'removeUser': function(id) {
        var update = Meteor.users.remove(id, function(err, res) {
            if (!err)
                console.log(Meteor.userId(), 'removed:', res, 'user(s)', id);
            else {
                console.log('An error occured during user removal ', err);
                Meteor.Error('SAVI:User-Management: Removing-User', 'User could not be removed - ' + id, err);
            }
        });
        return update;
    },
    'removeDealer': function(id) {
        var update = dealers.remove(id, function(err, res) {
            if (!err)
                console.log(Meteor.userId(), 'removed:', res, 'dealer(s)', id);
            else {
                console.log('An error occured during dealer removal ', err);
                Meteor.Error('SAVI:User-Management: Removing-Dealer', 'Dealer could not be removed - ' + id, err);
            }
        });
        return update;
    },
    'addDealer': function(opts) {

    },
    'updateUser': function(selector, query) {
        query = {
            $set: query
        };
        var update = Meteor.users.update(selector, query, function(err, res) {
            if (!err)
                console.log(Meteor.userId(), 'updated:', res, 'user(s)', selector);
            else {
                console.log('An error occured during user update', err);
                Meteor.Error('SAVI:User-Management: Updating-User', 'User could not be updated - ' + selector, err);
            }
        });
        return update;
    },
    'updateDealer': function(selector, query) {
        query = {
            $set: query
        };
        var update = dealers.update(selector, query, function(err, res) {
            if (!err)
                console.log(Meteor.userId(), 'updated:', res, 'dealer(s)', selector);
            else {
                console.log('An error occured during dealer update', err);
                Meteor.Error('SAVI:User-Management: Updating-Dealer', 'Dealer could not be updated - ' + selector, err);
            }
        });
        return update;
    }
});