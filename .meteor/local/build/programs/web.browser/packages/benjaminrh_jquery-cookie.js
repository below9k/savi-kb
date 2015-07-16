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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/benjaminrh:jquery-cookie/lib/jquery-cookie/jquery.cookie //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
/*!                                                                  // 1
 * jQuery Cookie Plugin v1.3.1                                       // 2
 * https://github.com/carhartl/jquery-cookie                         // 3
 *                                                                   // 4
 * Copyright 2013 Klaus Hartl                                        // 5
 * Released under the MIT license                                    // 6
 */                                                                  // 7
(function (factory) {                                                // 8
	if (typeof define === 'function' && define.amd) {                   // 9
		// AMD. Register as anonymous module.                              // 10
		define(['jquery'], factory);                                       // 11
	} else {                                                            // 12
		// Browser globals.                                                // 13
		factory(jQuery);                                                   // 14
	}                                                                   // 15
}(function ($) {                                                     // 16
                                                                     // 17
	var pluses = /\+/g;                                                 // 18
                                                                     // 19
	function raw(s) {                                                   // 20
		return s;                                                          // 21
	}                                                                   // 22
                                                                     // 23
	function decoded(s) {                                               // 24
		return decodeURIComponent(s.replace(pluses, ' '));                 // 25
	}                                                                   // 26
                                                                     // 27
	function converted(s) {                                             // 28
		if (s.indexOf('"') === 0) {                                        // 29
			// This is a quoted cookie as according to RFC2068, unescape      // 30
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');   // 31
		}                                                                  // 32
		try {                                                              // 33
			return config.json ? JSON.parse(s) : s;                           // 34
		} catch(er) {}                                                     // 35
	}                                                                   // 36
                                                                     // 37
	var config = $.cookie = function (key, value, options) {            // 38
                                                                     // 39
		// write                                                           // 40
		if (value !== undefined) {                                         // 41
			options = $.extend({}, config.defaults, options);                 // 42
                                                                     // 43
			if (typeof options.expires === 'number') {                        // 44
				var days = options.expires, t = options.expires = new Date();    // 45
				t.setDate(t.getDate() + days);                                   // 46
			}                                                                 // 47
                                                                     // 48
			value = config.json ? JSON.stringify(value) : String(value);      // 49
                                                                     // 50
			return (document.cookie = [                                       // 51
				config.raw ? key : encodeURIComponent(key),                      // 52
				'=',                                                             // 53
				config.raw ? value : encodeURIComponent(value),                  // 54
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',                 // 56
				options.domain  ? '; domain=' + options.domain : '',             // 57
				options.secure  ? '; secure' : ''                                // 58
			].join(''));                                                      // 59
		}                                                                  // 60
                                                                     // 61
		// read                                                            // 62
		var decode = config.raw ? raw : decoded;                           // 63
		var cookies = document.cookie.split('; ');                         // 64
		var result = key ? undefined : {};                                 // 65
		for (var i = 0, l = cookies.length; i < l; i++) {                  // 66
			var parts = cookies[i].split('=');                                // 67
			var name = decode(parts.shift());                                 // 68
			var cookie = decode(parts.join('='));                             // 69
                                                                     // 70
			if (key && key === name) {                                        // 71
				result = converted(cookie);                                      // 72
				break;                                                           // 73
			}                                                                 // 74
                                                                     // 75
			if (!key) {                                                       // 76
				result[name] = converted(cookie);                                // 77
			}                                                                 // 78
		}                                                                  // 79
                                                                     // 80
		return result;                                                     // 81
	};                                                                  // 82
                                                                     // 83
	config.defaults = {};                                               // 84
                                                                     // 85
	$.removeCookie = function (key, options) {                          // 86
		if ($.cookie(key) !== undefined) {                                 // 87
			$.cookie(key, '', $.extend(options, { expires: -1 }));            // 88
			return true;                                                      // 89
		}                                                                  // 90
		return false;                                                      // 91
	};                                                                  // 92
                                                                     // 93
}));                                                                 // 94
                                                                     // 95
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['benjaminrh:jquery-cookie'] = {};

})();
