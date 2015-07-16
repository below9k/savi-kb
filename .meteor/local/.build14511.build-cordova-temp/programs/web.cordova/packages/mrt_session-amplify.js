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
var _ = Package.underscore._;
var Session = Package.session.Session;

/* Package-scope variables */
var SessionAmplify;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/mrt:session-amplify/session_extension.js                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
/* ---------------------------------------------------- +/                                                // 1
                                                                                                          // 2
## SessionAmplify ##                                                                                      // 3
                                                                                                          // 4
A Meteor Session object extension that stores the value in Amplify's local storage when set() is called.  // 5
It automatically inherit all the reactive properties of Meteor Session.                                   // 6
                                                                                                          // 7
/+ ---------------------------------------------------- */                                                // 8
                                                                                                          // 9
SessionAmplify = _.extend({}, Session, {                                                                  // 10
  keys: _.object(_.map(amplify.store(), function(value, key) {                                            // 11
    return [key, JSON.stringify(value)]                                                                   // 12
  })),                                                                                                    // 13
  set: function (key, value) {                                                                            // 14
    Session.set.apply(this, arguments);                                                                   // 15
    amplify.store(key, value);                                                                            // 16
  },                                                                                                      // 17
});                                                                                                       // 18
                                                                                                          // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:session-amplify'] = {
  SessionAmplify: SessionAmplify
};

})();
