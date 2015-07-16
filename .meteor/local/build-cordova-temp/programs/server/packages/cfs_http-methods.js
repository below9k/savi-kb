(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var _ = Package.underscore._;
var EJSON = Package.ejson.EJSON;

/* Package-scope variables */
var HTTP, _methodHTTP, Fiber, runServerMethod;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/cfs:http-methods/http.methods.server.api.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    // 1
                                                                                                                      // 2
GET /note                                                                                                             // 3
GET /note/:id                                                                                                         // 4
POST /note                                                                                                            // 5
PUT /note/:id                                                                                                         // 6
DELETE /note/:id                                                                                                      // 7
                                                                                                                      // 8
*/                                                                                                                    // 9
HTTP = Package.http && Package.http.HTTP || {};                                                                       // 10
                                                                                                                      // 11
var url = Npm.require('url');                                                                                         // 12
var stream = Npm.require('stream');                                                                                   // 13
                                                                                                                      // 14
// Primary local test scope                                                                                           // 15
_methodHTTP = {};                                                                                                     // 16
                                                                                                                      // 17
                                                                                                                      // 18
_methodHTTP.methodHandlers = {};                                                                                      // 19
_methodHTTP.methodTree = {};                                                                                          // 20
                                                                                                                      // 21
// This could be changed eg. could allow larger data chunks than 1.000.000                                            // 22
// 5mb = 5 * 1024 * 1024 = 5242880;                                                                                   // 23
HTTP.methodsMaxDataLength = 5242880; //1e6;                                                                           // 24
                                                                                                                      // 25
_methodHTTP.nameFollowsConventions = function(name) {                                                                 // 26
  // Check that name is string, not a falsy or empty                                                                  // 27
  return name && name === '' + name && name !== '';                                                                   // 28
};                                                                                                                    // 29
                                                                                                                      // 30
                                                                                                                      // 31
_methodHTTP.getNameList = function(name) {                                                                            // 32
  // Remove leading and trailing slashes and make command array                                                       // 33
  name = name && name.replace(/^\//g, '') || ''; // /^\/|\/$/g                                                        // 34
  // TODO: Get the format from the url - eg.: "/list/45.json" format should be                                        // 35
  // set in this function by splitting the last list item by . and have format                                        // 36
  // as the last item. How should we toggle:                                                                          // 37
  // "/list/45/item.name.json" and "/list/45/item.name"?                                                              // 38
  // We would either have to check all known formats or allways determin the "."                                      // 39
  // as an extension. Resolving in "json" and "name" as handed format - the user                                      // 40
  // Could simply just add the format as a parametre? or be explicit about                                            // 41
  // naming                                                                                                           // 42
  return name && name.split('/') || [];                                                                               // 43
};                                                                                                                    // 44
                                                                                                                      // 45
// Merge two arrays one containing keys and one values                                                                // 46
_methodHTTP.createObject = function(keys, values) {                                                                   // 47
  var result = {};                                                                                                    // 48
  if (keys && values) {                                                                                               // 49
    for (var i = 0; i < keys.length; i++) {                                                                           // 50
      result[keys[i]] = values[i] && decodeURIComponent(values[i]) || '';                                             // 51
    }                                                                                                                 // 52
  }                                                                                                                   // 53
  return result;                                                                                                      // 54
};                                                                                                                    // 55
                                                                                                                      // 56
_methodHTTP.addToMethodTree = function(methodName) {                                                                  // 57
  var list = _methodHTTP.getNameList(methodName);                                                                     // 58
  var name = '/';                                                                                                     // 59
  // Contains the list of params names                                                                                // 60
  var params = [];                                                                                                    // 61
  var currentMethodTree = _methodHTTP.methodTree;                                                                     // 62
                                                                                                                      // 63
  for (var i = 0; i < list.length; i++) {                                                                             // 64
    var lastListItem = (i === list.length - 1);                                                                       // 65
                                                                                                                      // 66
    // get the key name                                                                                               // 67
    var key = list[i];                                                                                                // 68
    // Check if it expects a value                                                                                    // 69
    if (key[0] === ':') {                                                                                             // 70
      // This is a value                                                                                              // 71
      params.push(key.slice(1));                                                                                      // 72
      key = ':value';                                                                                                 // 73
    }                                                                                                                 // 74
    name += key + '/';                                                                                                // 75
                                                                                                                      // 76
    // Set the key into the method tree                                                                               // 77
    if (typeof currentMethodTree[key] === 'undefined') {                                                              // 78
      currentMethodTree[key] = {};                                                                                    // 79
    }                                                                                                                 // 80
                                                                                                                      // 81
    // Dig deeper                                                                                                     // 82
    currentMethodTree = currentMethodTree[key];                                                                       // 83
                                                                                                                      // 84
  }                                                                                                                   // 85
                                                                                                                      // 86
  if (_.isEmpty(currentMethodTree[':ref'])) {                                                                         // 87
    currentMethodTree[':ref'] = {                                                                                     // 88
      name: name,                                                                                                     // 89
      params: params                                                                                                  // 90
    };                                                                                                                // 91
  }                                                                                                                   // 92
                                                                                                                      // 93
  return currentMethodTree[':ref'];                                                                                   // 94
};                                                                                                                    // 95
                                                                                                                      // 96
// This method should be optimized for speed since its called on allmost every                                        // 97
// http call to the server so we return null as soon as we know its not a method                                      // 98
_methodHTTP.getMethod = function(name) {                                                                              // 99
  // Check if the                                                                                                     // 100
  if (!_methodHTTP.nameFollowsConventions(name)) {                                                                    // 101
    return null;                                                                                                      // 102
  }                                                                                                                   // 103
  var list = _methodHTTP.getNameList(name);                                                                           // 104
  // Check if we got a correct list                                                                                   // 105
  if (!list || !list.length) {                                                                                        // 106
    return null;                                                                                                      // 107
  }                                                                                                                   // 108
  // Set current refernce in the _methodHTTP.methodTree                                                               // 109
  var currentMethodTree = _methodHTTP.methodTree;                                                                     // 110
  // Buffer for values to hand on later                                                                               // 111
  var values = [];                                                                                                    // 112
  // Iterate over the method name and check if its found in the method tree                                           // 113
  for (var i = 0; i < list.length; i++) {                                                                             // 114
    // get the key name                                                                                               // 115
    var key = list[i];                                                                                                // 116
    // We expect to find the key or :value if not we break                                                            // 117
    if (typeof currentMethodTree[key] !== 'undefined' ||                                                              // 118
            typeof currentMethodTree[':value'] !== 'undefined') {                                                     // 119
      // We got a result now check if its a value                                                                     // 120
      if (typeof currentMethodTree[key] === 'undefined') {                                                            // 121
        // Push the value                                                                                             // 122
        values.push(key);                                                                                             // 123
        // Set the key to :value to dig deeper                                                                        // 124
        key = ':value';                                                                                               // 125
      }                                                                                                               // 126
                                                                                                                      // 127
    } else {                                                                                                          // 128
      // Break - method call not found                                                                                // 129
      return null;                                                                                                    // 130
    }                                                                                                                 // 131
                                                                                                                      // 132
    // Dig deeper                                                                                                     // 133
    currentMethodTree = currentMethodTree[key];                                                                       // 134
  }                                                                                                                   // 135
                                                                                                                      // 136
  // Extract reference pointer                                                                                        // 137
  var reference = currentMethodTree && currentMethodTree[':ref'];                                                     // 138
  if (typeof reference !== 'undefined') {                                                                             // 139
    return {                                                                                                          // 140
      name: reference.name,                                                                                           // 141
      params: _methodHTTP.createObject(reference.params, values),                                                     // 142
      handle: _methodHTTP.methodHandlers[reference.name]                                                              // 143
    };                                                                                                                // 144
  } else {                                                                                                            // 145
    // Did not get any reference to the method                                                                        // 146
    return null;                                                                                                      // 147
  }                                                                                                                   // 148
};                                                                                                                    // 149
                                                                                                                      // 150
// This method retrieves the userId from the token and makes sure that the token                                      // 151
// is valid and not expired                                                                                           // 152
_methodHTTP.getUserId = function() {                                                                                  // 153
  var self = this;                                                                                                    // 154
                                                                                                                      // 155
  // // Get ip, x-forwarded-for can be comma seperated ips where the first is the                                     // 156
  // // client ip                                                                                                     // 157
  // var ip = self.req.headers['x-forwarded-for'] &&                                                                  // 158
  //         // Return the first item in ip list                                                                      // 159
  //         self.req.headers['x-forwarded-for'].split(',')[0] ||                                                     // 160
  //         // or return the remoteAddress                                                                           // 161
  //         self.req.connection.remoteAddress;                                                                       // 162
                                                                                                                      // 163
  // Check authentication                                                                                             // 164
  var userToken = self.query.token;                                                                                   // 165
                                                                                                                      // 166
  // Check if we are handed strings                                                                                   // 167
  try {                                                                                                               // 168
    userToken && check(userToken, String);                                                                            // 169
  } catch(err) {                                                                                                      // 170
    throw new Meteor.Error(404, 'Error user token and id not of type strings, Error: ' + (err.stack || err.message)); // 171
  }                                                                                                                   // 172
                                                                                                                      // 173
  // Set the this.userId                                                                                              // 174
  if (userToken) {                                                                                                    // 175
    // Look up user to check if user exists and is loggedin via token                                                 // 176
    var user = Meteor.users.findOne({                                                                                 // 177
        $or: [                                                                                                        // 178
          {'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(userToken)},                           // 179
          {'services.resume.loginTokens.token': userToken}                                                            // 180
        ]                                                                                                             // 181
      });                                                                                                             // 182
    // TODO: check 'services.resume.loginTokens.when' to have the token expire                                        // 183
                                                                                                                      // 184
    // Set the userId in the scope                                                                                    // 185
    return user && user._id;                                                                                          // 186
  }                                                                                                                   // 187
                                                                                                                      // 188
  return null;                                                                                                        // 189
};                                                                                                                    // 190
                                                                                                                      // 191
// Expose the default auth for calling from custom authentication handlers.                                           // 192
HTTP.defaultAuth = _methodHTTP.getUserId;                                                                             // 193
                                                                                                                      // 194
/*                                                                                                                    // 195
                                                                                                                      // 196
Add default support for options                                                                                       // 197
                                                                                                                      // 198
*/                                                                                                                    // 199
_methodHTTP.defaultOptionsHandler = function(methodObject) {                                                          // 200
  // List of supported methods                                                                                        // 201
  var allowMethods = [];                                                                                              // 202
  // The final result object                                                                                          // 203
  var result = {};                                                                                                    // 204
                                                                                                                      // 205
  // Iterate over the methods                                                                                         // 206
  // XXX: We should have a way to extend this - We should have some schema model                                      // 207
  // for our methods...                                                                                               // 208
  _.each(methodObject, function(f, methodName) {                                                                      // 209
    // Skip the stream and auth functions - they are not public / accessible                                          // 210
    if (methodName !== 'stream' && methodName !== 'auth') {                                                           // 211
                                                                                                                      // 212
      // Create an empty description                                                                                  // 213
      result[methodName] = { description: '', parameters: {} };                                                       // 214
      // Add method name to headers                                                                                   // 215
      allowMethods.push(methodName);                                                                                  // 216
                                                                                                                      // 217
    }                                                                                                                 // 218
  });                                                                                                                 // 219
                                                                                                                      // 220
  // Lets play nice                                                                                                   // 221
  this.setStatusCode(200);                                                                                            // 222
                                                                                                                      // 223
  // We have to set some allow headers here                                                                           // 224
  this.addHeader('Allow', allowMethods.join(','));                                                                    // 225
                                                                                                                      // 226
  // Return json result - Pretty print                                                                                // 227
  return JSON.stringify(result, null, '\t');                                                                          // 228
};                                                                                                                    // 229
                                                                                                                      // 230
// Public interface for adding server-side http methods - if setting a method to                                      // 231
// 'false' it would actually remove the method (can be used to unpublish a method)                                    // 232
HTTP.methods = function(newMethods) {                                                                                 // 233
  _.each(newMethods, function(func, name) {                                                                           // 234
    if (_methodHTTP.nameFollowsConventions(name)) {                                                                   // 235
      // Check if we got a function                                                                                   // 236
      //if (typeof func === 'function') {                                                                             // 237
        var method = _methodHTTP.addToMethodTree(name);                                                               // 238
        // The func is good                                                                                           // 239
        if (typeof _methodHTTP.methodHandlers[method.name] !== 'undefined') {                                         // 240
          if (func === false) {                                                                                       // 241
            // If the method is set to false then unpublish                                                           // 242
            delete _methodHTTP.methodHandlers[method.name];                                                           // 243
            // Delete the reference in the _methodHTTP.methodTree                                                     // 244
            delete method.name;                                                                                       // 245
            delete method.params;                                                                                     // 246
          } else {                                                                                                    // 247
            // We should not allow overwriting - following Meteor.methods                                             // 248
            throw new Error('HTTP method "' + name + '" is already registered');                                      // 249
          }                                                                                                           // 250
        } else {                                                                                                      // 251
          // We could have a function or a object                                                                     // 252
          // The object could have:                                                                                   // 253
          // '/test/': {                                                                                              // 254
          //   auth: function() ... returning the userId using over default                                           // 255
          //                                                                                                          // 256
          //   method: function() ...                                                                                 // 257
          //   or                                                                                                     // 258
          //   post: function() ...                                                                                   // 259
          //   put:                                                                                                   // 260
          //   get:                                                                                                   // 261
          //   delete:                                                                                                // 262
          //   head:                                                                                                  // 263
          // }                                                                                                        // 264
                                                                                                                      // 265
          /*                                                                                                          // 266
          We conform to the object format:                                                                            // 267
          {                                                                                                           // 268
            auth:                                                                                                     // 269
            post:                                                                                                     // 270
            put:                                                                                                      // 271
            get:                                                                                                      // 272
            delete:                                                                                                   // 273
            head:                                                                                                     // 274
          }                                                                                                           // 275
          This way we have a uniform reference                                                                        // 276
          */                                                                                                          // 277
                                                                                                                      // 278
          var uniObj = {};                                                                                            // 279
          if (typeof func === 'function') {                                                                           // 280
            uniObj = {                                                                                                // 281
              'auth': _methodHTTP.getUserId,                                                                          // 282
              'stream': false,                                                                                        // 283
              'POST': func,                                                                                           // 284
              'PUT': func,                                                                                            // 285
              'GET': func,                                                                                            // 286
              'DELETE': func,                                                                                         // 287
              'HEAD': func,                                                                                           // 288
              'OPTIONS': _methodHTTP.defaultOptionsHandler                                                            // 289
            };                                                                                                        // 290
          } else {                                                                                                    // 291
            uniObj = {                                                                                                // 292
              'stream': func.stream || false,                                                                         // 293
              'auth': func.auth || _methodHTTP.getUserId,                                                             // 294
              'POST': func.post || func.method,                                                                       // 295
              'PUT': func.put || func.method,                                                                         // 296
              'GET': func.get || func.method,                                                                         // 297
              'DELETE': func.delete || func.method,                                                                   // 298
              'HEAD': func.head || func.get || func.method,                                                           // 299
              'OPTIONS': func.options || _methodHTTP.defaultOptionsHandler                                            // 300
            };                                                                                                        // 301
          }                                                                                                           // 302
                                                                                                                      // 303
          // Registre the method                                                                                      // 304
          _methodHTTP.methodHandlers[method.name] = uniObj; // func;                                                  // 305
                                                                                                                      // 306
        }                                                                                                             // 307
      // } else {                                                                                                     // 308
      //   // We do require a function as a function to execute later                                                 // 309
      //   throw new Error('HTTP.methods failed: ' + name + ' is not a function');                                    // 310
      // }                                                                                                            // 311
    } else {                                                                                                          // 312
      // We have to follow the naming spec defined in nameFollowsConventions                                          // 313
      throw new Error('HTTP.method "' + name + '" invalid naming of method');                                         // 314
    }                                                                                                                 // 315
  });                                                                                                                 // 316
};                                                                                                                    // 317
                                                                                                                      // 318
var sendError = function(res, code, message) {                                                                        // 319
  if (code) {                                                                                                         // 320
    res.writeHead(code);                                                                                              // 321
  } else {                                                                                                            // 322
    res.writeHead(500);                                                                                               // 323
  }                                                                                                                   // 324
  res.end(message);                                                                                                   // 325
};                                                                                                                    // 326
                                                                                                                      // 327
// This handler collects the header data into either an object (if json) or the                                       // 328
// raw data. The data is passed to the callback                                                                       // 329
var requestHandler = function(req, res, callback) {                                                                   // 330
  if (typeof callback !== 'function') {                                                                               // 331
    return null;                                                                                                      // 332
  }                                                                                                                   // 333
                                                                                                                      // 334
  // Container for buffers and a sum of the length                                                                    // 335
  var bufferData = [], dataLen = 0;                                                                                   // 336
                                                                                                                      // 337
  // Extract the body                                                                                                 // 338
  req.on('data', function(data) {                                                                                     // 339
    bufferData.push(data);                                                                                            // 340
    dataLen += data.length;                                                                                           // 341
                                                                                                                      // 342
    // We have to check the data length in order to spare the server                                                  // 343
    if (dataLen > HTTP.methodsMaxDataLength) {                                                                        // 344
      dataLen = 0;                                                                                                    // 345
      bufferData = [];                                                                                                // 346
      // Flood attack or faulty client                                                                                // 347
      sendError(res, 413, 'Flood attack or faulty client');                                                           // 348
      req.connection.destroy();                                                                                       // 349
    }                                                                                                                 // 350
  });                                                                                                                 // 351
                                                                                                                      // 352
  // When message is ready to be passed on                                                                            // 353
  req.on('end', function() {                                                                                          // 354
    if (res.finished) {                                                                                               // 355
      return;                                                                                                         // 356
    }                                                                                                                 // 357
                                                                                                                      // 358
    // Allow the result to be undefined if so                                                                         // 359
    var result;                                                                                                       // 360
                                                                                                                      // 361
    // If data found the work it - either buffer or json                                                              // 362
    if (dataLen > 0) {                                                                                                // 363
      result = new Buffer(dataLen);                                                                                   // 364
      // Merge the chunks into one buffer                                                                             // 365
      for (var i = 0, ln = bufferData.length, pos = 0; i < ln; i++) {                                                 // 366
        bufferData[i].copy(result, pos);                                                                              // 367
        pos += bufferData[i].length;                                                                                  // 368
        delete bufferData[i];                                                                                         // 369
      }                                                                                                               // 370
      // Check if we could be dealing with json                                                                       // 371
      if (result[0] == 0x7b && result[1] === 0x22) {                                                                  // 372
        try {                                                                                                         // 373
          // Convert the body into json and extract the data object                                                   // 374
          result = EJSON.parse(result.toString());                                                                    // 375
        } catch(err) {                                                                                                // 376
          // Could not parse so we return the raw data                                                                // 377
        }                                                                                                             // 378
      }                                                                                                               // 379
    } else {                                                                                                          // 380
      // Result will be undefined                                                                                     // 381
    }                                                                                                                 // 382
                                                                                                                      // 383
    try {                                                                                                             // 384
      callback(result);                                                                                               // 385
    } catch(err) {                                                                                                    // 386
      sendError(res, 500, 'Error in requestHandler callback, Error: ' + (err.stack || err.message) );                 // 387
    }                                                                                                                 // 388
  });                                                                                                                 // 389
                                                                                                                      // 390
};                                                                                                                    // 391
                                                                                                                      // 392
// This is the simplest handler - it simply passes req stream as data to the                                          // 393
// method                                                                                                             // 394
var streamHandler = function(req, res, callback) {                                                                    // 395
  try {                                                                                                               // 396
    callback();                                                                                                       // 397
  } catch(err) {                                                                                                      // 398
    sendError(res, 500, 'Error in requestHandler callback, Error: ' + (err.stack || err.message) );                   // 399
  }                                                                                                                   // 400
};                                                                                                                    // 401
                                                                                                                      // 402
/*                                                                                                                    // 403
  Allow file uploads in cordova cfs                                                                                   // 404
*/                                                                                                                    // 405
var setCordovaHeaders = function(res) {                                                                               // 406
  res.setHeader("Access-Control-Allow-Origin", "http://meteor.local");                                                // 407
  res.setHeader("Access-Control-Allow-Methods", "PUT");                                                               // 408
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");                                                      // 409
};                                                                                                                    // 410
                                                                                                                      // 411
// Handle the actual connection                                                                                       // 412
WebApp.connectHandlers.use(function(req, res, next) {                                                                 // 413
                                                                                                                      // 414
  // Check to se if this is a http method call                                                                        // 415
  var method = _methodHTTP.getMethod(req._parsedUrl.pathname);                                                        // 416
                                                                                                                      // 417
  // If method is null then it wasn't and we pass the request along                                                   // 418
  if (method === null) {                                                                                              // 419
    return next();                                                                                                    // 420
  }                                                                                                                   // 421
                                                                                                                      // 422
  var dataHandle = (method.handle && method.handle.stream)?streamHandler:requestHandler;                              // 423
                                                                                                                      // 424
  dataHandle(req, res, function(data) {                                                                               // 425
    // If methodsHandler not found or somehow the methodshandler is not a                                             // 426
    // function then return a 404                                                                                     // 427
    if (typeof method.handle === 'undefined') {                                                                       // 428
      sendError(res, 404, 'Error HTTP method handler "' + method.name + '" is not found');                            // 429
      return;                                                                                                         // 430
    }                                                                                                                 // 431
                                                                                                                      // 432
    // Set CORS headers for Meteor Cordova clients                                                                    // 433
    setCordovaHeaders(res);                                                                                           // 434
                                                                                                                      // 435
    // Set fiber scope                                                                                                // 436
    var fiberScope = {                                                                                                // 437
      // Pointers to Request / Response                                                                               // 438
      req: req,                                                                                                       // 439
      res: res,                                                                                                       // 440
      // Request / Response helpers                                                                                   // 441
      statusCode: 200,                                                                                                // 442
      method: req.method,                                                                                             // 443
      // Headers for response                                                                                         // 444
      headers: {                                                                                                      // 445
        'Content-Type': 'text/html'  // Set default type                                                              // 446
      },                                                                                                              // 447
      // Arguments                                                                                                    // 448
      data: data,                                                                                                     // 449
      query: req.query,                                                                                               // 450
      params: method.params,                                                                                          // 451
      // Method reference                                                                                             // 452
      reference: method.name,                                                                                         // 453
      methodObject: method.handle,                                                                                    // 454
      _streamsWaiting: 0                                                                                              // 455
    };                                                                                                                // 456
                                                                                                                      // 457
    // Helper functions this scope                                                                                    // 458
    Fiber = Npm.require('fibers');                                                                                    // 459
    runServerMethod = Fiber(function(self) {                                                                          // 460
      var result, resultBuffer;                                                                                       // 461
                                                                                                                      // 462
      // We fetch methods data from methodsHandler, the handler uses the this.addItem()                               // 463
      // function to populate the methods, this way we have better check control and                                  // 464
      // better error handling + messages                                                                             // 465
                                                                                                                      // 466
      // The scope for the user methodObject callbacks                                                                // 467
      var thisScope = {                                                                                               // 468
        // The user whos id and token was used to run this method, if set/found                                       // 469
        userId: null,                                                                                                 // 470
        // The id of the data                                                                                         // 471
        _id: null,                                                                                                    // 472
        // Set the query params ?token=1&id=2 -> { token: 1, id: 2 }                                                  // 473
        query: self.query,                                                                                            // 474
        // Set params /foo/:name/test/:id -> { name: '', id: '' }                                                     // 475
        params: self.params,                                                                                          // 476
        // Method GET, PUT, POST, DELETE, HEAD                                                                        // 477
        method: self.method,                                                                                          // 478
        // User agent                                                                                                 // 479
        userAgent: req.headers['user-agent'],                                                                         // 480
        // All request headers                                                                                        // 481
        requestHeaders: req.headers,                                                                                  // 482
        // Add the request object it self                                                                             // 483
        request: req,                                                                                                 // 484
        // Set the userId                                                                                             // 485
        setUserId: function(id) {                                                                                     // 486
          this.userId = id;                                                                                           // 487
        },                                                                                                            // 488
        // We dont simulate / run this on the client at the moment                                                    // 489
        isSimulation: false,                                                                                          // 490
        // Run the next method in a new fiber - This is default at the moment                                         // 491
        unblock: function() {},                                                                                       // 492
        // Set the content type in header, defaults to text/html?                                                     // 493
        setContentType: function(type) {                                                                              // 494
          self.headers['Content-Type'] = type;                                                                        // 495
        },                                                                                                            // 496
        setStatusCode: function(code) {                                                                               // 497
          self.statusCode = code;                                                                                     // 498
        },                                                                                                            // 499
        addHeader: function(key, value) {                                                                             // 500
          self.headers[key] = value;                                                                                  // 501
        },                                                                                                            // 502
        createReadStream: function() {                                                                                // 503
          self._streamsWaiting++;                                                                                     // 504
          return req;                                                                                                 // 505
        },                                                                                                            // 506
        createWriteStream: function() {                                                                               // 507
          self._streamsWaiting++;                                                                                     // 508
          return res;                                                                                                 // 509
        },                                                                                                            // 510
        Error: function(err) {                                                                                        // 511
                                                                                                                      // 512
          if (err instanceof Meteor.Error) {                                                                          // 513
            // Return controlled error                                                                                // 514
            sendError(res, err.error, err.message);                                                                   // 515
          } else if (err instanceof Error) {                                                                          // 516
            // Return error trace - this is not intented                                                              // 517
            sendError(res, 503, 'Error in method "' + self.reference + '", Error: ' + (err.stack || err.message) );   // 518
          } else {                                                                                                    // 519
            sendError(res, 503, 'Error in method "' + self.reference + '"' );                                         // 520
          }                                                                                                           // 521
                                                                                                                      // 522
        },                                                                                                            // 523
        // getData: function() {                                                                                      // 524
        //   // XXX: TODO if we could run the request handler stuff eg.                                               // 525
        //   // in here in a fiber sync it could be cool - and the user did                                           // 526
        //   // not have to specify the stream=true flag?                                                             // 527
        // }                                                                                                          // 528
      };                                                                                                              // 529
                                                                                                                      // 530
      // This function sends the final response. Depending on the                                                     // 531
      // timing of the streaming, we might have to wait for all                                                       // 532
      // streaming to end, or we might have to wait for this function                                                 // 533
      // to finish after streaming ends. The checks in this function                                                  // 534
      // and the fact that we call it twice ensure that we will always                                                // 535
      // send the response if we haven't sent an error response, but                                                  // 536
      // we will not send it too early.                                                                               // 537
      function sendResponseIfDone() {                                                                                 // 538
        // If no streams are waiting                                                                                  // 539
        if (self._streamsWaiting === 0 &&                                                                             // 540
            self.statusCode === 200 &&                                                                                // 541
            self.done) {                                                                                              // 542
          res.end(resultBuffer);                                                                                      // 543
        }                                                                                                             // 544
      }                                                                                                               // 545
                                                                                                                      // 546
      var methodCall = self.methodObject[self.method];                                                                // 547
                                                                                                                      // 548
      // If the method call is set for the POST/PUT/GET or DELETE then run the                                        // 549
      // respective methodCall if its a function                                                                      // 550
      if (typeof methodCall === 'function') {                                                                         // 551
                                                                                                                      // 552
        // Get the userId - This is either set as a method specific handler and                                       // 553
        // will allways default back to the builtin getUserId handler                                                 // 554
        try {                                                                                                         // 555
          // Try to set the userId                                                                                    // 556
          thisScope.userId = self.methodObject.auth.apply(self);                                                      // 557
        } catch(err) {                                                                                                // 558
          sendError(res, err.error, (err.message || err.stack));                                                      // 559
          return;                                                                                                     // 560
        }                                                                                                             // 561
                                                                                                                      // 562
        // This must be attached before there's any chance of `createReadStream`                                      // 563
        // or `createWriteStream` being called, which means before we do                                              // 564
        // `methodCall.apply` below.                                                                                  // 565
        req.on('end', function() {                                                                                    // 566
          self._streamsWaiting--;                                                                                     // 567
          sendResponseIfDone();                                                                                       // 568
        });                                                                                                           // 569
                                                                                                                      // 570
        // Get the result of the methodCall                                                                           // 571
        try {                                                                                                         // 572
          if (self.method == 'OPTIONS') {                                                                             // 573
            result = methodCall.apply(thisScope, [self.methodObject]) || '';                                          // 574
          } else {                                                                                                    // 575
            result = methodCall.apply(thisScope, [self.data]) || '';                                                  // 576
          }                                                                                                           // 577
        } catch(err) {                                                                                                // 578
          if (err instanceof Meteor.Error) {                                                                          // 579
            // Return controlled error                                                                                // 580
            sendError(res, err.error, err.message);                                                                   // 581
          } else {                                                                                                    // 582
            // Return error trace - this is not intented                                                              // 583
            sendError(res, 503, 'Error in method "' + self.reference + '", Error: ' + (err.stack || err.message) );   // 584
          }                                                                                                           // 585
          return;                                                                                                     // 586
        }                                                                                                             // 587
                                                                                                                      // 588
        // Set headers                                                                                                // 589
        _.each(self.headers, function(value, key) {                                                                   // 590
          // If value is defined then set the header, this allows for unsetting                                       // 591
          // the default content-type                                                                                 // 592
          if (typeof value !== 'undefined')                                                                           // 593
            res.setHeader(key, value);                                                                                // 594
        });                                                                                                           // 595
                                                                                                                      // 596
        // If OK / 200 then Return the result                                                                         // 597
        if (self.statusCode === 200) {                                                                                // 598
                                                                                                                      // 599
          if (self.method !== "HEAD") {                                                                               // 600
            // Return result                                                                                          // 601
            if (typeof result === 'string') {                                                                         // 602
              resultBuffer = new Buffer(result);                                                                      // 603
            } else {                                                                                                  // 604
              resultBuffer = new Buffer(JSON.stringify(result));                                                      // 605
            }                                                                                                         // 606
                                                                                                                      // 607
            // Check if user wants to overwrite content length for some reason?                                       // 608
            if (typeof self.headers['Content-Length'] === 'undefined') {                                              // 609
              self.headers['Content-Length'] = resultBuffer.length;                                                   // 610
            }                                                                                                         // 611
          }                                                                                                           // 612
                                                                                                                      // 613
          self.done = true;                                                                                           // 614
          sendResponseIfDone();                                                                                       // 615
                                                                                                                      // 616
        } else {                                                                                                      // 617
          // Allow user to alter the status code and send a message                                                   // 618
          sendError(res, self.statusCode, result);                                                                    // 619
        }                                                                                                             // 620
                                                                                                                      // 621
      } else {                                                                                                        // 622
        sendError(res, 404, 'Service not found');                                                                     // 623
      }                                                                                                               // 624
                                                                                                                      // 625
                                                                                                                      // 626
    });                                                                                                               // 627
    // Run http methods handler                                                                                       // 628
    try {                                                                                                             // 629
      runServerMethod.run(fiberScope);                                                                                // 630
    } catch(err) {                                                                                                    // 631
      sendError(res, 500, 'Error running the server http method handler, Error: ' + (err.stack || err.message));      // 632
    }                                                                                                                 // 633
                                                                                                                      // 634
  }); // EO Request handler                                                                                           // 635
                                                                                                                      // 636
                                                                                                                      // 637
});                                                                                                                   // 638
                                                                                                                      // 639
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:http-methods'] = {
  HTTP: HTTP,
  _methodHTTP: _methodHTTP
};

})();

//# sourceMappingURL=cfs_http-methods.js.map
