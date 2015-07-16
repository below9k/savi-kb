(function(){
Template.__checkName("view");
Template["view"] = new Template("Template.view", (function() {
  var view = this;
  return [ Blaze.View(function() {
    return Spacebars.mustache(view.lookup("problem"));
  }), HTML.Raw('\n	<div class="lightbox">\n		<img src="/images/logo.png" alt="loading">\n	</div>\n	<div class="print_logo">\n		<img src="/images/logo.png" alt="logo">\n	</div>\n	'), HTML.DIV({
    id: "edit",
    "class": "edit"
  }, "\n		", HTML.H4({
    "class": "print_center"
  }, Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "parent", "title"));
  }, function() {
    return [ Blaze.View(function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
    }), " ", HTML.CharRef({
      html: "&raquo;",
      str: "»"
    }), " " ];
  }), Blaze.View(function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
  }), Blaze.If(function() {
    return Spacebars.call(view.lookup("loggedIn"));
  }, function() {
    return [ HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
          _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
        }));
      },
      "class": "no_print"
    }, HTML.I({
      "class": "fa fa-1x fa-pencil-square-o"
    }, HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "Edit")) ];
  })), "\n		", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n		", HTML.DIV({
    id: "steps",
    "class": "steps row block"
  }, "\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("prereq_enable"));
  }, function() {
    return [ "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("prereq"));
    }, function() {
      return [ "\n			", Spacebars.include(view.lookupTemplate("prereqView")), "\n			" ];
    }), "\n			" ];
  }), "\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("steps"));
  }, function() {
    return [ "\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("steps"));
    }, function() {
      return [ "\n			", Spacebars.include(view.lookupTemplate("stepView")), "\n			" ];
    }), "\n			" ];
  }, function() {
    return [ "\n			", Spacebars.include(view.lookupTemplate("stepView")), "\n			" ];
  }), "\n		"), "\n	") ];
}));

})();
