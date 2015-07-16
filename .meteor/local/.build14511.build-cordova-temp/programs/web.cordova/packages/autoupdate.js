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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Retry = Package.retry.Retry;
var DDP = Package.ddp.DDP;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var HTTP = Package.http.HTTP;

/* Package-scope variables */
var Autoupdate, ClientVersions;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/autoupdate/autoupdate_cordova.js                                                               //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var autoupdateVersionCordova = __meteor_runtime_config__.autoupdateVersionCordova || "unknown";            // 1
                                                                                                           // 2
// The collection of acceptable client versions.                                                           // 3
ClientVersions = new Meteor.Collection("meteor_autoupdate_clientVersions");                                // 4
                                                                                                           // 5
Autoupdate = {};                                                                                           // 6
                                                                                                           // 7
Autoupdate.newClientAvailable = function () {                                                              // 8
  return !! ClientVersions.findOne({                                                                       // 9
    _id: 'version-cordova',                                                                                // 10
    version: {$ne: autoupdateVersionCordova}                                                               // 11
  });                                                                                                      // 12
};                                                                                                         // 13
                                                                                                           // 14
var writeFile = function (directoryPath, fileName, content, cb) {                                          // 15
  var fail = function (err) {                                                                              // 16
    cb(new Error("Failed to write file: ", err), null);                                                    // 17
  };                                                                                                       // 18
  window.resolveLocalFileSystemURL(directoryPath,                                                          // 19
    function (dirEntry) {                                                                                  // 20
      var success = function (fileEntry) {                                                                 // 21
        fileEntry.createWriter(function (writer) {                                                         // 22
          writer.onwrite = function (evt) {                                                                // 23
            var result = evt.target.result;                                                                // 24
            cb(null, result);                                                                              // 25
          };                                                                                               // 26
          writer.onerror = fail;                                                                           // 27
          writer.write(content);                                                                           // 28
        }, fail);                                                                                          // 29
      };                                                                                                   // 30
                                                                                                           // 31
      dirEntry.getFile(fileName, { create: true, exclusive: false },                                       // 32
        success, fail);                                                                                    // 33
    }, fail);                                                                                              // 34
};                                                                                                         // 35
                                                                                                           // 36
var restartServer = function (location) {                                                                  // 37
  console.log('restartserver with location ' + location);                                                  // 38
  var fail = function (err) { console.log('something failed: ' + err.message) };                           // 39
  var httpd = cordova && cordova.plugins && cordova.plugins.CorHttpd;                                      // 40
                                                                                                           // 41
  if (! httpd) {                                                                                           // 42
    fail(new Error('no httpd'));                                                                           // 43
    return;                                                                                                // 44
  }                                                                                                        // 45
                                                                                                           // 46
  var startServer = function (cordovajsRoot, prevUrl) {                                                    // 47
    var port;                                                                                              // 48
    if (prevUrl) {                                                                                         // 49
      var parts = prevUrl.split(':');                                                                      // 50
      if (parts.length)                                                                                    // 51
        port = parseInt(parts[parts.length - 1], 10);                                                      // 52
    }                                                                                                      // 53
    httpd.startServer({                                                                                    // 54
      'www_root' : location,                                                                               // 55
      'port' : port,                                                                                       // 56
      'cordovajs_root': cordovajsRoot                                                                      // 57
    }, function (url) {                                                                                    // 58
      Package.reload.Reload._reload();                                                                     // 59
    }, fail);                                                                                              // 60
  };                                                                                                       // 61
                                                                                                           // 62
  httpd.getCordovajsRoot(function (cordovajsRoot) {                                                        // 63
    httpd.getURL(function (url) {                                                                          // 64
      if (url.length > 0) {                                                                                // 65
        // already have a server running, stop it                                                          // 66
        httpd.stopServer(function () {                                                                     // 67
          startServer(cordovajsRoot, url);                                                                 // 68
        }, fail);                                                                                          // 69
      } else {                                                                                             // 70
        // just start a server                                                                             // 71
        startServer(cordovajsRoot);                                                                        // 72
      }                                                                                                    // 73
    }, fail);                                                                                              // 74
  }, fail);                                                                                                // 75
};                                                                                                         // 76
                                                                                                           // 77
