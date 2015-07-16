(function(){
Template.__checkName("imex");
Template["imex"] = new Template("Template.imex", (function() {
  var view = this;
  return HTML.DIV({
    id: "sv-site"
  }, HTML.Raw("\n		<!--\n# .__                       \n# |__| _____   ____ ___  ___\n# |  |/     \\_/ __ \\\\  \\/  /\n# |  |  Y Y  \\  ___/ >    < \n# |__|__|_|  /\\___  >__/\\_ \\\n#          \\/     \\/      \\/\n#\n#\n# Inital JSON input\n#\n-->\n		"), HTML.DIV({
    "class": "row"
  }, "\n			", HTML.DIV({
    "class": "col-md-12 col-lg-12",
    id: "proc1"
  }, "\n				", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n				", HTML.Raw("<h4>Project JSON</h4>"), "\n				", HTML.DIV({
    "class": "block"
  }, "\n					", HTML.DIV({
    "class": "row"
  }, "\n						", HTML.DIV({
    "class": "col-md-12 landing-item"
  }, "\n							", HTML.TEXTAREA({
    name: "project_json_text",
    id: "project_json_text",
    placeholder: "Paste Project JSON here",
    "class": "form-control",
    rows: "10"
  }), "\n						"), "\n					"), "\n				"), "\n			"), "\n", HTML.Raw("<!--\n#\n# Start Part2\n# Settings\n-->"), "\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("doStep2"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": "col-md-12 col-lg-12"
    }, "\n				", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n				", HTML.H4("Settings"), "\n				", HTML.DIV({
      "class": "block"
    }, "\n					", HTML.DIV({
      "class": "row"
    }, "\n						", HTML.DIV({
      "class": "col-md-12",
      id: "settings"
    }, "\n							", Blaze.Each(function() {
      return Spacebars.call(view.lookup("getSettings"));
    }, function() {
      return [ "\n							", HTML.DIV({
        "class": "form-group"
      }, "\n								", HTML.LABEL({
        "for": function() {
          return [ "settings-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
      })), "\n								", HTML.INPUT({
        type: "text",
        "class": "form-control watch",
        id: function() {
          return [ "settings-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        },
        placeholder: "Settings Name",
        value: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));
        }
      }), "\n							"), "\n							" ];
    }), "\n						"), "\n					"), "\n				"), "\n			"), "\n", HTML.Comment("\n#\n# Drivers\n#\n"), "\n			", HTML.DIV({
      "class": "col-md-12 col-lg-12"
    }, "\n				", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n				", HTML.H4("Drivers"), "\n				", HTML.DIV({
      "class": "block"
    }, "\n					", HTML.DIV({
      "class": "row"
    }, "\n						", HTML.DIV({
      "class": "col-md-12"
    }, "\n							", HTML.SELECT({
      "class": "form-control",
      id: "drivers"
    }, "\n								", Blaze.Each(function() {
      return Spacebars.call(view.lookup("getDrivers"));
    }, function() {
      return [ " ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "count"));
      }, function() {
        return [ "\n								", HTML.OPTION({
          value: function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "group"));
          },
          "class": "bg-danger"
        }, Blaze.View(function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
        }), " - ", Blaze.View(function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "count"));
        })), "\n								" ];
      }, function() {
        return [ "\n								", HTML.OPTION({
          value: function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "group"));
          }
        }, Blaze.View(function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
        })), "\n								" ];
      }), " " ];
    }), "\n							"), "\n", HTML.Comment("\n# Drivers edit\n"), "\n							", HTML.DIV({
      id: "driversEdit"
    }, "\n								", Blaze.Each(function() {
      return Spacebars.call(view.lookup("editDriver"));
    }, function() {
      return [ "\n								", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "count"));
      }, function() {
        return [ "\n								", HTML.DIV({
          "class": "controls bg-default",
          id: "edit_device_controls"
        }, "\n									", HTML.BUTTON({
          id: function() {
            return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")) ];
          },
          "class": "fa fa-2x fa-sort-numeric-asc btn btn-warning enumerate_dupes"
        }, "\n										Enumerate Duplicate Names\n									"), "\n									", HTML.BUTTON({
          id: function() {
            return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")) ];
          },
          "class": "fa fa-2x fa-times btn btn-danger delete_dupes"
        }, "\n										Delete Duplicate Names\n									"), "\n								"), "\n								" ];
      }), "\n								", HTML.DIV({
        "class": "form-group"
      }, "\n									", HTML.DIV({
        "class": "input-group"
      }, "\n										", HTML.SPAN({
        "class": "input-group-addon"
      }, "\n											", HTML.STRONG("Name:"), "\n										"), "\n										", HTML.INPUT({
        type: "text",
        "class": "form-control watch",
        name: function() {
          return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        },
        id: function() {
          return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        },
        value: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
        }
      }), "\n										", HTML.SPAN({
        "class": "input-group-addon"
      }, "\n											", HTML.STRONG("Type:"), "\n										"), "\n										", Blaze.View(function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("typeSelection"), Spacebars.dot(view.lookup("."), "type"), Spacebars.dot(view.lookup("."), "group"), Spacebars.dot(view.lookup("."), "gName"), Spacebars.dot(view.lookup("."), "item"), "drivers"));
      }), "\n										", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "driverKlass"));
      }, function() {
        return [ "\n										", HTML.SPAN({
          "class": "input-group-addon"
        }, "\n											", HTML.STRONG("driverKlass:"), "\n										"), "\n										", Blaze.View(function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("driverKlassSelection"), Spacebars.dot(view.lookup("."), "driverKlass"), Spacebars.dot(view.lookup("."), "group"), Spacebars.dot(view.lookup("."), "gName"), Spacebars.dot(view.lookup("."), "item")));
        }), "\n										" ];
      }), "\n										", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "inputs"));
      }, function() {
        return [ "\n										", HTML.SPAN({
          "class": "input-group-addon"
        }, "\n											", HTML.STRONG("Inputs:"), "\n										"), "\n										", HTML.INPUT({
          type: "text",
          "class": "form-control watch",
          name: function() {
            return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-inputs" ];
          },
          id: function() {
            return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-inputs" ];
          },
          value: function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "inputs"));
          },
          disabled: ""
        }), "\n										" ];
      }), "\n										", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "outputs"));
      }, function() {
        return [ "\n										", HTML.SPAN({
          "class": "input-group-addon"
        }, "\n											", HTML.STRONG("Outputs:"), "\n										"), "\n										", HTML.INPUT({
          type: "text",
          "class": "form-control watch",
          name: function() {
            return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-outputs" ];
          },
          id: function() {
            return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-outputs" ];
          },
          value: function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "outputs"));
          },
          disabled: ""
        }), "\n										" ];
      }), "\n										", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "inputMap"));
      }, function() {
        return [ "\n										", HTML.SPAN({
          "class": "input-group-addon"
        }, "\n											", HTML.STRONG("Input Map:"), "\n										"), "\n										", Blaze.View(function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("putMap"), Spacebars.dot(view.lookup("."), "inputMap")));
        }), "\n										" ];
      }), "\n										", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "outputMap"));
      }, function() {
        return [ "\n										", HTML.SPAN({
          "class": "input-group-addon"
        }, "\n											", HTML.STRONG("Output Map:"), "\n										"), "\n										", Blaze.View(function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("putMap"), Spacebars.dot(view.lookup("."), "outputMap")));
        }), "\n										" ];
      }), "\n										", HTML.SPAN({
        "class": "input-group-addon remove_item",
        id: function() {
          return [ "drivers-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")) ];
        }
      }, "\n											", HTML.I({
        "class": "fa fa-2x fa-times"
      }), "\n										"), "\n									"), "\n								"), "\n								" ];
    }), "\n							"), "\n						"), "\n					"), "\n				"), "\n			"), "\n", HTML.Comment("\n#\n# Devices\n#\n"), "\n			", HTML.DIV({
      "class": "col-md-12 col-lg-12"
    }, "\n				", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n				", HTML.H4("Devices"), "\n				", HTML.DIV({
      "class": "block"
    }, "\n					", HTML.DIV({
      "class": "row"
    }, "\n						", HTML.DIV({
      "class": "col-md-12"
    }, "\n							", HTML.SELECT({
      "class": "form-control",
      id: "devices"
    }, "\n								", Blaze.Each(function() {
      return Spacebars.call(view.lookup("getDevices"));
    }, function() {
      return [ "\n								", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "count"));
      }, function() {
        return [ "\n								", HTML.OPTION({
          value: function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "group"));
          },
          "class": "bg-danger"
        }, Blaze.View(function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
        }), " - ", Blaze.View(function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "count"));
        })), "\n								" ];
      }, function() {
        return [ "\n								", HTML.OPTION({
          value: function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "group"));
          }
        }, Blaze.View(function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
        })), "\n								" ];
      }), "\n								" ];
    }), "\n							"), "\n", HTML.Comment("\n# Devices edit\n"), "\n							", HTML.DIV({
      id: "devicesEdit"
    }, "\n								", Blaze.Each(function() {
      return Spacebars.call(view.lookup("editDevice"));
    }, function() {
      return [ "\n								", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "count"));
      }, function() {
        return [ "\n								", HTML.DIV({
          "class": "controls bg-default",
          id: "edit_device_controls"
        }, "\n									", HTML.BUTTON({
          id: function() {
            return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")) ];
          },
          "class": "fa fa-2x fa-sort-numeric-asc btn btn-warning enumerate_dupes"
        }, "\n										Enumerate Duplicate Names\n									"), "\n									", HTML.BUTTON({
          id: function() {
            return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")) ];
          },
          "class": "fa fa-2x fa-times btn btn-danger delete_dupes"
        }, "\n										Delete Duplicate Names\n									"), "\n								"), "\n								" ];
      }), "\n								", HTML.DIV({
        "class": "form-group"
      }, "\n									", HTML.DIV({
        "class": "input-group"
      }, "\n										", HTML.SPAN({
        "class": "input-group-addon"
      }, "\n										", HTML.STRONG("Name:"), "\n									"), "\n										", HTML.INPUT({
        type: "text",
        "class": "form-control watch",
        name: function() {
          return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        },
        id: function() {
          return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        },
        value: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
        }
      }), "\n										", HTML.SPAN({
        "class": "input-group-addon"
      }, "\n										", HTML.STRONG("Type:"), "\n									"), "\n										", Blaze.View(function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("typeSelection"), Spacebars.dot(view.lookup("."), "type"), Spacebars.dot(view.lookup("."), "group"), Spacebars.dot(view.lookup("."), "gName"), Spacebars.dot(view.lookup("."), "item"), "devices"));
      }), "\n										", HTML.SPAN({
        "class": "input-group-addon"
      }, "\n										", HTML.STRONG("Driver:"), "\n									"), "\n										", Blaze.View(function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("driverSelection"), Spacebars.dot(view.lookup("."), "driver"), Spacebars.dot(view.lookup("."), "group"), Spacebars.dot(view.lookup("."), "gName"), Spacebars.dot(view.lookup("."), "item")));
      }), "\n										", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("isSpeaker"), Spacebars.dot(view.lookup("."), "driver"));
      }, function() {
        return [ "\n										", HTML.SPAN({
          "class": "input-group-addon"
        }, "\n											", HTML.STRONG("Volume Profile:"), "\n										"), "\n										", HTML.INPUT({
          type: "text",
          "class": "form-control watch",
          name: function() {
            return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-volumeProfile" ];
          },
          id: function() {
            return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-volumeProfile" ];
          },
          value: function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "volumeProfile"));
          }
        }), "\n										" ];
      }), "\n										", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "driverOptions", "control4Id"));
      }, function() {
        return [ "\n										", HTML.SPAN({
          "class": "input-group-addon"
        }, "\n											", HTML.STRONG("control4Id:"), "\n										"), "\n										", HTML.INPUT({
          type: "text",
          "class": "form-control watch",
          name: function() {
            return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-driverOptions-_-control4Id" ];
          },
          id: function() {
            return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-driverOptions-_-control4Id" ];
          },
          value: function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "driverOptions", "control4Id"));
          },
          disabled: ""
        }), "\n										" ];
      }), "\n										", HTML.SPAN({
        "class": "input-group-addon remove_item",
        id: function() {
          return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")) ];
        }
      }, "\n										", HTML.I({
        "class": "fa fa-2x fa-times"
      }), "\n									"), "\n									"), "\n								"), "\n								" ];
    }), "\n							"), "\n						"), "\n					"), "\n				"), "\n			"), "\n", HTML.Comment("\n#\n# Macros\n#\n"), "\n			", HTML.DIV({
      "class": "col-md-12 col-lg-12"
    }, "\n				", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n				", HTML.H4("Macros"), "\n				", HTML.DIV({
      "class": "block"
    }, "\n					", HTML.DIV({
      "class": "row"
    }, "\n						", HTML.DIV({
      "class": "col-md-12",
      id: "drivers"
    }, "\n							", HTML.DIV({
      "class": "row"
    }, "\n								", Blaze.Each(function() {
      return Spacebars.call(view.lookup("getMacros"));
    }, function() {
      return [ "\n								", HTML.DIV({
        "class": "col-xs-3 col-md-2 col-lg-2"
      }, "\n									", HTML.LABEL({
        "class": "checkbox-inline",
        "for": function() {
          return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        }
      }, "\n										", HTML.INPUT({
        type: "checkbox",
        name: function() {
          return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        },
        id: function() {
          return [ "devices-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "group")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "gName")), "-_-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "item")), "-_-name" ];
        },
        checked: ""
      }), Blaze.View(function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
      }), "\n									"), "\n								"), "\n								" ];
    }), "\n							"), "\n						"), "\n					"), "\n				"), "\n			"), "\n", HTML.Comment("\n#\n# Connections\n#\n"), "\n			", HTML.DIV({
      "class": "col-md-12 col-lg-12"
    }, "\n				", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n				", HTML.H4("Connections"), "\n				", HTML.DIV({
      "class": "block"
    }, "\n					", HTML.DIV({
      "class": "row"
    }, "\n						", HTML.DIV({
      "class": "col-md-12",
      id: "connections"
    }, "\n							", HTML.DIV({
      id: "connectionsEdit"
    }), "\n						"), "\n					"), "\n				"), "\n			"), "\n", HTML.Comment("\n#\n# Live Build Output\n#\n"), "\n			", HTML.DIV({
      "class": "col-md-12 col-lg-12"
    }, "\n				", HTML.I({
      "class": "fa fa-3x fa-sort-up section_marker"
    }), "\n				", HTML.H4("Live Build"), "\n				", HTML.DIV({
      "class": "block"
    }, "\n					", HTML.DIV({
      "class": "row"
    }, "\n						", HTML.DIV({
      "class": "col-md-12",
      id: "built"
    }, "\n							", HTML.TEXTAREA({
      "class": "form-control",
      rows: "15",
      onclick: "this.select()",
      value: function() {
        return [ "projectName = ", Spacebars.makeRaw(Spacebars.mustache(view.lookup("doBuild"))) ];
      }
    }), "\n						"), "\n					"), "\n				"), "\n			"), "\n			" ];
  }), "\n		"), HTML.Raw("\n<!--\n#\n# The End\n# w/ wrapper\n-->\n	"));
}));

})();
