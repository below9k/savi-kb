(function(){
Template.__checkName("loading");
Template["loading"] = new Template("Template.loading", (function() {
  var view = this;
  return HTML.DIV({
    "class": "loadingSpinner"
  }, " ", Spacebars.include(view.lookupTemplate("spinner")), " ");
}));

})();
