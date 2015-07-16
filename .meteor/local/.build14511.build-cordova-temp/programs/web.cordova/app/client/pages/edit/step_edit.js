(function(){Template.stepEdit.events({
	'click .remove_step': function(e) {
		//alert('stepEdit->click .remove_step');
		var c = confirm('Remove step? !NO TAKE BACKS!');
		if (c)
			$(e.currentTarget).parents('.stepBlock').remove();
	},
	'click .sortable_handle_move_down': function(e) {
		//alert('stepEdit->click .sortable_handle_move_down');
		var t = $(e.currentTarget);
		//var tbio = textboxio.get('.editArea');
		for (var i = 0; i < tbio.length; i++) {
			tbio[i].restore();
		}
		var ele = $(e.currentTarget).parents('.stepBlock');
		ele.insertAfter(ele.next());
		//tbio = textboxio.replaceAll('.editArea');
	},
	'click .sortable_handle_move_up': function(e) {
		//alert('stepEdit->click .sortable_handle_move_up');
		var t = $(e.currentTarget);
		//var tbio = textboxio.get('.editArea');
		for (var i = 0; i < tbio.length; i++) {
			tbio[i].restore();
		}
		var ele = $(e.currentTarget).parents('.stepBlock');
		ele.insertBefore(ele.prev());
		//tbio = textboxio.replaceAll('.editArea');
	}
});

})();