var hasCalledReload = false;                                                                               // 78
var onNewVersion = function () {                                                                           // 79
  var ft = new FileTransfer();                                                                             // 80
  var urlPrefix = Meteor.absoluteUrl() + '__cordova';                                                      // 81
                                                                                                           // 82
  var localPathPrefix = cordova.file.applicationStorageDirectory +                                         // 83
                        'Documents/meteor/';                                                               // 84
                                                                                                           // 85
                                                                                                           // 86
  HTTP.get(urlPrefix + '/manifest.json', function (err, res) {                                             // 87
    if (err || ! res.data) {                                                                               // 88
      console.log('failed to download the manifest ' + (err && err.message) + ' ' + (res && res.content)); // 89
      return;                                                                                              // 90
    }                                                                                                      // 91
                                                                                                           // 92
    var program = res.data;                                                                                // 93
    var manifest = _.clone(program.manifest);                                                              // 94
    var version = program.version;                                                                         // 95
    var ft = new FileTransfer();                                                                           // 96
                                                                                                           // 97
    manifest.push({ url: '/index.html?' + Random.id() });                                                  // 98
                                                                                                           // 99
    var downloads = 0;                                                                                     // 100
    _.each(manifest, function (item) {                                                                     // 101
      if (item.url) downloads++;                                                                           // 102
    });                                                                                                    // 103
                                                                                                           // 104
    var versionPrefix = localPathPrefix + version;                                                         // 105
                                                                                                           // 106
    var afterAllFilesDownloaded = _.after(downloads, function () {                                         // 107
      writeFile(versionPrefix, 'manifest.json',                                                            // 108
          JSON.stringify(program, undefined, 2),                                                           // 109
          function (err) {                                                                                 // 110
                                                                                                           // 111
        if (err) {                                                                                         // 112
          console.log("Failed to write manifest.json");                                                    // 113
          // XXX do something smarter?                                                                     // 114
          return;                                                                                          // 115
        }                                                                                                  // 116
                                                                                                           // 117
        // success! downloaded all sources and saved the manifest                                          // 118
        // save the version string for atomicity                                                           // 119
        writeFile(localPathPrefix, 'version', version,                                                     // 120
            function (err) {                                                                               // 121
          if (err) {                                                                                       // 122
            console.log("Failed to write version");                                                        // 123
            return;                                                                                        // 124
          }                                                                                                // 125
                                                                                                           // 126
          // don't call reload twice!                                                                      // 127
          if (! hasCalledReload) {                                                                         // 128
            // relative to 'bundle.app/www'                                                                // 129
            var location = '../../Documents/meteor/' + version;                                            // 130
            restartServer(location);                                                                       // 131
          }                                                                                                // 132
        });                                                                                                // 133
      });                                                                                                  // 134
    });                                                                                                    // 135
                                                                                                           // 136
    _.each(manifest, function (item) {                                                                     // 137
      if (! item.url) return;                                                                              // 138
                                                                                                           // 139
      var url = item.url;                                                                                  // 140
      url = url.replace(/\?.+$/, '');                                                                      // 141
                                                                                                           // 142
      // Add a cache buster to ensure that we don't cache an old asset.                                    // 143
      var uri = encodeURI(urlPrefix + url + '?' + Random.id());                                            // 144
                                                                                                           // 145
      // Try to dowload the file a few times.                                                              // 146
      var tries = 0;                                                                                       // 147
      var tryDownload = function () {                                                                      // 148
        ft.download(uri, versionPrefix + url, function (entry) {                                           // 149
          if (entry) {                                                                                     // 150
            afterAllFilesDownloaded();                                                                     // 151
          }                                                                                                // 152
        }, function (err) {                                                                                // 153
          // It failed, try again if we have tried less than 5 times.                                      // 154
          if (tries++ < 5) {                                                                               // 155
            tryDownload();                                                                                 // 156
          } else {                                                                                         // 157
            console.log('fail source: ', error.source);                                                    // 158
            console.log('fail target: ', error.target);                                                    // 159
          }                                                                                                // 160
        });                                                                                                // 161
      };                                                                                                   // 162
                                                                                                           // 163
      tryDownload();                                                                                       // 164
    });                                                                                                    // 165
  });                                                                                                      // 166
};                                                                                                         // 167
                                                                                                           // 168
var retry = new Retry({                                                                                    // 169
  minCount: 0, // don't do any immediate retries                                                           // 170
  baseTimeout: 30*1000 // start with 30s                                                                   // 171
});                                                                                                        // 172
var failures = 0;                                                                                          // 173
                                                                                                           // 174
Autoupdate._retrySubscription = function () {                                                              // 175
 Meteor.subscribe("meteor_autoupdate_clientVersions", {                                                    // 176
    onError: function (error) {                                                                            // 177
      Meteor._debug("autoupdate subscription failed:", error);                                             // 178
      failures++;                                                                                          // 179
      retry.retryLater(failures, function () {                                                             // 180
        // Just retry making the subscription, don't reload the whole                                      // 181
        // page. While reloading would catch more cases (for example,                                      // 182
        // the server went back a version and is now doing old-style hot                                   // 183
        // code push), it would also be more prone to reload loops,                                        // 184
        // which look really bad to the user. Just retrying the                                            // 185
        // subscription over DDP means it is at least possible to fix by                                   // 186
        // updating the server.                                                                            // 187
        Autoupdate._retrySubscription();                                                                   // 188
      });                                                                                                  // 189
    }                                                                                                      // 190
  });                                                                                                      // 191
  if (Package.reload) {                                                                                    // 192
    var checkNewVersionDocument = function (doc) {                                                         // 193
      var self = this;                                                                                     // 194
      if (doc.version !== autoupdateVersionCordova) {                                                      // 195
        onNewVersion();                                                                                    // 196
      }                                                                                                    // 197
    };                                                                                                     // 198
                                                                                                           // 199
    var handle = ClientVersions.find({                                                                     // 200
      _id: 'version-cordova'                                                                               // 201
    }).observe({                                                                                           // 202
      added: checkNewVersionDocument,                                                                      // 203
      changed: checkNewVersionDocument                                                                     // 204
    });                                                                                                    // 205
  }                                                                                                        // 206
};                                                                                                         // 207
                                                                                                           // 208
Meteor.startup(Autoupdate._retrySubscription);                                                             // 209
                                                                                                           // 210
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.autoupdate = {
  Autoupdate: Autoupdate
};

})();
