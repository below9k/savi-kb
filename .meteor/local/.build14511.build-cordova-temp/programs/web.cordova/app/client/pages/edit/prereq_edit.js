(function(){Template.prereqEdit.events({
	'click .remove_prereq': function(e){
		var c = confirm('Remove prereq.? !NO TAKE BACKS!');
		if(c)
			$(e.currentTarget).parents('p.prereq').remove();
	}
});

})();
