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

/* Package-scope variables */
var FileCollection, fileCollection, __coffeescriptShare;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/mrt:filecollection/gridFS.coffee.js                                                                  //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
share.defaultChunkSize = 2 * 1024 * 1024;

share.defaultRoot = 'fs';

share.insert_func = function(file, chunkSize) {
  var id, subFile, _ref, _ref1, _ref2, _ref3;
  if (file == null) {
    file = {};
  }
  try {
    id = new Meteor.Collection.ObjectID("" + file._id);
  } catch (_error) {
    id = new Meteor.Collection.ObjectID();
  }
  subFile = {};
  subFile._id = id;
  subFile.length = 0;
  subFile.md5 = 'd41d8cd98f00b204e9800998ecf8427e';
  subFile.uploadDate = new Date();
  subFile.chunkSize = chunkSize;
  subFile.filename = (_ref = file.filename) != null ? _ref : '';
  subFile.metadata = (_ref1 = file.metadata) != null ? _ref1 : {};
  subFile.aliases = (_ref2 = file.aliases) != null ? _ref2 : [];
  subFile.contentType = (_ref3 = file.contentType) != null ? _ref3 : 'application/octet-stream';
  return subFile;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/mrt:filecollection/resumable/resumable.js                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/*                                                                                                               // 1
* MIT Licensed                                                                                                   // 2
* http://www.23developer.com/opensource                                                                          // 3
* http://github.com/23/resumable.js                                                                              // 4
* Steffen Tiedemann Christensen, steffen@23company.com                                                           // 5
*/                                                                                                               // 6
                                                                                                                 // 7
(function(){                                                                                                     // 8
"use strict";                                                                                                    // 9
                                                                                                                 // 10
  var Resumable = function(opts){                                                                                // 11
    if ( !(this instanceof Resumable) ) {                                                                        // 12
      return new Resumable(opts);                                                                                // 13
    }                                                                                                            // 14
    this.version = 1.0;                                                                                          // 15
    // SUPPORTED BY BROWSER?                                                                                     // 16
    // Check if these features are support by the browser:                                                       // 17
    // - File object type                                                                                        // 18
    // - Blob object type                                                                                        // 19
    // - FileList object type                                                                                    // 20
    // - slicing files                                                                                           // 21
    this.support = (                                                                                             // 22
                   (typeof(File)!=='undefined')                                                                  // 23
                   &&                                                                                            // 24
                   (typeof(Blob)!=='undefined')                                                                  // 25
                   &&                                                                                            // 26
                   (typeof(FileList)!=='undefined')                                                              // 27
                   &&                                                                                            // 28
                   (!!Blob.prototype.webkitSlice||!!Blob.prototype.mozSlice||!!Blob.prototype.slice||false)      // 29
                   );                                                                                            // 30
    if(!this.support) return(false);                                                                             // 31
                                                                                                                 // 32
                                                                                                                 // 33
    // PROPERTIES                                                                                                // 34
    var $ = this;                                                                                                // 35
    $.files = [];                                                                                                // 36
    $.defaults = {                                                                                               // 37
      chunkSize:1*1024*1024,                                                                                     // 38
      forceChunkSize:false,                                                                                      // 39
      simultaneousUploads:3,                                                                                     // 40
      fileParameterName:'file',                                                                                  // 41
      throttleProgressCallbacks:0.5,                                                                             // 42
      query:{},                                                                                                  // 43
      headers:{},                                                                                                // 44
      preprocess:null,                                                                                           // 45
      method:'multipart',                                                                                        // 46
      prioritizeFirstAndLastChunk:false,                                                                         // 47
      target:'/',                                                                                                // 48
      testChunks:true,                                                                                           // 49
      generateUniqueIdentifier:null,                                                                             // 50
      maxChunkRetries:undefined,                                                                                 // 51
      chunkRetryInterval:undefined,                                                                              // 52
      permanentErrors:[404, 415, 500, 501],                                                                      // 53
      maxFiles:undefined,                                                                                        // 54
      withCredentials:false,                                                                                     // 55
      xhrTimeout:0,                                                                                              // 56
      maxFilesErrorCallback:function (files, errorCount) {                                                       // 57
        var maxFiles = $.getOpt('maxFiles');                                                                     // 58
        alert('Please upload ' + maxFiles + ' file' + (maxFiles === 1 ? '' : 's') + ' at a time.');              // 59
      },                                                                                                         // 60
      minFileSize:1,                                                                                             // 61
      minFileSizeErrorCallback:function(file, errorCount) {                                                      // 62
        alert(file.fileName||file.name +' is too small, please upload files larger than ' + $h.formatSize($.getOpt('minFileSize')) + '.');
      },                                                                                                         // 64
      maxFileSize:undefined,                                                                                     // 65
      maxFileSizeErrorCallback:function(file, errorCount) {                                                      // 66
        alert(file.fileName||file.name +' is too large, please upload files less than ' + $h.formatSize($.getOpt('maxFileSize')) + '.');
      },                                                                                                         // 68
      fileType: [],                                                                                              // 69
      fileTypeErrorCallback: function(file, errorCount) {                                                        // 70
        alert(file.fileName||file.name +' has type not allowed, please upload files of type ' + $.getOpt('fileType') + '.');
      }                                                                                                          // 72
    };                                                                                                           // 73
    $.opts = opts||{};                                                                                           // 74
    $.getOpt = function(o) {                                                                                     // 75
      var $opt = this;                                                                                           // 76
      // Get multiple option if passed an array                                                                  // 77
      if(o instanceof Array) {                                                                                   // 78
        var options = {};                                                                                        // 79
        $h.each(o, function(option){                                                                             // 80
          options[option] = $opt.getOpt(option);                                                                 // 81
        });                                                                                                      // 82
        return options;                                                                                          // 83
      }                                                                                                          // 84
      // Otherwise, just return a simple option                                                                  // 85
      if ($opt instanceof ResumableChunk) {                                                                      // 86
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }                                        // 87
        else { $opt = $opt.fileObj; }                                                                            // 88
      }                                                                                                          // 89
      if ($opt instanceof ResumableFile) {                                                                       // 90
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }                                        // 91
        else { $opt = $opt.resumableObj; }                                                                       // 92
      }                                                                                                          // 93
      if ($opt instanceof Resumable) {                                                                           // 94
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }                                        // 95
        else { return $opt.defaults[o]; }                                                                        // 96
      }                                                                                                          // 97
    };                                                                                                           // 98
                                                                                                                 // 99
    // EVENTS                                                                                                    // 100
    // catchAll(event, ...)                                                                                      // 101
    // fileSuccess(file), fileProgress(file), fileAdded(file, event), fileRetry(file), fileError(file, message), // 102
    // complete(), progress(), error(message, file), pause()                                                     // 103
    $.events = [];                                                                                               // 104
    $.on = function(event,callback){                                                                             // 105
      $.events.push(event.toLowerCase(), callback);                                                              // 106
    };                                                                                                           // 107
    $.fire = function(){                                                                                         // 108
      // `arguments` is an object, not array, in FF, so:                                                         // 109
      var args = [];                                                                                             // 110
      for (var i=0; i<arguments.length; i++) args.push(arguments[i]);                                            // 111
      // Find event listeners, and support pseudo-event `catchAll`                                               // 112
      var event = args[0].toLowerCase();                                                                         // 113
      for (var i=0; i<=$.events.length; i+=2) {                                                                  // 114
        if($.events[i]==event) $.events[i+1].apply($,args.slice(1));                                             // 115
        if($.events[i]=='catchall') $.events[i+1].apply(null,args);                                              // 116
      }                                                                                                          // 117
      if(event=='fileerror') $.fire('error', args[2], args[1]);                                                  // 118
      if(event=='fileprogress') $.fire('progress');                                                              // 119
    };                                                                                                           // 120
                                                                                                                 // 121
                                                                                                                 // 122
    // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)                                     // 123
    var $h = {                                                                                                   // 124
      stopEvent: function(e){                                                                                    // 125
        e.stopPropagation();                                                                                     // 126
        e.preventDefault();                                                                                      // 127
      },                                                                                                         // 128
      each: function(o,callback){                                                                                // 129
        if(typeof(o.length)!=='undefined') {                                                                     // 130
          for (var i=0; i<o.length; i++) {                                                                       // 131
            // Array or FileList                                                                                 // 132
            if(callback(o[i])===false) return;                                                                   // 133
          }                                                                                                      // 134
        } else {                                                                                                 // 135
          for (i in o) {                                                                                         // 136
            // Object                                                                                            // 137
            if(callback(i,o[i])===false) return;                                                                 // 138
          }                                                                                                      // 139
        }                                                                                                        // 140
      },                                                                                                         // 141
      generateUniqueIdentifier:function(file){                                                                   // 142
        var custom = $.getOpt('generateUniqueIdentifier');                                                       // 143
        if(typeof custom === 'function') {                                                                       // 144
          return custom(file);                                                                                   // 145
        }                                                                                                        // 146
        var relativePath = file.webkitRelativePath||file.fileName||file.name; // Some confusion in different versions of Firefox
        var size = file.size;                                                                                    // 148
        return(size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, ''));                                      // 149
      },                                                                                                         // 150
      contains:function(array,test) {                                                                            // 151
        var result = false;                                                                                      // 152
                                                                                                                 // 153
        $h.each(array, function(value) {                                                                         // 154
          if (value == test) {                                                                                   // 155
            result = true;                                                                                       // 156
            return false;                                                                                        // 157
          }                                                                                                      // 158
          return true;                                                                                           // 159
        });                                                                                                      // 160
                                                                                                                 // 161
        return result;                                                                                           // 162
      },                                                                                                         // 163
      formatSize:function(size){                                                                                 // 164
        if(size<1024) {                                                                                          // 165
          return size + ' bytes';                                                                                // 166
        } else if(size<1024*1024) {                                                                              // 167
          return (size/1024.0).toFixed(0) + ' KB';                                                               // 168
        } else if(size<1024*1024*1024) {                                                                         // 169
          return (size/1024.0/1024.0).toFixed(1) + ' MB';                                                        // 170
        } else {                                                                                                 // 171
          return (size/1024.0/1024.0/1024.0).toFixed(1) + ' GB';                                                 // 172
        }                                                                                                        // 173
      },                                                                                                         // 174
      getTarget:function(params){                                                                                // 175
        var target = $.getOpt('target');                                                                         // 176
        if(target.indexOf('?') < 0) {                                                                            // 177
          target += '?';                                                                                         // 178
        } else {                                                                                                 // 179
          target += '&';                                                                                         // 180
        }                                                                                                        // 181
        return target + params.join('&');                                                                        // 182
      }                                                                                                          // 183
    };                                                                                                           // 184
                                                                                                                 // 185
    var onDrop = function(event){                                                                                // 186
      $h.stopEvent(event);                                                                                       // 187
      appendFilesFromFileList(event.dataTransfer.files, event);                                                  // 188
    };                                                                                                           // 189
    var onDragOver = function(e) {                                                                               // 190
      e.preventDefault();                                                                                        // 191
    };                                                                                                           // 192
                                                                                                                 // 193
    // INTERNAL METHODS (both handy and responsible for the heavy load)                                          // 194
    var appendFilesFromFileList = function(fileList, event){                                                     // 195
      // check for uploading too many files                                                                      // 196
      var errorCount = 0;                                                                                        // 197
      var o = $.getOpt(['maxFiles', 'minFileSize', 'maxFileSize', 'maxFilesErrorCallback', 'minFileSizeErrorCallback', 'maxFileSizeErrorCallback', 'fileType', 'fileTypeErrorCallback']);
      if (typeof(o.maxFiles)!=='undefined' && o.maxFiles<(fileList.length+$.files.length)) {                     // 199
        // if single-file upload, file is already added, and trying to add 1 new file, simply replace the already-added file 
        if (o.maxFiles===1 && $.files.length===1 && fileList.length===1) {                                       // 201
          $.removeFile($.files[0]);                                                                              // 202
        } else {                                                                                                 // 203
          o.maxFilesErrorCallback(fileList, errorCount++);                                                       // 204
          return false;                                                                                          // 205
        }                                                                                                        // 206
      }                                                                                                          // 207
      var files = [];                                                                                            // 208
      $h.each(fileList, function(file){                                                                          // 209
        var fileName = file.name.split('.');                                                                     // 210
        var fileType = fileName[fileName.length-1].toLowerCase();                                                // 211
                                                                                                                 // 212
        if (o.fileType.length > 0 && !$h.contains(o.fileType, fileType)) {                                       // 213
          o.fileTypeErrorCallback(file, errorCount++);                                                           // 214
          return false;                                                                                          // 215
        }                                                                                                        // 216
                                                                                                                 // 217
        if (typeof(o.minFileSize)!=='undefined' && file.size<o.minFileSize) {                                    // 218
          o.minFileSizeErrorCallback(file, errorCount++);                                                        // 219
          return false;                                                                                          // 220
        }                                                                                                        // 221
        if (typeof(o.maxFileSize)!=='undefined' && file.size>o.maxFileSize) {                                    // 222
          o.maxFileSizeErrorCallback(file, errorCount++);                                                        // 223
          return false;                                                                                          // 224
        }                                                                                                        // 225
                                                                                                                 // 226
        // directories have size == 0                                                                            // 227
        if (!$.getFromUniqueIdentifier($h.generateUniqueIdentifier(file))) {(function(){                         // 228
          var f = new ResumableFile($, file);                                                                    // 229
          window.setTimeout(function(){                                                                          // 230
            $.files.push(f);                                                                                     // 231
            files.push(f);                                                                                       // 232
            f.container = (typeof event != 'undefined' ? event.srcElement : null);                               // 233
            $.fire('fileAdded', f, event)                                                                        // 234
          },0);                                                                                                  // 235
        })()};                                                                                                   // 236
      });                                                                                                        // 237
      window.setTimeout(function(){                                                                              // 238
        $.fire('filesAdded', files)                                                                              // 239
      },0);                                                                                                      // 240
    };                                                                                                           // 241
                                                                                                                 // 242
    // INTERNAL OBJECT TYPES                                                                                     // 243
    function ResumableFile(resumableObj, file){                                                                  // 244
      var $ = this;                                                                                              // 245
      $.opts = {};                                                                                               // 246
      $.getOpt = resumableObj.getOpt;                                                                            // 247
      $._prevProgress = 0;                                                                                       // 248
      $.resumableObj = resumableObj;                                                                             // 249
      $.file = file;                                                                                             // 250
      $.fileName = file.fileName||file.name; // Some confusion in different versions of Firefox                  // 251
      $.size = file.size;                                                                                        // 252
      $.relativePath = file.webkitRelativePath || $.fileName;                                                    // 253
      $.uniqueIdentifier = $h.generateUniqueIdentifier(file);                                                    // 254
      $._pause = false;                                                                                          // 255
      $.container = '';                                                                                          // 256
      var _error = false;                                                                                        // 257
                                                                                                                 // 258
      // Callback when something happens within the chunk                                                        // 259
      var chunkEvent = function(event, message){                                                                 // 260
        // event can be 'progress', 'success', 'error' or 'retry'                                                // 261
        switch(event){                                                                                           // 262
        case 'progress':                                                                                         // 263
          $.resumableObj.fire('fileProgress', $);                                                                // 264
          break;                                                                                                 // 265
        case 'error':                                                                                            // 266
          $.abort();                                                                                             // 267
          _error = true;                                                                                         // 268
          $.chunks = [];                                                                                         // 269
          $.resumableObj.fire('fileError', $, message);                                                          // 270
          break;                                                                                                 // 271
        case 'success':                                                                                          // 272
          if(_error) return;                                                                                     // 273
          $.resumableObj.fire('fileProgress', $); // it's at least progress                                      // 274
          if($.isComplete()) {                                                                                   // 275
            $.resumableObj.fire('fileSuccess', $, message);                                                      // 276
          }                                                                                                      // 277
          break;                                                                                                 // 278
        case 'retry':                                                                                            // 279
          $.resumableObj.fire('fileRetry', $);                                                                   // 280
          break;                                                                                                 // 281
        }                                                                                                        // 282
      };                                                                                                         // 283
                                                                                                                 // 284
      // Main code to set up a file object with chunks,                                                          // 285
      // packaged to be able to handle retries if needed.                                                        // 286
      $.chunks = [];                                                                                             // 287
      $.abort = function(){                                                                                      // 288
        // Stop current uploads                                                                                  // 289
        var abortCount = 0;                                                                                      // 290
        $h.each($.chunks, function(c){                                                                           // 291
          if(c.status()=='uploading') {                                                                          // 292
            c.abort();                                                                                           // 293
            abortCount++;                                                                                        // 294
          }                                                                                                      // 295
        });                                                                                                      // 296
        if(abortCount>0) $.resumableObj.fire('fileProgress', $);                                                 // 297
      };                                                                                                         // 298
      $.cancel = function(){                                                                                     // 299
        // Reset this file to be void                                                                            // 300
        var _chunks = $.chunks;                                                                                  // 301
        $.chunks = [];                                                                                           // 302
        // Stop current uploads                                                                                  // 303
        $h.each(_chunks, function(c){                                                                            // 304
          if(c.status()=='uploading')  {                                                                         // 305
            c.abort();                                                                                           // 306
            $.resumableObj.uploadNextChunk();                                                                    // 307
          }                                                                                                      // 308
        });                                                                                                      // 309
        $.resumableObj.removeFile($);                                                                            // 310
        $.resumableObj.fire('fileProgress', $);                                                                  // 311
      };                                                                                                         // 312
      $.retry = function(){                                                                                      // 313
        $.bootstrap();                                                                                           // 314
        var firedRetry = false;                                                                                  // 315
        $.resumableObj.on('chunkingComplete', function(){                                                        // 316
          if(!firedRetry) $.resumableObj.upload();                                                               // 317
          firedRetry = true;                                                                                     // 318
        });                                                                                                      // 319
      };                                                                                                         // 320
      $.bootstrap = function(){                                                                                  // 321
        $.abort();                                                                                               // 322
        _error = false;                                                                                          // 323
        // Rebuild stack of chunks from file                                                                     // 324
        $.chunks = [];                                                                                           // 325
        $._prevProgress = 0;                                                                                     // 326
        var round = $.getOpt('forceChunkSize') ? Math.ceil : Math.floor;                                         // 327
        var maxOffset = Math.max(round($.file.size/$.getOpt('chunkSize')),1);                                    // 328
        for (var offset=0; offset<maxOffset; offset++) {(function(offset){                                       // 329
            window.setTimeout(function(){                                                                        // 330
                $.chunks.push(new ResumableChunk($.resumableObj, $, offset, chunkEvent));                        // 331
                $.resumableObj.fire('chunkingProgress',$,offset/maxOffset);                                      // 332
            },0);                                                                                                // 333
        })(offset)}                                                                                              // 334
        window.setTimeout(function(){                                                                            // 335
            $.resumableObj.fire('chunkingComplete',$);                                                           // 336
        },0);                                                                                                    // 337
      };                                                                                                         // 338
      $.progress = function(){                                                                                   // 339
        if(_error) return(1);                                                                                    // 340
        // Sum up progress across everything                                                                     // 341
        var ret = 0;                                                                                             // 342
        var error = false;                                                                                       // 343
        $h.each($.chunks, function(c){                                                                           // 344
          if(c.status()=='error') error = true;                                                                  // 345
          ret += c.progress(true); // get chunk progress relative to entire file                                 // 346
        });                                                                                                      // 347
        ret = (error ? 1 : (ret>0.999 ? 1 : ret));                                                               // 348
        ret = Math.max($._prevProgress, ret); // We don't want to lose percentages when an upload is paused      // 349
        $._prevProgress = ret;                                                                                   // 350
        return(ret);                                                                                             // 351
      };                                                                                                         // 352
      $.isUploading = function(){                                                                                // 353
        var uploading = false;                                                                                   // 354
        $h.each($.chunks, function(chunk){                                                                       // 355
          if(chunk.status()=='uploading') {                                                                      // 356
            uploading = true;                                                                                    // 357
            return(false);                                                                                       // 358
          }                                                                                                      // 359
        });                                                                                                      // 360
        return(uploading);                                                                                       // 361
      };                                                                                                         // 362
      $.isComplete = function(){                                                                                 // 363
        var outstanding = false;                                                                                 // 364
        $h.each($.chunks, function(chunk){                                                                       // 365
          var status = chunk.status();                                                                           // 366
          if(status=='pending' || status=='uploading' || chunk.preprocessState === 1) {                          // 367
            outstanding = true;                                                                                  // 368
            return(false);                                                                                       // 369
          }                                                                                                      // 370
        });                                                                                                      // 371
        return(!outstanding);                                                                                    // 372
      };                                                                                                         // 373
      $.pause = function(pause){                                                                                 // 374
          if(typeof(pause)==='undefined'){                                                                       // 375
              $._pause = ($._pause ? false : true);                                                              // 376
          }else{                                                                                                 // 377
              $._pause = pause;                                                                                  // 378
          }                                                                                                      // 379
      };                                                                                                         // 380
      $.isPaused = function() {                                                                                  // 381
        return $._pause;                                                                                         // 382
      };                                                                                                         // 383
                                                                                                                 // 384
                                                                                                                 // 385
      // Bootstrap and return                                                                                    // 386
      $.resumableObj.fire('chunkingStart', $);                                                                   // 387
      $.bootstrap();                                                                                             // 388
      return(this);                                                                                              // 389
    }                                                                                                            // 390
                                                                                                                 // 391
    function ResumableChunk(resumableObj, fileObj, offset, callback){                                            // 392
      var $ = this;                                                                                              // 393
      $.opts = {};                                                                                               // 394
      $.getOpt = resumableObj.getOpt;                                                                            // 395
      $.resumableObj = resumableObj;                                                                             // 396
      $.fileObj = fileObj;                                                                                       // 397
      $.fileObjSize = fileObj.size;                                                                              // 398
      $.fileObjType = fileObj.file.type;                                                                         // 399
      $.offset = offset;                                                                                         // 400
      $.callback = callback;                                                                                     // 401
      $.lastProgressCallback = (new Date);                                                                       // 402
      $.tested = false;                                                                                          // 403
      $.retries = 0;                                                                                             // 404
      $.pendingRetry = false;                                                                                    // 405
      $.preprocessState = 0; // 0 = unprocessed, 1 = processing, 2 = finished                                    // 406
                                                                                                                 // 407
      // Computed properties                                                                                     // 408
      var chunkSize = $.getOpt('chunkSize');                                                                     // 409
      $.loaded = 0;                                                                                              // 410
      $.startByte = $.offset*chunkSize;                                                                          // 411
      $.endByte = Math.min($.fileObjSize, ($.offset+1)*chunkSize);                                               // 412
      if ($.fileObjSize-$.endByte < chunkSize && !$.getOpt('forceChunkSize')) {                                  // 413
        // The last chunk will be bigger than the chunk size, but less than 2*chunkSize                          // 414
        $.endByte = $.fileObjSize;                                                                               // 415
      }                                                                                                          // 416
      $.xhr = null;                                                                                              // 417
                                                                                                                 // 418
      // test() makes a GET request without any data to see if the chunk has already been uploaded in a previous session
      $.test = function(){                                                                                       // 420
        // Set up request and listen for event                                                                   // 421
        $.xhr = new XMLHttpRequest();                                                                            // 422
                                                                                                                 // 423
        var testHandler = function(e){                                                                           // 424
          $.tested = true;                                                                                       // 425
          var status = $.status();                                                                               // 426
          if(status=='success') {                                                                                // 427
            $.callback(status, $.message());                                                                     // 428
            $.resumableObj.uploadNextChunk();                                                                    // 429
          } else {                                                                                               // 430
            $.send();                                                                                            // 431
          }                                                                                                      // 432
        };                                                                                                       // 433
        $.xhr.addEventListener('load', testHandler, false);                                                      // 434
        $.xhr.addEventListener('error', testHandler, false);                                                     // 435
                                                                                                                 // 436
        // Add data from the query options                                                                       // 437
        var params = [];                                                                                         // 438
        var customQuery = $.getOpt('query');                                                                     // 439
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);                            // 440
        $h.each(customQuery, function(k,v){                                                                      // 441
          params.push([encodeURIComponent(k), encodeURIComponent(v)].join('='));                                 // 442
        });                                                                                                      // 443
        // Add extra data to identify chunk                                                                      // 444
        params.push(['resumableChunkNumber', encodeURIComponent($.offset+1)].join('='));                         // 445
        params.push(['resumableChunkSize', encodeURIComponent($.getOpt('chunkSize'))].join('='));                // 446
        params.push(['resumableCurrentChunkSize', encodeURIComponent($.endByte - $.startByte)].join('='));       // 447
        params.push(['resumableTotalSize', encodeURIComponent($.fileObjSize)].join('='));                        // 448
        params.push(['resumableType', encodeURIComponent($.fileObjType)].join('='));                             // 449
        params.push(['resumableIdentifier', encodeURIComponent($.fileObj.uniqueIdentifier)].join('='));          // 450
        params.push(['resumableFilename', encodeURIComponent($.fileObj.fileName)].join('='));                    // 451
        params.push(['resumableRelativePath', encodeURIComponent($.fileObj.relativePath)].join('='));            // 452
        params.push(['resumableTotalChunks', encodeURIComponent($.fileObj.chunks.length)].join('='));            // 453
        // Append the relevant chunk and send it                                                                 // 454
        $.xhr.open('GET', $h.getTarget(params));                                                                 // 455
        $.xhr.timeout = $.getOpt('xhrTimeout');                                                                  // 456
        $.xhr.withCredentials = $.getOpt('withCredentials');                                                     // 457
        // Add data from header options                                                                          // 458
        $h.each($.getOpt('headers'), function(k,v) {                                                             // 459
          $.xhr.setRequestHeader(k, v);                                                                          // 460
        });                                                                                                      // 461
        $.xhr.send(null);                                                                                        // 462
      };                                                                                                         // 463
                                                                                                                 // 464
      $.preprocessFinished = function(){                                                                         // 465
        $.preprocessState = 2;                                                                                   // 466
        $.send();                                                                                                // 467
      };                                                                                                         // 468
                                                                                                                 // 469
      // send() uploads the actual data in a POST call                                                           // 470
      $.send = function(){                                                                                       // 471
        var preprocess = $.getOpt('preprocess');                                                                 // 472
        if(typeof preprocess === 'function') {                                                                   // 473
          switch($.preprocessState) {                                                                            // 474
          case 0: preprocess($); $.preprocessState = 1; return;                                                  // 475
          case 1: return;                                                                                        // 476
          case 2: break;                                                                                         // 477
          }                                                                                                      // 478
        }                                                                                                        // 479
        if($.getOpt('testChunks') && !$.tested) {                                                                // 480
          $.test();                                                                                              // 481
          return;                                                                                                // 482
        }                                                                                                        // 483
                                                                                                                 // 484
        // Set up request and listen for event                                                                   // 485
        $.xhr = new XMLHttpRequest();                                                                            // 486
                                                                                                                 // 487
        // Progress                                                                                              // 488
        $.xhr.upload.addEventListener('progress', function(e){                                                   // 489
          if( (new Date) - $.lastProgressCallback > $.getOpt('throttleProgressCallbacks') * 1000 ) {             // 490
            $.callback('progress');                                                                              // 491
            $.lastProgressCallback = (new Date);                                                                 // 492
          }                                                                                                      // 493
          $.loaded=e.loaded||0;                                                                                  // 494
        }, false);                                                                                               // 495
        $.loaded = 0;                                                                                            // 496
        $.pendingRetry = false;                                                                                  // 497
        $.callback('progress');                                                                                  // 498
                                                                                                                 // 499
        // Done (either done, failed or retry)                                                                   // 500
        var doneHandler = function(e){                                                                           // 501
          var status = $.status();                                                                               // 502
          if(status=='success'||status=='error') {                                                               // 503
            $.callback(status, $.message());                                                                     // 504
            $.resumableObj.uploadNextChunk();                                                                    // 505
          } else {                                                                                               // 506
            $.callback('retry', $.message());                                                                    // 507
            $.abort();                                                                                           // 508
            $.retries++;                                                                                         // 509
            var retryInterval = $.getOpt('chunkRetryInterval');                                                  // 510
            if(retryInterval !== undefined) {                                                                    // 511
              $.pendingRetry = true;                                                                             // 512
              setTimeout($.send, retryInterval);                                                                 // 513
            } else {                                                                                             // 514
              $.send();                                                                                          // 515
            }                                                                                                    // 516
          }                                                                                                      // 517
        };                                                                                                       // 518
        $.xhr.addEventListener('load', doneHandler, false);                                                      // 519
        $.xhr.addEventListener('error', doneHandler, false);                                                     // 520
                                                                                                                 // 521
        // Set up the basic query data from Resumable                                                            // 522
        var query = {                                                                                            // 523
          resumableChunkNumber: $.offset+1,                                                                      // 524
          resumableChunkSize: $.getOpt('chunkSize'),                                                             // 525
          resumableCurrentChunkSize: $.endByte - $.startByte,                                                    // 526
          resumableTotalSize: $.fileObjSize,                                                                     // 527
          resumableType: $.fileObjType,                                                                          // 528
          resumableIdentifier: $.fileObj.uniqueIdentifier,                                                       // 529
          resumableFilename: $.fileObj.fileName,                                                                 // 530
          resumableRelativePath: $.fileObj.relativePath,                                                         // 531
          resumableTotalChunks: $.fileObj.chunks.length                                                          // 532
        };                                                                                                       // 533
        // Mix in custom data                                                                                    // 534
        var customQuery = $.getOpt('query');                                                                     // 535
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);                            // 536
        $h.each(customQuery, function(k,v){                                                                      // 537
          query[k] = v;                                                                                          // 538
        });                                                                                                      // 539
                                                                                                                 // 540
        var func   = ($.fileObj.file.slice ? 'slice' : ($.fileObj.file.mozSlice ? 'mozSlice' : ($.fileObj.file.webkitSlice ? 'webkitSlice' : 'slice'))),
        bytes  = $.fileObj.file[func]($.startByte,$.endByte),                                                    // 542
        data   = null,                                                                                           // 543
        target = $.getOpt('target');                                                                             // 544
                                                                                                                 // 545
        if ($.getOpt('method') === 'octet') {                                                                    // 546
          // Add data from the query options                                                                     // 547
          data = bytes;                                                                                          // 548
          var params = [];                                                                                       // 549
          $h.each(query, function(k,v){                                                                          // 550
            params.push([encodeURIComponent(k), encodeURIComponent(v)].join('='));                               // 551
          });                                                                                                    // 552
          target = $h.getTarget(params);                                                                         // 553
        } else {                                                                                                 // 554
          // Add data from the query options                                                                     // 555
          data = new FormData();                                                                                 // 556
          $h.each(query, function(k,v){                                                                          // 557
            data.append(k,v);                                                                                    // 558
          });                                                                                                    // 559
          data.append($.getOpt('fileParameterName'), bytes);                                                     // 560
        }                                                                                                        // 561
                                                                                                                 // 562
        $.xhr.open('POST', target);                                                                              // 563
        $.xhr.timeout = $.getOpt('xhrTimeout');                                                                  // 564
        $.xhr.withCredentials = $.getOpt('withCredentials');                                                     // 565
        // Add data from header options                                                                          // 566
        $h.each($.getOpt('headers'), function(k,v) {                                                             // 567
          $.xhr.setRequestHeader(k, v);                                                                          // 568
        });                                                                                                      // 569
        $.xhr.send(data);                                                                                        // 570
      };                                                                                                         // 571
      $.abort = function(){                                                                                      // 572
        // Abort and reset                                                                                       // 573
        if($.xhr) $.xhr.abort();                                                                                 // 574
        $.xhr = null;                                                                                            // 575
      };                                                                                                         // 576
      $.status = function(){                                                                                     // 577
        // Returns: 'pending', 'uploading', 'success', 'error'                                                   // 578
        if($.pendingRetry) {                                                                                     // 579
          // if pending retry then that's effectively the same as actively uploading,                            // 580
          // there might just be a slight delay before the retry starts                                          // 581
          return('uploading');                                                                                   // 582
        } else if(!$.xhr) {                                                                                      // 583
          return('pending');                                                                                     // 584
        } else if($.xhr.readyState<4) {                                                                          // 585
          // Status is really 'OPENED', 'HEADERS_RECEIVED' or 'LOADING' - meaning that stuff is happening        // 586
          return('uploading');                                                                                   // 587
        } else {                                                                                                 // 588
          if($.xhr.status==200) {                                                                                // 589
            // HTTP 200, perfect                                                                                 // 590
            return('success');                                                                                   // 591
          } else if($h.contains($.getOpt('permanentErrors'), $.xhr.status) || $.retries >= $.getOpt('maxChunkRetries')) {
            // HTTP 415/500/501, permanent error                                                                 // 593
            return('error');                                                                                     // 594
          } else {                                                                                               // 595
            // this should never happen, but we'll reset and queue a retry                                       // 596
            // a likely case for this would be 503 service unavailable                                           // 597
            $.abort();                                                                                           // 598
            return('pending');                                                                                   // 599
          }                                                                                                      // 600
        }                                                                                                        // 601
      };                                                                                                         // 602
      $.message = function(){                                                                                    // 603
        return($.xhr ? $.xhr.responseText : '');                                                                 // 604
      };                                                                                                         // 605
      $.progress = function(relative){                                                                           // 606
        if(typeof(relative)==='undefined') relative = false;                                                     // 607
        var factor = (relative ? ($.endByte-$.startByte)/$.fileObjSize : 1);                                     // 608
        if($.pendingRetry) return(0);                                                                            // 609
        var s = $.status();                                                                                      // 610
        switch(s){                                                                                               // 611
        case 'success':                                                                                          // 612
        case 'error':                                                                                            // 613
          return(1*factor);                                                                                      // 614
        case 'pending':                                                                                          // 615
          return(0*factor);                                                                                      // 616
        default:                                                                                                 // 617
          return($.loaded/($.endByte-$.startByte)*factor);                                                       // 618
        }                                                                                                        // 619
      };                                                                                                         // 620
      return(this);                                                                                              // 621
    }                                                                                                            // 622
                                                                                                                 // 623
    // QUEUE                                                                                                     // 624
    $.uploadNextChunk = function(){                                                                              // 625
      var found = false;                                                                                         // 626
                                                                                                                 // 627
      // In some cases (such as videos) it's really handy to upload the first                                    // 628
      // and last chunk of a file quickly; this let's the server check the file's                                // 629
      // metadata and determine if there's even a point in continuing.                                           // 630
      if ($.getOpt('prioritizeFirstAndLastChunk')) {                                                             // 631
        $h.each($.files, function(file){                                                                         // 632
          if(file.chunks.length && file.chunks[0].status()=='pending' && file.chunks[0].preprocessState === 0) { // 633
            file.chunks[0].send();                                                                               // 634
            found = true;                                                                                        // 635
            return(false);                                                                                       // 636
          }                                                                                                      // 637
          if(file.chunks.length>1 && file.chunks[file.chunks.length-1].status()=='pending' && file.chunks[file.chunks.length-1].preprocessState === 0) {
            file.chunks[file.chunks.length-1].send();                                                            // 639
            found = true;                                                                                        // 640
            return(false);                                                                                       // 641
          }                                                                                                      // 642
        });                                                                                                      // 643
        if(found) return(true);                                                                                  // 644
      }                                                                                                          // 645
                                                                                                                 // 646
      // Now, simply look for the next, best thing to upload                                                     // 647
      $h.each($.files, function(file){                                                                           // 648
        if(file.isPaused()===false){                                                                             // 649
         $h.each(file.chunks, function(chunk){                                                                   // 650
           if(chunk.status()=='pending' && chunk.preprocessState === 0) {                                        // 651
             chunk.send();                                                                                       // 652
             found = true;                                                                                       // 653
             return(false);                                                                                      // 654
           }                                                                                                     // 655
          });                                                                                                    // 656
        }                                                                                                        // 657
        if(found) return(false);                                                                                 // 658
      });                                                                                                        // 659
      if(found) return(true);                                                                                    // 660
                                                                                                                 // 661
      // The are no more outstanding chunks to upload, check is everything is done                               // 662
      var outstanding = false;                                                                                   // 663
      $h.each($.files, function(file){                                                                           // 664
        if(!file.isComplete()) {                                                                                 // 665
          outstanding = true;                                                                                    // 666
          return(false);                                                                                         // 667
        }                                                                                                        // 668
      });                                                                                                        // 669
      if(!outstanding) {                                                                                         // 670
        // All chunks have been uploaded, complete                                                               // 671
        $.fire('complete');                                                                                      // 672
      }                                                                                                          // 673
      return(false);                                                                                             // 674
    };                                                                                                           // 675
                                                                                                                 // 676
                                                                                                                 // 677
    // PUBLIC METHODS FOR RESUMABLE.JS                                                                           // 678
    $.assignBrowse = function(domNodes, isDirectory){                                                            // 679
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];                                            // 680
                                                                                                                 // 681
      $h.each(domNodes, function(domNode) {                                                                      // 682
        var input;                                                                                               // 683
        if(domNode.tagName==='INPUT' && domNode.type==='file'){                                                  // 684
          input = domNode;                                                                                       // 685
        } else {                                                                                                 // 686
          input = document.createElement('input');                                                               // 687
          input.setAttribute('type', 'file');                                                                    // 688
          input.style.display = 'none';                                                                          // 689
          domNode.addEventListener('click', function(){                                                          // 690
            input.style.opacity = 0;                                                                             // 691
            input.style.display='block';                                                                         // 692
            input.focus();                                                                                       // 693
            input.click();                                                                                       // 694
            input.style.display='none';                                                                          // 695
          }, false);                                                                                             // 696
          domNode.appendChild(input);                                                                            // 697
        }                                                                                                        // 698
        var maxFiles = $.getOpt('maxFiles');                                                                     // 699
        if (typeof(maxFiles)==='undefined'||maxFiles!=1){                                                        // 700
          input.setAttribute('multiple', 'multiple');                                                            // 701
        } else {                                                                                                 // 702
          input.removeAttribute('multiple');                                                                     // 703
        }                                                                                                        // 704
        if(isDirectory){                                                                                         // 705
          input.setAttribute('webkitdirectory', 'webkitdirectory');                                              // 706
        } else {                                                                                                 // 707
          input.removeAttribute('webkitdirectory');                                                              // 708
        }                                                                                                        // 709
        // When new files are added, simply append them to the overall list                                      // 710
        input.addEventListener('change', function(e){                                                            // 711
          appendFilesFromFileList(e.target.files,e);                                                             // 712
          e.target.value = '';                                                                                   // 713
        }, false);                                                                                               // 714
      });                                                                                                        // 715
    };                                                                                                           // 716
    $.assignDrop = function(domNodes){                                                                           // 717
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];                                            // 718
                                                                                                                 // 719
      $h.each(domNodes, function(domNode) {                                                                      // 720
        domNode.addEventListener('dragover', onDragOver, false);                                                 // 721
        domNode.addEventListener('drop', onDrop, false);                                                         // 722
      });                                                                                                        // 723
    };                                                                                                           // 724
    $.unAssignDrop = function(domNodes) {                                                                        // 725
      if (typeof(domNodes.length) == 'undefined') domNodes = [domNodes];                                         // 726
                                                                                                                 // 727
      $h.each(domNodes, function(domNode) {                                                                      // 728
        domNode.removeEventListener('dragover', onDragOver);                                                     // 729
        domNode.removeEventListener('drop', onDrop);                                                             // 730
      });                                                                                                        // 731
    };                                                                                                           // 732
    $.isUploading = function(){                                                                                  // 733
      var uploading = false;                                                                                     // 734
      $h.each($.files, function(file){                                                                           // 735
        if (file.isUploading()) {                                                                                // 736
          uploading = true;                                                                                      // 737
          return(false);                                                                                         // 738
        }                                                                                                        // 739
      });                                                                                                        // 740
      return(uploading);                                                                                         // 741
    };                                                                                                           // 742
    $.upload = function(){                                                                                       // 743
      // Make sure we don't start too many uploads at once                                                       // 744
      if($.isUploading()) return;                                                                                // 745
      // Kick off the queue                                                                                      // 746
      $.fire('uploadStart');                                                                                     // 747
      for (var num=1; num<=$.getOpt('simultaneousUploads'); num++) {                                             // 748
        $.uploadNextChunk();                                                                                     // 749
      }                                                                                                          // 750
    };                                                                                                           // 751
    $.pause = function(){                                                                                        // 752
      // Resume all chunks currently being uploaded                                                              // 753
      $h.each($.files, function(file){                                                                           // 754
        file.abort();                                                                                            // 755
      });                                                                                                        // 756
      $.fire('pause');                                                                                           // 757
    };                                                                                                           // 758
    $.cancel = function(){                                                                                       // 759
      for(var i = $.files.length - 1; i >= 0; i--) {                                                             // 760
        $.files[i].cancel();                                                                                     // 761
      }                                                                                                          // 762
      $.fire('cancel');                                                                                          // 763
    };                                                                                                           // 764
    $.progress = function(){                                                                                     // 765
      var totalDone = 0;                                                                                         // 766
      var totalSize = 0;                                                                                         // 767
      // Resume all chunks currently being uploaded                                                              // 768
      $h.each($.files, function(file){                                                                           // 769
        totalDone += file.progress()*file.size;                                                                  // 770
        totalSize += file.size;                                                                                  // 771
      });                                                                                                        // 772
      return(totalSize>0 ? totalDone/totalSize : 0);                                                             // 773
    };                                                                                                           // 774
    $.addFile = function(file, event){                                                                           // 775
      appendFilesFromFileList([file], event);                                                                    // 776
    };                                                                                                           // 777
    $.removeFile = function(file){                                                                               // 778
      for(var i = $.files.length - 1; i >= 0; i--) {                                                             // 779
        if($.files[i] === file) {                                                                                // 780
          $.files.splice(i, 1);                                                                                  // 781
        }                                                                                                        // 782
      }                                                                                                          // 783
    };                                                                                                           // 784
    $.getFromUniqueIdentifier = function(uniqueIdentifier){                                                      // 785
      var ret = false;                                                                                           // 786
      $h.each($.files, function(f){                                                                              // 787
        if(f.uniqueIdentifier==uniqueIdentifier) ret = f;                                                        // 788
      });                                                                                                        // 789
      return(ret);                                                                                               // 790
    };                                                                                                           // 791
    $.getSize = function(){                                                                                      // 792
      var totalSize = 0;                                                                                         // 793
      $h.each($.files, function(file){                                                                           // 794
        totalSize += file.size;                                                                                  // 795
      });                                                                                                        // 796
      return(totalSize);                                                                                         // 797
    };                                                                                                           // 798
                                                                                                                 // 799
    return(this);                                                                                                // 800
  };                                                                                                             // 801
                                                                                                                 // 802
                                                                                                                 // 803
  // Node.js-style export for Node and Component                                                                 // 804
  if (typeof module != 'undefined') {                                                                            // 805
    module.exports = Resumable;                                                                                  // 806
  } else if (typeof define === "function" && define.amd) {                                                       // 807
    // AMD/requirejs: Define the module                                                                          // 808
    define(function(){                                                                                           // 809
      return Resumable;                                                                                          // 810
    });                                                                                                          // 811
  } else {                                                                                                       // 812
    // Browser: Expose to window                                                                                 // 813
    window.Resumable = Resumable;                                                                                // 814
  }                                                                                                              // 815
                                                                                                                 // 816
})();                                                                                                            // 817
                                                                                                                 // 818
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/mrt:filecollection/resumable_client.coffee.js                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isClient) {
  share.setup_resumable = function() {
    var r;
    r = new Resumable({
      target: "" + this.baseURL + "/_resumable",
      generateUniqueIdentifier: function(file) {
        return "" + (new Meteor.Collection.ObjectID());
      },
      fileParameterName: 'file',
      chunkSize: this.chunkSize,
      testChunks: true,
      simultaneousUploads: 3,
      maxFiles: void 0,
      maxFilesErrorCallback: void 0,
      prioritizeFirstAndLastChunk: false,
      query: void 0,
      headers: {}
    });
    if (!r.support) {
      console.error("resumable.js not supported by this Browser, uploads will be disabled");
      return this.resumable = null;
    } else {
      return this.resumable = r;
    }
  };
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/mrt:filecollection/gridFS_client.coffee.js                                                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var                                
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (Meteor.isClient) {
  FileCollection = (function(_super) {
    __extends(FileCollection, _super);

    function FileCollection(root, options) {
      var _ref, _ref1;
      this.root = root != null ? root : share.defaultRoot;
      if (options == null) {
        options = {};
      }
      if (!(this instanceof FileCollection)) {
        return new FileCollection(root, options);
      }
      if (typeof this.root === 'object') {
        options = this.root;
        this.root = share.defaultRoot;
      }
      this.base = this.root;
      this.baseURL = (_ref = options.baseURL) != null ? _ref : "/gridfs/" + this.root;
      this.chunkSize = (_ref1 = options.chunkSize) != null ? _ref1 : share.defaultChunkSize;
      FileCollection.__super__.constructor.call(this, this.root + '.files', {
        idGeneration: 'MONGO'
      });
      if (options.resumable) {
        share.setup_resumable.bind(this)();
      }
    }

    FileCollection.prototype.upsert = function() {
      throw new Error("File Collections do not support 'upsert'");
    };

    FileCollection.prototype.update = function() {
      throw new Error("File Collections do not support 'update' on client, use method calls instead");
    };

    FileCollection.prototype.insert = function(file, callback) {
      if (callback == null) {
        callback = void 0;
      }
      file = share.insert_func(file, this.chunkSize);
      return FileCollection.__super__.insert.call(this, file, callback);
    };

    return FileCollection;

  })(Meteor.Collection);
  fileCollection = (function(_super) {
    __extends(fileCollection, _super);

    function fileCollection(r, o) {
      if (r == null) {
        r = share.defaultRoot;
      }
      if (o == null) {
        o = {};
      }
      if (!(this instanceof fileCollection)) {
        return new fileCollection(r, o);
      }
      console.warn('******************************************************');
      console.warn('** The "fileCollection" global object is deprecated');
      console.warn('** It will be removed in v0.2.0');
      console.warn('**');
      console.warn('** Use "FileCollection" instead (with capital "F")');
      console.warn('******************************************************');
      fileCollection.__super__.constructor.call(this, r, o);
    }

    return fileCollection;

  })(FileCollection);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:filecollection'] = {
  FileCollection: FileCollection,
  fileCollection: fileCollection
};

})();
