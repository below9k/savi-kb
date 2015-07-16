(function(){
Template.__checkName("uploadFiles");
Template["uploadFiles"] = new Template("Template.uploadFiles", (function() {
  var view = this;
  return [ HTML.Raw('<input type="file" id="uploadFile" multiple="">\n	'), HTML.DIV({
    id: "files",
    "class": "scrollable"
  }, "\n		", HTML.DIV({
    id: "uploadFiles"
  }, "\n			", HTML.DIV({
    "class": "form-group"
  }, "\n				", HTML.DIV({
    "class": "help-block row preview_box fileDrop"
  }, "\n					", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getFiles"));
  }, function() {
    return [ "\n					", HTML.DIV({
      "class": "col-md-4 col-s-6 col-xs-12"
    }, "\n						", HTML.DIV({
      "class": "form-group"
    }, "\n							", Blaze.View(function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("uploadedFile")));
    }), "\n							", HTML.DIV({
      "class": "input-group"
    }, "\n								", HTML.SPAN({
      "class": "input-group-addon"
    }, HTML.I({
      "class": "fa fa-clipboard copy_file"
    })), "\n								", HTML.INPUT({
      "class": "form-control",
      onclick: "select();",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("uploadedFile"), true);
      }
    }), "\n								", HTML.SPAN({
      "class": "input-group-addon"
    }, HTML.I({
      "class": "fa fa-2x fa-times remove_file",
      "data-file-id": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
      }
    })), "\n							"), "\n						"), "	\n					"), "\n					" ];
  }), "\n				"), "\n			"), "\n		"), "\n	") ];
}));

})();
