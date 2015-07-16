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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Random = Package.random.Random;
var DDP = Package.ddp.DDP;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var Accounts, EXPIRE_TOKENS_INTERVAL_MS, CONNECTION_CLOSE_DELAY_MS, getTokenLifetimeMs, autoLoginEnabled, makeClientLoggedOut, makeClientLoggedIn, storeLoginToken, unstoreLoginToken, storedLoginToken, storedLoginTokenExpires;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/accounts-base/accounts_common.js                                                        //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
/**                                                                                                 // 1
 * @namespace Accounts                                                                              // 2
 * @summary The namespace for all accounts-related methods.                                         // 3
 */                                                                                                 // 4
Accounts = {};                                                                                      // 5
                                                                                                    // 6
// Currently this is read directly by packages like accounts-password                               // 7
// and accounts-ui-unstyled.                                                                        // 8
Accounts._options = {};                                                                             // 9
                                                                                                    // 10
// how long (in days) until a login token expires                                                   // 11
var DEFAULT_LOGIN_EXPIRATION_DAYS = 90;                                                             // 12
// Clients don't try to auto-login with a token that is going to expire within                      // 13
// .1 * DEFAULT_LOGIN_EXPIRATION_DAYS, capped at MIN_TOKEN_LIFETIME_CAP_SECS.                       // 14
// Tries to avoid abrupt disconnects from expiring tokens.                                          // 15
var MIN_TOKEN_LIFETIME_CAP_SECS = 3600; // one hour                                                 // 16
// how often (in milliseconds) we check for expired tokens                                          // 17
EXPIRE_TOKENS_INTERVAL_MS = 600 * 1000; // 10 minutes                                               // 18
// how long we wait before logging out clients when Meteor.logoutOtherClients is                    // 19
// called                                                                                           // 20
CONNECTION_CLOSE_DELAY_MS = 10 * 1000;                                                              // 21
                                                                                                    // 22
// Set up config for the accounts system. Call this on both the client                              // 23
// and the server.                                                                                  // 24
//                                                                                                  // 25
// XXX we should add some enforcement that this is called on both the                               // 26
// client and the server. Otherwise, a user can                                                     // 27
// 'forbidClientAccountCreation' only on the client and while it looks                              // 28
// like their app is secure, the server will still accept createUser                                // 29
// calls. https://github.com/meteor/meteor/issues/828                                               // 30
//                                                                                                  // 31
// @param options {Object} an object with fields:                                                   // 32
// - sendVerificationEmail {Boolean}                                                                // 33
//     Send email address verification emails to new users created from                             // 34
//     client signups.                                                                              // 35
// - forbidClientAccountCreation {Boolean}                                                          // 36
//     Do not allow clients to create accounts directly.                                            // 37
// - restrictCreationByEmailDomain {Function or String}                                             // 38
//     Require created users to have an email matching the function or                              // 39
//     having the string as domain.                                                                 // 40
// - loginExpirationInDays {Number}                                                                 // 41
//     Number of days since login until a user is logged out (login token                           // 42
//     expires).                                                                                    // 43
                                                                                                    // 44
/**                                                                                                 // 45
 * @summary Set global accounts options.                                                            // 46
 * @locus Anywhere                                                                                  // 47
 * @param {Object} options                                                                          // 48
 * @param {Boolean} options.sendVerificationEmail New users with an email address will receive an address verification email.
 * @param {Boolean} options.forbidClientAccountCreation Calls to [`createUser`](#accounts_createuser) from the client will be rejected. In addition, if you are using [accounts-ui](#accountsui), the "Create account" link will not be available.
 * @param {String | Function} options.restrictCreationByEmailDomain If set to a string, only allows new users if the domain part of their email address matches the string. If set to a function, only allows new users if the function returns true.  The function is passed the full email address of the proposed new user.  Works with password-based sign-in and external services that expose email addresses (Google, Facebook, GitHub). All existing users still can log in after enabling this option. Example: `Accounts.config({ restrictCreationByEmailDomain: 'school.edu' })`.
 * @param {Number} options.loginExpirationInDays The number of days from when a user logs in until their token expires and they are logged out. Defaults to 90. Set to `null` to disable login expiration.
 * @param {String} options.oauthSecretKey When using the `oauth-encryption` package, the 16 byte key using to encrypt sensitive account credentials in the database, encoded in base64.  This option may only be specifed on the server.  See packages/oauth-encryption/README.md for details.
 */                                                                                                 // 54
