(function(){
Template.__checkName("uploads");
Template["uploads"] = new Template("Template.uploads", (function() {
  var view = this;
  return HTML.DIV({
    "class": "lightbox"
  }, "\n		", HTML.DIV({
    id: "uploads",
    "class": "uploads no_print"
  }, "\n			", HTML.Raw("<p>Files:</p>"), HTML.Raw('<i class="fa fa-2x fa-times close_uploads"> Close</i>'), "\n			", Spacebars.include(view.lookupTemplate("uploadFiles")), "\n		"), "	\n	");
}));

})();
