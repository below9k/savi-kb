// --------
// Route Configs
// --------
var config = {
    route: '/admin',
    name: 'user-management',
    template: 'adminLayout'
};
// --------
// Determine project router to be used
// --------
if (typeof FlowRouter !== 'undefined') {
    /*
     * FlowRouter: Is it using FlowLayout?
     */
    FlowRouter.route(config.route, {
        name: config.name,
        subscriptions: function() {
            this.register('dealers', Meteor.subscribe('dealers'));
            this.register('users',Meteor.subscribe('users'));
        },
        action: function() {
            var access = roles.findOne(Meteor.userId());
            if (access && access.isAdmin) {
                Meteor.call('getUsers', function(err, res) {
                    if (!err)
                        return Session.set('users', res);
                    return;
                });
                // Subscriptions will load reactively - no wait
                this.render(config.template);
            } else
                FlowRouter.go('/');
        }
    });
} else if (typeof Router !== 'undefined') {
    /*
     * Iron-Router: Or Matching Router
     */
    Router.route(config.route, {
        name: config.name,
        path: config.route,
        template: config.template,
        waitOn: function() {
            return [Meteor.subscribe('dealers'), Meteor.subscribe('users')];
        },
        action: function() {
            var access = roles.findOne(Meteor.userId());
            if (!this.ready())
                this.render('loading');
            else if (access && access.isAdmin)
                this.render();
            else
                Router.go('/');
        }
    });
} else
    throw new Meteor.Error('(Dependency) User-Management', 'User-Management could not find a router. Make sure one is added to the project.');