Meteor.publish('dealers', function() {
    var access = roles.findOne(this.userId);
	if (access && access.isAdmin) 
		return dealers.find();
    return [];
});
Meteor.publish('users', function() {
	var access = roles.findOne(this.userId);
	if (access && access.isAdmin) 
		return Meteor.users.find();
    return [];
});
Meteor.publish('roles',function(){
    if(this.userId)
        return roles.find(this.userId);
    return [];
});