(function(){
Template.__checkName("uploadImages");
Template["uploadImages"] = new Template("Template.uploadImages", (function() {
  var view = this;
  return [ HTML.Raw('<input type="file" id="uploadImage" multiple="">\n	'), HTML.DIV({
    id: "images",
    "class": "scrollable"
  }, "\n		", HTML.DIV({
    id: "uploadImages"
  }, "\n			", HTML.DIV({
    "class": "form-group"
  }, "\n				", HTML.DIV({
    "class": "help-block row preview_box imageDrop"
  }, "\n					", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getImages"));
  }, function() {
    return [ "\n					", HTML.DIV({
      "class": "col-md-12 col-xs-12"
    }, "\n						", HTML.DIV({
      "class": "form-group"
    }, "\n							", Blaze.View(function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("uploadedImage")));
    }), "\n							", HTML.DIV({
      "class": "input-group"
    }, "\n								", HTML.SPAN({
      "class": "input-group-addon"
    }, HTML.I({
      "class": "fa fa-clipboard copy_image"
    })), "\n								", HTML.INPUT({
      "class": "form-control",
      onclick: "select()",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("uploadedImage"), true);
      }
    }), "\n								", HTML.SPAN({
      "class": "input-group-addon"
    }, HTML.I({
      "class": "fa fa-2x fa-times remove_image",
      "data-image-id": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
      }
    })), "\n							"), "\n						"), "	\n					"), "\n					" ];
  }), "\n				"), "\n			"), "\n		"), "\n	") ];
}));

})();
