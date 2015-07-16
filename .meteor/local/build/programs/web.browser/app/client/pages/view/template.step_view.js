(function(){
Template.__checkName("stepView");
Template["stepView"] = new Template("Template.stepView", (function() {
  var view = this;
  return HTML.DIV({
    "class": "stepBlock row"
  }, "\n	", HTML.DIV({
    "class": "col-lg-12 col-md-12 col-xs-12 step"
  }, "\n		", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "title"));
  }, function() {
    return HTML.H3({
      "class": "step_title",
      id: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
      }
    }, Blaze.View("lookup:..title", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
    }));
  }), "\n		", HTML.P({
    "class": "step_content"
  }, Blaze.View("lookup:..text.htmlcode", function() {
    return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("."), "text", "htmlcode")));
  })), "\n	"), HTML.Raw("\n	<hr>\n"));
}));

})();
