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

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/summernote:standalone/dist/summernote.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * Super simple wysiwyg editor on Bootstrap v0.6.6                                                                     // 2
 * http://summernote.org/                                                                                              // 3
 *                                                                                                                     // 4
 * summernote.js                                                                                                       // 5
 * Copyright 2013-2015 Alan Hong. and other contributors                                                               // 6
 * summernote may be freely distributed under the MIT license./                                                        // 7
 *                                                                                                                     // 8
 * Date: 2015-04-29T19:14Z                                                                                             // 9
 */                                                                                                                    // 10
(function (factory) {                                                                                                  // 11
  /* global define */                                                                                                  // 12
  if (typeof define === 'function' && define.amd) {                                                                    // 13
    // AMD. Register as an anonymous module.                                                                           // 14
    define(['jquery'], factory);                                                                                       // 15
  } else {                                                                                                             // 16
    // Browser globals: jQuery                                                                                         // 17
    factory(window.jQuery);                                                                                            // 18
  }                                                                                                                    // 19
}(function ($) {                                                                                                       // 20
                                                                                                                       // 21
                                                                                                                       // 22
                                                                                                                       // 23
  if (!Array.prototype.reduce) {                                                                                       // 24
    /**                                                                                                                // 25
     * Array.prototype.reduce polyfill                                                                                 // 26
     *                                                                                                                 // 27
     * @param {Function} callback                                                                                      // 28
     * @param {Value} [initialValue]                                                                                   // 29
     * @return {Value}                                                                                                 // 30
     *                                                                                                                 // 31
     * @see http://goo.gl/WNriQD                                                                                       // 32
     */                                                                                                                // 33
    Array.prototype.reduce = function (callback) {                                                                     // 34
      var t = Object(this), len = t.length >>> 0, k = 0, value;                                                        // 35
      if (arguments.length === 2) {                                                                                    // 36
        value = arguments[1];                                                                                          // 37
      } else {                                                                                                         // 38
        while (k < len && !(k in t)) {                                                                                 // 39
          k++;                                                                                                         // 40
        }                                                                                                              // 41
        if (k >= len) {                                                                                                // 42
          throw new TypeError('Reduce of empty array with no initial value');                                          // 43
        }                                                                                                              // 44
        value = t[k++];                                                                                                // 45
      }                                                                                                                // 46
      for (; k < len; k++) {                                                                                           // 47
        if (k in t) {                                                                                                  // 48
          value = callback(value, t[k], k, t);                                                                         // 49
        }                                                                                                              // 50
      }                                                                                                                // 51
      return value;                                                                                                    // 52
    };                                                                                                                 // 53
  }                                                                                                                    // 54
                                                                                                                       // 55
  if ('function' !== typeof Array.prototype.filter) {                                                                  // 56
    /**                                                                                                                // 57
     * Array.prototype.filter polyfill                                                                                 // 58
     *                                                                                                                 // 59
     * @param {Function} func                                                                                          // 60
     * @return {Array}                                                                                                 // 61
     *                                                                                                                 // 62
     * @see http://goo.gl/T1KFnq                                                                                       // 63
     */                                                                                                                // 64
    Array.prototype.filter = function (func) {                                                                         // 65
      var t = Object(this), len = t.length >>> 0;                                                                      // 66
                                                                                                                       // 67
      var res = [];                                                                                                    // 68
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;                                                     // 69
      for (var i = 0; i < len; i++) {                                                                                  // 70
        if (i in t) {                                                                                                  // 71
          var val = t[i];                                                                                              // 72
          if (func.call(thisArg, val, i, t)) {                                                                         // 73
            res.push(val);                                                                                             // 74
          }                                                                                                            // 75
        }                                                                                                              // 76
      }                                                                                                                // 77
                                                                                                                       // 78
      return res;                                                                                                      // 79
    };                                                                                                                 // 80
  }                                                                                                                    // 81
                                                                                                                       // 82
  var isSupportAmd = typeof define === 'function' && define.amd;                                                       // 83
                                                                                                                       // 84
  /**                                                                                                                  // 85
   * returns whether font is installed or not.                                                                         // 86
   *                                                                                                                   // 87
   * @param {String} fontName                                                                                          // 88
   * @return {Boolean}                                                                                                 // 89
   */                                                                                                                  // 90
  var isFontInstalled = function (fontName) {                                                                          // 91
    var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';                                 // 92
    var $tester = $('<div>').css({                                                                                     // 93
      position: 'absolute',                                                                                            // 94
      left: '-9999px',                                                                                                 // 95
      top: '-9999px',                                                                                                  // 96
      fontSize: '200px'                                                                                                // 97
    }).text('mmmmmmmmmwwwwwww').appendTo(document.body);                                                               // 98
                                                                                                                       // 99
    var originalWidth = $tester.css('fontFamily', testFontName).width();                                               // 100
    var width = $tester.css('fontFamily', fontName + ',' + testFontName).width();                                      // 101
                                                                                                                       // 102
    $tester.remove();                                                                                                  // 103
                                                                                                                       // 104
    return originalWidth !== width;                                                                                    // 105
  };                                                                                                                   // 106
                                                                                                                       // 107
  /**                                                                                                                  // 108
   * @class core.agent                                                                                                 // 109
   *                                                                                                                   // 110
   * Object which check platform and agent                                                                             // 111
   *                                                                                                                   // 112
   * @singleton                                                                                                        // 113
   * @alternateClassName agent                                                                                         // 114
   */                                                                                                                  // 115
  var agent = {                                                                                                        // 116
    /** @property {Boolean} [isMac=false] true if this agent is Mac  */                                                // 117
    isMac: navigator.appVersion.indexOf('Mac') > -1,                                                                   // 118
    /** @property {Boolean} [isMSIE=false] true if this agent is a Internet Explorer  */                               // 119
    isMSIE: navigator.userAgent.indexOf('MSIE') > -1 || navigator.userAgent.indexOf('Trident') > -1,                   // 120
    /** @property {Boolean} [isFF=false] true if this agent is a Firefox  */                                           // 121
    isFF: navigator.userAgent.indexOf('Firefox') > -1,                                                                 // 122
    /** @property {String} jqueryVersion current jQuery version string  */                                             // 123
    jqueryVersion: parseFloat($.fn.jquery),                                                                            // 124
    isSupportAmd: isSupportAmd,                                                                                        // 125
    hasCodeMirror: isSupportAmd ? require.specified('CodeMirror') : !!window.CodeMirror,                               // 126
    isFontInstalled: isFontInstalled,                                                                                  // 127
    isW3CRangeSupport: !!document.createRange                                                                          // 128
  };                                                                                                                   // 129
                                                                                                                       // 130
  /**                                                                                                                  // 131
   * @class core.func                                                                                                  // 132
   *                                                                                                                   // 133
   * func utils (for high-order func's arg)                                                                            // 134
   *                                                                                                                   // 135
   * @singleton                                                                                                        // 136
   * @alternateClassName func                                                                                          // 137
   */                                                                                                                  // 138
  var func = (function () {                                                                                            // 139
    var eq = function (itemA) {                                                                                        // 140
      return function (itemB) {                                                                                        // 141
        return itemA === itemB;                                                                                        // 142
      };                                                                                                               // 143
    };                                                                                                                 // 144
                                                                                                                       // 145
    var eq2 = function (itemA, itemB) {                                                                                // 146
      return itemA === itemB;                                                                                          // 147
    };                                                                                                                 // 148
                                                                                                                       // 149
    var peq2 = function (propName) {                                                                                   // 150
      return function (itemA, itemB) {                                                                                 // 151
        return itemA[propName] === itemB[propName];                                                                    // 152
      };                                                                                                               // 153
    };                                                                                                                 // 154
                                                                                                                       // 155
    var ok = function () {                                                                                             // 156
      return true;                                                                                                     // 157
    };                                                                                                                 // 158
                                                                                                                       // 159
    var fail = function () {                                                                                           // 160
      return false;                                                                                                    // 161
    };                                                                                                                 // 162
                                                                                                                       // 163
    var not = function (f) {                                                                                           // 164
      return function () {                                                                                             // 165
        return !f.apply(f, arguments);                                                                                 // 166
      };                                                                                                               // 167
    };                                                                                                                 // 168
                                                                                                                       // 169
    var and = function (fA, fB) {                                                                                      // 170
      return function (item) {                                                                                         // 171
        return fA(item) && fB(item);                                                                                   // 172
      };                                                                                                               // 173
    };                                                                                                                 // 174
                                                                                                                       // 175
    var self = function (a) {                                                                                          // 176
      return a;                                                                                                        // 177
    };                                                                                                                 // 178
                                                                                                                       // 179
    var idCounter = 0;                                                                                                 // 180
                                                                                                                       // 181
    /**                                                                                                                // 182
     * generate a globally-unique id                                                                                   // 183
     *                                                                                                                 // 184
     * @param {String} [prefix]                                                                                        // 185
     */                                                                                                                // 186
    var uniqueId = function (prefix) {                                                                                 // 187
      var id = ++idCounter + '';                                                                                       // 188
      return prefix ? prefix + id : id;                                                                                // 189
    };                                                                                                                 // 190
                                                                                                                       // 191
    /**                                                                                                                // 192
     * returns bnd (bounds) from rect                                                                                  // 193
     *                                                                                                                 // 194
     * - IE Compatability Issue: http://goo.gl/sRLOAo                                                                  // 195
     * - Scroll Issue: http://goo.gl/sNjUc                                                                             // 196
     *                                                                                                                 // 197
     * @param {Rect} rect                                                                                              // 198
     * @return {Object} bounds                                                                                         // 199
     * @return {Number} bounds.top                                                                                     // 200
     * @return {Number} bounds.left                                                                                    // 201
     * @return {Number} bounds.width                                                                                   // 202
     * @return {Number} bounds.height                                                                                  // 203
     */                                                                                                                // 204
    var rect2bnd = function (rect) {                                                                                   // 205
      var $document = $(document);                                                                                     // 206
      return {                                                                                                         // 207
        top: rect.top + $document.scrollTop(),                                                                         // 208
        left: rect.left + $document.scrollLeft(),                                                                      // 209
        width: rect.right - rect.left,                                                                                 // 210
        height: rect.bottom - rect.top                                                                                 // 211
      };                                                                                                               // 212
    };                                                                                                                 // 213
                                                                                                                       // 214
    /**                                                                                                                // 215
     * returns a copy of the object where the keys have become the values and the values the keys.                     // 216
     * @param {Object} obj                                                                                             // 217
     * @return {Object}                                                                                                // 218
     */                                                                                                                // 219
    var invertObject = function (obj) {                                                                                // 220
      var inverted = {};                                                                                               // 221
      for (var key in obj) {                                                                                           // 222
        if (obj.hasOwnProperty(key)) {                                                                                 // 223
          inverted[obj[key]] = key;                                                                                    // 224
        }                                                                                                              // 225
      }                                                                                                                // 226
      return inverted;                                                                                                 // 227
    };                                                                                                                 // 228
                                                                                                                       // 229
    /**                                                                                                                // 230
     * @param {String} namespace                                                                                       // 231
     * @param {String} [prefix]                                                                                        // 232
     * @return {String}                                                                                                // 233
     */                                                                                                                // 234
    var namespaceToCamel = function (namespace, prefix) {                                                              // 235
      prefix = prefix || '';                                                                                           // 236
      return prefix + namespace.split('.').map(function (name) {                                                       // 237
        return name.substring(0, 1).toUpperCase() + name.substring(1);                                                 // 238
      }).join('');                                                                                                     // 239
    };                                                                                                                 // 240
                                                                                                                       // 241
    return {                                                                                                           // 242
      eq: eq,                                                                                                          // 243
      eq2: eq2,                                                                                                        // 244
      peq2: peq2,                                                                                                      // 245
      ok: ok,                                                                                                          // 246
      fail: fail,                                                                                                      // 247
      self: self,                                                                                                      // 248
      not: not,                                                                                                        // 249
      and: and,                                                                                                        // 250
      uniqueId: uniqueId,                                                                                              // 251
      rect2bnd: rect2bnd,                                                                                              // 252
      invertObject: invertObject,                                                                                      // 253
      namespaceToCamel: namespaceToCamel                                                                               // 254
    };                                                                                                                 // 255
  })();                                                                                                                // 256
                                                                                                                       // 257
  /**                                                                                                                  // 258
   * @class core.list                                                                                                  // 259
   *                                                                                                                   // 260
   * list utils                                                                                                        // 261
   *                                                                                                                   // 262
   * @singleton                                                                                                        // 263
   * @alternateClassName list                                                                                          // 264
   */                                                                                                                  // 265
  var list = (function () {                                                                                            // 266
    /**                                                                                                                // 267
     * returns the first item of an array.                                                                             // 268
     *                                                                                                                 // 269
     * @param {Array} array                                                                                            // 270
     */                                                                                                                // 271
    var head = function (array) {                                                                                      // 272
      return array[0];                                                                                                 // 273
    };                                                                                                                 // 274
                                                                                                                       // 275
    /**                                                                                                                // 276
     * returns the last item of an array.                                                                              // 277
     *                                                                                                                 // 278
     * @param {Array} array                                                                                            // 279
     */                                                                                                                // 280
    var last = function (array) {                                                                                      // 281
      return array[array.length - 1];                                                                                  // 282
    };                                                                                                                 // 283
                                                                                                                       // 284
    /**                                                                                                                // 285
     * returns everything but the last entry of the array.                                                             // 286
     *                                                                                                                 // 287
     * @param {Array} array                                                                                            // 288
     */                                                                                                                // 289
    var initial = function (array) {                                                                                   // 290
      return array.slice(0, array.length - 1);                                                                         // 291
    };                                                                                                                 // 292
                                                                                                                       // 293
    /**                                                                                                                // 294
     * returns the rest of the items in an array.                                                                      // 295
     *                                                                                                                 // 296
     * @param {Array} array                                                                                            // 297
     */                                                                                                                // 298
    var tail = function (array) {                                                                                      // 299
      return array.slice(1);                                                                                           // 300
    };                                                                                                                 // 301
                                                                                                                       // 302
    /**                                                                                                                // 303
     * returns item of array                                                                                           // 304
     */                                                                                                                // 305
    var find = function (array, pred) {                                                                                // 306
      for (var idx = 0, len = array.length; idx < len; idx ++) {                                                       // 307
        var item = array[idx];                                                                                         // 308
        if (pred(item)) {                                                                                              // 309
          return item;                                                                                                 // 310
        }                                                                                                              // 311
      }                                                                                                                // 312
    };                                                                                                                 // 313
                                                                                                                       // 314
    /**                                                                                                                // 315
     * returns true if all of the values in the array pass the predicate truth test.                                   // 316
     */                                                                                                                // 317
    var all = function (array, pred) {                                                                                 // 318
      for (var idx = 0, len = array.length; idx < len; idx ++) {                                                       // 319
        if (!pred(array[idx])) {                                                                                       // 320
          return false;                                                                                                // 321
        }                                                                                                              // 322
      }                                                                                                                // 323
      return true;                                                                                                     // 324
    };                                                                                                                 // 325
                                                                                                                       // 326
    /**                                                                                                                // 327
     * returns true if the value is present in the list.                                                               // 328
     */                                                                                                                // 329
    var contains = function (array, item) {                                                                            // 330
      return $.inArray(item, array) !== -1;                                                                            // 331
    };                                                                                                                 // 332
                                                                                                                       // 333
    /**                                                                                                                // 334
     * get sum from a list                                                                                             // 335
     *                                                                                                                 // 336
     * @param {Array} array - array                                                                                    // 337
     * @param {Function} fn - iterator                                                                                 // 338
     */                                                                                                                // 339
    var sum = function (array, fn) {                                                                                   // 340
      fn = fn || func.self;                                                                                            // 341
      return array.reduce(function (memo, v) {                                                                         // 342
        return memo + fn(v);                                                                                           // 343
      }, 0);                                                                                                           // 344
    };                                                                                                                 // 345
                                                                                                                       // 346
    /**                                                                                                                // 347
     * returns a copy of the collection with array type.                                                               // 348
     * @param {Collection} collection - collection eg) node.childNodes, ...                                            // 349
     */                                                                                                                // 350
    var from = function (collection) {                                                                                 // 351
      var result = [], idx = -1, length = collection.length;                                                           // 352
      while (++idx < length) {                                                                                         // 353
        result[idx] = collection[idx];                                                                                 // 354
      }                                                                                                                // 355
      return result;                                                                                                   // 356
    };                                                                                                                 // 357
                                                                                                                       // 358
    /**                                                                                                                // 359
     * cluster elements by predicate function.                                                                         // 360
     *                                                                                                                 // 361
     * @param {Array} array - array                                                                                    // 362
     * @param {Function} fn - predicate function for cluster rule                                                      // 363
     * @param {Array[]}                                                                                                // 364
     */                                                                                                                // 365
    var clusterBy = function (array, fn) {                                                                             // 366
      if (!array.length) { return []; }                                                                                // 367
      var aTail = tail(array);                                                                                         // 368
      return aTail.reduce(function (memo, v) {                                                                         // 369
        var aLast = last(memo);                                                                                        // 370
        if (fn(last(aLast), v)) {                                                                                      // 371
          aLast[aLast.length] = v;                                                                                     // 372
        } else {                                                                                                       // 373
          memo[memo.length] = [v];                                                                                     // 374
        }                                                                                                              // 375
        return memo;                                                                                                   // 376
      }, [[head(array)]]);                                                                                             // 377
    };                                                                                                                 // 378
                                                                                                                       // 379
    /**                                                                                                                // 380
     * returns a copy of the array with all falsy values removed                                                       // 381
     *                                                                                                                 // 382
     * @param {Array} array - array                                                                                    // 383
     * @param {Function} fn - predicate function for cluster rule                                                      // 384
     */                                                                                                                // 385
    var compact = function (array) {                                                                                   // 386
      var aResult = [];                                                                                                // 387
      for (var idx = 0, len = array.length; idx < len; idx ++) {                                                       // 388
        if (array[idx]) { aResult.push(array[idx]); }                                                                  // 389
      }                                                                                                                // 390
      return aResult;                                                                                                  // 391
    };                                                                                                                 // 392
                                                                                                                       // 393
    /**                                                                                                                // 394
     * produces a duplicate-free version of the array                                                                  // 395
     *                                                                                                                 // 396
     * @param {Array} array                                                                                            // 397
     */                                                                                                                // 398
    var unique = function (array) {                                                                                    // 399
      var results = [];                                                                                                // 400
                                                                                                                       // 401
      for (var idx = 0, len = array.length; idx < len; idx ++) {                                                       // 402
        if (!contains(results, array[idx])) {                                                                          // 403
          results.push(array[idx]);                                                                                    // 404
        }                                                                                                              // 405
      }                                                                                                                // 406
                                                                                                                       // 407
      return results;                                                                                                  // 408
    };                                                                                                                 // 409
                                                                                                                       // 410
    /**                                                                                                                // 411
     * returns next item.                                                                                              // 412
     * @param {Array} array                                                                                            // 413
     */                                                                                                                // 414
    var next = function (array, item) {                                                                                // 415
      var idx = array.indexOf(item);                                                                                   // 416
      if (idx === -1) { return null; }                                                                                 // 417
                                                                                                                       // 418
      return array[idx + 1];                                                                                           // 419
    };                                                                                                                 // 420
                                                                                                                       // 421
    /**                                                                                                                // 422
     * returns prev item.                                                                                              // 423
     * @param {Array} array                                                                                            // 424
     */                                                                                                                // 425
    var prev = function (array, item) {                                                                                // 426
      var idx = array.indexOf(item);                                                                                   // 427
      if (idx === -1) { return null; }                                                                                 // 428
                                                                                                                       // 429
      return array[idx - 1];                                                                                           // 430
    };                                                                                                                 // 431
                                                                                                                       // 432
                                                                                                                       // 433
    return { head: head, last: last, initial: initial, tail: tail,                                                     // 434
             prev: prev, next: next, find: find, contains: contains,                                                   // 435
             all: all, sum: sum, from: from,                                                                           // 436
             clusterBy: clusterBy, compact: compact, unique: unique };                                                 // 437
  })();                                                                                                                // 438
                                                                                                                       // 439
                                                                                                                       // 440
  var NBSP_CHAR = String.fromCharCode(160);                                                                            // 441
  var ZERO_WIDTH_NBSP_CHAR = '\ufeff';                                                                                 // 442
                                                                                                                       // 443
  /**                                                                                                                  // 444
   * @class core.dom                                                                                                   // 445
   *                                                                                                                   // 446
   * Dom functions                                                                                                     // 447
   *                                                                                                                   // 448
   * @singleton                                                                                                        // 449
   * @alternateClassName dom                                                                                           // 450
   */                                                                                                                  // 451
  var dom = (function () {                                                                                             // 452
    /**                                                                                                                // 453
     * @method isEditable                                                                                              // 454
     *                                                                                                                 // 455
     * returns whether node is `note-editable` or not.                                                                 // 456
     *                                                                                                                 // 457
     * @param {Node} node                                                                                              // 458
     * @return {Boolean}                                                                                               // 459
     */                                                                                                                // 460
    var isEditable = function (node) {                                                                                 // 461
      return node && $(node).hasClass('note-editable');                                                                // 462
    };                                                                                                                 // 463
                                                                                                                       // 464
    /**                                                                                                                // 465
     * @method isControlSizing                                                                                         // 466
     *                                                                                                                 // 467
     * returns whether node is `note-control-sizing` or not.                                                           // 468
     *                                                                                                                 // 469
     * @param {Node} node                                                                                              // 470
     * @return {Boolean}                                                                                               // 471
     */                                                                                                                // 472
    var isControlSizing = function (node) {                                                                            // 473
      return node && $(node).hasClass('note-control-sizing');                                                          // 474
    };                                                                                                                 // 475
                                                                                                                       // 476
    /**                                                                                                                // 477
     * @method  buildLayoutInfo                                                                                        // 478
     *                                                                                                                 // 479
     * build layoutInfo from $editor(.note-editor)                                                                     // 480
     *                                                                                                                 // 481
     * @param {jQuery} $editor                                                                                         // 482
     * @return {Object}                                                                                                // 483
     * @return {Function} return.editor                                                                                // 484
     * @return {Node} return.dropzone                                                                                  // 485
     * @return {Node} return.toolbar                                                                                   // 486
     * @return {Node} return.editable                                                                                  // 487
     * @return {Node} return.codable                                                                                   // 488
     * @return {Node} return.popover                                                                                   // 489
     * @return {Node} return.handle                                                                                    // 490
     * @return {Node} return.dialog                                                                                    // 491
     */                                                                                                                // 492
    var buildLayoutInfo = function ($editor) {                                                                         // 493
      var makeFinder;                                                                                                  // 494
                                                                                                                       // 495
      // air mode                                                                                                      // 496
      if ($editor.hasClass('note-air-editor')) {                                                                       // 497
        var id = list.last($editor.attr('id').split('-'));                                                             // 498
        makeFinder = function (sIdPrefix) {                                                                            // 499
          return function () { return $(sIdPrefix + id); };                                                            // 500
        };                                                                                                             // 501
                                                                                                                       // 502
        return {                                                                                                       // 503
          editor: function () { return $editor; },                                                                     // 504
          holder : function () { return $editor.data('holder'); },                                                     // 505
          editable: function () { return $editor; },                                                                   // 506
          popover: makeFinder('#note-popover-'),                                                                       // 507
          handle: makeFinder('#note-handle-'),                                                                         // 508
          dialog: makeFinder('#note-dialog-')                                                                          // 509
        };                                                                                                             // 510
                                                                                                                       // 511
        // frame mode                                                                                                  // 512
      } else {                                                                                                         // 513
        makeFinder = function (sClassName) {                                                                           // 514
          return function () { return $editor.find(sClassName); };                                                     // 515
        };                                                                                                             // 516
        return {                                                                                                       // 517
          editor: function () { return $editor; },                                                                     // 518
          holder : function () { return $editor.data('holder'); },                                                     // 519
          dropzone: makeFinder('.note-dropzone'),                                                                      // 520
          toolbar: makeFinder('.note-toolbar'),                                                                        // 521
          editable: makeFinder('.note-editable'),                                                                      // 522
          codable: makeFinder('.note-codable'),                                                                        // 523
          statusbar: makeFinder('.note-statusbar'),                                                                    // 524
          popover: makeFinder('.note-popover'),                                                                        // 525
          handle: makeFinder('.note-handle'),                                                                          // 526
          dialog: makeFinder('.note-dialog')                                                                           // 527
        };                                                                                                             // 528
      }                                                                                                                // 529
    };                                                                                                                 // 530
                                                                                                                       // 531
    /**                                                                                                                // 532
     * returns makeLayoutInfo from editor's descendant node.                                                           // 533
     *                                                                                                                 // 534
     * @private                                                                                                        // 535
     * @param {Node} descendant                                                                                        // 536
     * @return {Object}                                                                                                // 537
     */                                                                                                                // 538
    var makeLayoutInfo = function (descendant) {                                                                       // 539
      var $target = $(descendant).closest('.note-editor, .note-air-editor, .note-air-layout');                         // 540
                                                                                                                       // 541
      if (!$target.length) {                                                                                           // 542
        return null;                                                                                                   // 543
      }                                                                                                                // 544
                                                                                                                       // 545
      var $editor;                                                                                                     // 546
      if ($target.is('.note-editor, .note-air-editor')) {                                                              // 547
        $editor = $target;                                                                                             // 548
      } else {                                                                                                         // 549
        $editor = $('#note-editor-' + list.last($target.attr('id').split('-')));                                       // 550
      }                                                                                                                // 551
                                                                                                                       // 552
      return buildLayoutInfo($editor);                                                                                 // 553
    };                                                                                                                 // 554
                                                                                                                       // 555
    /**                                                                                                                // 556
     * @method makePredByNodeName                                                                                      // 557
     *                                                                                                                 // 558
     * returns predicate which judge whether nodeName is same                                                          // 559
     *                                                                                                                 // 560
     * @param {String} nodeName                                                                                        // 561
     * @return {Function}                                                                                              // 562
     */                                                                                                                // 563
    var makePredByNodeName = function (nodeName) {                                                                     // 564
      nodeName = nodeName.toUpperCase();                                                                               // 565
      return function (node) {                                                                                         // 566
        return node && node.nodeName.toUpperCase() === nodeName;                                                       // 567
      };                                                                                                               // 568
    };                                                                                                                 // 569
                                                                                                                       // 570
    /**                                                                                                                // 571
     * @method isText                                                                                                  // 572
     *                                                                                                                 // 573
     *                                                                                                                 // 574
     *                                                                                                                 // 575
     * @param {Node} node                                                                                              // 576
     * @return {Boolean} true if node's type is text(3)                                                                // 577
     */                                                                                                                // 578
    var isText = function (node) {                                                                                     // 579
      return node && node.nodeType === 3;                                                                              // 580
    };                                                                                                                 // 581
                                                                                                                       // 582
    /**                                                                                                                // 583
     * ex) br, col, embed, hr, img, input, ...                                                                         // 584
     * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements                                     // 585
     */                                                                                                                // 586
    var isVoid = function (node) {                                                                                     // 587
      return node && /^BR|^IMG|^HR/.test(node.nodeName.toUpperCase());                                                 // 588
    };                                                                                                                 // 589
                                                                                                                       // 590
    var isPara = function (node) {                                                                                     // 591
      if (isEditable(node)) {                                                                                          // 592
        return false;                                                                                                  // 593
      }                                                                                                                // 594
                                                                                                                       // 595
      // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph                                                              // 596
      return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());                                          // 597
    };                                                                                                                 // 598
                                                                                                                       // 599
    var isLi = makePredByNodeName('LI');                                                                               // 600
                                                                                                                       // 601
    var isPurePara = function (node) {                                                                                 // 602
      return isPara(node) && !isLi(node);                                                                              // 603
    };                                                                                                                 // 604
                                                                                                                       // 605
    var isTable = makePredByNodeName('TABLE');                                                                         // 606
                                                                                                                       // 607
    var isInline = function (node) {                                                                                   // 608
      return !isBodyContainer(node) &&                                                                                 // 609
             !isList(node) &&                                                                                          // 610
             !isPara(node) &&                                                                                          // 611
             !isTable(node) &&                                                                                         // 612
             !isBlockquote(node);                                                                                      // 613
    };                                                                                                                 // 614
                                                                                                                       // 615
    var isList = function (node) {                                                                                     // 616
      return node && /^UL|^OL/.test(node.nodeName.toUpperCase());                                                      // 617
    };                                                                                                                 // 618
                                                                                                                       // 619
    var isCell = function (node) {                                                                                     // 620
      return node && /^TD|^TH/.test(node.nodeName.toUpperCase());                                                      // 621
    };                                                                                                                 // 622
                                                                                                                       // 623
    var isBlockquote = makePredByNodeName('BLOCKQUOTE');                                                               // 624
                                                                                                                       // 625
    var isBodyContainer = function (node) {                                                                            // 626
      return isCell(node) || isBlockquote(node) || isEditable(node);                                                   // 627
    };                                                                                                                 // 628
                                                                                                                       // 629
    var isAnchor = makePredByNodeName('A');                                                                            // 630
                                                                                                                       // 631
    var isParaInline = function (node) {                                                                               // 632
      return isInline(node) && !!ancestor(node, isPara);                                                               // 633
    };                                                                                                                 // 634
                                                                                                                       // 635
    var isBodyInline = function (node) {                                                                               // 636
      return isInline(node) && !ancestor(node, isPara);                                                                // 637
    };                                                                                                                 // 638
                                                                                                                       // 639
    var isBody = makePredByNodeName('BODY');                                                                           // 640
                                                                                                                       // 641
    /**                                                                                                                // 642
     * returns whether nodeB is closest sibling of nodeA                                                               // 643
     *                                                                                                                 // 644
     * @param {Node} nodeA                                                                                             // 645
     * @param {Node} nodeB                                                                                             // 646
     * @return {Boolean}                                                                                               // 647
     */                                                                                                                // 648
    var isClosestSibling = function (nodeA, nodeB) {                                                                   // 649
      return nodeA.nextSibling === nodeB ||                                                                            // 650
             nodeA.previousSibling === nodeB;                                                                          // 651
    };                                                                                                                 // 652
                                                                                                                       // 653
    /**                                                                                                                // 654
     * returns array of closest siblings with node                                                                     // 655
     *                                                                                                                 // 656
     * @param {Node} node                                                                                              // 657
     * @param {function} [pred] - predicate function                                                                   // 658
     * @return {Node[]}                                                                                                // 659
     */                                                                                                                // 660
    var withClosestSiblings = function (node, pred) {                                                                  // 661
      pred = pred || func.ok;                                                                                          // 662
                                                                                                                       // 663
      var siblings = [];                                                                                               // 664
      if (node.previousSibling && pred(node.previousSibling)) {                                                        // 665
        siblings.push(node.previousSibling);                                                                           // 666
      }                                                                                                                // 667
      siblings.push(node);                                                                                             // 668
      if (node.nextSibling && pred(node.nextSibling)) {                                                                // 669
        siblings.push(node.nextSibling);                                                                               // 670
      }                                                                                                                // 671
      return siblings;                                                                                                 // 672
    };                                                                                                                 // 673
                                                                                                                       // 674
    /**                                                                                                                // 675
     * blank HTML for cursor position                                                                                  // 676
     * - [workaround] for MSIE IE doesn't works with bogus br                                                          // 677
     */                                                                                                                // 678
    var blankHTML = agent.isMSIE ? '&nbsp;' : '<br>';                                                                  // 679
                                                                                                                       // 680
    /**                                                                                                                // 681
     * @method nodeLength                                                                                              // 682
     *                                                                                                                 // 683
     * returns #text's text size or element's childNodes size                                                          // 684
     *                                                                                                                 // 685
     * @param {Node} node                                                                                              // 686
     */                                                                                                                // 687
    var nodeLength = function (node) {                                                                                 // 688
      if (isText(node)) {                                                                                              // 689
        return node.nodeValue.length;                                                                                  // 690
      }                                                                                                                // 691
                                                                                                                       // 692
      return node.childNodes.length;                                                                                   // 693
    };                                                                                                                 // 694
                                                                                                                       // 695
    /**                                                                                                                // 696
     * returns whether node is empty or not.                                                                           // 697
     *                                                                                                                 // 698
     * @param {Node} node                                                                                              // 699
     * @return {Boolean}                                                                                               // 700
     */                                                                                                                // 701
    var isEmpty = function (node) {                                                                                    // 702
      var len = nodeLength(node);                                                                                      // 703
                                                                                                                       // 704
      if (len === 0) {                                                                                                 // 705
        return true;                                                                                                   // 706
      } else if (!dom.isText(node) && len === 1 && node.innerHTML === blankHTML) {                                     // 707
        // ex) <p><br></p>, <span><br></span>                                                                          // 708
        return true;                                                                                                   // 709
      }                                                                                                                // 710
                                                                                                                       // 711
      return false;                                                                                                    // 712
    };                                                                                                                 // 713
                                                                                                                       // 714
    /**                                                                                                                // 715
     * padding blankHTML if node is empty (for cursor position)                                                        // 716
     */                                                                                                                // 717
    var paddingBlankHTML = function (node) {                                                                           // 718
      if (!isVoid(node) && !nodeLength(node)) {                                                                        // 719
        node.innerHTML = blankHTML;                                                                                    // 720
      }                                                                                                                // 721
    };                                                                                                                 // 722
                                                                                                                       // 723
    /**                                                                                                                // 724
     * find nearest ancestor predicate hit                                                                             // 725
     *                                                                                                                 // 726
     * @param {Node} node                                                                                              // 727
     * @param {Function} pred - predicate function                                                                     // 728
     */                                                                                                                // 729
    var ancestor = function (node, pred) {                                                                             // 730
      while (node) {                                                                                                   // 731
        if (pred(node)) { return node; }                                                                               // 732
        if (isEditable(node)) { break; }                                                                               // 733
                                                                                                                       // 734
        node = node.parentNode;                                                                                        // 735
      }                                                                                                                // 736
      return null;                                                                                                     // 737
    };                                                                                                                 // 738
                                                                                                                       // 739
    /**                                                                                                                // 740
     * find nearest ancestor only single child blood line and predicate hit                                            // 741
     *                                                                                                                 // 742
     * @param {Node} node                                                                                              // 743
     * @param {Function} pred - predicate function                                                                     // 744
     */                                                                                                                // 745
    var singleChildAncestor = function (node, pred) {                                                                  // 746
      node = node.parentNode;                                                                                          // 747
                                                                                                                       // 748
      while (node) {                                                                                                   // 749
        if (nodeLength(node) !== 1) { break; }                                                                         // 750
        if (pred(node)) { return node; }                                                                               // 751
        if (isEditable(node)) { break; }                                                                               // 752
                                                                                                                       // 753
        node = node.parentNode;                                                                                        // 754
      }                                                                                                                // 755
      return null;                                                                                                     // 756
    };                                                                                                                 // 757
                                                                                                                       // 758
    /**                                                                                                                // 759
     * returns new array of ancestor nodes (until predicate hit).                                                      // 760
     *                                                                                                                 // 761
     * @param {Node} node                                                                                              // 762
     * @param {Function} [optional] pred - predicate function                                                          // 763
     */                                                                                                                // 764
    var listAncestor = function (node, pred) {                                                                         // 765
      pred = pred || func.fail;                                                                                        // 766
                                                                                                                       // 767
      var ancestors = [];                                                                                              // 768
      ancestor(node, function (el) {                                                                                   // 769
        if (!isEditable(el)) {                                                                                         // 770
          ancestors.push(el);                                                                                          // 771
        }                                                                                                              // 772
                                                                                                                       // 773
        return pred(el);                                                                                               // 774
      });                                                                                                              // 775
      return ancestors;                                                                                                // 776
    };                                                                                                                 // 777
                                                                                                                       // 778
    /**                                                                                                                // 779
     * find farthest ancestor predicate hit                                                                            // 780
     */                                                                                                                // 781
    var lastAncestor = function (node, pred) {                                                                         // 782
      var ancestors = listAncestor(node);                                                                              // 783
      return list.last(ancestors.filter(pred));                                                                        // 784
    };                                                                                                                 // 785
                                                                                                                       // 786
    /**                                                                                                                // 787
     * returns common ancestor node between two nodes.                                                                 // 788
     *                                                                                                                 // 789
     * @param {Node} nodeA                                                                                             // 790
     * @param {Node} nodeB                                                                                             // 791
     */                                                                                                                // 792
    var commonAncestor = function (nodeA, nodeB) {                                                                     // 793
      var ancestors = listAncestor(nodeA);                                                                             // 794
      for (var n = nodeB; n; n = n.parentNode) {                                                                       // 795
        if ($.inArray(n, ancestors) > -1) { return n; }                                                                // 796
      }                                                                                                                // 797
      return null; // difference document area                                                                         // 798
    };                                                                                                                 // 799
                                                                                                                       // 800
    /**                                                                                                                // 801
     * listing all previous siblings (until predicate hit).                                                            // 802
     *                                                                                                                 // 803
     * @param {Node} node                                                                                              // 804
     * @param {Function} [optional] pred - predicate function                                                          // 805
     */                                                                                                                // 806
    var listPrev = function (node, pred) {                                                                             // 807
      pred = pred || func.fail;                                                                                        // 808
                                                                                                                       // 809
      var nodes = [];                                                                                                  // 810
      while (node) {                                                                                                   // 811
        if (pred(node)) { break; }                                                                                     // 812
        nodes.push(node);                                                                                              // 813
        node = node.previousSibling;                                                                                   // 814
      }                                                                                                                // 815
      return nodes;                                                                                                    // 816
    };                                                                                                                 // 817
                                                                                                                       // 818
    /**                                                                                                                // 819
     * listing next siblings (until predicate hit).                                                                    // 820
     *                                                                                                                 // 821
     * @param {Node} node                                                                                              // 822
     * @param {Function} [pred] - predicate function                                                                   // 823
     */                                                                                                                // 824
    var listNext = function (node, pred) {                                                                             // 825
      pred = pred || func.fail;                                                                                        // 826
                                                                                                                       // 827
      var nodes = [];                                                                                                  // 828
      while (node) {                                                                                                   // 829
        if (pred(node)) { break; }                                                                                     // 830
        nodes.push(node);                                                                                              // 831
        node = node.nextSibling;                                                                                       // 832
      }                                                                                                                // 833
      return nodes;                                                                                                    // 834
    };                                                                                                                 // 835
                                                                                                                       // 836
    /**                                                                                                                // 837
     * listing descendant nodes                                                                                        // 838
     *                                                                                                                 // 839
     * @param {Node} node                                                                                              // 840
     * @param {Function} [pred] - predicate function                                                                   // 841
     */                                                                                                                // 842
    var listDescendant = function (node, pred) {                                                                       // 843
      var descendents = [];                                                                                            // 844
      pred = pred || func.ok;                                                                                          // 845
                                                                                                                       // 846
      // start DFS(depth first search) with node                                                                       // 847
      (function fnWalk(current) {                                                                                      // 848
        if (node !== current && pred(current)) {                                                                       // 849
          descendents.push(current);                                                                                   // 850
        }                                                                                                              // 851
        for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {                                         // 852
          fnWalk(current.childNodes[idx]);                                                                             // 853
        }                                                                                                              // 854
      })(node);                                                                                                        // 855
                                                                                                                       // 856
      return descendents;                                                                                              // 857
    };                                                                                                                 // 858
                                                                                                                       // 859
    /**                                                                                                                // 860
     * wrap node with new tag.                                                                                         // 861
     *                                                                                                                 // 862
     * @param {Node} node                                                                                              // 863
     * @param {Node} tagName of wrapper                                                                                // 864
     * @return {Node} - wrapper                                                                                        // 865
     */                                                                                                                // 866
    var wrap = function (node, wrapperName) {                                                                          // 867
      var parent = node.parentNode;                                                                                    // 868
      var wrapper = $('<' + wrapperName + '>')[0];                                                                     // 869
                                                                                                                       // 870
      parent.insertBefore(wrapper, node);                                                                              // 871
      wrapper.appendChild(node);                                                                                       // 872
                                                                                                                       // 873
      return wrapper;                                                                                                  // 874
    };                                                                                                                 // 875
                                                                                                                       // 876
    /**                                                                                                                // 877
     * insert node after preceding                                                                                     // 878
     *                                                                                                                 // 879
     * @param {Node} node                                                                                              // 880
     * @param {Node} preceding - predicate function                                                                    // 881
     */                                                                                                                // 882
    var insertAfter = function (node, preceding) {                                                                     // 883
      var next = preceding.nextSibling, parent = preceding.parentNode;                                                 // 884
      if (next) {                                                                                                      // 885
        parent.insertBefore(node, next);                                                                               // 886
      } else {                                                                                                         // 887
        parent.appendChild(node);                                                                                      // 888
      }                                                                                                                // 889
      return node;                                                                                                     // 890
    };                                                                                                                 // 891
                                                                                                                       // 892
    /**                                                                                                                // 893
     * append elements.                                                                                                // 894
     *                                                                                                                 // 895
     * @param {Node} node                                                                                              // 896
     * @param {Collection} aChild                                                                                      // 897
     */                                                                                                                // 898
    var appendChildNodes = function (node, aChild) {                                                                   // 899
      $.each(aChild, function (idx, child) {                                                                           // 900
        node.appendChild(child);                                                                                       // 901
      });                                                                                                              // 902
      return node;                                                                                                     // 903
    };                                                                                                                 // 904
                                                                                                                       // 905
    /**                                                                                                                // 906
     * returns whether boundaryPoint is left edge or not.                                                              // 907
     *                                                                                                                 // 908
     * @param {BoundaryPoint} point                                                                                    // 909
     * @return {Boolean}                                                                                               // 910
     */                                                                                                                // 911
    var isLeftEdgePoint = function (point) {                                                                           // 912
      return point.offset === 0;                                                                                       // 913
    };                                                                                                                 // 914
                                                                                                                       // 915
    /**                                                                                                                // 916
     * returns whether boundaryPoint is right edge or not.                                                             // 917
     *                                                                                                                 // 918
     * @param {BoundaryPoint} point                                                                                    // 919
     * @return {Boolean}                                                                                               // 920
     */                                                                                                                // 921
    var isRightEdgePoint = function (point) {                                                                          // 922
      return point.offset === nodeLength(point.node);                                                                  // 923
    };                                                                                                                 // 924
                                                                                                                       // 925
    /**                                                                                                                // 926
     * returns whether boundaryPoint is edge or not.                                                                   // 927
     *                                                                                                                 // 928
     * @param {BoundaryPoint} point                                                                                    // 929
     * @return {Boolean}                                                                                               // 930
     */                                                                                                                // 931
    var isEdgePoint = function (point) {                                                                               // 932
      return isLeftEdgePoint(point) || isRightEdgePoint(point);                                                        // 933
    };                                                                                                                 // 934
                                                                                                                       // 935
    /**                                                                                                                // 936
     * returns wheter node is left edge of ancestor or not.                                                            // 937
     *                                                                                                                 // 938
     * @param {Node} node                                                                                              // 939
     * @param {Node} ancestor                                                                                          // 940
     * @return {Boolean}                                                                                               // 941
     */                                                                                                                // 942
    var isLeftEdgeOf = function (node, ancestor) {                                                                     // 943
      while (node && node !== ancestor) {                                                                              // 944
        if (position(node) !== 0) {                                                                                    // 945
          return false;                                                                                                // 946
        }                                                                                                              // 947
        node = node.parentNode;                                                                                        // 948
      }                                                                                                                // 949
                                                                                                                       // 950
      return true;                                                                                                     // 951
    };                                                                                                                 // 952
                                                                                                                       // 953
    /**                                                                                                                // 954
     * returns whether node is right edge of ancestor or not.                                                          // 955
     *                                                                                                                 // 956
     * @param {Node} node                                                                                              // 957
     * @param {Node} ancestor                                                                                          // 958
     * @return {Boolean}                                                                                               // 959
     */                                                                                                                // 960
    var isRightEdgeOf = function (node, ancestor) {                                                                    // 961
      while (node && node !== ancestor) {                                                                              // 962
        if (position(node) !== nodeLength(node.parentNode) - 1) {                                                      // 963
          return false;                                                                                                // 964
        }                                                                                                              // 965
        node = node.parentNode;                                                                                        // 966
      }                                                                                                                // 967
                                                                                                                       // 968
      return true;                                                                                                     // 969
    };                                                                                                                 // 970
                                                                                                                       // 971
    /**                                                                                                                // 972
     * returns offset from parent.                                                                                     // 973
     *                                                                                                                 // 974
     * @param {Node} node                                                                                              // 975
     */                                                                                                                // 976
    var position = function (node) {                                                                                   // 977
      var offset = 0;                                                                                                  // 978
      while ((node = node.previousSibling)) {                                                                          // 979
        offset += 1;                                                                                                   // 980
      }                                                                                                                // 981
      return offset;                                                                                                   // 982
    };                                                                                                                 // 983
                                                                                                                       // 984
    var hasChildren = function (node) {                                                                                // 985
      return !!(node && node.childNodes && node.childNodes.length);                                                    // 986
    };                                                                                                                 // 987
                                                                                                                       // 988
    /**                                                                                                                // 989
     * returns previous boundaryPoint                                                                                  // 990
     *                                                                                                                 // 991
     * @param {BoundaryPoint} point                                                                                    // 992
     * @param {Boolean} isSkipInnerOffset                                                                              // 993
     * @return {BoundaryPoint}                                                                                         // 994
     */                                                                                                                // 995
    var prevPoint = function (point, isSkipInnerOffset) {                                                              // 996
      var node, offset;                                                                                                // 997
                                                                                                                       // 998
      if (point.offset === 0) {                                                                                        // 999
        if (isEditable(point.node)) {                                                                                  // 1000
          return null;                                                                                                 // 1001
        }                                                                                                              // 1002
                                                                                                                       // 1003
        node = point.node.parentNode;                                                                                  // 1004
        offset = position(point.node);                                                                                 // 1005
      } else if (hasChildren(point.node)) {                                                                            // 1006
        node = point.node.childNodes[point.offset - 1];                                                                // 1007
        offset = nodeLength(node);                                                                                     // 1008
      } else {                                                                                                         // 1009
        node = point.node;                                                                                             // 1010
        offset = isSkipInnerOffset ? 0 : point.offset - 1;                                                             // 1011
      }                                                                                                                // 1012
                                                                                                                       // 1013
      return {                                                                                                         // 1014
        node: node,                                                                                                    // 1015
        offset: offset                                                                                                 // 1016
      };                                                                                                               // 1017
    };                                                                                                                 // 1018
                                                                                                                       // 1019
    /**                                                                                                                // 1020
     * returns next boundaryPoint                                                                                      // 1021
     *                                                                                                                 // 1022
     * @param {BoundaryPoint} point                                                                                    // 1023
     * @param {Boolean} isSkipInnerOffset                                                                              // 1024
     * @return {BoundaryPoint}                                                                                         // 1025
     */                                                                                                                // 1026
    var nextPoint = function (point, isSkipInnerOffset) {                                                              // 1027
      var node, offset;                                                                                                // 1028
                                                                                                                       // 1029
      if (nodeLength(point.node) === point.offset) {                                                                   // 1030
        if (isEditable(point.node)) {                                                                                  // 1031
          return null;                                                                                                 // 1032
        }                                                                                                              // 1033
                                                                                                                       // 1034
        node = point.node.parentNode;                                                                                  // 1035
        offset = position(point.node) + 1;                                                                             // 1036
      } else if (hasChildren(point.node)) {                                                                            // 1037
        node = point.node.childNodes[point.offset];                                                                    // 1038
        offset = 0;                                                                                                    // 1039
      } else {                                                                                                         // 1040
        node = point.node;                                                                                             // 1041
        offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;                                        // 1042
      }                                                                                                                // 1043
                                                                                                                       // 1044
      return {                                                                                                         // 1045
        node: node,                                                                                                    // 1046
        offset: offset                                                                                                 // 1047
      };                                                                                                               // 1048
    };                                                                                                                 // 1049
                                                                                                                       // 1050
    /**                                                                                                                // 1051
     * returns whether pointA and pointB is same or not.                                                               // 1052
     *                                                                                                                 // 1053
     * @param {BoundaryPoint} pointA                                                                                   // 1054
     * @param {BoundaryPoint} pointB                                                                                   // 1055
     * @return {Boolean}                                                                                               // 1056
     */                                                                                                                // 1057
    var isSamePoint = function (pointA, pointB) {                                                                      // 1058
      return pointA.node === pointB.node && pointA.offset === pointB.offset;                                           // 1059
    };                                                                                                                 // 1060
                                                                                                                       // 1061
    /**                                                                                                                // 1062
     * returns whether point is visible (can set cursor) or not.                                                       // 1063
     *                                                                                                                 // 1064
     * @param {BoundaryPoint} point                                                                                    // 1065
     * @return {Boolean}                                                                                               // 1066
     */                                                                                                                // 1067
    var isVisiblePoint = function (point) {                                                                            // 1068
      if (isText(point.node) || !hasChildren(point.node) || isEmpty(point.node)) {                                     // 1069
        return true;                                                                                                   // 1070
      }                                                                                                                // 1071
                                                                                                                       // 1072
      var leftNode = point.node.childNodes[point.offset - 1];                                                          // 1073
      var rightNode = point.node.childNodes[point.offset];                                                             // 1074
      if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {                                      // 1075
        return true;                                                                                                   // 1076
      }                                                                                                                // 1077
                                                                                                                       // 1078
      return false;                                                                                                    // 1079
    };                                                                                                                 // 1080
                                                                                                                       // 1081
    /**                                                                                                                // 1082
     * @method prevPointUtil                                                                                           // 1083
     *                                                                                                                 // 1084
     * @param {BoundaryPoint} point                                                                                    // 1085
     * @param {Function} pred                                                                                          // 1086
     * @return {BoundaryPoint}                                                                                         // 1087
     */                                                                                                                // 1088
    var prevPointUntil = function (point, pred) {                                                                      // 1089
      while (point) {                                                                                                  // 1090
        if (pred(point)) {                                                                                             // 1091
          return point;                                                                                                // 1092
        }                                                                                                              // 1093
                                                                                                                       // 1094
        point = prevPoint(point);                                                                                      // 1095
      }                                                                                                                // 1096
                                                                                                                       // 1097
      return null;                                                                                                     // 1098
    };                                                                                                                 // 1099
                                                                                                                       // 1100
    /**                                                                                                                // 1101
     * @method nextPointUntil                                                                                          // 1102
     *                                                                                                                 // 1103
     * @param {BoundaryPoint} point                                                                                    // 1104
     * @param {Function} pred                                                                                          // 1105
     * @return {BoundaryPoint}                                                                                         // 1106
     */                                                                                                                // 1107
    var nextPointUntil = function (point, pred) {                                                                      // 1108
      while (point) {                                                                                                  // 1109
        if (pred(point)) {                                                                                             // 1110
          return point;                                                                                                // 1111
        }                                                                                                              // 1112
                                                                                                                       // 1113
        point = nextPoint(point);                                                                                      // 1114
      }                                                                                                                // 1115
                                                                                                                       // 1116
      return null;                                                                                                     // 1117
    };                                                                                                                 // 1118
                                                                                                                       // 1119
    /**                                                                                                                // 1120
     * returns whether point has character or not.                                                                     // 1121
     *                                                                                                                 // 1122
     * @param {Point} point                                                                                            // 1123
     * @return {Boolean}                                                                                               // 1124
     */                                                                                                                // 1125
    var isCharPoint = function (point) {                                                                               // 1126
      if (!isText(point.node)) {                                                                                       // 1127
        return false;                                                                                                  // 1128
      }                                                                                                                // 1129
                                                                                                                       // 1130
      var ch = point.node.nodeValue.charAt(point.offset - 1);                                                          // 1131
      return ch && (ch !== ' ' && ch !== NBSP_CHAR);                                                                   // 1132
    };                                                                                                                 // 1133
                                                                                                                       // 1134
    /**                                                                                                                // 1135
     * @method walkPoint                                                                                               // 1136
     *                                                                                                                 // 1137
     * @param {BoundaryPoint} startPoint                                                                               // 1138
     * @param {BoundaryPoint} endPoint                                                                                 // 1139
     * @param {Function} handler                                                                                       // 1140
     * @param {Boolean} isSkipInnerOffset                                                                              // 1141
     */                                                                                                                // 1142
    var walkPoint = function (startPoint, endPoint, handler, isSkipInnerOffset) {                                      // 1143
      var point = startPoint;                                                                                          // 1144
                                                                                                                       // 1145
      while (point) {                                                                                                  // 1146
        handler(point);                                                                                                // 1147
                                                                                                                       // 1148
        if (isSamePoint(point, endPoint)) {                                                                            // 1149
          break;                                                                                                       // 1150
        }                                                                                                              // 1151
                                                                                                                       // 1152
        var isSkipOffset = isSkipInnerOffset &&                                                                        // 1153
                           startPoint.node !== point.node &&                                                           // 1154
                           endPoint.node !== point.node;                                                               // 1155
        point = nextPoint(point, isSkipOffset);                                                                        // 1156
      }                                                                                                                // 1157
    };                                                                                                                 // 1158
                                                                                                                       // 1159
    /**                                                                                                                // 1160
     * @method makeOffsetPath                                                                                          // 1161
     *                                                                                                                 // 1162
     * return offsetPath(array of offset) from ancestor                                                                // 1163
     *                                                                                                                 // 1164
     * @param {Node} ancestor - ancestor node                                                                          // 1165
     * @param {Node} node                                                                                              // 1166
     */                                                                                                                // 1167
    var makeOffsetPath = function (ancestor, node) {                                                                   // 1168
      var ancestors = listAncestor(node, func.eq(ancestor));                                                           // 1169
      return $.map(ancestors, position).reverse();                                                                     // 1170
    };                                                                                                                 // 1171
                                                                                                                       // 1172
    /**                                                                                                                // 1173
     * @method fromOffsetPath                                                                                          // 1174
     *                                                                                                                 // 1175
     * return element from offsetPath(array of offset)                                                                 // 1176
     *                                                                                                                 // 1177
     * @param {Node} ancestor - ancestor node                                                                          // 1178
     * @param {array} offsets - offsetPath                                                                             // 1179
     */                                                                                                                // 1180
    var fromOffsetPath = function (ancestor, offsets) {                                                                // 1181
      var current = ancestor;                                                                                          // 1182
      for (var i = 0, len = offsets.length; i < len; i++) {                                                            // 1183
        if (current.childNodes.length <= offsets[i]) {                                                                 // 1184
          current = current.childNodes[current.childNodes.length - 1];                                                 // 1185
        } else {                                                                                                       // 1186
          current = current.childNodes[offsets[i]];                                                                    // 1187
        }                                                                                                              // 1188
      }                                                                                                                // 1189
      return current;                                                                                                  // 1190
    };                                                                                                                 // 1191
                                                                                                                       // 1192
    /**                                                                                                                // 1193
     * @method splitNode                                                                                               // 1194
     *                                                                                                                 // 1195
     * split element or #text                                                                                          // 1196
     *                                                                                                                 // 1197
     * @param {BoundaryPoint} point                                                                                    // 1198
     * @param {Object} [options]                                                                                       // 1199
     * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false                                              // 1200
     * @param {Boolean} [options.isNotSplitEdgePoint] - default: false                                                 // 1201
     * @return {Node} right node of boundaryPoint                                                                      // 1202
     */                                                                                                                // 1203
    var splitNode = function (point, options) {                                                                        // 1204
      var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;                                          // 1205
      var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;                                                // 1206
                                                                                                                       // 1207
      // edge case                                                                                                     // 1208
      if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {                                         // 1209
        if (isLeftEdgePoint(point)) {                                                                                  // 1210
          return point.node;                                                                                           // 1211
        } else if (isRightEdgePoint(point)) {                                                                          // 1212
          return point.node.nextSibling;                                                                               // 1213
        }                                                                                                              // 1214
      }                                                                                                                // 1215
                                                                                                                       // 1216
      // split #text                                                                                                   // 1217
      if (isText(point.node)) {                                                                                        // 1218
        return point.node.splitText(point.offset);                                                                     // 1219
      } else {                                                                                                         // 1220
        var childNode = point.node.childNodes[point.offset];                                                           // 1221
        var clone = insertAfter(point.node.cloneNode(false), point.node);                                              // 1222
        appendChildNodes(clone, listNext(childNode));                                                                  // 1223
                                                                                                                       // 1224
        if (!isSkipPaddingBlankHTML) {                                                                                 // 1225
          paddingBlankHTML(point.node);                                                                                // 1226
          paddingBlankHTML(clone);                                                                                     // 1227
        }                                                                                                              // 1228
                                                                                                                       // 1229
        return clone;                                                                                                  // 1230
      }                                                                                                                // 1231
    };                                                                                                                 // 1232
                                                                                                                       // 1233
    /**                                                                                                                // 1234
     * @method splitTree                                                                                               // 1235
     *                                                                                                                 // 1236
     * split tree by point                                                                                             // 1237
     *                                                                                                                 // 1238
     * @param {Node} root - split root                                                                                 // 1239
     * @param {BoundaryPoint} point                                                                                    // 1240
     * @param {Object} [options]                                                                                       // 1241
     * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false                                              // 1242
     * @param {Boolean} [options.isNotSplitEdgePoint] - default: false                                                 // 1243
     * @return {Node} right node of boundaryPoint                                                                      // 1244
     */                                                                                                                // 1245
    var splitTree = function (root, point, options) {                                                                  // 1246
      // ex) [#text, <span>, <p>]                                                                                      // 1247
      var ancestors = listAncestor(point.node, func.eq(root));                                                         // 1248
                                                                                                                       // 1249
      if (!ancestors.length) {                                                                                         // 1250
        return null;                                                                                                   // 1251
      } else if (ancestors.length === 1) {                                                                             // 1252
        return splitNode(point, options);                                                                              // 1253
      }                                                                                                                // 1254
                                                                                                                       // 1255
      return ancestors.reduce(function (node, parent) {                                                                // 1256
        if (node === point.node) {                                                                                     // 1257
          node = splitNode(point, options);                                                                            // 1258
        }                                                                                                              // 1259
                                                                                                                       // 1260
        return splitNode({                                                                                             // 1261
          node: parent,                                                                                                // 1262
          offset: node ? dom.position(node) : nodeLength(parent)                                                       // 1263
        }, options);                                                                                                   // 1264
      });                                                                                                              // 1265
    };                                                                                                                 // 1266
                                                                                                                       // 1267
    /**                                                                                                                // 1268
     * split point                                                                                                     // 1269
     *                                                                                                                 // 1270
     * @param {Point} point                                                                                            // 1271
     * @param {Boolean} isInline                                                                                       // 1272
     * @return {Object}                                                                                                // 1273
     */                                                                                                                // 1274
    var splitPoint = function (point, isInline) {                                                                      // 1275
      // find splitRoot, container                                                                                     // 1276
      //  - inline: splitRoot is a child of paragraph                                                                  // 1277
      //  - block: splitRoot is a child of bodyContainer                                                               // 1278
      var pred = isInline ? isPara : isBodyContainer;                                                                  // 1279
      var ancestors = listAncestor(point.node, pred);                                                                  // 1280
      var topAncestor = list.last(ancestors) || point.node;                                                            // 1281
                                                                                                                       // 1282
      var splitRoot, container;                                                                                        // 1283
      if (pred(topAncestor)) {                                                                                         // 1284
        splitRoot = ancestors[ancestors.length - 2];                                                                   // 1285
        container = topAncestor;                                                                                       // 1286
      } else {                                                                                                         // 1287
        splitRoot = topAncestor;                                                                                       // 1288
        container = splitRoot.parentNode;                                                                              // 1289
      }                                                                                                                // 1290
                                                                                                                       // 1291
      // if splitRoot is exists, split with splitTree                                                                  // 1292
      var pivot = splitRoot && splitTree(splitRoot, point, {                                                           // 1293
        isSkipPaddingBlankHTML: isInline,                                                                              // 1294
        isNotSplitEdgePoint: isInline                                                                                  // 1295
      });                                                                                                              // 1296
                                                                                                                       // 1297
      // if container is point.node, find pivot with point.offset                                                      // 1298
      if (!pivot && container === point.node) {                                                                        // 1299
        pivot = point.node.childNodes[point.offset];                                                                   // 1300
      }                                                                                                                // 1301
                                                                                                                       // 1302
      return {                                                                                                         // 1303
        rightNode: pivot,                                                                                              // 1304
        container: container                                                                                           // 1305
      };                                                                                                               // 1306
    };                                                                                                                 // 1307
                                                                                                                       // 1308
    var create = function (nodeName) {                                                                                 // 1309
      return document.createElement(nodeName);                                                                         // 1310
    };                                                                                                                 // 1311
                                                                                                                       // 1312
    var createText = function (text) {                                                                                 // 1313
      return document.createTextNode(text);                                                                            // 1314
    };                                                                                                                 // 1315
                                                                                                                       // 1316
    /**                                                                                                                // 1317
     * @method remove                                                                                                  // 1318
     *                                                                                                                 // 1319
     * remove node, (isRemoveChild: remove child or not)                                                               // 1320
     *                                                                                                                 // 1321
     * @param {Node} node                                                                                              // 1322
     * @param {Boolean} isRemoveChild                                                                                  // 1323
     */                                                                                                                // 1324
    var remove = function (node, isRemoveChild) {                                                                      // 1325
      if (!node || !node.parentNode) { return; }                                                                       // 1326
      if (node.removeNode) { return node.removeNode(isRemoveChild); }                                                  // 1327
                                                                                                                       // 1328
      var parent = node.parentNode;                                                                                    // 1329
      if (!isRemoveChild) {                                                                                            // 1330
        var nodes = [];                                                                                                // 1331
        var i, len;                                                                                                    // 1332
        for (i = 0, len = node.childNodes.length; i < len; i++) {                                                      // 1333
          nodes.push(node.childNodes[i]);                                                                              // 1334
        }                                                                                                              // 1335
                                                                                                                       // 1336
        for (i = 0, len = nodes.length; i < len; i++) {                                                                // 1337
          parent.insertBefore(nodes[i], node);                                                                         // 1338
        }                                                                                                              // 1339
      }                                                                                                                // 1340
                                                                                                                       // 1341
      parent.removeChild(node);                                                                                        // 1342
    };                                                                                                                 // 1343
                                                                                                                       // 1344
    /**                                                                                                                // 1345
     * @method removeWhile                                                                                             // 1346
     *                                                                                                                 // 1347
     * @param {Node} node                                                                                              // 1348
     * @param {Function} pred                                                                                          // 1349
     */                                                                                                                // 1350
    var removeWhile = function (node, pred) {                                                                          // 1351
      while (node) {                                                                                                   // 1352
        if (isEditable(node) || !pred(node)) {                                                                         // 1353
          break;                                                                                                       // 1354
        }                                                                                                              // 1355
                                                                                                                       // 1356
        var parent = node.parentNode;                                                                                  // 1357
        remove(node);                                                                                                  // 1358
        node = parent;                                                                                                 // 1359
      }                                                                                                                // 1360
    };                                                                                                                 // 1361
                                                                                                                       // 1362
    /**                                                                                                                // 1363
     * @method replace                                                                                                 // 1364
     *                                                                                                                 // 1365
     * replace node with provided nodeName                                                                             // 1366
     *                                                                                                                 // 1367
     * @param {Node} node                                                                                              // 1368
     * @param {String} nodeName                                                                                        // 1369
     * @return {Node} - new node                                                                                       // 1370
     */                                                                                                                // 1371
    var replace = function (node, nodeName) {                                                                          // 1372
      if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {                                                    // 1373
        return node;                                                                                                   // 1374
      }                                                                                                                // 1375
                                                                                                                       // 1376
      var newNode = create(nodeName);                                                                                  // 1377
                                                                                                                       // 1378
      if (node.style.cssText) {                                                                                        // 1379
        newNode.style.cssText = node.style.cssText;                                                                    // 1380
      }                                                                                                                // 1381
                                                                                                                       // 1382
      appendChildNodes(newNode, list.from(node.childNodes));                                                           // 1383
      insertAfter(newNode, node);                                                                                      // 1384
      remove(node);                                                                                                    // 1385
                                                                                                                       // 1386
      return newNode;                                                                                                  // 1387
    };                                                                                                                 // 1388
                                                                                                                       // 1389
    var isTextarea = makePredByNodeName('TEXTAREA');                                                                   // 1390
                                                                                                                       // 1391
    /**                                                                                                                // 1392
     * @param {jQuery} $node                                                                                           // 1393
     * @param {Boolean} [stripLinebreaks] - default: false                                                             // 1394
     */                                                                                                                // 1395
    var value = function ($node, stripLinebreaks) {                                                                    // 1396
      var val = isTextarea($node[0]) ? $node.val() : $node.html();                                                     // 1397
      if (stripLinebreaks) {                                                                                           // 1398
        return val.replace(/[\n\r]/g, '');                                                                             // 1399
      }                                                                                                                // 1400
      return val;                                                                                                      // 1401
    };                                                                                                                 // 1402
                                                                                                                       // 1403
    /**                                                                                                                // 1404
     * @method html                                                                                                    // 1405
     *                                                                                                                 // 1406
     * get the HTML contents of node                                                                                   // 1407
     *                                                                                                                 // 1408
     * @param {jQuery} $node                                                                                           // 1409
     * @param {Boolean} [isNewlineOnBlock]                                                                             // 1410
     */                                                                                                                // 1411
    var html = function ($node, isNewlineOnBlock) {                                                                    // 1412
      var markup = value($node);                                                                                       // 1413
                                                                                                                       // 1414
      if (isNewlineOnBlock) {                                                                                          // 1415
        var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;                                                        // 1416
        markup = markup.replace(regexTag, function (match, endSlash, name) {                                           // 1417
          name = name.toUpperCase();                                                                                   // 1418
          var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) &&                                     // 1419
                                       !!endSlash;                                                                     // 1420
          var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);                                    // 1421
                                                                                                                       // 1422
          return match + ((isEndOfInlineContainer || isBlockNode) ? '\n' : '');                                        // 1423
        });                                                                                                            // 1424
        markup = $.trim(markup);                                                                                       // 1425
      }                                                                                                                // 1426
                                                                                                                       // 1427
      return markup;                                                                                                   // 1428
    };                                                                                                                 // 1429
                                                                                                                       // 1430
    return {                                                                                                           // 1431
      /** @property {String} NBSP_CHAR */                                                                              // 1432
      NBSP_CHAR: NBSP_CHAR,                                                                                            // 1433
      /** @property {String} ZERO_WIDTH_NBSP_CHAR */                                                                   // 1434
      ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,                                                                      // 1435
      /** @property {String} blank */                                                                                  // 1436
      blank: blankHTML,                                                                                                // 1437
      /** @property {String} emptyPara */                                                                              // 1438
      emptyPara: '<p>' + blankHTML + '</p>',                                                                           // 1439
      makePredByNodeName: makePredByNodeName,                                                                          // 1440
      isEditable: isEditable,                                                                                          // 1441
      isControlSizing: isControlSizing,                                                                                // 1442
      buildLayoutInfo: buildLayoutInfo,                                                                                // 1443
      makeLayoutInfo: makeLayoutInfo,                                                                                  // 1444
      isText: isText,                                                                                                  // 1445
      isVoid: isVoid,                                                                                                  // 1446
      isPara: isPara,                                                                                                  // 1447
      isPurePara: isPurePara,                                                                                          // 1448
      isInline: isInline,                                                                                              // 1449
      isBlock: func.not(isInline),                                                                                     // 1450
      isBodyInline: isBodyInline,                                                                                      // 1451
      isBody: isBody,                                                                                                  // 1452
      isParaInline: isParaInline,                                                                                      // 1453
      isList: isList,                                                                                                  // 1454
      isTable: isTable,                                                                                                // 1455
      isCell: isCell,                                                                                                  // 1456
      isBlockquote: isBlockquote,                                                                                      // 1457
      isBodyContainer: isBodyContainer,                                                                                // 1458
      isAnchor: isAnchor,                                                                                              // 1459
      isDiv: makePredByNodeName('DIV'),                                                                                // 1460
      isLi: isLi,                                                                                                      // 1461
      isBR: makePredByNodeName('BR'),                                                                                  // 1462
      isSpan: makePredByNodeName('SPAN'),                                                                              // 1463
      isB: makePredByNodeName('B'),                                                                                    // 1464
      isU: makePredByNodeName('U'),                                                                                    // 1465
      isS: makePredByNodeName('S'),                                                                                    // 1466
      isI: makePredByNodeName('I'),                                                                                    // 1467
      isImg: makePredByNodeName('IMG'),                                                                                // 1468
      isTextarea: isTextarea,                                                                                          // 1469
      isEmpty: isEmpty,                                                                                                // 1470
      isEmptyAnchor: func.and(isAnchor, isEmpty),                                                                      // 1471
      isClosestSibling: isClosestSibling,                                                                              // 1472
      withClosestSiblings: withClosestSiblings,                                                                        // 1473
      nodeLength: nodeLength,                                                                                          // 1474
      isLeftEdgePoint: isLeftEdgePoint,                                                                                // 1475
      isRightEdgePoint: isRightEdgePoint,                                                                              // 1476
      isEdgePoint: isEdgePoint,                                                                                        // 1477
      isLeftEdgeOf: isLeftEdgeOf,                                                                                      // 1478
      isRightEdgeOf: isRightEdgeOf,                                                                                    // 1479
      prevPoint: prevPoint,                                                                                            // 1480
      nextPoint: nextPoint,                                                                                            // 1481
      isSamePoint: isSamePoint,                                                                                        // 1482
      isVisiblePoint: isVisiblePoint,                                                                                  // 1483
      prevPointUntil: prevPointUntil,                                                                                  // 1484
      nextPointUntil: nextPointUntil,                                                                                  // 1485
      isCharPoint: isCharPoint,                                                                                        // 1486
      walkPoint: walkPoint,                                                                                            // 1487
      ancestor: ancestor,                                                                                              // 1488
      singleChildAncestor: singleChildAncestor,                                                                        // 1489
      listAncestor: listAncestor,                                                                                      // 1490
      lastAncestor: lastAncestor,                                                                                      // 1491
      listNext: listNext,                                                                                              // 1492
      listPrev: listPrev,                                                                                              // 1493
      listDescendant: listDescendant,                                                                                  // 1494
      commonAncestor: commonAncestor,                                                                                  // 1495
      wrap: wrap,                                                                                                      // 1496
      insertAfter: insertAfter,                                                                                        // 1497
      appendChildNodes: appendChildNodes,                                                                              // 1498
      position: position,                                                                                              // 1499
      hasChildren: hasChildren,                                                                                        // 1500
      makeOffsetPath: makeOffsetPath,                                                                                  // 1501
      fromOffsetPath: fromOffsetPath,                                                                                  // 1502
      splitTree: splitTree,                                                                                            // 1503
      splitPoint: splitPoint,                                                                                          // 1504
      create: create,                                                                                                  // 1505
      createText: createText,                                                                                          // 1506
      remove: remove,                                                                                                  // 1507
      removeWhile: removeWhile,                                                                                        // 1508
      replace: replace,                                                                                                // 1509
      html: html,                                                                                                      // 1510
      value: value                                                                                                     // 1511
    };                                                                                                                 // 1512
  })();                                                                                                                // 1513
                                                                                                                       // 1514
                                                                                                                       // 1515
  var range = (function () {                                                                                           // 1516
                                                                                                                       // 1517
    /**                                                                                                                // 1518
     * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js                                        // 1519
     *                                                                                                                 // 1520
     * @param {TextRange} textRange                                                                                    // 1521
     * @param {Boolean} isStart                                                                                        // 1522
     * @return {BoundaryPoint}                                                                                         // 1523
     *                                                                                                                 // 1524
     * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx                                          // 1525
     */                                                                                                                // 1526
    var textRangeToPoint = function (textRange, isStart) {                                                             // 1527
      var container = textRange.parentElement(), offset;                                                               // 1528
                                                                                                                       // 1529
      var tester = document.body.createTextRange(), prevContainer;                                                     // 1530
      var childNodes = list.from(container.childNodes);                                                                // 1531
      for (offset = 0; offset < childNodes.length; offset++) {                                                         // 1532
        if (dom.isText(childNodes[offset])) {                                                                          // 1533
          continue;                                                                                                    // 1534
        }                                                                                                              // 1535
        tester.moveToElementText(childNodes[offset]);                                                                  // 1536
        if (tester.compareEndPoints('StartToStart', textRange) >= 0) {                                                 // 1537
          break;                                                                                                       // 1538
        }                                                                                                              // 1539
        prevContainer = childNodes[offset];                                                                            // 1540
      }                                                                                                                // 1541
                                                                                                                       // 1542
      if (offset !== 0 && dom.isText(childNodes[offset - 1])) {                                                        // 1543
        var textRangeStart = document.body.createTextRange(), curTextNode = null;                                      // 1544
        textRangeStart.moveToElementText(prevContainer || container);                                                  // 1545
        textRangeStart.collapse(!prevContainer);                                                                       // 1546
        curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;                                // 1547
                                                                                                                       // 1548
        var pointTester = textRange.duplicate();                                                                       // 1549
        pointTester.setEndPoint('StartToStart', textRangeStart);                                                       // 1550
        var textCount = pointTester.text.replace(/[\r\n]/g, '').length;                                                // 1551
                                                                                                                       // 1552
        while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {                                  // 1553
          textCount -= curTextNode.nodeValue.length;                                                                   // 1554
          curTextNode = curTextNode.nextSibling;                                                                       // 1555
        }                                                                                                              // 1556
                                                                                                                       // 1557
        /* jshint ignore:start */                                                                                      // 1558
        var dummy = curTextNode.nodeValue; // enforce IE to re-reference curTextNode, hack                             // 1559
        /* jshint ignore:end */                                                                                        // 1560
                                                                                                                       // 1561
        if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) &&                               // 1562
            textCount === curTextNode.nodeValue.length) {                                                              // 1563
          textCount -= curTextNode.nodeValue.length;                                                                   // 1564
          curTextNode = curTextNode.nextSibling;                                                                       // 1565
        }                                                                                                              // 1566
                                                                                                                       // 1567
        container = curTextNode;                                                                                       // 1568
        offset = textCount;                                                                                            // 1569
      }                                                                                                                // 1570
                                                                                                                       // 1571
      return {                                                                                                         // 1572
        cont: container,                                                                                               // 1573
        offset: offset                                                                                                 // 1574
      };                                                                                                               // 1575
    };                                                                                                                 // 1576
                                                                                                                       // 1577
    /**                                                                                                                // 1578
     * return TextRange from boundary point (inspired by google closure-library)                                       // 1579
     * @param {BoundaryPoint} point                                                                                    // 1580
     * @return {TextRange}                                                                                             // 1581
     */                                                                                                                // 1582
    var pointToTextRange = function (point) {                                                                          // 1583
      var textRangeInfo = function (container, offset) {                                                               // 1584
        var node, isCollapseToStart;                                                                                   // 1585
                                                                                                                       // 1586
        if (dom.isText(container)) {                                                                                   // 1587
          var prevTextNodes = dom.listPrev(container, func.not(dom.isText));                                           // 1588
          var prevContainer = list.last(prevTextNodes).previousSibling;                                                // 1589
          node =  prevContainer || container.parentNode;                                                               // 1590
          offset += list.sum(list.tail(prevTextNodes), dom.nodeLength);                                                // 1591
          isCollapseToStart = !prevContainer;                                                                          // 1592
        } else {                                                                                                       // 1593
          node = container.childNodes[offset] || container;                                                            // 1594
          if (dom.isText(node)) {                                                                                      // 1595
            return textRangeInfo(node, 0);                                                                             // 1596
          }                                                                                                            // 1597
                                                                                                                       // 1598
          offset = 0;                                                                                                  // 1599
          isCollapseToStart = false;                                                                                   // 1600
        }                                                                                                              // 1601
                                                                                                                       // 1602
        return {                                                                                                       // 1603
          node: node,                                                                                                  // 1604
          collapseToStart: isCollapseToStart,                                                                          // 1605
          offset: offset                                                                                               // 1606
        };                                                                                                             // 1607
      };                                                                                                               // 1608
                                                                                                                       // 1609
      var textRange = document.body.createTextRange();                                                                 // 1610
      var info = textRangeInfo(point.node, point.offset);                                                              // 1611
                                                                                                                       // 1612
      textRange.moveToElementText(info.node);                                                                          // 1613
      textRange.collapse(info.collapseToStart);                                                                        // 1614
      textRange.moveStart('character', info.offset);                                                                   // 1615
      return textRange;                                                                                                // 1616
    };                                                                                                                 // 1617
                                                                                                                       // 1618
    /**                                                                                                                // 1619
     * Wrapped Range                                                                                                   // 1620
     *                                                                                                                 // 1621
     * @constructor                                                                                                    // 1622
     * @param {Node} sc - start container                                                                              // 1623
     * @param {Number} so - start offset                                                                               // 1624
     * @param {Node} ec - end container                                                                                // 1625
     * @param {Number} eo - end offset                                                                                 // 1626
     */                                                                                                                // 1627
    var WrappedRange = function (sc, so, ec, eo) {                                                                     // 1628
      this.sc = sc;                                                                                                    // 1629
      this.so = so;                                                                                                    // 1630
      this.ec = ec;                                                                                                    // 1631
      this.eo = eo;                                                                                                    // 1632
                                                                                                                       // 1633
      // nativeRange: get nativeRange from sc, so, ec, eo                                                              // 1634
      var nativeRange = function () {                                                                                  // 1635
        if (agent.isW3CRangeSupport) {                                                                                 // 1636
          var w3cRange = document.createRange();                                                                       // 1637
          w3cRange.setStart(sc, so);                                                                                   // 1638
          w3cRange.setEnd(ec, eo);                                                                                     // 1639
                                                                                                                       // 1640
          return w3cRange;                                                                                             // 1641
        } else {                                                                                                       // 1642
          var textRange = pointToTextRange({                                                                           // 1643
            node: sc,                                                                                                  // 1644
            offset: so                                                                                                 // 1645
          });                                                                                                          // 1646
                                                                                                                       // 1647
          textRange.setEndPoint('EndToEnd', pointToTextRange({                                                         // 1648
            node: ec,                                                                                                  // 1649
            offset: eo                                                                                                 // 1650
          }));                                                                                                         // 1651
                                                                                                                       // 1652
          return textRange;                                                                                            // 1653
        }                                                                                                              // 1654
      };                                                                                                               // 1655
                                                                                                                       // 1656
      this.getPoints = function () {                                                                                   // 1657
        return {                                                                                                       // 1658
          sc: sc,                                                                                                      // 1659
          so: so,                                                                                                      // 1660
          ec: ec,                                                                                                      // 1661
          eo: eo                                                                                                       // 1662
        };                                                                                                             // 1663
      };                                                                                                               // 1664
                                                                                                                       // 1665
      this.getStartPoint = function () {                                                                               // 1666
        return {                                                                                                       // 1667
          node: sc,                                                                                                    // 1668
          offset: so                                                                                                   // 1669
        };                                                                                                             // 1670
      };                                                                                                               // 1671
                                                                                                                       // 1672
      this.getEndPoint = function () {                                                                                 // 1673
        return {                                                                                                       // 1674
          node: ec,                                                                                                    // 1675
          offset: eo                                                                                                   // 1676
        };                                                                                                             // 1677
      };                                                                                                               // 1678
                                                                                                                       // 1679
      /**                                                                                                              // 1680
       * select update visible range                                                                                   // 1681
       */                                                                                                              // 1682
      this.select = function () {                                                                                      // 1683
        var nativeRng = nativeRange();                                                                                 // 1684
        if (agent.isW3CRangeSupport) {                                                                                 // 1685
          var selection = document.getSelection();                                                                     // 1686
          if (selection.rangeCount > 0) {                                                                              // 1687
            selection.removeAllRanges();                                                                               // 1688
          }                                                                                                            // 1689
          selection.addRange(nativeRng);                                                                               // 1690
        } else {                                                                                                       // 1691
          nativeRng.select();                                                                                          // 1692
        }                                                                                                              // 1693
                                                                                                                       // 1694
        return this;                                                                                                   // 1695
      };                                                                                                               // 1696
                                                                                                                       // 1697
      /**                                                                                                              // 1698
       * @return {WrappedRange}                                                                                        // 1699
       */                                                                                                              // 1700
      this.normalize = function () {                                                                                   // 1701
                                                                                                                       // 1702
        /**                                                                                                            // 1703
         * @param {BoundaryPoint} point                                                                                // 1704
         * @return {BoundaryPoint}                                                                                     // 1705
         */                                                                                                            // 1706
        var getVisiblePoint = function (point) {                                                                       // 1707
          if (!dom.isVisiblePoint(point)) {                                                                            // 1708
            if (dom.isLeftEdgePoint(point)) {                                                                          // 1709
              point = dom.nextPointUntil(point, dom.isVisiblePoint);                                                   // 1710
            } else {                                                                                                   // 1711
              point = dom.prevPointUntil(point, dom.isVisiblePoint);                                                   // 1712
            }                                                                                                          // 1713
          }                                                                                                            // 1714
          return point;                                                                                                // 1715
        };                                                                                                             // 1716
                                                                                                                       // 1717
        var startPoint = getVisiblePoint(this.getStartPoint());                                                        // 1718
        var endPoint = getVisiblePoint(this.getEndPoint());                                                            // 1719
                                                                                                                       // 1720
        return new WrappedRange(                                                                                       // 1721
          startPoint.node,                                                                                             // 1722
          startPoint.offset,                                                                                           // 1723
          endPoint.node,                                                                                               // 1724
          endPoint.offset                                                                                              // 1725
        );                                                                                                             // 1726
      };                                                                                                               // 1727
                                                                                                                       // 1728
      /**                                                                                                              // 1729
       * returns matched nodes on range                                                                                // 1730
       *                                                                                                               // 1731
       * @param {Function} [pred] - predicate function                                                                 // 1732
       * @param {Object} [options]                                                                                     // 1733
       * @param {Boolean} [options.includeAncestor]                                                                    // 1734
       * @param {Boolean} [options.fullyContains]                                                                      // 1735
       * @return {Node[]}                                                                                              // 1736
       */                                                                                                              // 1737
      this.nodes = function (pred, options) {                                                                          // 1738
        pred = pred || func.ok;                                                                                        // 1739
                                                                                                                       // 1740
        var includeAncestor = options && options.includeAncestor;                                                      // 1741
        var fullyContains = options && options.fullyContains;                                                          // 1742
                                                                                                                       // 1743
        // TODO compare points and sort                                                                                // 1744
        var startPoint = this.getStartPoint();                                                                         // 1745
        var endPoint = this.getEndPoint();                                                                             // 1746
                                                                                                                       // 1747
        var nodes = [];                                                                                                // 1748
        var leftEdgeNodes = [];                                                                                        // 1749
                                                                                                                       // 1750
        dom.walkPoint(startPoint, endPoint, function (point) {                                                         // 1751
          if (dom.isEditable(point.node)) {                                                                            // 1752
            return;                                                                                                    // 1753
          }                                                                                                            // 1754
                                                                                                                       // 1755
          var node;                                                                                                    // 1756
          if (fullyContains) {                                                                                         // 1757
            if (dom.isLeftEdgePoint(point)) {                                                                          // 1758
              leftEdgeNodes.push(point.node);                                                                          // 1759
            }                                                                                                          // 1760
            if (dom.isRightEdgePoint(point) && list.contains(leftEdgeNodes, point.node)) {                             // 1761
              node = point.node;                                                                                       // 1762
            }                                                                                                          // 1763
          } else if (includeAncestor) {                                                                                // 1764
            node = dom.ancestor(point.node, pred);                                                                     // 1765
          } else {                                                                                                     // 1766
            node = point.node;                                                                                         // 1767
          }                                                                                                            // 1768
                                                                                                                       // 1769
          if (node && pred(node)) {                                                                                    // 1770
            nodes.push(node);                                                                                          // 1771
          }                                                                                                            // 1772
        }, true);                                                                                                      // 1773
                                                                                                                       // 1774
        return list.unique(nodes);                                                                                     // 1775
      };                                                                                                               // 1776
                                                                                                                       // 1777
      /**                                                                                                              // 1778
       * returns commonAncestor of range                                                                               // 1779
       * @return {Element} - commonAncestor                                                                            // 1780
       */                                                                                                              // 1781
      this.commonAncestor = function () {                                                                              // 1782
        return dom.commonAncestor(sc, ec);                                                                             // 1783
      };                                                                                                               // 1784
                                                                                                                       // 1785
      /**                                                                                                              // 1786
       * returns expanded range by pred                                                                                // 1787
       *                                                                                                               // 1788
       * @param {Function} pred - predicate function                                                                   // 1789
       * @return {WrappedRange}                                                                                        // 1790
       */                                                                                                              // 1791
      this.expand = function (pred) {                                                                                  // 1792
        var startAncestor = dom.ancestor(sc, pred);                                                                    // 1793
        var endAncestor = dom.ancestor(ec, pred);                                                                      // 1794
                                                                                                                       // 1795
        if (!startAncestor && !endAncestor) {                                                                          // 1796
          return new WrappedRange(sc, so, ec, eo);                                                                     // 1797
        }                                                                                                              // 1798
                                                                                                                       // 1799
        var boundaryPoints = this.getPoints();                                                                         // 1800
                                                                                                                       // 1801
        if (startAncestor) {                                                                                           // 1802
          boundaryPoints.sc = startAncestor;                                                                           // 1803
          boundaryPoints.so = 0;                                                                                       // 1804
        }                                                                                                              // 1805
                                                                                                                       // 1806
        if (endAncestor) {                                                                                             // 1807
          boundaryPoints.ec = endAncestor;                                                                             // 1808
          boundaryPoints.eo = dom.nodeLength(endAncestor);                                                             // 1809
        }                                                                                                              // 1810
                                                                                                                       // 1811
        return new WrappedRange(                                                                                       // 1812
          boundaryPoints.sc,                                                                                           // 1813
          boundaryPoints.so,                                                                                           // 1814
          boundaryPoints.ec,                                                                                           // 1815
          boundaryPoints.eo                                                                                            // 1816
        );                                                                                                             // 1817
      };                                                                                                               // 1818
                                                                                                                       // 1819
      /**                                                                                                              // 1820
       * @param {Boolean} isCollapseToStart                                                                            // 1821
       * @return {WrappedRange}                                                                                        // 1822
       */                                                                                                              // 1823
      this.collapse = function (isCollapseToStart) {                                                                   // 1824
        if (isCollapseToStart) {                                                                                       // 1825
          return new WrappedRange(sc, so, sc, so);                                                                     // 1826
        } else {                                                                                                       // 1827
          return new WrappedRange(ec, eo, ec, eo);                                                                     // 1828
        }                                                                                                              // 1829
      };                                                                                                               // 1830
                                                                                                                       // 1831
      /**                                                                                                              // 1832
       * splitText on range                                                                                            // 1833
       */                                                                                                              // 1834
      this.splitText = function () {                                                                                   // 1835
        var isSameContainer = sc === ec;                                                                               // 1836
        var boundaryPoints = this.getPoints();                                                                         // 1837
                                                                                                                       // 1838
        if (dom.isText(ec) && !dom.isEdgePoint(this.getEndPoint())) {                                                  // 1839
          ec.splitText(eo);                                                                                            // 1840
        }                                                                                                              // 1841
                                                                                                                       // 1842
        if (dom.isText(sc) && !dom.isEdgePoint(this.getStartPoint())) {                                                // 1843
          boundaryPoints.sc = sc.splitText(so);                                                                        // 1844
          boundaryPoints.so = 0;                                                                                       // 1845
                                                                                                                       // 1846
          if (isSameContainer) {                                                                                       // 1847
            boundaryPoints.ec = boundaryPoints.sc;                                                                     // 1848
            boundaryPoints.eo = eo - so;                                                                               // 1849
          }                                                                                                            // 1850
        }                                                                                                              // 1851
                                                                                                                       // 1852
        return new WrappedRange(                                                                                       // 1853
          boundaryPoints.sc,                                                                                           // 1854
          boundaryPoints.so,                                                                                           // 1855
          boundaryPoints.ec,                                                                                           // 1856
          boundaryPoints.eo                                                                                            // 1857
        );                                                                                                             // 1858
      };                                                                                                               // 1859
                                                                                                                       // 1860
      /**                                                                                                              // 1861
       * delete contents on range                                                                                      // 1862
       * @return {WrappedRange}                                                                                        // 1863
       */                                                                                                              // 1864
      this.deleteContents = function () {                                                                              // 1865
        if (this.isCollapsed()) {                                                                                      // 1866
          return this;                                                                                                 // 1867
        }                                                                                                              // 1868
                                                                                                                       // 1869
        var rng = this.splitText();                                                                                    // 1870
        var nodes = rng.nodes(null, {                                                                                  // 1871
          fullyContains: true                                                                                          // 1872
        });                                                                                                            // 1873
                                                                                                                       // 1874
        // find new cursor point                                                                                       // 1875
        var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {                                         // 1876
          return !list.contains(nodes, point.node);                                                                    // 1877
        });                                                                                                            // 1878
                                                                                                                       // 1879
        var emptyParents = [];                                                                                         // 1880
        $.each(nodes, function (idx, node) {                                                                           // 1881
          // find empty parents                                                                                        // 1882
          var parent = node.parentNode;                                                                                // 1883
          if (point.node !== parent && dom.nodeLength(parent) === 1) {                                                 // 1884
            emptyParents.push(parent);                                                                                 // 1885
          }                                                                                                            // 1886
          dom.remove(node, false);                                                                                     // 1887
        });                                                                                                            // 1888
                                                                                                                       // 1889
        // remove empty parents                                                                                        // 1890
        $.each(emptyParents, function (idx, node) {                                                                    // 1891
          dom.remove(node, false);                                                                                     // 1892
        });                                                                                                            // 1893
                                                                                                                       // 1894
        return new WrappedRange(                                                                                       // 1895
          point.node,                                                                                                  // 1896
          point.offset,                                                                                                // 1897
          point.node,                                                                                                  // 1898
          point.offset                                                                                                 // 1899
        ).normalize();                                                                                                 // 1900
      };                                                                                                               // 1901
                                                                                                                       // 1902
      /**                                                                                                              // 1903
       * makeIsOn: return isOn(pred) function                                                                          // 1904
       */                                                                                                              // 1905
      var makeIsOn = function (pred) {                                                                                 // 1906
        return function () {                                                                                           // 1907
          var ancestor = dom.ancestor(sc, pred);                                                                       // 1908
          return !!ancestor && (ancestor === dom.ancestor(ec, pred));                                                  // 1909
        };                                                                                                             // 1910
      };                                                                                                               // 1911
                                                                                                                       // 1912
      // isOnEditable: judge whether range is on editable or not                                                       // 1913
      this.isOnEditable = makeIsOn(dom.isEditable);                                                                    // 1914
      // isOnList: judge whether range is on list node or not                                                          // 1915
      this.isOnList = makeIsOn(dom.isList);                                                                            // 1916
      // isOnAnchor: judge whether range is on anchor node or not                                                      // 1917
      this.isOnAnchor = makeIsOn(dom.isAnchor);                                                                        // 1918
      // isOnAnchor: judge whether range is on cell node or not                                                        // 1919
      this.isOnCell = makeIsOn(dom.isCell);                                                                            // 1920
                                                                                                                       // 1921
      /**                                                                                                              // 1922
       * @param {Function} pred                                                                                        // 1923
       * @return {Boolean}                                                                                             // 1924
       */                                                                                                              // 1925
      this.isLeftEdgeOf = function (pred) {                                                                            // 1926
        if (!dom.isLeftEdgePoint(this.getStartPoint())) {                                                              // 1927
          return false;                                                                                                // 1928
        }                                                                                                              // 1929
                                                                                                                       // 1930
        var node = dom.ancestor(this.sc, pred);                                                                        // 1931
        return node && dom.isLeftEdgeOf(this.sc, node);                                                                // 1932
      };                                                                                                               // 1933
                                                                                                                       // 1934
      /**                                                                                                              // 1935
       * returns whether range was collapsed or not                                                                    // 1936
       */                                                                                                              // 1937
      this.isCollapsed = function () {                                                                                 // 1938
        return sc === ec && so === eo;                                                                                 // 1939
      };                                                                                                               // 1940
                                                                                                                       // 1941
      /**                                                                                                              // 1942
       * wrap inline nodes which children of body with paragraph                                                       // 1943
       *                                                                                                               // 1944
       * @return {WrappedRange}                                                                                        // 1945
       */                                                                                                              // 1946
      this.wrapBodyInlineWithPara = function () {                                                                      // 1947
        if (dom.isBodyContainer(sc) && dom.isEmpty(sc)) {                                                              // 1948
          sc.innerHTML = dom.emptyPara;                                                                                // 1949
          return new WrappedRange(sc.firstChild, 0, sc.firstChild, 0);                                                 // 1950
        }                                                                                                              // 1951
                                                                                                                       // 1952
        if (dom.isParaInline(sc) || dom.isPara(sc)) {                                                                  // 1953
          return this.normalize();                                                                                     // 1954
        }                                                                                                              // 1955
                                                                                                                       // 1956
        // find inline top ancestor                                                                                    // 1957
        var topAncestor;                                                                                               // 1958
        if (dom.isInline(sc)) {                                                                                        // 1959
          var ancestors = dom.listAncestor(sc, func.not(dom.isInline));                                                // 1960
          topAncestor = list.last(ancestors);                                                                          // 1961
          if (!dom.isInline(topAncestor)) {                                                                            // 1962
            topAncestor = ancestors[ancestors.length - 2] || sc.childNodes[so];                                        // 1963
          }                                                                                                            // 1964
        } else {                                                                                                       // 1965
          topAncestor = sc.childNodes[so > 0 ? so - 1 : 0];                                                            // 1966
        }                                                                                                              // 1967
                                                                                                                       // 1968
        // siblings not in paragraph                                                                                   // 1969
        var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();                                    // 1970
        inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline));               // 1971
                                                                                                                       // 1972
        // wrap with paragraph                                                                                         // 1973
        if (inlineSiblings.length) {                                                                                   // 1974
          var para = dom.wrap(list.head(inlineSiblings), 'p');                                                         // 1975
          dom.appendChildNodes(para, list.tail(inlineSiblings));                                                       // 1976
        }                                                                                                              // 1977
                                                                                                                       // 1978
        return this.normalize();                                                                                       // 1979
      };                                                                                                               // 1980
                                                                                                                       // 1981
      /**                                                                                                              // 1982
       * insert node at current cursor                                                                                 // 1983
       *                                                                                                               // 1984
       * @param {Node} node                                                                                            // 1985
       * @return {Node}                                                                                                // 1986
       */                                                                                                              // 1987
      this.insertNode = function (node) {                                                                              // 1988
        var rng = this.wrapBodyInlineWithPara().deleteContents();                                                      // 1989
        var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));                                            // 1990
                                                                                                                       // 1991
        if (info.rightNode) {                                                                                          // 1992
          info.rightNode.parentNode.insertBefore(node, info.rightNode);                                                // 1993
        } else {                                                                                                       // 1994
          info.container.appendChild(node);                                                                            // 1995
        }                                                                                                              // 1996
                                                                                                                       // 1997
        return node;                                                                                                   // 1998
      };                                                                                                               // 1999
                                                                                                                       // 2000
      /**                                                                                                              // 2001
       * insert html at current cursor                                                                                 // 2002
       */                                                                                                              // 2003
      this.pasteHTML = function (markup) {                                                                             // 2004
        var self = this;                                                                                               // 2005
        var contentsContainer = $('<div></div>').html(markup)[0];                                                      // 2006
        var childNodes = list.from(contentsContainer.childNodes);                                                      // 2007
                                                                                                                       // 2008
        this.wrapBodyInlineWithPara().deleteContents();                                                                // 2009
                                                                                                                       // 2010
        return $.map(childNodes.reverse(), function (childNode) {                                                      // 2011
          return self.insertNode(childNode);                                                                           // 2012
        }).reverse();                                                                                                  // 2013
      };                                                                                                               // 2014
                                                                                                                       // 2015
      /**                                                                                                              // 2016
       * returns text in range                                                                                         // 2017
       *                                                                                                               // 2018
       * @return {String}                                                                                              // 2019
       */                                                                                                              // 2020
      this.toString = function () {                                                                                    // 2021
        var nativeRng = nativeRange();                                                                                 // 2022
        return agent.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;                                        // 2023
      };                                                                                                               // 2024
                                                                                                                       // 2025
      /**                                                                                                              // 2026
       * returns range for word before cursor                                                                          // 2027
       *                                                                                                               // 2028
       * @param {Boolean} [findAfter] - find after cursor, default: false                                              // 2029
       * @return {WrappedRange}                                                                                        // 2030
       */                                                                                                              // 2031
      this.getWordRange = function (findAfter) {                                                                       // 2032
        var endPoint = this.getEndPoint();                                                                             // 2033
                                                                                                                       // 2034
        if (!dom.isCharPoint(endPoint)) {                                                                              // 2035
          return this;                                                                                                 // 2036
        }                                                                                                              // 2037
                                                                                                                       // 2038
        var startPoint = dom.prevPointUntil(endPoint, function (point) {                                               // 2039
          return !dom.isCharPoint(point);                                                                              // 2040
        });                                                                                                            // 2041
                                                                                                                       // 2042
        if (findAfter) {                                                                                               // 2043
          endPoint = dom.nextPointUntil(endPoint, function (point) {                                                   // 2044
            return !dom.isCharPoint(point);                                                                            // 2045
          });                                                                                                          // 2046
        }                                                                                                              // 2047
                                                                                                                       // 2048
        return new WrappedRange(                                                                                       // 2049
          startPoint.node,                                                                                             // 2050
          startPoint.offset,                                                                                           // 2051
          endPoint.node,                                                                                               // 2052
          endPoint.offset                                                                                              // 2053
        );                                                                                                             // 2054
      };                                                                                                               // 2055
                                                                                                                       // 2056
      /**                                                                                                              // 2057
       * create offsetPath bookmark                                                                                    // 2058
       *                                                                                                               // 2059
       * @param {Node} editable                                                                                        // 2060
       */                                                                                                              // 2061
      this.bookmark = function (editable) {                                                                            // 2062
        return {                                                                                                       // 2063
          s: {                                                                                                         // 2064
            path: dom.makeOffsetPath(editable, sc),                                                                    // 2065
            offset: so                                                                                                 // 2066
          },                                                                                                           // 2067
          e: {                                                                                                         // 2068
            path: dom.makeOffsetPath(editable, ec),                                                                    // 2069
            offset: eo                                                                                                 // 2070
          }                                                                                                            // 2071
        };                                                                                                             // 2072
      };                                                                                                               // 2073
                                                                                                                       // 2074
      /**                                                                                                              // 2075
       * create offsetPath bookmark base on paragraph                                                                  // 2076
       *                                                                                                               // 2077
       * @param {Node[]} paras                                                                                         // 2078
       */                                                                                                              // 2079
      this.paraBookmark = function (paras) {                                                                           // 2080
        return {                                                                                                       // 2081
          s: {                                                                                                         // 2082
            path: list.tail(dom.makeOffsetPath(list.head(paras), sc)),                                                 // 2083
            offset: so                                                                                                 // 2084
          },                                                                                                           // 2085
          e: {                                                                                                         // 2086
            path: list.tail(dom.makeOffsetPath(list.last(paras), ec)),                                                 // 2087
            offset: eo                                                                                                 // 2088
          }                                                                                                            // 2089
        };                                                                                                             // 2090
      };                                                                                                               // 2091
                                                                                                                       // 2092
      /**                                                                                                              // 2093
       * getClientRects                                                                                                // 2094
       * @return {Rect[]}                                                                                              // 2095
       */                                                                                                              // 2096
      this.getClientRects = function () {                                                                              // 2097
        var nativeRng = nativeRange();                                                                                 // 2098
        return nativeRng.getClientRects();                                                                             // 2099
      };                                                                                                               // 2100
    };                                                                                                                 // 2101
                                                                                                                       // 2102
  /**                                                                                                                  // 2103
   * @class core.range                                                                                                 // 2104
   *                                                                                                                   // 2105
   * Data structure                                                                                                    // 2106
   *  * BoundaryPoint: a point of dom tree                                                                             // 2107
   *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range                         // 2108
   *                                                                                                                   // 2109
   * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position                        // 2110
   *                                                                                                                   // 2111
   * @singleton                                                                                                        // 2112
   * @alternateClassName range                                                                                         // 2113
   */                                                                                                                  // 2114
    return {                                                                                                           // 2115
      /**                                                                                                              // 2116
       * @method                                                                                                       // 2117
       *                                                                                                               // 2118
       * create Range Object From arguments or Browser Selection                                                       // 2119
       *                                                                                                               // 2120
       * @param {Node} sc - start container                                                                            // 2121
       * @param {Number} so - start offset                                                                             // 2122
       * @param {Node} ec - end container                                                                              // 2123
       * @param {Number} eo - end offset                                                                               // 2124
       * @return {WrappedRange}                                                                                        // 2125
       */                                                                                                              // 2126
      create : function (sc, so, ec, eo) {                                                                             // 2127
        if (!arguments.length) { // from Browser Selection                                                             // 2128
          if (agent.isW3CRangeSupport) {                                                                               // 2129
            var selection = document.getSelection();                                                                   // 2130
            if (selection.rangeCount === 0) {                                                                          // 2131
              return null;                                                                                             // 2132
            } else if (dom.isBody(selection.anchorNode)) {                                                             // 2133
              // Firefox: returns entire body as range on initialization. We won't never need it.                      // 2134
              return null;                                                                                             // 2135
            }                                                                                                          // 2136
                                                                                                                       // 2137
            var nativeRng = selection.getRangeAt(0);                                                                   // 2138
            sc = nativeRng.startContainer;                                                                             // 2139
            so = nativeRng.startOffset;                                                                                // 2140
            ec = nativeRng.endContainer;                                                                               // 2141
            eo = nativeRng.endOffset;                                                                                  // 2142
          } else { // IE8: TextRange                                                                                   // 2143
            var textRange = document.selection.createRange();                                                          // 2144
            var textRangeEnd = textRange.duplicate();                                                                  // 2145
            textRangeEnd.collapse(false);                                                                              // 2146
            var textRangeStart = textRange;                                                                            // 2147
            textRangeStart.collapse(true);                                                                             // 2148
                                                                                                                       // 2149
            var startPoint = textRangeToPoint(textRangeStart, true),                                                   // 2150
            endPoint = textRangeToPoint(textRangeEnd, false);                                                          // 2151
                                                                                                                       // 2152
            // same visible point case: range was collapsed.                                                           // 2153
            if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) &&                                      // 2154
                dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) &&                                     // 2155
                endPoint.node.nextSibling === startPoint.node) {                                                       // 2156
              startPoint = endPoint;                                                                                   // 2157
            }                                                                                                          // 2158
                                                                                                                       // 2159
            sc = startPoint.cont;                                                                                      // 2160
            so = startPoint.offset;                                                                                    // 2161
            ec = endPoint.cont;                                                                                        // 2162
            eo = endPoint.offset;                                                                                      // 2163
          }                                                                                                            // 2164
        } else if (arguments.length === 2) { //collapsed                                                               // 2165
          ec = sc;                                                                                                     // 2166
          eo = so;                                                                                                     // 2167
        }                                                                                                              // 2168
        return new WrappedRange(sc, so, ec, eo);                                                                       // 2169
      },                                                                                                               // 2170
                                                                                                                       // 2171
      /**                                                                                                              // 2172
       * @method                                                                                                       // 2173
       *                                                                                                               // 2174
       * create WrappedRange from node                                                                                 // 2175
       *                                                                                                               // 2176
       * @param {Node} node                                                                                            // 2177
       * @return {WrappedRange}                                                                                        // 2178
       */                                                                                                              // 2179
      createFromNode: function (node) {                                                                                // 2180
        var sc = node;                                                                                                 // 2181
        var so = 0;                                                                                                    // 2182
        var ec = node;                                                                                                 // 2183
        var eo = dom.nodeLength(ec);                                                                                   // 2184
                                                                                                                       // 2185
        // browsers can't target a picture or void node                                                                // 2186
        if (dom.isVoid(sc)) {                                                                                          // 2187
          so = dom.listPrev(sc).length - 1;                                                                            // 2188
          sc = sc.parentNode;                                                                                          // 2189
        }                                                                                                              // 2190
        if (dom.isBR(ec)) {                                                                                            // 2191
          eo = dom.listPrev(ec).length - 1;                                                                            // 2192
          ec = ec.parentNode;                                                                                          // 2193
        } else if (dom.isVoid(ec)) {                                                                                   // 2194
          eo = dom.listPrev(ec).length;                                                                                // 2195
          ec = ec.parentNode;                                                                                          // 2196
        }                                                                                                              // 2197
                                                                                                                       // 2198
        return this.create(sc, so, ec, eo);                                                                            // 2199
      },                                                                                                               // 2200
                                                                                                                       // 2201
      /**                                                                                                              // 2202
       * @method                                                                                                       // 2203
       *                                                                                                               // 2204
       * create WrappedRange from bookmark                                                                             // 2205
       *                                                                                                               // 2206
       * @param {Node} editable                                                                                        // 2207
       * @param {Object} bookmark                                                                                      // 2208
       * @return {WrappedRange}                                                                                        // 2209
       */                                                                                                              // 2210
      createFromBookmark : function (editable, bookmark) {                                                             // 2211
        var sc = dom.fromOffsetPath(editable, bookmark.s.path);                                                        // 2212
        var so = bookmark.s.offset;                                                                                    // 2213
        var ec = dom.fromOffsetPath(editable, bookmark.e.path);                                                        // 2214
        var eo = bookmark.e.offset;                                                                                    // 2215
        return new WrappedRange(sc, so, ec, eo);                                                                       // 2216
      },                                                                                                               // 2217
                                                                                                                       // 2218
      /**                                                                                                              // 2219
       * @method                                                                                                       // 2220
       *                                                                                                               // 2221
       * create WrappedRange from paraBookmark                                                                         // 2222
       *                                                                                                               // 2223
       * @param {Object} bookmark                                                                                      // 2224
       * @param {Node[]} paras                                                                                         // 2225
       * @return {WrappedRange}                                                                                        // 2226
       */                                                                                                              // 2227
      createFromParaBookmark: function (bookmark, paras) {                                                             // 2228
        var so = bookmark.s.offset;                                                                                    // 2229
        var eo = bookmark.e.offset;                                                                                    // 2230
        var sc = dom.fromOffsetPath(list.head(paras), bookmark.s.path);                                                // 2231
        var ec = dom.fromOffsetPath(list.last(paras), bookmark.e.path);                                                // 2232
                                                                                                                       // 2233
        return new WrappedRange(sc, so, ec, eo);                                                                       // 2234
      }                                                                                                                // 2235
    };                                                                                                                 // 2236
  })();                                                                                                                // 2237
                                                                                                                       // 2238
  /**                                                                                                                  // 2239
   * @class defaults                                                                                                   // 2240
   *                                                                                                                   // 2241
   * @singleton                                                                                                        // 2242
   */                                                                                                                  // 2243
  var defaults = {                                                                                                     // 2244
    /** @property */                                                                                                   // 2245
    version: '0.6.6',                                                                                                  // 2246
                                                                                                                       // 2247
    /**                                                                                                                // 2248
     *                                                                                                                 // 2249
     * for event options, reference to EventHandler.attach                                                             // 2250
     *                                                                                                                 // 2251
     * @property {Object} options                                                                                      // 2252
     * @property {String/Number} [options.width=null] set editor width                                                 // 2253
     * @property {String/Number} [options.height=null] set editor height, ex) 300                                      // 2254
     * @property {String/Number} options.minHeight set minimum height of editor                                        // 2255
     * @property {String/Number} options.maxHeight                                                                     // 2256
     * @property {String/Number} options.focus                                                                         // 2257
     * @property {Number} options.tabsize                                                                              // 2258
     * @property {Boolean} options.styleWithSpan                                                                       // 2259
     * @property {Object} options.codemirror                                                                           // 2260
     * @property {Object} [options.codemirror.mode='text/html']                                                        // 2261
     * @property {Object} [options.codemirror.htmlMode=true]                                                           // 2262
     * @property {Object} [options.codemirror.lineNumbers=true]                                                        // 2263
     * @property {String} [options.lang=en-US] language 'en-US', 'ko-KR', ...                                          // 2264
     * @property {String} [options.direction=null] text direction, ex) 'rtl'                                           // 2265
     * @property {Array} [options.toolbar]                                                                             // 2266
     * @property {Boolean} [options.airMode=false]                                                                     // 2267
     * @property {Array} [options.airPopover]                                                                          // 2268
     * @property {Fucntion} [options.onInit] initialize                                                                // 2269
     * @property {Fucntion} [options.onsubmit]                                                                         // 2270
     */                                                                                                                // 2271
    options: {                                                                                                         // 2272
      width: null,                  // set editor width                                                                // 2273
      height: null,                 // set editor height, ex) 300                                                      // 2274
                                                                                                                       // 2275
      minHeight: null,              // set minimum height of editor                                                    // 2276
      maxHeight: null,              // set maximum height of editor                                                    // 2277
                                                                                                                       // 2278
      focus: false,                 // set focus to editable area after initializing summernote                        // 2279
                                                                                                                       // 2280
      tabsize: 4,                   // size of tab ex) 2 or 4                                                          // 2281
      styleWithSpan: true,          // style with span (Chrome and FF only)                                            // 2282
                                                                                                                       // 2283
      disableLinkTarget: false,     // hide link Target Checkbox                                                       // 2284
      disableDragAndDrop: false,    // disable drag and drop event                                                     // 2285
      disableResizeEditor: false,   // disable resizing editor                                                         // 2286
                                                                                                                       // 2287
      shortcuts: true,              // enable keyboard shortcuts                                                       // 2288
                                                                                                                       // 2289
      placeholder: false,           // enable placeholder text                                                         // 2290
      prettifyHtml: true,           // enable prettifying html while toggling codeview                                 // 2291
                                                                                                                       // 2292
      iconPrefix: 'fa fa-',         // prefix for css icon classes                                                     // 2293
                                                                                                                       // 2294
      codemirror: {                 // codemirror options                                                              // 2295
        mode: 'text/html',                                                                                             // 2296
        htmlMode: true,                                                                                                // 2297
        lineNumbers: true                                                                                              // 2298
      },                                                                                                               // 2299
                                                                                                                       // 2300
      // language                                                                                                      // 2301
      lang: 'en-US',                // language 'en-US', 'ko-KR', ...                                                  // 2302
      direction: null,              // text direction, ex) 'rtl'                                                       // 2303
                                                                                                                       // 2304
      // toolbar                                                                                                       // 2305
      toolbar: [                                                                                                       // 2306
        ['style', ['style']],                                                                                          // 2307
        ['font', ['bold', 'italic', 'underline', 'clear']],                                                            // 2308
        // ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],            // 2309
        ['fontname', ['fontname']],                                                                                    // 2310
        // ['fontsize', ['fontsize']],                                                                                 // 2311
        ['color', ['color']],                                                                                          // 2312
        ['para', ['ul', 'ol', 'paragraph']],                                                                           // 2313
        ['height', ['height']],                                                                                        // 2314
        ['table', ['table']],                                                                                          // 2315
        ['insert', ['link', 'picture', 'hr']],                                                                         // 2316
        ['view', ['fullscreen', 'codeview']],                                                                          // 2317
        ['help', ['help']]                                                                                             // 2318
      ],                                                                                                               // 2319
                                                                                                                       // 2320
      // air mode: inline editor                                                                                       // 2321
      airMode: false,                                                                                                  // 2322
      // airPopover: [                                                                                                 // 2323
      //   ['style', ['style']],                                                                                       // 2324
      //   ['font', ['bold', 'italic', 'underline', 'clear']],                                                         // 2325
      //   ['fontname', ['fontname']],                                                                                 // 2326
      //   ['color', ['color']],                                                                                       // 2327
      //   ['para', ['ul', 'ol', 'paragraph']],                                                                        // 2328
      //   ['height', ['height']],                                                                                     // 2329
      //   ['table', ['table']],                                                                                       // 2330
      //   ['insert', ['link', 'picture']],                                                                            // 2331
      //   ['help', ['help']]                                                                                          // 2332
      // ],                                                                                                            // 2333
      airPopover: [                                                                                                    // 2334
        ['color', ['color']],                                                                                          // 2335
        ['font', ['bold', 'underline', 'clear']],                                                                      // 2336
        ['para', ['ul', 'paragraph']],                                                                                 // 2337
        ['table', ['table']],                                                                                          // 2338
        ['insert', ['link', 'picture']]                                                                                // 2339
      ],                                                                                                               // 2340
                                                                                                                       // 2341
      // style tag                                                                                                     // 2342
      styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],                                       // 2343
                                                                                                                       // 2344
      // default fontName                                                                                              // 2345
      defaultFontName: 'Helvetica Neue',                                                                               // 2346
                                                                                                                       // 2347
      // fontName                                                                                                      // 2348
      fontNames: [                                                                                                     // 2349
        'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',                                                        // 2350
        'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',                                                      // 2351
        'Tahoma', 'Times New Roman', 'Verdana'                                                                         // 2352
      ],                                                                                                               // 2353
      fontNamesIgnoreCheck: [],                                                                                        // 2354
                                                                                                                       // 2355
      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],                                                 // 2356
                                                                                                                       // 2357
      // pallete colors(n x n)                                                                                         // 2358
      colors: [                                                                                                        // 2359
        ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],                      // 2360
        ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],                      // 2361
        ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],                      // 2362
        ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],                      // 2363
        ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],                      // 2364
        ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],                      // 2365
        ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],                      // 2366
        ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']                       // 2367
      ],                                                                                                               // 2368
                                                                                                                       // 2369
      // lineHeight                                                                                                    // 2370
      lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],                                           // 2371
                                                                                                                       // 2372
      // insertTable max size                                                                                          // 2373
      insertTableMaxSize: {                                                                                            // 2374
        col: 10,                                                                                                       // 2375
        row: 10                                                                                                        // 2376
      },                                                                                                               // 2377
                                                                                                                       // 2378
      // image                                                                                                         // 2379
      maximumImageFileSize: null, // size in bytes, null = no limit                                                    // 2380
                                                                                                                       // 2381
      // callbacks                                                                                                     // 2382
      oninit: null,             // initialize                                                                          // 2383
      onfocus: null,            // editable has focus                                                                  // 2384
      onblur: null,             // editable out of focus                                                               // 2385
      onenter: null,            // enter key pressed                                                                   // 2386
      onkeyup: null,            // keyup                                                                               // 2387
      onkeydown: null,          // keydown                                                                             // 2388
      onImageUpload: null,      // imageUpload                                                                         // 2389
      onImageUploadError: null, // imageUploadError                                                                    // 2390
      onMediaDelete: null,      // media delete                                                                        // 2391
      onToolbarClick: null,                                                                                            // 2392
      onsubmit: null,                                                                                                  // 2393
                                                                                                                       // 2394
      /**                                                                                                              // 2395
       * manipulate link address when user create link                                                                 // 2396
       * @param {String} sLinkUrl                                                                                      // 2397
       * @return {String}                                                                                              // 2398
       */                                                                                                              // 2399
      onCreateLink: function (sLinkUrl) {                                                                              // 2400
        if (sLinkUrl.indexOf('@') !== -1 && sLinkUrl.indexOf(':') === -1) {                                            // 2401
          sLinkUrl =  'mailto:' + sLinkUrl;                                                                            // 2402
        } else if (sLinkUrl.indexOf('://') === -1) {                                                                   // 2403
          sLinkUrl = 'http://' + sLinkUrl;                                                                             // 2404
        }                                                                                                              // 2405
                                                                                                                       // 2406
        return sLinkUrl;                                                                                               // 2407
      },                                                                                                               // 2408
                                                                                                                       // 2409
      keyMap: {                                                                                                        // 2410
        pc: {                                                                                                          // 2411
          'ENTER': 'insertParagraph',                                                                                  // 2412
          'CTRL+Z': 'undo',                                                                                            // 2413
          'CTRL+Y': 'redo',                                                                                            // 2414
          'TAB': 'tab',                                                                                                // 2415
          'SHIFT+TAB': 'untab',                                                                                        // 2416
          'CTRL+B': 'bold',                                                                                            // 2417
          'CTRL+I': 'italic',                                                                                          // 2418
          'CTRL+U': 'underline',                                                                                       // 2419
          'CTRL+SHIFT+S': 'strikethrough',                                                                             // 2420
          'CTRL+BACKSLASH': 'removeFormat',                                                                            // 2421
          'CTRL+SHIFT+L': 'justifyLeft',                                                                               // 2422
          'CTRL+SHIFT+E': 'justifyCenter',                                                                             // 2423
          'CTRL+SHIFT+R': 'justifyRight',                                                                              // 2424
          'CTRL+SHIFT+J': 'justifyFull',                                                                               // 2425
          'CTRL+SHIFT+NUM7': 'insertUnorderedList',                                                                    // 2426
          'CTRL+SHIFT+NUM8': 'insertOrderedList',                                                                      // 2427
          'CTRL+LEFTBRACKET': 'outdent',                                                                               // 2428
          'CTRL+RIGHTBRACKET': 'indent',                                                                               // 2429
          'CTRL+NUM0': 'formatPara',                                                                                   // 2430
          'CTRL+NUM1': 'formatH1',                                                                                     // 2431
          'CTRL+NUM2': 'formatH2',                                                                                     // 2432
          'CTRL+NUM3': 'formatH3',                                                                                     // 2433
          'CTRL+NUM4': 'formatH4',                                                                                     // 2434
          'CTRL+NUM5': 'formatH5',                                                                                     // 2435
          'CTRL+NUM6': 'formatH6',                                                                                     // 2436
          'CTRL+ENTER': 'insertHorizontalRule',                                                                        // 2437
          'CTRL+K': 'showLinkDialog'                                                                                   // 2438
        },                                                                                                             // 2439
                                                                                                                       // 2440
        mac: {                                                                                                         // 2441
          'ENTER': 'insertParagraph',                                                                                  // 2442
          'CMD+Z': 'undo',                                                                                             // 2443
          'CMD+SHIFT+Z': 'redo',                                                                                       // 2444
          'TAB': 'tab',                                                                                                // 2445
          'SHIFT+TAB': 'untab',                                                                                        // 2446
          'CMD+B': 'bold',                                                                                             // 2447
          'CMD+I': 'italic',                                                                                           // 2448
          'CMD+U': 'underline',                                                                                        // 2449
          'CMD+SHIFT+S': 'strikethrough',                                                                              // 2450
          'CMD+BACKSLASH': 'removeFormat',                                                                             // 2451
          'CMD+SHIFT+L': 'justifyLeft',                                                                                // 2452
          'CMD+SHIFT+E': 'justifyCenter',                                                                              // 2453
          'CMD+SHIFT+R': 'justifyRight',                                                                               // 2454
          'CMD+SHIFT+J': 'justifyFull',                                                                                // 2455
          'CMD+SHIFT+NUM7': 'insertUnorderedList',                                                                     // 2456
          'CMD+SHIFT+NUM8': 'insertOrderedList',                                                                       // 2457
          'CMD+LEFTBRACKET': 'outdent',                                                                                // 2458
          'CMD+RIGHTBRACKET': 'indent',                                                                                // 2459
          'CMD+NUM0': 'formatPara',                                                                                    // 2460
          'CMD+NUM1': 'formatH1',                                                                                      // 2461
          'CMD+NUM2': 'formatH2',                                                                                      // 2462
          'CMD+NUM3': 'formatH3',                                                                                      // 2463
          'CMD+NUM4': 'formatH4',                                                                                      // 2464
          'CMD+NUM5': 'formatH5',                                                                                      // 2465
          'CMD+NUM6': 'formatH6',                                                                                      // 2466
          'CMD+ENTER': 'insertHorizontalRule',                                                                         // 2467
          'CMD+K': 'showLinkDialog'                                                                                    // 2468
        }                                                                                                              // 2469
      }                                                                                                                // 2470
    },                                                                                                                 // 2471
                                                                                                                       // 2472
    // default language: en-US                                                                                         // 2473
    lang: {                                                                                                            // 2474
      'en-US': {                                                                                                       // 2475
        font: {                                                                                                        // 2476
          bold: 'Bold',                                                                                                // 2477
          italic: 'Italic',                                                                                            // 2478
          underline: 'Underline',                                                                                      // 2479
          clear: 'Remove Font Style',                                                                                  // 2480
          height: 'Line Height',                                                                                       // 2481
          name: 'Font Family',                                                                                         // 2482
          strikethrough: 'Strikethrough',                                                                              // 2483
          subscript: 'Subscript',                                                                                      // 2484
          superscript: 'Superscript',                                                                                  // 2485
          size: 'Font Size'                                                                                            // 2486
        },                                                                                                             // 2487
        image: {                                                                                                       // 2488
          image: 'Picture',                                                                                            // 2489
          insert: 'Insert Image',                                                                                      // 2490
          resizeFull: 'Resize Full',                                                                                   // 2491
          resizeHalf: 'Resize Half',                                                                                   // 2492
          resizeQuarter: 'Resize Quarter',                                                                             // 2493
          floatLeft: 'Float Left',                                                                                     // 2494
          floatRight: 'Float Right',                                                                                   // 2495
          floatNone: 'Float None',                                                                                     // 2496
          shapeRounded: 'Shape: Rounded',                                                                              // 2497
          shapeCircle: 'Shape: Circle',                                                                                // 2498
          shapeThumbnail: 'Shape: Thumbnail',                                                                          // 2499
          shapeNone: 'Shape: None',                                                                                    // 2500
          dragImageHere: 'Drag image or text here',                                                                    // 2501
          dropImage: 'Drop image or Text',                                                                             // 2502
          selectFromFiles: 'Select from files',                                                                        // 2503
          maximumFileSize: 'Maximum file size',                                                                        // 2504
          maximumFileSizeError: 'Maximum file size exceeded.',                                                         // 2505
          url: 'Image URL',                                                                                            // 2506
          remove: 'Remove Image'                                                                                       // 2507
        },                                                                                                             // 2508
        link: {                                                                                                        // 2509
          link: 'Link',                                                                                                // 2510
          insert: 'Insert Link',                                                                                       // 2511
          unlink: 'Unlink',                                                                                            // 2512
          edit: 'Edit',                                                                                                // 2513
          textToDisplay: 'Text to display',                                                                            // 2514
          url: 'To what URL should this link go?',                                                                     // 2515
          openInNewWindow: 'Open in new window'                                                                        // 2516
        },                                                                                                             // 2517
        table: {                                                                                                       // 2518
          table: 'Table'                                                                                               // 2519
        },                                                                                                             // 2520
        hr: {                                                                                                          // 2521
          insert: 'Insert Horizontal Rule'                                                                             // 2522
        },                                                                                                             // 2523
        style: {                                                                                                       // 2524
          style: 'Style',                                                                                              // 2525
          normal: 'Normal',                                                                                            // 2526
          blockquote: 'Quote',                                                                                         // 2527
          pre: 'Code',                                                                                                 // 2528
          h1: 'Header 1',                                                                                              // 2529
          h2: 'Header 2',                                                                                              // 2530
          h3: 'Header 3',                                                                                              // 2531
          h4: 'Header 4',                                                                                              // 2532
          h5: 'Header 5',                                                                                              // 2533
          h6: 'Header 6'                                                                                               // 2534
        },                                                                                                             // 2535
        lists: {                                                                                                       // 2536
          unordered: 'Unordered list',                                                                                 // 2537
          ordered: 'Ordered list'                                                                                      // 2538
        },                                                                                                             // 2539
        options: {                                                                                                     // 2540
          help: 'Help',                                                                                                // 2541
          fullscreen: 'Full Screen',                                                                                   // 2542
          codeview: 'Code View'                                                                                        // 2543
        },                                                                                                             // 2544
        paragraph: {                                                                                                   // 2545
          paragraph: 'Paragraph',                                                                                      // 2546
          outdent: 'Outdent',                                                                                          // 2547
          indent: 'Indent',                                                                                            // 2548
          left: 'Align left',                                                                                          // 2549
          center: 'Align center',                                                                                      // 2550
          right: 'Align right',                                                                                        // 2551
          justify: 'Justify full'                                                                                      // 2552
        },                                                                                                             // 2553
        color: {                                                                                                       // 2554
          recent: 'Recent Color',                                                                                      // 2555
          more: 'More Color',                                                                                          // 2556
          background: 'Background Color',                                                                              // 2557
          foreground: 'Foreground Color',                                                                              // 2558
          transparent: 'Transparent',                                                                                  // 2559
          setTransparent: 'Set transparent',                                                                           // 2560
          reset: 'Reset',                                                                                              // 2561
          resetToDefault: 'Reset to default'                                                                           // 2562
        },                                                                                                             // 2563
        shortcut: {                                                                                                    // 2564
          shortcuts: 'Keyboard shortcuts',                                                                             // 2565
          close: 'Close',                                                                                              // 2566
          textFormatting: 'Text formatting',                                                                           // 2567
          action: 'Action',                                                                                            // 2568
          paragraphFormatting: 'Paragraph formatting',                                                                 // 2569
          documentStyle: 'Document Style',                                                                             // 2570
          extraKeys: 'Extra keys'                                                                                      // 2571
        },                                                                                                             // 2572
        history: {                                                                                                     // 2573
          undo: 'Undo',                                                                                                // 2574
          redo: 'Redo'                                                                                                 // 2575
        }                                                                                                              // 2576
      }                                                                                                                // 2577
    }                                                                                                                  // 2578
  };                                                                                                                   // 2579
                                                                                                                       // 2580
  /**                                                                                                                  // 2581
   * @class core.async                                                                                                 // 2582
   *                                                                                                                   // 2583
   * Async functions which returns `Promise`                                                                           // 2584
   *                                                                                                                   // 2585
   * @singleton                                                                                                        // 2586
   * @alternateClassName async                                                                                         // 2587
   */                                                                                                                  // 2588
  var async = (function () {                                                                                           // 2589
    /**                                                                                                                // 2590
     * @method readFileAsDataURL                                                                                       // 2591
     *                                                                                                                 // 2592
     * read contents of file as representing URL                                                                       // 2593
     *                                                                                                                 // 2594
     * @param {File} file                                                                                              // 2595
     * @return {Promise} - then: sDataUrl                                                                              // 2596
     */                                                                                                                // 2597
    var readFileAsDataURL = function (file) {                                                                          // 2598
      return $.Deferred(function (deferred) {                                                                          // 2599
        $.extend(new FileReader(), {                                                                                   // 2600
          onload: function (e) {                                                                                       // 2601
            var sDataURL = e.target.result;                                                                            // 2602
            deferred.resolve(sDataURL);                                                                                // 2603
          },                                                                                                           // 2604
          onerror: function () {                                                                                       // 2605
            deferred.reject(this);                                                                                     // 2606
          }                                                                                                            // 2607
        }).readAsDataURL(file);                                                                                        // 2608
      }).promise();                                                                                                    // 2609
    };                                                                                                                 // 2610
                                                                                                                       // 2611
    /**                                                                                                                // 2612
     * @method createImage                                                                                             // 2613
     *                                                                                                                 // 2614
     * create `<image>` from url string                                                                                // 2615
     *                                                                                                                 // 2616
     * @param {String} sUrl                                                                                            // 2617
     * @param {String} filename                                                                                        // 2618
     * @return {Promise} - then: $image                                                                                // 2619
     */                                                                                                                // 2620
    var createImage = function (sUrl, filename) {                                                                      // 2621
      return $.Deferred(function (deferred) {                                                                          // 2622
        var $img = $('<img>');                                                                                         // 2623
                                                                                                                       // 2624
        $img.one('load', function () {                                                                                 // 2625
          $img.off('error abort');                                                                                     // 2626
          deferred.resolve($img);                                                                                      // 2627
        }).one('error abort', function () {                                                                            // 2628
          $img.off('load').detach();                                                                                   // 2629
          deferred.reject($img);                                                                                       // 2630
        }).css({                                                                                                       // 2631
          display: 'none'                                                                                              // 2632
        }).appendTo(document.body).attr({                                                                              // 2633
          'src': sUrl,                                                                                                 // 2634
          'data-filename': filename                                                                                    // 2635
        });                                                                                                            // 2636
      }).promise();                                                                                                    // 2637
    };                                                                                                                 // 2638
                                                                                                                       // 2639
    return {                                                                                                           // 2640
      readFileAsDataURL: readFileAsDataURL,                                                                            // 2641
      createImage: createImage                                                                                         // 2642
    };                                                                                                                 // 2643
  })();                                                                                                                // 2644
                                                                                                                       // 2645
  /**                                                                                                                  // 2646
   * @class core.key                                                                                                   // 2647
   *                                                                                                                   // 2648
   * Object for keycodes.                                                                                              // 2649
   *                                                                                                                   // 2650
   * @singleton                                                                                                        // 2651
   * @alternateClassName key                                                                                           // 2652
   */                                                                                                                  // 2653
  var key = (function () {                                                                                             // 2654
    var keyMap = {                                                                                                     // 2655
      'BACKSPACE': 8,                                                                                                  // 2656
      'TAB': 9,                                                                                                        // 2657
      'ENTER': 13,                                                                                                     // 2658
      'SPACE': 32,                                                                                                     // 2659
                                                                                                                       // 2660
      // Number: 0-9                                                                                                   // 2661
      'NUM0': 48,                                                                                                      // 2662
      'NUM1': 49,                                                                                                      // 2663
      'NUM2': 50,                                                                                                      // 2664
      'NUM3': 51,                                                                                                      // 2665
      'NUM4': 52,                                                                                                      // 2666
      'NUM5': 53,                                                                                                      // 2667
      'NUM6': 54,                                                                                                      // 2668
      'NUM7': 55,                                                                                                      // 2669
      'NUM8': 56,                                                                                                      // 2670
                                                                                                                       // 2671
      // Alphabet: a-z                                                                                                 // 2672
      'B': 66,                                                                                                         // 2673
      'E': 69,                                                                                                         // 2674
      'I': 73,                                                                                                         // 2675
      'J': 74,                                                                                                         // 2676
      'K': 75,                                                                                                         // 2677
      'L': 76,                                                                                                         // 2678
      'R': 82,                                                                                                         // 2679
      'S': 83,                                                                                                         // 2680
      'U': 85,                                                                                                         // 2681
      'Y': 89,                                                                                                         // 2682
      'Z': 90,                                                                                                         // 2683
                                                                                                                       // 2684
      'SLASH': 191,                                                                                                    // 2685
      'LEFTBRACKET': 219,                                                                                              // 2686
      'BACKSLASH': 220,                                                                                                // 2687
      'RIGHTBRACKET': 221                                                                                              // 2688
    };                                                                                                                 // 2689
                                                                                                                       // 2690
    return {                                                                                                           // 2691
      /**                                                                                                              // 2692
       * @method isEdit                                                                                                // 2693
       *                                                                                                               // 2694
       * @param {Number} keyCode                                                                                       // 2695
       * @return {Boolean}                                                                                             // 2696
       */                                                                                                              // 2697
      isEdit: function (keyCode) {                                                                                     // 2698
        return list.contains([8, 9, 13, 32], keyCode);                                                                 // 2699
      },                                                                                                               // 2700
      /**                                                                                                              // 2701
       * @property {Object} nameFromCode                                                                               // 2702
       * @property {String} nameFromCode.8 "BACKSPACE"                                                                 // 2703
       */                                                                                                              // 2704
      nameFromCode: func.invertObject(keyMap),                                                                         // 2705
      code: keyMap                                                                                                     // 2706
    };                                                                                                                 // 2707
  })();                                                                                                                // 2708
                                                                                                                       // 2709
  /**                                                                                                                  // 2710
   * @class editing.History                                                                                            // 2711
   *                                                                                                                   // 2712
   * Editor History                                                                                                    // 2713
   *                                                                                                                   // 2714
   */                                                                                                                  // 2715
  var History = function ($editable) {                                                                                 // 2716
    var stack = [], stackOffset = -1;                                                                                  // 2717
    var editable = $editable[0];                                                                                       // 2718
                                                                                                                       // 2719
    var makeSnapshot = function () {                                                                                   // 2720
      var rng = range.create();                                                                                        // 2721
      var emptyBookmark = {s: {path: [], offset: 0}, e: {path: [], offset: 0}};                                        // 2722
                                                                                                                       // 2723
      return {                                                                                                         // 2724
        contents: $editable.html(),                                                                                    // 2725
        bookmark: (rng ? rng.bookmark(editable) : emptyBookmark)                                                       // 2726
      };                                                                                                               // 2727
    };                                                                                                                 // 2728
                                                                                                                       // 2729
    var applySnapshot = function (snapshot) {                                                                          // 2730
      if (snapshot.contents !== null) {                                                                                // 2731
        $editable.html(snapshot.contents);                                                                             // 2732
      }                                                                                                                // 2733
      if (snapshot.bookmark !== null) {                                                                                // 2734
        range.createFromBookmark(editable, snapshot.bookmark).select();                                                // 2735
      }                                                                                                                // 2736
    };                                                                                                                 // 2737
                                                                                                                       // 2738
    /**                                                                                                                // 2739
     * undo                                                                                                            // 2740
     */                                                                                                                // 2741
    this.undo = function () {                                                                                          // 2742
      if (0 < stackOffset) {                                                                                           // 2743
        stackOffset--;                                                                                                 // 2744
        applySnapshot(stack[stackOffset]);                                                                             // 2745
      }                                                                                                                // 2746
    };                                                                                                                 // 2747
                                                                                                                       // 2748
    /**                                                                                                                // 2749
     * redo                                                                                                            // 2750
     */                                                                                                                // 2751
    this.redo = function () {                                                                                          // 2752
      if (stack.length - 1 > stackOffset) {                                                                            // 2753
        stackOffset++;                                                                                                 // 2754
        applySnapshot(stack[stackOffset]);                                                                             // 2755
      }                                                                                                                // 2756
    };                                                                                                                 // 2757
                                                                                                                       // 2758
    /**                                                                                                                // 2759
     * recorded undo                                                                                                   // 2760
     */                                                                                                                // 2761
    this.recordUndo = function () {                                                                                    // 2762
      stackOffset++;                                                                                                   // 2763
                                                                                                                       // 2764
      // Wash out stack after stackOffset                                                                              // 2765
      if (stack.length > stackOffset) {                                                                                // 2766
        stack = stack.slice(0, stackOffset);                                                                           // 2767
      }                                                                                                                // 2768
                                                                                                                       // 2769
      // Create new snapshot and push it to the end                                                                    // 2770
      stack.push(makeSnapshot());                                                                                      // 2771
    };                                                                                                                 // 2772
                                                                                                                       // 2773
    // Create first undo stack                                                                                         // 2774
    this.recordUndo();                                                                                                 // 2775
  };                                                                                                                   // 2776
                                                                                                                       // 2777
  /**                                                                                                                  // 2778
   * @class editing.Style                                                                                              // 2779
   *                                                                                                                   // 2780
   * Style                                                                                                             // 2781
   *                                                                                                                   // 2782
   */                                                                                                                  // 2783
  var Style = function () {                                                                                            // 2784
    /**                                                                                                                // 2785
     * @method jQueryCSS                                                                                               // 2786
     *                                                                                                                 // 2787
     * [workaround] for old jQuery                                                                                     // 2788
     * passing an array of style properties to .css()                                                                  // 2789
     * will result in an object of property-value pairs.                                                               // 2790
     * (compability with version < 1.9)                                                                                // 2791
     *                                                                                                                 // 2792
     * @private                                                                                                        // 2793
     * @param  {jQuery} $obj                                                                                           // 2794
     * @param  {Array} propertyNames - An array of one or more CSS properties.                                         // 2795
     * @return {Object}                                                                                                // 2796
     */                                                                                                                // 2797
    var jQueryCSS = function ($obj, propertyNames) {                                                                   // 2798
      if (agent.jqueryVersion < 1.9) {                                                                                 // 2799
        var result = {};                                                                                               // 2800
        $.each(propertyNames, function (idx, propertyName) {                                                           // 2801
          result[propertyName] = $obj.css(propertyName);                                                               // 2802
        });                                                                                                            // 2803
        return result;                                                                                                 // 2804
      }                                                                                                                // 2805
      return $obj.css.call($obj, propertyNames);                                                                       // 2806
    };                                                                                                                 // 2807
                                                                                                                       // 2808
    /**                                                                                                                // 2809
     * paragraph level style                                                                                           // 2810
     *                                                                                                                 // 2811
     * @param {WrappedRange} rng                                                                                       // 2812
     * @param {Object} styleInfo                                                                                       // 2813
     */                                                                                                                // 2814
    this.stylePara = function (rng, styleInfo) {                                                                       // 2815
      $.each(rng.nodes(dom.isPara, {                                                                                   // 2816
        includeAncestor: true                                                                                          // 2817
      }), function (idx, para) {                                                                                       // 2818
        $(para).css(styleInfo);                                                                                        // 2819
      });                                                                                                              // 2820
    };                                                                                                                 // 2821
                                                                                                                       // 2822
    /**                                                                                                                // 2823
     * insert and returns styleNodes on range.                                                                         // 2824
     *                                                                                                                 // 2825
     * @param {WrappedRange} rng                                                                                       // 2826
     * @param {Object} [options] - options for styleNodes                                                              // 2827
     * @param {String} [options.nodeName] - default: `SPAN`                                                            // 2828
     * @param {Boolean} [options.expandClosestSibling] - default: `false`                                              // 2829
     * @param {Boolean} [options.onlyPartialContains] - default: `false`                                               // 2830
     * @return {Node[]}                                                                                                // 2831
     */                                                                                                                // 2832
    this.styleNodes = function (rng, options) {                                                                        // 2833
      rng = rng.splitText();                                                                                           // 2834
                                                                                                                       // 2835
      var nodeName = options && options.nodeName || 'SPAN';                                                            // 2836
      var expandClosestSibling = !!(options && options.expandClosestSibling);                                          // 2837
      var onlyPartialContains = !!(options && options.onlyPartialContains);                                            // 2838
                                                                                                                       // 2839
      if (rng.isCollapsed()) {                                                                                         // 2840
        return rng.insertNode(dom.create(nodeName));                                                                   // 2841
      }                                                                                                                // 2842
                                                                                                                       // 2843
      var pred = dom.makePredByNodeName(nodeName);                                                                     // 2844
      var nodes = $.map(rng.nodes(dom.isText, {                                                                        // 2845
        fullyContains: true                                                                                            // 2846
      }), function (text) {                                                                                            // 2847
        return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);                                        // 2848
      });                                                                                                              // 2849
                                                                                                                       // 2850
      if (expandClosestSibling) {                                                                                      // 2851
        if (onlyPartialContains) {                                                                                     // 2852
          var nodesInRange = rng.nodes();                                                                              // 2853
          // compose with partial contains predication                                                                 // 2854
          pred = func.and(pred, function (node) {                                                                      // 2855
            return list.contains(nodesInRange, node);                                                                  // 2856
          });                                                                                                          // 2857
        }                                                                                                              // 2858
                                                                                                                       // 2859
        return $.map(nodes, function (node) {                                                                          // 2860
          var siblings = dom.withClosestSiblings(node, pred);                                                          // 2861
          var head = list.head(siblings);                                                                              // 2862
          var tails = list.tail(siblings);                                                                             // 2863
          $.each(tails, function (idx, elem) {                                                                         // 2864
            dom.appendChildNodes(head, elem.childNodes);                                                               // 2865
            dom.remove(elem);                                                                                          // 2866
          });                                                                                                          // 2867
          return list.head(siblings);                                                                                  // 2868
        });                                                                                                            // 2869
      } else {                                                                                                         // 2870
        return nodes;                                                                                                  // 2871
      }                                                                                                                // 2872
    };                                                                                                                 // 2873
                                                                                                                       // 2874
    /**                                                                                                                // 2875
     * get current style on cursor                                                                                     // 2876
     *                                                                                                                 // 2877
     * @param {WrappedRange} rng                                                                                       // 2878
     * @param {Node} target - target element on event                                                                  // 2879
     * @return {Object} - object contains style properties.                                                            // 2880
     */                                                                                                                // 2881
    this.current = function (rng, target) {                                                                            // 2882
      var $cont = $(dom.isText(rng.sc) ? rng.sc.parentNode : rng.sc);                                                  // 2883
      var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];                   // 2884
      var styleInfo = jQueryCSS($cont, properties) || {};                                                              // 2885
                                                                                                                       // 2886
      styleInfo['font-size'] = parseInt(styleInfo['font-size'], 10);                                                   // 2887
                                                                                                                       // 2888
      // document.queryCommandState for toggle state                                                                   // 2889
      styleInfo['font-bold'] = document.queryCommandState('bold') ? 'bold' : 'normal';                                 // 2890
      styleInfo['font-italic'] = document.queryCommandState('italic') ? 'italic' : 'normal';                           // 2891
      styleInfo['font-underline'] = document.queryCommandState('underline') ? 'underline' : 'normal';                  // 2892
      styleInfo['font-strikethrough'] = document.queryCommandState('strikeThrough') ? 'strikethrough' : 'normal';      // 2893
      styleInfo['font-superscript'] = document.queryCommandState('superscript') ? 'superscript' : 'normal';            // 2894
      styleInfo['font-subscript'] = document.queryCommandState('subscript') ? 'subscript' : 'normal';                  // 2895
                                                                                                                       // 2896
      // list-style-type to list-style(unordered, ordered)                                                             // 2897
      if (!rng.isOnList()) {                                                                                           // 2898
        styleInfo['list-style'] = 'none';                                                                              // 2899
      } else {                                                                                                         // 2900
        var aOrderedType = ['circle', 'disc', 'disc-leading-zero', 'square'];                                          // 2901
        var isUnordered = $.inArray(styleInfo['list-style-type'], aOrderedType) > -1;                                  // 2902
        styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';                                               // 2903
      }                                                                                                                // 2904
                                                                                                                       // 2905
      var para = dom.ancestor(rng.sc, dom.isPara);                                                                     // 2906
      if (para && para.style['line-height']) {                                                                         // 2907
        styleInfo['line-height'] = para.style.lineHeight;                                                              // 2908
      } else {                                                                                                         // 2909
        var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);                // 2910
        styleInfo['line-height'] = lineHeight.toFixed(1);                                                              // 2911
      }                                                                                                                // 2912
                                                                                                                       // 2913
      styleInfo.image = dom.isImg(target) && target;                                                                   // 2914
      styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);                                       // 2915
      styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);                                                  // 2916
      styleInfo.range = rng;                                                                                           // 2917
                                                                                                                       // 2918
      return styleInfo;                                                                                                // 2919
    };                                                                                                                 // 2920
  };                                                                                                                   // 2921
                                                                                                                       // 2922
                                                                                                                       // 2923
  /**                                                                                                                  // 2924
   * @class editing.Bullet                                                                                             // 2925
   *                                                                                                                   // 2926
   * @alternateClassName Bullet                                                                                        // 2927
   */                                                                                                                  // 2928
  var Bullet = function () {                                                                                           // 2929
    /**                                                                                                                // 2930
     * @method insertOrderedList                                                                                       // 2931
     *                                                                                                                 // 2932
     * toggle ordered list                                                                                             // 2933
     *                                                                                                                 // 2934
     * @type command                                                                                                   // 2935
     */                                                                                                                // 2936
    this.insertOrderedList = function () {                                                                             // 2937
      this.toggleList('OL');                                                                                           // 2938
    };                                                                                                                 // 2939
                                                                                                                       // 2940
    /**                                                                                                                // 2941
     * @method insertUnorderedList                                                                                     // 2942
     *                                                                                                                 // 2943
     * toggle unordered list                                                                                           // 2944
     *                                                                                                                 // 2945
     * @type command                                                                                                   // 2946
     */                                                                                                                // 2947
    this.insertUnorderedList = function () {                                                                           // 2948
      this.toggleList('UL');                                                                                           // 2949
    };                                                                                                                 // 2950
                                                                                                                       // 2951
    /**                                                                                                                // 2952
     * @method indent                                                                                                  // 2953
     *                                                                                                                 // 2954
     * indent                                                                                                          // 2955
     *                                                                                                                 // 2956
     * @type command                                                                                                   // 2957
     */                                                                                                                // 2958
    this.indent = function () {                                                                                        // 2959
      var self = this;                                                                                                 // 2960
      var rng = range.create().wrapBodyInlineWithPara();                                                               // 2961
                                                                                                                       // 2962
      var paras = rng.nodes(dom.isPara, { includeAncestor: true });                                                    // 2963
      var clustereds = list.clusterBy(paras, func.peq2('parentNode'));                                                 // 2964
                                                                                                                       // 2965
      $.each(clustereds, function (idx, paras) {                                                                       // 2966
        var head = list.head(paras);                                                                                   // 2967
        if (dom.isLi(head)) {                                                                                          // 2968
          self.wrapList(paras, head.parentNode.nodeName);                                                              // 2969
        } else {                                                                                                       // 2970
          $.each(paras, function (idx, para) {                                                                         // 2971
            $(para).css('marginLeft', function (idx, val) {                                                            // 2972
              return (parseInt(val, 10) || 0) + 25;                                                                    // 2973
            });                                                                                                        // 2974
          });                                                                                                          // 2975
        }                                                                                                              // 2976
      });                                                                                                              // 2977
                                                                                                                       // 2978
      rng.select();                                                                                                    // 2979
    };                                                                                                                 // 2980
                                                                                                                       // 2981
    /**                                                                                                                // 2982
     * @method outdent                                                                                                 // 2983
     *                                                                                                                 // 2984
     * outdent                                                                                                         // 2985
     *                                                                                                                 // 2986
     * @type command                                                                                                   // 2987
     */                                                                                                                // 2988
    this.outdent = function () {                                                                                       // 2989
      var self = this;                                                                                                 // 2990
      var rng = range.create().wrapBodyInlineWithPara();                                                               // 2991
                                                                                                                       // 2992
      var paras = rng.nodes(dom.isPara, { includeAncestor: true });                                                    // 2993
      var clustereds = list.clusterBy(paras, func.peq2('parentNode'));                                                 // 2994
                                                                                                                       // 2995
      $.each(clustereds, function (idx, paras) {                                                                       // 2996
        var head = list.head(paras);                                                                                   // 2997
        if (dom.isLi(head)) {                                                                                          // 2998
          self.releaseList([paras]);                                                                                   // 2999
        } else {                                                                                                       // 3000
          $.each(paras, function (idx, para) {                                                                         // 3001
            $(para).css('marginLeft', function (idx, val) {                                                            // 3002
              val = (parseInt(val, 10) || 0);                                                                          // 3003
              return val > 25 ? val - 25 : '';                                                                         // 3004
            });                                                                                                        // 3005
          });                                                                                                          // 3006
        }                                                                                                              // 3007
      });                                                                                                              // 3008
                                                                                                                       // 3009
      rng.select();                                                                                                    // 3010
    };                                                                                                                 // 3011
                                                                                                                       // 3012
    /**                                                                                                                // 3013
     * @method toggleList                                                                                              // 3014
     *                                                                                                                 // 3015
     * toggle list                                                                                                     // 3016
     *                                                                                                                 // 3017
     * @param {String} listName - OL or UL                                                                             // 3018
     */                                                                                                                // 3019
    this.toggleList = function (listName) {                                                                            // 3020
      var self = this;                                                                                                 // 3021
      var rng = range.create().wrapBodyInlineWithPara();                                                               // 3022
                                                                                                                       // 3023
      var paras = rng.nodes(dom.isPara, { includeAncestor: true });                                                    // 3024
      var bookmark = rng.paraBookmark(paras);                                                                          // 3025
      var clustereds = list.clusterBy(paras, func.peq2('parentNode'));                                                 // 3026
                                                                                                                       // 3027
      // paragraph to list                                                                                             // 3028
      if (list.find(paras, dom.isPurePara)) {                                                                          // 3029
        var wrappedParas = [];                                                                                         // 3030
        $.each(clustereds, function (idx, paras) {                                                                     // 3031
          wrappedParas = wrappedParas.concat(self.wrapList(paras, listName));                                          // 3032
        });                                                                                                            // 3033
        paras = wrappedParas;                                                                                          // 3034
      // list to paragraph or change list style                                                                        // 3035
      } else {                                                                                                         // 3036
        var diffLists = rng.nodes(dom.isList, {                                                                        // 3037
          includeAncestor: true                                                                                        // 3038
        }).filter(function (listNode) {                                                                                // 3039
          return !$.nodeName(listNode, listName);                                                                      // 3040
        });                                                                                                            // 3041
                                                                                                                       // 3042
        if (diffLists.length) {                                                                                        // 3043
          $.each(diffLists, function (idx, listNode) {                                                                 // 3044
            dom.replace(listNode, listName);                                                                           // 3045
          });                                                                                                          // 3046
        } else {                                                                                                       // 3047
          paras = this.releaseList(clustereds, true);                                                                  // 3048
        }                                                                                                              // 3049
      }                                                                                                                // 3050
                                                                                                                       // 3051
      range.createFromParaBookmark(bookmark, paras).select();                                                          // 3052
    };                                                                                                                 // 3053
                                                                                                                       // 3054
    /**                                                                                                                // 3055
     * @method wrapList                                                                                                // 3056
     *                                                                                                                 // 3057
     * @param {Node[]} paras                                                                                           // 3058
     * @param {String} listName                                                                                        // 3059
     * @return {Node[]}                                                                                                // 3060
     */                                                                                                                // 3061
    this.wrapList = function (paras, listName) {                                                                       // 3062
      var head = list.head(paras);                                                                                     // 3063
      var last = list.last(paras);                                                                                     // 3064
                                                                                                                       // 3065
      var prevList = dom.isList(head.previousSibling) && head.previousSibling;                                         // 3066
      var nextList = dom.isList(last.nextSibling) && last.nextSibling;                                                 // 3067
                                                                                                                       // 3068
      var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last);                                  // 3069
                                                                                                                       // 3070
      // P to LI                                                                                                       // 3071
      paras = $.map(paras, function (para) {                                                                           // 3072
        return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;                                                  // 3073
      });                                                                                                              // 3074
                                                                                                                       // 3075
      // append to list(<ul>, <ol>)                                                                                    // 3076
      dom.appendChildNodes(listNode, paras);                                                                           // 3077
                                                                                                                       // 3078
      if (nextList) {                                                                                                  // 3079
        dom.appendChildNodes(listNode, list.from(nextList.childNodes));                                                // 3080
        dom.remove(nextList);                                                                                          // 3081
      }                                                                                                                // 3082
                                                                                                                       // 3083
      return paras;                                                                                                    // 3084
    };                                                                                                                 // 3085
                                                                                                                       // 3086
    /**                                                                                                                // 3087
     * @method releaseList                                                                                             // 3088
     *                                                                                                                 // 3089
     * @param {Array[]} clustereds                                                                                     // 3090
     * @param {Boolean} isEscapseToBody                                                                                // 3091
     * @return {Node[]}                                                                                                // 3092
     */                                                                                                                // 3093
    this.releaseList = function (clustereds, isEscapseToBody) {                                                        // 3094
      var releasedParas = [];                                                                                          // 3095
                                                                                                                       // 3096
      $.each(clustereds, function (idx, paras) {                                                                       // 3097
        var head = list.head(paras);                                                                                   // 3098
        var last = list.last(paras);                                                                                   // 3099
                                                                                                                       // 3100
        var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) :                                          // 3101
                                         head.parentNode;                                                              // 3102
        var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {                                      // 3103
          node: last.parentNode,                                                                                       // 3104
          offset: dom.position(last) + 1                                                                               // 3105
        }, {                                                                                                           // 3106
          isSkipPaddingBlankHTML: true                                                                                 // 3107
        }) : null;                                                                                                     // 3108
                                                                                                                       // 3109
        var middleList = dom.splitTree(headList, {                                                                     // 3110
          node: head.parentNode,                                                                                       // 3111
          offset: dom.position(head)                                                                                   // 3112
        }, {                                                                                                           // 3113
          isSkipPaddingBlankHTML: true                                                                                 // 3114
        });                                                                                                            // 3115
                                                                                                                       // 3116
        paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi) :                                           // 3117
                                  list.from(middleList.childNodes).filter(dom.isLi);                                   // 3118
                                                                                                                       // 3119
        // LI to P                                                                                                     // 3120
        if (isEscapseToBody || !dom.isList(headList.parentNode)) {                                                     // 3121
          paras = $.map(paras, function (para) {                                                                       // 3122
            return dom.replace(para, 'P');                                                                             // 3123
          });                                                                                                          // 3124
        }                                                                                                              // 3125
                                                                                                                       // 3126
        $.each(list.from(paras).reverse(), function (idx, para) {                                                      // 3127
          dom.insertAfter(para, headList);                                                                             // 3128
        });                                                                                                            // 3129
                                                                                                                       // 3130
        // remove empty lists                                                                                          // 3131
        var rootLists = list.compact([headList, middleList, lastList]);                                                // 3132
        $.each(rootLists, function (idx, rootList) {                                                                   // 3133
          var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));                                 // 3134
          $.each(listNodes.reverse(), function (idx, listNode) {                                                       // 3135
            if (!dom.nodeLength(listNode)) {                                                                           // 3136
              dom.remove(listNode, true);                                                                              // 3137
            }                                                                                                          // 3138
          });                                                                                                          // 3139
        });                                                                                                            // 3140
                                                                                                                       // 3141
        releasedParas = releasedParas.concat(paras);                                                                   // 3142
      });                                                                                                              // 3143
                                                                                                                       // 3144
      return releasedParas;                                                                                            // 3145
    };                                                                                                                 // 3146
  };                                                                                                                   // 3147
                                                                                                                       // 3148
                                                                                                                       // 3149
  /**                                                                                                                  // 3150
   * @class editing.Typing                                                                                             // 3151
   *                                                                                                                   // 3152
   * Typing                                                                                                            // 3153
   *                                                                                                                   // 3154
   */                                                                                                                  // 3155
  var Typing = function () {                                                                                           // 3156
                                                                                                                       // 3157
    // a Bullet instance to toggle lists off                                                                           // 3158
    var bullet = new Bullet();                                                                                         // 3159
                                                                                                                       // 3160
    /**                                                                                                                // 3161
     * insert tab                                                                                                      // 3162
     *                                                                                                                 // 3163
     * @param {jQuery} $editable                                                                                       // 3164
     * @param {WrappedRange} rng                                                                                       // 3165
     * @param {Number} tabsize                                                                                         // 3166
     */                                                                                                                // 3167
    this.insertTab = function ($editable, rng, tabsize) {                                                              // 3168
      var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));                                            // 3169
      rng = rng.deleteContents();                                                                                      // 3170
      rng.insertNode(tab, true);                                                                                       // 3171
                                                                                                                       // 3172
      rng = range.create(tab, tabsize);                                                                                // 3173
      rng.select();                                                                                                    // 3174
    };                                                                                                                 // 3175
                                                                                                                       // 3176
    /**                                                                                                                // 3177
     * insert paragraph                                                                                                // 3178
     */                                                                                                                // 3179
    this.insertParagraph = function () {                                                                               // 3180
      var rng = range.create();                                                                                        // 3181
                                                                                                                       // 3182
      // deleteContents on range.                                                                                      // 3183
      rng = rng.deleteContents();                                                                                      // 3184
                                                                                                                       // 3185
      // Wrap range if it needs to be wrapped by paragraph                                                             // 3186
      rng = rng.wrapBodyInlineWithPara();                                                                              // 3187
                                                                                                                       // 3188
      // finding paragraph                                                                                             // 3189
      var splitRoot = dom.ancestor(rng.sc, dom.isPara);                                                                // 3190
                                                                                                                       // 3191
      var nextPara;                                                                                                    // 3192
      // on paragraph: split paragraph                                                                                 // 3193
      if (splitRoot) {                                                                                                 // 3194
        // if it is an empty line with li                                                                              // 3195
        if (dom.isEmpty(splitRoot) && dom.isLi(splitRoot)) {                                                           // 3196
          // disable UL/OL and escape!                                                                                 // 3197
          bullet.toggleList(splitRoot.parentNode.nodeName);                                                            // 3198
          return;                                                                                                      // 3199
        // if new line has content (not a line break)                                                                  // 3200
        } else {                                                                                                       // 3201
          nextPara = dom.splitTree(splitRoot, rng.getStartPoint());                                                    // 3202
                                                                                                                       // 3203
          var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);                                         // 3204
          emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));                         // 3205
                                                                                                                       // 3206
          $.each(emptyAnchors, function (idx, anchor) {                                                                // 3207
            dom.remove(anchor);                                                                                        // 3208
          });                                                                                                          // 3209
        }                                                                                                              // 3210
      // no paragraph: insert empty paragraph                                                                          // 3211
      } else {                                                                                                         // 3212
        var next = rng.sc.childNodes[rng.so];                                                                          // 3213
        nextPara = $(dom.emptyPara)[0];                                                                                // 3214
        if (next) {                                                                                                    // 3215
          rng.sc.insertBefore(nextPara, next);                                                                         // 3216
        } else {                                                                                                       // 3217
          rng.sc.appendChild(nextPara);                                                                                // 3218
        }                                                                                                              // 3219
      }                                                                                                                // 3220
                                                                                                                       // 3221
      range.create(nextPara, 0).normalize().select();                                                                  // 3222
                                                                                                                       // 3223
    };                                                                                                                 // 3224
                                                                                                                       // 3225
  };                                                                                                                   // 3226
                                                                                                                       // 3227
  /**                                                                                                                  // 3228
   * @class editing.Table                                                                                              // 3229
   *                                                                                                                   // 3230
   * Table                                                                                                             // 3231
   *                                                                                                                   // 3232
   */                                                                                                                  // 3233
  var Table = function () {                                                                                            // 3234
    /**                                                                                                                // 3235
     * handle tab key                                                                                                  // 3236
     *                                                                                                                 // 3237
     * @param {WrappedRange} rng                                                                                       // 3238
     * @param {Boolean} isShift                                                                                        // 3239
     */                                                                                                                // 3240
    this.tab = function (rng, isShift) {                                                                               // 3241
      var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);                                                       // 3242
      var table = dom.ancestor(cell, dom.isTable);                                                                     // 3243
      var cells = dom.listDescendant(table, dom.isCell);                                                               // 3244
                                                                                                                       // 3245
      var nextCell = list[isShift ? 'prev' : 'next'](cells, cell);                                                     // 3246
      if (nextCell) {                                                                                                  // 3247
        range.create(nextCell, 0).select();                                                                            // 3248
      }                                                                                                                // 3249
    };                                                                                                                 // 3250
                                                                                                                       // 3251
    /**                                                                                                                // 3252
     * create empty table element                                                                                      // 3253
     *                                                                                                                 // 3254
     * @param {Number} rowCount                                                                                        // 3255
     * @param {Number} colCount                                                                                        // 3256
     * @return {Node}                                                                                                  // 3257
     */                                                                                                                // 3258
    this.createTable = function (colCount, rowCount) {                                                                 // 3259
      var tds = [], tdHTML;                                                                                            // 3260
      for (var idxCol = 0; idxCol < colCount; idxCol++) {                                                              // 3261
        tds.push('<td>' + dom.blank + '</td>');                                                                        // 3262
      }                                                                                                                // 3263
      tdHTML = tds.join('');                                                                                           // 3264
                                                                                                                       // 3265
      var trs = [], trHTML;                                                                                            // 3266
      for (var idxRow = 0; idxRow < rowCount; idxRow++) {                                                              // 3267
        trs.push('<tr>' + tdHTML + '</tr>');                                                                           // 3268
      }                                                                                                                // 3269
      trHTML = trs.join('');                                                                                           // 3270
      return $('<table class="table table-bordered">' + trHTML + '</table>')[0];                                       // 3271
    };                                                                                                                 // 3272
  };                                                                                                                   // 3273
                                                                                                                       // 3274
  /**                                                                                                                  // 3275
   * @class editing.Editor                                                                                             // 3276
   *                                                                                                                   // 3277
   * Editor                                                                                                            // 3278
   *                                                                                                                   // 3279
   */                                                                                                                  // 3280
  var Editor = function (handler) {                                                                                    // 3281
                                                                                                                       // 3282
    var style = new Style();                                                                                           // 3283
    var table = new Table();                                                                                           // 3284
    var typing = new Typing();                                                                                         // 3285
    var bullet = new Bullet();                                                                                         // 3286
                                                                                                                       // 3287
    /**                                                                                                                // 3288
     * @method createRange                                                                                             // 3289
     *                                                                                                                 // 3290
     * create range                                                                                                    // 3291
     *                                                                                                                 // 3292
     * @param {jQuery} $editable                                                                                       // 3293
     * @return {WrappedRange}                                                                                          // 3294
     */                                                                                                                // 3295
    this.createRange = function ($editable) {                                                                          // 3296
      $editable.focus();                                                                                               // 3297
      return range.create();                                                                                           // 3298
    };                                                                                                                 // 3299
                                                                                                                       // 3300
    /**                                                                                                                // 3301
     * @method saveRange                                                                                               // 3302
     *                                                                                                                 // 3303
     * save current range                                                                                              // 3304
     *                                                                                                                 // 3305
     * @param {jQuery} $editable                                                                                       // 3306
     * @param {Boolean} [thenCollapse=false]                                                                           // 3307
     */                                                                                                                // 3308
    this.saveRange = function ($editable, thenCollapse) {                                                              // 3309
      $editable.focus();                                                                                               // 3310
      $editable.data('range', range.create());                                                                         // 3311
      if (thenCollapse) {                                                                                              // 3312
        range.create().collapse().select();                                                                            // 3313
      }                                                                                                                // 3314
    };                                                                                                                 // 3315
                                                                                                                       // 3316
    /**                                                                                                                // 3317
     * @method saveRange                                                                                               // 3318
     *                                                                                                                 // 3319
     * save current node list to $editable.data('childNodes')                                                          // 3320
     *                                                                                                                 // 3321
     * @param {jQuery} $editable                                                                                       // 3322
     */                                                                                                                // 3323
    this.saveNode = function ($editable) {                                                                             // 3324
      // copy child node reference                                                                                     // 3325
      var copy = [];                                                                                                   // 3326
      for (var key  = 0, len = $editable[0].childNodes.length; key < len; key++) {                                     // 3327
        copy.push($editable[0].childNodes[key]);                                                                       // 3328
      }                                                                                                                // 3329
      $editable.data('childNodes', copy);                                                                              // 3330
    };                                                                                                                 // 3331
                                                                                                                       // 3332
    /**                                                                                                                // 3333
     * @method restoreRange                                                                                            // 3334
     *                                                                                                                 // 3335
     * restore lately range                                                                                            // 3336
     *                                                                                                                 // 3337
     * @param {jQuery} $editable                                                                                       // 3338
     */                                                                                                                // 3339
    this.restoreRange = function ($editable) {                                                                         // 3340
      var rng = $editable.data('range');                                                                               // 3341
      if (rng) {                                                                                                       // 3342
        rng.select();                                                                                                  // 3343
        $editable.focus();                                                                                             // 3344
      }                                                                                                                // 3345
    };                                                                                                                 // 3346
                                                                                                                       // 3347
    /**                                                                                                                // 3348
     * @method restoreNode                                                                                             // 3349
     *                                                                                                                 // 3350
     * restore lately node list                                                                                        // 3351
     *                                                                                                                 // 3352
     * @param {jQuery} $editable                                                                                       // 3353
     */                                                                                                                // 3354
    this.restoreNode = function ($editable) {                                                                          // 3355
      $editable.html('');                                                                                              // 3356
      var child = $editable.data('childNodes');                                                                        // 3357
      for (var index = 0, len = child.length; index < len; index++) {                                                  // 3358
        $editable[0].appendChild(child[index]);                                                                        // 3359
      }                                                                                                                // 3360
    };                                                                                                                 // 3361
    /**                                                                                                                // 3362
     * @method currentStyle                                                                                            // 3363
     *                                                                                                                 // 3364
     * current style                                                                                                   // 3365
     *                                                                                                                 // 3366
     * @param {Node} target                                                                                            // 3367
     * @return {Boolean} false if range is no                                                                          // 3368
     */                                                                                                                // 3369
    this.currentStyle = function (target) {                                                                            // 3370
      var rng = range.create();                                                                                        // 3371
      return rng ? rng.isOnEditable() && style.current(rng, target) : false;                                           // 3372
    };                                                                                                                 // 3373
                                                                                                                       // 3374
    var triggerOnBeforeChange = function ($editable) {                                                                 // 3375
      var $holder = dom.makeLayoutInfo($editable).holder();                                                            // 3376
      handler.bindCustomEvent(                                                                                         // 3377
        $holder, $editable.data('callbacks'), 'before.command'                                                         // 3378
      )($editable.html(), $editable);                                                                                  // 3379
    };                                                                                                                 // 3380
                                                                                                                       // 3381
    var triggerOnChange = function ($editable) {                                                                       // 3382
      var $holder = dom.makeLayoutInfo($editable).holder();                                                            // 3383
      handler.bindCustomEvent(                                                                                         // 3384
        $holder, $editable.data('callbacks'), 'change'                                                                 // 3385
      )($editable.html(), $editable);                                                                                  // 3386
    };                                                                                                                 // 3387
                                                                                                                       // 3388
    /**                                                                                                                // 3389
     * @method undo                                                                                                    // 3390
     * undo                                                                                                            // 3391
     * @param {jQuery} $editable                                                                                       // 3392
     */                                                                                                                // 3393
    this.undo = function ($editable) {                                                                                 // 3394
      triggerOnBeforeChange($editable);                                                                                // 3395
      $editable.data('NoteHistory').undo();                                                                            // 3396
      triggerOnChange($editable);                                                                                      // 3397
    };                                                                                                                 // 3398
                                                                                                                       // 3399
    /**                                                                                                                // 3400
     * @method redo                                                                                                    // 3401
     * redo                                                                                                            // 3402
     * @param {jQuery} $editable                                                                                       // 3403
     */                                                                                                                // 3404
    this.redo = function ($editable) {                                                                                 // 3405
      triggerOnBeforeChange($editable);                                                                                // 3406
      $editable.data('NoteHistory').redo();                                                                            // 3407
      triggerOnChange($editable);                                                                                      // 3408
    };                                                                                                                 // 3409
                                                                                                                       // 3410
    /**                                                                                                                // 3411
     * @method beforeCommand                                                                                           // 3412
     * before command                                                                                                  // 3413
     * @param {jQuery} $editable                                                                                       // 3414
     */                                                                                                                // 3415
    var beforeCommand = this.beforeCommand = function ($editable) {                                                    // 3416
      triggerOnBeforeChange($editable);                                                                                // 3417
    };                                                                                                                 // 3418
                                                                                                                       // 3419
    /**                                                                                                                // 3420
     * @method afterCommand                                                                                            // 3421
     * after command                                                                                                   // 3422
     * @param {jQuery} $editable                                                                                       // 3423
     * @param {Boolean} isPreventTrigger                                                                               // 3424
     */                                                                                                                // 3425
    var afterCommand = this.afterCommand = function ($editable, isPreventTrigger) {                                    // 3426
      $editable.data('NoteHistory').recordUndo();                                                                      // 3427
      if (!isPreventTrigger) {                                                                                         // 3428
        triggerOnChange($editable);                                                                                    // 3429
      }                                                                                                                // 3430
    };                                                                                                                 // 3431
                                                                                                                       // 3432
    /**                                                                                                                // 3433
     * @method bold                                                                                                    // 3434
     * @param {jQuery} $editable                                                                                       // 3435
     * @param {Mixed} value                                                                                            // 3436
     */                                                                                                                // 3437
                                                                                                                       // 3438
    /**                                                                                                                // 3439
     * @method italic                                                                                                  // 3440
     * @param {jQuery} $editable                                                                                       // 3441
     * @param {Mixed} value                                                                                            // 3442
     */                                                                                                                // 3443
                                                                                                                       // 3444
    /**                                                                                                                // 3445
     * @method underline                                                                                               // 3446
     * @param {jQuery} $editable                                                                                       // 3447
     * @param {Mixed} value                                                                                            // 3448
     */                                                                                                                // 3449
                                                                                                                       // 3450
    /**                                                                                                                // 3451
     * @method strikethrough                                                                                           // 3452
     * @param {jQuery} $editable                                                                                       // 3453
     * @param {Mixed} value                                                                                            // 3454
     */                                                                                                                // 3455
                                                                                                                       // 3456
    /**                                                                                                                // 3457
     * @method formatBlock                                                                                             // 3458
     * @param {jQuery} $editable                                                                                       // 3459
     * @param {Mixed} value                                                                                            // 3460
     */                                                                                                                // 3461
                                                                                                                       // 3462
    /**                                                                                                                // 3463
     * @method superscript                                                                                             // 3464
     * @param {jQuery} $editable                                                                                       // 3465
     * @param {Mixed} value                                                                                            // 3466
     */                                                                                                                // 3467
                                                                                                                       // 3468
    /**                                                                                                                // 3469
     * @method subscript                                                                                               // 3470
     * @param {jQuery} $editable                                                                                       // 3471
     * @param {Mixed} value                                                                                            // 3472
     */                                                                                                                // 3473
                                                                                                                       // 3474
    /**                                                                                                                // 3475
     * @method justifyLeft                                                                                             // 3476
     * @param {jQuery} $editable                                                                                       // 3477
     * @param {Mixed} value                                                                                            // 3478
     */                                                                                                                // 3479
                                                                                                                       // 3480
    /**                                                                                                                // 3481
     * @method justifyCenter                                                                                           // 3482
     * @param {jQuery} $editable                                                                                       // 3483
     * @param {Mixed} value                                                                                            // 3484
     */                                                                                                                // 3485
                                                                                                                       // 3486
    /**                                                                                                                // 3487
     * @method justifyRight                                                                                            // 3488
     * @param {jQuery} $editable                                                                                       // 3489
     * @param {Mixed} value                                                                                            // 3490
     */                                                                                                                // 3491
                                                                                                                       // 3492
    /**                                                                                                                // 3493
     * @method justifyFull                                                                                             // 3494
     * @param {jQuery} $editable                                                                                       // 3495
     * @param {Mixed} value                                                                                            // 3496
     */                                                                                                                // 3497
                                                                                                                       // 3498
    /**                                                                                                                // 3499
     * @method formatBlock                                                                                             // 3500
     * @param {jQuery} $editable                                                                                       // 3501
     * @param {Mixed} value                                                                                            // 3502
     */                                                                                                                // 3503
                                                                                                                       // 3504
    /**                                                                                                                // 3505
     * @method removeFormat                                                                                            // 3506
     * @param {jQuery} $editable                                                                                       // 3507
     * @param {Mixed} value                                                                                            // 3508
     */                                                                                                                // 3509
                                                                                                                       // 3510
    /**                                                                                                                // 3511
     * @method backColor                                                                                               // 3512
     * @param {jQuery} $editable                                                                                       // 3513
     * @param {Mixed} value                                                                                            // 3514
     */                                                                                                                // 3515
                                                                                                                       // 3516
    /**                                                                                                                // 3517
     * @method foreColor                                                                                               // 3518
     * @param {jQuery} $editable                                                                                       // 3519
     * @param {Mixed} value                                                                                            // 3520
     */                                                                                                                // 3521
                                                                                                                       // 3522
    /**                                                                                                                // 3523
     * @method insertHorizontalRule                                                                                    // 3524
     * @param {jQuery} $editable                                                                                       // 3525
     * @param {Mixed} value                                                                                            // 3526
     */                                                                                                                // 3527
                                                                                                                       // 3528
    /**                                                                                                                // 3529
     * @method fontName                                                                                                // 3530
     *                                                                                                                 // 3531
     * change font name                                                                                                // 3532
     *                                                                                                                 // 3533
     * @param {jQuery} $editable                                                                                       // 3534
     * @param {Mixed} value                                                                                            // 3535
     */                                                                                                                // 3536
                                                                                                                       // 3537
    /* jshint ignore:start */                                                                                          // 3538
    // native commands(with execCommand), generate function for execCommand                                            // 3539
    var commands = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',                        // 3540
                    'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',                                     // 3541
                    'formatBlock', 'removeFormat',                                                                     // 3542
                    'backColor', 'foreColor', 'insertHorizontalRule', 'fontName'];                                     // 3543
                                                                                                                       // 3544
    for (var idx = 0, len = commands.length; idx < len; idx ++) {                                                      // 3545
      this[commands[idx]] = (function (sCmd) {                                                                         // 3546
        return function ($editable, value) {                                                                           // 3547
          beforeCommand($editable);                                                                                    // 3548
                                                                                                                       // 3549
          document.execCommand(sCmd, false, value);                                                                    // 3550
                                                                                                                       // 3551
          afterCommand($editable, true);                                                                               // 3552
        };                                                                                                             // 3553
      })(commands[idx]);                                                                                               // 3554
    }                                                                                                                  // 3555
    /* jshint ignore:end */                                                                                            // 3556
                                                                                                                       // 3557
    /**                                                                                                                // 3558
     * @method tab                                                                                                     // 3559
     *                                                                                                                 // 3560
     * handle tab key                                                                                                  // 3561
     *                                                                                                                 // 3562
     * @param {jQuery} $editable                                                                                       // 3563
     * @param {Object} options                                                                                         // 3564
     */                                                                                                                // 3565
    this.tab = function ($editable, options) {                                                                         // 3566
      var rng = range.create();                                                                                        // 3567
      if (rng.isCollapsed() && rng.isOnCell()) {                                                                       // 3568
        table.tab(rng);                                                                                                // 3569
      } else {                                                                                                         // 3570
        beforeCommand($editable);                                                                                      // 3571
        typing.insertTab($editable, rng, options.tabsize);                                                             // 3572
        afterCommand($editable);                                                                                       // 3573
      }                                                                                                                // 3574
    };                                                                                                                 // 3575
                                                                                                                       // 3576
    /**                                                                                                                // 3577
     * @method untab                                                                                                   // 3578
     *                                                                                                                 // 3579
     * handle shift+tab key                                                                                            // 3580
     *                                                                                                                 // 3581
     */                                                                                                                // 3582
    this.untab = function () {                                                                                         // 3583
      var rng = range.create();                                                                                        // 3584
      if (rng.isCollapsed() && rng.isOnCell()) {                                                                       // 3585
        table.tab(rng, true);                                                                                          // 3586
      }                                                                                                                // 3587
    };                                                                                                                 // 3588
                                                                                                                       // 3589
    /**                                                                                                                // 3590
     * @method insertParagraph                                                                                         // 3591
     *                                                                                                                 // 3592
     * insert paragraph                                                                                                // 3593
     *                                                                                                                 // 3594
     * @param {Node} $editable                                                                                         // 3595
     */                                                                                                                // 3596
    this.insertParagraph = function ($editable) {                                                                      // 3597
      beforeCommand($editable);                                                                                        // 3598
      typing.insertParagraph($editable);                                                                               // 3599
      afterCommand($editable);                                                                                         // 3600
    };                                                                                                                 // 3601
                                                                                                                       // 3602
    /**                                                                                                                // 3603
     * @method insertOrderedList                                                                                       // 3604
     *                                                                                                                 // 3605
     * @param {jQuery} $editable                                                                                       // 3606
     */                                                                                                                // 3607
    this.insertOrderedList = function ($editable) {                                                                    // 3608
      beforeCommand($editable);                                                                                        // 3609
      bullet.insertOrderedList($editable);                                                                             // 3610
      afterCommand($editable);                                                                                         // 3611
    };                                                                                                                 // 3612
                                                                                                                       // 3613
    /**                                                                                                                // 3614
     * @param {jQuery} $editable                                                                                       // 3615
     */                                                                                                                // 3616
    this.insertUnorderedList = function ($editable) {                                                                  // 3617
      beforeCommand($editable);                                                                                        // 3618
      bullet.insertUnorderedList($editable);                                                                           // 3619
      afterCommand($editable);                                                                                         // 3620
    };                                                                                                                 // 3621
                                                                                                                       // 3622
    /**                                                                                                                // 3623
     * @param {jQuery} $editable                                                                                       // 3624
     */                                                                                                                // 3625
    this.indent = function ($editable) {                                                                               // 3626
      beforeCommand($editable);                                                                                        // 3627
      bullet.indent($editable);                                                                                        // 3628
      afterCommand($editable);                                                                                         // 3629
    };                                                                                                                 // 3630
                                                                                                                       // 3631
    /**                                                                                                                // 3632
     * @param {jQuery} $editable                                                                                       // 3633
     */                                                                                                                // 3634
    this.outdent = function ($editable) {                                                                              // 3635
      beforeCommand($editable);                                                                                        // 3636
      bullet.outdent($editable);                                                                                       // 3637
      afterCommand($editable);                                                                                         // 3638
    };                                                                                                                 // 3639
                                                                                                                       // 3640
    /**                                                                                                                // 3641
     * insert image                                                                                                    // 3642
     *                                                                                                                 // 3643
     * @param {jQuery} $editable                                                                                       // 3644
     * @param {String} sUrl                                                                                            // 3645
     */                                                                                                                // 3646
    this.insertImage = function ($editable, sUrl, filename) {                                                          // 3647
      async.createImage(sUrl, filename).then(function ($image) {                                                       // 3648
        beforeCommand($editable);                                                                                      // 3649
        $image.css({                                                                                                   // 3650
          display: '',                                                                                                 // 3651
          width: Math.min($editable.width(), $image.width())                                                           // 3652
        });                                                                                                            // 3653
        range.create().insertNode($image[0]);                                                                          // 3654
        range.createFromNode($image[0]).collapse().select();                                                           // 3655
        afterCommand($editable);                                                                                       // 3656
      }).fail(function () {                                                                                            // 3657
        var callbacks = $editable.data('callbacks');                                                                   // 3658
        if (callbacks.onImageUploadError) {                                                                            // 3659
          callbacks.onImageUploadError();                                                                              // 3660
        }                                                                                                              // 3661
      });                                                                                                              // 3662
    };                                                                                                                 // 3663
                                                                                                                       // 3664
    /**                                                                                                                // 3665
     * @method insertNode                                                                                              // 3666
     * insert node                                                                                                     // 3667
     * @param {Node} $editable                                                                                         // 3668
     * @param {Node} node                                                                                              // 3669
     */                                                                                                                // 3670
    this.insertNode = function ($editable, node) {                                                                     // 3671
      beforeCommand($editable);                                                                                        // 3672
      var rng = this.createRange($editable);                                                                           // 3673
      rng.insertNode(node);                                                                                            // 3674
      range.createFromNode(node).collapse().select();                                                                  // 3675
      afterCommand($editable);                                                                                         // 3676
    };                                                                                                                 // 3677
                                                                                                                       // 3678
    /**                                                                                                                // 3679
     * insert text                                                                                                     // 3680
     * @param {Node} $editable                                                                                         // 3681
     * @param {String} text                                                                                            // 3682
     */                                                                                                                // 3683
    this.insertText = function ($editable, text) {                                                                     // 3684
      beforeCommand($editable);                                                                                        // 3685
      var rng = this.createRange($editable);                                                                           // 3686
      var textNode = rng.insertNode(dom.createText(text));                                                             // 3687
      range.create(textNode, dom.nodeLength(textNode)).select();                                                       // 3688
      afterCommand($editable);                                                                                         // 3689
    };                                                                                                                 // 3690
                                                                                                                       // 3691
    /**                                                                                                                // 3692
     * paste HTML                                                                                                      // 3693
     * @param {Node} $editable                                                                                         // 3694
     * @param {String} markup                                                                                          // 3695
     */                                                                                                                // 3696
    this.pasteHTML = function ($editable, markup) {                                                                    // 3697
      beforeCommand($editable);                                                                                        // 3698
      var rng = this.createRange($editable);                                                                           // 3699
      var contents = rng.pasteHTML(markup);                                                                            // 3700
      range.createFromNode(list.last(contents)).collapse().select();                                                   // 3701
      afterCommand($editable);                                                                                         // 3702
    };                                                                                                                 // 3703
                                                                                                                       // 3704
    /**                                                                                                                // 3705
     * formatBlock                                                                                                     // 3706
     *                                                                                                                 // 3707
     * @param {jQuery} $editable                                                                                       // 3708
     * @param {String} tagName                                                                                         // 3709
     */                                                                                                                // 3710
    this.formatBlock = function ($editable, tagName) {                                                                 // 3711
      beforeCommand($editable);                                                                                        // 3712
      // [workaround] for MSIE, IE need `<`                                                                            // 3713
      tagName = agent.isMSIE ? '<' + tagName + '>' : tagName;                                                          // 3714
      document.execCommand('FormatBlock', false, tagName);                                                             // 3715
      afterCommand($editable);                                                                                         // 3716
    };                                                                                                                 // 3717
                                                                                                                       // 3718
    this.formatPara = function ($editable) {                                                                           // 3719
      beforeCommand($editable);                                                                                        // 3720
      this.formatBlock($editable, 'P');                                                                                // 3721
      afterCommand($editable);                                                                                         // 3722
    };                                                                                                                 // 3723
                                                                                                                       // 3724
    /* jshint ignore:start */                                                                                          // 3725
    for (var idx = 1; idx <= 6; idx ++) {                                                                              // 3726
      this['formatH' + idx] = function (idx) {                                                                         // 3727
        return function ($editable) {                                                                                  // 3728
          this.formatBlock($editable, 'H' + idx);                                                                      // 3729
        };                                                                                                             // 3730
      }(idx);                                                                                                          // 3731
    };                                                                                                                 // 3732
    /* jshint ignore:end */                                                                                            // 3733
                                                                                                                       // 3734
    /**                                                                                                                // 3735
     * fontSize                                                                                                        // 3736
     *                                                                                                                 // 3737
     * @param {jQuery} $editable                                                                                       // 3738
     * @param {String} value - px                                                                                      // 3739
     */                                                                                                                // 3740
    this.fontSize = function ($editable, value) {                                                                      // 3741
      beforeCommand($editable);                                                                                        // 3742
                                                                                                                       // 3743
      var rng = this.createRange($editable);                                                                           // 3744
      var spans = style.styleNodes(rng);                                                                               // 3745
      $.each(spans, function (idx, span) {                                                                             // 3746
        $(span).css({                                                                                                  // 3747
          'font-size': value + 'px'                                                                                    // 3748
        });                                                                                                            // 3749
      });                                                                                                              // 3750
                                                                                                                       // 3751
      afterCommand($editable);                                                                                         // 3752
    };                                                                                                                 // 3753
                                                                                                                       // 3754
    /**                                                                                                                // 3755
     * lineHeight                                                                                                      // 3756
     * @param {jQuery} $editable                                                                                       // 3757
     * @param {String} value                                                                                           // 3758
     */                                                                                                                // 3759
    this.lineHeight = function ($editable, value) {                                                                    // 3760
      beforeCommand($editable);                                                                                        // 3761
      style.stylePara(range.create(), {                                                                                // 3762
        lineHeight: value                                                                                              // 3763
      });                                                                                                              // 3764
      afterCommand($editable);                                                                                         // 3765
    };                                                                                                                 // 3766
                                                                                                                       // 3767
    /**                                                                                                                // 3768
     * unlink                                                                                                          // 3769
     *                                                                                                                 // 3770
     * @type command                                                                                                   // 3771
     *                                                                                                                 // 3772
     * @param {jQuery} $editable                                                                                       // 3773
     */                                                                                                                // 3774
    this.unlink = function ($editable) {                                                                               // 3775
      var rng = range.create();                                                                                        // 3776
      if (rng.isOnAnchor()) {                                                                                          // 3777
        var anchor = dom.ancestor(rng.sc, dom.isAnchor);                                                               // 3778
        rng = range.createFromNode(anchor);                                                                            // 3779
        rng.select();                                                                                                  // 3780
                                                                                                                       // 3781
        beforeCommand($editable);                                                                                      // 3782
        document.execCommand('unlink');                                                                                // 3783
        afterCommand($editable);                                                                                       // 3784
      }                                                                                                                // 3785
    };                                                                                                                 // 3786
                                                                                                                       // 3787
    /**                                                                                                                // 3788
     * create link (command)                                                                                           // 3789
     *                                                                                                                 // 3790
     * @param {jQuery} $editable                                                                                       // 3791
     * @param {Object} linkInfo                                                                                        // 3792
     * @param {Object} options                                                                                         // 3793
     */                                                                                                                // 3794
    this.createLink = function ($editable, linkInfo, options) {                                                        // 3795
      var linkUrl = linkInfo.url;                                                                                      // 3796
      var linkText = linkInfo.text;                                                                                    // 3797
      var isNewWindow = linkInfo.newWindow;                                                                            // 3798
      var rng = linkInfo.range;                                                                                        // 3799
      var isTextChanged = rng.toString() !== linkText;                                                                 // 3800
                                                                                                                       // 3801
      beforeCommand($editable);                                                                                        // 3802
                                                                                                                       // 3803
      if (options.onCreateLink) {                                                                                      // 3804
        linkUrl = options.onCreateLink(linkUrl);                                                                       // 3805
      }                                                                                                                // 3806
                                                                                                                       // 3807
      var anchors;                                                                                                     // 3808
      if (isTextChanged) {                                                                                             // 3809
        // Create a new link when text changed.                                                                        // 3810
        var anchor = rng.insertNode($('<A>' + linkText + '</A>')[0]);                                                  // 3811
        anchors = [anchor];                                                                                            // 3812
      } else {                                                                                                         // 3813
        anchors = style.styleNodes(rng, {                                                                              // 3814
          nodeName: 'A',                                                                                               // 3815
          expandClosestSibling: true,                                                                                  // 3816
          onlyPartialContains: true                                                                                    // 3817
        });                                                                                                            // 3818
      }                                                                                                                // 3819
                                                                                                                       // 3820
      $.each(anchors, function (idx, anchor) {                                                                         // 3821
        $(anchor).attr('href', linkUrl);                                                                               // 3822
        if (isNewWindow) {                                                                                             // 3823
          $(anchor).attr('target', '_blank');                                                                          // 3824
        } else {                                                                                                       // 3825
          $(anchor).removeAttr('target');                                                                              // 3826
        }                                                                                                              // 3827
      });                                                                                                              // 3828
                                                                                                                       // 3829
      var startRange = range.createFromNode(list.head(anchors)).collapse(true);                                        // 3830
      var startPoint = startRange.getStartPoint();                                                                     // 3831
      var endRange = range.createFromNode(list.last(anchors)).collapse();                                              // 3832
      var endPoint = endRange.getEndPoint();                                                                           // 3833
                                                                                                                       // 3834
      range.create(                                                                                                    // 3835
        startPoint.node,                                                                                               // 3836
        startPoint.offset,                                                                                             // 3837
        endPoint.node,                                                                                                 // 3838
        endPoint.offset                                                                                                // 3839
      ).select();                                                                                                      // 3840
                                                                                                                       // 3841
      afterCommand($editable);                                                                                         // 3842
    };                                                                                                                 // 3843
                                                                                                                       // 3844
    /**                                                                                                                // 3845
     * returns link info                                                                                               // 3846
     *                                                                                                                 // 3847
     * @return {Object}                                                                                                // 3848
     * @return {WrappedRange} return.range                                                                             // 3849
     * @return {String} return.text                                                                                    // 3850
     * @return {Boolean} [return.isNewWindow=true]                                                                     // 3851
     * @return {String} [return.url=""]                                                                                // 3852
     */                                                                                                                // 3853
    this.getLinkInfo = function ($editable) {                                                                          // 3854
      $editable.focus();                                                                                               // 3855
                                                                                                                       // 3856
      var rng = range.create().expand(dom.isAnchor);                                                                   // 3857
                                                                                                                       // 3858
      // Get the first anchor on range(for edit).                                                                      // 3859
      var $anchor = $(list.head(rng.nodes(dom.isAnchor)));                                                             // 3860
                                                                                                                       // 3861
      return {                                                                                                         // 3862
        range: rng,                                                                                                    // 3863
        text: rng.toString(),                                                                                          // 3864
        isNewWindow: $anchor.length ? $anchor.attr('target') === '_blank' : false,                                     // 3865
        url: $anchor.length ? $anchor.attr('href') : ''                                                                // 3866
      };                                                                                                               // 3867
    };                                                                                                                 // 3868
                                                                                                                       // 3869
    /**                                                                                                                // 3870
     * setting color                                                                                                   // 3871
     *                                                                                                                 // 3872
     * @param {Node} $editable                                                                                         // 3873
     * @param {Object} sObjColor  color code                                                                           // 3874
     * @param {String} sObjColor.foreColor foreground color                                                            // 3875
     * @param {String} sObjColor.backColor background color                                                            // 3876
     */                                                                                                                // 3877
    this.color = function ($editable, sObjColor) {                                                                     // 3878
      var oColor = JSON.parse(sObjColor);                                                                              // 3879
      var foreColor = oColor.foreColor, backColor = oColor.backColor;                                                  // 3880
                                                                                                                       // 3881
      beforeCommand($editable);                                                                                        // 3882
                                                                                                                       // 3883
      if (foreColor) { document.execCommand('foreColor', false, foreColor); }                                          // 3884
      if (backColor) { document.execCommand('backColor', false, backColor); }                                          // 3885
                                                                                                                       // 3886
      afterCommand($editable);                                                                                         // 3887
    };                                                                                                                 // 3888
                                                                                                                       // 3889
    /**                                                                                                                // 3890
     * insert Table                                                                                                    // 3891
     *                                                                                                                 // 3892
     * @param {Node} $editable                                                                                         // 3893
     * @param {String} sDim dimension of table (ex : "5x5")                                                            // 3894
     */                                                                                                                // 3895
    this.insertTable = function ($editable, sDim) {                                                                    // 3896
      var dimension = sDim.split('x');                                                                                 // 3897
      beforeCommand($editable);                                                                                        // 3898
                                                                                                                       // 3899
      var rng = range.create();                                                                                        // 3900
      rng = rng.deleteContents();                                                                                      // 3901
      rng.insertNode(table.createTable(dimension[0], dimension[1]));                                                   // 3902
      afterCommand($editable);                                                                                         // 3903
    };                                                                                                                 // 3904
                                                                                                                       // 3905
    /**                                                                                                                // 3906
     * float me                                                                                                        // 3907
     *                                                                                                                 // 3908
     * @param {jQuery} $editable                                                                                       // 3909
     * @param {String} value                                                                                           // 3910
     * @param {jQuery} $target                                                                                         // 3911
     */                                                                                                                // 3912
    this.floatMe = function ($editable, value, $target) {                                                              // 3913
      beforeCommand($editable);                                                                                        // 3914
      $target.css('float', value);                                                                                     // 3915
      afterCommand($editable);                                                                                         // 3916
    };                                                                                                                 // 3917
                                                                                                                       // 3918
    /**                                                                                                                // 3919
     * change image shape                                                                                              // 3920
     *                                                                                                                 // 3921
     * @param {jQuery} $editable                                                                                       // 3922
     * @param {String} value css class                                                                                 // 3923
     * @param {Node} $target                                                                                           // 3924
     */                                                                                                                // 3925
    this.imageShape = function ($editable, value, $target) {                                                           // 3926
      beforeCommand($editable);                                                                                        // 3927
                                                                                                                       // 3928
      $target.removeClass('img-rounded img-circle img-thumbnail');                                                     // 3929
                                                                                                                       // 3930
      if (value) {                                                                                                     // 3931
        $target.addClass(value);                                                                                       // 3932
      }                                                                                                                // 3933
                                                                                                                       // 3934
      afterCommand($editable);                                                                                         // 3935
    };                                                                                                                 // 3936
                                                                                                                       // 3937
    /**                                                                                                                // 3938
     * resize overlay element                                                                                          // 3939
     * @param {jQuery} $editable                                                                                       // 3940
     * @param {String} value                                                                                           // 3941
     * @param {jQuery} $target - target element                                                                        // 3942
     */                                                                                                                // 3943
    this.resize = function ($editable, value, $target) {                                                               // 3944
      beforeCommand($editable);                                                                                        // 3945
                                                                                                                       // 3946
      $target.css({                                                                                                    // 3947
        width: value * 100 + '%',                                                                                      // 3948
        height: ''                                                                                                     // 3949
      });                                                                                                              // 3950
                                                                                                                       // 3951
      afterCommand($editable);                                                                                         // 3952
    };                                                                                                                 // 3953
                                                                                                                       // 3954
    /**                                                                                                                // 3955
     * @param {Position} pos                                                                                           // 3956
     * @param {jQuery} $target - target element                                                                        // 3957
     * @param {Boolean} [bKeepRatio] - keep ratio                                                                      // 3958
     */                                                                                                                // 3959
    this.resizeTo = function (pos, $target, bKeepRatio) {                                                              // 3960
      var imageSize;                                                                                                   // 3961
      if (bKeepRatio) {                                                                                                // 3962
        var newRatio = pos.y / pos.x;                                                                                  // 3963
        var ratio = $target.data('ratio');                                                                             // 3964
        imageSize = {                                                                                                  // 3965
          width: ratio > newRatio ? pos.x : pos.y / ratio,                                                             // 3966
          height: ratio > newRatio ? pos.x * ratio : pos.y                                                             // 3967
        };                                                                                                             // 3968
      } else {                                                                                                         // 3969
        imageSize = {                                                                                                  // 3970
          width: pos.x,                                                                                                // 3971
          height: pos.y                                                                                                // 3972
        };                                                                                                             // 3973
      }                                                                                                                // 3974
                                                                                                                       // 3975
      $target.css(imageSize);                                                                                          // 3976
    };                                                                                                                 // 3977
                                                                                                                       // 3978
    /**                                                                                                                // 3979
     * remove media object                                                                                             // 3980
     *                                                                                                                 // 3981
     * @param {jQuery} $editable                                                                                       // 3982
     * @param {String} value - dummy argument (for keep interface)                                                     // 3983
     * @param {jQuery} $target - target element                                                                        // 3984
     */                                                                                                                // 3985
    this.removeMedia = function ($editable, value, $target) {                                                          // 3986
      beforeCommand($editable);                                                                                        // 3987
      $target.detach();                                                                                                // 3988
                                                                                                                       // 3989
      handler.bindCustomEvent(                                                                                         // 3990
        $(), $editable.data('callbacks'), 'media.delete'                                                               // 3991
      ).call($target, this.$editable);                                                                                 // 3992
                                                                                                                       // 3993
      afterCommand($editable);                                                                                         // 3994
    };                                                                                                                 // 3995
                                                                                                                       // 3996
    /**                                                                                                                // 3997
     * set focus                                                                                                       // 3998
     *                                                                                                                 // 3999
     * @param $editable                                                                                                // 4000
     */                                                                                                                // 4001
    this.focus = function ($editable) {                                                                                // 4002
      $editable.focus();                                                                                               // 4003
                                                                                                                       // 4004
      // [workaround] for firefox bug http://goo.gl/lVfAaI                                                             // 4005
      if (agent.isFF) {                                                                                                // 4006
        range.createFromNode($editable[0].firstChild || $editable[0]).collapse().select();                             // 4007
      }                                                                                                                // 4008
    };                                                                                                                 // 4009
  };                                                                                                                   // 4010
                                                                                                                       // 4011
  /**                                                                                                                  // 4012
   * @class module.Button                                                                                              // 4013
   *                                                                                                                   // 4014
   * Button                                                                                                            // 4015
   */                                                                                                                  // 4016
  var Button = function () {                                                                                           // 4017
    /**                                                                                                                // 4018
     * update button status                                                                                            // 4019
     *                                                                                                                 // 4020
     * @param {jQuery} $container                                                                                      // 4021
     * @param {Object} styleInfo                                                                                       // 4022
     */                                                                                                                // 4023
    this.update = function ($container, styleInfo) {                                                                   // 4024
      /**                                                                                                              // 4025
       * handle dropdown's check mark (for fontname, fontsize, lineHeight).                                            // 4026
       * @param {jQuery} $btn                                                                                          // 4027
       * @param {Number} value                                                                                         // 4028
       */                                                                                                              // 4029
      var checkDropdownMenu = function ($btn, value) {                                                                 // 4030
        $btn.find('.dropdown-menu li a').each(function () {                                                            // 4031
          // always compare string to avoid creating another func.                                                     // 4032
          var isChecked = ($(this).data('value') + '') === (value + '');                                               // 4033
          this.className = isChecked ? 'checked' : '';                                                                 // 4034
        });                                                                                                            // 4035
      };                                                                                                               // 4036
                                                                                                                       // 4037
      /**                                                                                                              // 4038
       * update button state(active or not).                                                                           // 4039
       *                                                                                                               // 4040
       * @private                                                                                                      // 4041
       * @param {String} selector                                                                                      // 4042
       * @param {Function} pred                                                                                        // 4043
       */                                                                                                              // 4044
      var btnState = function (selector, pred) {                                                                       // 4045
        var $btn = $container.find(selector);                                                                          // 4046
        $btn.toggleClass('active', pred());                                                                            // 4047
      };                                                                                                               // 4048
                                                                                                                       // 4049
      if (styleInfo.image) {                                                                                           // 4050
        var $img = $(styleInfo.image);                                                                                 // 4051
                                                                                                                       // 4052
        btnState('button[data-event="imageShape"][data-value="img-rounded"]', function () {                            // 4053
          return $img.hasClass('img-rounded');                                                                         // 4054
        });                                                                                                            // 4055
        btnState('button[data-event="imageShape"][data-value="img-circle"]', function () {                             // 4056
          return $img.hasClass('img-circle');                                                                          // 4057
        });                                                                                                            // 4058
        btnState('button[data-event="imageShape"][data-value="img-thumbnail"]', function () {                          // 4059
          return $img.hasClass('img-thumbnail');                                                                       // 4060
        });                                                                                                            // 4061
        btnState('button[data-event="imageShape"]:not([data-value])', function () {                                    // 4062
          return !$img.is('.img-rounded, .img-circle, .img-thumbnail');                                                // 4063
        });                                                                                                            // 4064
                                                                                                                       // 4065
        var imgFloat = $img.css('float');                                                                              // 4066
        btnState('button[data-event="floatMe"][data-value="left"]', function () {                                      // 4067
          return imgFloat === 'left';                                                                                  // 4068
        });                                                                                                            // 4069
        btnState('button[data-event="floatMe"][data-value="right"]', function () {                                     // 4070
          return imgFloat === 'right';                                                                                 // 4071
        });                                                                                                            // 4072
        btnState('button[data-event="floatMe"][data-value="none"]', function () {                                      // 4073
          return imgFloat !== 'left' && imgFloat !== 'right';                                                          // 4074
        });                                                                                                            // 4075
                                                                                                                       // 4076
        var style = $img.attr('style');                                                                                // 4077
        btnState('button[data-event="resize"][data-value="1"]', function () {                                          // 4078
          return !!/(^|\s)(max-)?width\s*:\s*100%/.test(style);                                                        // 4079
        });                                                                                                            // 4080
        btnState('button[data-event="resize"][data-value="0.5"]', function () {                                        // 4081
          return !!/(^|\s)(max-)?width\s*:\s*50%/.test(style);                                                         // 4082
        });                                                                                                            // 4083
        btnState('button[data-event="resize"][data-value="0.25"]', function () {                                       // 4084
          return !!/(^|\s)(max-)?width\s*:\s*25%/.test(style);                                                         // 4085
        });                                                                                                            // 4086
        return;                                                                                                        // 4087
      }                                                                                                                // 4088
                                                                                                                       // 4089
      // fontname                                                                                                      // 4090
      var $fontname = $container.find('.note-fontname');                                                               // 4091
      if ($fontname.length) {                                                                                          // 4092
        var selectedFont = styleInfo['font-family'];                                                                   // 4093
        if (!!selectedFont) {                                                                                          // 4094
                                                                                                                       // 4095
          var list = selectedFont.split(',');                                                                          // 4096
          for (var i = 0, len = list.length; i < len; i++) {                                                           // 4097
            selectedFont = list[i].replace(/[\'\"]/g, '').replace(/\s+$/, '').replace(/^\s+/, '');                     // 4098
            if (agent.isFontInstalled(selectedFont)) {                                                                 // 4099
              break;                                                                                                   // 4100
            }                                                                                                          // 4101
          }                                                                                                            // 4102
                                                                                                                       // 4103
          $fontname.find('.note-current-fontname').text(selectedFont);                                                 // 4104
          checkDropdownMenu($fontname, selectedFont);                                                                  // 4105
                                                                                                                       // 4106
        }                                                                                                              // 4107
      }                                                                                                                // 4108
                                                                                                                       // 4109
      // fontsize                                                                                                      // 4110
      var $fontsize = $container.find('.note-fontsize');                                                               // 4111
      $fontsize.find('.note-current-fontsize').text(styleInfo['font-size']);                                           // 4112
      checkDropdownMenu($fontsize, parseFloat(styleInfo['font-size']));                                                // 4113
                                                                                                                       // 4114
      // lineheight                                                                                                    // 4115
      var $lineHeight = $container.find('.note-height');                                                               // 4116
      checkDropdownMenu($lineHeight, parseFloat(styleInfo['line-height']));                                            // 4117
                                                                                                                       // 4118
      btnState('button[data-event="bold"]', function () {                                                              // 4119
        return styleInfo['font-bold'] === 'bold';                                                                      // 4120
      });                                                                                                              // 4121
      btnState('button[data-event="italic"]', function () {                                                            // 4122
        return styleInfo['font-italic'] === 'italic';                                                                  // 4123
      });                                                                                                              // 4124
      btnState('button[data-event="underline"]', function () {                                                         // 4125
        return styleInfo['font-underline'] === 'underline';                                                            // 4126
      });                                                                                                              // 4127
      btnState('button[data-event="strikethrough"]', function () {                                                     // 4128
        return styleInfo['font-strikethrough'] === 'strikethrough';                                                    // 4129
      });                                                                                                              // 4130
      btnState('button[data-event="superscript"]', function () {                                                       // 4131
        return styleInfo['font-superscript'] === 'superscript';                                                        // 4132
      });                                                                                                              // 4133
      btnState('button[data-event="subscript"]', function () {                                                         // 4134
        return styleInfo['font-subscript'] === 'subscript';                                                            // 4135
      });                                                                                                              // 4136
      btnState('button[data-event="justifyLeft"]', function () {                                                       // 4137
        return styleInfo['text-align'] === 'left' || styleInfo['text-align'] === 'start';                              // 4138
      });                                                                                                              // 4139
      btnState('button[data-event="justifyCenter"]', function () {                                                     // 4140
        return styleInfo['text-align'] === 'center';                                                                   // 4141
      });                                                                                                              // 4142
      btnState('button[data-event="justifyRight"]', function () {                                                      // 4143
        return styleInfo['text-align'] === 'right';                                                                    // 4144
      });                                                                                                              // 4145
      btnState('button[data-event="justifyFull"]', function () {                                                       // 4146
        return styleInfo['text-align'] === 'justify';                                                                  // 4147
      });                                                                                                              // 4148
      btnState('button[data-event="insertUnorderedList"]', function () {                                               // 4149
        return styleInfo['list-style'] === 'unordered';                                                                // 4150
      });                                                                                                              // 4151
      btnState('button[data-event="insertOrderedList"]', function () {                                                 // 4152
        return styleInfo['list-style'] === 'ordered';                                                                  // 4153
      });                                                                                                              // 4154
    };                                                                                                                 // 4155
                                                                                                                       // 4156
    /**                                                                                                                // 4157
     * update recent color                                                                                             // 4158
     *                                                                                                                 // 4159
     * @param {Node} button                                                                                            // 4160
     * @param {String} eventName                                                                                       // 4161
     * @param {Mixed} value                                                                                            // 4162
     */                                                                                                                // 4163
    this.updateRecentColor = function (button, eventName, value) {                                                     // 4164
      var $color = $(button).closest('.note-color');                                                                   // 4165
      var $recentColor = $color.find('.note-recent-color');                                                            // 4166
      var colorInfo = JSON.parse($recentColor.attr('data-value'));                                                     // 4167
      colorInfo[eventName] = value;                                                                                    // 4168
      $recentColor.attr('data-value', JSON.stringify(colorInfo));                                                      // 4169
      var sKey = eventName === 'backColor' ? 'background-color' : 'color';                                             // 4170
      $recentColor.find('i').css(sKey, value);                                                                         // 4171
    };                                                                                                                 // 4172
  };                                                                                                                   // 4173
                                                                                                                       // 4174
  /**                                                                                                                  // 4175
   * @class module.Toolbar                                                                                             // 4176
   *                                                                                                                   // 4177
   * Toolbar                                                                                                           // 4178
   */                                                                                                                  // 4179
  var Toolbar = function () {                                                                                          // 4180
    var button = new Button();                                                                                         // 4181
                                                                                                                       // 4182
    this.update = function ($toolbar, styleInfo) {                                                                     // 4183
      button.update($toolbar, styleInfo);                                                                              // 4184
    };                                                                                                                 // 4185
                                                                                                                       // 4186
    /**                                                                                                                // 4187
     * @param {Node} button                                                                                            // 4188
     * @param {String} eventName                                                                                       // 4189
     * @param {String} value                                                                                           // 4190
     */                                                                                                                // 4191
    this.updateRecentColor = function (buttonNode, eventName, value) {                                                 // 4192
      button.updateRecentColor(buttonNode, eventName, value);                                                          // 4193
    };                                                                                                                 // 4194
                                                                                                                       // 4195
    /**                                                                                                                // 4196
     * activate buttons exclude codeview                                                                               // 4197
     * @param {jQuery} $toolbar                                                                                        // 4198
     */                                                                                                                // 4199
    this.activate = function ($toolbar) {                                                                              // 4200
      $toolbar.find('button')                                                                                          // 4201
              .not('button[data-event="codeview"]')                                                                    // 4202
              .removeClass('disabled');                                                                                // 4203
    };                                                                                                                 // 4204
                                                                                                                       // 4205
    /**                                                                                                                // 4206
     * deactivate buttons exclude codeview                                                                             // 4207
     * @param {jQuery} $toolbar                                                                                        // 4208
     */                                                                                                                // 4209
    this.deactivate = function ($toolbar) {                                                                            // 4210
      $toolbar.find('button')                                                                                          // 4211
              .not('button[data-event="codeview"]')                                                                    // 4212
              .addClass('disabled');                                                                                   // 4213
    };                                                                                                                 // 4214
                                                                                                                       // 4215
    /**                                                                                                                // 4216
     * @param {jQuery} $container                                                                                      // 4217
     * @param {Boolean} [bFullscreen=false]                                                                            // 4218
     */                                                                                                                // 4219
    this.updateFullscreen = function ($container, bFullscreen) {                                                       // 4220
      var $btn = $container.find('button[data-event="fullscreen"]');                                                   // 4221
      $btn.toggleClass('active', bFullscreen);                                                                         // 4222
    };                                                                                                                 // 4223
                                                                                                                       // 4224
    /**                                                                                                                // 4225
     * @param {jQuery} $container                                                                                      // 4226
     * @param {Boolean} [isCodeview=false]                                                                             // 4227
     */                                                                                                                // 4228
    this.updateCodeview = function ($container, isCodeview) {                                                          // 4229
      var $btn = $container.find('button[data-event="codeview"]');                                                     // 4230
      $btn.toggleClass('active', isCodeview);                                                                          // 4231
                                                                                                                       // 4232
      if (isCodeview) {                                                                                                // 4233
        this.deactivate($container);                                                                                   // 4234
      } else {                                                                                                         // 4235
        this.activate($container);                                                                                     // 4236
      }                                                                                                                // 4237
    };                                                                                                                 // 4238
                                                                                                                       // 4239
    /**                                                                                                                // 4240
     * get button in toolbar                                                                                           // 4241
     *                                                                                                                 // 4242
     * @param {jQuery} $editable                                                                                       // 4243
     * @param {String} name                                                                                            // 4244
     * @return {jQuery}                                                                                                // 4245
     */                                                                                                                // 4246
    this.get = function ($editable, name) {                                                                            // 4247
      var $toolbar = dom.makeLayoutInfo($editable).toolbar();                                                          // 4248
                                                                                                                       // 4249
      return $toolbar.find('[data-name=' + name + ']');                                                                // 4250
    };                                                                                                                 // 4251
                                                                                                                       // 4252
    /**                                                                                                                // 4253
     * set button state                                                                                                // 4254
     * @param {jQuery} $editable                                                                                       // 4255
     * @param {String} name                                                                                            // 4256
     * @param {Boolean} [isActive=true]                                                                                // 4257
     */                                                                                                                // 4258
    this.setButtonState = function ($editable, name, isActive) {                                                       // 4259
      isActive = (isActive === false) ? false : true;                                                                  // 4260
                                                                                                                       // 4261
      var $button = this.get($editable, name);                                                                         // 4262
      $button.toggleClass('active', isActive);                                                                         // 4263
    };                                                                                                                 // 4264
  };                                                                                                                   // 4265
                                                                                                                       // 4266
  var EDITABLE_PADDING = 24;                                                                                           // 4267
                                                                                                                       // 4268
  var Statusbar = function () {                                                                                        // 4269
    var $document = $(document);                                                                                       // 4270
                                                                                                                       // 4271
    this.attach = function (layoutInfo, options) {                                                                     // 4272
      if (!options.disableResizeEditor) {                                                                              // 4273
        layoutInfo.statusbar().on('mousedown', hStatusbarMousedown);                                                   // 4274
      }                                                                                                                // 4275
    };                                                                                                                 // 4276
                                                                                                                       // 4277
    /**                                                                                                                // 4278
     * `mousedown` event handler on statusbar                                                                          // 4279
     *                                                                                                                 // 4280
     * @param {MouseEvent} event                                                                                       // 4281
     */                                                                                                                // 4282
    var hStatusbarMousedown = function (event) {                                                                       // 4283
      event.preventDefault();                                                                                          // 4284
      event.stopPropagation();                                                                                         // 4285
                                                                                                                       // 4286
      var $editable = dom.makeLayoutInfo(event.target).editable();                                                     // 4287
      var editableTop = $editable.offset().top - $document.scrollTop();                                                // 4288
                                                                                                                       // 4289
      var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);                                        // 4290
      var options = layoutInfo.editor().data('options');                                                               // 4291
                                                                                                                       // 4292
      $document.on('mousemove', function (event) {                                                                     // 4293
        var nHeight = event.clientY - (editableTop + EDITABLE_PADDING);                                                // 4294
                                                                                                                       // 4295
        nHeight = (options.minHeight > 0) ? Math.max(nHeight, options.minHeight) : nHeight;                            // 4296
        nHeight = (options.maxHeight > 0) ? Math.min(nHeight, options.maxHeight) : nHeight;                            // 4297
                                                                                                                       // 4298
        $editable.height(nHeight);                                                                                     // 4299
      }).one('mouseup', function () {                                                                                  // 4300
        $document.off('mousemove');                                                                                    // 4301
      });                                                                                                              // 4302
    };                                                                                                                 // 4303
  };                                                                                                                   // 4304
                                                                                                                       // 4305
  /**                                                                                                                  // 4306
   * @class module.Popover                                                                                             // 4307
   *                                                                                                                   // 4308
   * Popover (http://getbootstrap.com/javascript/#popovers)                                                            // 4309
   *                                                                                                                   // 4310
   */                                                                                                                  // 4311
  var Popover = function () {                                                                                          // 4312
    var button = new Button();                                                                                         // 4313
                                                                                                                       // 4314
    /**                                                                                                                // 4315
     * returns position from placeholder                                                                               // 4316
     *                                                                                                                 // 4317
     * @private                                                                                                        // 4318
     * @param {Node} placeholder                                                                                       // 4319
     * @param {Boolean} isAirMode                                                                                      // 4320
     * @return {Object}                                                                                                // 4321
     * @return {Number} return.left                                                                                    // 4322
     * @return {Number} return.top                                                                                     // 4323
     */                                                                                                                // 4324
    var posFromPlaceholder = function (placeholder, isAirMode) {                                                       // 4325
      var $placeholder = $(placeholder);                                                                               // 4326
      var pos = isAirMode ? $placeholder.offset() : $placeholder.position();                                           // 4327
      var height = $placeholder.outerHeight(true); // include margin                                                   // 4328
                                                                                                                       // 4329
      // popover below placeholder.                                                                                    // 4330
      return {                                                                                                         // 4331
        left: pos.left,                                                                                                // 4332
        top: pos.top + height                                                                                          // 4333
      };                                                                                                               // 4334
    };                                                                                                                 // 4335
                                                                                                                       // 4336
    /**                                                                                                                // 4337
     * show popover                                                                                                    // 4338
     *                                                                                                                 // 4339
     * @private                                                                                                        // 4340
     * @param {jQuery} popover                                                                                         // 4341
     * @param {Position} pos                                                                                           // 4342
     */                                                                                                                // 4343
    var showPopover = function ($popover, pos) {                                                                       // 4344
      $popover.css({                                                                                                   // 4345
        display: 'block',                                                                                              // 4346
        left: pos.left,                                                                                                // 4347
        top: pos.top                                                                                                   // 4348
      });                                                                                                              // 4349
    };                                                                                                                 // 4350
                                                                                                                       // 4351
    var PX_POPOVER_ARROW_OFFSET_X = 20;                                                                                // 4352
                                                                                                                       // 4353
    /**                                                                                                                // 4354
     * update current state                                                                                            // 4355
     * @param {jQuery} $popover - popover container                                                                    // 4356
     * @param {Object} styleInfo - style object                                                                        // 4357
     * @param {Boolean} isAirMode                                                                                      // 4358
     */                                                                                                                // 4359
    this.update = function ($popover, styleInfo, isAirMode) {                                                          // 4360
      button.update($popover, styleInfo);                                                                              // 4361
                                                                                                                       // 4362
      var $linkPopover = $popover.find('.note-link-popover');                                                          // 4363
      if (styleInfo.anchor) {                                                                                          // 4364
        var $anchor = $linkPopover.find('a');                                                                          // 4365
        var href = $(styleInfo.anchor).attr('href');                                                                   // 4366
        var target = $(styleInfo.anchor).attr('target');                                                               // 4367
        $anchor.attr('href', href).html(href);                                                                         // 4368
        if (!target) {                                                                                                 // 4369
          $anchor.removeAttr('target');                                                                                // 4370
        } else {                                                                                                       // 4371
          $anchor.attr('target', '_blank');                                                                            // 4372
        }                                                                                                              // 4373
        showPopover($linkPopover, posFromPlaceholder(styleInfo.anchor, isAirMode));                                    // 4374
      } else {                                                                                                         // 4375
        $linkPopover.hide();                                                                                           // 4376
      }                                                                                                                // 4377
                                                                                                                       // 4378
      var $imagePopover = $popover.find('.note-image-popover');                                                        // 4379
      if (styleInfo.image) {                                                                                           // 4380
        showPopover($imagePopover, posFromPlaceholder(styleInfo.image, isAirMode));                                    // 4381
      } else {                                                                                                         // 4382
        $imagePopover.hide();                                                                                          // 4383
      }                                                                                                                // 4384
                                                                                                                       // 4385
      var $airPopover = $popover.find('.note-air-popover');                                                            // 4386
      if (isAirMode && !styleInfo.range.isCollapsed()) {                                                               // 4387
        var rect = list.last(styleInfo.range.getClientRects());                                                        // 4388
        if (rect) {                                                                                                    // 4389
          var bnd = func.rect2bnd(rect);                                                                               // 4390
          showPopover($airPopover, {                                                                                   // 4391
            left: Math.max(bnd.left + bnd.width / 2 - PX_POPOVER_ARROW_OFFSET_X, 0),                                   // 4392
            top: bnd.top + bnd.height                                                                                  // 4393
          });                                                                                                          // 4394
        }                                                                                                              // 4395
      } else {                                                                                                         // 4396
        $airPopover.hide();                                                                                            // 4397
      }                                                                                                                // 4398
    };                                                                                                                 // 4399
                                                                                                                       // 4400
    /**                                                                                                                // 4401
     * @param {Node} button                                                                                            // 4402
     * @param {String} eventName                                                                                       // 4403
     * @param {String} value                                                                                           // 4404
     */                                                                                                                // 4405
    this.updateRecentColor = function (button, eventName, value) {                                                     // 4406
      button.updateRecentColor(button, eventName, value);                                                              // 4407
    };                                                                                                                 // 4408
                                                                                                                       // 4409
    /**                                                                                                                // 4410
     * hide all popovers                                                                                               // 4411
     * @param {jQuery} $popover - popover container                                                                    // 4412
     */                                                                                                                // 4413
    this.hide = function ($popover) {                                                                                  // 4414
      $popover.children().hide();                                                                                      // 4415
    };                                                                                                                 // 4416
  };                                                                                                                   // 4417
                                                                                                                       // 4418
  /**                                                                                                                  // 4419
   * @class module.Handle                                                                                              // 4420
   *                                                                                                                   // 4421
   * Handle                                                                                                            // 4422
   */                                                                                                                  // 4423
  var Handle = function (handler) {                                                                                    // 4424
    var $document = $(document);                                                                                       // 4425
                                                                                                                       // 4426
    /**                                                                                                                // 4427
     * `mousedown` event handler on $handle                                                                            // 4428
     *  - controlSizing: resize image                                                                                  // 4429
     *                                                                                                                 // 4430
     * @param {MouseEvent} event                                                                                       // 4431
     */                                                                                                                // 4432
    var hHandleMousedown = function (event) {                                                                          // 4433
      if (dom.isControlSizing(event.target)) {                                                                         // 4434
        event.preventDefault();                                                                                        // 4435
        event.stopPropagation();                                                                                       // 4436
                                                                                                                       // 4437
        var layoutInfo = dom.makeLayoutInfo(event.target),                                                             // 4438
            $handle = layoutInfo.handle(),                                                                             // 4439
            $popover = layoutInfo.popover(),                                                                           // 4440
            $editable = layoutInfo.editable(),                                                                         // 4441
            $editor = layoutInfo.editor();                                                                             // 4442
                                                                                                                       // 4443
        var target = $handle.find('.note-control-selection').data('target'),                                           // 4444
            $target = $(target), posStart = $target.offset(),                                                          // 4445
            scrollTop = $document.scrollTop();                                                                         // 4446
                                                                                                                       // 4447
        var isAirMode = $editor.data('options').airMode;                                                               // 4448
                                                                                                                       // 4449
        $document.on('mousemove', function (event) {                                                                   // 4450
          handler.invoke('editor.resizeTo', {                                                                          // 4451
            x: event.clientX - posStart.left,                                                                          // 4452
            y: event.clientY - (posStart.top - scrollTop)                                                              // 4453
          }, $target, !event.shiftKey);                                                                                // 4454
                                                                                                                       // 4455
          handler.invoke('handle.update', $handle, {image: target}, isAirMode);                                        // 4456
          handler.invoke('popover.update', $popover, {image: target}, isAirMode);                                      // 4457
        }).one('mouseup', function () {                                                                                // 4458
          $document.off('mousemove');                                                                                  // 4459
          handler.invoke('editor.afterCommand', $editable);                                                            // 4460
        });                                                                                                            // 4461
                                                                                                                       // 4462
        if (!$target.data('ratio')) { // original ratio.                                                               // 4463
          $target.data('ratio', $target.height() / $target.width());                                                   // 4464
        }                                                                                                              // 4465
      }                                                                                                                // 4466
    };                                                                                                                 // 4467
                                                                                                                       // 4468
    this.attach = function (layoutInfo) {                                                                              // 4469
      layoutInfo.handle().on('mousedown', hHandleMousedown);                                                           // 4470
    };                                                                                                                 // 4471
                                                                                                                       // 4472
    /**                                                                                                                // 4473
     * update handle                                                                                                   // 4474
     * @param {jQuery} $handle                                                                                         // 4475
     * @param {Object} styleInfo                                                                                       // 4476
     * @param {Boolean} isAirMode                                                                                      // 4477
     */                                                                                                                // 4478
    this.update = function ($handle, styleInfo, isAirMode) {                                                           // 4479
      var $selection = $handle.find('.note-control-selection');                                                        // 4480
      if (styleInfo.image) {                                                                                           // 4481
        var $image = $(styleInfo.image);                                                                               // 4482
        var pos = isAirMode ? $image.offset() : $image.position();                                                     // 4483
                                                                                                                       // 4484
        // include margin                                                                                              // 4485
        var imageSize = {                                                                                              // 4486
          w: $image.outerWidth(true),                                                                                  // 4487
          h: $image.outerHeight(true)                                                                                  // 4488
        };                                                                                                             // 4489
                                                                                                                       // 4490
        $selection.css({                                                                                               // 4491
          display: 'block',                                                                                            // 4492
          left: pos.left,                                                                                              // 4493
          top: pos.top,                                                                                                // 4494
          width: imageSize.w,                                                                                          // 4495
          height: imageSize.h                                                                                          // 4496
        }).data('target', styleInfo.image); // save current image element.                                             // 4497
        var sizingText = imageSize.w + 'x' + imageSize.h;                                                              // 4498
        $selection.find('.note-control-selection-info').text(sizingText);                                              // 4499
      } else {                                                                                                         // 4500
        $selection.hide();                                                                                             // 4501
      }                                                                                                                // 4502
    };                                                                                                                 // 4503
                                                                                                                       // 4504
    /**                                                                                                                // 4505
     * hide                                                                                                            // 4506
     *                                                                                                                 // 4507
     * @param {jQuery} $handle                                                                                         // 4508
     */                                                                                                                // 4509
    this.hide = function ($handle) {                                                                                   // 4510
      $handle.children().hide();                                                                                       // 4511
    };                                                                                                                 // 4512
  };                                                                                                                   // 4513
                                                                                                                       // 4514
  var Fullscreen = function (handler) {                                                                                // 4515
    var $window = $(window);                                                                                           // 4516
    var $scrollbar = $('html, body');                                                                                  // 4517
                                                                                                                       // 4518
    /**                                                                                                                // 4519
     * toggle fullscreen                                                                                               // 4520
     *                                                                                                                 // 4521
     * @param {Object} layoutInfo                                                                                      // 4522
     */                                                                                                                // 4523
    this.toggle = function (layoutInfo) {                                                                              // 4524
                                                                                                                       // 4525
      var $editor = layoutInfo.editor(),                                                                               // 4526
          $toolbar = layoutInfo.toolbar(),                                                                             // 4527
          $editable = layoutInfo.editable(),                                                                           // 4528
          $codable = layoutInfo.codable();                                                                             // 4529
                                                                                                                       // 4530
      var resize = function (size) {                                                                                   // 4531
        $editable.css('height', size.h);                                                                               // 4532
        $codable.css('height', size.h);                                                                                // 4533
        if ($codable.data('cmeditor')) {                                                                               // 4534
          $codable.data('cmeditor').setsize(null, size.h);                                                             // 4535
        }                                                                                                              // 4536
      };                                                                                                               // 4537
                                                                                                                       // 4538
      $editor.toggleClass('fullscreen');                                                                               // 4539
      var isFullscreen = $editor.hasClass('fullscreen');                                                               // 4540
      if (isFullscreen) {                                                                                              // 4541
        $editable.data('orgheight', $editable.css('height'));                                                          // 4542
                                                                                                                       // 4543
        $window.on('resize', function () {                                                                             // 4544
          resize({                                                                                                     // 4545
            h: $window.height() - $toolbar.outerHeight()                                                               // 4546
          });                                                                                                          // 4547
        }).trigger('resize');                                                                                          // 4548
                                                                                                                       // 4549
        $scrollbar.css('overflow', 'hidden');                                                                          // 4550
      } else {                                                                                                         // 4551
        $window.off('resize');                                                                                         // 4552
        resize({                                                                                                       // 4553
          h: $editable.data('orgheight')                                                                               // 4554
        });                                                                                                            // 4555
        $scrollbar.css('overflow', 'visible');                                                                         // 4556
      }                                                                                                                // 4557
                                                                                                                       // 4558
      handler.invoke('toolbar.updateFullscreen', $toolbar, isFullscreen);                                              // 4559
    };                                                                                                                 // 4560
  };                                                                                                                   // 4561
                                                                                                                       // 4562
                                                                                                                       // 4563
  var CodeMirror;                                                                                                      // 4564
  if (agent.hasCodeMirror) {                                                                                           // 4565
    if (agent.isSupportAmd) {                                                                                          // 4566
      require(['CodeMirror'], function (cm) {                                                                          // 4567
        CodeMirror = cm;                                                                                               // 4568
      });                                                                                                              // 4569
    } else {                                                                                                           // 4570
      CodeMirror = window.CodeMirror;                                                                                  // 4571
    }                                                                                                                  // 4572
  }                                                                                                                    // 4573
                                                                                                                       // 4574
  /**                                                                                                                  // 4575
   * @class Codeview                                                                                                   // 4576
   */                                                                                                                  // 4577
  var Codeview = function (handler) {                                                                                  // 4578
                                                                                                                       // 4579
    this.sync = function (layoutInfo) {                                                                                // 4580
      var isCodeview = handler.invoke('codeview.isActivated', layoutInfo);                                             // 4581
      if (isCodeview && agent.hasCodeMirror) {                                                                         // 4582
        layoutInfo.codable().data('cmEditor').save();                                                                  // 4583
      }                                                                                                                // 4584
    };                                                                                                                 // 4585
                                                                                                                       // 4586
    /**                                                                                                                // 4587
     * @param {Object} layoutInfo                                                                                      // 4588
     * @return {Boolean}                                                                                               // 4589
     */                                                                                                                // 4590
    this.isActivated = function (layoutInfo) {                                                                         // 4591
      var $editor = layoutInfo.editor();                                                                               // 4592
      return $editor.hasClass('codeview');                                                                             // 4593
    };                                                                                                                 // 4594
                                                                                                                       // 4595
    /**                                                                                                                // 4596
     * toggle codeview                                                                                                 // 4597
     *                                                                                                                 // 4598
     * @param {Object} layoutInfo                                                                                      // 4599
     */                                                                                                                // 4600
    this.toggle = function (layoutInfo) {                                                                              // 4601
      if (this.isActivated(layoutInfo)) {                                                                              // 4602
        this.deactivate(layoutInfo);                                                                                   // 4603
      } else {                                                                                                         // 4604
        this.activate(layoutInfo);                                                                                     // 4605
      }                                                                                                                // 4606
    };                                                                                                                 // 4607
                                                                                                                       // 4608
    /**                                                                                                                // 4609
     * activate code view                                                                                              // 4610
     *                                                                                                                 // 4611
     * @param {Object} layoutInfo                                                                                      // 4612
     */                                                                                                                // 4613
    this.activate = function (layoutInfo) {                                                                            // 4614
      var $editor = layoutInfo.editor(),                                                                               // 4615
          $toolbar = layoutInfo.toolbar(),                                                                             // 4616
          $editable = layoutInfo.editable(),                                                                           // 4617
          $codable = layoutInfo.codable(),                                                                             // 4618
          $popover = layoutInfo.popover(),                                                                             // 4619
          $handle = layoutInfo.handle();                                                                               // 4620
                                                                                                                       // 4621
      var options = $editor.data('options');                                                                           // 4622
                                                                                                                       // 4623
      $codable.val(dom.html($editable, options.prettifyHtml));                                                         // 4624
      $codable.height($editable.height());                                                                             // 4625
                                                                                                                       // 4626
      handler.invoke('toolbar.updateCodeview', $toolbar, true);                                                        // 4627
      handler.invoke('popover.hide', $popover);                                                                        // 4628
      handler.invoke('handle.hide', $handle);                                                                          // 4629
                                                                                                                       // 4630
      $editor.addClass('codeview');                                                                                    // 4631
                                                                                                                       // 4632
      $codable.focus();                                                                                                // 4633
                                                                                                                       // 4634
      // activate CodeMirror as codable                                                                                // 4635
      if (agent.hasCodeMirror) {                                                                                       // 4636
        var cmEditor = CodeMirror.fromTextArea($codable[0], options.codemirror);                                       // 4637
                                                                                                                       // 4638
        // CodeMirror TernServer                                                                                       // 4639
        if (options.codemirror.tern) {                                                                                 // 4640
          var server = new CodeMirror.TernServer(options.codemirror.tern);                                             // 4641
          cmEditor.ternServer = server;                                                                                // 4642
          cmEditor.on('cursorActivity', function (cm) {                                                                // 4643
            server.updateArgHints(cm);                                                                                 // 4644
          });                                                                                                          // 4645
        }                                                                                                              // 4646
                                                                                                                       // 4647
        // CodeMirror hasn't Padding.                                                                                  // 4648
        cmEditor.setSize(null, $editable.outerHeight());                                                               // 4649
        $codable.data('cmEditor', cmEditor);                                                                           // 4650
      }                                                                                                                // 4651
    };                                                                                                                 // 4652
                                                                                                                       // 4653
    /**                                                                                                                // 4654
     * deactivate code view                                                                                            // 4655
     *                                                                                                                 // 4656
     * @param {Object} layoutInfo                                                                                      // 4657
     */                                                                                                                // 4658
    this.deactivate = function (layoutInfo) {                                                                          // 4659
      var $holder = layoutInfo.holder(),                                                                               // 4660
          $editor = layoutInfo.editor(),                                                                               // 4661
          $toolbar = layoutInfo.toolbar(),                                                                             // 4662
          $editable = layoutInfo.editable(),                                                                           // 4663
          $codable = layoutInfo.codable();                                                                             // 4664
                                                                                                                       // 4665
      var options = $editor.data('options');                                                                           // 4666
                                                                                                                       // 4667
      // deactivate CodeMirror as codable                                                                              // 4668
      if (agent.hasCodeMirror) {                                                                                       // 4669
        var cmEditor = $codable.data('cmEditor');                                                                      // 4670
        $codable.val(cmEditor.getValue());                                                                             // 4671
        cmEditor.toTextArea();                                                                                         // 4672
      }                                                                                                                // 4673
                                                                                                                       // 4674
      var value = dom.value($codable, options.prettifyHtml) || dom.emptyPara;                                          // 4675
      var isChange = $editable.html() !== value;                                                                       // 4676
                                                                                                                       // 4677
      $editable.html(value);                                                                                           // 4678
      $editable.height(options.height ? $codable.height() : 'auto');                                                   // 4679
      $editor.removeClass('codeview');                                                                                 // 4680
                                                                                                                       // 4681
      if (isChange) {                                                                                                  // 4682
        handler.bindCustomEvent(                                                                                       // 4683
          $holder, $editable.data('callbacks'), 'change'                                                               // 4684
        )($editable.html(), $editable);                                                                                // 4685
      }                                                                                                                // 4686
                                                                                                                       // 4687
      $editable.focus();                                                                                               // 4688
                                                                                                                       // 4689
      handler.invoke('toolbar.updateCodeview', $toolbar, false);                                                       // 4690
    };                                                                                                                 // 4691
  };                                                                                                                   // 4692
                                                                                                                       // 4693
  var DragAndDrop = function (handler) {                                                                               // 4694
    var $document = $(document);                                                                                       // 4695
                                                                                                                       // 4696
    /**                                                                                                                // 4697
     * attach Drag and Drop Events                                                                                     // 4698
     *                                                                                                                 // 4699
     * @param {Object} layoutInfo - layout Informations                                                                // 4700
     * @param {Object} options                                                                                         // 4701
     */                                                                                                                // 4702
    this.attach = function (layoutInfo, options) {                                                                     // 4703
      if (options.airMode || options.disableDragAndDrop) {                                                             // 4704
        // prevent default drop event                                                                                  // 4705
        $document.on('drop', function (e) {                                                                            // 4706
          e.preventDefault();                                                                                          // 4707
        });                                                                                                            // 4708
      } else {                                                                                                         // 4709
        this.attachDragAndDropEvent(layoutInfo, options);                                                              // 4710
      }                                                                                                                // 4711
    };                                                                                                                 // 4712
                                                                                                                       // 4713
    /**                                                                                                                // 4714
     * attach Drag and Drop Events                                                                                     // 4715
     *                                                                                                                 // 4716
     * @param {Object} layoutInfo - layout Informations                                                                // 4717
     * @param {Object} options                                                                                         // 4718
     */                                                                                                                // 4719
    this.attachDragAndDropEvent = function (layoutInfo, options) {                                                     // 4720
      var collection = $(),                                                                                            // 4721
          $editor = layoutInfo.editor(),                                                                               // 4722
          $dropzone = layoutInfo.dropzone(),                                                                           // 4723
          $dropzoneMessage = $dropzone.find('.note-dropzone-message');                                                 // 4724
                                                                                                                       // 4725
      // show dropzone on dragenter when dragging a object to document                                                 // 4726
      // -but only if the editor is visible, i.e. has a positive width and height                                      // 4727
      $document.on('dragenter', function (e) {                                                                         // 4728
        var isCodeview = handler.invoke('codeview.isActivated', layoutInfo);                                           // 4729
        var hasEditorSize = $editor.width() > 0 && $editor.height() > 0;                                               // 4730
        if (!isCodeview && !collection.length && hasEditorSize) {                                                      // 4731
          $editor.addClass('dragover');                                                                                // 4732
          $dropzone.width($editor.width());                                                                            // 4733
          $dropzone.height($editor.height());                                                                          // 4734
          $dropzoneMessage.text(options.langInfo.image.dragImageHere);                                                 // 4735
        }                                                                                                              // 4736
        collection = collection.add(e.target);                                                                         // 4737
      }).on('dragleave', function (e) {                                                                                // 4738
        collection = collection.not(e.target);                                                                         // 4739
        if (!collection.length) {                                                                                      // 4740
          $editor.removeClass('dragover');                                                                             // 4741
        }                                                                                                              // 4742
      }).on('drop', function () {                                                                                      // 4743
        collection = $();                                                                                              // 4744
        $editor.removeClass('dragover');                                                                               // 4745
      });                                                                                                              // 4746
                                                                                                                       // 4747
      // change dropzone's message on hover.                                                                           // 4748
      $dropzone.on('dragenter', function () {                                                                          // 4749
        $dropzone.addClass('hover');                                                                                   // 4750
        $dropzoneMessage.text(options.langInfo.image.dropImage);                                                       // 4751
      }).on('dragleave', function () {                                                                                 // 4752
        $dropzone.removeClass('hover');                                                                                // 4753
        $dropzoneMessage.text(options.langInfo.image.dragImageHere);                                                   // 4754
      });                                                                                                              // 4755
                                                                                                                       // 4756
      // attach dropImage                                                                                              // 4757
      $dropzone.on('drop', function (event) {                                                                          // 4758
        event.preventDefault();                                                                                        // 4759
                                                                                                                       // 4760
        var dataTransfer = event.originalEvent.dataTransfer;                                                           // 4761
        var html = dataTransfer.getData('text/html');                                                                  // 4762
        var text = dataTransfer.getData('text/plain');                                                                 // 4763
                                                                                                                       // 4764
        var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);                                      // 4765
                                                                                                                       // 4766
        if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {                                         // 4767
          layoutInfo.editable().focus();                                                                               // 4768
          handler.insertImages(layoutInfo, dataTransfer.files);                                                        // 4769
        } else if (html) {                                                                                             // 4770
          $(html).each(function () {                                                                                   // 4771
            layoutInfo.editable().focus();                                                                             // 4772
            handler.invoke('editor.insertNode', layoutInfo.editable(), this);                                          // 4773
          });                                                                                                          // 4774
        } else if (text) {                                                                                             // 4775
          layoutInfo.editable().focus();                                                                               // 4776
          handler.invoke('editor.insertText', layoutInfo.editable(), text);                                            // 4777
        }                                                                                                              // 4778
      }).on('dragover', false); // prevent default dragover event                                                      // 4779
    };                                                                                                                 // 4780
  };                                                                                                                   // 4781
                                                                                                                       // 4782
  var Clipboard = function (handler) {                                                                                 // 4783
                                                                                                                       // 4784
    this.attach = function (layoutInfo) {                                                                              // 4785
      layoutInfo.editable().on('paste', hPasteClipboardImage);                                                         // 4786
    };                                                                                                                 // 4787
                                                                                                                       // 4788
    /**                                                                                                                // 4789
     * paste clipboard image                                                                                           // 4790
     *                                                                                                                 // 4791
     * @param {Event} event                                                                                            // 4792
     */                                                                                                                // 4793
    var hPasteClipboardImage = function (event) {                                                                      // 4794
      var clipboardData = event.originalEvent.clipboardData;                                                           // 4795
      var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);                                        // 4796
      var $editable = layoutInfo.editable();                                                                           // 4797
                                                                                                                       // 4798
      if (!clipboardData || !clipboardData.items || !clipboardData.items.length) {                                     // 4799
        var callbacks = $editable.data('callbacks');                                                                   // 4800
        // only can run if it has onImageUpload method                                                                 // 4801
        if (!callbacks.onImageUpload) {                                                                                // 4802
          return;                                                                                                      // 4803
        }                                                                                                              // 4804
                                                                                                                       // 4805
        // save cursor                                                                                                 // 4806
        handler.invoke('editor.saveNode', $editable);                                                                  // 4807
        handler.invoke('editor.saveRange', $editable);                                                                 // 4808
                                                                                                                       // 4809
        $editable.html('');                                                                                            // 4810
                                                                                                                       // 4811
        setTimeout(function () {                                                                                       // 4812
          var $img = $editable.find('img');                                                                            // 4813
                                                                                                                       // 4814
          // if img is no in clipboard, insert text or dom                                                             // 4815
          if (!$img.length || $img[0].src.indexOf('data:') === -1) {                                                   // 4816
            var html = $editable.html();                                                                               // 4817
                                                                                                                       // 4818
            handler.invoke('editor.restoreNode', $editable);                                                           // 4819
            handler.invoke('editor.restoreRange', $editable);                                                          // 4820
                                                                                                                       // 4821
            handler.invoke('editor.focus', $editable);                                                                 // 4822
            try {                                                                                                      // 4823
              handler.invoke('editor.pasteHTML', $editable, html);                                                     // 4824
            } catch (ex) {                                                                                             // 4825
              handler.invoke('editor.insertText', $editable, html);                                                    // 4826
            }                                                                                                          // 4827
            return;                                                                                                    // 4828
          }                                                                                                            // 4829
                                                                                                                       // 4830
          var datauri = $img[0].src;                                                                                   // 4831
                                                                                                                       // 4832
          var data = atob(datauri.split(',')[1]);                                                                      // 4833
          var array = new Uint8Array(data.length);                                                                     // 4834
          for (var i = 0; i < data.length; i++) {                                                                      // 4835
            array[i] = data.charCodeAt(i);                                                                             // 4836
          }                                                                                                            // 4837
                                                                                                                       // 4838
          var blob = new Blob([array], { type : 'image/png' });                                                        // 4839
          blob.name = 'clipboard.png';                                                                                 // 4840
                                                                                                                       // 4841
          handler.invoke('editor.restoreNode', $editable);                                                             // 4842
          handler.invoke('editor.restoreRange', $editable);                                                            // 4843
          handler.insertImages(layoutInfo, [blob]);                                                                    // 4844
                                                                                                                       // 4845
          handler.invoke('editor.afterCommand', $editable);                                                            // 4846
        }, 0);                                                                                                         // 4847
                                                                                                                       // 4848
        return;                                                                                                        // 4849
      }                                                                                                                // 4850
                                                                                                                       // 4851
      var item = list.head(clipboardData.items);                                                                       // 4852
      var isClipboardImage = item.kind === 'file' && item.type.indexOf('image/') !== -1;                               // 4853
                                                                                                                       // 4854
      if (isClipboardImage) {                                                                                          // 4855
        handler.insertImages(layoutInfo, [item.getAsFile()]);                                                          // 4856
      }                                                                                                                // 4857
                                                                                                                       // 4858
      handler.invoke('editor.afterCommand', $editable);                                                                // 4859
    };                                                                                                                 // 4860
  };                                                                                                                   // 4861
                                                                                                                       // 4862
  var LinkDialog = function (handler) {                                                                                // 4863
                                                                                                                       // 4864
    /**                                                                                                                // 4865
     * toggle button status                                                                                            // 4866
     *                                                                                                                 // 4867
     * @private                                                                                                        // 4868
     * @param {jQuery} $btn                                                                                            // 4869
     * @param {Boolean} isEnable                                                                                       // 4870
     */                                                                                                                // 4871
    var toggleBtn = function ($btn, isEnable) {                                                                        // 4872
      $btn.toggleClass('disabled', !isEnable);                                                                         // 4873
      $btn.attr('disabled', !isEnable);                                                                                // 4874
    };                                                                                                                 // 4875
                                                                                                                       // 4876
    /**                                                                                                                // 4877
     * bind enter key                                                                                                  // 4878
     *                                                                                                                 // 4879
     * @private                                                                                                        // 4880
     * @param {jQuery} $input                                                                                          // 4881
     * @param {jQuery} $btn                                                                                            // 4882
     */                                                                                                                // 4883
    var bindEnterKey = function ($input, $btn) {                                                                       // 4884
      $input.on('keypress', function (event) {                                                                         // 4885
        if (event.keyCode === key.code.ENTER) {                                                                        // 4886
          $btn.trigger('click');                                                                                       // 4887
        }                                                                                                              // 4888
      });                                                                                                              // 4889
    };                                                                                                                 // 4890
                                                                                                                       // 4891
    /**                                                                                                                // 4892
     * Show link dialog and set event handlers on dialog controls.                                                     // 4893
     *                                                                                                                 // 4894
     * @param {jQuery} $editable                                                                                       // 4895
     * @param {jQuery} $dialog                                                                                         // 4896
     * @param {Object} linkInfo                                                                                        // 4897
     * @return {Promise}                                                                                               // 4898
     */                                                                                                                // 4899
    this.showLinkDialog = function ($editable, $dialog, linkInfo) {                                                    // 4900
      return $.Deferred(function (deferred) {                                                                          // 4901
        var $linkDialog = $dialog.find('.note-link-dialog');                                                           // 4902
                                                                                                                       // 4903
        var $linkText = $linkDialog.find('.note-link-text'),                                                           // 4904
        $linkUrl = $linkDialog.find('.note-link-url'),                                                                 // 4905
        $linkBtn = $linkDialog.find('.note-link-btn'),                                                                 // 4906
        $openInNewWindow = $linkDialog.find('input[type=checkbox]');                                                   // 4907
                                                                                                                       // 4908
        $linkDialog.one('shown.bs.modal', function () {                                                                // 4909
          $linkText.val(linkInfo.text);                                                                                // 4910
                                                                                                                       // 4911
          $linkText.on('input', function () {                                                                          // 4912
            // if linktext was modified by keyup,                                                                      // 4913
            // stop cloning text from linkUrl                                                                          // 4914
            linkInfo.text = $linkText.val();                                                                           // 4915
          });                                                                                                          // 4916
                                                                                                                       // 4917
          // if no url was given, copy text to url                                                                     // 4918
          if (!linkInfo.url) {                                                                                         // 4919
            linkInfo.url = linkInfo.text;                                                                              // 4920
            toggleBtn($linkBtn, linkInfo.text);                                                                        // 4921
          }                                                                                                            // 4922
                                                                                                                       // 4923
          $linkUrl.on('input', function () {                                                                           // 4924
            toggleBtn($linkBtn, $linkUrl.val());                                                                       // 4925
            // display same link on `Text to display` input                                                            // 4926
            // when create a new link                                                                                  // 4927
            if (!linkInfo.text) {                                                                                      // 4928
              $linkText.val($linkUrl.val());                                                                           // 4929
            }                                                                                                          // 4930
          }).val(linkInfo.url).trigger('focus').trigger('select');                                                     // 4931
                                                                                                                       // 4932
          bindEnterKey($linkUrl, $linkBtn);                                                                            // 4933
          bindEnterKey($linkText, $linkBtn);                                                                           // 4934
                                                                                                                       // 4935
          $openInNewWindow.prop('checked', linkInfo.newWindow);                                                        // 4936
                                                                                                                       // 4937
          $linkBtn.one('click', function (event) {                                                                     // 4938
            event.preventDefault();                                                                                    // 4939
                                                                                                                       // 4940
            deferred.resolve({                                                                                         // 4941
              range: linkInfo.range,                                                                                   // 4942
              url: $linkUrl.val(),                                                                                     // 4943
              text: $linkText.val(),                                                                                   // 4944
              newWindow: $openInNewWindow.is(':checked')                                                               // 4945
            });                                                                                                        // 4946
            $linkDialog.modal('hide');                                                                                 // 4947
          });                                                                                                          // 4948
        }).one('hidden.bs.modal', function () {                                                                        // 4949
          // detach events                                                                                             // 4950
          $linkText.off('input keypress');                                                                             // 4951
          $linkUrl.off('input keypress');                                                                              // 4952
          $linkBtn.off('click');                                                                                       // 4953
                                                                                                                       // 4954
          if (deferred.state() === 'pending') {                                                                        // 4955
            deferred.reject();                                                                                         // 4956
          }                                                                                                            // 4957
        }).modal('show');                                                                                              // 4958
      }).promise();                                                                                                    // 4959
    };                                                                                                                 // 4960
                                                                                                                       // 4961
    /**                                                                                                                // 4962
     * @param {Object} layoutInfo                                                                                      // 4963
     */                                                                                                                // 4964
    this.show = function (layoutInfo) {                                                                                // 4965
      var $editor = layoutInfo.editor(),                                                                               // 4966
          $dialog = layoutInfo.dialog(),                                                                               // 4967
          $editable = layoutInfo.editable(),                                                                           // 4968
          $popover = layoutInfo.popover(),                                                                             // 4969
          linkInfo = handler.invoke('editor.getLinkInfo', $editable);                                                  // 4970
                                                                                                                       // 4971
      var options = $editor.data('options');                                                                           // 4972
                                                                                                                       // 4973
      handler.invoke('editor.saveRange', $editable);                                                                   // 4974
      this.showLinkDialog($editable, $dialog, linkInfo).then(function (linkInfo) {                                     // 4975
        handler.invoke('editor.restoreRange', $editable);                                                              // 4976
        handler.invoke('editor.createLink', $editable, linkInfo, options);                                             // 4977
        // hide popover after creating link                                                                            // 4978
        handler.invoke('popover.hide', $popover);                                                                      // 4979
      }).fail(function () {                                                                                            // 4980
        handler.invoke('editor.restoreRange', $editable);                                                              // 4981
      });                                                                                                              // 4982
    };                                                                                                                 // 4983
  };                                                                                                                   // 4984
                                                                                                                       // 4985
  var ImageDialog = function (handler) {                                                                               // 4986
    /**                                                                                                                // 4987
     * toggle button status                                                                                            // 4988
     *                                                                                                                 // 4989
     * @private                                                                                                        // 4990
     * @param {jQuery} $btn                                                                                            // 4991
     * @param {Boolean} isEnable                                                                                       // 4992
     */                                                                                                                // 4993
    var toggleBtn = function ($btn, isEnable) {                                                                        // 4994
      $btn.toggleClass('disabled', !isEnable);                                                                         // 4995
      $btn.attr('disabled', !isEnable);                                                                                // 4996
    };                                                                                                                 // 4997
                                                                                                                       // 4998
    /**                                                                                                                // 4999
     * bind enter key                                                                                                  // 5000
     *                                                                                                                 // 5001
     * @private                                                                                                        // 5002
     * @param {jQuery} $input                                                                                          // 5003
     * @param {jQuery} $btn                                                                                            // 5004
     */                                                                                                                // 5005
    var bindEnterKey = function ($input, $btn) {                                                                       // 5006
      $input.on('keypress', function (event) {                                                                         // 5007
        if (event.keyCode === key.code.ENTER) {                                                                        // 5008
          $btn.trigger('click');                                                                                       // 5009
        }                                                                                                              // 5010
      });                                                                                                              // 5011
    };                                                                                                                 // 5012
                                                                                                                       // 5013
    this.show = function (layoutInfo) {                                                                                // 5014
      var $dialog = layoutInfo.dialog(),                                                                               // 5015
          $editable = layoutInfo.editable();                                                                           // 5016
                                                                                                                       // 5017
      handler.invoke('editor.saveRange', $editable);                                                                   // 5018
      this.showImageDialog($editable, $dialog).then(function (data) {                                                  // 5019
        handler.invoke('editor.restoreRange', $editable);                                                              // 5020
                                                                                                                       // 5021
        if (typeof data === 'string') {                                                                                // 5022
          // image url                                                                                                 // 5023
          handler.invoke('editor.insertImage', $editable, data);                                                       // 5024
        } else {                                                                                                       // 5025
          // array of files                                                                                            // 5026
          handler.insertImages(layoutInfo, data);                                                                      // 5027
        }                                                                                                              // 5028
      }).fail(function () {                                                                                            // 5029
        handler.invoke('editor.restoreRange', $editable);                                                              // 5030
      });                                                                                                              // 5031
    };                                                                                                                 // 5032
                                                                                                                       // 5033
    /**                                                                                                                // 5034
     * show image dialog                                                                                               // 5035
     *                                                                                                                 // 5036
     * @param {jQuery} $editable                                                                                       // 5037
     * @param {jQuery} $dialog                                                                                         // 5038
     * @return {Promise}                                                                                               // 5039
     */                                                                                                                // 5040
    this.showImageDialog = function ($editable, $dialog) {                                                             // 5041
      return $.Deferred(function (deferred) {                                                                          // 5042
        var $imageDialog = $dialog.find('.note-image-dialog');                                                         // 5043
                                                                                                                       // 5044
        var $imageInput = $dialog.find('.note-image-input'),                                                           // 5045
            $imageUrl = $dialog.find('.note-image-url'),                                                               // 5046
            $imageBtn = $dialog.find('.note-image-btn');                                                               // 5047
                                                                                                                       // 5048
        $imageDialog.one('shown.bs.modal', function () {                                                               // 5049
          // Cloning imageInput to clear element.                                                                      // 5050
          $imageInput.replaceWith($imageInput.clone()                                                                  // 5051
            .on('change', function () {                                                                                // 5052
              deferred.resolve(this.files || this.value);                                                              // 5053
              $imageDialog.modal('hide');                                                                              // 5054
            })                                                                                                         // 5055
            .val('')                                                                                                   // 5056
          );                                                                                                           // 5057
                                                                                                                       // 5058
          $imageBtn.click(function (event) {                                                                           // 5059
            event.preventDefault();                                                                                    // 5060
                                                                                                                       // 5061
            deferred.resolve($imageUrl.val());                                                                         // 5062
            $imageDialog.modal('hide');                                                                                // 5063
          });                                                                                                          // 5064
                                                                                                                       // 5065
          $imageUrl.on('keyup paste', function (event) {                                                               // 5066
            var url;                                                                                                   // 5067
                                                                                                                       // 5068
            if (event.type === 'paste') {                                                                              // 5069
              url = event.originalEvent.clipboardData.getData('text');                                                 // 5070
            } else {                                                                                                   // 5071
              url = $imageUrl.val();                                                                                   // 5072
            }                                                                                                          // 5073
                                                                                                                       // 5074
            toggleBtn($imageBtn, url);                                                                                 // 5075
          }).val('').trigger('focus');                                                                                 // 5076
          bindEnterKey($imageUrl, $imageBtn);                                                                          // 5077
        }).one('hidden.bs.modal', function () {                                                                        // 5078
          $imageInput.off('change');                                                                                   // 5079
          $imageUrl.off('keyup paste keypress');                                                                       // 5080
          $imageBtn.off('click');                                                                                      // 5081
                                                                                                                       // 5082
          if (deferred.state() === 'pending') {                                                                        // 5083
            deferred.reject();                                                                                         // 5084
          }                                                                                                            // 5085
        }).modal('show');                                                                                              // 5086
      });                                                                                                              // 5087
    };                                                                                                                 // 5088
  };                                                                                                                   // 5089
                                                                                                                       // 5090
  var HelpDialog = function (handler) {                                                                                // 5091
    /**                                                                                                                // 5092
     * show help dialog                                                                                                // 5093
     *                                                                                                                 // 5094
     * @param {jQuery} $editable                                                                                       // 5095
     * @param {jQuery} $dialog                                                                                         // 5096
     * @return {Promise}                                                                                               // 5097
     */                                                                                                                // 5098
    this.showHelpDialog = function ($editable, $dialog) {                                                              // 5099
      return $.Deferred(function (deferred) {                                                                          // 5100
        var $helpDialog = $dialog.find('.note-help-dialog');                                                           // 5101
                                                                                                                       // 5102
        $helpDialog.one('hidden.bs.modal', function () {                                                               // 5103
          deferred.resolve();                                                                                          // 5104
        }).modal('show');                                                                                              // 5105
      }).promise();                                                                                                    // 5106
    };                                                                                                                 // 5107
                                                                                                                       // 5108
    /**                                                                                                                // 5109
     * @param {Object} layoutInfo                                                                                      // 5110
     */                                                                                                                // 5111
    this.show = function (layoutInfo) {                                                                                // 5112
      var $dialog = layoutInfo.dialog(),                                                                               // 5113
          $editable = layoutInfo.editable();                                                                           // 5114
                                                                                                                       // 5115
      handler.invoke('editor.saveRange', $editable, true);                                                             // 5116
      this.showHelpDialog($editable, $dialog).then(function () {                                                       // 5117
        handler.invoke('editor.restoreRange', $editable);                                                              // 5118
      });                                                                                                              // 5119
    };                                                                                                                 // 5120
  };                                                                                                                   // 5121
                                                                                                                       // 5122
                                                                                                                       // 5123
  /**                                                                                                                  // 5124
   * @class EventHandler                                                                                               // 5125
   *                                                                                                                   // 5126
   * EventHandler                                                                                                      // 5127
   *  - TODO: new instance per a editor                                                                                // 5128
   */                                                                                                                  // 5129
  var EventHandler = function () {                                                                                     // 5130
    /**                                                                                                                // 5131
     * Modules                                                                                                         // 5132
     */                                                                                                                // 5133
    var modules = this.modules = {                                                                                     // 5134
      editor: new Editor(this),                                                                                        // 5135
      toolbar: new Toolbar(this),                                                                                      // 5136
      statusbar: new Statusbar(this),                                                                                  // 5137
      popover: new Popover(this),                                                                                      // 5138
      handle: new Handle(this),                                                                                        // 5139
      fullscreen: new Fullscreen(this),                                                                                // 5140
      codeview: new Codeview(this),                                                                                    // 5141
      dragAndDrop: new DragAndDrop(this),                                                                              // 5142
      clipboard: new Clipboard(this),                                                                                  // 5143
      linkDialog: new LinkDialog(this),                                                                                // 5144
      imageDialog: new ImageDialog(this),                                                                              // 5145
      helpDialog: new HelpDialog(this)                                                                                 // 5146
    };                                                                                                                 // 5147
                                                                                                                       // 5148
    /**                                                                                                                // 5149
     * invoke module's method                                                                                          // 5150
     *                                                                                                                 // 5151
     * @param {String} moduleAndMethod - ex) 'editor.redo'                                                             // 5152
     * @param {...*} arguments - arguments of method                                                                   // 5153
     * @return {*}                                                                                                     // 5154
     */                                                                                                                // 5155
    this.invoke = function () {                                                                                        // 5156
      var moduleAndMethod = list.head(list.from(arguments));                                                           // 5157
      var args = list.tail(list.from(arguments));                                                                      // 5158
                                                                                                                       // 5159
      var splits = moduleAndMethod.split('.');                                                                         // 5160
      var hasSeparator = splits.length > 1;                                                                            // 5161
      var moduleName = hasSeparator && list.head(splits);                                                              // 5162
      var methodName = hasSeparator ? list.last(splits) : list.head(splits);                                           // 5163
                                                                                                                       // 5164
      var module = this.getModule(moduleName);                                                                         // 5165
      var method = module[methodName];                                                                                 // 5166
                                                                                                                       // 5167
      return method && method.apply(module, args);                                                                     // 5168
    };                                                                                                                 // 5169
                                                                                                                       // 5170
    /**                                                                                                                // 5171
     * returns module                                                                                                  // 5172
     *                                                                                                                 // 5173
     * @param {String} moduleName - name of module                                                                     // 5174
     * @return {Module} - defaults is editor                                                                           // 5175
     */                                                                                                                // 5176
    this.getModule = function (moduleName) {                                                                           // 5177
      return this.modules[moduleName] || this.modules.editor;                                                          // 5178
    };                                                                                                                 // 5179
                                                                                                                       // 5180
    /**                                                                                                                // 5181
     * @param {jQuery} $holder                                                                                         // 5182
     * @param {Object} callbacks                                                                                       // 5183
     * @param {String} eventNamespace                                                                                  // 5184
     * @returns {Function}                                                                                             // 5185
     */                                                                                                                // 5186
    var bindCustomEvent = this.bindCustomEvent = function ($holder, callbacks, eventNamespace) {                       // 5187
      return function () {                                                                                             // 5188
        var callback = callbacks[func.namespaceToCamel(eventNamespace, 'on')];                                         // 5189
        if (callback) {                                                                                                // 5190
          callback.apply($holder[0], arguments);                                                                       // 5191
        }                                                                                                              // 5192
        return $holder.trigger('summernote.' + eventNamespace, arguments);                                             // 5193
      };                                                                                                               // 5194
    };                                                                                                                 // 5195
                                                                                                                       // 5196
    /**                                                                                                                // 5197
     * insert Images from file array.                                                                                  // 5198
     *                                                                                                                 // 5199
     * @private                                                                                                        // 5200
     * @param {Object} layoutInfo                                                                                      // 5201
     * @param {File[]} files                                                                                           // 5202
     */                                                                                                                // 5203
    this.insertImages = function (layoutInfo, files) {                                                                 // 5204
      var $editor = layoutInfo.editor(),                                                                               // 5205
          $editable = layoutInfo.editable(),                                                                           // 5206
          $holder = layoutInfo.holder();                                                                               // 5207
                                                                                                                       // 5208
      var callbacks = $editable.data('callbacks');                                                                     // 5209
      var options = $editor.data('options');                                                                           // 5210
                                                                                                                       // 5211
      // If onImageUpload options setted                                                                               // 5212
      if (callbacks.onImageUpload) {                                                                                   // 5213
        bindCustomEvent($holder, callbacks, 'image.upload')(files);                                                    // 5214
      // else insert Image as dataURL                                                                                  // 5215
      } else {                                                                                                         // 5216
        $.each(files, function (idx, file) {                                                                           // 5217
          var filename = file.name;                                                                                    // 5218
          if (options.maximumImageFileSize && options.maximumImageFileSize < file.size) {                              // 5219
            bindCustomEvent($holder, callbacks, 'image.upload.error')(options.langInfo.image.maximumFileSizeError);    // 5220
          } else {                                                                                                     // 5221
            async.readFileAsDataURL(file).then(function (sDataURL) {                                                   // 5222
              modules.editor.insertImage($editable, sDataURL, filename);                                               // 5223
            }).fail(function () {                                                                                      // 5224
              bindCustomEvent($holder, callbacks, 'image.upload.error')(options.langInfo.image.maximumFileSizeError);  // 5225
            });                                                                                                        // 5226
          }                                                                                                            // 5227
        });                                                                                                            // 5228
      }                                                                                                                // 5229
    };                                                                                                                 // 5230
                                                                                                                       // 5231
    var commands = {                                                                                                   // 5232
      /**                                                                                                              // 5233
       * @param {Object} layoutInfo                                                                                    // 5234
       */                                                                                                              // 5235
      showLinkDialog: function (layoutInfo) {                                                                          // 5236
        modules.linkDialog.show(layoutInfo);                                                                           // 5237
      },                                                                                                               // 5238
                                                                                                                       // 5239
      /**                                                                                                              // 5240
       * @param {Object} layoutInfo                                                                                    // 5241
       */                                                                                                              // 5242
      showImageDialog: function (layoutInfo) {                                                                         // 5243
        modules.imageDialog.show(layoutInfo);                                                                          // 5244
      },                                                                                                               // 5245
                                                                                                                       // 5246
      /**                                                                                                              // 5247
       * @param {Object} layoutInfo                                                                                    // 5248
       */                                                                                                              // 5249
      showHelpDialog: function (layoutInfo) {                                                                          // 5250
        modules.helpDialog.show(layoutInfo);                                                                           // 5251
      },                                                                                                               // 5252
                                                                                                                       // 5253
      /**                                                                                                              // 5254
       * @param {Object} layoutInfo                                                                                    // 5255
       */                                                                                                              // 5256
      fullscreen: function (layoutInfo) {                                                                              // 5257
        modules.fullscreen.toggle(layoutInfo);                                                                         // 5258
      },                                                                                                               // 5259
                                                                                                                       // 5260
      /**                                                                                                              // 5261
       * @param {Object} layoutInfo                                                                                    // 5262
       */                                                                                                              // 5263
      codeview: function (layoutInfo) {                                                                                // 5264
        modules.codeview.toggle(layoutInfo);                                                                           // 5265
      }                                                                                                                // 5266
    };                                                                                                                 // 5267
                                                                                                                       // 5268
    var hMousedown = function (event) {                                                                                // 5269
      //preventDefault Selection for FF, IE8+                                                                          // 5270
      if (dom.isImg(event.target)) {                                                                                   // 5271
        event.preventDefault();                                                                                        // 5272
      }                                                                                                                // 5273
    };                                                                                                                 // 5274
                                                                                                                       // 5275
    var hToolbarAndPopoverUpdate = function (event) {                                                                  // 5276
      // delay for range after mouseup                                                                                 // 5277
      setTimeout(function () {                                                                                         // 5278
        var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);                                      // 5279
        var styleInfo = modules.editor.currentStyle(event.target);                                                     // 5280
        if (!styleInfo) { return; }                                                                                    // 5281
                                                                                                                       // 5282
        var isAirMode = layoutInfo.editor().data('options').airMode;                                                   // 5283
        if (!isAirMode) {                                                                                              // 5284
          modules.toolbar.update(layoutInfo.toolbar(), styleInfo);                                                     // 5285
        }                                                                                                              // 5286
                                                                                                                       // 5287
        modules.popover.update(layoutInfo.popover(), styleInfo, isAirMode);                                            // 5288
        modules.handle.update(layoutInfo.handle(), styleInfo, isAirMode);                                              // 5289
      }, 0);                                                                                                           // 5290
    };                                                                                                                 // 5291
                                                                                                                       // 5292
    var hScroll = function (event) {                                                                                   // 5293
      var layoutInfo = dom.makeLayoutInfo(event.currentTarget || event.target);                                        // 5294
      //hide popover and handle when scrolled                                                                          // 5295
      modules.popover.hide(layoutInfo.popover());                                                                      // 5296
      modules.handle.hide(layoutInfo.handle());                                                                        // 5297
    };                                                                                                                 // 5298
                                                                                                                       // 5299
    var hToolbarAndPopoverMousedown = function (event) {                                                               // 5300
      // prevent default event when insertTable (FF, Webkit)                                                           // 5301
      var $btn = $(event.target).closest('[data-event]');                                                              // 5302
      if ($btn.length) {                                                                                               // 5303
        event.preventDefault();                                                                                        // 5304
      }                                                                                                                // 5305
    };                                                                                                                 // 5306
                                                                                                                       // 5307
    var hToolbarAndPopoverClick = function (event) {                                                                   // 5308
      var $btn = $(event.target).closest('[data-event]');                                                              // 5309
                                                                                                                       // 5310
      if ($btn.length) {                                                                                               // 5311
        var eventName = $btn.attr('data-event'),                                                                       // 5312
            value = $btn.attr('data-value'),                                                                           // 5313
            hide = $btn.attr('data-hide');                                                                             // 5314
                                                                                                                       // 5315
        var layoutInfo = dom.makeLayoutInfo(event.target);                                                             // 5316
                                                                                                                       // 5317
        // before command: detect control selection element($target)                                                   // 5318
        var $target;                                                                                                   // 5319
        if ($.inArray(eventName, ['resize', 'floatMe', 'removeMedia', 'imageShape']) !== -1) {                         // 5320
          var $selection = layoutInfo.handle().find('.note-control-selection');                                        // 5321
          $target = $($selection.data('target'));                                                                      // 5322
        }                                                                                                              // 5323
                                                                                                                       // 5324
        // If requested, hide the popover when the button is clicked.                                                  // 5325
        // Useful for things like showHelpDialog.                                                                      // 5326
        if (hide) {                                                                                                    // 5327
          $btn.parents('.popover').hide();                                                                             // 5328
        }                                                                                                              // 5329
                                                                                                                       // 5330
        if ($.isFunction($.summernote.pluginEvents[eventName])) {                                                      // 5331
          $.summernote.pluginEvents[eventName](event, modules.editor, layoutInfo, value);                              // 5332
        } else if (modules.editor[eventName]) { // on command                                                          // 5333
          var $editable = layoutInfo.editable();                                                                       // 5334
          $editable.focus();                                                                                           // 5335
          modules.editor[eventName]($editable, value, $target);                                                        // 5336
          event.preventDefault();                                                                                      // 5337
        } else if (commands[eventName]) {                                                                              // 5338
          commands[eventName].call(this, layoutInfo);                                                                  // 5339
          event.preventDefault();                                                                                      // 5340
        }                                                                                                              // 5341
                                                                                                                       // 5342
        // after command                                                                                               // 5343
        if ($.inArray(eventName, ['backColor', 'foreColor']) !== -1) {                                                 // 5344
          var options = layoutInfo.editor().data('options', options);                                                  // 5345
          var module = options.airMode ? modules.popover : modules.toolbar;                                            // 5346
          module.updateRecentColor(list.head($btn), eventName, value);                                                 // 5347
        }                                                                                                              // 5348
                                                                                                                       // 5349
        hToolbarAndPopoverUpdate(event);                                                                               // 5350
      }                                                                                                                // 5351
    };                                                                                                                 // 5352
                                                                                                                       // 5353
    var PX_PER_EM = 18;                                                                                                // 5354
    var hDimensionPickerMove = function (event, options) {                                                             // 5355
      var $picker = $(event.target.parentNode); // target is mousecatcher                                              // 5356
      var $dimensionDisplay = $picker.next();                                                                          // 5357
      var $catcher = $picker.find('.note-dimension-picker-mousecatcher');                                              // 5358
      var $highlighted = $picker.find('.note-dimension-picker-highlighted');                                           // 5359
      var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');                                       // 5360
                                                                                                                       // 5361
      var posOffset;                                                                                                   // 5362
      // HTML5 with jQuery - e.offsetX is undefined in Firefox                                                         // 5363
      if (event.offsetX === undefined) {                                                                               // 5364
        var posCatcher = $(event.target).offset();                                                                     // 5365
        posOffset = {                                                                                                  // 5366
          x: event.pageX - posCatcher.left,                                                                            // 5367
          y: event.pageY - posCatcher.top                                                                              // 5368
        };                                                                                                             // 5369
      } else {                                                                                                         // 5370
        posOffset = {                                                                                                  // 5371
          x: event.offsetX,                                                                                            // 5372
          y: event.offsetY                                                                                             // 5373
        };                                                                                                             // 5374
      }                                                                                                                // 5375
                                                                                                                       // 5376
      var dim = {                                                                                                      // 5377
        c: Math.ceil(posOffset.x / PX_PER_EM) || 1,                                                                    // 5378
        r: Math.ceil(posOffset.y / PX_PER_EM) || 1                                                                     // 5379
      };                                                                                                               // 5380
                                                                                                                       // 5381
      $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });                                                 // 5382
      $catcher.attr('data-value', dim.c + 'x' + dim.r);                                                                // 5383
                                                                                                                       // 5384
      if (3 < dim.c && dim.c < options.insertTableMaxSize.col) {                                                       // 5385
        $unhighlighted.css({ width: dim.c + 1 + 'em'});                                                                // 5386
      }                                                                                                                // 5387
                                                                                                                       // 5388
      if (3 < dim.r && dim.r < options.insertTableMaxSize.row) {                                                       // 5389
        $unhighlighted.css({ height: dim.r + 1 + 'em'});                                                               // 5390
      }                                                                                                                // 5391
                                                                                                                       // 5392
      $dimensionDisplay.html(dim.c + ' x ' + dim.r);                                                                   // 5393
    };                                                                                                                 // 5394
                                                                                                                       // 5395
    /**                                                                                                                // 5396
     * bind KeyMap on keydown                                                                                          // 5397
     *                                                                                                                 // 5398
     * @param {Object} layoutInfo                                                                                      // 5399
     * @param {Object} keyMap                                                                                          // 5400
     */                                                                                                                // 5401
    this.bindKeyMap = function (layoutInfo, keyMap) {                                                                  // 5402
      var $editor = layoutInfo.editor();                                                                               // 5403
      var $editable = layoutInfo.editable();                                                                           // 5404
                                                                                                                       // 5405
      $editable.on('keydown', function (event) {                                                                       // 5406
        var keys = [];                                                                                                 // 5407
                                                                                                                       // 5408
        // modifier                                                                                                    // 5409
        if (event.metaKey) { keys.push('CMD'); }                                                                       // 5410
        if (event.ctrlKey && !event.altKey) { keys.push('CTRL'); }                                                     // 5411
        if (event.shiftKey) { keys.push('SHIFT'); }                                                                    // 5412
                                                                                                                       // 5413
        // keycode                                                                                                     // 5414
        var keyName = key.nameFromCode[event.keyCode];                                                                 // 5415
        if (keyName) {                                                                                                 // 5416
          keys.push(keyName);                                                                                          // 5417
        }                                                                                                              // 5418
                                                                                                                       // 5419
        var eventName = keyMap[keys.join('+')];                                                                        // 5420
        if (eventName) {                                                                                               // 5421
          if ($.summernote.pluginEvents[eventName]) {                                                                  // 5422
            var plugin = $.summernote.pluginEvents[eventName];                                                         // 5423
            if ($.isFunction(plugin)) {                                                                                // 5424
              plugin(event, modules.editor, layoutInfo);                                                               // 5425
            }                                                                                                          // 5426
          } else if (modules.editor[eventName]) {                                                                      // 5427
            modules.editor[eventName]($editable, $editor.data('options'));                                             // 5428
            event.preventDefault();                                                                                    // 5429
          } else if (commands[eventName]) {                                                                            // 5430
            commands[eventName].call(this, layoutInfo);                                                                // 5431
            event.preventDefault();                                                                                    // 5432
          }                                                                                                            // 5433
        } else if (key.isEdit(event.keyCode)) {                                                                        // 5434
          modules.editor.afterCommand($editable);                                                                      // 5435
        }                                                                                                              // 5436
      });                                                                                                              // 5437
    };                                                                                                                 // 5438
                                                                                                                       // 5439
    /**                                                                                                                // 5440
     * attach eventhandler                                                                                             // 5441
     *                                                                                                                 // 5442
     * @param {Object} layoutInfo - layout Informations                                                                // 5443
     * @param {Object} options - user options include custom event handlers                                            // 5444
     */                                                                                                                // 5445
    this.attach = function (layoutInfo, options) {                                                                     // 5446
      // handlers for editable                                                                                         // 5447
      if (options.shortcuts) {                                                                                         // 5448
        this.bindKeyMap(layoutInfo, options.keyMap[agent.isMac ? 'mac' : 'pc']);                                       // 5449
      }                                                                                                                // 5450
      layoutInfo.editable().on('mousedown', hMousedown);                                                               // 5451
      layoutInfo.editable().on('keyup mouseup', hToolbarAndPopoverUpdate);                                             // 5452
      layoutInfo.editable().on('scroll', hScroll);                                                                     // 5453
      modules.clipboard.attach(layoutInfo, options);                                                                   // 5454
                                                                                                                       // 5455
      // handler for handle and popover                                                                                // 5456
      modules.handle.attach(layoutInfo, options);                                                                      // 5457
      layoutInfo.popover().on('click', hToolbarAndPopoverClick);                                                       // 5458
      layoutInfo.popover().on('mousedown', hToolbarAndPopoverMousedown);                                               // 5459
                                                                                                                       // 5460
      // handler for drag and drop                                                                                     // 5461
      modules.dragAndDrop.attach(layoutInfo, options);                                                                 // 5462
                                                                                                                       // 5463
      // handlers for frame mode (toolbar, statusbar)                                                                  // 5464
      if (!options.airMode) {                                                                                          // 5465
        // handler for toolbar                                                                                         // 5466
        layoutInfo.toolbar().on('click', hToolbarAndPopoverClick);                                                     // 5467
        layoutInfo.toolbar().on('mousedown', hToolbarAndPopoverMousedown);                                             // 5468
                                                                                                                       // 5469
        // handler for statusbar                                                                                       // 5470
        modules.statusbar.attach(layoutInfo, options);                                                                 // 5471
      }                                                                                                                // 5472
                                                                                                                       // 5473
      // handler for table dimension                                                                                   // 5474
      var $catcherContainer = options.airMode ? layoutInfo.popover() :                                                 // 5475
                                                layoutInfo.toolbar();                                                  // 5476
      var $catcher = $catcherContainer.find('.note-dimension-picker-mousecatcher');                                    // 5477
      $catcher.css({                                                                                                   // 5478
        width: options.insertTableMaxSize.col + 'em',                                                                  // 5479
        height: options.insertTableMaxSize.row + 'em'                                                                  // 5480
      }).on('mousemove', function (event) {                                                                            // 5481
        hDimensionPickerMove(event, options);                                                                          // 5482
      });                                                                                                              // 5483
                                                                                                                       // 5484
      // save options on editor                                                                                        // 5485
      layoutInfo.editor().data('options', options);                                                                    // 5486
                                                                                                                       // 5487
      // ret styleWithCSS for backColor / foreColor clearing with 'inherit'.                                           // 5488
      if (!agent.isMSIE) {                                                                                             // 5489
        // [workaround] for Firefox                                                                                    // 5490
        //  - protect FF Error: NS_ERROR_FAILURE: Failure                                                              // 5491
        setTimeout(function () {                                                                                       // 5492
          document.execCommand('styleWithCSS', 0, options.styleWithSpan);                                              // 5493
        }, 0);                                                                                                         // 5494
      }                                                                                                                // 5495
                                                                                                                       // 5496
      // History                                                                                                       // 5497
      var history = new History(layoutInfo.editable());                                                                // 5498
      layoutInfo.editable().data('NoteHistory', history);                                                              // 5499
                                                                                                                       // 5500
      // All editor status will be saved on editable with jquery's data                                                // 5501
      // for support multiple editor with singleton object.                                                            // 5502
      layoutInfo.editable().data('callbacks', {                                                                        // 5503
        onInit: options.onInit,                                                                                        // 5504
        onFocus: options.onFocus,                                                                                      // 5505
        onBlur: options.onBlur,                                                                                        // 5506
        onKeydown: options.onKeydown,                                                                                  // 5507
        onKeyup: options.onKeyup,                                                                                      // 5508
        onMousedown: options.onMousedown,                                                                              // 5509
        onEnter: options.onEnter,                                                                                      // 5510
        onPaste: options.onPaste,                                                                                      // 5511
        onBeforeCommand: options.onBeforeCommand,                                                                      // 5512
        onChange: options.onChange,                                                                                    // 5513
        onImageUpload: options.onImageUpload,                                                                          // 5514
        onImageUploadError: options.onImageUploadError,                                                                // 5515
        onMediaDelete : options.onMediaDelete                                                                          // 5516
      });                                                                                                              // 5517
                                                                                                                       // 5518
      // Textarea: auto filling the code before form submit.                                                           // 5519
      if (dom.isTextarea(list.head(layoutInfo.holder()))) {                                                            // 5520
        layoutInfo.holder().closest('form').submit(function () {                                                       // 5521
          var contents = layoutInfo.holder().code();                                                                   // 5522
          layoutInfo.holder().val(contents);                                                                           // 5523
                                                                                                                       // 5524
          // callback on submit                                                                                        // 5525
          if (options.onsubmit) {                                                                                      // 5526
            options.onsubmit(contents);                                                                                // 5527
          }                                                                                                            // 5528
        });                                                                                                            // 5529
      }                                                                                                                // 5530
    };                                                                                                                 // 5531
                                                                                                                       // 5532
    /**                                                                                                                // 5533
     * attach jquery custom event                                                                                      // 5534
     *                                                                                                                 // 5535
     * @param {Object} layoutInfo - layout Informations                                                                // 5536
     */                                                                                                                // 5537
    this.attachCustomEvent = function (layoutInfo, options) {                                                          // 5538
      var $holder = layoutInfo.holder();                                                                               // 5539
      var $editable = layoutInfo.editable();                                                                           // 5540
      var callbacks = $editable.data('callbacks');                                                                     // 5541
                                                                                                                       // 5542
      $editable.focus(bindCustomEvent($holder, callbacks, 'focus'));                                                   // 5543
      $editable.blur(bindCustomEvent($holder, callbacks, 'blur'));                                                     // 5544
                                                                                                                       // 5545
      $editable.keydown(function (event) {                                                                             // 5546
        if (event.keyCode === key.code.ENTER) {                                                                        // 5547
          bindCustomEvent($holder, callbacks, 'enter').call(this, event);                                              // 5548
        }                                                                                                              // 5549
        bindCustomEvent($holder, callbacks, 'keydown').call(this, event);                                              // 5550
      });                                                                                                              // 5551
      $editable.keyup(bindCustomEvent($holder, callbacks, 'keyup'));                                                   // 5552
                                                                                                                       // 5553
      $editable.on('mousedown', bindCustomEvent($holder, callbacks, 'mousedown'));                                     // 5554
      $editable.on('mouseup', bindCustomEvent($holder, callbacks, 'mouseup'));                                         // 5555
      $editable.on('scroll', bindCustomEvent($holder, callbacks, 'scroll'));                                           // 5556
                                                                                                                       // 5557
      $editable.on('paste', bindCustomEvent($holder, callbacks, 'paste'));                                             // 5558
                                                                                                                       // 5559
      // [workaround] for old IE - IE8 don't have input events                                                         // 5560
      //  - TODO check IE version                                                                                      // 5561
      var changeEventName = agent.isMSIE ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';    // 5562
      $editable.on(changeEventName, function () {                                                                      // 5563
        bindCustomEvent($holder, callbacks, 'change')($editable.html(), $editable);                                    // 5564
      });                                                                                                              // 5565
                                                                                                                       // 5566
      // callbacks for advanced features (camel)                                                                       // 5567
      if (!options.airMode) {                                                                                          // 5568
        layoutInfo.toolbar().click(bindCustomEvent($holder, callbacks, 'toolbar.click'));                              // 5569
        layoutInfo.popover().click(bindCustomEvent($holder, callbacks, 'popover.click'));                              // 5570
      }                                                                                                                // 5571
                                                                                                                       // 5572
      // Textarea: auto filling the code before form submit.                                                           // 5573
      if (dom.isTextarea(list.head($holder))) {                                                                        // 5574
        $holder.closest('form').submit(function (e) {                                                                  // 5575
          bindCustomEvent($holder, callbacks, 'submit').call(this, e, $holder.code());                                 // 5576
        });                                                                                                            // 5577
      }                                                                                                                // 5578
                                                                                                                       // 5579
      // fire init event                                                                                               // 5580
      bindCustomEvent($holder, callbacks, 'init')(layoutInfo);                                                         // 5581
                                                                                                                       // 5582
      // fire plugin init event                                                                                        // 5583
      for (var i = 0, len = $.summernote.plugins.length; i < len; i++) {                                               // 5584
        if ($.isFunction($.summernote.plugins[i].init)) {                                                              // 5585
          $.summernote.plugins[i].init(layoutInfo);                                                                    // 5586
        }                                                                                                              // 5587
      }                                                                                                                // 5588
    };                                                                                                                 // 5589
                                                                                                                       // 5590
    this.detach = function (layoutInfo, options) {                                                                     // 5591
      layoutInfo.holder().off();                                                                                       // 5592
      layoutInfo.editable().off();                                                                                     // 5593
                                                                                                                       // 5594
      layoutInfo.popover().off();                                                                                      // 5595
      layoutInfo.handle().off();                                                                                       // 5596
      layoutInfo.dialog().off();                                                                                       // 5597
                                                                                                                       // 5598
      if (!options.airMode) {                                                                                          // 5599
        layoutInfo.dropzone().off();                                                                                   // 5600
        layoutInfo.toolbar().off();                                                                                    // 5601
        layoutInfo.statusbar().off();                                                                                  // 5602
      }                                                                                                                // 5603
    };                                                                                                                 // 5604
  };                                                                                                                   // 5605
                                                                                                                       // 5606
  /**                                                                                                                  // 5607
   * @class Renderer                                                                                                   // 5608
   *                                                                                                                   // 5609
   * renderer                                                                                                          // 5610
   *                                                                                                                   // 5611
   * rendering toolbar and editable                                                                                    // 5612
   */                                                                                                                  // 5613
  var Renderer = function () {                                                                                         // 5614
                                                                                                                       // 5615
    /**                                                                                                                // 5616
     * bootstrap button template                                                                                       // 5617
     * @private                                                                                                        // 5618
     * @param {String} label button name                                                                               // 5619
     * @param {Object} [options] button options                                                                        // 5620
     * @param {String} [options.event] data-event                                                                      // 5621
     * @param {String} [options.className] button's class name                                                         // 5622
     * @param {String} [options.value] data-value                                                                      // 5623
     * @param {String} [options.title] button's title for popup                                                        // 5624
     * @param {String} [options.dropdown] dropdown html                                                                // 5625
     * @param {String} [options.hide] data-hide                                                                        // 5626
     */                                                                                                                // 5627
    var tplButton = function (label, options) {                                                                        // 5628
      var event = options.event;                                                                                       // 5629
      var value = options.value;                                                                                       // 5630
      var title = options.title;                                                                                       // 5631
      var className = options.className;                                                                               // 5632
      var dropdown = options.dropdown;                                                                                 // 5633
      var hide = options.hide;                                                                                         // 5634
                                                                                                                       // 5635
      return '<button type="button"' +                                                                                 // 5636
                 ' class="btn btn-default btn-sm btn-small' +                                                          // 5637
                   (className ? ' ' + className : '') +                                                                // 5638
                   (dropdown ? ' dropdown-toggle' : '') +                                                              // 5639
                 '"' +                                                                                                 // 5640
                 (dropdown ? ' data-toggle="dropdown"' : '') +                                                         // 5641
                 (title ? ' title="' + title + '"' : '') +                                                             // 5642
                 (event ? ' data-event="' + event + '"' : '') +                                                        // 5643
                 (value ? ' data-value=\'' + value + '\'' : '') +                                                      // 5644
                 (hide ? ' data-hide=\'' + hide + '\'' : '') +                                                         // 5645
                 ' tabindex="-1">' +                                                                                   // 5646
               label +                                                                                                 // 5647
               (dropdown ? ' <span class="caret"></span>' : '') +                                                      // 5648
             '</button>' +                                                                                             // 5649
             (dropdown || '');                                                                                         // 5650
    };                                                                                                                 // 5651
                                                                                                                       // 5652
    /**                                                                                                                // 5653
     * bootstrap icon button template                                                                                  // 5654
     * @private                                                                                                        // 5655
     * @param {String} iconClassName                                                                                   // 5656
     * @param {Object} [options]                                                                                       // 5657
     * @param {String} [options.event]                                                                                 // 5658
     * @param {String} [options.value]                                                                                 // 5659
     * @param {String} [options.title]                                                                                 // 5660
     * @param {String} [options.dropdown]                                                                              // 5661
     */                                                                                                                // 5662
    var tplIconButton = function (iconClassName, options) {                                                            // 5663
      var label = '<i class="' + iconClassName + '"></i>';                                                             // 5664
      return tplButton(label, options);                                                                                // 5665
    };                                                                                                                 // 5666
                                                                                                                       // 5667
    /**                                                                                                                // 5668
     * bootstrap popover template                                                                                      // 5669
     * @private                                                                                                        // 5670
     * @param {String} className                                                                                       // 5671
     * @param {String} content                                                                                         // 5672
     */                                                                                                                // 5673
    var tplPopover = function (className, content) {                                                                   // 5674
      var $popover = $('<div class="' + className + ' popover bottom in" style="display: none;">' +                    // 5675
               '<div class="arrow"></div>' +                                                                           // 5676
               '<div class="popover-content">' +                                                                       // 5677
               '</div>' +                                                                                              // 5678
             '</div>');                                                                                                // 5679
                                                                                                                       // 5680
      $popover.find('.popover-content').append(content);                                                               // 5681
      return $popover;                                                                                                 // 5682
    };                                                                                                                 // 5683
                                                                                                                       // 5684
    /**                                                                                                                // 5685
     * bootstrap dialog template                                                                                       // 5686
     *                                                                                                                 // 5687
     * @param {String} className                                                                                       // 5688
     * @param {String} [title='']                                                                                      // 5689
     * @param {String} body                                                                                            // 5690
     * @param {String} [footer='']                                                                                     // 5691
     */                                                                                                                // 5692
    var tplDialog = function (className, title, body, footer) {                                                        // 5693
      return '<div class="' + className + ' modal" aria-hidden="false">' +                                             // 5694
               '<div class="modal-dialog">' +                                                                          // 5695
                 '<div class="modal-content">' +                                                                       // 5696
                   (title ?                                                                                            // 5697
                   '<div class="modal-header">' +                                                                      // 5698
                     '<button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button>' +         // 5699
                     '<h4 class="modal-title">' + title + '</h4>' +                                                    // 5700
                   '</div>' : ''                                                                                       // 5701
                   ) +                                                                                                 // 5702
                   '<div class="modal-body">' + body + '</div>' +                                                      // 5703
                   (footer ?                                                                                           // 5704
                   '<div class="modal-footer">' + footer + '</div>' : ''                                               // 5705
                   ) +                                                                                                 // 5706
                 '</div>' +                                                                                            // 5707
               '</div>' +                                                                                              // 5708
             '</div>';                                                                                                 // 5709
    };                                                                                                                 // 5710
                                                                                                                       // 5711
    var tplButtonInfo = {                                                                                              // 5712
      picture: function (lang, options) {                                                                              // 5713
        return tplIconButton(options.iconPrefix + 'picture-o', {                                                       // 5714
          event: 'showImageDialog',                                                                                    // 5715
          title: lang.image.image,                                                                                     // 5716
          hide: true                                                                                                   // 5717
        });                                                                                                            // 5718
      },                                                                                                               // 5719
      link: function (lang, options) {                                                                                 // 5720
        return tplIconButton(options.iconPrefix + 'link', {                                                            // 5721
          event: 'showLinkDialog',                                                                                     // 5722
          title: lang.link.link,                                                                                       // 5723
          hide: true                                                                                                   // 5724
        });                                                                                                            // 5725
      },                                                                                                               // 5726
      table: function (lang, options) {                                                                                // 5727
        var dropdown = '<ul class="note-table dropdown-menu">' +                                                       // 5728
                         '<div class="note-dimension-picker">' +                                                       // 5729
                           '<div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div>' +
                           '<div class="note-dimension-picker-highlighted"></div>' +                                   // 5731
                           '<div class="note-dimension-picker-unhighlighted"></div>' +                                 // 5732
                         '</div>' +                                                                                    // 5733
                         '<div class="note-dimension-display"> 1 x 1 </div>' +                                         // 5734
                       '</ul>';                                                                                        // 5735
        return tplIconButton(options.iconPrefix + 'table', {                                                           // 5736
          title: lang.table.table,                                                                                     // 5737
          dropdown: dropdown                                                                                           // 5738
        });                                                                                                            // 5739
      },                                                                                                               // 5740
      style: function (lang, options) {                                                                                // 5741
        var items = options.styleTags.reduce(function (memo, v) {                                                      // 5742
          var label = lang.style[v === 'p' ? 'normal' : v];                                                            // 5743
          return memo + '<li><a data-event="formatBlock" href="#" data-value="' + v + '">' +                           // 5744
                   (                                                                                                   // 5745
                     (v === 'p' || v === 'pre') ? label :                                                              // 5746
                     '<' + v + '>' + label + '</' + v + '>'                                                            // 5747
                   ) +                                                                                                 // 5748
                 '</a></li>';                                                                                          // 5749
        }, '');                                                                                                        // 5750
                                                                                                                       // 5751
        return tplIconButton(options.iconPrefix + 'magic', {                                                           // 5752
          title: lang.style.style,                                                                                     // 5753
          dropdown: '<ul class="dropdown-menu">' + items + '</ul>'                                                     // 5754
        });                                                                                                            // 5755
      },                                                                                                               // 5756
      fontname: function (lang, options) {                                                                             // 5757
        var realFontList = [];                                                                                         // 5758
        var items = options.fontNames.reduce(function (memo, v) {                                                      // 5759
          if (!agent.isFontInstalled(v) && options.fontNamesIgnoreCheck.indexOf(v) === -1) {                           // 5760
            return memo;                                                                                               // 5761
          }                                                                                                            // 5762
          realFontList.push(v);                                                                                        // 5763
          return memo + '<li><a data-event="fontName" href="#" data-value="' + v + '" style="font-family:\'' + v + '\'">' +
                          '<i class="' + options.iconPrefix + 'check"></i> ' + v +                                     // 5765
                        '</a></li>';                                                                                   // 5766
        }, '');                                                                                                        // 5767
                                                                                                                       // 5768
        var hasDefaultFont = agent.isFontInstalled(options.defaultFontName);                                           // 5769
        var defaultFontName = (hasDefaultFont) ? options.defaultFontName : realFontList[0];                            // 5770
                                                                                                                       // 5771
        var label = '<span class="note-current-fontname">' +                                                           // 5772
                        defaultFontName +                                                                              // 5773
                     '</span>';                                                                                        // 5774
        return tplButton(label, {                                                                                      // 5775
          title: lang.font.name,                                                                                       // 5776
          dropdown: '<ul class="dropdown-menu">' + items + '</ul>'                                                     // 5777
        });                                                                                                            // 5778
      },                                                                                                               // 5779
      fontsize: function (lang, options) {                                                                             // 5780
        var items = options.fontSizes.reduce(function (memo, v) {                                                      // 5781
          return memo + '<li><a data-event="fontSize" href="#" data-value="' + v + '">' +                              // 5782
                          '<i class="fa fa-check"></i> ' + v +                                                         // 5783
                        '</a></li>';                                                                                   // 5784
        }, '');                                                                                                        // 5785
                                                                                                                       // 5786
        var label = '<span class="note-current-fontsize">11</span>';                                                   // 5787
        return tplButton(label, {                                                                                      // 5788
          title: lang.font.size,                                                                                       // 5789
          dropdown: '<ul class="dropdown-menu">' + items + '</ul>'                                                     // 5790
        });                                                                                                            // 5791
      },                                                                                                               // 5792
      color: function (lang, options) {                                                                                // 5793
        var colorButtonLabel = '<i class="' + options.iconPrefix + 'font" style="color:black;background-color:yellow;"></i>';
        var colorButton = tplButton(colorButtonLabel, {                                                                // 5795
          className: 'note-recent-color',                                                                              // 5796
          title: lang.color.recent,                                                                                    // 5797
          event: 'color',                                                                                              // 5798
          value: '{"backColor":"yellow"}'                                                                              // 5799
        });                                                                                                            // 5800
                                                                                                                       // 5801
        var dropdown = '<ul class="dropdown-menu">' +                                                                  // 5802
                         '<li>' +                                                                                      // 5803
                           '<div class="btn-group">' +                                                                 // 5804
                             '<div class="note-palette-title">' + lang.color.background + '</div>' +                   // 5805
                             '<div class="note-color-reset" data-event="backColor"' +                                  // 5806
                               ' data-value="inherit" title="' + lang.color.transparent + '">' +                       // 5807
                               lang.color.setTransparent +                                                             // 5808
                             '</div>' +                                                                                // 5809
                             '<div class="note-color-palette" data-target-event="backColor"></div>' +                  // 5810
                           '</div>' +                                                                                  // 5811
                           '<div class="btn-group">' +                                                                 // 5812
                             '<div class="note-palette-title">' + lang.color.foreground + '</div>' +                   // 5813
                             '<div class="note-color-reset" data-event="foreColor" data-value="inherit" title="' + lang.color.reset + '">' +
                               lang.color.resetToDefault +                                                             // 5815
                             '</div>' +                                                                                // 5816
                             '<div class="note-color-palette" data-target-event="foreColor"></div>' +                  // 5817
                           '</div>' +                                                                                  // 5818
                         '</li>' +                                                                                     // 5819
                       '</ul>';                                                                                        // 5820
                                                                                                                       // 5821
        var moreButton = tplButton('', {                                                                               // 5822
          title: lang.color.more,                                                                                      // 5823
          dropdown: dropdown                                                                                           // 5824
        });                                                                                                            // 5825
                                                                                                                       // 5826
        return colorButton + moreButton;                                                                               // 5827
      },                                                                                                               // 5828
      bold: function (lang, options) {                                                                                 // 5829
        return tplIconButton(options.iconPrefix + 'bold', {                                                            // 5830
          event: 'bold',                                                                                               // 5831
          title: lang.font.bold                                                                                        // 5832
        });                                                                                                            // 5833
      },                                                                                                               // 5834
      italic: function (lang, options) {                                                                               // 5835
        return tplIconButton(options.iconPrefix + 'italic', {                                                          // 5836
          event: 'italic',                                                                                             // 5837
          title: lang.font.italic                                                                                      // 5838
        });                                                                                                            // 5839
      },                                                                                                               // 5840
      underline: function (lang, options) {                                                                            // 5841
        return tplIconButton(options.iconPrefix + 'underline', {                                                       // 5842
          event: 'underline',                                                                                          // 5843
          title: lang.font.underline                                                                                   // 5844
        });                                                                                                            // 5845
      },                                                                                                               // 5846
      strikethrough: function (lang) {                                                                                 // 5847
        return tplIconButton('fa fa-strikethrough', {                                                                  // 5848
          event: 'strikethrough',                                                                                      // 5849
          title: lang.font.strikethrough                                                                               // 5850
        });                                                                                                            // 5851
      },                                                                                                               // 5852
      superscript: function (lang) {                                                                                   // 5853
        return tplIconButton('fa fa-superscript', {                                                                    // 5854
          event: 'superscript',                                                                                        // 5855
          title: lang.font.superscript                                                                                 // 5856
        });                                                                                                            // 5857
      },                                                                                                               // 5858
      subscript: function (lang) {                                                                                     // 5859
        return tplIconButton('fa fa-subscript', {                                                                      // 5860
          event: 'subscript',                                                                                          // 5861
          title: lang.font.subscript                                                                                   // 5862
        });                                                                                                            // 5863
      },                                                                                                               // 5864
      clear: function (lang, options) {                                                                                // 5865
        return tplIconButton(options.iconPrefix + 'eraser', {                                                          // 5866
          event: 'removeFormat',                                                                                       // 5867
          title: lang.font.clear                                                                                       // 5868
        });                                                                                                            // 5869
      },                                                                                                               // 5870
      ul: function (lang, options) {                                                                                   // 5871
        return tplIconButton(options.iconPrefix + 'list-ul', {                                                         // 5872
          event: 'insertUnorderedList',                                                                                // 5873
          title: lang.lists.unordered                                                                                  // 5874
        });                                                                                                            // 5875
      },                                                                                                               // 5876
      ol: function (lang, options) {                                                                                   // 5877
        return tplIconButton(options.iconPrefix + 'list-ol', {                                                         // 5878
          event: 'insertOrderedList',                                                                                  // 5879
          title: lang.lists.ordered                                                                                    // 5880
        });                                                                                                            // 5881
      },                                                                                                               // 5882
      paragraph: function (lang, options) {                                                                            // 5883
        var leftButton = tplIconButton(options.iconPrefix + 'align-left', {                                            // 5884
          title: lang.paragraph.left,                                                                                  // 5885
          event: 'justifyLeft'                                                                                         // 5886
        });                                                                                                            // 5887
        var centerButton = tplIconButton(options.iconPrefix + 'align-center', {                                        // 5888
          title: lang.paragraph.center,                                                                                // 5889
          event: 'justifyCenter'                                                                                       // 5890
        });                                                                                                            // 5891
        var rightButton = tplIconButton(options.iconPrefix + 'align-right', {                                          // 5892
          title: lang.paragraph.right,                                                                                 // 5893
          event: 'justifyRight'                                                                                        // 5894
        });                                                                                                            // 5895
        var justifyButton = tplIconButton(options.iconPrefix + 'align-justify', {                                      // 5896
          title: lang.paragraph.justify,                                                                               // 5897
          event: 'justifyFull'                                                                                         // 5898
        });                                                                                                            // 5899
                                                                                                                       // 5900
        var outdentButton = tplIconButton(options.iconPrefix + 'outdent', {                                            // 5901
          title: lang.paragraph.outdent,                                                                               // 5902
          event: 'outdent'                                                                                             // 5903
        });                                                                                                            // 5904
        var indentButton = tplIconButton(options.iconPrefix + 'indent', {                                              // 5905
          title: lang.paragraph.indent,                                                                                // 5906
          event: 'indent'                                                                                              // 5907
        });                                                                                                            // 5908
                                                                                                                       // 5909
        var dropdown = '<div class="dropdown-menu">' +                                                                 // 5910
                         '<div class="note-align btn-group">' +                                                        // 5911
                           leftButton + centerButton + rightButton + justifyButton +                                   // 5912
                         '</div>' +                                                                                    // 5913
                         '<div class="note-list btn-group">' +                                                         // 5914
                           indentButton + outdentButton +                                                              // 5915
                         '</div>' +                                                                                    // 5916
                       '</div>';                                                                                       // 5917
                                                                                                                       // 5918
        return tplIconButton(options.iconPrefix + 'align-left', {                                                      // 5919
          title: lang.paragraph.paragraph,                                                                             // 5920
          dropdown: dropdown                                                                                           // 5921
        });                                                                                                            // 5922
      },                                                                                                               // 5923
      height: function (lang, options) {                                                                               // 5924
        var items = options.lineHeights.reduce(function (memo, v) {                                                    // 5925
          return memo + '<li><a data-event="lineHeight" href="#" data-value="' + parseFloat(v) + '">' +                // 5926
                          '<i class="' + options.iconPrefix + 'check"></i> ' + v +                                     // 5927
                        '</a></li>';                                                                                   // 5928
        }, '');                                                                                                        // 5929
                                                                                                                       // 5930
        return tplIconButton(options.iconPrefix + 'text-height', {                                                     // 5931
          title: lang.font.height,                                                                                     // 5932
          dropdown: '<ul class="dropdown-menu">' + items + '</ul>'                                                     // 5933
        });                                                                                                            // 5934
                                                                                                                       // 5935
      },                                                                                                               // 5936
      help: function (lang, options) {                                                                                 // 5937
        return tplIconButton(options.iconPrefix + 'question', {                                                        // 5938
          event: 'showHelpDialog',                                                                                     // 5939
          title: lang.options.help,                                                                                    // 5940
          hide: true                                                                                                   // 5941
        });                                                                                                            // 5942
      },                                                                                                               // 5943
      fullscreen: function (lang, options) {                                                                           // 5944
        return tplIconButton(options.iconPrefix + 'arrows-alt', {                                                      // 5945
          event: 'fullscreen',                                                                                         // 5946
          title: lang.options.fullscreen                                                                               // 5947
        });                                                                                                            // 5948
      },                                                                                                               // 5949
      codeview: function (lang, options) {                                                                             // 5950
        return tplIconButton(options.iconPrefix + 'code', {                                                            // 5951
          event: 'codeview',                                                                                           // 5952
          title: lang.options.codeview                                                                                 // 5953
        });                                                                                                            // 5954
      },                                                                                                               // 5955
      undo: function (lang, options) {                                                                                 // 5956
        return tplIconButton(options.iconPrefix + 'undo', {                                                            // 5957
          event: 'undo',                                                                                               // 5958
          title: lang.history.undo                                                                                     // 5959
        });                                                                                                            // 5960
      },                                                                                                               // 5961
      redo: function (lang, options) {                                                                                 // 5962
        return tplIconButton(options.iconPrefix + 'repeat', {                                                          // 5963
          event: 'redo',                                                                                               // 5964
          title: lang.history.redo                                                                                     // 5965
        });                                                                                                            // 5966
      },                                                                                                               // 5967
      hr: function (lang, options) {                                                                                   // 5968
        return tplIconButton(options.iconPrefix + 'minus', {                                                           // 5969
          event: 'insertHorizontalRule',                                                                               // 5970
          title: lang.hr.insert                                                                                        // 5971
        });                                                                                                            // 5972
      }                                                                                                                // 5973
    };                                                                                                                 // 5974
                                                                                                                       // 5975
    var tplPopovers = function (lang, options) {                                                                       // 5976
      var tplLinkPopover = function () {                                                                               // 5977
        var linkButton = tplIconButton(options.iconPrefix + 'edit', {                                                  // 5978
          title: lang.link.edit,                                                                                       // 5979
          event: 'showLinkDialog',                                                                                     // 5980
          hide: true                                                                                                   // 5981
        });                                                                                                            // 5982
        var unlinkButton = tplIconButton(options.iconPrefix + 'unlink', {                                              // 5983
          title: lang.link.unlink,                                                                                     // 5984
          event: 'unlink'                                                                                              // 5985
        });                                                                                                            // 5986
        var content = '<a href="http://www.google.com" target="_blank">www.google.com</a>&nbsp;&nbsp;' +               // 5987
                      '<div class="note-insert btn-group">' +                                                          // 5988
                        linkButton + unlinkButton +                                                                    // 5989
                      '</div>';                                                                                        // 5990
        return tplPopover('note-link-popover', content);                                                               // 5991
      };                                                                                                               // 5992
                                                                                                                       // 5993
      var tplImagePopover = function () {                                                                              // 5994
        var fullButton = tplButton('<span class="note-fontsize-10">100%</span>', {                                     // 5995
          title: lang.image.resizeFull,                                                                                // 5996
          event: 'resize',                                                                                             // 5997
          value: '1'                                                                                                   // 5998
        });                                                                                                            // 5999
        var halfButton = tplButton('<span class="note-fontsize-10">50%</span>', {                                      // 6000
          title: lang.image.resizeHalf,                                                                                // 6001
          event: 'resize',                                                                                             // 6002
          value: '0.5'                                                                                                 // 6003
        });                                                                                                            // 6004
        var quarterButton = tplButton('<span class="note-fontsize-10">25%</span>', {                                   // 6005
          title: lang.image.resizeQuarter,                                                                             // 6006
          event: 'resize',                                                                                             // 6007
          value: '0.25'                                                                                                // 6008
        });                                                                                                            // 6009
                                                                                                                       // 6010
        var leftButton = tplIconButton(options.iconPrefix + 'align-left', {                                            // 6011
          title: lang.image.floatLeft,                                                                                 // 6012
          event: 'floatMe',                                                                                            // 6013
          value: 'left'                                                                                                // 6014
        });                                                                                                            // 6015
        var rightButton = tplIconButton(options.iconPrefix + 'align-right', {                                          // 6016
          title: lang.image.floatRight,                                                                                // 6017
          event: 'floatMe',                                                                                            // 6018
          value: 'right'                                                                                               // 6019
        });                                                                                                            // 6020
        var justifyButton = tplIconButton(options.iconPrefix + 'align-justify', {                                      // 6021
          title: lang.image.floatNone,                                                                                 // 6022
          event: 'floatMe',                                                                                            // 6023
          value: 'none'                                                                                                // 6024
        });                                                                                                            // 6025
                                                                                                                       // 6026
        var roundedButton = tplIconButton(options.iconPrefix + 'square', {                                             // 6027
          title: lang.image.shapeRounded,                                                                              // 6028
          event: 'imageShape',                                                                                         // 6029
          value: 'img-rounded'                                                                                         // 6030
        });                                                                                                            // 6031
        var circleButton = tplIconButton(options.iconPrefix + 'circle-o', {                                            // 6032
          title: lang.image.shapeCircle,                                                                               // 6033
          event: 'imageShape',                                                                                         // 6034
          value: 'img-circle'                                                                                          // 6035
        });                                                                                                            // 6036
        var thumbnailButton = tplIconButton(options.iconPrefix + 'picture-o', {                                        // 6037
          title: lang.image.shapeThumbnail,                                                                            // 6038
          event: 'imageShape',                                                                                         // 6039
          value: 'img-thumbnail'                                                                                       // 6040
        });                                                                                                            // 6041
        var noneButton = tplIconButton(options.iconPrefix + 'times', {                                                 // 6042
          title: lang.image.shapeNone,                                                                                 // 6043
          event: 'imageShape',                                                                                         // 6044
          value: ''                                                                                                    // 6045
        });                                                                                                            // 6046
                                                                                                                       // 6047
        var removeButton = tplIconButton(options.iconPrefix + 'trash-o', {                                             // 6048
          title: lang.image.remove,                                                                                    // 6049
          event: 'removeMedia',                                                                                        // 6050
          value: 'none'                                                                                                // 6051
        });                                                                                                            // 6052
                                                                                                                       // 6053
        var content = '<div class="btn-group">' + fullButton + halfButton + quarterButton + '</div>' +                 // 6054
                      '<div class="btn-group">' + leftButton + rightButton + justifyButton + '</div>' +                // 6055
                      '<div class="btn-group">' + roundedButton + circleButton + thumbnailButton + noneButton + '</div>' +
                      '<div class="btn-group">' + removeButton + '</div>';                                             // 6057
        return tplPopover('note-image-popover', content);                                                              // 6058
      };                                                                                                               // 6059
                                                                                                                       // 6060
      var tplAirPopover = function () {                                                                                // 6061
        var $content = $('<div />');                                                                                   // 6062
        for (var idx = 0, len = options.airPopover.length; idx < len; idx ++) {                                        // 6063
          var group = options.airPopover[idx];                                                                         // 6064
                                                                                                                       // 6065
          var $group = $('<div class="note-' + group[0] + ' btn-group">');                                             // 6066
          for (var i = 0, lenGroup = group[1].length; i < lenGroup; i++) {                                             // 6067
            var $button = $(tplButtonInfo[group[1][i]](lang, options));                                                // 6068
                                                                                                                       // 6069
            $button.attr('data-name', group[1][i]);                                                                    // 6070
                                                                                                                       // 6071
            $group.append($button);                                                                                    // 6072
          }                                                                                                            // 6073
          $content.append($group);                                                                                     // 6074
        }                                                                                                              // 6075
                                                                                                                       // 6076
        return tplPopover('note-air-popover', $content.children());                                                    // 6077
      };                                                                                                               // 6078
                                                                                                                       // 6079
      var $notePopover = $('<div class="note-popover" />');                                                            // 6080
                                                                                                                       // 6081
      $notePopover.append(tplLinkPopover());                                                                           // 6082
      $notePopover.append(tplImagePopover());                                                                          // 6083
                                                                                                                       // 6084
      if (options.airMode) {                                                                                           // 6085
        $notePopover.append(tplAirPopover());                                                                          // 6086
      }                                                                                                                // 6087
                                                                                                                       // 6088
      return $notePopover;                                                                                             // 6089
    };                                                                                                                 // 6090
                                                                                                                       // 6091
    var tplHandles = function () {                                                                                     // 6092
      return '<div class="note-handle">' +                                                                             // 6093
               '<div class="note-control-selection">' +                                                                // 6094
                 '<div class="note-control-selection-bg"></div>' +                                                     // 6095
                 '<div class="note-control-holder note-control-nw"></div>' +                                           // 6096
                 '<div class="note-control-holder note-control-ne"></div>' +                                           // 6097
                 '<div class="note-control-holder note-control-sw"></div>' +                                           // 6098
                 '<div class="note-control-sizing note-control-se"></div>' +                                           // 6099
                 '<div class="note-control-selection-info"></div>' +                                                   // 6100
               '</div>' +                                                                                              // 6101
             '</div>';                                                                                                 // 6102
    };                                                                                                                 // 6103
                                                                                                                       // 6104
    /**                                                                                                                // 6105
     * shortcut table template                                                                                         // 6106
     * @param {String} title                                                                                           // 6107
     * @param {String} body                                                                                            // 6108
     */                                                                                                                // 6109
    var tplShortcut = function (title, keys) {                                                                         // 6110
      var keyClass = 'note-shortcut-col col-xs-6 note-shortcut-';                                                      // 6111
      var body = [];                                                                                                   // 6112
                                                                                                                       // 6113
      for (var i in keys) {                                                                                            // 6114
        if (keys.hasOwnProperty(i)) {                                                                                  // 6115
          body.push(                                                                                                   // 6116
            '<div class="' + keyClass + 'key">' + keys[i].kbd + '</div>' +                                             // 6117
            '<div class="' + keyClass + 'name">' + keys[i].text + '</div>'                                             // 6118
            );                                                                                                         // 6119
        }                                                                                                              // 6120
      }                                                                                                                // 6121
                                                                                                                       // 6122
      return '<div class="note-shortcut-row row"><div class="' + keyClass + 'title col-xs-offset-6">' + title + '</div></div>' +
             '<div class="note-shortcut-row row">' + body.join('</div><div class="note-shortcut-row row">') + '</div>';
    };                                                                                                                 // 6125
                                                                                                                       // 6126
    var tplShortcutText = function (lang) {                                                                            // 6127
      var keys = [                                                                                                     // 6128
        { kbd: '⌘ + B', text: lang.font.bold },                                                                        // 6129
        { kbd: '⌘ + I', text: lang.font.italic },                                                                      // 6130
        { kbd: '⌘ + U', text: lang.font.underline },                                                                   // 6131
        { kbd: '⌘ + \\', text: lang.font.clear }                                                                       // 6132
      ];                                                                                                               // 6133
                                                                                                                       // 6134
      return tplShortcut(lang.shortcut.textFormatting, keys);                                                          // 6135
    };                                                                                                                 // 6136
                                                                                                                       // 6137
    var tplShortcutAction = function (lang) {                                                                          // 6138
      var keys = [                                                                                                     // 6139
        { kbd: '⌘ + Z', text: lang.history.undo },                                                                     // 6140
        { kbd: '⌘ + ⇧ + Z', text: lang.history.redo },                                                                 // 6141
        { kbd: '⌘ + ]', text: lang.paragraph.indent },                                                                 // 6142
        { kbd: '⌘ + [', text: lang.paragraph.outdent },                                                                // 6143
        { kbd: '⌘ + ENTER', text: lang.hr.insert }                                                                     // 6144
      ];                                                                                                               // 6145
                                                                                                                       // 6146
      return tplShortcut(lang.shortcut.action, keys);                                                                  // 6147
    };                                                                                                                 // 6148
                                                                                                                       // 6149
    var tplShortcutPara = function (lang) {                                                                            // 6150
      var keys = [                                                                                                     // 6151
        { kbd: '⌘ + ⇧ + L', text: lang.paragraph.left },                                                               // 6152
        { kbd: '⌘ + ⇧ + E', text: lang.paragraph.center },                                                             // 6153
        { kbd: '⌘ + ⇧ + R', text: lang.paragraph.right },                                                              // 6154
        { kbd: '⌘ + ⇧ + J', text: lang.paragraph.justify },                                                            // 6155
        { kbd: '⌘ + ⇧ + NUM7', text: lang.lists.ordered },                                                             // 6156
        { kbd: '⌘ + ⇧ + NUM8', text: lang.lists.unordered }                                                            // 6157
      ];                                                                                                               // 6158
                                                                                                                       // 6159
      return tplShortcut(lang.shortcut.paragraphFormatting, keys);                                                     // 6160
    };                                                                                                                 // 6161
                                                                                                                       // 6162
    var tplShortcutStyle = function (lang) {                                                                           // 6163
      var keys = [                                                                                                     // 6164
        { kbd: '⌘ + NUM0', text: lang.style.normal },                                                                  // 6165
        { kbd: '⌘ + NUM1', text: lang.style.h1 },                                                                      // 6166
        { kbd: '⌘ + NUM2', text: lang.style.h2 },                                                                      // 6167
        { kbd: '⌘ + NUM3', text: lang.style.h3 },                                                                      // 6168
        { kbd: '⌘ + NUM4', text: lang.style.h4 },                                                                      // 6169
        { kbd: '⌘ + NUM5', text: lang.style.h5 },                                                                      // 6170
        { kbd: '⌘ + NUM6', text: lang.style.h6 }                                                                       // 6171
      ];                                                                                                               // 6172
                                                                                                                       // 6173
      return tplShortcut(lang.shortcut.documentStyle, keys);                                                           // 6174
    };                                                                                                                 // 6175
                                                                                                                       // 6176
    var tplExtraShortcuts = function (lang, options) {                                                                 // 6177
      var extraKeys = options.extraKeys;                                                                               // 6178
      var keys = [];                                                                                                   // 6179
                                                                                                                       // 6180
      for (var key in extraKeys) {                                                                                     // 6181
        if (extraKeys.hasOwnProperty(key)) {                                                                           // 6182
          keys.push({ kbd: key, text: extraKeys[key] });                                                               // 6183
        }                                                                                                              // 6184
      }                                                                                                                // 6185
                                                                                                                       // 6186
      return tplShortcut(lang.shortcut.extraKeys, keys);                                                               // 6187
    };                                                                                                                 // 6188
                                                                                                                       // 6189
    var tplShortcutTable = function (lang, options) {                                                                  // 6190
      var colClass = 'class="note-shortcut note-shortcut-col col-sm-6 col-xs-12"';                                     // 6191
      var template = [                                                                                                 // 6192
        '<div ' + colClass + '>' + tplShortcutAction(lang, options) + '</div>' +                                       // 6193
        '<div ' + colClass + '>' + tplShortcutText(lang, options) + '</div>',                                          // 6194
        '<div ' + colClass + '>' + tplShortcutStyle(lang, options) + '</div>' +                                        // 6195
        '<div ' + colClass + '>' + tplShortcutPara(lang, options) + '</div>'                                           // 6196
      ];                                                                                                               // 6197
                                                                                                                       // 6198
      if (options.extraKeys) {                                                                                         // 6199
        template.push('<div ' + colClass + '>' + tplExtraShortcuts(lang, options) + '</div>');                         // 6200
      }                                                                                                                // 6201
                                                                                                                       // 6202
      return '<div class="note-shortcut-row row">' +                                                                   // 6203
               template.join('</div><div class="note-shortcut-row row">') +                                            // 6204
             '</div>';                                                                                                 // 6205
    };                                                                                                                 // 6206
                                                                                                                       // 6207
    var replaceMacKeys = function (sHtml) {                                                                            // 6208
      return sHtml.replace(/⌘/g, 'Ctrl').replace(/⇧/g, 'Shift');                                                       // 6209
    };                                                                                                                 // 6210
                                                                                                                       // 6211
    var tplDialogInfo = {                                                                                              // 6212
      image: function (lang, options) {                                                                                // 6213
        var imageLimitation = '';                                                                                      // 6214
        if (options.maximumImageFileSize) {                                                                            // 6215
          var unit = Math.floor(Math.log(options.maximumImageFileSize) / Math.log(1024));                              // 6216
          var readableSize = (options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 +                    // 6217
                             ' ' + ' KMGTP'[unit] + 'B';                                                               // 6218
          imageLimitation = '<small>' + lang.image.maximumFileSize + ' : ' + readableSize + '</small>';                // 6219
        }                                                                                                              // 6220
                                                                                                                       // 6221
        var body = '<div class="form-group row-fluid note-group-select-from-files">' +                                 // 6222
                     '<label>' + lang.image.selectFromFiles + '</label>' +                                             // 6223
                     '<input class="note-image-input" type="file" name="files" accept="image/*" multiple="multiple" />' +
                     imageLimitation +                                                                                 // 6225
                   '</div>' +                                                                                          // 6226
                   '<div class="form-group row-fluid">' +                                                              // 6227
                     '<label>' + lang.image.url + '</label>' +                                                         // 6228
                     '<input class="note-image-url form-control span12" type="text" />' +                              // 6229
                   '</div>';                                                                                           // 6230
        var footer = '<button href="#" class="btn btn-primary note-image-btn disabled" disabled>' + lang.image.insert + '</button>';
        return tplDialog('note-image-dialog', lang.image.insert, body, footer);                                        // 6232
      },                                                                                                               // 6233
                                                                                                                       // 6234
      link: function (lang, options) {                                                                                 // 6235
        var body = '<div class="form-group row-fluid">' +                                                              // 6236
                     '<label>' + lang.link.textToDisplay + '</label>' +                                                // 6237
                     '<input class="note-link-text form-control span12" type="text" />' +                              // 6238
                   '</div>' +                                                                                          // 6239
                   '<div class="form-group row-fluid">' +                                                              // 6240
                     '<label>' + lang.link.url + '</label>' +                                                          // 6241
                     '<input class="note-link-url form-control span12" type="text" />' +                               // 6242
                   '</div>' +                                                                                          // 6243
                   (!options.disableLinkTarget ?                                                                       // 6244
                     '<div class="checkbox">' +                                                                        // 6245
                       '<label>' + '<input type="checkbox" checked> ' +                                                // 6246
                         lang.link.openInNewWindow +                                                                   // 6247
                       '</label>' +                                                                                    // 6248
                     '</div>' : ''                                                                                     // 6249
                   );                                                                                                  // 6250
        var footer = '<button href="#" class="btn btn-primary note-link-btn disabled" disabled>' + lang.link.insert + '</button>';
        return tplDialog('note-link-dialog', lang.link.insert, body, footer);                                          // 6252
      },                                                                                                               // 6253
                                                                                                                       // 6254
      help: function (lang, options) {                                                                                 // 6255
        var body = '<a class="modal-close pull-right" aria-hidden="true" tabindex="-1">' + lang.shortcut.close + '</a>' +
                   '<div class="title">' + lang.shortcut.shortcuts + '</div>' +                                        // 6257
                   (agent.isMac ? tplShortcutTable(lang, options) : replaceMacKeys(tplShortcutTable(lang, options))) + // 6258
                   '<p class="text-center">' +                                                                         // 6259
                     '<a href="//summernote.org/" target="_blank">Summernote 0.6.6</a> · ' +                           // 6260
                     '<a href="//github.com/summernote/summernote" target="_blank">Project</a> · ' +                   // 6261
                     '<a href="//github.com/summernote/summernote/issues" target="_blank">Issues</a>' +                // 6262
                   '</p>';                                                                                             // 6263
        return tplDialog('note-help-dialog', '', body, '');                                                            // 6264
      }                                                                                                                // 6265
    };                                                                                                                 // 6266
                                                                                                                       // 6267
    var tplDialogs = function (lang, options) {                                                                        // 6268
      var dialogs = '';                                                                                                // 6269
                                                                                                                       // 6270
      $.each(tplDialogInfo, function (idx, tplDialog) {                                                                // 6271
        dialogs += tplDialog(lang, options);                                                                           // 6272
      });                                                                                                              // 6273
                                                                                                                       // 6274
      return '<div class="note-dialog">' + dialogs + '</div>';                                                         // 6275
    };                                                                                                                 // 6276
                                                                                                                       // 6277
    var tplStatusbar = function () {                                                                                   // 6278
      return '<div class="note-resizebar">' +                                                                          // 6279
               '<div class="note-icon-bar"></div>' +                                                                   // 6280
               '<div class="note-icon-bar"></div>' +                                                                   // 6281
               '<div class="note-icon-bar"></div>' +                                                                   // 6282
             '</div>';                                                                                                 // 6283
    };                                                                                                                 // 6284
                                                                                                                       // 6285
    var representShortcut = function (str) {                                                                           // 6286
      if (agent.isMac) {                                                                                               // 6287
        str = str.replace('CMD', '⌘').replace('SHIFT', '⇧');                                                           // 6288
      }                                                                                                                // 6289
                                                                                                                       // 6290
      return str.replace('BACKSLASH', '\\')                                                                            // 6291
                .replace('SLASH', '/')                                                                                 // 6292
                .replace('LEFTBRACKET', '[')                                                                           // 6293
                .replace('RIGHTBRACKET', ']');                                                                         // 6294
    };                                                                                                                 // 6295
                                                                                                                       // 6296
    /**                                                                                                                // 6297
     * createTooltip                                                                                                   // 6298
     *                                                                                                                 // 6299
     * @param {jQuery} $container                                                                                      // 6300
     * @param {Object} keyMap                                                                                          // 6301
     * @param {String} [sPlacement]                                                                                    // 6302
     */                                                                                                                // 6303
    var createTooltip = function ($container, keyMap, sPlacement) {                                                    // 6304
      var invertedKeyMap = func.invertObject(keyMap);                                                                  // 6305
      var $buttons = $container.find('button');                                                                        // 6306
                                                                                                                       // 6307
      $buttons.each(function (i, elBtn) {                                                                              // 6308
        var $btn = $(elBtn);                                                                                           // 6309
        var sShortcut = invertedKeyMap[$btn.data('event')];                                                            // 6310
        if (sShortcut) {                                                                                               // 6311
          $btn.attr('title', function (i, v) {                                                                         // 6312
            return v + ' (' + representShortcut(sShortcut) + ')';                                                      // 6313
          });                                                                                                          // 6314
        }                                                                                                              // 6315
      // bootstrap tooltip on btn-group bug                                                                            // 6316
      // https://github.com/twbs/bootstrap/issues/5687                                                                 // 6317
      }).tooltip({                                                                                                     // 6318
        container: 'body',                                                                                             // 6319
        trigger: 'hover',                                                                                              // 6320
        placement: sPlacement || 'top'                                                                                 // 6321
      }).on('click', function () {                                                                                     // 6322
        $(this).tooltip('hide');                                                                                       // 6323
      });                                                                                                              // 6324
    };                                                                                                                 // 6325
                                                                                                                       // 6326
    // createPalette                                                                                                   // 6327
    var createPalette = function ($container, options) {                                                               // 6328
      var colorInfo = options.colors;                                                                                  // 6329
      $container.find('.note-color-palette').each(function () {                                                        // 6330
        var $palette = $(this), eventName = $palette.attr('data-target-event');                                        // 6331
        var paletteContents = [];                                                                                      // 6332
        for (var row = 0, lenRow = colorInfo.length; row < lenRow; row++) {                                            // 6333
          var colors = colorInfo[row];                                                                                 // 6334
          var buttons = [];                                                                                            // 6335
          for (var col = 0, lenCol = colors.length; col < lenCol; col++) {                                             // 6336
            var color = colors[col];                                                                                   // 6337
            buttons.push(['<button type="button" class="note-color-btn" style="background-color:', color,              // 6338
                           ';" data-event="', eventName,                                                               // 6339
                           '" data-value="', color,                                                                    // 6340
                           '" title="', color,                                                                         // 6341
                           '" data-toggle="button" tabindex="-1"></button>'].join(''));                                // 6342
          }                                                                                                            // 6343
          paletteContents.push('<div class="note-color-row">' + buttons.join('') + '</div>');                          // 6344
        }                                                                                                              // 6345
        $palette.html(paletteContents.join(''));                                                                       // 6346
      });                                                                                                              // 6347
    };                                                                                                                 // 6348
                                                                                                                       // 6349
    /**                                                                                                                // 6350
     * create summernote layout (air mode)                                                                             // 6351
     *                                                                                                                 // 6352
     * @param {jQuery} $holder                                                                                         // 6353
     * @param {Object} options                                                                                         // 6354
     */                                                                                                                // 6355
    this.createLayoutByAirMode = function ($holder, options) {                                                         // 6356
      var langInfo = options.langInfo;                                                                                 // 6357
      var keyMap = options.keyMap[agent.isMac ? 'mac' : 'pc'];                                                         // 6358
      var id = func.uniqueId();                                                                                        // 6359
                                                                                                                       // 6360
      $holder.addClass('note-air-editor note-editable');                                                               // 6361
      $holder.attr({                                                                                                   // 6362
        'id': 'note-editor-' + id,                                                                                     // 6363
        'contentEditable': true                                                                                        // 6364
      });                                                                                                              // 6365
                                                                                                                       // 6366
      var body = document.body;                                                                                        // 6367
                                                                                                                       // 6368
      // create Popover                                                                                                // 6369
      var $popover = $(tplPopovers(langInfo, options));                                                                // 6370
      $popover.addClass('note-air-layout');                                                                            // 6371
      $popover.attr('id', 'note-popover-' + id);                                                                       // 6372
      $popover.appendTo(body);                                                                                         // 6373
      createTooltip($popover, keyMap);                                                                                 // 6374
      createPalette($popover, options);                                                                                // 6375
                                                                                                                       // 6376
      // create Handle                                                                                                 // 6377
      var $handle = $(tplHandles());                                                                                   // 6378
      $handle.addClass('note-air-layout');                                                                             // 6379
      $handle.attr('id', 'note-handle-' + id);                                                                         // 6380
      $handle.appendTo(body);                                                                                          // 6381
                                                                                                                       // 6382
      // create Dialog                                                                                                 // 6383
      var $dialog = $(tplDialogs(langInfo, options));                                                                  // 6384
      $dialog.addClass('note-air-layout');                                                                             // 6385
      $dialog.attr('id', 'note-dialog-' + id);                                                                         // 6386
      $dialog.find('button.close, a.modal-close').click(function () {                                                  // 6387
        $(this).closest('.modal').modal('hide');                                                                       // 6388
      });                                                                                                              // 6389
      $dialog.appendTo(body);                                                                                          // 6390
    };                                                                                                                 // 6391
                                                                                                                       // 6392
    /**                                                                                                                // 6393
     * create summernote layout (normal mode)                                                                          // 6394
     *                                                                                                                 // 6395
     * @param {jQuery} $holder                                                                                         // 6396
     * @param {Object} options                                                                                         // 6397
     */                                                                                                                // 6398
    this.createLayoutByFrame = function ($holder, options) {                                                           // 6399
      var langInfo = options.langInfo;                                                                                 // 6400
                                                                                                                       // 6401
      //01. create Editor                                                                                              // 6402
      var $editor = $('<div class="note-editor"></div>');                                                              // 6403
      if (options.width) {                                                                                             // 6404
        $editor.width(options.width);                                                                                  // 6405
      }                                                                                                                // 6406
                                                                                                                       // 6407
      //02. statusbar (resizebar)                                                                                      // 6408
      if (options.height > 0) {                                                                                        // 6409
        $('<div class="note-statusbar">' + (options.disableResizeEditor ? '' : tplStatusbar()) + '</div>').prependTo($editor);
      }                                                                                                                // 6411
                                                                                                                       // 6412
      //03. create Editable                                                                                            // 6413
      var isContentEditable = !$holder.is(':disabled');                                                                // 6414
      var $editable = $('<div class="note-editable" contentEditable="' + isContentEditable + '"></div>')               // 6415
          .prependTo($editor);                                                                                         // 6416
      if (options.height) {                                                                                            // 6417
        $editable.height(options.height);                                                                              // 6418
      }                                                                                                                // 6419
      if (options.direction) {                                                                                         // 6420
        $editable.attr('dir', options.direction);                                                                      // 6421
      }                                                                                                                // 6422
      var placeholder = $holder.attr('placeholder') || options.placeholder;                                            // 6423
      if (placeholder) {                                                                                               // 6424
        $editable.attr('data-placeholder', placeholder);                                                               // 6425
      }                                                                                                                // 6426
                                                                                                                       // 6427
      $editable.html(dom.html($holder));                                                                               // 6428
                                                                                                                       // 6429
      //031. create codable                                                                                            // 6430
      $('<textarea class="note-codable"></textarea>').prependTo($editor);                                              // 6431
                                                                                                                       // 6432
      //04. create Toolbar                                                                                             // 6433
      var $toolbar = $('<div class="note-toolbar btn-toolbar" />');                                                    // 6434
      for (var idx = 0, len = options.toolbar.length; idx < len; idx ++) {                                             // 6435
        var groupName = options.toolbar[idx][0];                                                                       // 6436
        var groupButtons = options.toolbar[idx][1];                                                                    // 6437
                                                                                                                       // 6438
        var $group = $('<div class="note-' + groupName + ' btn-group" />');                                            // 6439
        for (var i = 0, btnLength = groupButtons.length; i < btnLength; i++) {                                         // 6440
          var buttonInfo = tplButtonInfo[groupButtons[i]];                                                             // 6441
          // continue creating toolbar even if a button doesn't exist                                                  // 6442
          if (!$.isFunction(buttonInfo)) { continue; }                                                                 // 6443
                                                                                                                       // 6444
          var $button = $(buttonInfo(langInfo, options));                                                              // 6445
          $button.attr('data-name', groupButtons[i]);  // set button's alias, becuase to get button element from $toolbar
          $group.append($button);                                                                                      // 6447
        }                                                                                                              // 6448
        $toolbar.append($group);                                                                                       // 6449
      }                                                                                                                // 6450
                                                                                                                       // 6451
      $toolbar.prependTo($editor);                                                                                     // 6452
      var keyMap = options.keyMap[agent.isMac ? 'mac' : 'pc'];                                                         // 6453
      createPalette($toolbar, options);                                                                                // 6454
      createTooltip($toolbar, keyMap, 'bottom');                                                                       // 6455
                                                                                                                       // 6456
      //05. create Popover                                                                                             // 6457
      var $popover = $(tplPopovers(langInfo, options)).prependTo($editor);                                             // 6458
      createPalette($popover, options);                                                                                // 6459
      createTooltip($popover, keyMap);                                                                                 // 6460
                                                                                                                       // 6461
      //06. handle(control selection, ...)                                                                             // 6462
      $(tplHandles()).prependTo($editor);                                                                              // 6463
                                                                                                                       // 6464
      //07. create Dialog                                                                                              // 6465
      var $dialog = $(tplDialogs(langInfo, options)).prependTo($editor);                                               // 6466
      $dialog.find('button.close, a.modal-close').click(function () {                                                  // 6467
        $(this).closest('.modal').modal('hide');                                                                       // 6468
      });                                                                                                              // 6469
                                                                                                                       // 6470
      //08. create Dropzone                                                                                            // 6471
      $('<div class="note-dropzone"><div class="note-dropzone-message"></div></div>').prependTo($editor);              // 6472
                                                                                                                       // 6473
      //09. Editor/Holder switch                                                                                       // 6474
      $editor.insertAfter($holder);                                                                                    // 6475
      $holder.hide();                                                                                                  // 6476
    };                                                                                                                 // 6477
                                                                                                                       // 6478
    this.hasNoteEditor = function ($holder) {                                                                          // 6479
      return this.noteEditorFromHolder($holder).length > 0;                                                            // 6480
    };                                                                                                                 // 6481
                                                                                                                       // 6482
    this.noteEditorFromHolder = function ($holder) {                                                                   // 6483
      if ($holder.hasClass('note-air-editor')) {                                                                       // 6484
        return $holder;                                                                                                // 6485
      } else if ($holder.next().hasClass('note-editor')) {                                                             // 6486
        return $holder.next();                                                                                         // 6487
      } else {                                                                                                         // 6488
        return $();                                                                                                    // 6489
      }                                                                                                                // 6490
    };                                                                                                                 // 6491
                                                                                                                       // 6492
    /**                                                                                                                // 6493
     * create summernote layout                                                                                        // 6494
     *                                                                                                                 // 6495
     * @param {jQuery} $holder                                                                                         // 6496
     * @param {Object} options                                                                                         // 6497
     */                                                                                                                // 6498
    this.createLayout = function ($holder, options) {                                                                  // 6499
      if (options.airMode) {                                                                                           // 6500
        this.createLayoutByAirMode($holder, options);                                                                  // 6501
      } else {                                                                                                         // 6502
        this.createLayoutByFrame($holder, options);                                                                    // 6503
      }                                                                                                                // 6504
    };                                                                                                                 // 6505
                                                                                                                       // 6506
    /**                                                                                                                // 6507
     * returns layoutInfo from holder                                                                                  // 6508
     *                                                                                                                 // 6509
     * @param {jQuery} $holder - placeholder                                                                           // 6510
     * @return {Object}                                                                                                // 6511
     */                                                                                                                // 6512
    this.layoutInfoFromHolder = function ($holder) {                                                                   // 6513
      var $editor = this.noteEditorFromHolder($holder);                                                                // 6514
      if (!$editor.length) {                                                                                           // 6515
        return;                                                                                                        // 6516
      }                                                                                                                // 6517
                                                                                                                       // 6518
      // connect $holder to $editor                                                                                    // 6519
      $editor.data('holder', $holder);                                                                                 // 6520
                                                                                                                       // 6521
      return dom.buildLayoutInfo($editor);                                                                             // 6522
    };                                                                                                                 // 6523
                                                                                                                       // 6524
    /**                                                                                                                // 6525
     * removeLayout                                                                                                    // 6526
     *                                                                                                                 // 6527
     * @param {jQuery} $holder - placeholder                                                                           // 6528
     * @param {Object} layoutInfo                                                                                      // 6529
     * @param {Object} options                                                                                         // 6530
     *                                                                                                                 // 6531
     */                                                                                                                // 6532
    this.removeLayout = function ($holder, layoutInfo, options) {                                                      // 6533
      if (options.airMode) {                                                                                           // 6534
        $holder.removeClass('note-air-editor note-editable')                                                           // 6535
               .removeAttr('id contentEditable');                                                                      // 6536
                                                                                                                       // 6537
        layoutInfo.popover().remove();                                                                                 // 6538
        layoutInfo.handle().remove();                                                                                  // 6539
        layoutInfo.dialog().remove();                                                                                  // 6540
      } else {                                                                                                         // 6541
        $holder.html(layoutInfo.editable().html());                                                                    // 6542
                                                                                                                       // 6543
        layoutInfo.editor().remove();                                                                                  // 6544
        $holder.show();                                                                                                // 6545
      }                                                                                                                // 6546
    };                                                                                                                 // 6547
                                                                                                                       // 6548
    /**                                                                                                                // 6549
     *                                                                                                                 // 6550
     * @return {Object}                                                                                                // 6551
     * @return {function(label, options=):string} return.button {@link #tplButton function to make text button}        // 6552
     * @return {function(iconClass, options=):string} return.iconButton {@link #tplIconButton function to make icon button}
     * @return {function(className, title=, body=, footer=):string} return.dialog {@link #tplDialog function to make dialog}
     */                                                                                                                // 6555
    this.getTemplate = function () {                                                                                   // 6556
      return {                                                                                                         // 6557
        button: tplButton,                                                                                             // 6558
        iconButton: tplIconButton,                                                                                     // 6559
        dialog: tplDialog                                                                                              // 6560
      };                                                                                                               // 6561
    };                                                                                                                 // 6562
                                                                                                                       // 6563
    /**                                                                                                                // 6564
     * add button information                                                                                          // 6565
     *                                                                                                                 // 6566
     * @param {String} name button name                                                                                // 6567
     * @param {Function} buttonInfo function to make button, reference to {@link #tplButton},{@link #tplIconButton}    // 6568
     */                                                                                                                // 6569
    this.addButtonInfo = function (name, buttonInfo) {                                                                 // 6570
      tplButtonInfo[name] = buttonInfo;                                                                                // 6571
    };                                                                                                                 // 6572
                                                                                                                       // 6573
    /**                                                                                                                // 6574
     *                                                                                                                 // 6575
     * @param {String} name                                                                                            // 6576
     * @param {Function} dialogInfo function to make dialog, reference to {@link #tplDialog}                           // 6577
     */                                                                                                                // 6578
    this.addDialogInfo = function (name, dialogInfo) {                                                                 // 6579
      tplDialogInfo[name] = dialogInfo;                                                                                // 6580
    };                                                                                                                 // 6581
  };                                                                                                                   // 6582
                                                                                                                       // 6583
                                                                                                                       // 6584
  // jQuery namespace for summernote                                                                                   // 6585
  /**                                                                                                                  // 6586
   * @class $.summernote                                                                                               // 6587
   *                                                                                                                   // 6588
   * summernote attribute                                                                                              // 6589
   *                                                                                                                   // 6590
   * @mixin defaults                                                                                                   // 6591
   * @singleton                                                                                                        // 6592
   *                                                                                                                   // 6593
   */                                                                                                                  // 6594
  $.summernote = $.summernote || {};                                                                                   // 6595
                                                                                                                       // 6596
  // extends default settings                                                                                          // 6597
  //  - $.summernote.version                                                                                           // 6598
  //  - $.summernote.options                                                                                           // 6599
  //  - $.summernote.lang                                                                                              // 6600
  $.extend($.summernote, defaults);                                                                                    // 6601
                                                                                                                       // 6602
  var renderer = new Renderer();                                                                                       // 6603
  var eventHandler = new EventHandler();                                                                               // 6604
                                                                                                                       // 6605
  $.extend($.summernote, {                                                                                             // 6606
    /** @property {Renderer} */                                                                                        // 6607
    renderer: renderer,                                                                                                // 6608
    /** @property {EventHandler} */                                                                                    // 6609
    eventHandler: eventHandler,                                                                                        // 6610
    /**                                                                                                                // 6611
     * @property {Object} core                                                                                         // 6612
     * @property {core.agent} core.agent                                                                               // 6613
     * @property {core.dom} core.dom                                                                                   // 6614
     * @property {core.range} core.range                                                                               // 6615
     */                                                                                                                // 6616
    core: {                                                                                                            // 6617
      agent: agent,                                                                                                    // 6618
      dom: dom,                                                                                                        // 6619
      range: range                                                                                                     // 6620
    },                                                                                                                 // 6621
    /**                                                                                                                // 6622
     * @property {Object}                                                                                              // 6623
     * pluginEvents event list for plugins                                                                             // 6624
     * event has name and callback function.                                                                           // 6625
     *                                                                                                                 // 6626
     * ```                                                                                                             // 6627
     * $.summernote.addPlugin({                                                                                        // 6628
     *     events : {                                                                                                  // 6629
     *          'hello' : function(layoutInfo, value, $target) {                                                       // 6630
     *              console.log('event name is hello, value is ' + value );                                            // 6631
     *          }                                                                                                      // 6632
     *     }                                                                                                           // 6633
     * })                                                                                                              // 6634
     * ```                                                                                                             // 6635
     *                                                                                                                 // 6636
     * * event name is data-event property.                                                                            // 6637
     * * layoutInfo is a summernote layout information.                                                                // 6638
     * * value is data-value property.                                                                                 // 6639
     */                                                                                                                // 6640
    pluginEvents: {},                                                                                                  // 6641
                                                                                                                       // 6642
    plugins : []                                                                                                       // 6643
  });                                                                                                                  // 6644
                                                                                                                       // 6645
  /**                                                                                                                  // 6646
   * @method addPlugin                                                                                                 // 6647
   *                                                                                                                   // 6648
   * add Plugin in Summernote                                                                                          // 6649
   *                                                                                                                   // 6650
   * Summernote can make a own plugin.                                                                                 // 6651
   *                                                                                                                   // 6652
   * ### Define plugin                                                                                                 // 6653
   * ```                                                                                                               // 6654
   * // get template function                                                                                          // 6655
   * var tmpl = $.summernote.renderer.getTemplate();                                                                   // 6656
   *                                                                                                                   // 6657
   * // add a button                                                                                                   // 6658
   * $.summernote.addPlugin({                                                                                          // 6659
   *     buttons : {                                                                                                   // 6660
   *        // "hello"  is button's namespace.                                                                         // 6661
   *        "hello" : function(lang, options) {                                                                        // 6662
   *            // make icon button by template function                                                               // 6663
   *            return tmpl.iconButton('fa fa-header', {                                                               // 6664
   *                // callback function name when button clicked                                                      // 6665
   *                event : 'hello',                                                                                   // 6666
   *                // set data-value property                                                                         // 6667
   *                value : 'hello',                                                                                   // 6668
   *                hide : true                                                                                        // 6669
   *            });                                                                                                    // 6670
   *        }                                                                                                          // 6671
   *                                                                                                                   // 6672
   *     },                                                                                                            // 6673
   *                                                                                                                   // 6674
   *     events : {                                                                                                    // 6675
   *        "hello" : function(layoutInfo, value) {                                                                    // 6676
   *            // here is event code                                                                                  // 6677
   *        }                                                                                                          // 6678
   *     }                                                                                                             // 6679
   * });                                                                                                               // 6680
   * ```                                                                                                               // 6681
   * ### Use a plugin in toolbar                                                                                       // 6682
   *                                                                                                                   // 6683
   * ```                                                                                                               // 6684
   *    $("#editor").summernote({                                                                                      // 6685
   *    ...                                                                                                            // 6686
   *    toolbar : [                                                                                                    // 6687
   *        // display hello plugin in toolbar                                                                         // 6688
   *        ['group', [ 'hello' ]]                                                                                     // 6689
   *    ]                                                                                                              // 6690
   *    ...                                                                                                            // 6691
   *    });                                                                                                            // 6692
   * ```                                                                                                               // 6693
   *                                                                                                                   // 6694
   *                                                                                                                   // 6695
   * @param {Object} plugin                                                                                            // 6696
   * @param {Object} [plugin.buttons] define plugin button. for detail, see to Renderer.addButtonInfo                  // 6697
   * @param {Object} [plugin.dialogs] define plugin dialog. for detail, see to Renderer.addDialogInfo                  // 6698
   * @param {Object} [plugin.events] add event in $.summernote.pluginEvents                                            // 6699
   * @param {Object} [plugin.langs] update $.summernote.lang                                                           // 6700
   * @param {Object} [plugin.options] update $.summernote.options                                                      // 6701
   */                                                                                                                  // 6702
  $.summernote.addPlugin = function (plugin) {                                                                         // 6703
                                                                                                                       // 6704
    // save plugin list                                                                                                // 6705
    $.summernote.plugins.push(plugin);                                                                                 // 6706
                                                                                                                       // 6707
    if (plugin.buttons) {                                                                                              // 6708
      $.each(plugin.buttons, function (name, button) {                                                                 // 6709
        renderer.addButtonInfo(name, button);                                                                          // 6710
      });                                                                                                              // 6711
    }                                                                                                                  // 6712
                                                                                                                       // 6713
    if (plugin.dialogs) {                                                                                              // 6714
      $.each(plugin.dialogs, function (name, dialog) {                                                                 // 6715
        renderer.addDialogInfo(name, dialog);                                                                          // 6716
      });                                                                                                              // 6717
    }                                                                                                                  // 6718
                                                                                                                       // 6719
    if (plugin.events) {                                                                                               // 6720
      $.each(plugin.events, function (name, event) {                                                                   // 6721
        $.summernote.pluginEvents[name] = event;                                                                       // 6722
      });                                                                                                              // 6723
    }                                                                                                                  // 6724
                                                                                                                       // 6725
    if (plugin.langs) {                                                                                                // 6726
      $.each(plugin.langs, function (locale, lang) {                                                                   // 6727
        if ($.summernote.lang[locale]) {                                                                               // 6728
          $.extend($.summernote.lang[locale], lang);                                                                   // 6729
        }                                                                                                              // 6730
      });                                                                                                              // 6731
    }                                                                                                                  // 6732
                                                                                                                       // 6733
    if (plugin.options) {                                                                                              // 6734
      $.extend($.summernote.options, plugin.options);                                                                  // 6735
    }                                                                                                                  // 6736
  };                                                                                                                   // 6737
                                                                                                                       // 6738
  /*                                                                                                                   // 6739
   * extend $.fn                                                                                                       // 6740
   */                                                                                                                  // 6741
  $.fn.extend({                                                                                                        // 6742
    /**                                                                                                                // 6743
     * @method                                                                                                         // 6744
     * Initialize summernote                                                                                           // 6745
     *  - create editor layout and attach Mouse and keyboard events.                                                   // 6746
     *                                                                                                                 // 6747
     * ```                                                                                                             // 6748
     * $("#summernote").summernote( { options ..} );                                                                   // 6749
     * ```                                                                                                             // 6750
     *                                                                                                                 // 6751
     * @member $.fn                                                                                                    // 6752
     * @param {Object|String} options reference to $.summernote.options                                                // 6753
     * @return {this}                                                                                                  // 6754
     */                                                                                                                // 6755
    summernote: function () {                                                                                          // 6756
      // check first argument's type                                                                                   // 6757
      //  - {String}: External API call {{module}}.{{method}}                                                          // 6758
      //  - {Object}: init options                                                                                     // 6759
      var type = $.type(list.head(arguments));                                                                         // 6760
      var isExternalAPICalled = type === 'string';                                                                     // 6761
      var isInitOptions = type === 'object';                                                                           // 6762
                                                                                                                       // 6763
      // extend default options with custom user options                                                               // 6764
      var options = isInitOptions ? list.head(arguments) : {};                                                         // 6765
      options = $.extend({}, $.summernote.options, options);                                                           // 6766
                                                                                                                       // 6767
      // Include langInfo in options for later use, e.g. for image drag-n-drop                                         // 6768
      // Setup language info with en-US as default                                                                     // 6769
      options.langInfo = $.extend(true, {}, $.summernote.lang['en-US'], $.summernote.lang[options.lang]);              // 6770
                                                                                                                       // 6771
      this.each(function (idx, holder) {                                                                               // 6772
        var $holder = $(holder);                                                                                       // 6773
                                                                                                                       // 6774
        // if layout isn't created yet, createLayout and attach events                                                 // 6775
        if (!renderer.hasNoteEditor($holder)) {                                                                        // 6776
          renderer.createLayout($holder, options);                                                                     // 6777
                                                                                                                       // 6778
          var layoutInfo = renderer.layoutInfoFromHolder($holder);                                                     // 6779
                                                                                                                       // 6780
          eventHandler.attach(layoutInfo, options);                                                                    // 6781
          eventHandler.attachCustomEvent(layoutInfo, options);                                                         // 6782
                                                                                                                       // 6783
        }                                                                                                              // 6784
      });                                                                                                              // 6785
                                                                                                                       // 6786
      // callback on init                                                                                              // 6787
      if (!isExternalAPICalled && this.length && options.oninit) {                                                     // 6788
        options.oninit();                                                                                              // 6789
      }                                                                                                                // 6790
                                                                                                                       // 6791
      var $first = this.first();                                                                                       // 6792
      if ($first.length) {                                                                                             // 6793
        var layoutInfo = renderer.layoutInfoFromHolder($first);                                                        // 6794
                                                                                                                       // 6795
        // external API                                                                                                // 6796
        if (isExternalAPICalled) {                                                                                     // 6797
          var moduleAndMethod = list.head(list.from(arguments));                                                       // 6798
          var args = list.tail(list.from(arguments));                                                                  // 6799
                                                                                                                       // 6800
          // TODO now external API only works for editor                                                               // 6801
          var params = [moduleAndMethod, layoutInfo.editable()].concat(args);                                          // 6802
          return eventHandler.invoke.apply(eventHandler, params);                                                      // 6803
        } else if (options.focus) {                                                                                    // 6804
          // focus on first editable element for initialize editor                                                     // 6805
          layoutInfo.editable().focus();                                                                               // 6806
        }                                                                                                              // 6807
      }                                                                                                                // 6808
                                                                                                                       // 6809
      return this;                                                                                                     // 6810
    },                                                                                                                 // 6811
                                                                                                                       // 6812
    /**                                                                                                                // 6813
     * @method                                                                                                         // 6814
     *                                                                                                                 // 6815
     * get the HTML contents of note or set the HTML contents of note.                                                 // 6816
     *                                                                                                                 // 6817
     * * get contents                                                                                                  // 6818
     * ```                                                                                                             // 6819
     * var content = $("#summernote").code();                                                                          // 6820
     * ```                                                                                                             // 6821
     * * set contents                                                                                                  // 6822
     *                                                                                                                 // 6823
     * ```                                                                                                             // 6824
     * $("#summernote").code(html);                                                                                    // 6825
     * ```                                                                                                             // 6826
     *                                                                                                                 // 6827
     * @member $.fn                                                                                                    // 6828
     * @param {String} [html] - HTML contents(optional, set)                                                           // 6829
     * @return {this|String} - context(set) or HTML contents of note(get).                                             // 6830
     */                                                                                                                // 6831
    code: function (html) {                                                                                            // 6832
      // get the HTML contents of note                                                                                 // 6833
      if (html === undefined) {                                                                                        // 6834
        var $holder = this.first();                                                                                    // 6835
        if (!$holder.length) {                                                                                         // 6836
          return;                                                                                                      // 6837
        }                                                                                                              // 6838
                                                                                                                       // 6839
        var layoutInfo = renderer.layoutInfoFromHolder($holder);                                                       // 6840
        var $editable = layoutInfo && layoutInfo.editable();                                                           // 6841
                                                                                                                       // 6842
        if ($editable && $editable.length) {                                                                           // 6843
          var isCodeview = eventHandler.invoke('codeview.isActivated', layoutInfo);                                    // 6844
          eventHandler.invoke('codeview.sync', layoutInfo);                                                            // 6845
          return isCodeview ? layoutInfo.codable().val() :                                                             // 6846
                              layoutInfo.editable().html();                                                            // 6847
        }                                                                                                              // 6848
        return dom.value($holder);                                                                                     // 6849
      }                                                                                                                // 6850
                                                                                                                       // 6851
      // set the HTML contents of note                                                                                 // 6852
      this.each(function (i, holder) {                                                                                 // 6853
        var layoutInfo = renderer.layoutInfoFromHolder($(holder));                                                     // 6854
        var $editable = layoutInfo && layoutInfo.editable();                                                           // 6855
        if ($editable) {                                                                                               // 6856
          $editable.html(html);                                                                                        // 6857
        }                                                                                                              // 6858
      });                                                                                                              // 6859
                                                                                                                       // 6860
      return this;                                                                                                     // 6861
    },                                                                                                                 // 6862
                                                                                                                       // 6863
    /**                                                                                                                // 6864
     * @method                                                                                                         // 6865
     *                                                                                                                 // 6866
     * destroy Editor Layout and detach Key and Mouse Event                                                            // 6867
     *                                                                                                                 // 6868
     * @member $.fn                                                                                                    // 6869
     * @return {this}                                                                                                  // 6870
     */                                                                                                                // 6871
    destroy: function () {                                                                                             // 6872
      this.each(function (idx, holder) {                                                                               // 6873
        var $holder = $(holder);                                                                                       // 6874
                                                                                                                       // 6875
        if (!renderer.hasNoteEditor($holder)) {                                                                        // 6876
          return;                                                                                                      // 6877
        }                                                                                                              // 6878
                                                                                                                       // 6879
        var info = renderer.layoutInfoFromHolder($holder);                                                             // 6880
        var options = info.editor().data('options');                                                                   // 6881
                                                                                                                       // 6882
        eventHandler.detach(info, options);                                                                            // 6883
        renderer.removeLayout($holder, info, options);                                                                 // 6884
      });                                                                                                              // 6885
                                                                                                                       // 6886
      return this;                                                                                                     // 6887
    }                                                                                                                  // 6888
  });                                                                                                                  // 6889
}));                                                                                                                   // 6890
                                                                                                                       // 6891
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['summernote:standalone'] = {};

})();
