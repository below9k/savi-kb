(function(){
Template.__checkName("stepView");
Template["stepView"] = new Template("Template.stepView", (function() {
  var view = this;
  return HTML.DIV({
    "class": "stepBlock row"
  }, "\n	", HTML.DIV({
    "class": "col-md-12 col-xs-12 step"
  }, "\n		", HTML.H3({
    "class": "step_title"
  }, Blaze.View(function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
  })), "\n		", HTML.P({
    "class": "step_content"
  }, Blaze.View(function() {
    return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("."), "text", "htmlcode")));
  })), "\n	"), HTML.Raw("\n	<hr>\n"));
}));

})();
