//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Session = Package.session.Session;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var $modal;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/accounts_ui.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (!Accounts.ui)                                                                                                      // 1
	Accounts.ui = {};                                                                                                     // 2
                                                                                                                       // 3
if (!Accounts.ui._options) {                                                                                           // 4
	Accounts.ui._options = {                                                                                              // 5
		requestPermissions: {},                                                                                              // 6
		extraSignupFields: []                                                                                                // 7
	};                                                                                                                    // 8
}                                                                                                                      // 9
                                                                                                                       // 10
Accounts.ui.navigate = function (route, hash) {                                                                        // 11
	// if router is iron-router                                                                                           // 12
	if(window.Router && _.isFunction(Router.go)) {                                                                        // 13
		Router.go(route, hash);                                                                                              // 14
	}                                                                                                                     // 15
}                                                                                                                      // 16
                                                                                                                       // 17
Accounts.ui.config = function(options) {                                                                               // 18
	// validate options keys                                                                                              // 19
	var VALID_KEYS = ['passwordSignupFields', 'requestPermissions', 'extraSignupFields', 'requestOfflineToken'];          // 20
	_.each(_.keys(options), function(key) {                                                                               // 21
		if (!_.contains(VALID_KEYS, key))                                                                                    // 22
			throw new Error("Accounts.ui.config: Invalid key: " + key);                                                         // 23
	});                                                                                                                   // 24
                                                                                                                       // 25
	// deal with `passwordSignupFields`                                                                                   // 26
	if (options.passwordSignupFields) {                                                                                   // 27
		if (_.contains([                                                                                                     // 28
			"USERNAME_AND_EMAIL_CONFIRM",                                                                                       // 29
			"USERNAME_AND_EMAIL",                                                                                               // 30
			"USERNAME_AND_OPTIONAL_EMAIL",                                                                                      // 31
			"USERNAME_ONLY",                                                                                                    // 32
			"EMAIL_ONLY"                                                                                                        // 33
		], options.passwordSignupFields)) {                                                                                  // 34
			if (Accounts.ui._options.passwordSignupFields)                                                                      // 35
				throw new Error("Accounts.ui.config: Can't set `passwordSignupFields` more than once");                            // 36
			else                                                                                                                // 37
				Accounts.ui._options.passwordSignupFields = options.passwordSignupFields;                                          // 38
		} else {                                                                                                             // 39
			throw new Error("Accounts.ui.config: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);  // 40
		}                                                                                                                    // 41
	}                                                                                                                     // 42
                                                                                                                       // 43
	// deal with `requestPermissions`                                                                                     // 44
	if (options.requestPermissions) {                                                                                     // 45
		_.each(options.requestPermissions, function(scope, service) {                                                        // 46
			if (Accounts.ui._options.requestPermissions[service]) {                                                             // 47
				throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);               // 48
			} else if (!(scope instanceof Array)) {                                                                             // 49
				throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");                            // 50
			} else {                                                                                                            // 51
				Accounts.ui._options.requestPermissions[service] = scope;                                                          // 52
			}                                                                                                                   // 53
		});                                                                                                                  // 54
    }                                                                                                                  // 55
                                                                                                                       // 56
    if (options.extraSignupFields) {                                                                                   // 57
		if (typeof options.extraSignupFields !== 'object' || !options.extraSignupFields instanceof Array) {                  // 58
			throw new Error("Accounts.ui.config: `extraSignupFields` must be an array.");                                       // 59
		} else {                                                                                                             // 60
			if (options.extraSignupFields) {                                                                                    // 61
				_.each(options.extraSignupFields, function(field, index) {                                                         // 62
					if (!field.fieldName || !field.fieldLabel)                                                                        // 63
						throw new Error("Accounts.ui.config: `extraSignupFields` objects must have `fieldName` and `fieldLabel` attributes.");
					if (typeof field.visible === 'undefined')                                                                         // 65
						field.visible = true;                                                                                            // 66
					Accounts.ui._options.extraSignupFields[index] = field;                                                            // 67
				});                                                                                                                // 68
			}                                                                                                                   // 69
		}                                                                                                                    // 70
	}                                                                                                                     // 71
};                                                                                                                     // 72
                                                                                                                       // 73
