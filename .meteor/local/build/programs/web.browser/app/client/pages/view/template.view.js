(function(){
Template.__checkName("view");
Template["view"] = new Template("Template.view", (function() {
  var view = this;
  return [ HTML.INPUT({
    type: "hidden",
    name: "article_id",
    id: "article_id",
    value: function() {
      return Spacebars.mustache(view.lookup("setArticleId"));
    }
  }), HTML.Raw('\n	<div class="lightbox">\n		<img src="/images/logo.png" alt="loading">\n	</div>\n	<div class="print_logo">\n		<img src="/images/logo.png" alt="logo">\n	</div>\n	'), HTML.DIV({
    id: "edit",
    "class": "edit"
  }, "\n		", HTML.H4({
    "class": "print_center article_title"
  }, HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
        _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
      }));
    }
  }, Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "parent", "title"));
  }, function() {
    return [ Blaze.View("lookup:..parent.title", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
    }), " ", HTML.CharRef({
      html: "&raquo;",
      str: "»"
    }), " " ];
  }), Blaze.View("lookup:..title", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
  })), Blaze.Unless(function() {
    return Spacebars.call(view.lookup("isMobile"));
  }, function() {
    return Blaze.If(function() {
      return Spacebars.call(view.lookup("currentUser"));
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
        "class": "no_print fa fa-1x fa-pencil-square-o"
      }, HTML.Comment(" Edit "))) ];
    });
  })), "\n		", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n		", HTML.DIV({
    id: "steps",
    "class": "steps row block"
  }, "\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("prereq_enable"));
  }, function() {
    return [ "\n				", Blaze.If(function() {
      return Spacebars.call(view.lookup("prereq"));
    }, function() {
      return [ "\n					", Spacebars.include(view.lookupTemplate("prereqView")), "\n				" ];
    }), "\n			" ];
  }), "\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("steps"));
  }, function() {
    return [ "\n				", Blaze.Each(function() {
      return Spacebars.call(view.lookup("steps"));
    }, function() {
      return [ "\n					", Spacebars.include(view.lookupTemplate("stepView")), "\n				" ];
    }), "\n			" ];
  }, function() {
    return [ "\n				", Spacebars.include(view.lookupTemplate("stepView")), "\n			" ];
  }), "\n		"), "\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n		", Spacebars.include(view.lookupTemplate("comments")), "\n		" ];
  }), "	\n	") ];
}));

})();
