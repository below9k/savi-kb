(function(){
Template.__checkName("uploads");
Template["uploads"] = new Template("Template.uploads", (function() {
  var view = this;
  return HTML.DIV({
    "class": "lightbox"
  }, "\n	", HTML.DIV({
    id: "uploads",
    "class": "uploads no_print"
  }, "\n		", HTML.Raw('<div class="fileDropZone">\n			<input type="file" class="fileGo" multiple="">\n		</div>'), "\n		", HTML.Raw('<span class="dropZoneText">Click/Drop Files Here to Upload</span>'), "\n		", HTML.DIV({
    "class": "row"
  }, "\n		", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getFiles"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": "col-xs-12 col-s-6 col-m-4 col-lg-3"
    }, "\n				", HTML.DIV({
      "class": "uploaded-item"
    }, "\n				", Blaze.Unless(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "isUploaded"));
    }, function() {
      return [ "\n					", Blaze._TemplateWith(function() {
        return {
          bootstrap: Spacebars.call(true)
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("FS"), "UploadProgressBar"));
        });
      }), "\n				" ];
    }, function() {
      return [ "\n					", Spacebars.include(view.lookupTemplate("uploadFiles")), "\n				" ];
    }), "\n				"), "\n			"), "\n		" ];
  }), "\n		"), "\n	"), "\n");
}));

})();