Accounts.ui._passwordSignupFields = function() {                                                                       // 74
	return Accounts.ui._options.passwordSignupFields || "EMAIL_ONLY";                                                     // 75
};                                                                                                                     // 76
                                                                                                                       // 77
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/template.login_buttons.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("_loginButtons", (function() {                                                                     // 2
  var view = this;                                                                                                     // 3
  return Blaze.If(function() {                                                                                         // 4
    return Spacebars.call(view.lookup("currentUser"));                                                                 // 5
  }, function() {                                                                                                      // 6
    return [ "\n		", Blaze.If(function() {                                                                             // 7
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 8
    }, function() {                                                                                                    // 9
      return [ "\n			\n			", Blaze.If(function() {                                                                     // 10
        return Spacebars.call(view.lookup("dropdown"));                                                                // 11
      }, function() {                                                                                                  // 12
        return [ "\n				", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n			" ];                // 13
      }, function() {                                                                                                  // 14
        return [ "\n				", HTML.DIV({                                                                                  // 15
          "class": "login-buttons-with-only-one-button"                                                                // 16
        }, "\n					", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n				"), "\n			" ];
      }), "\n		" ];                                                                                                    // 18
    }, function() {                                                                                                    // 19
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedIn")), "\n		" ];                     // 20
    }), "\n	" ];                                                                                                       // 21
  }, function() {                                                                                                      // 22
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOut")), "\n	" ];                        // 23
  });                                                                                                                  // 24
}));                                                                                                                   // 25
                                                                                                                       // 26
Template.__define__("_loginButtonsLoggedIn", (function() {                                                             // 27
  var view = this;                                                                                                     // 28
  return Blaze.If(function() {                                                                                         // 29
    return Spacebars.call(view.lookup("dropdown"));                                                                    // 30
  }, function() {                                                                                                      // 31
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdown")), "\n	" ];                 // 32
  }, function() {                                                                                                      // 33
    return [ "\n	", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInSingleLogoutButton")), "\n	" ];        // 34
  });                                                                                                                  // 35
}));                                                                                                                   // 36
                                                                                                                       // 37
Template.__define__("_loginButtonsLoggedOut", (function() {                                                            // 38
  var view = this;                                                                                                     // 39
  return Blaze.If(function() {                                                                                         // 40
    return Spacebars.call(view.lookup("services"));                                                                    // 41
  }, function() {                                                                                                      // 42
    return [ " \n		", Blaze.If(function() {                                                                            // 43
      return Spacebars.call(view.lookup("configurationLoaded"));                                                       // 44
    }, function() {                                                                                                    // 45
      return [ "\n			", Blaze.If(function() {                                                                          // 46
        return Spacebars.call(view.lookup("dropdown"));                                                                // 47
      }, function() {                                                                                                  // 48
        return [ " \n				", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutDropdown")), "\n			" ];       // 49
      }, function() {                                                                                                  // 50
        return [ "\n				", Spacebars.With(function() {                                                                 // 51
          return Spacebars.call(view.lookup("singleService"));                                                         // 52
        }, function() {                                                                                                // 53
          return [ " \n						", Blaze.If(function() {                                                                  // 54
            return Spacebars.call(view.lookup("loggingIn"));                                                           // 55
          }, function() {                                                                                              // 56
            return [ "\n							", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n						" ];
          }, function() {                                                                                              // 58
            return [ "\n							", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n						" ];
          }), "\n				" ];                                                                                              // 60
        }), "\n			" ];                                                                                                 // 61
      }), "\n		" ];                                                                                                    // 62
    }), "\n	" ];                                                                                                       // 63
  }, function() {                                                                                                      // 64
    return [ "\n		", HTML.DIV({                                                                                        // 65
      "class": "no-services"                                                                                           // 66
    }, "No login services configured"), "\n	" ];                                                                       // 67
  });                                                                                                                  // 68
}));                                                                                                                   // 69
                                                                                                                       // 70
Template.__define__("_loginButtonsMessages", (function() {                                                             // 71
  var view = this;                                                                                                     // 72
  return [ Blaze.If(function() {                                                                                       // 73
    return Spacebars.call(view.lookup("errorMessage"));                                                                // 74
  }, function() {                                                                                                      // 75
    return [ "\n		", HTML.DIV({                                                                                        // 76
      "class": "alert alert-danger"                                                                                    // 77
    }, Blaze.View(function() {                                                                                         // 78
      return Spacebars.mustache(view.lookup("errorMessage"));                                                          // 79
    })), "\n	" ];                                                                                                      // 80
  }), "\n	", Blaze.If(function() {                                                                                     // 81
    return Spacebars.call(view.lookup("infoMessage"));                                                                 // 82
  }, function() {                                                                                                      // 83
    return [ "\n		", HTML.DIV({                                                                                        // 84
      "class": "alert alert-success no-margin"                                                                         // 85
    }, Blaze.View(function() {                                                                                         // 86
      return Spacebars.mustache(view.lookup("infoMessage"));                                                           // 87
    })), "\n	" ];                                                                                                      // 88
  }) ];                                                                                                                // 89
}));                                                                                                                   // 90
                                                                                                                       // 91
Template.__define__("_loginButtonsLoggingIn", (function() {                                                            // 92
  var view = this;                                                                                                     // 93
  return [ Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInPadding")), HTML.Raw('\n	<div class="loading">&nbsp;</div>\n	'), Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInPadding")) ];
}));                                                                                                                   // 95
                                                                                                                       // 96
Template.__define__("_loginButtonsLoggingInPadding", (function() {                                                     // 97
  var view = this;                                                                                                     // 98
  return Blaze.Unless(function() {                                                                                     // 99
    return Spacebars.call(view.lookup("dropdown"));                                                                    // 100
  }, function() {                                                                                                      // 101
    return [ "\n		\n		", HTML.DIV({                                                                                    // 102
      "class": "login-buttons-padding"                                                                                 // 103
    }, "\n			", HTML.DIV({                                                                                             // 104
      "class": "login-button single-login-button",                                                                     // 105
      style: "visibility: hidden;",                                                                                    // 106
      id: "login-buttons-logout"                                                                                       // 107
    }, HTML.CharRef({                                                                                                  // 108
      html: "&nbsp;",                                                                                                  // 109
      str: " "                                                                                                         // 110
    })), "\n		"), "\n	" ];                                                                                             // 111
  }, function() {                                                                                                      // 112
    return [ "\n		\n		", HTML.DIV({                                                                                    // 113
      "class": "login-buttons-padding"                                                                                 // 114
    }), "\n	" ];                                                                                                       // 115
  });                                                                                                                  // 116
}));                                                                                                                   // 117
                                                                                                                       // 118
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/template.login_buttons_single.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("_loginButtonsLoggedOutSingleLoginButton", (function() {                                           // 2
  var view = this;                                                                                                     // 3
  return Blaze.If(function() {                                                                                         // 4
    return Spacebars.call(view.lookup("configured"));                                                                  // 5
  }, function() {                                                                                                      // 6
    return [ "\n		", HTML.BUTTON({                                                                                     // 7
      "class": function() {                                                                                            // 8
        return [ "login-button btn btn-block btn-", Spacebars.mustache(view.lookup("capitalizedName")) ];              // 9
      }                                                                                                                // 10
    }, "sign in with ", Blaze.View(function() {                                                                        // 11
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 12
    })), "\n	" ];                                                                                                      // 13
  }, function() {                                                                                                      // 14
    return [ "\n		", HTML.BUTTON({                                                                                     // 15
      "class": "login-button btn btn-block configure-button btn-danger"                                                // 16
    }, "Configure ", Blaze.View(function() {                                                                           // 17
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 18
    }), " Login"), "\n	" ];                                                                                            // 19
  });                                                                                                                  // 20
}));                                                                                                                   // 21
                                                                                                                       // 22
Template.__define__("_loginButtonsLoggingInSingleLoginButton", (function() {                                           // 23
  var view = this;                                                                                                     // 24
  return HTML.DIV({                                                                                                    // 25
    "class": "login-text-and-button"                                                                                   // 26
  }, "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n	");                                 // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
Template.__define__("_loginButtonsLoggedInSingleLogoutButton", (function() {                                           // 30
  var view = this;                                                                                                     // 31
  return HTML.LI("\n		", HTML.A({                                                                                      // 32
    href: "#",                                                                                                         // 33
    id: "login-buttons-logout"                                                                                         // 34
  }, Blaze.View(function() {                                                                                           // 35
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 36
  }), " sign Out"), "\n	");                                                                                            // 37
}));                                                                                                                   // 38
                                                                                                                       // 39
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/template.login_buttons_dropdown.js                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("_loginButtonsLoggedInDropdown", (function() {                                                     // 2
  var view = this;                                                                                                     // 3
  return HTML.LI({                                                                                                     // 4
    id: "login-dropdown-list",                                                                                         // 5
    "class": "dropdown"                                                                                                // 6
  }, "\n		", HTML.A({                                                                                                  // 7
    "class": "dropdown-toggle",                                                                                        // 8
    "data-toggle": "dropdown"                                                                                          // 9
  }, "\n			", Blaze.View(function() {                                                                                  // 10
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 11
  }), "\n			", Spacebars.With(function() {                                                                             // 12
    return Spacebars.call(view.lookup("user_profile_picture"));                                                        // 13
  }, function() {                                                                                                      // 14
    return [ "\n				", HTML.IMG({                                                                                      // 15
      src: function() {                                                                                                // 16
        return Spacebars.mustache(view.lookup("."));                                                                   // 17
      },                                                                                                               // 18
      width: "30px",                                                                                                   // 19
      "class": "img-circular",                                                                                         // 20
      alt: "#"                                                                                                         // 21
    }), "\n			" ];                                                                                                     // 22
  }), "\n			", HTML.Raw('<b class="caret"></b>'), "\n		"), "\n		", HTML.DIV({                                          // 23
    "class": "dropdown-menu col-sm-3"                                                                                  // 24
  }, "\n			", Blaze.If(function() {                                                                                    // 25
    return Spacebars.call(view.lookup("inMessageOnlyFlow"));                                                           // 26
  }, function() {                                                                                                      // 27
    return [ "\n				", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n			" ];                     // 28
  }, function() {                                                                                                      // 29
    return [ "\n				", Blaze.If(function() {                                                                           // 30
      return Spacebars.call(view.lookup("inChangePasswordFlow"));                                                      // 31
    }, function() {                                                                                                    // 32
      return [ "\n					", Spacebars.include(view.lookupTemplate("_loginButtonsChangePassword")), "\n				" ];           // 33
    }, function() {                                                                                                    // 34
      return [ "\n					", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdownActions")), "\n				" ];  // 35
    }), "\n			" ];                                                                                                     // 36
  }), "\n		"), "\n	");                                                                                                 // 37
}));                                                                                                                   // 38
                                                                                                                       // 39
Template.__define__("_loginButtonsLoggedInDropdownActions", (function() {                                              // 40
  var view = this;                                                                                                     // 41
  return [ Blaze.If(function() {                                                                                       // 42
    return Spacebars.call(view.lookup("additionalLoggedInDropdownActions"));                                           // 43
  }, function() {                                                                                                      // 44
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsAdditionalLoggedInDropdownActions")), "\n	" ];
  }), "\n\n	", Blaze.If(function() {                                                                                   // 46
    return Spacebars.call(view.lookup("allowChangingPassword"));                                                       // 47
  }, function() {                                                                                                      // 48
    return [ "\n		", HTML.BUTTON({                                                                                     // 49
      "class": "btn btn-default btn-block",                                                                            // 50
      id: "login-buttons-open-change-password"                                                                         // 51
    }, "change password"), "\n	" ];                                                                                    // 52
  }), HTML.Raw('\n\n	<button class="btn btn-block btn-primary" id="login-buttons-logout">sign out</button>') ];        // 53
}));                                                                                                                   // 54
                                                                                                                       // 55
Template.__define__("_loginButtonsLoggedOutDropdown", (function() {                                                    // 56
  var view = this;                                                                                                     // 57
  return HTML.LI({                                                                                                     // 58
    id: "login-dropdown-list",                                                                                         // 59
    "class": "dropdown"                                                                                                // 60
  }, "\n		", HTML.A({                                                                                                  // 61
    "class": "dropdown-toggle",                                                                                        // 62
    "data-toggle": "dropdown"                                                                                          // 63
  }, "sign in", Blaze.Unless(function() {                                                                              // 64
    return Spacebars.call(view.lookup("forbidClientAccountCreation"));                                                 // 65
  }, function() {                                                                                                      // 66
    return " / up";                                                                                                    // 67
  }), HTML.Raw('<b class="caret"></b>')), "\n		", HTML.DIV({                                                           // 68
    "class": "dropdown-menu"                                                                                           // 69
  }, "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutAllServices")), "\n		"), "\n	");            // 70
}));                                                                                                                   // 71
                                                                                                                       // 72
Template.__define__("_loginButtonsLoggedOutAllServices", (function() {                                                 // 73
  var view = this;                                                                                                     // 74
  return Blaze.Each(function() {                                                                                       // 75
    return Spacebars.call(view.lookup("services"));                                                                    // 76
  }, function() {                                                                                                      // 77
    return [ "\n	", Blaze.Unless(function() {                                                                          // 78
      return Spacebars.call(view.lookup("hasPasswordService"));                                                        // 79
    }, function() {                                                                                                    // 80
      return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n	" ];                       // 81
    }), "\n		", Blaze.If(function() {                                                                                  // 82
      return Spacebars.call(view.lookup("isPasswordService"));                                                         // 83
    }, function() {                                                                                                    // 84
      return [ "\n			", Blaze.If(function() {                                                                          // 85
        return Spacebars.call(view.lookup("hasOtherServices"));                                                        // 86
      }, function() {                                                                                                  // 87
        return [ " \n				", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordServiceSeparator")), "\n			" ];
      }), "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordService")), "\n		" ];          // 89
    }, function() {                                                                                                    // 90
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n		" ];   // 91
    }), "\n	" ];                                                                                                       // 92
  });                                                                                                                  // 93
}));                                                                                                                   // 94
                                                                                                                       // 95
Template.__define__("_loginButtonsLoggedOutPasswordServiceSeparator", (function() {                                    // 96
  var view = this;                                                                                                     // 97
  return HTML.Raw('<div class="or">\n		<span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n		<span class="or-text">or</span>\n		<span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n	</div>');
}));                                                                                                                   // 99
                                                                                                                       // 100
Template.__define__("_loginButtonsLoggedOutPasswordService", (function() {                                             // 101
  var view = this;                                                                                                     // 102
  return Blaze.If(function() {                                                                                         // 103
    return Spacebars.call(view.lookup("inForgotPasswordFlow"));                                                        // 104
  }, function() {                                                                                                      // 105
    return [ "\n		", Spacebars.include(view.lookupTemplate("_forgotPasswordForm")), "\n	" ];                           // 106
  }, function() {                                                                                                      // 107
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n		", Blaze.Each(function() {  // 108
      return Spacebars.call(view.lookup("fields"));                                                                    // 109
    }, function() {                                                                                                    // 110
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n		" ];                    // 111
    }), "\n		", HTML.BUTTON({                                                                                          // 112
      "class": "btn btn-primary col-sm-12",                                                                            // 113
      id: "login-buttons-password",                                                                                    // 114
      type: "button"                                                                                                   // 115
    }, "\n			", Blaze.If(function() {                                                                                  // 116
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 117
    }, function() {                                                                                                    // 118
      return "\n				create\n			";                                                                                      // 119
    }, function() {                                                                                                    // 120
      return "\n				sign in\n			";                                                                                     // 121
    }), "\n		"), "\n		", Blaze.If(function() {                                                                         // 122
      return Spacebars.call(view.lookup("inLoginFlow"));                                                               // 123
    }, function() {                                                                                                    // 124
      return [ "\n			", HTML.DIV({                                                                                     // 125
        id: "login-other-options"                                                                                      // 126
      }, "\n			", Blaze.If(function() {                                                                                // 127
        return Spacebars.call(view.lookup("showForgotPasswordLink"));                                                  // 128
      }, function() {                                                                                                  // 129
        return [ "\n				", HTML.A({                                                                                    // 130
          id: "forgot-password-link",                                                                                  // 131
          "class": "pull-left"                                                                                         // 132
        }, "forgot password?"), "\n			" ];                                                                             // 133
      }), "\n			", Blaze.If(function() {                                                                               // 134
        return Spacebars.call(view.lookup("showCreateAccountLink"));                                                   // 135
      }, function() {                                                                                                  // 136
        return [ "\n				", HTML.A({                                                                                    // 137
          id: "signup-link",                                                                                           // 138
          "class": "pull-right"                                                                                        // 139
        }, "create account"), "\n			" ];                                                                               // 140
      }), "\n			"), "\n		" ];                                                                                          // 141
    }), "\n		", Blaze.If(function() {                                                                                  // 142
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 143
    }, function() {                                                                                                    // 144
      return [ "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n		" ];              // 145
    }), "\n	" ];                                                                                                       // 146
  });                                                                                                                  // 147
}));                                                                                                                   // 148
                                                                                                                       // 149
Template.__define__("_forgotPasswordForm", (function() {                                                               // 150
  var view = this;                                                                                                     // 151
  return HTML.DIV({                                                                                                    // 152
    "class": "login-form"                                                                                              // 153
  }, "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n		<div id="forgot-password-email-label-and-input"> \n			<input id="forgot-password-email" type="email" placeholder="E-mail" class="form-control">\n		</div>\n		<button class="btn btn-primary login-button-form-submit col-sm-12" id="login-buttons-forgot-password">reset password</button>\n		'), Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n	");
}));                                                                                                                   // 155
                                                                                                                       // 156
Template.__define__("_loginButtonsBackToLoginLink", (function() {                                                      // 157
  var view = this;                                                                                                     // 158
  return HTML.Raw('<button id="back-to-login-link" class="btn btn-default col-sm-12">cancel</button>');                // 159
}));                                                                                                                   // 160
                                                                                                                       // 161
Template.__define__("_loginButtonsFormField", (function() {                                                            // 162
  var view = this;                                                                                                     // 163
  return Blaze.If(function() {                                                                                         // 164
    return Spacebars.call(view.lookup("visible"));                                                                     // 165
  }, function() {                                                                                                      // 166
    return [ "\n		", HTML.INPUT({                                                                                      // 167
      id: function() {                                                                                                 // 168
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                             // 169
      },                                                                                                               // 170
      type: function() {                                                                                               // 171
        return Spacebars.mustache(view.lookup("inputType"));                                                           // 172
      },                                                                                                               // 173
      placeholder: function() {                                                                                        // 174
        return Spacebars.mustache(view.lookup("fieldLabel"));                                                          // 175
      },                                                                                                               // 176
      "class": "form-control"                                                                                          // 177
    }), "\n	" ];                                                                                                       // 178
  });                                                                                                                  // 179
}));                                                                                                                   // 180
                                                                                                                       // 181
Template.__define__("_loginButtonsChangePassword", (function() {                                                       // 182
  var view = this;                                                                                                     // 183
  return [ Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n	", Blaze.Each(function() {             // 184
    return Spacebars.call(view.lookup("fields"));                                                                      // 185
  }, function() {                                                                                                      // 186
    return [ "\n		", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n	" ];                        // 187
  }), HTML.Raw('\n	<button class="btn btn-primary" id="login-buttons-do-change-password">change password</button>\n	<button class="btn btn-default" id="login-buttons-cancel-change-password">cancel</button>') ];
}));                                                                                                                   // 189
                                                                                                                       // 190
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/template.login_buttons_dialogs.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__body__.__contentParts.push(Blaze.View('body_content_'+Template.__body__.__contentParts.length, (function() {
  var view = this;                                                                                                     // 3
  return [ Spacebars.include(view.lookupTemplate("_resetPasswordDialog")), "\n	", Spacebars.include(view.lookupTemplate("_enrollAccountDialog")), "\n	", Spacebars.include(view.lookupTemplate("_justVerifiedEmailDialog")), "\n	", Spacebars.include(view.lookupTemplate("_configureLoginServiceDialog")), HTML.Raw("\n\n	<!-- if we're not showing a dropdown, we need some other place to show messages -->\n	"), Spacebars.include(view.lookupTemplate("_loginButtonsMessagesDialog")) ];
})));                                                                                                                  // 5
Meteor.startup(Template.__body__.__instantiate);                                                                       // 6
                                                                                                                       // 7
Template.__define__("_resetPasswordDialog", (function() {                                                              // 8
  var view = this;                                                                                                     // 9
  return Blaze.If(function() {                                                                                         // 10
    return Spacebars.call(view.lookup("inResetPasswordFlow"));                                                         // 11
  }, function() {                                                                                                      // 12
    return [ "\n		", HTML.DIV({                                                                                        // 13
      "class": "modal",                                                                                                // 14
      id: "login-buttons-reset-password-modal"                                                                         // 15
    }, "\n			", HTML.DIV({                                                                                             // 16
      "class": "modal-dialog"                                                                                          // 17
    }, "\n				", HTML.DIV({                                                                                            // 18
      "class": "modal-content"                                                                                         // 19
    }, "\n					", HTML.DIV({                                                                                           // 20
      "class": "modal-header"                                                                                          // 21
    }, "\n						", HTML.BUTTON({                                                                                       // 22
      type: "button",                                                                                                  // 23
      "class": "close",                                                                                                // 24
      "data-dismiss": "modal",                                                                                         // 25
      "aria-hidden": "true"                                                                                            // 26
    }, HTML.CharRef({                                                                                                  // 27
      html: "&times;",                                                                                                 // 28
      str: "×"                                                                                                         // 29
    })), "\n						", HTML.H4({                                                                                         // 30
      "class": "modal-title"                                                                                           // 31
    }, "reset your password"), "\n					"), "\n					", HTML.DIV({                                                       // 32
      "class": "modal-body"                                                                                            // 33
    }, "\n						", HTML.INPUT({                                                                                        // 34
      id: "reset-password-new-password",                                                                               // 35
      "class": "form-control",                                                                                         // 36
      type: "password",                                                                                                // 37
      placeholder: "New Password"                                                                                      // 38
    }), "\n						", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n					"), "\n					", HTML.DIV({ // 39
      "class": "modal-footer"                                                                                          // 40
    }, "\n						", HTML.A({                                                                                            // 41
      "class": "btn btn-default",                                                                                      // 42
      id: "login-buttons-cancel-reset-password"                                                                        // 43
    }, "close"), "\n						", HTML.BUTTON({                                                                             // 44
      "class": "btn btn-primary",                                                                                      // 45
      id: "login-buttons-reset-password-button"                                                                        // 46
    }, "\n							set password\n						"), "\n					"), "\n				"), HTML.Comment(" /.modal-content "), "\n			"), HTML.Comment(" /.modal-dalog "), "\n		"), HTML.Comment(" /.modal "), "\n	" ];
  });                                                                                                                  // 48
}));                                                                                                                   // 49
                                                                                                                       // 50
Template.__define__("_enrollAccountDialog", (function() {                                                              // 51
  var view = this;                                                                                                     // 52
  return Blaze.If(function() {                                                                                         // 53
    return Spacebars.call(view.lookup("inEnrollAccountFlow"));                                                         // 54
  }, function() {                                                                                                      // 55
    return [ "\n		", HTML.DIV({                                                                                        // 56
      "class": "modal",                                                                                                // 57
      id: "login-buttons-enroll-account-modal"                                                                         // 58
    }, "\n			", HTML.DIV({                                                                                             // 59
      "class": "modal-dialog"                                                                                          // 60
    }, "\n				", HTML.DIV({                                                                                            // 61
      "class": "modal-content"                                                                                         // 62
    }, "\n					", HTML.DIV({                                                                                           // 63
      "class": "modal-header"                                                                                          // 64
    }, "\n						", HTML.BUTTON({                                                                                       // 65
      type: "button",                                                                                                  // 66
      "class": "close",                                                                                                // 67
      "data-dismiss": "modal",                                                                                         // 68
      "aria-hidden": "true"                                                                                            // 69
    }, HTML.CharRef({                                                                                                  // 70
      html: "&times;",                                                                                                 // 71
      str: "×"                                                                                                         // 72
    })), "\n						", HTML.H4({                                                                                         // 73
      "class": "modal-title"                                                                                           // 74
    }, "choose a password"), "\n					"), "\n					", HTML.DIV({                                                         // 75
      "class": "modal-body"                                                                                            // 76
    }, "\n						", HTML.INPUT({                                                                                        // 77
      id: "enroll-account-password",                                                                                   // 78
      "class": "form-control",                                                                                         // 79
      type: "password",                                                                                                // 80
      placeholder: "New Password"                                                                                      // 81
    }), "\n						", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n					"), "\n					", HTML.DIV({ // 82
      "class": "modal-footer"                                                                                          // 83
    }, "\n						", HTML.A({                                                                                            // 84
      "class": "btn btn-default",                                                                                      // 85
      id: "login-buttons-cancel-enroll-account-button"                                                                 // 86
    }, "close"), "\n						", HTML.BUTTON({                                                                             // 87
      "class": "btn btn-primary",                                                                                      // 88
      id: "login-buttons-enroll-account-button"                                                                        // 89
    }, "\n							set password\n						"), "\n					"), "\n				"), HTML.Comment(" /.modal-content "), "\n			"), HTML.Comment(" /.modal-dalog "), "\n		"), HTML.Comment(" /.modal "), "\n	" ];
  });                                                                                                                  // 91
}));                                                                                                                   // 92
                                                                                                                       // 93
Template.__define__("_justVerifiedEmailDialog", (function() {                                                          // 94
  var view = this;                                                                                                     // 95
  return Blaze.If(function() {                                                                                         // 96
    return Spacebars.call(view.lookup("visible"));                                                                     // 97
  }, function() {                                                                                                      // 98
    return [ "\n		", HTML.DIV({                                                                                        // 99
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 100
    }, "\n			email verified\n			", HTML.DIV({                                                                          // 101
      "class": "login-button",                                                                                         // 102
      id: "just-verified-dismiss-button"                                                                               // 103
    }, "dismiss"), "\n		"), "\n	" ];                                                                                   // 104
  });                                                                                                                  // 105
}));                                                                                                                   // 106
                                                                                                                       // 107
Template.__define__("_configureLoginServiceDialog", (function() {                                                      // 108
  var view = this;                                                                                                     // 109
  return Blaze.If(function() {                                                                                         // 110
    return Spacebars.call(view.lookup("visible"));                                                                     // 111
  }, function() {                                                                                                      // 112
    return [ "\n	", HTML.DIV({                                                                                         // 113
      "class": "modal",                                                                                                // 114
      id: "configure-login-service-dialog-modal"                                                                       // 115
    }, "\n			", HTML.DIV({                                                                                             // 116
      "class": "modal-dialog"                                                                                          // 117
    }, "\n					", HTML.DIV({                                                                                           // 118
      "class": "modal-content"                                                                                         // 119
    }, "\n							", HTML.DIV({                                                                                         // 120
      "class": "modal-header"                                                                                          // 121
    }, "\n									", HTML.H4({                                                                                        // 122
      "class": "modal-title"                                                                                           // 123
    }, "Configure Service"), "\n							"), "\n							", HTML.DIV({                                                     // 124
      "class": "modal-body"                                                                                            // 125
    }, "\n									", HTML.DIV({                                                                                       // 126
      id: "configure-login-service-dialog",                                                                            // 127
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 128
    }, "\n											", Spacebars.include(view.lookupTemplate("configurationSteps")), "\n											", HTML.P("\n											Now, copy over some details.\n											"), "\n											", HTML.P("\n											", HTML.TABLE("\n													", HTML.COLGROUP("\n															", HTML.COL({
      span: "1",                                                                                                       // 130
      "class": "configuration_labels"                                                                                  // 131
    }), "\n															", HTML.COL({                                                                                // 132
      span: "1",                                                                                                       // 133
      "class": "configuration_inputs"                                                                                  // 134
    }), "\n													"), "\n													", Blaze.Each(function() {                                                 // 135
      return Spacebars.call(view.lookup("configurationFields"));                                                       // 136
    }, function() {                                                                                                    // 137
      return [ "\n													", HTML.TR("\n															", HTML.TD("\n																	", HTML.LABEL({             // 138
        "for": function() {                                                                                            // 139
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 140
        }                                                                                                              // 141
      }, Blaze.View(function() {                                                                                       // 142
        return Spacebars.mustache(view.lookup("label"));                                                               // 143
      })), "\n															"), "\n															", HTML.TD("\n																	", HTML.INPUT({                      // 144
        id: function() {                                                                                               // 145
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 146
        },                                                                                                             // 147
        type: "text"                                                                                                   // 148
      }), "\n															"), "\n													"), "\n													" ];                                               // 149
    }), "\n											"), "\n											"), "\n									"), "\n							"), "\n							", HTML.DIV({                      // 150
      "class": "modal-footer new-section"                                                                              // 151
    }, "\n									", HTML.DIV({                                                                                       // 152
      "class": "login-button btn btn-danger configure-login-service-dismiss-button"                                    // 153
    }, "\n											I'll do this later\n									"), "\n									", HTML.DIV({                                        // 154
      "class": function() {                                                                                            // 155
        return [ "login-button login-button-configure btn btn-success ", Blaze.If(function() {                         // 156
          return Spacebars.call(view.lookup("saveDisabled"));                                                          // 157
        }, function() {                                                                                                // 158
          return "login-button-disabled";                                                                              // 159
        }) ];                                                                                                          // 160
      },                                                                                                               // 161
      id: "configure-login-service-dialog-save-configuration"                                                          // 162
    }, "\n											Save Configuration\n									"), "\n							"), "\n					"), "\n			"), "\n	"), "\n	" ];             // 163
  });                                                                                                                  // 164
}));                                                                                                                   // 165
                                                                                                                       // 166
Template.__define__("_loginButtonsMessagesDialog", (function() {                                                       // 167
  var view = this;                                                                                                     // 168
  return Blaze.If(function() {                                                                                         // 169
    return Spacebars.call(view.lookup("visible"));                                                                     // 170
  }, function() {                                                                                                      // 171
    return [ "\n		", HTML.DIV({                                                                                        // 172
      "class": "accounts-dialog accounts-centered-dialog",                                                             // 173
      id: "login-buttons-message-dialog"                                                                               // 174
    }, "\n			", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n			", HTML.DIV({                   // 175
      "class": "login-button",                                                                                         // 176
      id: "messages-dialog-dismiss-button"                                                                             // 177
    }, "Dismiss"), "\n		"), "\n	" ];                                                                                   // 178
  });                                                                                                                  // 179
}));                                                                                                                   // 180
                                                                                                                       // 181
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/login_buttons_session.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
	var VALID_KEYS = [                                                                                                    // 2
		'dropdownVisible',                                                                                                   // 3
                                                                                                                       // 4
		// XXX consider replacing these with one key that has an enum for values.                                            // 5
		'inSignupFlow',                                                                                                      // 6
		'inForgotPasswordFlow',                                                                                              // 7
		'inChangePasswordFlow',                                                                                              // 8
		'inMessageOnlyFlow',                                                                                                 // 9
                                                                                                                       // 10
		'errorMessage',                                                                                                      // 11
		'infoMessage',                                                                                                       // 12
                                                                                                                       // 13
		// dialogs with messages (info and error)                                                                            // 14
		'resetPasswordToken',                                                                                                // 15
		'enrollAccountToken',                                                                                                // 16
		'justVerifiedEmail',                                                                                                 // 17
                                                                                                                       // 18
		'configureLoginServiceDialogVisible',                                                                                // 19
		'configureLoginServiceDialogServiceName',                                                                            // 20
		'configureLoginServiceDialogSaveDisabled'                                                                            // 21
	];                                                                                                                    // 22
                                                                                                                       // 23
	var validateKey = function (key) {                                                                                    // 24
		if (!_.contains(VALID_KEYS, key))                                                                                    // 25
			throw new Error("Invalid key in loginButtonsSession: " + key);                                                      // 26
	};                                                                                                                    // 27
                                                                                                                       // 28
	var KEY_PREFIX = "Meteor.loginButtons.";                                                                              // 29
                                                                                                                       // 30
	// XXX we should have a better pattern for code private to a package like this one                                    // 31
	Accounts._loginButtonsSession = {                                                                                     // 32
		set: function(key, value) {                                                                                          // 33
			validateKey(key);                                                                                                   // 34
			if (_.contains(['errorMessage', 'infoMessage'], key))                                                               // 35
				throw new Error("Don't set errorMessage or infoMessage directly. Instead, use errorMessage() or infoMessage().");  // 36
                                                                                                                       // 37
			this._set(key, value);                                                                                              // 38
		},                                                                                                                   // 39
                                                                                                                       // 40
		_set: function(key, value) {                                                                                         // 41
			Session.set(KEY_PREFIX + key, value);                                                                               // 42
		},                                                                                                                   // 43
                                                                                                                       // 44
		get: function(key) {                                                                                                 // 45
			validateKey(key);                                                                                                   // 46
			return Session.get(KEY_PREFIX + key);                                                                               // 47
		},                                                                                                                   // 48
                                                                                                                       // 49
		closeDropdown: function () {                                                                                         // 50
			this.set('inSignupFlow', false);                                                                                    // 51
			this.set('inForgotPasswordFlow', false);                                                                            // 52
			this.set('inChangePasswordFlow', false);                                                                            // 53
			this.set('inMessageOnlyFlow', false);                                                                               // 54
			this.set('dropdownVisible', false);                                                                                 // 55
			this.resetMessages();                                                                                               // 56
		},                                                                                                                   // 57
                                                                                                                       // 58
		infoMessage: function(message) {                                                                                     // 59
			this._set("errorMessage", null);                                                                                    // 60
			this._set("infoMessage", message);                                                                                  // 61
			this.ensureMessageVisible();                                                                                        // 62
		},                                                                                                                   // 63
                                                                                                                       // 64
		errorMessage: function(message) {                                                                                    // 65
			this._set("errorMessage", message);                                                                                 // 66
			this._set("infoMessage", null);                                                                                     // 67
			this.ensureMessageVisible();                                                                                        // 68
		},                                                                                                                   // 69
                                                                                                                       // 70
		// is there a visible dialog that shows messages (info and error)                                                    // 71
		isMessageDialogVisible: function () {                                                                                // 72
			return this.get('resetPasswordToken') ||                                                                            // 73
				this.get('enrollAccountToken') ||                                                                                  // 74
				this.get('justVerifiedEmail');                                                                                     // 75
		},                                                                                                                   // 76
                                                                                                                       // 77
		// ensure that somethings displaying a message (info or error) is                                                    // 78
		// visible.  if a dialog with messages is open, do nothing;                                                          // 79
		// otherwise open the dropdown.                                                                                      // 80
		//                                                                                                                   // 81
		// notably this doesn't matter when only displaying a single login                                                   // 82
		// button since then we have an explicit message dialog                                                              // 83
		// (_loginButtonsMessageDialog), and dropdownVisible is ignored in                                                   // 84
		// this case.                                                                                                        // 85
		ensureMessageVisible: function () {                                                                                  // 86
			if (!this.isMessageDialogVisible())                                                                                 // 87
				this.set("dropdownVisible", true);                                                                                 // 88
		},                                                                                                                   // 89
                                                                                                                       // 90
		resetMessages: function () {                                                                                         // 91
			this._set("errorMessage", null);                                                                                    // 92
			this._set("infoMessage", null);                                                                                     // 93
		},                                                                                                                   // 94
                                                                                                                       // 95
		configureService: function (name) {                                                                                  // 96
			this.set('configureLoginServiceDialogVisible', true);                                                               // 97
			this.set('configureLoginServiceDialogServiceName', name);                                                           // 98
			this.set('configureLoginServiceDialogSaveDisabled', true);                                                          // 99
			setTimeout(function(){                                                                                              // 100
				$('#configure-login-service-dialog-modal').modal();                                                                // 101
			}, 500)                                                                                                             // 102
		}                                                                                                                    // 103
	};                                                                                                                    // 104
}) ();                                                                                                                 // 105
                                                                                                                       // 106
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/login_buttons.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
	if (!Accounts._loginButtons)                                                                                          // 2
		Accounts._loginButtons = {};                                                                                         // 3
                                                                                                                       // 4
	// for convenience                                                                                                    // 5
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 6
                                                                                                                       // 7
	UI.registerHelper("loginButtons", function () {                                                                       // 8
		return Template._loginButtons;                                                                                       // 9
	});                                                                                                                   // 10
                                                                                                                       // 11
	// shared between dropdown and single mode                                                                            // 12
	Template._loginButtons.events({                                                                                       // 13
		'click #login-buttons-logout': function() {                                                                          // 14
			Meteor.logout(function() {                                                                                          // 15
				loginButtonsSession.closeDropdown();                                                                               // 16
			});                                                                                                                 // 17
		}                                                                                                                    // 18
	});                                                                                                                   // 19
                                                                                                                       // 20
	//                                                                                                                    // 21
	// loginButtonLoggedOut template                                                                                      // 22
	//                                                                                                                    // 23
                                                                                                                       // 24
	Template._loginButtonsLoggedOut.dropdown = function() {                                                               // 25
		return Accounts._loginButtons.dropdown();                                                                            // 26
	};                                                                                                                    // 27
                                                                                                                       // 28
	Template._loginButtonsLoggedOut.services = function() {                                                               // 29
		return Accounts._loginButtons.getLoginServices();                                                                    // 30
	};                                                                                                                    // 31
                                                                                                                       // 32
	Template._loginButtonsLoggedOut.singleService = function() {                                                          // 33
		var services = Accounts._loginButtons.getLoginServices();                                                            // 34
		if (services.length !== 1)                                                                                           // 35
			throw new Error(                                                                                                    // 36
				"Shouldn't be rendering this template with more than one configured service");                                     // 37
		return services[0];                                                                                                  // 38
	};                                                                                                                    // 39
                                                                                                                       // 40
	Template._loginButtonsLoggedOut.configurationLoaded = function() {                                                    // 41
		return Accounts.loginServicesConfigured();                                                                           // 42
	};                                                                                                                    // 43
                                                                                                                       // 44
                                                                                                                       // 45
	//                                                                                                                    // 46
	// loginButtonsLoggedIn template                                                                                      // 47
	//                                                                                                                    // 48
                                                                                                                       // 49
	// decide whether we should show a dropdown rather than a row of                                                      // 50
	// buttons                                                                                                            // 51
	Template._loginButtonsLoggedIn.dropdown = function() {                                                                // 52
		return Accounts._loginButtons.dropdown();                                                                            // 53
	};                                                                                                                    // 54
                                                                                                                       // 55
	Template._loginButtonsLoggedIn.displayName = function() {                                                             // 56
		return Accounts._loginButtons.displayName();                                                                         // 57
	};                                                                                                                    // 58
                                                                                                                       // 59
                                                                                                                       // 60
                                                                                                                       // 61
	//                                                                                                                    // 62
	// loginButtonsMessage template                                                                                       // 63
	//                                                                                                                    // 64
                                                                                                                       // 65
	Template._loginButtonsMessages.errorMessage = function() {                                                            // 66
		return loginButtonsSession.get('errorMessage');                                                                      // 67
	};                                                                                                                    // 68
                                                                                                                       // 69
	Template._loginButtonsMessages.infoMessage = function() {                                                             // 70
		return loginButtonsSession.get('infoMessage');                                                                       // 71
	};                                                                                                                    // 72
                                                                                                                       // 73
	//                                                                                                                    // 74
	// loginButtonsLoggingInPadding template                                                                              // 75
	//                                                                                                                    // 76
                                                                                                                       // 77
	Template._loginButtonsLoggingInPadding.dropdown = function() {                                                        // 78
		return Accounts._loginButtons.dropdown();                                                                            // 79
	};                                                                                                                    // 80
                                                                                                                       // 81
	//                                                                                                                    // 82
	// helpers                                                                                                            // 83
	//                                                                                                                    // 84
                                                                                                                       // 85
	Accounts._loginButtons.displayName = function() {                                                                     // 86
		var user = Meteor.user();                                                                                            // 87
		if (!user)                                                                                                           // 88
			return '';                                                                                                          // 89
                                                                                                                       // 90
		if (user.profile && user.profile.name)                                                                               // 91
			return user.profile.name;                                                                                           // 92
		if (user.username)                                                                                                   // 93
			return user.username;                                                                                               // 94
		if (user.emails && user.emails[0] && user.emails[0].address)                                                         // 95
			return user.emails[0].address;                                                                                      // 96
                                                                                                                       // 97
		return '';                                                                                                           // 98
	};                                                                                                                    // 99
                                                                                                                       // 100
	Accounts._loginButtons.getLoginServices = function() {                                                                // 101
		// First look for OAuth services.                                                                                    // 102
		var services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];                                       // 103
                                                                                                                       // 104
		// Be equally kind to all login services. This also preserves                                                        // 105
		// backwards-compatibility. (But maybe order should be                                                               // 106
		// configurable?)                                                                                                    // 107
		services.sort();                                                                                                     // 108
                                                                                                                       // 109
		// Add password, if it's there; it must come last.                                                                   // 110
		if (this.hasPasswordService())                                                                                       // 111
			services.push('password');                                                                                          // 112
                                                                                                                       // 113
		return _.map(services, function(name) {                                                                              // 114
			return {                                                                                                            // 115
				name: name                                                                                                         // 116
			};                                                                                                                  // 117
		});                                                                                                                  // 118
	};                                                                                                                    // 119
                                                                                                                       // 120
	Accounts._loginButtons.hasPasswordService = function() {                                                              // 121
		return !!Package['accounts-password'];                                                                               // 122
	};                                                                                                                    // 123
                                                                                                                       // 124
	Accounts._loginButtons.dropdown = function() {                                                                        // 125
		return this.hasPasswordService() || Accounts._loginButtons.getLoginServices().length > 1;                            // 126
	};                                                                                                                    // 127
                                                                                                                       // 128
	// XXX improve these. should this be in accounts-password instead?                                                    // 129
	//                                                                                                                    // 130
	// XXX these will become configurable, and will be validated on                                                       // 131
	// the server as well.                                                                                                // 132
	Accounts._loginButtons.validateUsername = function(username) {                                                        // 133
		if (username.length >= 3) {                                                                                          // 134
			return true;                                                                                                        // 135
		} else {                                                                                                             // 136
			loginButtonsSession.errorMessage("Username must be at least 3 characters long");                                    // 137
			return false;                                                                                                       // 138
		}                                                                                                                    // 139
	};                                                                                                                    // 140
	Accounts._loginButtons.validateEmail = function(email) {                                                              // 141
		if (Accounts.ui._passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL" && email === '')                           // 142
			return true;                                                                                                        // 143
                                                                                                                       // 144
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                                                                                       // 146
		if (re.test(email)) {                                                                                                // 147
			return true;                                                                                                        // 148
		} else {                                                                                                             // 149
			loginButtonsSession.errorMessage("Invalid email");                                                                  // 150
			return false;                                                                                                       // 151
		}                                                                                                                    // 152
	};                                                                                                                    // 153
	Accounts._loginButtons.validatePassword = function(password) {                                                        // 154
		if (password.length >= 6) {                                                                                          // 155
			return true;                                                                                                        // 156
		} else {                                                                                                             // 157
			loginButtonsSession.errorMessage("Password must be at least 6 characters long");                                    // 158
			return false;                                                                                                       // 159
		}                                                                                                                    // 160
	};                                                                                                                    // 161
                                                                                                                       // 162
	Accounts._loginButtons.rendered = function () {                                                                       // 163
		debugger;                                                                                                            // 164
	};                                                                                                                    // 165
                                                                                                                       // 166
})();                                                                                                                  // 167
                                                                                                                       // 168
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/login_buttons_single.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
	// for convenience                                                                                                    // 2
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 3
                                                                                                                       // 4
	Template._loginButtonsLoggedOutSingleLoginButton.events({                                                             // 5
		'click .login-button': function () {                                                                                 // 6
			var serviceName = this.name;                                                                                        // 7
			loginButtonsSession.resetMessages();                                                                                // 8
			var callback = function (err) {                                                                                     // 9
				if (!err) {                                                                                                        // 10
					loginButtonsSession.closeDropdown();                                                                              // 11
				} else if (err instanceof Accounts.LoginCancelledError) {                                                          // 12
					// do nothing                                                                                                     // 13
				} else if (err instanceof Accounts.ConfigError) {                                                                  // 14
					loginButtonsSession.configureService(serviceName);                                                                // 15
				} else {                                                                                                           // 16
					loginButtonsSession.errorMessage(err.reason || "Unknown error");                                                  // 17
				}                                                                                                                  // 18
			};                                                                                                                  // 19
                                                                                                                       // 20
			var loginWithService = Meteor["loginWith" + capitalize(serviceName)];                                               // 21
                                                                                                                       // 22
			var options = {}; // use default scope unless specified                                                             // 23
			if (Accounts.ui._options.requestPermissions[serviceName])                                                           // 24
				options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];                                 // 25
                                                                                                                       // 26
			loginWithService(options, callback);                                                                                // 27
		}                                                                                                                    // 28
	});                                                                                                                   // 29
                                                                                                                       // 30
	Template._loginButtonsLoggedOutSingleLoginButton.configured = function () {                                           // 31
		return !!Accounts.loginServiceConfiguration.findOne({service: this.name});                                           // 32
	};                                                                                                                    // 33
                                                                                                                       // 34
	Template._loginButtonsLoggedOutSingleLoginButton.capitalizedName = function () {                                      // 35
		if (this.name === 'github')                                                                                          // 36
			// XXX we should allow service packages to set their capitalized name                                               // 37
			return 'GitHub';                                                                                                    // 38
		else                                                                                                                 // 39
			return capitalize(this.name);                                                                                       // 40
	};                                                                                                                    // 41
                                                                                                                       // 42
	// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                        // 43
	var capitalize = function(str){                                                                                       // 44
		str = str == null ? '' : String(str);                                                                                // 45
		return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 46
	};                                                                                                                    // 47
}) ();                                                                                                                 // 48
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/login_buttons_dropdown.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function() {                                                                                                          // 1
                                                                                                                       // 2
	// for convenience                                                                                                    // 3
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 4
                                                                                                                       // 5
	// events shared between loginButtonsLoggedOutDropdown and                                                            // 6
	// loginButtonsLoggedInDropdown                                                                                       // 7
	Template._loginButtons.events({                                                                                       // 8
		'click input': function(event){                                                                                      // 9
			event.stopPropagation();                                                                                            // 10
		},                                                                                                                   // 11
		'click #login-name-link, click #login-sign-in-link': function(event) {                                               // 12
			event.stopPropagation();                                                                                            // 13
			loginButtonsSession.set('dropdownVisible', true);                                                                   // 14
			Meteor.flush();                                                                                                     // 15
		},                                                                                                                   // 16
		'click .login-close': function() {                                                                                   // 17
			loginButtonsSession.closeDropdown();                                                                                // 18
		}                                                                                                                    // 19
	});                                                                                                                   // 20
                                                                                                                       // 21
	Template._loginButtons.toggleDropdown = function() {                                                                  // 22
		toggleDropdown();                                                                                                    // 23
	};                                                                                                                    // 24
                                                                                                                       // 25
	//                                                                                                                    // 26
	// loginButtonsLoggedInDropdown template and related                                                                  // 27
	//                                                                                                                    // 28
                                                                                                                       // 29
	Template._loginButtonsLoggedInDropdown.events({                                                                       // 30
		'click #login-buttons-open-change-password': function(event) {                                                       // 31
			event.stopPropagation();                                                                                            // 32
			loginButtonsSession.resetMessages();                                                                                // 33
			loginButtonsSession.set('inChangePasswordFlow', true);                                                              // 34
			Meteor.flush();                                                                                                     // 35
		}                                                                                                                    // 36
	});                                                                                                                   // 37
                                                                                                                       // 38
	Template._loginButtonsLoggedInDropdown.displayName = function() {                                                     // 39
		return Accounts._loginButtons.displayName();                                                                         // 40
	};                                                                                                                    // 41
                                                                                                                       // 42
	Template._loginButtonsLoggedInDropdown.inChangePasswordFlow = function() {                                            // 43
		return loginButtonsSession.get('inChangePasswordFlow');                                                              // 44
	};                                                                                                                    // 45
                                                                                                                       // 46
	Template._loginButtonsLoggedInDropdown.inMessageOnlyFlow = function() {                                               // 47
		return loginButtonsSession.get('inMessageOnlyFlow');                                                                 // 48
	};                                                                                                                    // 49
                                                                                                                       // 50
	Template._loginButtonsLoggedInDropdown.dropdownVisible = function() {                                                 // 51
		return loginButtonsSession.get('dropdownVisible');                                                                   // 52
	};                                                                                                                    // 53
                                                                                                                       // 54
	Template._loginButtonsLoggedInDropdownActions.allowChangingPassword = function() {                                    // 55
		// it would be more correct to check whether the user has a password set,                                            // 56
		// but in order to do that we'd have to send more data down to the client,                                           // 57
		// and it'd be preferable not to send down the entire service.password document.                                     // 58
		//                                                                                                                   // 59
		// instead we use the heuristic: if the user has a username or email set.                                            // 60
		var user = Meteor.user();                                                                                            // 61
		return user.username || (user.emails && user.emails[0] && user.emails[0].address);                                   // 62
	};                                                                                                                    // 63
                                                                                                                       // 64
                                                                                                                       // 65
	Template._loginButtonsLoggedInDropdownActions.additionalLoggedInDropdownActions = function () {                       // 66
	  return Template._loginButtonsAdditionalLoggedInDropdownActions !== undefined;                                       // 67
	};                                                                                                                    // 68
                                                                                                                       // 69
	//                                                                                                                    // 70
	// loginButtonsLoggedOutDropdown template and related                                                                 // 71
	//                                                                                                                    // 72
                                                                                                                       // 73
	Template._loginButtonsLoggedOutDropdown.events({                                                                      // 74
		'click #login-buttons-password': function(event) {                                                                   // 75
			event.stopPropagation();                                                                                            // 76
			loginOrSignup();                                                                                                    // 77
		},                                                                                                                   // 78
                                                                                                                       // 79
		'keypress #forgot-password-email': function(event) {                                                                 // 80
			event.stopPropagation();                                                                                            // 81
			if (event.keyCode === 13)                                                                                           // 82
				forgotPassword();                                                                                                  // 83
		},                                                                                                                   // 84
                                                                                                                       // 85
		'click #login-buttons-forgot-password': function(event) {                                                            // 86
			event.stopPropagation();                                                                                            // 87
			forgotPassword();                                                                                                   // 88
		},                                                                                                                   // 89
                                                                                                                       // 90
		'click #signup-link': function(event) {                                                                              // 91
			event.stopPropagation();                                                                                            // 92
			loginButtonsSession.resetMessages();                                                                                // 93
                                                                                                                       // 94
			// store values of fields before swtiching to the signup form                                                       // 95
			var username = trimmedElementValueById('login-username');                                                           // 96
			var email = trimmedElementValueById('login-email');                                                                 // 97
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                           // 98
			// notably not trimmed. a password could (?) start or end with a space                                              // 99
			var password = elementValueById('login-password');                                                                  // 100
                                                                                                                       // 101
			loginButtonsSession.set('inSignupFlow', true);                                                                      // 102
			loginButtonsSession.set('inForgotPasswordFlow', false);                                                             // 103
                                                                                                                       // 104
			// force the ui to update so that we have the approprate fields to fill in                                          // 105
			Meteor.flush();                                                                                                     // 106
                                                                                                                       // 107
			// update new fields with appropriate defaults                                                                      // 108
			if (username !== null)                                                                                              // 109
				document.getElementById('login-username').value = username;                                                        // 110
			else if (email !== null)                                                                                            // 111
				document.getElementById('login-email').value = email;                                                              // 112
			else if (usernameOrEmail !== null)                                                                                  // 113
				if (usernameOrEmail.indexOf('@') === -1)                                                                           // 114
					document.getElementById('login-username').value = usernameOrEmail;                                                // 115
				else                                                                                                               // 116
					document.getElementById('login-email').value = usernameOrEmail;                                                   // 117
		},                                                                                                                   // 118
		'click #forgot-password-link': function(event) {                                                                     // 119
			event.stopPropagation();                                                                                            // 120
			loginButtonsSession.resetMessages();                                                                                // 121
                                                                                                                       // 122
			// store values of fields before swtiching to the signup form                                                       // 123
			var email = trimmedElementValueById('login-email');                                                                 // 124
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                           // 125
                                                                                                                       // 126
			loginButtonsSession.set('inSignupFlow', false);                                                                     // 127
			loginButtonsSession.set('inForgotPasswordFlow', true);                                                              // 128
                                                                                                                       // 129
			// force the ui to update so that we have the approprate fields to fill in                                          // 130
			Meteor.flush();                                                                                                     // 131
			//toggleDropdown();                                                                                                 // 132
                                                                                                                       // 133
			// update new fields with appropriate defaults                                                                      // 134
			if (email !== null)                                                                                                 // 135
				document.getElementById('forgot-password-email').value = email;                                                    // 136
			else if (usernameOrEmail !== null)                                                                                  // 137
				if (usernameOrEmail.indexOf('@') !== -1)                                                                           // 138
					document.getElementById('forgot-password-email').value = usernameOrEmail;                                         // 139
		},                                                                                                                   // 140
		'click #back-to-login-link': function(event) {                                                                       // 141
			event.stopPropagation();                                                                                            // 142
			loginButtonsSession.resetMessages();                                                                                // 143
                                                                                                                       // 144
			var username = trimmedElementValueById('login-username');                                                           // 145
			var email = trimmedElementValueById('login-email') || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?
                                                                                                                       // 147
			loginButtonsSession.set('inSignupFlow', false);                                                                     // 148
			loginButtonsSession.set('inForgotPasswordFlow', false);                                                             // 149
                                                                                                                       // 150
			// force the ui to update so that we have the approprate fields to fill in                                          // 151
			Meteor.flush();                                                                                                     // 152
                                                                                                                       // 153
			if (document.getElementById('login-username'))                                                                      // 154
				document.getElementById('login-username').value = username;                                                        // 155
			if (document.getElementById('login-email'))                                                                         // 156
				document.getElementById('login-email').value = email;                                                              // 157
			// "login-password" is preserved thanks to the preserve-inputs package                                              // 158
			if (document.getElementById('login-username-or-email'))                                                             // 159
				document.getElementById('login-username-or-email').value = email || username;                                      // 160
		},                                                                                                                   // 161
		'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function(event) {
			if (event.keyCode === 13)                                                                                           // 163
				loginOrSignup();                                                                                                   // 164
		}                                                                                                                    // 165
	});                                                                                                                   // 166
                                                                                                                       // 167
	// additional classes that can be helpful in styling the dropdown                                                     // 168
	Template._loginButtonsLoggedOutDropdown.additionalClasses = function() {                                              // 169
		if (!Accounts.password) {                                                                                            // 170
			return false;                                                                                                       // 171
		} else {                                                                                                             // 172
			if (loginButtonsSession.get('inSignupFlow')) {                                                                      // 173
				return 'login-form-create-account';                                                                                // 174
			} else if (loginButtonsSession.get('inForgotPasswordFlow')) {                                                       // 175
				return 'login-form-forgot-password';                                                                               // 176
			} else {                                                                                                            // 177
				return 'login-form-sign-in';                                                                                       // 178
			}                                                                                                                   // 179
		}                                                                                                                    // 180
	};                                                                                                                    // 181
                                                                                                                       // 182
	Template._loginButtonsLoggedOutDropdown.dropdownVisible = function() {                                                // 183
		return loginButtonsSession.get('dropdownVisible');                                                                   // 184
	};                                                                                                                    // 185
                                                                                                                       // 186
	Template._loginButtonsLoggedOutDropdown.hasPasswordService = function() {                                             // 187
		return Accounts._loginButtons.hasPasswordService();                                                                  // 188
	};                                                                                                                    // 189
                                                                                                                       // 190
	Template._loginButtonsLoggedOutDropdown.forbidClientAccountCreation = function() {                                    // 191
		return Accounts._options.forbidClientAccountCreation;                                                                // 192
	};                                                                                                                    // 193
                                                                                                                       // 194
	Template._loginButtonsLoggedOutAllServices.services = function() {                                                    // 195
		return Accounts._loginButtons.getLoginServices();                                                                    // 196
	};                                                                                                                    // 197
                                                                                                                       // 198
	Template._loginButtonsLoggedOutAllServices.isPasswordService = function() {                                           // 199
		return this.name === 'password';                                                                                     // 200
	};                                                                                                                    // 201
                                                                                                                       // 202
	Template._loginButtonsLoggedOutAllServices.hasOtherServices = function() {                                            // 203
		return Accounts._loginButtons.getLoginServices().length > 1;                                                         // 204
	};                                                                                                                    // 205
                                                                                                                       // 206
	Template._loginButtonsLoggedOutAllServices.hasPasswordService = function() {                                          // 207
		return Accounts._loginButtons.hasPasswordService();                                                                  // 208
	};                                                                                                                    // 209
                                                                                                                       // 210
	Template._loginButtonsLoggedOutPasswordService.fields = function() {                                                  // 211
		var loginFields = [{                                                                                                 // 212
			fieldName: 'username-or-email',                                                                                     // 213
			fieldLabel: 'Username or Email',                                                                                    // 214
			visible: function() {                                                                                               // 215
				return _.contains(                                                                                                 // 216
					["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],                              // 217
					Accounts.ui._passwordSignupFields());                                                                             // 218
			}                                                                                                                   // 219
		}, {                                                                                                                 // 220
			fieldName: 'username',                                                                                              // 221
			fieldLabel: 'Username',                                                                                             // 222
			visible: function() {                                                                                               // 223
				return Accounts.ui._passwordSignupFields() === "USERNAME_ONLY";                                                    // 224
			}                                                                                                                   // 225
		}, {                                                                                                                 // 226
			fieldName: 'email',                                                                                                 // 227
			fieldLabel: 'Email',                                                                                                // 228
			inputType: 'email',                                                                                                 // 229
			visible: function() {                                                                                               // 230
				return Accounts.ui._passwordSignupFields() === "EMAIL_ONLY";                                                       // 231
			}                                                                                                                   // 232
		}, {                                                                                                                 // 233
			fieldName: 'password',                                                                                              // 234
			fieldLabel: 'Password',                                                                                             // 235
			inputType: 'password',                                                                                              // 236
			visible: function() {                                                                                               // 237
				return true;                                                                                                       // 238
			}                                                                                                                   // 239
		}];                                                                                                                  // 240
                                                                                                                       // 241
		var signupFields = [{                                                                                                // 242
			fieldName: 'username',                                                                                              // 243
			fieldLabel: 'Username',                                                                                             // 244
			visible: function() {                                                                                               // 245
				return _.contains(                                                                                                 // 246
					["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],             // 247
					Accounts.ui._passwordSignupFields());                                                                             // 248
			}                                                                                                                   // 249
		}, {                                                                                                                 // 250
			fieldName: 'email',                                                                                                 // 251
			fieldLabel: 'Email',                                                                                                // 252
			inputType: 'email',                                                                                                 // 253
			visible: function() {                                                                                               // 254
				return _.contains(                                                                                                 // 255
					["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "EMAIL_ONLY"],                                               // 256
					Accounts.ui._passwordSignupFields());                                                                             // 257
			}                                                                                                                   // 258
		}, {                                                                                                                 // 259
			fieldName: 'email',                                                                                                 // 260
			fieldLabel: 'Email (optional)',                                                                                     // 261
			inputType: 'email',                                                                                                 // 262
			visible: function() {                                                                                               // 263
				return Accounts.ui._passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";                                      // 264
			}                                                                                                                   // 265
		}, {                                                                                                                 // 266
			fieldName: 'password',                                                                                              // 267
			fieldLabel: 'Password',                                                                                             // 268
			inputType: 'password',                                                                                              // 269
			visible: function() {                                                                                               // 270
				return true;                                                                                                       // 271
			}                                                                                                                   // 272
		}, {                                                                                                                 // 273
			fieldName: 'password-again',                                                                                        // 274
			fieldLabel: 'Password (again)',                                                                                     // 275
			inputType: 'password',                                                                                              // 276
			visible: function() {                                                                                               // 277
				// No need to make users double-enter their password if                                                            // 278
				// they'll necessarily have an email set, since they can use                                                       // 279
				// the "forgot password" flow.                                                                                     // 280
				return _.contains(                                                                                                 // 281
					["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                   // 282
					Accounts.ui._passwordSignupFields());                                                                             // 283
			}                                                                                                                   // 284
		}];                                                                                                                  // 285
                                                                                                                       // 286
		signupFields = Accounts.ui._options.extraSignupFields.concat(signupFields);                                          // 287
                                                                                                                       // 288
		return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;                                         // 289
	};                                                                                                                    // 290
                                                                                                                       // 291
	Template._loginButtonsLoggedOutPasswordService.inForgotPasswordFlow = function() {                                    // 292
		return loginButtonsSession.get('inForgotPasswordFlow');                                                              // 293
	};                                                                                                                    // 294
                                                                                                                       // 295
	Template._loginButtonsLoggedOutPasswordService.inLoginFlow = function() {                                             // 296
		return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');                 // 297
	};                                                                                                                    // 298
                                                                                                                       // 299
	Template._loginButtonsLoggedOutPasswordService.inSignupFlow = function() {                                            // 300
		return loginButtonsSession.get('inSignupFlow');                                                                      // 301
	};                                                                                                                    // 302
                                                                                                                       // 303
	Template._loginButtonsLoggedOutPasswordService.showForgotPasswordLink = function() {                                  // 304
		return _.contains(                                                                                                   // 305
			["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],                  // 306
			Accounts.ui._passwordSignupFields());                                                                               // 307
	};                                                                                                                    // 308
                                                                                                                       // 309
	Template._loginButtonsLoggedOutPasswordService.showCreateAccountLink = function() {                                   // 310
		return !Accounts._options.forbidClientAccountCreation;                                                               // 311
	};                                                                                                                    // 312
                                                                                                                       // 313
	Template._loginButtonsFormField.inputType = function() {                                                              // 314
		return this.inputType || "text";                                                                                     // 315
	};                                                                                                                    // 316
                                                                                                                       // 317
                                                                                                                       // 318
	//                                                                                                                    // 319
	// loginButtonsChangePassword template                                                                                // 320
	//                                                                                                                    // 321
	Template._loginButtonsChangePassword.events({                                                                         // 322
		'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function(event) {          // 323
			if (event.keyCode === 13)                                                                                           // 324
				changePassword();                                                                                                  // 325
		},                                                                                                                   // 326
		'click #login-buttons-do-change-password': function(event) {                                                         // 327
			event.stopPropagation();                                                                                            // 328
			changePassword();                                                                                                   // 329
		},                                                                                                                   // 330
		'click #login-buttons-cancel-change-password': function(event) {                                                     // 331
			event.stopPropagation();                                                                                            // 332
			loginButtonsSession.resetMessages();                                                                                // 333
			Accounts._loginButtonsSession.set('inChangePasswordFlow', false);                                                   // 334
			Meteor.flush();                                                                                                     // 335
		}                                                                                                                    // 336
	});                                                                                                                   // 337
                                                                                                                       // 338
	Template._loginButtonsChangePassword.fields = function() {                                                            // 339
		return [{                                                                                                            // 340
			fieldName: 'old-password',                                                                                          // 341
			fieldLabel: 'Current Password',                                                                                     // 342
			inputType: 'password',                                                                                              // 343
			visible: function() {                                                                                               // 344
				return true;                                                                                                       // 345
			}                                                                                                                   // 346
		}, {                                                                                                                 // 347
			fieldName: 'password',                                                                                              // 348
			fieldLabel: 'New Password',                                                                                         // 349
			inputType: 'password',                                                                                              // 350
			visible: function() {                                                                                               // 351
				return true;                                                                                                       // 352
			}                                                                                                                   // 353
		}, {                                                                                                                 // 354
			fieldName: 'password-again',                                                                                        // 355
			fieldLabel: 'New Password (again)',                                                                                 // 356
			inputType: 'password',                                                                                              // 357
			visible: function() {                                                                                               // 358
				// No need to make users double-enter their password if                                                            // 359
				// they'll necessarily have an email set, since they can use                                                       // 360
				// the "forgot password" flow.                                                                                     // 361
				return _.contains(                                                                                                 // 362
					["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                                 // 363
					Accounts.ui._passwordSignupFields());                                                                             // 364
			}                                                                                                                   // 365
		}];                                                                                                                  // 366
	};                                                                                                                    // 367
                                                                                                                       // 368
                                                                                                                       // 369
	//                                                                                                                    // 370
	// helpers                                                                                                            // 371
	//                                                                                                                    // 372
                                                                                                                       // 373
	var elementValueById = function(id) {                                                                                 // 374
		var element = document.getElementById(id);                                                                           // 375
		if (!element)                                                                                                        // 376
			return null;                                                                                                        // 377
		else                                                                                                                 // 378
			return element.value;                                                                                               // 379
	};                                                                                                                    // 380
                                                                                                                       // 381
	var trimmedElementValueById = function(id) {                                                                          // 382
		var element = document.getElementById(id);                                                                           // 383
		if (!element)                                                                                                        // 384
			return null;                                                                                                        // 385
		else                                                                                                                 // 386
			return element.value.replace(/^\s*|\s*$/g, ""); // trim;                                                            // 387
	};                                                                                                                    // 388
                                                                                                                       // 389
	var loginOrSignup = function() {                                                                                      // 390
		if (loginButtonsSession.get('inSignupFlow'))                                                                         // 391
			signup();                                                                                                           // 392
		else                                                                                                                 // 393
			login();                                                                                                            // 394
	};                                                                                                                    // 395
                                                                                                                       // 396
	var login = function() {                                                                                              // 397
		loginButtonsSession.resetMessages();                                                                                 // 398
                                                                                                                       // 399
		var username = trimmedElementValueById('login-username');                                                            // 400
		var email = trimmedElementValueById('login-email');                                                                  // 401
		var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                            // 402
		// notably not trimmed. a password could (?) start or end with a space                                               // 403
		var password = elementValueById('login-password');                                                                   // 404
                                                                                                                       // 405
		var loginSelector;                                                                                                   // 406
		if (username !== null) {                                                                                             // 407
			if (!Accounts._loginButtons.validateUsername(username))                                                             // 408
				return;                                                                                                            // 409
			else                                                                                                                // 410
				loginSelector = {                                                                                                  // 411
					username: username                                                                                                // 412
				};                                                                                                                 // 413
		} else if (email !== null) {                                                                                         // 414
			if (!Accounts._loginButtons.validateEmail(email))                                                                   // 415
				return;                                                                                                            // 416
			else                                                                                                                // 417
				loginSelector = {                                                                                                  // 418
					email: email                                                                                                      // 419
				};                                                                                                                 // 420
		} else if (usernameOrEmail !== null) {                                                                               // 421
			// XXX not sure how we should validate this. but this seems good enough (for now),                                  // 422
			// since an email must have at least 3 characters anyways                                                           // 423
			if (!Accounts._loginButtons.validateUsername(usernameOrEmail))                                                      // 424
				return;                                                                                                            // 425
			else                                                                                                                // 426
				loginSelector = usernameOrEmail;                                                                                   // 427
		} else {                                                                                                             // 428
			throw new Error("Unexpected -- no element to use as a login user selector");                                        // 429
		}                                                                                                                    // 430
                                                                                                                       // 431
		Meteor.loginWithPassword(loginSelector, password, function(error, result) {                                          // 432
			if (error) {                                                                                                        // 433
				loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                 // 434
			} else {                                                                                                            // 435
				loginButtonsSession.closeDropdown();                                                                               // 436
			}                                                                                                                   // 437
		});                                                                                                                  // 438
	};                                                                                                                    // 439
                                                                                                                       // 440
	var toggleDropdown = function() {                                                                                     // 441
		$('#login-dropdown-list .dropdown-menu').dropdown('toggle');                                                         // 442
	};                                                                                                                    // 443
                                                                                                                       // 444
	var signup = function() {                                                                                             // 445
		loginButtonsSession.resetMessages();                                                                                 // 446
                                                                                                                       // 447
		var options = {}; // to be passed to Accounts.createUser                                                             // 448
                                                                                                                       // 449
		var username = trimmedElementValueById('login-username');                                                            // 450
		if (username !== null) {                                                                                             // 451
			if (!Accounts._loginButtons.validateUsername(username))                                                             // 452
				return;                                                                                                            // 453
			else                                                                                                                // 454
				options.username = username;                                                                                       // 455
		}                                                                                                                    // 456
                                                                                                                       // 457
		var email = trimmedElementValueById('login-email');                                                                  // 458
		if (email !== null) {                                                                                                // 459
			if (!Accounts._loginButtons.validateEmail(email))                                                                   // 460
				return;                                                                                                            // 461
			else                                                                                                                // 462
				options.email = email;                                                                                             // 463
		}                                                                                                                    // 464
                                                                                                                       // 465
		// notably not trimmed. a password could (?) start or end with a space                                               // 466
		var password = elementValueById('login-password');                                                                   // 467
		if (!Accounts._loginButtons.validatePassword(password))                                                              // 468
			return;                                                                                                             // 469
		else                                                                                                                 // 470
			options.password = password;                                                                                        // 471
                                                                                                                       // 472
		if (!matchPasswordAgainIfPresent())                                                                                  // 473
			return;                                                                                                             // 474
                                                                                                                       // 475
		// prepare the profile object                                                                                        // 476
		options.profile = {};                                                                                                // 477
                                                                                                                       // 478
		// define a proxy function to allow extraSignupFields set error messages                                             // 479
		var errorFn = function(errorMessage) {                                                                               // 480
			Accounts._loginButtonsSession.errorMessage(errorMessage);                                                           // 481
		};                                                                                                                   // 482
                                                                                                                       // 483
		var invalidExtraSignupFields = false;                                                                                // 484
                                                                                                                       // 485
		// parse extraSignupFields to populate account's profile data                                                        // 486
		_.each(Accounts.ui._options.extraSignupFields, function(field, index) {                                              // 487
			var value = elementValueById('login-' + field.fieldName);                                                           // 488
			if (typeof field.validate === 'function') {                                                                         // 489
				if (field.validate(value, errorFn)) {                                                                              // 490
					options.profile[field.fieldName] = elementValueById('login-' + field.fieldName);                                  // 491
				} else {                                                                                                           // 492
					invalidExtraSignupFields = true;                                                                                  // 493
				}                                                                                                                  // 494
			} else {                                                                                                            // 495
				options.profile[field.fieldName] = elementValueById('login-' + field.fieldName);                                   // 496
			}                                                                                                                   // 497
		});                                                                                                                  // 498
                                                                                                                       // 499
		if (invalidExtraSignupFields)                                                                                        // 500
			return;                                                                                                             // 501
                                                                                                                       // 502
		Accounts.createUser(options, function(error) {                                                                       // 503
			if (error) {                                                                                                        // 504
				loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                 // 505
			} else {                                                                                                            // 506
				loginButtonsSession.closeDropdown();                                                                               // 507
			}                                                                                                                   // 508
		});                                                                                                                  // 509
	};                                                                                                                    // 510
                                                                                                                       // 511
	var forgotPassword = function() {                                                                                     // 512
		loginButtonsSession.resetMessages();                                                                                 // 513
                                                                                                                       // 514
		var email = trimmedElementValueById("forgot-password-email");                                                        // 515
		if (email.indexOf('@') !== -1) {                                                                                     // 516
			Accounts.forgotPassword({                                                                                           // 517
				email: email                                                                                                       // 518
			}, function(error) {                                                                                                // 519
				if (error)                                                                                                         // 520
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 521
				else                                                                                                               // 522
					loginButtonsSession.infoMessage("Email sent");                                                                    // 523
			});                                                                                                                 // 524
		} else {                                                                                                             // 525
			loginButtonsSession.infoMessage("Email sent");                                                                      // 526
		}                                                                                                                    // 527
	};                                                                                                                    // 528
                                                                                                                       // 529
	var changePassword = function() {                                                                                     // 530
		loginButtonsSession.resetMessages();                                                                                 // 531
                                                                                                                       // 532
		// notably not trimmed. a password could (?) start or end with a space                                               // 533
		var oldPassword = elementValueById('login-old-password');                                                            // 534
                                                                                                                       // 535
		// notably not trimmed. a password could (?) start or end with a space                                               // 536
		var password = elementValueById('login-password');                                                                   // 537
		if (!Accounts._loginButtons.validatePassword(password))                                                              // 538
			return;                                                                                                             // 539
                                                                                                                       // 540
		if (!matchPasswordAgainIfPresent())                                                                                  // 541
			return;                                                                                                             // 542
                                                                                                                       // 543
		Accounts.changePassword(oldPassword, password, function(error) {                                                     // 544
			if (error) {                                                                                                        // 545
				loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                 // 546
			} else {                                                                                                            // 547
				loginButtonsSession.infoMessage("Password changed");                                                               // 548
                                                                                                                       // 549
				// wait 3 seconds, then expire the msg                                                                             // 550
				Meteor.setTimeout(function() {                                                                                     // 551
					loginButtonsSession.resetMessages();                                                                              // 552
				}, 3000);                                                                                                          // 553
			}                                                                                                                   // 554
		});                                                                                                                  // 555
	};                                                                                                                    // 556
                                                                                                                       // 557
	var matchPasswordAgainIfPresent = function() {                                                                        // 558
		// notably not trimmed. a password could (?) start or end with a space                                               // 559
		var passwordAgain = elementValueById('login-password-again');                                                        // 560
		if (passwordAgain !== null) {                                                                                        // 561
			// notably not trimmed. a password could (?) start or end with a space                                              // 562
			var password = elementValueById('login-password');                                                                  // 563
			if (password !== passwordAgain) {                                                                                   // 564
				loginButtonsSession.errorMessage("Passwords don't match");                                                         // 565
				return false;                                                                                                      // 566
			}                                                                                                                   // 567
		}                                                                                                                    // 568
		return true;                                                                                                         // 569
	};                                                                                                                    // 570
})();                                                                                                                  // 571
                                                                                                                       // 572
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rajit:accounts-ui-bootstrap-3/login_buttons_dialogs.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
	// for convenience                                                                                                    // 2
	var loginButtonsSession = Accounts._loginButtonsSession;                                                              // 3
                                                                                                                       // 4
                                                                                                                       // 5
	//                                                                                                                    // 6
	// populate the session so that the appropriate dialogs are                                                           // 7
	// displayed by reading variables set by accounts-urls, which parses                                                  // 8
	// special URLs. since accounts-ui depends on accounts-urls, we are                                                   // 9
	// guaranteed to have these set at this point.                                                                        // 10
	//                                                                                                                    // 11
                                                                                                                       // 12
	if (Accounts._resetPasswordToken) {                                                                                   // 13
		loginButtonsSession.set('resetPasswordToken', Accounts._resetPasswordToken);                                         // 14
	}                                                                                                                     // 15
                                                                                                                       // 16
	if (Accounts._enrollAccountToken) {                                                                                   // 17
		loginButtonsSession.set('enrollAccountToken', Accounts._enrollAccountToken);                                         // 18
	}                                                                                                                     // 19
                                                                                                                       // 20
	// Needs to be in Meteor.startup because of a package loading order                                                   // 21
	// issue. We can't be sure that accounts-password is loaded earlier                                                   // 22
	// than accounts-ui so Accounts.verifyEmail might not be defined.                                                     // 23
	Meteor.startup(function () {                                                                                          // 24
		if (Accounts._verifyEmailToken) {                                                                                    // 25
			Accounts.verifyEmail(Accounts._verifyEmailToken, function(error) {                                                  // 26
				Accounts._enableAutoLogin();                                                                                       // 27
				if (!error)                                                                                                        // 28
					loginButtonsSession.set('justVerifiedEmail', true);                                                               // 29
				// XXX show something if there was an error.                                                                       // 30
			});                                                                                                                 // 31
		}                                                                                                                    // 32
	});                                                                                                                   // 33
                                                                                                                       // 34
                                                                                                                       // 35
	//                                                                                                                    // 36
	// resetPasswordDialog template                                                                                       // 37
	//                                                                                                                    // 38
	Template._resetPasswordDialog.rendered = function() {                                                                 // 39
		var $modal = $(this.find('#login-buttons-reset-password-modal'));                                                    // 40
		$modal.modal();                                                                                                      // 41
	}                                                                                                                     // 42
                                                                                                                       // 43
	Template._resetPasswordDialog.events({                                                                                // 44
		'click #login-buttons-reset-password-button': function (event) {                                                     // 45
			event.stopPropagation();                                                                                            // 46
			resetPassword();                                                                                                    // 47
		},                                                                                                                   // 48
		'keypress #reset-password-new-password': function (event) {                                                          // 49
			if (event.keyCode === 13)                                                                                           // 50
				resetPassword();                                                                                                   // 51
		},                                                                                                                   // 52
		'click #login-buttons-cancel-reset-password': function (event) {                                                     // 53
			event.stopPropagation();                                                                                            // 54
			loginButtonsSession.set('resetPasswordToken', null);                                                                // 55
			Accounts._enableAutoLogin();                                                                                        // 56
			$('#login-buttons-reset-password-modal').modal("hide");                                                             // 57
		}                                                                                                                    // 58
	});                                                                                                                   // 59
                                                                                                                       // 60
	var resetPassword = function () {                                                                                     // 61
		loginButtonsSession.resetMessages();                                                                                 // 62
		var newPassword = document.getElementById('reset-password-new-password').value;                                      // 63
		if (!Accounts._loginButtons.validatePassword(newPassword))                                                           // 64
			return;                                                                                                             // 65
                                                                                                                       // 66
		Accounts.resetPassword(                                                                                              // 67
			loginButtonsSession.get('resetPasswordToken'), newPassword,                                                         // 68
			function (error) {                                                                                                  // 69
				if (error) {                                                                                                       // 70
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 71
				} else {                                                                                                           // 72
					loginButtonsSession.set('resetPasswordToken', null);                                                              // 73
					Accounts._enableAutoLogin();                                                                                      // 74
					$('#login-buttons-reset-password-modal').modal("hide");                                                           // 75
				}                                                                                                                  // 76
			});                                                                                                                 // 77
	};                                                                                                                    // 78
                                                                                                                       // 79
	Template._resetPasswordDialog.inResetPasswordFlow = function () {                                                     // 80
		return loginButtonsSession.get('resetPasswordToken');                                                                // 81
	};                                                                                                                    // 82
                                                                                                                       // 83
                                                                                                                       // 84
	//                                                                                                                    // 85
	// enrollAccountDialog template                                                                                       // 86
	//                                                                                                                    // 87
                                                                                                                       // 88
	Template._enrollAccountDialog.events({                                                                                // 89
		'click #login-buttons-enroll-account-button': function () {                                                          // 90
			enrollAccount();                                                                                                    // 91
		},                                                                                                                   // 92
		'keypress #enroll-account-password': function (event) {                                                              // 93
			if (event.keyCode === 13)                                                                                           // 94
				enrollAccount();                                                                                                   // 95
		},                                                                                                                   // 96
		'click #login-buttons-cancel-enroll-account-button': function () {                                                   // 97
			loginButtonsSession.set('enrollAccountToken', null);                                                                // 98
			Accounts._enableAutoLogin();                                                                                        // 99
			$modal.modal("hide");                                                                                               // 100
		}                                                                                                                    // 101
	});                                                                                                                   // 102
                                                                                                                       // 103
	Template._enrollAccountDialog.rendered = function() {                                                                 // 104
		$modal = $(this.find('#login-buttons-enroll-account-modal'));                                                        // 105
		$modal.modal();                                                                                                      // 106
	};                                                                                                                    // 107
                                                                                                                       // 108
	var enrollAccount = function () {                                                                                     // 109
		loginButtonsSession.resetMessages();                                                                                 // 110
		var password = document.getElementById('enroll-account-password').value;                                             // 111
		if (!Accounts._loginButtons.validatePassword(password))                                                              // 112
			return;                                                                                                             // 113
                                                                                                                       // 114
		Accounts.resetPassword(                                                                                              // 115
			loginButtonsSession.get('enrollAccountToken'), password,                                                            // 116
			function (error) {                                                                                                  // 117
				if (error) {                                                                                                       // 118
					loginButtonsSession.errorMessage(error.reason || "Unknown error");                                                // 119
				} else {                                                                                                           // 120
					loginButtonsSession.set('enrollAccountToken', null);                                                              // 121
					Accounts._enableAutoLogin();                                                                                      // 122
					$modal.modal("hide");                                                                                             // 123
				}                                                                                                                  // 124
			});                                                                                                                 // 125
	};                                                                                                                    // 126
                                                                                                                       // 127
	Template._enrollAccountDialog.inEnrollAccountFlow = function () {                                                     // 128
		return loginButtonsSession.get('enrollAccountToken');                                                                // 129
	};                                                                                                                    // 130
                                                                                                                       // 131
                                                                                                                       // 132
	//                                                                                                                    // 133
	// justVerifiedEmailDialog template                                                                                   // 134
	//                                                                                                                    // 135
                                                                                                                       // 136
	Template._justVerifiedEmailDialog.events({                                                                            // 137
		'click #just-verified-dismiss-button': function () {                                                                 // 138
			loginButtonsSession.set('justVerifiedEmail', false);                                                                // 139
		}                                                                                                                    // 140
	});                                                                                                                   // 141
                                                                                                                       // 142
	Template._justVerifiedEmailDialog.visible = function () {                                                             // 143
		return loginButtonsSession.get('justVerifiedEmail');                                                                 // 144
	};                                                                                                                    // 145
                                                                                                                       // 146
                                                                                                                       // 147
	//                                                                                                                    // 148
	// loginButtonsMessagesDialog template                                                                                // 149
	//                                                                                                                    // 150
                                                                                                                       // 151
	// Template._loginButtonsMessagesDialog.rendered = function() {                                                       // 152
	//   var $modal = $(this.find('#configure-login-service-dialog-modal'));                                              // 153
	//   $modal.modal();                                                                                                  // 154
	// }                                                                                                                  // 155
                                                                                                                       // 156
	Template._loginButtonsMessagesDialog.events({                                                                         // 157
		'click #messages-dialog-dismiss-button': function () {                                                               // 158
			loginButtonsSession.resetMessages();                                                                                // 159
		}                                                                                                                    // 160
	});                                                                                                                   // 161
                                                                                                                       // 162
	Template._loginButtonsMessagesDialog.visible = function () {                                                          // 163
		var hasMessage = loginButtonsSession.get('infoMessage') || loginButtonsSession.get('errorMessage');                  // 164
		return !Accounts._loginButtons.dropdown() && hasMessage;                                                             // 165
	};                                                                                                                    // 166
                                                                                                                       // 167
                                                                                                                       // 168
	//                                                                                                                    // 169
	// configureLoginServiceDialog template                                                                               // 170
	//                                                                                                                    // 171
                                                                                                                       // 172
	Template._configureLoginServiceDialog.events({                                                                        // 173
		'click .configure-login-service-dismiss-button': function () {                                                       // 174
			event.stopPropagation();                                                                                            // 175
			loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                               // 176
			$('#configure-login-service-dialog-modal').modal('hide');                                                           // 177
		},                                                                                                                   // 178
		'click #configure-login-service-dialog-save-configuration': function () {                                            // 179
			if (loginButtonsSession.get('configureLoginServiceDialogVisible') &&                                                // 180
					! loginButtonsSession.get('configureLoginServiceDialogSaveDisabled')) {                                           // 181
				// Prepare the configuration document for this login service                                                       // 182
				var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                               // 183
				var configuration = {                                                                                              // 184
					service: serviceName                                                                                              // 185
				};                                                                                                                 // 186
				_.each(configurationFields(), function(field) {                                                                    // 187
					configuration[field.property] = document.getElementById(                                                          // 188
						'configure-login-service-dialog-' + field.property).value                                                        // 189
						.replace(/^\s*|\s*$/g, ""); // trim;                                                                             // 190
				});                                                                                                                // 191
                                                                                                                       // 192
				// Configure this login service                                                                                    // 193
				Meteor.call("configureLoginService", configuration, function (error, result) {                                     // 194
					if (error)                                                                                                        // 195
						Meteor._debug("Error configuring login service " + serviceName, error);                                          // 196
					else                                                                                                              // 197
						loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                            // 198
						$('#configure-login-service-dialog-modal').modal('hide');                                                        // 199
				});                                                                                                                // 200
			}                                                                                                                   // 201
		},                                                                                                                   // 202
		// IE8 doesn't support the 'input' event, so we'll run this on the keyup as                                          // 203
		// well. (Keeping the 'input' event means that this also fires when you use                                          // 204
		// the mouse to change the contents of the field, eg 'Cut' menu item.)                                               // 205
		'input, keyup input': function (event) {                                                                             // 206
			// if the event fired on one of the configuration input fields,                                                     // 207
			// check whether we should enable the 'save configuration' button                                                   // 208
			if (event.target.id.indexOf('configure-login-service-dialog') === 0)                                                // 209
				updateSaveDisabled();                                                                                              // 210
		}                                                                                                                    // 211
	});                                                                                                                   // 212
                                                                                                                       // 213
	// check whether the 'save configuration' button should be enabled.                                                   // 214
	// this is a really strange way to implement this and a Forms                                                         // 215
	// Abstraction would make all of this reactive, and simpler.                                                          // 216
	var updateSaveDisabled = function () {                                                                                // 217
		var anyFieldEmpty = _.any(configurationFields(), function(field) {                                                   // 218
			return document.getElementById(                                                                                     // 219
				'configure-login-service-dialog-' + field.property).value === '';                                                  // 220
		});                                                                                                                  // 221
                                                                                                                       // 222
		loginButtonsSession.set('configureLoginServiceDialogSaveDisabled', anyFieldEmpty);                                   // 223
	};                                                                                                                    // 224
                                                                                                                       // 225
	// Returns the appropriate template for this login service.  This                                                     // 226
	// template should be defined in the service's package                                                                // 227
	var configureLoginServiceDialogTemplateForService = function () {                                                     // 228
		var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                                 // 229
		return Template['configureLoginServiceDialogFor' + capitalize(serviceName)];                                         // 230
	};                                                                                                                    // 231
                                                                                                                       // 232
	var configurationFields = function () {                                                                               // 233
		var template = configureLoginServiceDialogTemplateForService();                                                      // 234
		return template.fields();                                                                                            // 235
	};                                                                                                                    // 236
                                                                                                                       // 237
	Template._configureLoginServiceDialog.configurationFields = function () {                                             // 238
		return configurationFields();                                                                                        // 239
	};                                                                                                                    // 240
                                                                                                                       // 241
	Template._configureLoginServiceDialog.visible = function () {                                                         // 242
		return loginButtonsSession.get('configureLoginServiceDialogVisible');                                                // 243
	};                                                                                                                    // 244
                                                                                                                       // 245
	Template._configureLoginServiceDialog.configurationSteps = function () {                                              // 246
		// renders the appropriate template                                                                                  // 247
		return configureLoginServiceDialogTemplateForService();                                                              // 248
	};                                                                                                                    // 249
                                                                                                                       // 250
	Template._configureLoginServiceDialog.saveDisabled = function () {                                                    // 251
		return loginButtonsSession.get('configureLoginServiceDialogSaveDisabled');                                           // 252
	};                                                                                                                    // 253
                                                                                                                       // 254
                                                                                                                       // 255
	// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                        // 256
	var capitalize = function(str){                                                                                       // 257
		str = str == null ? '' : String(str);                                                                                // 258
		return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 259
	};                                                                                                                    // 260
                                                                                                                       // 261
}) ();                                                                                                                 // 262
                                                                                                                       // 263
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rajit:accounts-ui-bootstrap-3'] = {};

})();
