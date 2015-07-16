(function(){
Template.__checkName("landing");
Template["landing"] = new Template("Template.landing", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row"
  }, "\n		", HTML.DIV({
    "class": "col-sm-12 col-lg-12"
  }, "\n			", HTML.A({
    "class": "help_button",
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "support", Spacebars.kw({
        _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
      }));
    },
    alt: "Support"
  }, "\n				", HTML.Raw('<i class="fa fa-question-circle"></i>'), " Support\n			"), "\n			", HTML.Raw("<p>\n				&nbsp;\n			</p>"), "\n		"), "\n		", HTML.DIV({
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
      }, "\n								", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("isMobile"));
      }, function() {
        return Blaze.If(function() {
          return Spacebars.call(view.lookup("currentUser"));
        }, function() {
          return [ HTML.A({
            "class": "article_option_link",
            href: "#"
          }, HTML.P({
            "class": "fa fa-bookmark deleteButton"
          }, HTML.I({
            "data-id": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
            },
            "data-title": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
            },
            "class": "fa fa-1x fa-times remove_article",
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Remove Article"
          }, HTML.Comment(" Delete ")))), HTML.A({
            "class": "article_option_link",
            href: function() {
              return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
                _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
              }));
            },
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Edit Article"
          }, HTML.P({
            "class": "fa fa-bookmark editButton"
          }, HTML.I({
            "class": "fa fa-1x fa-pencil-square-o"
          }, HTML.Comment(" edit ")))) ];
        });
      }), Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "parent", "title"));
      }, function() {
        return HTML.A({
          "class": "parent_article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        }), " ", HTML.P({
          "class": "under_parent"
        }, HTML.I({
          "class": "fa fa-1x fa-angle-double-up"
        }), Blaze.View("lookup:..parent.title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
        }))));
      }, function() {
        return HTML.A({
          "class": "article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        })));
      }), "\n								", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View("lookup:timeSinceUpdate", function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n								", HTML.DIV({
        "class": "search_list"
      }, "\n									", Blaze.Each(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "steps"));
      }, function() {
        return [ HTML.I({
          "class": "fa fa-plus-square-o expand_full_search"
        }), HTML.DIV({
          "class": "truncate search-result"
        }, Blaze.View("lookup:..text.htmlcode", function() {
          return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("."), "text", "htmlcode")));
        })) ];
      }), "\n								"), "\n							"), "\n						"), "\n						" ];
    }), "\n					"), "\n					" ];
  }, function() {
    return [ "\n					", HTML.SPAN("No results found."), "\n					" ];
  }), "\n				"), "\n			"), "\n		"), "\n		", HTML.DIV({
    "class": "col-sm-12 col-lg-12"
  }, "\n			", HTML.Raw('<span class="allGroupOptions"><i class="fa fa-plus-square-o allGroupPlus"></i>&nbsp;/&nbsp;<i class="fa fa-minus-square-o allGroupMinus"></i></span>'), "\n			", HTML.Raw("<h4>Article Groups</h4>"), "\n			", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n			", HTML.DIV({
    "class": "block"
  }, "\n				", HTML.DIV({
    "class": "row"
  }, "\n					", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getArticleGroups"));
  }, function() {
    return [ "\n					", HTML.DIV({
      "class": "col-lg-3 col-md-4 col-sm-6 group-item-group"
    }, "\n						", HTML.P({
      "class": "group-title"
    }, "\n							", HTML.I({
      "class": "fa fa-minus-square-o toggleGroup"
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.I({
      "class": "fa fa-folder-open toggleGroup"
    }), Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "parent"));
    }, function() {
      return [ HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), Blaze.View("lookup:..parent", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent"));
      }) ];
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.I({
      "class": "fa fa-angle-double-down"
    }), "\n						"), "\n						", HTML.SPAN({
      "class": "group-item-list"
    }, "\n							", Blaze.Each(function() {
      return Spacebars.call(view.lookup("articles"));
    }, function() {
      return [ "\n								", HTML.DIV({
        "class": "group-item"
      }, "\n									", Blaze.View("lookup:statusMarker", function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("statusMarker"), Spacebars.dot(view.lookup("."), "status")));
      }), "\n									", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("isMobile"));
      }, function() {
        return Blaze.If(function() {
          return Spacebars.call(view.lookup("currentUser"));
        }, function() {
          return [ HTML.A({
            "class": "article_option_link",
            href: "#"
          }, HTML.P({
            "class": "fa fa-bookmark deleteButton"
          }, HTML.I({
            "data-id": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
            },
            "data-title": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
            },
            "class": "fa fa-1x fa-times remove_article",
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Remove Article"
          }, HTML.Comment(" Delete ")))), HTML.A({
            "class": "article_option_link",
            href: function() {
              return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
                _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
              }));
            },
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Edit Article"
          }, HTML.P({
            "class": "fa fa-bookmark editButton"
          }, HTML.I({
            "class": "fa fa-1x fa-pencil-square-o"
          }, HTML.Comment(" edit ")))) ];
        });
      }), Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "parent", "title"));
      }, function() {
        return HTML.A({
          "class": "parent_article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        }), " ", HTML.P({
          "class": "under_parent"
        }, HTML.I({
          "class": "fa fa-1x fa-angle-double-up"
        }), Blaze.View("lookup:..parent.title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
        }))));
      }, function() {
        return HTML.A({
          "class": "article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        })));
      }), "\n									", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View("lookup:timeSinceUpdate", function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n								"), "\n							" ];
    }), "\n							", Blaze.If(function() {
      return Spacebars.call(view.lookup("plus"));
    }, function() {
      return [ "\n								", Blaze.Each(function() {
        return Spacebars.call(view.lookup("plus"));
      }, function() {
        return [ "\n									", HTML.DIV({
          "class": "group-item plus-article"
        }, "\n										", Blaze.View("lookup:statusMarker", function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("statusMarker"), Spacebars.dot(view.lookup("."), "status")));
        }), "\n										", Blaze.Unless(function() {
          return Spacebars.call(view.lookup("isMobile"));
        }, function() {
          return Blaze.If(function() {
            return Spacebars.call(view.lookup("currentUser"));
          }, function() {
            return [ HTML.A({
              "class": "article_option_link",
              href: "#"
            }, HTML.P({
              "class": "fa fa-bookmark deleteButton"
            }, HTML.I({
              "data-id": function() {
                return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
              },
              "data-title": function() {
                return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
              },
              "class": "fa fa-1x fa-times remove_article",
              "data-toggle": "tooltip",
              "data-placement": "top",
              title: "Remove Article"
            }, HTML.Comment(" Delete ")))), HTML.A({
              "class": "article_option_link",
              href: function() {
                return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
                  _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
                }));
              },
              "data-toggle": "tooltip",
              "data-placement": "top",
              title: "Edit Article"
            }, HTML.P({
              "class": "fa fa-bookmark editButton"
            }, HTML.I({
              "class": "fa fa-1x fa-pencil-square-o"
            }, HTML.Comment(" edit ")))) ];
          });
        }), Blaze.If(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("."), "parent", "title"));
        }, function() {
          return HTML.A({
            "class": "parent_article_link",
            href: function() {
              return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
                _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
              }));
            }
          }, HTML.DIV(HTML.I({
            "class": "fa fa-file-text"
          }), HTML.CharRef({
            html: "&nbsp;",
            str: " "
          }), Blaze.View("lookup:..title", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
          }), " ", HTML.P({
            "class": "under_parent"
          }, HTML.I({
            "class": "fa fa-1x fa-angle-double-up"
          }), Blaze.View("lookup:..parent.title", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
          }))));
        }, function() {
          return HTML.A({
            "class": "article_link",
            href: function() {
              return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
                _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
              }));
            }
          }, HTML.DIV(HTML.I({
            "class": "fa fa-file-text"
          }), HTML.CharRef({
            html: "&nbsp;",
            str: " "
          }), Blaze.View("lookup:..title", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
          })));
        }), "\n										", HTML.P({
          "class": "article_last_updated"
        }, "Last updated ", Blaze.View("lookup:timeSinceUpdate", function() {
          return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
        })), "\n									"), "\n								" ];
      }), "\n							" ];
    }), "\n							", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "count"));
    }, function() {
      return [ "\n								", HTML.P({
        "class": "plus_articles"
      }, "\n									", HTML.I({
        "class": "fa fa-plus-circle"
      }), " ", Blaze.View("lookup:..count", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "count"));
      }), " More Articles\n								"), "\n							" ];
    }), "\n						"), "\n						", HTML.HR(), "\n					"), "\n					" ];
  }), "\n				"), "\n			"), "\n		"), "\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
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
        "class": "col-lg-6 col-md-12 col-sm-12"
      }, "\n						", HTML.DIV({
        "class": "landing-item"
      }, "\n							", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("isMobile"));
      }, function() {
        return Blaze.If(function() {
          return Spacebars.call(view.lookup("currentUser"));
        }, function() {
          return [ HTML.A({
            "class": "article_option_link",
            href: "#"
          }, HTML.P({
            "class": "fa fa-bookmark deleteButton"
          }, HTML.I({
            "data-id": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
            },
            "data-title": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
            },
            "class": "fa fa-1x fa-times remove_article",
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Remove Article"
          }, HTML.Comment(" Delete ")))), HTML.A({
            "class": "article_option_link",
            href: function() {
              return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
                _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
              }));
            },
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Edit Article"
          }, HTML.P({
            "class": "fa fa-bookmark editButton"
          }, HTML.I({
            "class": "fa fa-1x fa-pencil-square-o"
          }, HTML.Comment(" edit ")))) ];
        });
      }), Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "parent", "title"));
      }, function() {
        return HTML.A({
          "class": "parent_article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        }), " ", HTML.P({
          "class": "under_parent"
        }, HTML.I({
          "class": "fa fa-1x fa-angle-double-up"
        }), Blaze.View("lookup:..parent.title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
        }))));
      }, function() {
        return HTML.A({
          "class": "article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        })));
      }), "\n							", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View("lookup:timeSinceUpdate", function() {
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
        "class": "col-lg-6 col-md-12 col-sm-12"
      }, "\n						", HTML.DIV({
        "class": "landing-item"
      }, "\n							", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("isMobile"));
      }, function() {
        return Blaze.If(function() {
          return Spacebars.call(view.lookup("currentUser"));
        }, function() {
          return [ HTML.A({
            "class": "article_option_link",
            href: "#"
          }, HTML.P({
            "class": "fa fa-bookmark deleteButton"
          }, HTML.I({
            "data-id": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
            },
            "data-title": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
            },
            "class": "fa fa-1x fa-times remove_article",
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Remove Article"
          }, HTML.Comment(" Delete ")))), HTML.A({
            "class": "article_option_link",
            href: function() {
              return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
                _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
              }));
            },
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Edit Article"
          }, HTML.P({
            "class": "fa fa-bookmark editButton"
          }, HTML.I({
            "class": "fa fa-1x fa-pencil-square-o"
          }, HTML.Comment(" edit ")))) ];
        });
      }), Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "parent", "title"));
      }, function() {
        return HTML.A({
          "class": "parent_article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        }), " ", HTML.P({
          "class": "under_parent"
        }, HTML.I({
          "class": "fa fa-1x fa-angle-double-up"
        }), Blaze.View("lookup:..parent.title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
        }))));
      }, function() {
        return HTML.A({
          "class": "article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        })));
      }), "\n							", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View("lookup:timeSinceUpdate", function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n						"), "\n					"), "\n					" ];
    }), "\n				"), "\n			"), "\n		"), "\n		" ];
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "col-sm-12 col-lg-12"
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
        "class": "col-md-4 col-lg-3 col-sm-6 col-xs-12"
      }, "\n						", HTML.DIV({
        "class": "landing-item"
      }, "\n							", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("isMobile"));
      }, function() {
        return Blaze.If(function() {
          return Spacebars.call(view.lookup("currentUser"));
        }, function() {
          return [ HTML.A({
            "class": "article_option_link",
            href: "#"
          }, HTML.P({
            "class": "fa fa-bookmark deleteButton"
          }, HTML.I({
            "data-id": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
            },
            "data-title": function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
            },
            "class": "fa fa-1x fa-times remove_article",
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Remove Article"
          }, HTML.Comment(" Delete ")))), HTML.A({
            "class": "article_option_link",
            href: function() {
              return Spacebars.mustache(view.lookup("pathFor"), "edit", Spacebars.kw({
                _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
              }));
            },
            "data-toggle": "tooltip",
            "data-placement": "top",
            title: "Edit Article"
          }, HTML.P({
            "class": "fa fa-bookmark editButton"
          }, HTML.I({
            "class": "fa fa-1x fa-pencil-square-o"
          }, HTML.Comment(" edit ")))) ];
        });
      }), Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "parent", "title"));
      }, function() {
        return HTML.A({
          "class": "parent_article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        }), " ", HTML.P({
          "class": "under_parent"
        }, HTML.I({
          "class": "fa fa-1x fa-angle-double-up"
        }), Blaze.View("lookup:..parent.title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
        }))));
      }, function() {
        return HTML.A({
          "class": "article_link",
          href: function() {
            return Spacebars.mustache(view.lookup("pathFor"), "view", Spacebars.kw({
              _id: Spacebars.dot(view.lookup("."), "_id", "toHexString")
            }));
          }
        }, HTML.DIV(HTML.I({
          "class": "fa fa-file-text"
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:..title", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
        })));
      }), "\n							", HTML.P({
        "class": "article_last_updated"
      }, "Last updated ", Blaze.View("lookup:timeSinceUpdate", function() {
        return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
      })), "\n						"), "\n					"), "\n					" ];
    }), "\n				"), "\n			"), "\n		"), "\n		" ];
  }), "\n	");
}));

})();
