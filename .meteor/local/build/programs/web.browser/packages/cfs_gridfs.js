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
var FS = Package['cfs:base-package'].FS;

(function () {

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/cfs:gridfs/gridfs.client.js                                        //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
/**                                                                            // 1
 * @public                                                                     // 2
 * @constructor                                                                // 3
 * @param {String} name - The store name                                       // 4
 * @param {Object} options                                                     // 5
 * @param {Function} [options.beforeSave] - Function to run before saving a file from the client. The context of the function will be the `FS.File` instance we're saving. The function may alter its properties.
 * @param {Number} [options.maxTries=5] - Max times to attempt saving a file   // 7
 * @returns {undefined}                                                        // 8
 *                                                                             // 9
 * Creates a GridFS store instance on the client, which is just a shell object // 10
 * storing some info.                                                          // 11
 */                                                                            // 12
FS.Store.GridFS = function(name, options) {                                    // 13
  var self = this;                                                             // 14
  if (!(self instanceof FS.Store.GridFS))                                      // 15
    throw new Error('FS.Store.GridFS missing keyword "new"');                  // 16
                                                                               // 17
  return new FS.StorageAdapter(name, options, {                                // 18
    typeName: 'storage.gridfs'                                                 // 19
  });                                                                          // 20
};                                                                             // 21
                                                                               // 22
/////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:gridfs'] = {};

})();
