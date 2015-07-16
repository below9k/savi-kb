(function(){Template.stepEdit.events({
	'mouseup .remove_step': function(e){
		var c = confirm('Remove step? !NO TAKE BACKS!');
		if (c)
			$(e.currentTarget).parents('.stepBlock').remove();
	},
	'mouseup .sortable_handle_move_down': function(e){
		var t = $(e.currentTarget);
		var ele = t.parents('.stepBlock');
		ele.insertAfter(ele.next());
	},
	'mouseup .sortable_handle_move_up': function(e){
		var t = $(e.currentTarget);
		var ele = t.parents('.stepBlock');
		ele.insertBefore(ele.prev());
	}
});
Template.stepEdit.rendered = function(){
	$('.editArea').summernote({
		maxHeight: '30em',
		toolbar: [
			['style', ['style']],
			['font', ['fontsize', 'bold', 'italic', 'underline', 'strikethrough', 'clear']],
			['fontname', ['fontname']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']],
			['table', ['table']],
			['insert', ['link', 'picture', 'hr']],
			['view', ['fullscreen', 'codeview']],
			['help', ['help']]
		]
	});
};

})();
