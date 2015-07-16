(function(){
Template.__checkName("landing");
Template["landing"] = new Template("Template.landing", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-sm-12 col-lg-12"
  }, "\n			", HTML.Raw("<h4>Search</h4>"), "\n			", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n			", HTML.DIV({
    "class": "block"
  }, "\n				", HTML.Raw('<input type="text" name="search" id="search" class="form-control">'), "\n				", HTML.Raw('<div class="checkbox">\n					<label>\n						<input type="checkbox" name="advSearch" value="" id="advSearch">Search in steps also? (takes longer)\n					</label>\n				</div>'), "\n				", HTML.DIV({
    "class": "ui-search"
  }, "\n					", Blaze.If(function() {
    return Spacebars.call(view.lookup("articleSearch"));
  }, function() {
    return [ "\n					", HTML.UL({
      "class": "step_searches row"
    }, "\n						", Blaze.Each(function() {
      return Spacebars.call(view.lookup("articleSearch"));
    }, function() {
      return [ "\n						", HTML.DIV({
        "class": "col-md-4 col-lg-3"
      }, "\n							", HTML.DIV({
        "class": "landing-item step_search scrollable"
      }, "\n								", Blaze.View(function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("link"), Spacebars.kw({
          id: Spacebars.dot(view.lookup("."), "_id"),
          parent: Spacebars.dot(view.lookup("."), "parent", "title"),
          title: Spacebars.dot(view.lookup("."), "title")
        })));
      }), "\n								", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n								", HTML.UL("\n									", Blaze.Each(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "steps"));
      }, function() {
        return [ " ", Blaze.View(function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("searchTextSample"), Spacebars.dot(view.lookup("."), "text", "htmlcode")));
        }), " " ];
      }), "\n								"), "\n							"), "\n						"), "\n						" ];
    }), "\n					"), "\n					" ];
  }, function() {
    return [ "\n					", HTML.SPAN("No results found."), "\n					" ];
  }), "\n				"), "\n			"), "\n		"), "\n		", HTML.DIV({
    "class": "col-sm-12 col-lg-12"
  }, "\n			", HTML.Raw("<h4>Article Groups</h4>"), "\n			", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n			", HTML.DIV({
    "class": "block"
  }, "\n				", HTML.DIV({
    "class": "row"
  }, "\n					", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getArticleGroups"));
  }, function() {
    return [ "\n					", HTML.DIV({
      "class": "col-lg-3 col-md-4 col-s-6 group-item-group"
    }, "\n						", HTML.P({
      "class": "group-title"
    }, "\n							", HTML.I({
      "class": "fa fa-1x fa-folder-open"
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("parent"));
    }), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.I({
      "class": "fa fa-1x fa-angle-double-down"
    }), "\n						"), "\n						", Blaze.Each(function() {
      return Spacebars.call(view.lookup("articles"));
    }, function() {
      return [ "\n						", HTML.DIV({
        "class": "group-item"
      }, "\n							", HTML.A({
        href: function() {
          return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
            _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
          }));
        }
      }, HTML.I({
        "class": "fa fa-1x fa-file-text"
      }, " ", Blaze.View(function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
      }))), "\n							", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n						"), "\n						" ];
    }), "\n						", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "count"));
    }, function() {
      return [ "\n						", HTML.P("\n							", Blaze.View(function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "count"));
      }), " Articles ", HTML.I({
        "class": "fa fa-1x fa-arrow-circle-right"
      }), "\n						"), "\n						" ];
    }), "\n					"), "\n					" ];
  }), "\n				"), "\n			"), "\n		"), "\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("loggedIn"));
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "col-md-6 col-sm-12"
    }, "\n			", HTML.H4("Recently Updated Articles"), "\n			", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n			", HTML.DIV({
      "class": "block"
    }, "\n				", HTML.DIV({
      "class": "row"
    }, "\n					", Blaze.Each(function() {
      return Spacebars.call(view.lookup("getRecentArticles"));
    }, function() {
      return [ "\n					", HTML.DIV({
        "class": "col-md-6 col-s-12"
      }, "\n						", HTML.DIV({
        "class": "landing-item"
      }, "\n							", Blaze.View(function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("link"), Spacebars.kw({
          id: Spacebars.dot(view.lookup("."), "_id"),
          parent: Spacebars.dot(view.lookup("."), "parent", "title"),
          title: Spacebars.dot(view.lookup("."), "title")
        })));
      }), "\n							", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n						"), "\n					"), "\n					" ];
    }), "\n				"), "\n			"), "\n		"), "\n		", HTML.DIV({
      "class": "col-md-6 col-sm-12"
    }, "\n			", HTML.H4("My Articles"), "\n			", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n			", HTML.DIV({
      "class": "block"
    }, "\n				", HTML.DIV({
      "class": "row"
    }, "\n					", Blaze.Each(function() {
      return Spacebars.call(view.lookup("getRecentArticles"));
    }, function() {
      return [ "\n					", HTML.DIV({
        "class": "col-md-6 col-s-12"
      }, "\n						", HTML.DIV({
        "class": "landing-item"
      }, "\n							", Blaze.View(function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("link"), Spacebars.kw({
          id: Spacebars.dot(view.lookup("."), "_id"),
          parent: Spacebars.dot(view.lookup("."), "parent", "title"),
          title: Spacebars.dot(view.lookup("."), "title")
        })));
      }), "\n							", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n						"), "\n					"), "\n					" ];
    }), "\n				"), "\n			"), "\n		"), "\n		" ];
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "col-lg-12"
    }, "\n			", HTML.H4("Recently Updated Articles"), "\n			", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n			", HTML.DIV({
      "class": "block"
    }, "\n				", HTML.DIV({
      "class": "row"
    }, "\n					", Blaze.Each(function() {
      return Spacebars.call(view.lookup("getRecentArticles"));
    }, function() {
      return [ "\n					", HTML.DIV({
        "class": "col-md-4 col-lg-3 col-s-6 col-xs-12"
      }, "\n						", HTML.DIV({
        "class": "landing-item"
      }, "\n							", Blaze.View(function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("link"), Spacebars.kw({
          id: Spacebars.dot(view.lookup("."), "_id"),
          parent: Spacebars.dot(view.lookup("."), "parent", "title"),
          title: Spacebars.dot(view.lookup("."), "title")
        })));
      }), "\n							", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n						"), "\n					"), "\n					" ];
    }), "\n				"), "\n			"), "\n		"), "\n		" ];
  }), "\n	");
}));

})();
