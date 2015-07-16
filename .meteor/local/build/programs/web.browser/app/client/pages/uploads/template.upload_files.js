(function(){
Template.__checkName("uploadFiles");
Template["uploadFiles"] = new Template("Template.uploadFiles", (function() {
  var view = this;
  return [ HTML.DIV({
    alt: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
    },
    "class": "truncate"
  }, "\n	", Blaze.View("lookup:..name", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
  }), "\n"), "\n", HTML.DIV({
    "class": "form-group"
  }, "\n	", HTML.DIV({
    "class": "input-group"
  }, "\n		", HTML.SPAN({
    "class": "input-group-addon copyLinkButton",
    id: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id"));
    },
    "data-clipboard-text": function() {
      return [ "http://ikb.l2share.net:8080", Spacebars.mustache(Spacebars.dot(view.lookup("."), "url")) ];
    },
    placeholder: "Copy to Clipboard"
  }, "\n			", HTML.Raw('<i class="fa fa-copy"></i>'), "\n		"), "\n		", HTML.INPUT({
    type: "text",
    "class": "form-control copyLink",
    placeholder: "Copy to Clipboard",
    value: function() {
      return [ "http://ikb.l2share.net:8080", Spacebars.mustache(Spacebars.dot(view.lookup("."), "url")) ];
    },
    onclick: "select()"
  }), "\n		", HTML.SPAN({
    "class": "input-group-addon"
  }, "\n			", Blaze._TemplateWith(function() {
    return {
      "class": Spacebars.call("fa fa-times")
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("FS"), "DeleteButton"));
    }, function() {
      return null;
    });
  }), "\n		"), "\n	"), "\n") ];
}));

})();
