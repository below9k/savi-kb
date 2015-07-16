(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return [ Spacebars.With(function() {
    return Spacebars.call(view.lookup("getNotifier"));
  }, function() {
    return [ "\n	", HTML.DIV({
      id: "notifier",
      style: "display: none;"
    }, "\n		", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "msgs"));
    }, function() {
      return [ "\n		", HTML.P("\n			", Blaze.View(function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "msgs"));
      }), "\n		"), "\n		" ];
    }), "\n	"), "\n	" ];
  }), "\n	", HTML.DIV({
    "class": "wrapper"
  }, "\n		", HTML.DIV({
    "class": "top_bar no_print"
  }, "\n			", HTML.SPAN("\n				", Blaze.If(function() {
    return Spacebars.call(view.lookup("loggedIn"));
  }, function() {
    return [ "\n				", HTML.SPAN({
      id: "openNavi"
    }, "\n					", HTML.I({
      "class": "fa fa-2x fa-bars"
    }), "\n				"), "\n				" ];
  }), "\n				", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "landing");
    }
  }, "\n					", HTML.Raw('<img src="http://below9k.info:8080/images/SAVI_77x25%5B1%5D.png" alt="">'), "\n				"), "\n			"), "\n			", HTML.UL({
    "class": "loginBar"
  }, "\n				", Spacebars.include(view.lookupTemplate("loginButtons")), "\n			"), "\n		"), "\n		", HTML.DIV({
    "class": "content"
  }, "\n			", Spacebars.include(view.lookupTemplate("yield")), "\n		"), "\n	"), HTML.Raw('\n	<div class="bot_bar no_print"></div>\n	'), HTML.DIV({
    "class": "sb sb-left no_print"
  }, "\n		", HTML.Raw('<p style="text-align: center;">\n			Menu\n		</p>'), "\n		", HTML.P("\n			", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
        _id: view.lookup("newObjId")
      }));
    }
  }, HTML.Raw("&nbsp;"), "New Article", HTML.Raw('<i class="fa fa-1x fa-plus-square"></i>')), "\n		"), "\n		", HTML.P("\n			", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "imexImport");
    }
  }, HTML.Raw("&nbsp;"), "SAVI Parser", HTML.Raw('<i class="fa fa-1x fa-gear"></i>')), "\n		"), "\n		", HTML.Raw('<p>\n			<a href="http://below9k.info:3000">&nbsp;SAVI Controls<i class="fa fa-1x fa-play-circle"></i></a>\n		</p>'), "\n	") ];
}));

})();
