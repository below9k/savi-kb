(function(){
Template.__checkName("prereqView");
Template["prereqView"] = new Template("Template.prereqView", (function() {
  var view = this;
  return HTML.DIV({
    "class": "stepBlock row"
  }, "\n		", HTML.DIV({
    "class": "col-md-12 col-xs-12 step"
  }, "\n			", HTML.Raw('<h3 class="step_title">Prerequisites</h3>'), "\n			", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "prereq"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": "step_content"
    }, "\n				", HTML.P({
      "class": "prereq"
    }, HTML.CharRef({
      html: "&diams;",
      str: "♦"
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "text"));
    })), "\n			"), "\n			" ];
  }), "\n		"), HTML.Raw("\n		<hr>\n	"));
}));

})();
