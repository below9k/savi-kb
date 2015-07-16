(function(){
Template.__checkName("prereqView");
Template["prereqView"] = new Template("Template.prereqView", (function() {
  var view = this;
  return HTML.DIV({
    "class": "stepBlock row"
  }, "\n		", HTML.DIV({
    "class": "col-lg-12 col-md-12 col-xs-12 step"
  }, "\n			", HTML.Raw('<h3 class="step_title">Prerequisites</h3>'), "\n			", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "prereq"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": "step_content"
    }, "\n				", HTML.P({
      "class": "prereq"
    }, HTML.SPAN(HTML.CharRef({
      html: "&#9633;",
      str: "□"
    })), " ", Blaze.View("lookup:..text", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "text"));
    })), "\n			"), "\n			" ];
  }), "\n		"), HTML.Raw("\n		<hr>\n	"));
}));

})();
