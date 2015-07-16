(function(){
Template.__checkName("stepEdit");
Template["stepEdit"] = new Template("Template.stepEdit", (function() {
  var view = this;
  return HTML.DIV({
    "class": "stepBlock"
  }, "\n		", HTML.DIV({
    "class": "step"
  }, "\n			", HTML.Raw('<div class="unsaved_notifier" style="display:none;">\n				<i class="fa fa-save"></i>&nbsp;*Unsaved changes have been made to this field&nbsp;<i class="fa fa-angle-double-down"></i>\n			</div>'), "\n			", HTML.DIV({
    "class": "form-group"
  }, "\n				", HTML.DIV({
    "class": "input-group"
  }, "\n					", HTML.INPUT({
    name: "step_title",
    type: "text",
    "class": "form-control edit_step_title",
    placeholder: "Step Title",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
    }
  }), "\n					", HTML.DIV({
    "class": "editArea step_content form-control"
  }, "\n						", Blaze.View("lookup:..text.htmlcode", function() {
    return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("."), "text", "htmlcode")));
  }), "\n					"), "\n					", HTML.INPUT({
    name: "compare_me",
    type: "hidden",
    "class": "compare_me",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "text", "htmlcode"));
    }
  }), "\n					", HTML.Raw('<span class="input-group-addon vt">\n						<ul class="step_controls">\n							<li>\n								<i class="fa fa-2x fa-sort-up sortable_handle_move_up"></i>\n								<br>\n								<i class="fa fa-2x fa-reorder sortable_handle"></i>\n								<br>\n							<i class="fa fa-2x fa-sort-down sortable_handle_move_down"></i>\n						</li>\n						<li>\n							<i class="fa fa-2x fa-times remove_step"></i>\n						</li>\n					</ul>\n				</span>'), "\n				"), "\n			"), "\n		"), HTML.Raw("\n		<hr>\n	"));
}));

})();
