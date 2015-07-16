(function(){
Template.__checkName("prereqEdit");
Template["prereqEdit"] = new Template("Template.prereqEdit", (function() {
  var view = this;
  return HTML.P({
    "class": "prereq"
  }, "\n		", HTML.DIV({
    "class": "form-group"
  }, "\n			", HTML.DIV({
    "class": "input-group"
  }, "\n				", HTML.Raw('<span class="input-group-addon">&diams;</span>'), "\n				", HTML.INPUT({
    type: "text",
    name: "prereq",
    id: "prereq",
    "class": "form-control",
    placeholder: "Prerequisite",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "text"));
    }
  }), "\n				", HTML.Raw('<span class="input-group-addon"><i class="fa fa-times remove_prereq"></i></span>'), "\n			"), "\n		"), "\n	");
}));

})();