Accounts.config = function(options) {                                                               // 55
  // We don't want users to accidentally only call Accounts.config on the                           // 56
  // client, where some of the options will have partial effects (eg removing                       // 57
  // the "create account" button from accounts-ui if forbidClientAccountCreation                    // 58
  // is set, or redirecting Google login to a specific-domain page) without                         // 59
  // having their full effects.                                                                     // 60
  if (Meteor.isServer) {                                                                            // 61
    __meteor_runtime_config__.accountsConfigCalled = true;                                          // 62
  } else if (!__meteor_runtime_config__.accountsConfigCalled) {                                     // 63
    // XXX would be nice to "crash" the client and replace the UI with an error                     // 64
    // message, but there's no trivial way to do this.                                              // 65
    Meteor._debug("Accounts.config was called on the client but not on the " +                      // 66
                  "server; some configuration options may not take effect.");                       // 67
  }                                                                                                 // 68
                                                                                                    // 69
  // We need to validate the oauthSecretKey option at the time                                      // 70
  // Accounts.config is called. We also deliberately don't store the                                // 71
  // oauthSecretKey in Accounts._options.                                                           // 72
  if (_.has(options, "oauthSecretKey")) {                                                           // 73
    if (Meteor.isClient)                                                                            // 74
      throw new Error("The oauthSecretKey option may only be specified on the server");             // 75
    if (! Package["oauth-encryption"])                                                              // 76
      throw new Error("The oauth-encryption package must be loaded to set oauthSecretKey");         // 77
    Package["oauth-encryption"].OAuthEncryption.loadKey(options.oauthSecretKey);                    // 78
    options = _.omit(options, "oauthSecretKey");                                                    // 79
  }                                                                                                 // 80
                                                                                                    // 81
  // validate option keys                                                                           // 82
  var VALID_KEYS = ["sendVerificationEmail", "forbidClientAccountCreation",                         // 83
                    "restrictCreationByEmailDomain", "loginExpirationInDays"];                      // 84
  _.each(_.keys(options), function (key) {                                                          // 85
    if (!_.contains(VALID_KEYS, key)) {                                                             // 86
      throw new Error("Accounts.config: Invalid key: " + key);                                      // 87
    }                                                                                               // 88
  });                                                                                               // 89
                                                                                                    // 90
  // set values in Accounts._options                                                                // 91
  _.each(VALID_KEYS, function (key) {                                                               // 92
    if (key in options) {                                                                           // 93
      if (key in Accounts._options) {                                                               // 94
        throw new Error("Can't set `" + key + "` more than once");                                  // 95
      } else {                                                                                      // 96
        Accounts._options[key] = options[key];                                                      // 97
      }                                                                                             // 98
    }                                                                                               // 99
  });                                                                                               // 100
                                                                                                    // 101
  // If the user set loginExpirationInDays to null, then we need to clear the                       // 102
  // timer that periodically expires tokens.                                                        // 103
  if (Meteor.isServer)                                                                              // 104
    maybeStopExpireTokensInterval();                                                                // 105
};                                                                                                  // 106
                                                                                                    // 107
if (Meteor.isClient) {                                                                              // 108
  // The connection used by the Accounts system. This is the connection                             // 109
  // that will get logged in by Meteor.login(), and this is the                                     // 110
  // connection whose login state will be reflected by Meteor.userId().                             // 111
  //                                                                                                // 112
  // It would be much preferable for this to be in accounts_client.js,                              // 113
  // but it has to be here because it's needed to create the                                        // 114
  // Meteor.users collection.                                                                       // 115
  Accounts.connection = Meteor.connection;                                                          // 116
                                                                                                    // 117
  if (typeof __meteor_runtime_config__ !== "undefined" &&                                           // 118
      __meteor_runtime_config__.ACCOUNTS_CONNECTION_URL) {                                          // 119
    // Temporary, internal hook to allow the server to point the client                             // 120
    // to a different authentication server. This is for a very                                     // 121
    // particular use case that comes up when implementing a oauth                                  // 122
    // server. Unsupported and may go away at any point in time.                                    // 123
    //                                                                                              // 124
    // We will eventually provide a general way to use account-base                                 // 125
    // against any DDP connection, not just one special one.                                        // 126
    Accounts.connection = DDP.connect(                                                              // 127
      __meteor_runtime_config__.ACCOUNTS_CONNECTION_URL)                                            // 128
  }                                                                                                 // 129
}                                                                                                   // 130
                                                                                                    // 131
// Users table. Don't use the normal autopublish, since we want to hide                             // 132
// some fields. Code to autopublish this is in accounts_server.js.                                  // 133
// XXX Allow users to configure this collection name.                                               // 134
                                                                                                    // 135
/**                                                                                                 // 136
 * @summary A [Mongo.Collection](#collections) containing user documents.                           // 137
 * @locus Anywhere                                                                                  // 138
 */                                                                                                 // 139
Meteor.users = new Mongo.Collection("users", {                                                      // 140
  _preventAutopublish: true,                                                                        // 141
  connection: Meteor.isClient ? Accounts.connection : Meteor.connection                             // 142
});                                                                                                 // 143
// There is an allow call in accounts_server that restricts this                                    // 144
// collection.                                                                                      // 145
                                                                                                    // 146
// loginServiceConfiguration and ConfigError are maintained for backwards compatibility             // 147
Meteor.startup(function () {                                                                        // 148
  var ServiceConfiguration =                                                                        // 149
    Package['service-configuration'].ServiceConfiguration;                                          // 150
  Accounts.loginServiceConfiguration = ServiceConfiguration.configurations;                         // 151
  Accounts.ConfigError = ServiceConfiguration.ConfigError;                                          // 152
});                                                                                                 // 153
                                                                                                    // 154
