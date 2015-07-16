(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "annoucement",
    style: "display: none;"
  }, "\n	", Spacebars.With(function() {
    return Spacebars.call(view.lookup("getNotifier"));
  }, function() {
    return [ "\n		", Blaze.View("lookup:msg", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("msg")));
    }), "\n	" ];
  }), "\n	"), "\n	", HTML.DIV({
    "class": "wrapper"
  }, "\n		", HTML.HEADER({
    id: "top_bar",
    "class": "top_bar no_print"
  }, "\n			", HTML.SPAN("\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n				", HTML.SPAN({
      id: "openNavi"
    }, "\n					", HTML.I({
      "class": "fa fa-2x fa-bars"
    }), "\n				"), "\n			" ];
  }), "\n			", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "landing");
    }
  }, "\n				", HTML.Raw('<img src="http://cdn.savicontrols.com/assets/kb/img/SAVI_77x25.png" height="25" width="77" alt="SAVI Knowledge Base">'), "\n			"), "\n			"), "\n			", HTML.UL({
    "class": "loginBar"
  }, "\n				", Spacebars.include(view.lookupTemplate("loginButtons")), "\n			"), "\n		"), "\n		", HTML.DIV({
    "class": "content"
  }, "\n			", Spacebars.include(view.lookupTemplate("yield")), "\n		"), "\n		", HTML.NAV({
    id: "side_bar",
    "class": "sb sb-left no_print"
  }, "\n			", HTML.Raw('<p style="text-align: center;">\n				Menu\n			</p>'), "\n			", HTML.P("\n				", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
        _id: view.lookup("newObjId")
      }));
    }
  }, HTML.Raw("&nbsp;"), "New Article", HTML.Raw('<i class="fa fa-1x fa-plus-square"></i>')), "\n			"), "\n			", HTML.Raw('<p>\n				<a href="http://below9k.info:8181">&nbsp;SAVI Controls<i class="fa fa-1x fa-play-circle"></i></a>\n			</p>'), "\n            ", Spacebars.include(view.lookupTemplate("adminButton")), "\n		"), "\n	"), HTML.Raw('\n	<footer id="bot_bar" class="bot_bar no_print"></footer>') ];
}));

})();