// Thrown when the user cancels the login process (eg, closes an oauth                              // 155
// popup, declines retina scan, etc)                                                                // 156
Accounts.LoginCancelledError = function(description) {                                              // 157
  this.message = description;                                                                       // 158
};                                                                                                  // 159
                                                                                                    // 160
// This is used to transmit specific subclass errors over the wire. We should                       // 161
// come up with a more generic way to do this (eg, with some sort of symbolic                       // 162
// error code rather than a number).                                                                // 163
Accounts.LoginCancelledError.numericError = 0x8acdc2f;                                              // 164
Accounts.LoginCancelledError.prototype = new Error();                                               // 165
Accounts.LoginCancelledError.prototype.name = 'Accounts.LoginCancelledError';                       // 166
                                                                                                    // 167
getTokenLifetimeMs = function () {                                                                  // 168
  return (Accounts._options.loginExpirationInDays ||                                                // 169
          DEFAULT_LOGIN_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000;                                     // 170
};                                                                                                  // 171
                                                                                                    // 172
Accounts._tokenExpiration = function (when) {                                                       // 173
  // We pass when through the Date constructor for backwards compatibility;                         // 174
  // `when` used to be a number.                                                                    // 175
  return new Date((new Date(when)).getTime() + getTokenLifetimeMs());                               // 176
};                                                                                                  // 177
                                                                                                    // 178
Accounts._tokenExpiresSoon = function (when) {                                                      // 179
  var minLifetimeMs = .1 * getTokenLifetimeMs();                                                    // 180
  var minLifetimeCapMs = MIN_TOKEN_LIFETIME_CAP_SECS * 1000;                                        // 181
  if (minLifetimeMs > minLifetimeCapMs)                                                             // 182
    minLifetimeMs = minLifetimeCapMs;                                                               // 183
  return new Date() > (new Date(when) - minLifetimeMs);                                             // 184
};                                                                                                  // 185
                                                                                                    // 186
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/accounts-base/url_client.js                                                             //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
autoLoginEnabled = true;                                                                            // 1
                                                                                                    // 2
// reads a reset password token from the url's hash fragment, if it's                               // 3
// there. if so prevent automatically logging in since it could be                                  // 4
// confusing to be logged in as user A while resetting password for                                 // 5
// user B                                                                                           // 6
//                                                                                                  // 7
// reset password urls use hash fragments instead of url paths/query                                // 8
// strings so that the reset password token is not sent over the wire                               // 9
// on the http request                                                                              // 10
var match;                                                                                          // 11
match = window.location.hash.match(/^\#\/reset-password\/(.*)$/);                                   // 12
if (match) {                                                                                        // 13
  autoLoginEnabled = false;                                                                         // 14
  Accounts._resetPasswordToken = match[1];                                                          // 15
  window.location.hash = '';                                                                        // 16
}                                                                                                   // 17
                                                                                                    // 18
// reads a verify email token from the url's hash fragment, if                                      // 19
// it's there.  also don't automatically log the user is, as for                                    // 20
// reset password links.                                                                            // 21
//                                                                                                  // 22
// XXX we don't need to use hash fragments in this case, and having                                 // 23
// the token appear in the url's path would allow us to use a custom                                // 24
// middleware instead of verifying the email on pageload, which                                     // 25
// would be faster but less DDP-ish (and more specifically, any                                     // 26
// non-web DDP app, such as an iOS client, would do something more                                  // 27
// in line with the hash fragment approach)                                                         // 28
match = window.location.hash.match(/^\#\/verify-email\/(.*)$/);                                     // 29
if (match) {                                                                                        // 30
  autoLoginEnabled = false;                                                                         // 31
  Accounts._verifyEmailToken = match[1];                                                            // 32
  window.location.hash = '';                                                                        // 33
}                                                                                                   // 34
                                                                                                    // 35
// reads an account enrollment token from the url's hash fragment, if                               // 36
// it's there.  also don't automatically log the user is, as for                                    // 37
// reset password links.                                                                            // 38
match = window.location.hash.match(/^\#\/enroll-account\/(.*)$/);                                   // 39
if (match) {                                                                                        // 40
  autoLoginEnabled = false;                                                                         // 41
  Accounts._enrollAccountToken = match[1];                                                          // 42
  window.location.hash = '';                                                                        // 43
}                                                                                                   // 44
                                                                                                    // 45
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/accounts-base/accounts_client.js                                                        //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
///                                                                                                 // 1
/// CURRENT USER                                                                                    // 2
///                                                                                                 // 3
                                                                                                    // 4
// This is reactive.                                                                                // 5
                                                                                                    // 6
/**                                                                                                 // 7
 * @summary Get the current user id, or `null` if no user is logged in. A reactive data source.     // 8
 * @locus Anywhere but publish functions                                                            // 9
 */                                                                                                 // 10
Meteor.userId = function () {                                                                       // 11
  return Accounts.connection.userId();                                                              // 12
};                                                                                                  // 13
                                                                                                    // 14
var loggingIn = false;                                                                              // 15
var loggingInDeps = new Tracker.Dependency;                                                         // 16
// This is mostly just called within this file, but Meteor.loginWithPassword                        // 17
// also uses it to make loggingIn() be true during the beginPasswordExchange                        // 18
// method call too.                                                                                 // 19
Accounts._setLoggingIn = function (x) {                                                             // 20
  if (loggingIn !== x) {                                                                            // 21
    loggingIn = x;                                                                                  // 22
    loggingInDeps.changed();                                                                        // 23
  }                                                                                                 // 24
};                                                                                                  // 25
                                                                                                    // 26
/**                                                                                                 // 27
 * @summary True if a login method (such as `Meteor.loginWithPassword`, `Meteor.loginWithFacebook`, or `Accounts.createUser`) is currently in progress. A reactive data source.
 * @locus Client                                                                                    // 29
 */                                                                                                 // 30
Meteor.loggingIn = function () {                                                                    // 31
  loggingInDeps.depend();                                                                           // 32
  return loggingIn;                                                                                 // 33
};                                                                                                  // 34
                                                                                                    // 35
// This calls userId, which is reactive.                                                            // 36
                                                                                                    // 37
/**                                                                                                 // 38
 * @summary Get the current user record, or `null` if no user is logged in. A reactive data source. // 39
 * @locus Anywhere but publish functions                                                            // 40
 */                                                                                                 // 41
Meteor.user = function () {                                                                         // 42
  var userId = Meteor.userId();                                                                     // 43
  if (!userId)                                                                                      // 44
    return null;                                                                                    // 45
  return Meteor.users.findOne(userId);                                                              // 46
};                                                                                                  // 47
                                                                                                    // 48
///                                                                                                 // 49
/// LOGIN METHODS                                                                                   // 50
///                                                                                                 // 51
                                                                                                    // 52
// Call a login method on the server.                                                               // 53
//                                                                                                  // 54
// A login method is a method which on success calls `this.setUserId(id)` and                       // 55
// `Accounts._setLoginToken` on the server and returns an object with fields                        // 56
// 'id' (containing the user id), 'token' (containing a resume token), and                          // 57
// optionally `tokenExpires`.                                                                       // 58
//                                                                                                  // 59
// This function takes care of:                                                                     // 60
//   - Updating the Meteor.loggingIn() reactive data source                                         // 61
//   - Calling the method in 'wait' mode                                                            // 62
//   - On success, saving the resume token to localStorage                                          // 63
//   - On success, calling Accounts.connection.setUserId()                                          // 64
//   - Setting up an onReconnect handler which logs in with                                         // 65
//     the resume token                                                                             // 66
//                                                                                                  // 67
// Options:                                                                                         // 68
// - methodName: The method to call (default 'login')                                               // 69
// - methodArguments: The arguments for the method                                                  // 70
// - validateResult: If provided, will be called with the result of the                             // 71
//                 method. If it throws, the client will not be logged in (and                      // 72
//                 its error will be passed to the callback).                                       // 73
// - userCallback: Will be called with no arguments once the user is fully                          // 74
//                 logged in, or with the error on error.                                           // 75
//                                                                                                  // 76
Accounts.callLoginMethod = function (options) {                                                     // 77
  options = _.extend({                                                                              // 78
    methodName: 'login',                                                                            // 79
    methodArguments: [],                                                                            // 80
    _suppressLoggingIn: false                                                                       // 81
  }, options);                                                                                      // 82
  // Set defaults for callback arguments to no-op functions; make sure we                           // 83
  // override falsey values too.                                                                    // 84
  _.each(['validateResult', 'userCallback'], function (f) {                                         // 85
    if (!options[f])                                                                                // 86
      options[f] = function () {};                                                                  // 87
  });                                                                                               // 88
  // make sure we only call the user's callback once.                                               // 89
  var onceUserCallback = _.once(options.userCallback);                                              // 90
                                                                                                    // 91
  var reconnected = false;                                                                          // 92
                                                                                                    // 93
  // We want to set up onReconnect as soon as we get a result token back from                       // 94
  // the server, without having to wait for subscriptions to rerun. This is                         // 95
  // because if we disconnect and reconnect between getting the result and                          // 96
  // getting the results of subscription rerun, we WILL NOT re-send this                            // 97
  // method (because we never re-send methods whose results we've received)                         // 98
  // but we WILL call loggedInAndDataReadyCallback at "reconnect quiesce"                           // 99
  // time. This will lead to makeClientLoggedIn(result.id) even though we                           // 100
  // haven't actually sent a login method!                                                          // 101
  //                                                                                                // 102
  // But by making sure that we send this "resume" login in that case (and                          // 103
  // calling makeClientLoggedOut if it fails), we'll end up with an accurate                        // 104
  // client-side userId. (It's important that livedata_connection guarantees                        // 105
  // that the "reconnect quiesce"-time call to loggedInAndDataReadyCallback                         // 106
  // will occur before the callback from the resume login call.)                                    // 107
  var onResultReceived = function (err, result) {                                                   // 108
    if (err || !result || !result.token) {                                                          // 109
      Accounts.connection.onReconnect = null;                                                       // 110
    } else {                                                                                        // 111
      Accounts.connection.onReconnect = function () {                                               // 112
        reconnected = true;                                                                         // 113
        // If our token was updated in storage, use the latest one.                                 // 114
        var storedToken = storedLoginToken();                                                       // 115
        if (storedToken) {                                                                          // 116
          result = {                                                                                // 117
            token: storedToken,                                                                     // 118
            tokenExpires: storedLoginTokenExpires()                                                 // 119
          };                                                                                        // 120
        }                                                                                           // 121
        if (! result.tokenExpires)                                                                  // 122
          result.tokenExpires = Accounts._tokenExpiration(new Date());                              // 123
        if (Accounts._tokenExpiresSoon(result.tokenExpires)) {                                      // 124
          makeClientLoggedOut();                                                                    // 125
        } else {                                                                                    // 126
          Accounts.callLoginMethod({                                                                // 127
            methodArguments: [{resume: result.token}],                                              // 128
            // Reconnect quiescence ensures that the user doesn't see an                            // 129
            // intermediate state before the login method finishes. So we don't                     // 130
            // need to show a logging-in animation.                                                 // 131
            _suppressLoggingIn: true,                                                               // 132
            userCallback: function (error) {                                                        // 133
              var storedTokenNow = storedLoginToken();                                              // 134
              if (error) {                                                                          // 135
                // If we had a login error AND the current stored token is the                      // 136
                // one that we tried to log in with, then declare ourselves                         // 137
                // logged out. If there's a token in storage but it's not the                       // 138
                // token that we tried to log in with, we don't know anything                       // 139
                // about whether that token is valid or not, so do nothing. The                     // 140
                // periodic localStorage poll will decide if we are logged in or                    // 141
                // out with this token, if it hasn't already. Of course, even                       // 142
                // with this check, another tab could insert a new valid token                      // 143
                // immediately before we clear localStorage here, which would                       // 144
                // lead to both tabs being logged out, but by checking the token                    // 145
                // in storage right now we hope to make that unlikely to happen.                    // 146
                //                                                                                  // 147
                // If there is no token in storage right now, we don't have to                      // 148
                // do anything; whatever code removed the token from storage was                    // 149
                // responsible for calling `makeClientLoggedOut()`, or the                          // 150
                // periodic localStorage poll will call `makeClientLoggedOut`                       // 151
                // eventually if another tab wiped the token from storage.                          // 152
                if (storedTokenNow && storedTokenNow === result.token) {                            // 153
                  makeClientLoggedOut();                                                            // 154
                }                                                                                   // 155
              }                                                                                     // 156
              // Possibly a weird callback to call, but better than nothing if                      // 157
              // there is a reconnect between "login result received" and "data                     // 158
              // ready".                                                                            // 159
              onceUserCallback(error);                                                              // 160
            }});                                                                                    // 161
        }                                                                                           // 162
      };                                                                                            // 163
    }                                                                                               // 164
  };                                                                                                // 165
                                                                                                    // 166
  // This callback is called once the local cache of the current-user                               // 167
  // subscription (and all subscriptions, in fact) are guaranteed to be up to                       // 168
  // date.                                                                                          // 169
  var loggedInAndDataReadyCallback = function (error, result) {                                     // 170
    // If the login method returns its result but the connection is lost                            // 171
    // before the data is in the local cache, it'll set an onReconnect (see                         // 172
    // above). The onReconnect will try to log in using the token, and *it*                         // 173
    // will call userCallback via its own version of this                                           // 174
    // loggedInAndDataReadyCallback. So we don't have to do anything here.                          // 175
    if (reconnected)                                                                                // 176
      return;                                                                                       // 177
                                                                                                    // 178
    // Note that we need to call this even if _suppressLoggingIn is true,                           // 179
    // because it could be matching a _setLoggingIn(true) from a                                    // 180
    // half-completed pre-reconnect login method.                                                   // 181
    Accounts._setLoggingIn(false);                                                                  // 182
    if (error || !result) {                                                                         // 183
      error = error || new Error(                                                                   // 184
        "No result from call to " + options.methodName);                                            // 185
      onceUserCallback(error);                                                                      // 186
      return;                                                                                       // 187
    }                                                                                               // 188
    try {                                                                                           // 189
      options.validateResult(result);                                                               // 190
    } catch (e) {                                                                                   // 191
      onceUserCallback(e);                                                                          // 192
      return;                                                                                       // 193
    }                                                                                               // 194
                                                                                                    // 195
    // Make the client logged in. (The user data should already be loaded!)                         // 196
    makeClientLoggedIn(result.id, result.token, result.tokenExpires);                               // 197
    onceUserCallback();                                                                             // 198
  };                                                                                                // 199
                                                                                                    // 200
  if (!options._suppressLoggingIn)                                                                  // 201
    Accounts._setLoggingIn(true);                                                                   // 202
  Accounts.connection.apply(                                                                        // 203
    options.methodName,                                                                             // 204
    options.methodArguments,                                                                        // 205
    {wait: true, onResultReceived: onResultReceived},                                               // 206
    loggedInAndDataReadyCallback);                                                                  // 207
};                                                                                                  // 208
                                                                                                    // 209
makeClientLoggedOut = function() {                                                                  // 210
  unstoreLoginToken();                                                                              // 211
  Accounts.connection.setUserId(null);                                                              // 212
  Accounts.connection.onReconnect = null;                                                           // 213
};                                                                                                  // 214
                                                                                                    // 215
makeClientLoggedIn = function(userId, token, tokenExpires) {                                        // 216
  storeLoginToken(userId, token, tokenExpires);                                                     // 217
  Accounts.connection.setUserId(userId);                                                            // 218
};                                                                                                  // 219
                                                                                                    // 220
/**                                                                                                 // 221
 * @summary Log the user out.                                                                       // 222
 * @locus Client                                                                                    // 223
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 */                                                                                                 // 225
Meteor.logout = function (callback) {                                                               // 226
  Accounts.connection.apply('logout', [], {wait: true}, function(error, result) {                   // 227
    if (error) {                                                                                    // 228
      callback && callback(error);                                                                  // 229
    } else {                                                                                        // 230
      makeClientLoggedOut();                                                                        // 231
      callback && callback();                                                                       // 232
    }                                                                                               // 233
  });                                                                                               // 234
};                                                                                                  // 235
                                                                                                    // 236
/**                                                                                                 // 237
 * @summary Log out other clients logged in as the current user, but does not log out the client that calls this function.
 * @locus Client                                                                                    // 239
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 */                                                                                                 // 241
Meteor.logoutOtherClients = function (callback) {                                                   // 242
  // We need to make two method calls: one to replace our current token,                            // 243
  // and another to remove all tokens except the current one. We want to                            // 244
  // call these two methods one after the other, without any other                                  // 245
  // methods running between them. For example, we don't want `logout`                              // 246
  // to be called in between our two method calls (otherwise the second                             // 247
  // method call would return an error). Another example: we don't want                             // 248
  // logout to be called before the callback for `getNewToken`;                                     // 249
  // otherwise we would momentarily log the user out and then write a                               // 250
  // new token to localStorage.                                                                     // 251
  //                                                                                                // 252
  // To accomplish this, we make both calls as wait methods, and queue                              // 253
  // them one after the other, without spinning off the event loop in                               // 254
  // between. Even though we queue `removeOtherTokens` before                                       // 255
  // `getNewToken`, we won't actually send the `removeOtherTokens` call                             // 256
  // until the `getNewToken` callback has finished running, because they                            // 257
  // are both wait methods.                                                                         // 258
  Accounts.connection.apply(                                                                        // 259
    'getNewToken',                                                                                  // 260
    [],                                                                                             // 261
    { wait: true },                                                                                 // 262
    function (err, result) {                                                                        // 263
      if (! err) {                                                                                  // 264
        storeLoginToken(Meteor.userId(), result.token, result.tokenExpires);                        // 265
      }                                                                                             // 266
    }                                                                                               // 267
  );                                                                                                // 268
  Accounts.connection.apply(                                                                        // 269
    'removeOtherTokens',                                                                            // 270
    [],                                                                                             // 271
    { wait: true },                                                                                 // 272
    function (err) {                                                                                // 273
      callback && callback(err);                                                                    // 274
    }                                                                                               // 275
  );                                                                                                // 276
};                                                                                                  // 277
                                                                                                    // 278
                                                                                                    // 279
///                                                                                                 // 280
/// LOGIN SERVICES                                                                                  // 281
///                                                                                                 // 282
                                                                                                    // 283
var loginServicesHandle =                                                                           // 284
  Accounts.connection.subscribe("meteor.loginServiceConfiguration");                                // 285
                                                                                                    // 286
// A reactive function returning whether the loginServiceConfiguration                              // 287
// subscription is ready. Used by accounts-ui to hide the login button                              // 288
// until we have all the configuration loaded                                                       // 289
//                                                                                                  // 290
Accounts.loginServicesConfigured = function () {                                                    // 291
  return loginServicesHandle.ready();                                                               // 292
};                                                                                                  // 293
                                                                                                    // 294
// Some login services such as the redirect login flow or the resume                                // 295
// login handler can log the user in at page load time.  The                                        // 296
// Meteor.loginWithX functions have a callback argument, but the                                    // 297
// callback function instance won't be in memory any longer if the                                  // 298
// page was reloaded.  The `onPageLoadLogin` function allows a                                      // 299
// callback to be registered for the case where the login was                                       // 300
// initiated in a previous VM, and we now have the result of the login                              // 301
// attempt in a new VM.                                                                             // 302
                                                                                                    // 303
var pageLoadLoginCallbacks = [];                                                                    // 304
var pageLoadLoginAttemptInfo = null;                                                                // 305
                                                                                                    // 306
// Register a callback to be called if we have information about a                                  // 307
// login attempt at page load time.  Call the callback immediately if                               // 308
// we already have the page load login attempt info, otherwise stash                                // 309
// the callback to be called if and when we do get the attempt info.                                // 310
//                                                                                                  // 311
Accounts.onPageLoadLogin = function (f) {                                                           // 312
  if (pageLoadLoginAttemptInfo)                                                                     // 313
    f(pageLoadLoginAttemptInfo);                                                                    // 314
  else                                                                                              // 315
    pageLoadLoginCallbacks.push(f);                                                                 // 316
};                                                                                                  // 317
                                                                                                    // 318
                                                                                                    // 319
// Receive the information about the login attempt at page load time.                               // 320
// Call registered callbacks, and also record the info in case                                      // 321
// someone's callback hasn't been registered yet.                                                   // 322
//                                                                                                  // 323
Accounts._pageLoadLogin = function (attemptInfo) {                                                  // 324
  if (pageLoadLoginAttemptInfo) {                                                                   // 325
    Meteor._debug("Ignoring unexpected duplicate page load login attempt info");                    // 326
    return;                                                                                         // 327
  }                                                                                                 // 328
  _.each(pageLoadLoginCallbacks, function (callback) { callback(attemptInfo); });                   // 329
  pageLoadLoginCallbacks = [];                                                                      // 330
  pageLoadLoginAttemptInfo = attemptInfo;                                                           // 331
};                                                                                                  // 332
                                                                                                    // 333
                                                                                                    // 334
///                                                                                                 // 335
/// HANDLEBARS HELPERS                                                                              // 336
///                                                                                                 // 337
                                                                                                    // 338
// If our app has a Blaze, register the {{currentUser}} and {{loggingIn}}                           // 339
// global helpers.                                                                                  // 340
if (Package.blaze) {                                                                                // 341
  Package.blaze.Blaze.Template.registerHelper('currentUser', function () {                          // 342
    return Meteor.user();                                                                           // 343
  });                                                                                               // 344
  Package.blaze.Blaze.Template.registerHelper('loggingIn', function () {                            // 345
    return Meteor.loggingIn();                                                                      // 346
  });                                                                                               // 347
}                                                                                                   // 348
                                                                                                    // 349
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/accounts-base/localstorage_token.js                                                     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
// This file deals with storing a login token and user id in the                                    // 1
// browser's localStorage facility. It polls local storage every few                                // 2
// seconds to synchronize login state between multiple tabs in the same                             // 3
// browser.                                                                                         // 4
                                                                                                    // 5
var lastLoginTokenWhenPolled;                                                                       // 6
                                                                                                    // 7
// Login with a Meteor access token. This is the only public function                               // 8
// here.                                                                                            // 9
Meteor.loginWithToken = function (token, callback) {                                                // 10
  Accounts.callLoginMethod({                                                                        // 11
    methodArguments: [{resume: token}],                                                             // 12
    userCallback: callback});                                                                       // 13
};                                                                                                  // 14
                                                                                                    // 15
// Semi-internal API. Call this function to re-enable auto login after                              // 16
// if it was disabled at startup.                                                                   // 17
Accounts._enableAutoLogin = function () {                                                           // 18
  autoLoginEnabled = true;                                                                          // 19
  pollStoredLoginToken();                                                                           // 20
};                                                                                                  // 21
                                                                                                    // 22
                                                                                                    // 23
///                                                                                                 // 24
/// STORING                                                                                         // 25
///                                                                                                 // 26
                                                                                                    // 27
// Key names to use in localStorage                                                                 // 28
var loginTokenKey = "Meteor.loginToken";                                                            // 29
var loginTokenExpiresKey = "Meteor.loginTokenExpires";                                              // 30
var userIdKey = "Meteor.userId";                                                                    // 31
                                                                                                    // 32
// Call this from the top level of the test file for any test that does                             // 33
// logging in and out, to protect multiple tabs running the same tests                              // 34
// simultaneously from interfering with each others' localStorage.                                  // 35
Accounts._isolateLoginTokenForTest = function () {                                                  // 36
  loginTokenKey = loginTokenKey + Random.id();                                                      // 37
  userIdKey = userIdKey + Random.id();                                                              // 38
};                                                                                                  // 39
                                                                                                    // 40
storeLoginToken = function(userId, token, tokenExpires) {                                           // 41
  Meteor._localStorage.setItem(userIdKey, userId);                                                  // 42
  Meteor._localStorage.setItem(loginTokenKey, token);                                               // 43
  if (! tokenExpires)                                                                               // 44
    tokenExpires = Accounts._tokenExpiration(new Date());                                           // 45
  Meteor._localStorage.setItem(loginTokenExpiresKey, tokenExpires);                                 // 46
                                                                                                    // 47
  // to ensure that the localstorage poller doesn't end up trying to                                // 48
  // connect a second time                                                                          // 49
  lastLoginTokenWhenPolled = token;                                                                 // 50
};                                                                                                  // 51
                                                                                                    // 52
unstoreLoginToken = function() {                                                                    // 53
  Meteor._localStorage.removeItem(userIdKey);                                                       // 54
  Meteor._localStorage.removeItem(loginTokenKey);                                                   // 55
  Meteor._localStorage.removeItem(loginTokenExpiresKey);                                            // 56
                                                                                                    // 57
  // to ensure that the localstorage poller doesn't end up trying to                                // 58
  // connect a second time                                                                          // 59
  lastLoginTokenWhenPolled = null;                                                                  // 60
};                                                                                                  // 61
                                                                                                    // 62
// This is private, but it is exported for now because it is used by a                              // 63
// test in accounts-password.                                                                       // 64
//                                                                                                  // 65
storedLoginToken = Accounts._storedLoginToken = function() {                                        // 66
  return Meteor._localStorage.getItem(loginTokenKey);                                               // 67
};                                                                                                  // 68
                                                                                                    // 69
storedLoginTokenExpires = function () {                                                             // 70
  return Meteor._localStorage.getItem(loginTokenExpiresKey);                                        // 71
};                                                                                                  // 72
                                                                                                    // 73
var storedUserId = function() {                                                                     // 74
  return Meteor._localStorage.getItem(userIdKey);                                                   // 75
};                                                                                                  // 76
                                                                                                    // 77
var unstoreLoginTokenIfExpiresSoon = function () {                                                  // 78
  var tokenExpires = Meteor._localStorage.getItem(loginTokenExpiresKey);                            // 79
  if (tokenExpires && Accounts._tokenExpiresSoon(new Date(tokenExpires)))                           // 80
    unstoreLoginToken();                                                                            // 81
};                                                                                                  // 82
                                                                                                    // 83
///                                                                                                 // 84
/// AUTO-LOGIN                                                                                      // 85
///                                                                                                 // 86
                                                                                                    // 87
if (autoLoginEnabled) {                                                                             // 88
  // Immediately try to log in via local storage, so that any DDP                                   // 89
  // messages are sent after we have established our user account                                   // 90
  unstoreLoginTokenIfExpiresSoon();                                                                 // 91
  var token = storedLoginToken();                                                                   // 92
  if (token) {                                                                                      // 93
    // On startup, optimistically present us as logged in while the                                 // 94
    // request is in flight. This reduces page flicker on startup.                                  // 95
    var userId = storedUserId();                                                                    // 96
    userId && Accounts.connection.setUserId(userId);                                                // 97
    Meteor.loginWithToken(token, function (err) {                                                   // 98
      if (err) {                                                                                    // 99
        Meteor._debug("Error logging in with token: " + err);                                       // 100
        makeClientLoggedOut();                                                                      // 101
      }                                                                                             // 102
      Accounts._pageLoadLogin({                                                                     // 103
        type: "resume",                                                                             // 104
        allowed: !err,                                                                              // 105
        error: err,                                                                                 // 106
        methodName: "login",                                                                        // 107
        // XXX This is duplicate code with loginWithToken, but                                      // 108
        // loginWithToken can also be called at other times besides                                 // 109
        // page load.                                                                               // 110
        methodArguments: [{resume: token}]                                                          // 111
      });                                                                                           // 112
    });                                                                                             // 113
  }                                                                                                 // 114
}                                                                                                   // 115
                                                                                                    // 116
// Poll local storage every 3 seconds to login if someone logged in in                              // 117
// another tab                                                                                      // 118
lastLoginTokenWhenPolled = token;                                                                   // 119
var pollStoredLoginToken = function() {                                                             // 120
  if (! autoLoginEnabled)                                                                           // 121
    return;                                                                                         // 122
                                                                                                    // 123
  var currentLoginToken = storedLoginToken();                                                       // 124
                                                                                                    // 125
  // != instead of !== just to make sure undefined and null are treated the same                    // 126
  if (lastLoginTokenWhenPolled != currentLoginToken) {                                              // 127
    if (currentLoginToken) {                                                                        // 128
      Meteor.loginWithToken(currentLoginToken, function (err) {                                     // 129
        if (err)                                                                                    // 130
          makeClientLoggedOut();                                                                    // 131
      });                                                                                           // 132
    } else {                                                                                        // 133
      Meteor.logout();                                                                              // 134
    }                                                                                               // 135
  }                                                                                                 // 136
  lastLoginTokenWhenPolled = currentLoginToken;                                                     // 137
};                                                                                                  // 138
                                                                                                    // 139
setInterval(pollStoredLoginToken, 3000);                                                            // 140
                                                                                                    // 141
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-base'] = {
  Accounts: Accounts
};

})();
