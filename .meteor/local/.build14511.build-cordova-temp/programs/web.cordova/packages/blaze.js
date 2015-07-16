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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var _ = Package.underscore._;
var HTML = Package.htmljs.HTML;
var ObserveSequence = Package['observe-sequence'].ObserveSequence;
var ReactiveVar = Package['reactive-var'].ReactiveVar;

/* Package-scope variables */
var Blaze, UI, Handlebars, AttributeHandler, makeAttributeHandler, ElementAttributesUpdater;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/preamble.js                                                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Blaze = {};                                                                                                     // 1
                                                                                                                // 2
// Utility to HTML-escape a string.  Included for legacy reasons.                                               // 3
Blaze._escape = (function() {                                                                                   // 4
  var escape_map = {                                                                                            // 5
    "<": "&lt;",                                                                                                // 6
    ">": "&gt;",                                                                                                // 7
    '"': "&quot;",                                                                                              // 8
    "'": "&#x27;",                                                                                              // 9
    "`": "&#x60;", /* IE allows backtick-delimited attributes?? */                                              // 10
    "&": "&amp;"                                                                                                // 11
  };                                                                                                            // 12
  var escape_one = function(c) {                                                                                // 13
    return escape_map[c];                                                                                       // 14
  };                                                                                                            // 15
                                                                                                                // 16
  return function (x) {                                                                                         // 17
    return x.replace(/[&<>"'`]/g, escape_one);                                                                  // 18
  };                                                                                                            // 19
})();                                                                                                           // 20
                                                                                                                // 21
Blaze._warn = function (msg) {                                                                                  // 22
  msg = 'Warning: ' + msg;                                                                                      // 23
                                                                                                                // 24
  if ((typeof 'Log' !== 'undefined') && Log && Log.warn)                                                        // 25
    Log.warn(msg); // use Meteor's "logging" package                                                            // 26
  else if ((typeof 'console' !== 'undefined') && console.log)                                                   // 27
    console.log(msg);                                                                                           // 28
};                                                                                                              // 29
                                                                                                                // 30
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/dombackend.js                                                                                 //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var DOMBackend = {};                                                                                            // 1
Blaze._DOMBackend = DOMBackend;                                                                                 // 2
                                                                                                                // 3
var $jq = (typeof jQuery !== 'undefined' ? jQuery :                                                             // 4
           (typeof Package !== 'undefined' ?                                                                    // 5
            Package.jquery && Package.jquery.jQuery : null));                                                   // 6
if (! $jq)                                                                                                      // 7
  throw new Error("jQuery not found");                                                                          // 8
                                                                                                                // 9
DOMBackend._$jq = $jq;                                                                                          // 10
                                                                                                                // 11
DOMBackend.parseHTML = function (html) {                                                                        // 12
  // Return an array of nodes.                                                                                  // 13
  //                                                                                                            // 14
  // jQuery does fancy stuff like creating an appropriate                                                       // 15
  // container element and setting innerHTML on it, as well                                                     // 16
  // as working around various IE quirks.                                                                       // 17
  return $jq.parseHTML(html) || [];                                                                             // 18
};                                                                                                              // 19
                                                                                                                // 20
DOMBackend.Events = {                                                                                           // 21
  // `selector` is non-null.  `type` is one type (but                                                           // 22
  // may be in backend-specific form, e.g. have namespaces).                                                    // 23
  // Order fired must be order bound.                                                                           // 24
  delegateEvents: function (elem, type, selector, handler) {                                                    // 25
    $jq(elem).on(type, selector, handler);                                                                      // 26
  },                                                                                                            // 27
                                                                                                                // 28
  undelegateEvents: function (elem, type, handler) {                                                            // 29
    $jq(elem).off(type, '**', handler);                                                                         // 30
  },                                                                                                            // 31
                                                                                                                // 32
  bindEventCapturer: function (elem, type, selector, handler) {                                                 // 33
    var $elem = $jq(elem);                                                                                      // 34
                                                                                                                // 35
    var wrapper = function (event) {                                                                            // 36
      event = $jq.event.fix(event);                                                                             // 37
      event.currentTarget = event.target;                                                                       // 38
                                                                                                                // 39
      // Note: It might improve jQuery interop if we called into jQuery                                         // 40
      // here somehow.  Since we don't use jQuery to dispatch the event,                                        // 41
      // we don't fire any of jQuery's event hooks or anything.  However,                                       // 42
      // since jQuery can't bind capturing handlers, it's not clear                                             // 43
      // where we would hook in.  Internal jQuery functions like `dispatch`                                     // 44
      // are too high-level.                                                                                    // 45
      var $target = $jq(event.currentTarget);                                                                   // 46
      if ($target.is($elem.find(selector)))                                                                     // 47
        handler.call(elem, event);                                                                              // 48
    };                                                                                                          // 49
                                                                                                                // 50
    handler._meteorui_wrapper = wrapper;                                                                        // 51
                                                                                                                // 52
    type = DOMBackend.Events.parseEventType(type);                                                              // 53
    // add *capturing* event listener                                                                           // 54
    elem.addEventListener(type, wrapper, true);                                                                 // 55
  },                                                                                                            // 56
                                                                                                                // 57
  unbindEventCapturer: function (elem, type, handler) {                                                         // 58
    type = DOMBackend.Events.parseEventType(type);                                                              // 59
    elem.removeEventListener(type, handler._meteorui_wrapper, true);                                            // 60
  },                                                                                                            // 61
                                                                                                                // 62
  parseEventType: function (type) {                                                                             // 63
    // strip off namespaces                                                                                     // 64
    var dotLoc = type.indexOf('.');                                                                             // 65
    if (dotLoc >= 0)                                                                                            // 66
      return type.slice(0, dotLoc);                                                                             // 67
    return type;                                                                                                // 68
  }                                                                                                             // 69
};                                                                                                              // 70
                                                                                                                // 71
                                                                                                                // 72
///// Removal detection and interoperability.                                                                   // 73
                                                                                                                // 74
// For an explanation of this technique, see:                                                                   // 75
// http://bugs.jquery.com/ticket/12213#comment:23 .                                                             // 76
//                                                                                                              // 77
// In short, an element is considered "removed" when jQuery                                                     // 78
// cleans up its *private* userdata on the element,                                                             // 79
// which we can detect using a custom event with a teardown                                                     // 80
// hook.                                                                                                        // 81
                                                                                                                // 82
var NOOP = function () {};                                                                                      // 83
                                                                                                                // 84
// Circular doubly-linked list                                                                                  // 85
var TeardownCallback = function (func) {                                                                        // 86
  this.next = this;                                                                                             // 87
  this.prev = this;                                                                                             // 88
  this.func = func;                                                                                             // 89
};                                                                                                              // 90
                                                                                                                // 91
// Insert newElt before oldElt in the circular list                                                             // 92
TeardownCallback.prototype.linkBefore = function(oldElt) {                                                      // 93
  this.prev = oldElt.prev;                                                                                      // 94
  this.next = oldElt;                                                                                           // 95
  oldElt.prev.next = this;                                                                                      // 96
  oldElt.prev = this;                                                                                           // 97
};                                                                                                              // 98
                                                                                                                // 99
TeardownCallback.prototype.unlink = function () {                                                               // 100
  this.prev.next = this.next;                                                                                   // 101
  this.next.prev = this.prev;                                                                                   // 102
};                                                                                                              // 103
                                                                                                                // 104
TeardownCallback.prototype.go = function () {                                                                   // 105
  var func = this.func;                                                                                         // 106
  func && func();                                                                                               // 107
};                                                                                                              // 108
                                                                                                                // 109
TeardownCallback.prototype.stop = TeardownCallback.prototype.unlink;                                            // 110
                                                                                                                // 111
DOMBackend.Teardown = {                                                                                         // 112
  _JQUERY_EVENT_NAME: 'blaze_teardown_watcher',                                                                 // 113
  _CB_PROP: '$blaze_teardown_callbacks',                                                                        // 114
  // Registers a callback function to be called when the given element or                                       // 115
  // one of its ancestors is removed from the DOM via the backend library.                                      // 116
  // The callback function is called at most once, and it receives the element                                  // 117
  // in question as an argument.                                                                                // 118
  onElementTeardown: function (elem, func) {                                                                    // 119
    var elt = new TeardownCallback(func);                                                                       // 120
                                                                                                                // 121
    var propName = DOMBackend.Teardown._CB_PROP;                                                                // 122
    if (! elem[propName]) {                                                                                     // 123
      // create an empty node that is never unlinked                                                            // 124
      elem[propName] = new TeardownCallback;                                                                    // 125
                                                                                                                // 126
      // Set up the event, only the first time.                                                                 // 127
      $jq(elem).on(DOMBackend.Teardown._JQUERY_EVENT_NAME, NOOP);                                               // 128
    }                                                                                                           // 129
                                                                                                                // 130
    elt.linkBefore(elem[propName]);                                                                             // 131
                                                                                                                // 132
    return elt; // so caller can call stop()                                                                    // 133
  },                                                                                                            // 134
  // Recursively call all teardown hooks, in the backend and registered                                         // 135
  // through DOMBackend.onElementTeardown.                                                                      // 136
  tearDownElement: function (elem) {                                                                            // 137
    var elems = [];                                                                                             // 138
    // Array.prototype.slice.call doesn't work when given a NodeList in                                         // 139
    // IE8 ("JScript object expected").                                                                         // 140
    var nodeList = elem.getElementsByTagName('*');                                                              // 141
    for (var i = 0; i < nodeList.length; i++) {                                                                 // 142
      elems.push(nodeList[i]);                                                                                  // 143
    }                                                                                                           // 144
    elems.push(elem);                                                                                           // 145
    $jq.cleanData(elems);                                                                                       // 146
  }                                                                                                             // 147
};                                                                                                              // 148
                                                                                                                // 149
$jq.event.special[DOMBackend.Teardown._JQUERY_EVENT_NAME] = {                                                   // 150
  setup: function () {                                                                                          // 151
    // This "setup" callback is important even though it is empty!                                              // 152
    // Without it, jQuery will call addEventListener, which is a                                                // 153
    // performance hit, especially with Chrome's async stack trace                                              // 154
    // feature enabled.                                                                                         // 155
  },                                                                                                            // 156
  teardown: function() {                                                                                        // 157
    var elem = this;                                                                                            // 158
    var callbacks = elem[DOMBackend.Teardown._CB_PROP];                                                         // 159
    if (callbacks) {                                                                                            // 160
      var elt = callbacks.next;                                                                                 // 161
      while (elt !== callbacks) {                                                                               // 162
        elt.go();                                                                                               // 163
        elt = elt.next;                                                                                         // 164
      }                                                                                                         // 165
      callbacks.go();                                                                                           // 166
                                                                                                                // 167
      elem[DOMBackend.Teardown._CB_PROP] = null;                                                                // 168
    }                                                                                                           // 169
  }                                                                                                             // 170
};                                                                                                              // 171
                                                                                                                // 172
                                                                                                                // 173
// Must use jQuery semantics for `context`, not                                                                 // 174
// querySelectorAll's.  In other words, all the parts                                                           // 175
// of `selector` must be found under `context`.                                                                 // 176
DOMBackend.findBySelector = function (selector, context) {                                                      // 177
  return $jq(selector, context);                                                                                // 178
};                                                                                                              // 179
                                                                                                                // 180
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/domrange.js                                                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
                                                                                                                // 1
// A constant empty array (frozen if the JS engine supports it).                                                // 2
var _emptyArray = Object.freeze ? Object.freeze([]) : [];                                                       // 3
                                                                                                                // 4
// `[new] Blaze._DOMRange([nodeAndRangeArray])`                                                                 // 5
//                                                                                                              // 6
// A DOMRange consists of an array of consecutive nodes and DOMRanges,                                          // 7
// which may be replaced at any time with a new array.  If the DOMRange                                         // 8
// has been attached to the DOM at some location, then updating                                                 // 9
// the array will cause the DOM to be updated at that location.                                                 // 10
Blaze._DOMRange = function (nodeAndRangeArray) {                                                                // 11
  if (! (this instanceof DOMRange))                                                                             // 12
    // called without `new`                                                                                     // 13
    return new DOMRange(nodeAndRangeArray);                                                                     // 14
                                                                                                                // 15
  var members = (nodeAndRangeArray || _emptyArray);                                                             // 16
  if (! (members && (typeof members.length) === 'number'))                                                      // 17
    throw new Error("Expected array");                                                                          // 18
                                                                                                                // 19
  for (var i = 0; i < members.length; i++)                                                                      // 20
    this._memberIn(members[i]);                                                                                 // 21
                                                                                                                // 22
  this.members = members;                                                                                       // 23
  this.emptyRangePlaceholder = null;                                                                            // 24
  this.attached = false;                                                                                        // 25
  this.parentElement = null;                                                                                    // 26
  this.parentRange = null;                                                                                      // 27
  this.attachedCallbacks = _emptyArray;                                                                         // 28
};                                                                                                              // 29
var DOMRange = Blaze._DOMRange;                                                                                 // 30
                                                                                                                // 31
// In IE 8, don't use empty text nodes as placeholders                                                          // 32
// in empty DOMRanges, use comment nodes instead.  Using                                                        // 33
// empty text nodes in modern browsers is great because                                                         // 34
// it doesn't clutter the web inspector.  In IE 8, however,                                                     // 35
// it seems to lead in some roundabout way to the OAuth                                                         // 36
// pop-up crashing the browser completely.  In the past,                                                        // 37
// we didn't use empty text nodes on IE 8 because they                                                          // 38
// don't accept JS properties, so just use the same logic                                                       // 39
// even though we don't need to set properties on the                                                           // 40
// placeholder anymore.                                                                                         // 41
DOMRange._USE_COMMENT_PLACEHOLDERS = (function () {                                                             // 42
  var result = false;                                                                                           // 43
  var textNode = document.createTextNode("");                                                                   // 44
  try {                                                                                                         // 45
    textNode.someProp = true;                                                                                   // 46
  } catch (e) {                                                                                                 // 47
    // IE 8                                                                                                     // 48
    result = true;                                                                                              // 49
  }                                                                                                             // 50
  return result;                                                                                                // 51
})();                                                                                                           // 52
                                                                                                                // 53
// static methods                                                                                               // 54
DOMRange._insert = function (rangeOrNode, parentElement, nextNode, _isMove) {                                   // 55
  var m = rangeOrNode;                                                                                          // 56
  if (m instanceof DOMRange) {                                                                                  // 57
    m.attach(parentElement, nextNode, _isMove);                                                                 // 58
  } else {                                                                                                      // 59
    if (_isMove)                                                                                                // 60
      DOMRange._moveNodeWithHooks(m, parentElement, nextNode);                                                  // 61
    else                                                                                                        // 62
      DOMRange._insertNodeWithHooks(m, parentElement, nextNode);                                                // 63
  }                                                                                                             // 64
};                                                                                                              // 65
                                                                                                                // 66
DOMRange._remove = function (rangeOrNode) {                                                                     // 67
  var m = rangeOrNode;                                                                                          // 68
  if (m instanceof DOMRange) {                                                                                  // 69
    m.detach();                                                                                                 // 70
  } else {                                                                                                      // 71
    DOMRange._removeNodeWithHooks(m);                                                                           // 72
  }                                                                                                             // 73
};                                                                                                              // 74
                                                                                                                // 75
DOMRange._removeNodeWithHooks = function (n) {                                                                  // 76
  if (! n.parentNode)                                                                                           // 77
    return;                                                                                                     // 78
  if (n.nodeType === 1 &&                                                                                       // 79
      n.parentNode._uihooks && n.parentNode._uihooks.removeElement) {                                           // 80
    n.parentNode._uihooks.removeElement(n);                                                                     // 81
  } else {                                                                                                      // 82
    n.parentNode.removeChild(n);                                                                                // 83
  }                                                                                                             // 84
};                                                                                                              // 85
                                                                                                                // 86
DOMRange._insertNodeWithHooks = function (n, parent, next) {                                                    // 87
  // `|| null` because IE throws an error if 'next' is undefined                                                // 88
  next = next || null;                                                                                          // 89
  if (n.nodeType === 1 &&                                                                                       // 90
      parent._uihooks && parent._uihooks.insertElement) {                                                       // 91
    parent._uihooks.insertElement(n, next);                                                                     // 92
  } else {                                                                                                      // 93
    parent.insertBefore(n, next);                                                                               // 94
  }                                                                                                             // 95
};                                                                                                              // 96
                                                                                                                // 97
DOMRange._moveNodeWithHooks = function (n, parent, next) {                                                      // 98
  if (n.parentNode !== parent)                                                                                  // 99
    return;                                                                                                     // 100
  // `|| null` because IE throws an error if 'next' is undefined                                                // 101
  next = next || null;                                                                                          // 102
  if (n.nodeType === 1 &&                                                                                       // 103
      parent._uihooks && parent._uihooks.moveElement) {                                                         // 104
    parent._uihooks.moveElement(n, next);                                                                       // 105
  } else {                                                                                                      // 106
    parent.insertBefore(n, next);                                                                               // 107
  }                                                                                                             // 108
};                                                                                                              // 109
                                                                                                                // 110
DOMRange.forElement = function (elem) {                                                                         // 111
  if (elem.nodeType !== 1)                                                                                      // 112
    throw new Error("Expected element, found: " + elem);                                                        // 113
  var range = null;                                                                                             // 114
  while (elem && ! range) {                                                                                     // 115
    range = (elem.$blaze_range || null);                                                                        // 116
    if (! range)                                                                                                // 117
      elem = elem.parentNode;                                                                                   // 118
  }                                                                                                             // 119
  return range;                                                                                                 // 120
};                                                                                                              // 121
                                                                                                                // 122
DOMRange.prototype.attach = function (parentElement, nextNode, _isMove, _isReplace) {                           // 123
  // This method is called to insert the DOMRange into the DOM for                                              // 124
  // the first time, but it's also used internally when                                                         // 125
  // updating the DOM.                                                                                          // 126
  //                                                                                                            // 127
  // If _isMove is true, move this attached range to a different                                                // 128
  // location under the same parentElement.                                                                     // 129
  if (_isMove || _isReplace) {                                                                                  // 130
    if (! (this.parentElement === parentElement &&                                                              // 131
           this.attached))                                                                                      // 132
      throw new Error("Can only move or replace an attached DOMRange, and only under the same parent element"); // 133
  }                                                                                                             // 134
                                                                                                                // 135
  var members = this.members;                                                                                   // 136
  if (members.length) {                                                                                         // 137
    this.emptyRangePlaceholder = null;                                                                          // 138
    for (var i = 0; i < members.length; i++) {                                                                  // 139
      DOMRange._insert(members[i], parentElement, nextNode, _isMove);                                           // 140
    }                                                                                                           // 141
  } else {                                                                                                      // 142
    var placeholder = (                                                                                         // 143
      DOMRange._USE_COMMENT_PLACEHOLDERS ?                                                                      // 144
        document.createComment("") :                                                                            // 145
        document.createTextNode(""));                                                                           // 146
    this.emptyRangePlaceholder = placeholder;                                                                   // 147
    parentElement.insertBefore(placeholder, nextNode || null);                                                  // 148
  }                                                                                                             // 149
  this.attached = true;                                                                                         // 150
  this.parentElement = parentElement;                                                                           // 151
                                                                                                                // 152
  if (! (_isMove || _isReplace)) {                                                                              // 153
    for(var i = 0; i < this.attachedCallbacks.length; i++) {                                                    // 154
      var obj = this.attachedCallbacks[i];                                                                      // 155
      obj.attached && obj.attached(this, parentElement);                                                        // 156
    }                                                                                                           // 157
  }                                                                                                             // 158
};                                                                                                              // 159
                                                                                                                // 160
DOMRange.prototype.setMembers = function (newNodeAndRangeArray) {                                               // 161
  var newMembers = newNodeAndRangeArray;                                                                        // 162
  if (! (newMembers && (typeof newMembers.length) === 'number'))                                                // 163
    throw new Error("Expected array");                                                                          // 164
                                                                                                                // 165
  var oldMembers = this.members;                                                                                // 166
                                                                                                                // 167
  for (var i = 0; i < oldMembers.length; i++)                                                                   // 168
    this._memberOut(oldMembers[i]);                                                                             // 169
  for (var i = 0; i < newMembers.length; i++)                                                                   // 170
    this._memberIn(newMembers[i]);                                                                              // 171
                                                                                                                // 172
  if (! this.attached) {                                                                                        // 173
    this.members = newMembers;                                                                                  // 174
  } else {                                                                                                      // 175
    // don't do anything if we're going from empty to empty                                                     // 176
    if (newMembers.length || oldMembers.length) {                                                               // 177
      // detach the old members and insert the new members                                                      // 178
      var nextNode = this.lastNode().nextSibling;                                                               // 179
      var parentElement = this.parentElement;                                                                   // 180
      // Use detach/attach, but don't fire attached/detached hooks                                              // 181
      this.detach(true /*_isReplace*/);                                                                         // 182
      this.members = newMembers;                                                                                // 183
      this.attach(parentElement, nextNode, false, true /*_isReplace*/);                                         // 184
    }                                                                                                           // 185
  }                                                                                                             // 186
};                                                                                                              // 187
                                                                                                                // 188
DOMRange.prototype.firstNode = function () {                                                                    // 189
  if (! this.attached)                                                                                          // 190
    throw new Error("Must be attached");                                                                        // 191
                                                                                                                // 192
  if (! this.members.length)                                                                                    // 193
    return this.emptyRangePlaceholder;                                                                          // 194
                                                                                                                // 195
  var m = this.members[0];                                                                                      // 196
  return (m instanceof DOMRange) ? m.firstNode() : m;                                                           // 197
};                                                                                                              // 198
                                                                                                                // 199
DOMRange.prototype.lastNode = function () {                                                                     // 200
  if (! this.attached)                                                                                          // 201
    throw new Error("Must be attached");                                                                        // 202
                                                                                                                // 203
  if (! this.members.length)                                                                                    // 204
    return this.emptyRangePlaceholder;                                                                          // 205
                                                                                                                // 206
  var m = this.members[this.members.length - 1];                                                                // 207
  return (m instanceof DOMRange) ? m.lastNode() : m;                                                            // 208
};                                                                                                              // 209
                                                                                                                // 210
DOMRange.prototype.detach = function (_isReplace) {                                                             // 211
  if (! this.attached)                                                                                          // 212
    throw new Error("Must be attached");                                                                        // 213
                                                                                                                // 214
  var oldParentElement = this.parentElement;                                                                    // 215
  var members = this.members;                                                                                   // 216
  if (members.length) {                                                                                         // 217
    for (var i = 0; i < members.length; i++) {                                                                  // 218
      DOMRange._remove(members[i]);                                                                             // 219
    }                                                                                                           // 220
  } else {                                                                                                      // 221
    var placeholder = this.emptyRangePlaceholder;                                                               // 222
    this.parentElement.removeChild(placeholder);                                                                // 223
    this.emptyRangePlaceholder = null;                                                                          // 224
  }                                                                                                             // 225
                                                                                                                // 226
  if (! _isReplace) {                                                                                           // 227
    this.attached = false;                                                                                      // 228
    this.parentElement = null;                                                                                  // 229
                                                                                                                // 230
    for(var i = 0; i < this.attachedCallbacks.length; i++) {                                                    // 231
      var obj = this.attachedCallbacks[i];                                                                      // 232
      obj.detached && obj.detached(this, oldParentElement);                                                     // 233
    }                                                                                                           // 234
  }                                                                                                             // 235
};                                                                                                              // 236
                                                                                                                // 237
DOMRange.prototype.addMember = function (newMember, atIndex, _isMove) {                                         // 238
  var members = this.members;                                                                                   // 239
  if (! (atIndex >= 0 && atIndex <= members.length))                                                            // 240
    throw new Error("Bad index in range.addMember: " + atIndex);                                                // 241
                                                                                                                // 242
  if (! _isMove)                                                                                                // 243
    this._memberIn(newMember);                                                                                  // 244
                                                                                                                // 245
  if (! this.attached) {                                                                                        // 246
    // currently detached; just updated members                                                                 // 247
    members.splice(atIndex, 0, newMember);                                                                      // 248
  } else if (members.length === 0) {                                                                            // 249
    // empty; use the empty-to-nonempty handling of setMembers                                                  // 250
    this.setMembers([newMember]);                                                                               // 251
  } else {                                                                                                      // 252
    var nextNode;                                                                                               // 253
    if (atIndex === members.length) {                                                                           // 254
      // insert at end                                                                                          // 255
      nextNode = this.lastNode().nextSibling;                                                                   // 256
    } else {                                                                                                    // 257
      var m = members[atIndex];                                                                                 // 258
      nextNode = (m instanceof DOMRange) ? m.firstNode() : m;                                                   // 259
    }                                                                                                           // 260
    members.splice(atIndex, 0, newMember);                                                                      // 261
    DOMRange._insert(newMember, this.parentElement, nextNode, _isMove);                                         // 262
  }                                                                                                             // 263
};                                                                                                              // 264
                                                                                                                // 265
DOMRange.prototype.removeMember = function (atIndex, _isMove) {                                                 // 266
  var members = this.members;                                                                                   // 267
  if (! (atIndex >= 0 && atIndex < members.length))                                                             // 268
    throw new Error("Bad index in range.removeMember: " + atIndex);                                             // 269
                                                                                                                // 270
  if (_isMove) {                                                                                                // 271
    members.splice(atIndex, 1);                                                                                 // 272
  } else {                                                                                                      // 273
    var oldMember = members[atIndex];                                                                           // 274
    this._memberOut(oldMember);                                                                                 // 275
                                                                                                                // 276
    if (members.length === 1) {                                                                                 // 277
      // becoming empty; use the logic in setMembers                                                            // 278
      this.setMembers(_emptyArray);                                                                             // 279
    } else {                                                                                                    // 280
      members.splice(atIndex, 1);                                                                               // 281
      if (this.attached)                                                                                        // 282
        DOMRange._remove(oldMember);                                                                            // 283
    }                                                                                                           // 284
  }                                                                                                             // 285
};                                                                                                              // 286
                                                                                                                // 287
DOMRange.prototype.moveMember = function (oldIndex, newIndex) {                                                 // 288
  var member = this.members[oldIndex];                                                                          // 289
  this.removeMember(oldIndex, true /*_isMove*/);                                                                // 290
  this.addMember(member, newIndex, true /*_isMove*/);                                                           // 291
};                                                                                                              // 292
                                                                                                                // 293
DOMRange.prototype.getMember = function (atIndex) {                                                             // 294
  var members = this.members;                                                                                   // 295
  if (! (atIndex >= 0 && atIndex < members.length))                                                             // 296
    throw new Error("Bad index in range.getMember: " + atIndex);                                                // 297
  return this.members[atIndex];                                                                                 // 298
};                                                                                                              // 299
                                                                                                                // 300
DOMRange.prototype._memberIn = function (m) {                                                                   // 301
  if (m instanceof DOMRange)                                                                                    // 302
    m.parentRange = this;                                                                                       // 303
  else if (m.nodeType === 1) // DOM Element                                                                     // 304
    m.$blaze_range = this;                                                                                      // 305
};                                                                                                              // 306
                                                                                                                // 307
DOMRange._destroy = function (m, _skipNodes) {                                                                  // 308
  if (m instanceof DOMRange) {                                                                                  // 309
    if (m.view)                                                                                                 // 310
      Blaze._destroyView(m.view, _skipNodes);                                                                   // 311
  } else if ((! _skipNodes) && m.nodeType === 1) {                                                              // 312
    // DOM Element                                                                                              // 313
    if (m.$blaze_range) {                                                                                       // 314
      Blaze._destroyNode(m);                                                                                    // 315
      m.$blaze_range = null;                                                                                    // 316
    }                                                                                                           // 317
  }                                                                                                             // 318
};                                                                                                              // 319
                                                                                                                // 320
DOMRange.prototype._memberOut = DOMRange._destroy;                                                              // 321
                                                                                                                // 322
// Tear down, but don't remove, the members.  Used when chunks                                                  // 323
// of DOM are being torn down or replaced.                                                                      // 324
DOMRange.prototype.destroyMembers = function (_skipNodes) {                                                     // 325
  var members = this.members;                                                                                   // 326
  for (var i = 0; i < members.length; i++)                                                                      // 327
    this._memberOut(members[i], _skipNodes);                                                                    // 328
};                                                                                                              // 329
                                                                                                                // 330
DOMRange.prototype.destroy = function (_skipNodes) {                                                            // 331
  DOMRange._destroy(this, _skipNodes);                                                                          // 332
};                                                                                                              // 333
                                                                                                                // 334
DOMRange.prototype.containsElement = function (elem) {                                                          // 335
  if (! this.attached)                                                                                          // 336
    throw new Error("Must be attached");                                                                        // 337
                                                                                                                // 338
  // An element is contained in this DOMRange if it's possible to                                               // 339
  // reach it by walking parent pointers, first through the DOM and                                             // 340
  // then parentRange pointers.  In other words, the element or some                                            // 341
  // ancestor of it is at our level of the DOM (a child of our                                                  // 342
  // parentElement), and this element is one of our members or                                                  // 343
  // is a member of a descendant Range.                                                                         // 344
                                                                                                                // 345
  // First check that elem is a descendant of this.parentElement,                                               // 346
  // according to the DOM.                                                                                      // 347
  if (! Blaze._elementContains(this.parentElement, elem))                                                       // 348
    return false;                                                                                               // 349
                                                                                                                // 350
  // If elem is not an immediate child of this.parentElement,                                                   // 351
  // walk up to its ancestor that is.                                                                           // 352
  while (elem.parentNode !== this.parentElement)                                                                // 353
    elem = elem.parentNode;                                                                                     // 354
                                                                                                                // 355
  var range = elem.$blaze_range;                                                                                // 356
  while (range && range !== this)                                                                               // 357
    range = range.parentRange;                                                                                  // 358
                                                                                                                // 359
  return range === this;                                                                                        // 360
};                                                                                                              // 361
                                                                                                                // 362
DOMRange.prototype.containsRange = function (range) {                                                           // 363
  if (! this.attached)                                                                                          // 364
    throw new Error("Must be attached");                                                                        // 365
                                                                                                                // 366
  if (! range.attached)                                                                                         // 367
    return false;                                                                                               // 368
                                                                                                                // 369
  // A DOMRange is contained in this DOMRange if it's possible                                                  // 370
  // to reach this range by following parent pointers.  If the                                                  // 371
  // DOMRange has the same parentElement, then it should be                                                     // 372
  // a member, or a member of a member etc.  Otherwise, we must                                                 // 373
  // contain its parentElement.                                                                                 // 374
                                                                                                                // 375
  if (range.parentElement !== this.parentElement)                                                               // 376
    return this.containsElement(range.parentElement);                                                           // 377
                                                                                                                // 378
  if (range === this)                                                                                           // 379
    return false; // don't contain self                                                                         // 380
                                                                                                                // 381
  while (range && range !== this)                                                                               // 382
    range = range.parentRange;                                                                                  // 383
                                                                                                                // 384
  return range === this;                                                                                        // 385
};                                                                                                              // 386
                                                                                                                // 387
DOMRange.prototype.onAttached = function (attached) {                                                           // 388
  this.onAttachedDetached({ attached: attached });                                                              // 389
};                                                                                                              // 390
                                                                                                                // 391
// callbacks are `attached(range, element)` and                                                                 // 392
// `detached(range, element)`, and they may                                                                     // 393
// access the `callbacks` object in `this`.                                                                     // 394
// The arguments to `detached` are the same                                                                     // 395
// range and element that were passed to `attached`.                                                            // 396
DOMRange.prototype.onAttachedDetached = function (callbacks) {                                                  // 397
  if (this.attachedCallbacks === _emptyArray)                                                                   // 398
    this.attachedCallbacks = [];                                                                                // 399
  this.attachedCallbacks.push(callbacks);                                                                       // 400
};                                                                                                              // 401
                                                                                                                // 402
DOMRange.prototype.$ = function (selector) {                                                                    // 403
  var self = this;                                                                                              // 404
                                                                                                                // 405
  var parentNode = this.parentElement;                                                                          // 406
  if (! parentNode)                                                                                             // 407
    throw new Error("Can't select in removed DomRange");                                                        // 408
                                                                                                                // 409
  // Strategy: Find all selector matches under parentNode,                                                      // 410
  // then filter out the ones that aren't in this DomRange                                                      // 411
  // using `DOMRange#containsElement`.  This is                                                                 // 412
  // asymptotically slow in the presence of O(N) sibling                                                        // 413
  // content that is under parentNode but not in our range,                                                     // 414
  // so if performance is an issue, the selector should be                                                      // 415
  // run on a child element.                                                                                    // 416
                                                                                                                // 417
  // Since jQuery can't run selectors on a DocumentFragment,                                                    // 418
  // we don't expect findBySelector to work.                                                                    // 419
  if (parentNode.nodeType === 11 /* DocumentFragment */)                                                        // 420
    throw new Error("Can't use $ on an offscreen range");                                                       // 421
                                                                                                                // 422
  var results = Blaze._DOMBackend.findBySelector(selector, parentNode);                                         // 423
                                                                                                                // 424
  // We don't assume `results` has jQuery API; a plain array                                                    // 425
  // should do just as well.  However, if we do have a jQuery                                                   // 426
  // array, we want to end up with one also, so we use                                                          // 427
  // `.filter`.                                                                                                 // 428
                                                                                                                // 429
  // Function that selects only elements that are actually                                                      // 430
  // in this DomRange, rather than simply descending from                                                       // 431
  // `parentNode`.                                                                                              // 432
  var filterFunc = function (elem) {                                                                            // 433
    // handle jQuery's arguments to filter, where the node                                                      // 434
    // is in `this` and the index is the first argument.                                                        // 435
    if (typeof elem === 'number')                                                                               // 436
      elem = this;                                                                                              // 437
                                                                                                                // 438
    return self.containsElement(elem);                                                                          // 439
  };                                                                                                            // 440
                                                                                                                // 441
  if (! results.filter) {                                                                                       // 442
    // not a jQuery array, and not a browser with                                                               // 443
    // Array.prototype.filter (e.g. IE <9)                                                                      // 444
    var newResults = [];                                                                                        // 445
    for (var i = 0; i < results.length; i++) {                                                                  // 446
      var x = results[i];                                                                                       // 447
      if (filterFunc(x))                                                                                        // 448
        newResults.push(x);                                                                                     // 449
    }                                                                                                           // 450
    results = newResults;                                                                                       // 451
  } else {                                                                                                      // 452
    // `results.filter` is either jQuery's or ECMAScript's `filter`                                             // 453
    results = results.filter(filterFunc);                                                                       // 454
  }                                                                                                             // 455
                                                                                                                // 456
  return results;                                                                                               // 457
};                                                                                                              // 458
                                                                                                                // 459
// Returns true if element a contains node b and is not node b.                                                 // 460
//                                                                                                              // 461
// The restriction that `a` be an element (not a document fragment,                                             // 462
// say) is based on what's easy to implement cross-browser.                                                     // 463
Blaze._elementContains = function (a, b) {                                                                      // 464
  if (a.nodeType !== 1) // ELEMENT                                                                              // 465
    return false;                                                                                               // 466
  if (a === b)                                                                                                  // 467
    return false;                                                                                               // 468
                                                                                                                // 469
  if (a.compareDocumentPosition) {                                                                              // 470
    return a.compareDocumentPosition(b) & 0x10;                                                                 // 471
  } else {                                                                                                      // 472
    // Should be only old IE and maybe other old browsers here.                                                 // 473
    // Modern Safari has both functions but seems to get contains() wrong.                                      // 474
    // IE can't handle b being a text node.  We work around this                                                // 475
    // by doing a direct parent test now.                                                                       // 476
    b = b.parentNode;                                                                                           // 477
    if (! (b && b.nodeType === 1)) // ELEMENT                                                                   // 478
      return false;                                                                                             // 479
    if (a === b)                                                                                                // 480
      return true;                                                                                              // 481
                                                                                                                // 482
    return a.contains(b);                                                                                       // 483
  }                                                                                                             // 484
};                                                                                                              // 485
                                                                                                                // 486
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/events.js                                                                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var EventSupport = Blaze._EventSupport = {};                                                                    // 1
                                                                                                                // 2
var DOMBackend = Blaze._DOMBackend;                                                                             // 3
                                                                                                                // 4
// List of events to always delegate, never capture.                                                            // 5
// Since jQuery fakes bubbling for certain events in                                                            // 6
// certain browsers (like `submit`), we don't want to                                                           // 7
// get in its way.                                                                                              // 8
//                                                                                                              // 9
// We could list all known bubbling                                                                             // 10
// events here to avoid creating speculative capturers                                                          // 11
// for them, but it would only be an optimization.                                                              // 12
var eventsToDelegate = EventSupport.eventsToDelegate = {                                                        // 13
  blur: 1, change: 1, click: 1, focus: 1, focusin: 1,                                                           // 14
  focusout: 1, reset: 1, submit: 1                                                                              // 15
};                                                                                                              // 16
                                                                                                                // 17
var EVENT_MODE = EventSupport.EVENT_MODE = {                                                                    // 18
  TBD: 0,                                                                                                       // 19
  BUBBLING: 1,                                                                                                  // 20
  CAPTURING: 2                                                                                                  // 21
};                                                                                                              // 22
                                                                                                                // 23
var NEXT_HANDLERREC_ID = 1;                                                                                     // 24
                                                                                                                // 25
var HandlerRec = function (elem, type, selector, handler, recipient) {                                          // 26
  this.elem = elem;                                                                                             // 27
  this.type = type;                                                                                             // 28
  this.selector = selector;                                                                                     // 29
  this.handler = handler;                                                                                       // 30
  this.recipient = recipient;                                                                                   // 31
  this.id = (NEXT_HANDLERREC_ID++);                                                                             // 32
                                                                                                                // 33
  this.mode = EVENT_MODE.TBD;                                                                                   // 34
                                                                                                                // 35
  // It's important that delegatedHandler be a different                                                        // 36
  // instance for each handlerRecord, because its identity                                                      // 37
  // is used to remove it.                                                                                      // 38
  //                                                                                                            // 39
  // It's also important that the closure have access to                                                        // 40
  // `this` when it is not called with it set.                                                                  // 41
  this.delegatedHandler = (function (h) {                                                                       // 42
    return function (evt) {                                                                                     // 43
      if ((! h.selector) && evt.currentTarget !== evt.target)                                                   // 44
        // no selector means only fire on target                                                                // 45
        return;                                                                                                 // 46
      return h.handler.apply(h.recipient, arguments);                                                           // 47
    };                                                                                                          // 48
  })(this);                                                                                                     // 49
                                                                                                                // 50
  // WHY CAPTURE AND DELEGATE: jQuery can't delegate                                                            // 51
  // non-bubbling events, because                                                                               // 52
  // event capture doesn't work in IE 8.  However, there                                                        // 53
  // are all sorts of new-fangled non-bubbling events                                                           // 54
  // like "play" and "touchenter".  We delegate these                                                           // 55
  // events using capture in all browsers except IE 8.                                                          // 56
  // IE 8 doesn't support these events anyway.                                                                  // 57
                                                                                                                // 58
  var tryCapturing = elem.addEventListener &&                                                                   // 59
        (! _.has(eventsToDelegate,                                                                              // 60
                 DOMBackend.Events.parseEventType(type)));                                                      // 61
                                                                                                                // 62
  if (tryCapturing) {                                                                                           // 63
    this.capturingHandler = (function (h) {                                                                     // 64
      return function (evt) {                                                                                   // 65
        if (h.mode === EVENT_MODE.TBD) {                                                                        // 66
          // must be first time we're called.                                                                   // 67
          if (evt.bubbles) {                                                                                    // 68
            // this type of event bubbles, so don't                                                             // 69
            // get called again.                                                                                // 70
            h.mode = EVENT_MODE.BUBBLING;                                                                       // 71
            DOMBackend.Events.unbindEventCapturer(                                                              // 72
              h.elem, h.type, h.capturingHandler);                                                              // 73
            return;                                                                                             // 74
          } else {                                                                                              // 75
            // this type of event doesn't bubble,                                                               // 76
            // so unbind the delegation, preventing                                                             // 77
            // it from ever firing.                                                                             // 78
            h.mode = EVENT_MODE.CAPTURING;                                                                      // 79
            DOMBackend.Events.undelegateEvents(                                                                 // 80
              h.elem, h.type, h.delegatedHandler);                                                              // 81
          }                                                                                                     // 82
        }                                                                                                       // 83
                                                                                                                // 84
        h.delegatedHandler(evt);                                                                                // 85
      };                                                                                                        // 86
    })(this);                                                                                                   // 87
                                                                                                                // 88
  } else {                                                                                                      // 89
    this.mode = EVENT_MODE.BUBBLING;                                                                            // 90
  }                                                                                                             // 91
};                                                                                                              // 92
EventSupport.HandlerRec = HandlerRec;                                                                           // 93
                                                                                                                // 94
HandlerRec.prototype.bind = function () {                                                                       // 95
  // `this.mode` may be EVENT_MODE_TBD, in which case we bind both. in                                          // 96
  // this case, 'capturingHandler' is in charge of detecting the                                                // 97
  // correct mode and turning off one or the other handlers.                                                    // 98
  if (this.mode !== EVENT_MODE.BUBBLING) {                                                                      // 99
    DOMBackend.Events.bindEventCapturer(                                                                        // 100
      this.elem, this.type, this.selector || '*',                                                               // 101
      this.capturingHandler);                                                                                   // 102
  }                                                                                                             // 103
                                                                                                                // 104
  if (this.mode !== EVENT_MODE.CAPTURING)                                                                       // 105
    DOMBackend.Events.delegateEvents(                                                                           // 106
      this.elem, this.type,                                                                                     // 107
      this.selector || '*', this.delegatedHandler);                                                             // 108
};                                                                                                              // 109
                                                                                                                // 110
HandlerRec.prototype.unbind = function () {                                                                     // 111
  if (this.mode !== EVENT_MODE.BUBBLING)                                                                        // 112
    DOMBackend.Events.unbindEventCapturer(this.elem, this.type,                                                 // 113
                                          this.capturingHandler);                                               // 114
                                                                                                                // 115
  if (this.mode !== EVENT_MODE.CAPTURING)                                                                       // 116
    DOMBackend.Events.undelegateEvents(this.elem, this.type,                                                    // 117
                                       this.delegatedHandler);                                                  // 118
};                                                                                                              // 119
                                                                                                                // 120
EventSupport.listen = function (element, events, selector, handler, recipient, getParentRecipient) {            // 121
                                                                                                                // 122
  // Prevent this method from being JITed by Safari.  Due to a                                                  // 123
  // presumed JIT bug in Safari -- observed in Version 7.0.6                                                    // 124
  // (9537.78.2) -- this method may crash the Safari render process if                                          // 125
  // it is JITed.                                                                                               // 126
  // Repro: https://github.com/dgreensp/public/tree/master/safari-crash                                         // 127
  try { element = element; } finally {}                                                                         // 128
                                                                                                                // 129
  var eventTypes = [];                                                                                          // 130
  events.replace(/[^ /]+/g, function (e) {                                                                      // 131
    eventTypes.push(e);                                                                                         // 132
  });                                                                                                           // 133
                                                                                                                // 134
  var newHandlerRecs = [];                                                                                      // 135
  for (var i = 0, N = eventTypes.length; i < N; i++) {                                                          // 136
    var type = eventTypes[i];                                                                                   // 137
                                                                                                                // 138
    var eventDict = element.$blaze_events;                                                                      // 139
    if (! eventDict)                                                                                            // 140
      eventDict = (element.$blaze_events = {});                                                                 // 141
                                                                                                                // 142
    var info = eventDict[type];                                                                                 // 143
    if (! info) {                                                                                               // 144
      info = eventDict[type] = {};                                                                              // 145
      info.handlers = [];                                                                                       // 146
    }                                                                                                           // 147
    var handlerList = info.handlers;                                                                            // 148
    var handlerRec = new HandlerRec(                                                                            // 149
      element, type, selector, handler, recipient);                                                             // 150
    newHandlerRecs.push(handlerRec);                                                                            // 151
    handlerRec.bind();                                                                                          // 152
    handlerList.push(handlerRec);                                                                               // 153
    // Move handlers of enclosing ranges to end, by unbinding and rebinding                                     // 154
    // them.  In jQuery (or other DOMBackend) this causes them to fire                                          // 155
    // later when the backend dispatches event handlers.                                                        // 156
    if (getParentRecipient) {                                                                                   // 157
      for (var r = getParentRecipient(recipient); r;                                                            // 158
           r = getParentRecipient(r)) {                                                                         // 159
        // r is an enclosing range (recipient)                                                                  // 160
        for (var j = 0, Nj = handlerList.length;                                                                // 161
             j < Nj; j++) {                                                                                     // 162
          var h = handlerList[j];                                                                               // 163
          if (h.recipient === r) {                                                                              // 164
            h.unbind();                                                                                         // 165
            h.bind();                                                                                           // 166
            handlerList.splice(j, 1); // remove handlerList[j]                                                  // 167
            handlerList.push(h);                                                                                // 168
            j--; // account for removed handler                                                                 // 169
            Nj--; // don't visit appended handlers                                                              // 170
          }                                                                                                     // 171
        }                                                                                                       // 172
      }                                                                                                         // 173
    }                                                                                                           // 174
  }                                                                                                             // 175
                                                                                                                // 176
  return {                                                                                                      // 177
    // closes over just `element` and `newHandlerRecs`                                                          // 178
    stop: function () {                                                                                         // 179
      var eventDict = element.$blaze_events;                                                                    // 180
      if (! eventDict)                                                                                          // 181
        return;                                                                                                 // 182
      // newHandlerRecs has only one item unless you specify multiple                                           // 183
      // event types.  If this code is slow, it's because we have to                                            // 184
      // iterate over handlerList here.  Clearing a whole handlerList                                           // 185
      // via stop() methods is O(N^2) in the number of handlers on                                              // 186
      // an element.                                                                                            // 187
      for (var i = 0; i < newHandlerRecs.length; i++) {                                                         // 188
        var handlerToRemove = newHandlerRecs[i];                                                                // 189
        var info = eventDict[handlerToRemove.type];                                                             // 190
        if (! info)                                                                                             // 191
          continue;                                                                                             // 192
        var handlerList = info.handlers;                                                                        // 193
        for (var j = handlerList.length - 1; j >= 0; j--) {                                                     // 194
          if (handlerList[j] === handlerToRemove) {                                                             // 195
            handlerToRemove.unbind();                                                                           // 196
            handlerList.splice(j, 1); // remove handlerList[j]                                                  // 197
          }                                                                                                     // 198
        }                                                                                                       // 199
      }                                                                                                         // 200
      newHandlerRecs.length = 0;                                                                                // 201
    }                                                                                                           // 202
  };                                                                                                            // 203
};                                                                                                              // 204
                                                                                                                // 205
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/attrs.js                                                                                      //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var jsUrlsAllowed = false;                                                                                      // 1
Blaze._allowJavascriptUrls = function () {                                                                      // 2
  jsUrlsAllowed = true;                                                                                         // 3
};                                                                                                              // 4
Blaze._javascriptUrlsAllowed = function () {                                                                    // 5
  return jsUrlsAllowed;                                                                                         // 6
};                                                                                                              // 7
                                                                                                                // 8
// An AttributeHandler object is responsible for updating a particular attribute                                // 9
// of a particular element.  AttributeHandler subclasses implement                                              // 10
// browser-specific logic for dealing with particular attributes across                                         // 11
// different browsers.                                                                                          // 12
//                                                                                                              // 13
// To define a new type of AttributeHandler, use                                                                // 14
// `var FooHandler = AttributeHandler.extend({ update: function ... })`                                         // 15
// where the `update` function takes arguments `(element, oldValue, value)`.                                    // 16
// The `element` argument is always the same between calls to `update` on                                       // 17
// the same instance.  `oldValue` and `value` are each either `null` or                                         // 18
// a Unicode string of the type that might be passed to the value argument                                      // 19
// of `setAttribute` (i.e. not an HTML string with character references).                                       // 20
// When an AttributeHandler is installed, an initial call to `update` is                                        // 21
// always made with `oldValue = null`.  The `update` method can access                                          // 22
// `this.name` if the AttributeHandler class is a generic one that applies                                      // 23
// to multiple attribute names.                                                                                 // 24
//                                                                                                              // 25
// AttributeHandlers can store custom properties on `this`, as long as they                                     // 26
// don't use the names `element`, `name`, `value`, and `oldValue`.                                              // 27
//                                                                                                              // 28
// AttributeHandlers can't influence how attributes appear in rendered HTML,                                    // 29
// only how they are updated after materialization as DOM.                                                      // 30
                                                                                                                // 31
AttributeHandler = function (name, value) {                                                                     // 32
  this.name = name;                                                                                             // 33
  this.value = value;                                                                                           // 34
};                                                                                                              // 35
Blaze._AttributeHandler = AttributeHandler;                                                                     // 36
                                                                                                                // 37
AttributeHandler.prototype.update = function (element, oldValue, value) {                                       // 38
  if (value === null) {                                                                                         // 39
    if (oldValue !== null)                                                                                      // 40
      element.removeAttribute(this.name);                                                                       // 41
  } else {                                                                                                      // 42
    element.setAttribute(this.name, value);                                                                     // 43
  }                                                                                                             // 44
};                                                                                                              // 45
                                                                                                                // 46
AttributeHandler.extend = function (options) {                                                                  // 47
  var curType = this;                                                                                           // 48
  var subType = function AttributeHandlerSubtype(/*arguments*/) {                                               // 49
    AttributeHandler.apply(this, arguments);                                                                    // 50
  };                                                                                                            // 51
  subType.prototype = new curType;                                                                              // 52
  subType.extend = curType.extend;                                                                              // 53
  if (options)                                                                                                  // 54
    _.extend(subType.prototype, options);                                                                       // 55
  return subType;                                                                                               // 56
};                                                                                                              // 57
                                                                                                                // 58
/// Apply the diff between the attributes of "oldValue" and "value" to "element."                               // 59
//                                                                                                              // 60
// Each subclass must implement a parseValue method which takes a string                                        // 61
// as an input and returns a dict of attributes. The keys of the dict                                           // 62
// are unique identifiers (ie. css properties in the case of styles), and the                                   // 63
// values are the entire attribute which will be injected into the element.                                     // 64
//                                                                                                              // 65
// Extended below to support classes, SVG elements and styles.                                                  // 66
                                                                                                                // 67
var DiffingAttributeHandler = AttributeHandler.extend({                                                         // 68
  update: function (element, oldValue, value) {                                                                 // 69
    if (!this.getCurrentValue || !this.setValue || !this.parseValue)                                            // 70
      throw new Error("Missing methods in subclass of 'DiffingAttributeHandler'");                              // 71
                                                                                                                // 72
    var oldAttrsMap = oldValue ? this.parseValue(oldValue) : {};                                                // 73
    var newAttrsMap = value ? this.parseValue(value) : {};                                                      // 74
                                                                                                                // 75
    // the current attributes on the element, which we will mutate.                                             // 76
                                                                                                                // 77
    var attrString = this.getCurrentValue(element);                                                             // 78
    var attrsMap = attrString ? this.parseValue(attrString) : {};                                               // 79
                                                                                                                // 80
    _.each(_.keys(oldAttrsMap), function (t) {                                                                  // 81
      if (! (t in newAttrsMap))                                                                                 // 82
        delete attrsMap[t];                                                                                     // 83
    });                                                                                                         // 84
                                                                                                                // 85
    _.each(_.keys(newAttrsMap), function (t) {                                                                  // 86
      attrsMap[t] = newAttrsMap[t];                                                                             // 87
    });                                                                                                         // 88
                                                                                                                // 89
    this.setValue(element, _.values(attrsMap).join(' '));                                                       // 90
  }                                                                                                             // 91
});                                                                                                             // 92
                                                                                                                // 93
var ClassHandler = DiffingAttributeHandler.extend({                                                             // 94
  // @param rawValue {String}                                                                                   // 95
  getCurrentValue: function (element) {                                                                         // 96
    return element.className;                                                                                   // 97
  },                                                                                                            // 98
  setValue: function (element, className) {                                                                     // 99
    element.className = className;                                                                              // 100
  },                                                                                                            // 101
  parseValue: function (attrString) {                                                                           // 102
    var tokens = {};                                                                                            // 103
                                                                                                                // 104
    _.each(attrString.split(' '), function(token) {                                                             // 105
      if (token)                                                                                                // 106
        tokens[token] = token;                                                                                  // 107
    });                                                                                                         // 108
    return tokens;                                                                                              // 109
  }                                                                                                             // 110
});                                                                                                             // 111
                                                                                                                // 112
var SVGClassHandler = ClassHandler.extend({                                                                     // 113
  getCurrentValue: function (element) {                                                                         // 114
    return element.className.baseVal;                                                                           // 115
  },                                                                                                            // 116
  setValue: function (element, className) {                                                                     // 117
    element.setAttribute('class', className);                                                                   // 118
  }                                                                                                             // 119
});                                                                                                             // 120
                                                                                                                // 121
var StyleHandler = DiffingAttributeHandler.extend({                                                             // 122
  getCurrentValue: function (element) {                                                                         // 123
    return element.getAttribute('style');                                                                       // 124
  },                                                                                                            // 125
  setValue: function (element, style) {                                                                         // 126
    if (style === '') {                                                                                         // 127
      element.removeAttribute('style');                                                                         // 128
    } else {                                                                                                    // 129
      element.setAttribute('style', style);                                                                     // 130
    }                                                                                                           // 131
  },                                                                                                            // 132
                                                                                                                // 133
  // Parse a string to produce a map from property to attribute string.                                         // 134
  //                                                                                                            // 135
  // Example:                                                                                                   // 136
  // "color:red; foo:12px" produces a token {color: "color:red", foo:"foo:12px"}                                // 137
  parseValue: function (attrString) {                                                                           // 138
    var tokens = {};                                                                                            // 139
                                                                                                                // 140
    // Regex for parsing a css attribute declaration, taken from css-parse:                                     // 141
    // https://github.com/reworkcss/css-parse/blob/7cef3658d0bba872cde05a85339034b187cb3397/index.js#L219       // 142
    var regex = /(\*?[-#\/\*\\\w]+(?:\[[0-9a-z_-]+\])?)\s*:\s*(?:\'(?:\\\'|.)*?\'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+[;\s]*/g;
    var match = regex.exec(attrString);                                                                         // 144
    while (match) {                                                                                             // 145
      // match[0] = entire matching string                                                                      // 146
      // match[1] = css property                                                                                // 147
      // Prefix the token to prevent conflicts with existing properties.                                        // 148
                                                                                                                // 149
      // XXX No `String.trim` on Safari 4. Swap out $.trim if we want to                                        // 150
      // remove strong dep on jquery.                                                                           // 151
      tokens[' ' + match[1]] = match[0].trim ?                                                                  // 152
        match[0].trim() : $.trim(match[0]);                                                                     // 153
                                                                                                                // 154
      match = regex.exec(attrString);                                                                           // 155
    }                                                                                                           // 156
                                                                                                                // 157
    return tokens;                                                                                              // 158
  }                                                                                                             // 159
});                                                                                                             // 160
                                                                                                                // 161
var BooleanHandler = AttributeHandler.extend({                                                                  // 162
  update: function (element, oldValue, value) {                                                                 // 163
    var name = this.name;                                                                                       // 164
    if (value == null) {                                                                                        // 165
      if (oldValue != null)                                                                                     // 166
        element[name] = false;                                                                                  // 167
    } else {                                                                                                    // 168
      element[name] = true;                                                                                     // 169
    }                                                                                                           // 170
  }                                                                                                             // 171
});                                                                                                             // 172
                                                                                                                // 173
var ValueHandler = AttributeHandler.extend({                                                                    // 174
  update: function (element, oldValue, value) {                                                                 // 175
    if (value !== element.value)                                                                                // 176
      element.value = value;                                                                                    // 177
  }                                                                                                             // 178
});                                                                                                             // 179
                                                                                                                // 180
// attributes of the type 'xlink:something' should be set using                                                 // 181
// the correct namespace in order to work                                                                       // 182
var XlinkHandler = AttributeHandler.extend({                                                                    // 183
  update: function(element, oldValue, value) {                                                                  // 184
    var NS = 'http://www.w3.org/1999/xlink';                                                                    // 185
    if (value === null) {                                                                                       // 186
      if (oldValue !== null)                                                                                    // 187
        element.removeAttributeNS(NS, this.name);                                                               // 188
    } else {                                                                                                    // 189
      element.setAttributeNS(NS, this.name, this.value);                                                        // 190
    }                                                                                                           // 191
  }                                                                                                             // 192
});                                                                                                             // 193
                                                                                                                // 194
// cross-browser version of `instanceof SVGElement`                                                             // 195
var isSVGElement = function (elem) {                                                                            // 196
  return 'ownerSVGElement' in elem;                                                                             // 197
};                                                                                                              // 198
                                                                                                                // 199
var isUrlAttribute = function (tagName, attrName) {                                                             // 200
  // Compiled from http://www.w3.org/TR/REC-html40/index/attributes.html                                        // 201
  // and                                                                                                        // 202
  // http://www.w3.org/html/wg/drafts/html/master/index.html#attributes-1                                       // 203
  var urlAttrs = {                                                                                              // 204
    FORM: ['action'],                                                                                           // 205
    BODY: ['background'],                                                                                       // 206
    BLOCKQUOTE: ['cite'],                                                                                       // 207
    Q: ['cite'],                                                                                                // 208
    DEL: ['cite'],                                                                                              // 209
    INS: ['cite'],                                                                                              // 210
    OBJECT: ['classid', 'codebase', 'data', 'usemap'],                                                          // 211
    APPLET: ['codebase'],                                                                                       // 212
    A: ['href'],                                                                                                // 213
    AREA: ['href'],                                                                                             // 214
    LINK: ['href'],                                                                                             // 215
    BASE: ['href'],                                                                                             // 216
    IMG: ['longdesc', 'src', 'usemap'],                                                                         // 217
    FRAME: ['longdesc', 'src'],                                                                                 // 218
    IFRAME: ['longdesc', 'src'],                                                                                // 219
    HEAD: ['profile'],                                                                                          // 220
    SCRIPT: ['src'],                                                                                            // 221
    INPUT: ['src', 'usemap', 'formaction'],                                                                     // 222
    BUTTON: ['formaction'],                                                                                     // 223
    BASE: ['href'],                                                                                             // 224
    MENUITEM: ['icon'],                                                                                         // 225
    HTML: ['manifest'],                                                                                         // 226
    VIDEO: ['poster']                                                                                           // 227
  };                                                                                                            // 228
                                                                                                                // 229
  if (attrName === 'itemid') {                                                                                  // 230
    return true;                                                                                                // 231
  }                                                                                                             // 232
                                                                                                                // 233
  var urlAttrNames = urlAttrs[tagName] || [];                                                                   // 234
  return _.contains(urlAttrNames, attrName);                                                                    // 235
};                                                                                                              // 236
                                                                                                                // 237
// To get the protocol for a URL, we let the browser normalize it for                                           // 238
// us, by setting it as the href for an anchor tag and then reading out                                         // 239
// the 'protocol' property.                                                                                     // 240
if (Meteor.isClient) {                                                                                          // 241
  var anchorForNormalization = document.createElement('A');                                                     // 242
}                                                                                                               // 243
                                                                                                                // 244
var getUrlProtocol = function (url) {                                                                           // 245
  if (Meteor.isClient) {                                                                                        // 246
    anchorForNormalization.href = url;                                                                          // 247
    return (anchorForNormalization.protocol || "").toLowerCase();                                               // 248
  } else {                                                                                                      // 249
    throw new Error('getUrlProtocol not implemented on the server');                                            // 250
  }                                                                                                             // 251
};                                                                                                              // 252
                                                                                                                // 253
// UrlHandler is an attribute handler for all HTML attributes that take                                         // 254
// URL values. It disallows javascript: URLs, unless                                                            // 255
// Blaze._allowJavascriptUrls() has been called. To detect javascript:                                          // 256
// urls, we set the attribute on a dummy anchor element and then read                                           // 257
// out the 'protocol' property of the attribute.                                                                // 258
var origUpdate = AttributeHandler.prototype.update;                                                             // 259
var UrlHandler = AttributeHandler.extend({                                                                      // 260
  update: function (element, oldValue, value) {                                                                 // 261
    var self = this;                                                                                            // 262
    var args = arguments;                                                                                       // 263
                                                                                                                // 264
    if (Blaze._javascriptUrlsAllowed()) {                                                                       // 265
      origUpdate.apply(self, args);                                                                             // 266
    } else {                                                                                                    // 267
      var isJavascriptProtocol = (getUrlProtocol(value) === "javascript:");                                     // 268
      if (isJavascriptProtocol) {                                                                               // 269
        Blaze._warn("URLs that use the 'javascript:' protocol are not " +                                       // 270
                    "allowed in URL attribute values. " +                                                       // 271
                    "Call Blaze._allowJavascriptUrls() " +                                                      // 272
                    "to enable them.");                                                                         // 273
        origUpdate.apply(self, [element, oldValue, null]);                                                      // 274
      } else {                                                                                                  // 275
        origUpdate.apply(self, args);                                                                           // 276
      }                                                                                                         // 277
    }                                                                                                           // 278
  }                                                                                                             // 279
});                                                                                                             // 280
                                                                                                                // 281
// XXX make it possible for users to register attribute handlers!                                               // 282
makeAttributeHandler = function (elem, name, value) {                                                           // 283
  // generally, use setAttribute but certain attributes need to be set                                          // 284
  // by directly setting a JavaScript property on the DOM element.                                              // 285
  if (name === 'class') {                                                                                       // 286
    if (isSVGElement(elem)) {                                                                                   // 287
      return new SVGClassHandler(name, value);                                                                  // 288
    } else {                                                                                                    // 289
      return new ClassHandler(name, value);                                                                     // 290
    }                                                                                                           // 291
  } else if (name === 'style') {                                                                                // 292
    return new StyleHandler(name, value);                                                                       // 293
  } else if ((elem.tagName === 'OPTION' && name === 'selected') ||                                              // 294
             (elem.tagName === 'INPUT' && name === 'checked')) {                                                // 295
    return new BooleanHandler(name, value);                                                                     // 296
  } else if ((elem.tagName === 'TEXTAREA' || elem.tagName === 'INPUT')                                          // 297
             && name === 'value') {                                                                             // 298
    // internally, TEXTAREAs tracks their value in the 'value'                                                  // 299
    // attribute just like INPUTs.                                                                              // 300
    return new ValueHandler(name, value);                                                                       // 301
  } else if (name.substring(0,6) === 'xlink:') {                                                                // 302
    return new XlinkHandler(name.substring(6), value);                                                          // 303
  } else if (isUrlAttribute(elem.tagName, name)) {                                                              // 304
    return new UrlHandler(name, value);                                                                         // 305
  } else {                                                                                                      // 306
    return new AttributeHandler(name, value);                                                                   // 307
  }                                                                                                             // 308
                                                                                                                // 309
  // XXX will need one for 'style' on IE, though modern browsers                                                // 310
  // seem to handle setAttribute ok.                                                                            // 311
};                                                                                                              // 312
                                                                                                                // 313
                                                                                                                // 314
ElementAttributesUpdater = function (elem) {                                                                    // 315
  this.elem = elem;                                                                                             // 316
  this.handlers = {};                                                                                           // 317
};                                                                                                              // 318
                                                                                                                // 319
// Update attributes on `elem` to the dictionary `attrs`, whose                                                 // 320
// values are strings.                                                                                          // 321
ElementAttributesUpdater.prototype.update = function(newAttrs) {                                                // 322
  var elem = this.elem;                                                                                         // 323
  var handlers = this.handlers;                                                                                 // 324
                                                                                                                // 325
  for (var k in handlers) {                                                                                     // 326
    if (! _.has(newAttrs, k)) {                                                                                 // 327
      // remove attributes (and handlers) for attribute names                                                   // 328
      // that don't exist as keys of `newAttrs` and so won't                                                    // 329
      // be visited when traversing it.  (Attributes that                                                       // 330
      // exist in the `newAttrs` object but are `null`                                                          // 331
      // are handled later.)                                                                                    // 332
      var handler = handlers[k];                                                                                // 333
      var oldValue = handler.value;                                                                             // 334
      handler.value = null;                                                                                     // 335
      handler.update(elem, oldValue, null);                                                                     // 336
      delete handlers[k];                                                                                       // 337
    }                                                                                                           // 338
  }                                                                                                             // 339
                                                                                                                // 340
  for (var k in newAttrs) {                                                                                     // 341
    var handler = null;                                                                                         // 342
    var oldValue;                                                                                               // 343
    var value = newAttrs[k];                                                                                    // 344
    if (! _.has(handlers, k)) {                                                                                 // 345
      if (value !== null) {                                                                                     // 346
        // make new handler                                                                                     // 347
        handler = makeAttributeHandler(elem, k, value);                                                         // 348
        handlers[k] = handler;                                                                                  // 349
        oldValue = null;                                                                                        // 350
      }                                                                                                         // 351
    } else {                                                                                                    // 352
      handler = handlers[k];                                                                                    // 353
      oldValue = handler.value;                                                                                 // 354
    }                                                                                                           // 355
    if (oldValue !== value) {                                                                                   // 356
      handler.value = value;                                                                                    // 357
      handler.update(elem, oldValue, value);                                                                    // 358
      if (value === null)                                                                                       // 359
        delete handlers[k];                                                                                     // 360
    }                                                                                                           // 361
  }                                                                                                             // 362
};                                                                                                              // 363
                                                                                                                // 364
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/materializer.js                                                                               //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
// new Blaze._DOMMaterializer(options)                                                                          // 1
//                                                                                                              // 2
// An HTML.Visitor that turns HTMLjs into DOM nodes and DOMRanges.                                              // 3
//                                                                                                              // 4
// Options: `parentView`                                                                                        // 5
Blaze._DOMMaterializer = HTML.Visitor.extend();                                                                 // 6
Blaze._DOMMaterializer.def({                                                                                    // 7
  visitNull: function (x, intoArray) {                                                                          // 8
    return intoArray;                                                                                           // 9
  },                                                                                                            // 10
  visitPrimitive: function (primitive, intoArray) {                                                             // 11
    var string = String(primitive);                                                                             // 12
    intoArray.push(document.createTextNode(string));                                                            // 13
    return intoArray;                                                                                           // 14
  },                                                                                                            // 15
  visitCharRef: function (charRef, intoArray) {                                                                 // 16
    return this.visitPrimitive(charRef.str, intoArray);                                                         // 17
  },                                                                                                            // 18
  visitArray: function (array, intoArray) {                                                                     // 19
    for (var i = 0; i < array.length; i++)                                                                      // 20
      this.visit(array[i], intoArray);                                                                          // 21
    return intoArray;                                                                                           // 22
  },                                                                                                            // 23
  visitComment: function (comment, intoArray) {                                                                 // 24
    intoArray.push(document.createComment(comment.sanitizedValue));                                             // 25
    return intoArray;                                                                                           // 26
  },                                                                                                            // 27
  visitRaw: function (raw, intoArray) {                                                                         // 28
    // Get an array of DOM nodes by using the browser's HTML parser                                             // 29
    // (like innerHTML).                                                                                        // 30
    var nodes = Blaze._DOMBackend.parseHTML(raw.value);                                                         // 31
    for (var i = 0; i < nodes.length; i++)                                                                      // 32
      intoArray.push(nodes[i]);                                                                                 // 33
                                                                                                                // 34
    return intoArray;                                                                                           // 35
  },                                                                                                            // 36
  visitTag: function (tag, intoArray) {                                                                         // 37
    var self = this;                                                                                            // 38
    var tagName = tag.tagName;                                                                                  // 39
    var elem;                                                                                                   // 40
    if ((HTML.isKnownSVGElement(tagName) || isSVGAnchor(tag))                                                   // 41
        && document.createElementNS) {                                                                          // 42
      // inline SVG                                                                                             // 43
      elem = document.createElementNS('http://www.w3.org/2000/svg', tagName);                                   // 44
    } else {                                                                                                    // 45
      // normal elements                                                                                        // 46
      elem = document.createElement(tagName);                                                                   // 47
    }                                                                                                           // 48
                                                                                                                // 49
    var rawAttrs = tag.attrs;                                                                                   // 50
    var children = tag.children;                                                                                // 51
    if (tagName === 'textarea' && tag.children.length &&                                                        // 52
        ! (rawAttrs && ('value' in rawAttrs))) {                                                                // 53
      // Provide very limited support for TEXTAREA tags with children                                           // 54
      // rather than a "value" attribute.                                                                       // 55
      // Reactivity in the form of Views nested in the tag's children                                           // 56
      // won't work.  Compilers should compile textarea contents into                                           // 57
      // the "value" attribute of the tag, wrapped in a function if there                                       // 58
      // is reactivity.                                                                                         // 59
      if (typeof rawAttrs === 'function' ||                                                                     // 60
          HTML.isArray(rawAttrs)) {                                                                             // 61
        throw new Error("Can't have reactive children of TEXTAREA node; " +                                     // 62
                        "use the 'value' attribute instead.");                                                  // 63
      }                                                                                                         // 64
      rawAttrs = _.extend({}, rawAttrs || null);                                                                // 65
      rawAttrs.value = Blaze._expand(children, self.parentView);                                                // 66
      children = [];                                                                                            // 67
    }                                                                                                           // 68
                                                                                                                // 69
    if (rawAttrs) {                                                                                             // 70
      var attrUpdater = new ElementAttributesUpdater(elem);                                                     // 71
      var updateAttributes = function () {                                                                      // 72
        var parentView = self.parentView;                                                                       // 73
        var expandedAttrs = Blaze._expandAttributes(rawAttrs, parentView);                                      // 74
        var flattenedAttrs = HTML.flattenAttributes(expandedAttrs);                                             // 75
        var stringAttrs = {};                                                                                   // 76
        for (var attrName in flattenedAttrs) {                                                                  // 77
          stringAttrs[attrName] = Blaze._toText(flattenedAttrs[attrName],                                       // 78
                                                parentView,                                                     // 79
                                                HTML.TEXTMODE.STRING);                                          // 80
        }                                                                                                       // 81
        attrUpdater.update(stringAttrs);                                                                        // 82
      };                                                                                                        // 83
      var updaterComputation;                                                                                   // 84
      if (self.parentView) {                                                                                    // 85
        updaterComputation = self.parentView.autorun(updateAttributes);                                         // 86
      } else {                                                                                                  // 87
        updaterComputation = Tracker.nonreactive(function () {                                                  // 88
          return Tracker.autorun(function () {                                                                  // 89
            Tracker._withCurrentView(self.parentView, updateAttributes);                                        // 90
          });                                                                                                   // 91
        });                                                                                                     // 92
      }                                                                                                         // 93
      Blaze._DOMBackend.Teardown.onElementTeardown(elem, function attrTeardown() {                              // 94
        updaterComputation.stop();                                                                              // 95
      });                                                                                                       // 96
    }                                                                                                           // 97
                                                                                                                // 98
    var childNodesAndRanges = self.visit(children, []);                                                         // 99
    for (var i = 0; i < childNodesAndRanges.length; i++) {                                                      // 100
      var x = childNodesAndRanges[i];                                                                           // 101
      if (x instanceof Blaze._DOMRange)                                                                         // 102
        x.attach(elem);                                                                                         // 103
      else                                                                                                      // 104
        elem.appendChild(x);                                                                                    // 105
    }                                                                                                           // 106
                                                                                                                // 107
    intoArray.push(elem);                                                                                       // 108
                                                                                                                // 109
    return intoArray;                                                                                           // 110
  },                                                                                                            // 111
  visitObject: function (x, intoArray) {                                                                        // 112
    if (x instanceof Blaze.Template)                                                                            // 113
      x = x.constructView();                                                                                    // 114
                                                                                                                // 115
    if (x instanceof Blaze.View) {                                                                              // 116
      intoArray.push(Blaze._materializeView(x, this.parentView));                                               // 117
      return intoArray;                                                                                         // 118
    }                                                                                                           // 119
                                                                                                                // 120
    // throw the default error                                                                                  // 121
    return HTML.Visitor.prototype.visitObject.call(this, x);                                                    // 122
  }                                                                                                             // 123
});                                                                                                             // 124
                                                                                                                // 125
var isSVGAnchor = function (node) {                                                                             // 126
  // We generally aren't able to detect SVG <a> elements because                                                // 127
  // if "A" were in our list of known svg element names, then all                                               // 128
  // <a> nodes would be created using                                                                           // 129
  // `document.createElementNS`. But in the special case of <a                                                  // 130
  // xlink:href="...">, we can at least detect that attribute and                                               // 131
  // create an SVG <a> tag in that case.                                                                        // 132
  //                                                                                                            // 133
  // However, we still have a general problem of knowing when to                                                // 134
  // use document.createElementNS and when to use                                                               // 135
  // document.createElement; for example, font tags will always                                                 // 136
  // be created as SVG elements which can cause other                                                           // 137
  // problems. #1977                                                                                            // 138
  return (node.tagName === "a" &&                                                                               // 139
          node.attrs &&                                                                                         // 140
          node.attrs["xlink:href"] !== undefined);                                                              // 141
};                                                                                                              // 142
                                                                                                                // 143
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/exceptions.js                                                                                 //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var debugFunc;                                                                                                  // 1
                                                                                                                // 2
// We call into user code in many places, and it's nice to catch exceptions                                     // 3
// propagated from user code immediately so that the whole system doesn't just                                  // 4
// break.  Catching exceptions is easy; reporting them is hard.  This helper                                    // 5
// reports exceptions.                                                                                          // 6
//                                                                                                              // 7
// Usage:                                                                                                       // 8
//                                                                                                              // 9
// ```                                                                                                          // 10
// try {                                                                                                        // 11
//   // ... someStuff ...                                                                                       // 12
// } catch (e) {                                                                                                // 13
//   reportUIException(e);                                                                                      // 14
// }                                                                                                            // 15
// ```                                                                                                          // 16
//                                                                                                              // 17
// An optional second argument overrides the default message.                                                   // 18
                                                                                                                // 19
// Set this to `true` to cause `reportException` to throw                                                       // 20
// the next exception rather than reporting it.  This is                                                        // 21
// useful in unit tests that test error messages.                                                               // 22
Blaze._throwNextException = false;                                                                              // 23
                                                                                                                // 24
Blaze._reportException = function (e, msg) {                                                                    // 25
  if (Blaze._throwNextException) {                                                                              // 26
    Blaze._throwNextException = false;                                                                          // 27
    throw e;                                                                                                    // 28
  }                                                                                                             // 29
                                                                                                                // 30
  if (! debugFunc)                                                                                              // 31
    // adapted from Tracker                                                                                     // 32
    debugFunc = function () {                                                                                   // 33
      return (typeof Meteor !== "undefined" ? Meteor._debug :                                                   // 34
              ((typeof console !== "undefined") && console.log ? console.log :                                  // 35
               function () {}));                                                                                // 36
    };                                                                                                          // 37
                                                                                                                // 38
  // In Chrome, `e.stack` is a multiline string that starts with the message                                    // 39
  // and contains a stack trace.  Furthermore, `console.log` makes it clickable.                                // 40
  // `console.log` supplies the space between the two arguments.                                                // 41
  debugFunc()(msg || 'Exception caught in template:', e.stack || e.message);                                    // 42
};                                                                                                              // 43
                                                                                                                // 44
Blaze._wrapCatchingExceptions = function (f, where) {                                                           // 45
  if (typeof f !== 'function')                                                                                  // 46
    return f;                                                                                                   // 47
                                                                                                                // 48
  return function () {                                                                                          // 49
    try {                                                                                                       // 50
      return f.apply(this, arguments);                                                                          // 51
    } catch (e) {                                                                                               // 52
      Blaze._reportException(e, 'Exception in ' + where + ':');                                                 // 53
    }                                                                                                           // 54
  };                                                                                                            // 55
};                                                                                                              // 56
                                                                                                                // 57
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/view.js                                                                                       //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
/// [new] Blaze.View([name], renderMethod)                                                                      // 1
///                                                                                                             // 2
/// Blaze.View is the building block of reactive DOM.  Views have                                               // 3
/// the following features:                                                                                     // 4
///                                                                                                             // 5
/// * lifecycle callbacks - Views are created, rendered, and destroyed,                                         // 6
///   and callbacks can be registered to fire when these things happen.                                         // 7
///                                                                                                             // 8
/// * parent pointer - A View points to its parentView, which is the                                            // 9
///   View that caused it to be rendered.  These pointers form a                                                // 10
///   hierarchy or tree of Views.                                                                               // 11
///                                                                                                             // 12
/// * render() method - A View's render() method specifies the DOM                                              // 13
///   (or HTML) content of the View.  If the method establishes                                                 // 14
///   reactive dependencies, it may be re-run.                                                                  // 15
///                                                                                                             // 16
/// * a DOMRange - If a View is rendered to DOM, its position and                                               // 17
///   extent in the DOM are tracked using a DOMRange object.                                                    // 18
///                                                                                                             // 19
/// When a View is constructed by calling Blaze.View, the View is                                               // 20
/// not yet considered "created."  It doesn't have a parentView yet,                                            // 21
/// and no logic has been run to initialize the View.  All real                                                 // 22
/// work is deferred until at least creation time, when the onViewCreated                                       // 23
/// callbacks are fired, which happens when the View is "used" in                                               // 24
/// some way that requires it to be rendered.                                                                   // 25
///                                                                                                             // 26
/// ...more lifecycle stuff                                                                                     // 27
///                                                                                                             // 28
/// `name` is an optional string tag identifying the View.  The only                                            // 29
/// time it's used is when looking in the View tree for a View of a                                             // 30
/// particular name; for example, data contexts are stored on Views                                             // 31
/// of name "with".  Names are also useful when debugging, so in                                                // 32
/// general it's good for functions that create Views to set the name.                                          // 33
/// Views associated with templates have names of the form "Template.foo".                                      // 34
Blaze.View = function (name, render) {                                                                          // 35
  if (! (this instanceof Blaze.View))                                                                           // 36
    // called without `new`                                                                                     // 37
    return new Blaze.View(name, render);                                                                        // 38
                                                                                                                // 39
  if (typeof name === 'function') {                                                                             // 40
    // omitted "name" argument                                                                                  // 41
    render = name;                                                                                              // 42
    name = '';                                                                                                  // 43
  }                                                                                                             // 44
  this.name = name;                                                                                             // 45
  this._render = render;                                                                                        // 46
                                                                                                                // 47
  this._callbacks = {                                                                                           // 48
    created: null,                                                                                              // 49
    rendered: null,                                                                                             // 50
    destroyed: null                                                                                             // 51
  };                                                                                                            // 52
                                                                                                                // 53
  // Setting all properties here is good for readability,                                                       // 54
  // and also may help Chrome optimize the code by keeping                                                      // 55
  // the View object from changing shape too much.                                                              // 56
  this.isCreated = false;                                                                                       // 57
  this._isCreatedForExpansion = false;                                                                          // 58
  this.isRendered = false;                                                                                      // 59
  this._isAttached = false;                                                                                     // 60
  this.isDestroyed = false;                                                                                     // 61
  this._isInRender = false;                                                                                     // 62
  this.parentView = null;                                                                                       // 63
  this._domrange = null;                                                                                        // 64
                                                                                                                // 65
  this.renderCount = 0;                                                                                         // 66
};                                                                                                              // 67
                                                                                                                // 68
Blaze.View.prototype._render = function () { return null; };                                                    // 69
                                                                                                                // 70
Blaze.View.prototype.onViewCreated = function (cb) {                                                            // 71
  this._callbacks.created = this._callbacks.created || [];                                                      // 72
  this._callbacks.created.push(cb);                                                                             // 73
};                                                                                                              // 74
                                                                                                                // 75
Blaze.View.prototype._onViewRendered = function (cb) {                                                          // 76
  this._callbacks.rendered = this._callbacks.rendered || [];                                                    // 77
  this._callbacks.rendered.push(cb);                                                                            // 78
};                                                                                                              // 79
                                                                                                                // 80
Blaze.View.prototype.onViewReady = function (cb) {                                                              // 81
  var self = this;                                                                                              // 82
  var fire = function () {                                                                                      // 83
    Tracker.afterFlush(function () {                                                                            // 84
      if (! self.isDestroyed) {                                                                                 // 85
        Blaze._withCurrentView(self, function () {                                                              // 86
          cb.call(self);                                                                                        // 87
        });                                                                                                     // 88
      }                                                                                                         // 89
    });                                                                                                         // 90
  };                                                                                                            // 91
  self._onViewRendered(function onViewRendered() {                                                              // 92
    if (self.isDestroyed)                                                                                       // 93
      return;                                                                                                   // 94
    if (! self._domrange.attached)                                                                              // 95
      self._domrange.onAttached(fire);                                                                          // 96
    else                                                                                                        // 97
      fire();                                                                                                   // 98
  });                                                                                                           // 99
};                                                                                                              // 100
                                                                                                                // 101
Blaze.View.prototype.onViewDestroyed = function (cb) {                                                          // 102
  this._callbacks.destroyed = this._callbacks.destroyed || [];                                                  // 103
  this._callbacks.destroyed.push(cb);                                                                           // 104
};                                                                                                              // 105
                                                                                                                // 106
/// View#autorun(func)                                                                                          // 107
///                                                                                                             // 108
/// Sets up a Tracker autorun that is "scoped" to this View in two                                              // 109
/// important ways: 1) Blaze.currentView is automatically set                                                   // 110
/// on every re-run, and 2) the autorun is stopped when the                                                     // 111
/// View is destroyed.  As with Tracker.autorun, the first run of                                               // 112
/// the function is immediate, and a Computation object that can                                                // 113
/// be used to stop the autorun is returned.                                                                    // 114
///                                                                                                             // 115
/// View#autorun is meant to be called from View callbacks like                                                 // 116
/// onViewCreated, or from outside the rendering process.  It may not                                           // 117
/// be called before the onViewCreated callbacks are fired (too early),                                         // 118
/// or from a render() method (too confusing).                                                                  // 119
///                                                                                                             // 120
/// Typically, autoruns that update the state                                                                   // 121
/// of the View (as in Blaze.With) should be started from an onViewCreated                                      // 122
/// callback.  Autoruns that update the DOM should be started                                                   // 123
/// from either onViewCreated (guarded against the absence of                                                   // 124
/// view._domrange), or onViewReady.                                                                            // 125
Blaze.View.prototype.autorun = function (f, _inViewScope) {                                                     // 126
  var self = this;                                                                                              // 127
                                                                                                                // 128
  // The restrictions on when View#autorun can be called are in order                                           // 129
  // to avoid bad patterns, like creating a Blaze.View and immediately                                          // 130
  // calling autorun on it.  A freshly created View is not ready to                                             // 131
  // have logic run on it; it doesn't have a parentView, for example.                                           // 132
  // It's when the View is materialized or expanded that the onViewCreated                                      // 133
  // handlers are fired and the View starts up.                                                                 // 134
  //                                                                                                            // 135
  // Letting the render() method call `this.autorun()` is problematic                                           // 136
  // because of re-render.  The best we can do is to stop the old                                               // 137
  // autorun and start a new one for each render, but that's a pattern                                          // 138
  // we try to avoid internally because it leads to helpers being                                               // 139
  // called extra times, in the case where the autorun causes the                                               // 140
  // view to re-render (and thus the autorun to be torn down and a                                              // 141
  // new one established).                                                                                      // 142
  //                                                                                                            // 143
  // We could lift these restrictions in various ways.  One interesting                                         // 144
  // idea is to allow you to call `view.autorun` after instantiating                                            // 145
  // `view`, and automatically wrap it in `view.onViewCreated`, deferring                                       // 146
  // the autorun so that it starts at an appropriate time.  However,                                            // 147
  // then we can't return the Computation object to the caller, because                                         // 148
  // it doesn't exist yet.                                                                                      // 149
  if (! self.isCreated) {                                                                                       // 150
    throw new Error("View#autorun must be called from the created callback at the earliest");                   // 151
  }                                                                                                             // 152
  if (this._isInRender) {                                                                                       // 153
    throw new Error("Can't call View#autorun from inside render(); try calling it from the created or rendered callback");
  }                                                                                                             // 155
  if (Tracker.active) {                                                                                         // 156
    throw new Error("Can't call View#autorun from a Tracker Computation; try calling it from the created or rendered callback");
  }                                                                                                             // 158
                                                                                                                // 159
  var c = Tracker.autorun(function viewAutorun(c) {                                                             // 160
    return Blaze._withCurrentView(_inViewScope || self, function () {                                           // 161
      return f.call(self, c);                                                                                   // 162
    });                                                                                                         // 163
  });                                                                                                           // 164
  self.onViewDestroyed(function () { c.stop(); });                                                              // 165
                                                                                                                // 166
  return c;                                                                                                     // 167
};                                                                                                              // 168
                                                                                                                // 169
Blaze.View.prototype.firstNode = function () {                                                                  // 170
  if (! this._isAttached)                                                                                       // 171
    throw new Error("View must be attached before accessing its DOM");                                          // 172
                                                                                                                // 173
  return this._domrange.firstNode();                                                                            // 174
};                                                                                                              // 175
                                                                                                                // 176
Blaze.View.prototype.lastNode = function () {                                                                   // 177
  if (! this._isAttached)                                                                                       // 178
    throw new Error("View must be attached before accessing its DOM");                                          // 179
                                                                                                                // 180
  return this._domrange.lastNode();                                                                             // 181
};                                                                                                              // 182
                                                                                                                // 183
Blaze._fireCallbacks = function (view, which) {                                                                 // 184
  Blaze._withCurrentView(view, function () {                                                                    // 185
    Tracker.nonreactive(function fireCallbacks() {                                                              // 186
      var cbs = view._callbacks[which];                                                                         // 187
      for (var i = 0, N = (cbs && cbs.length); i < N; i++)                                                      // 188
        cbs[i].call(view);                                                                                      // 189
    });                                                                                                         // 190
  });                                                                                                           // 191
};                                                                                                              // 192
                                                                                                                // 193
Blaze._createView = function (view, parentView, forExpansion) {                                                 // 194
  if (view.isCreated)                                                                                           // 195
    throw new Error("Can't render the same View twice");                                                        // 196
                                                                                                                // 197
  view.parentView = (parentView || null);                                                                       // 198
  view.isCreated = true;                                                                                        // 199
  if (forExpansion)                                                                                             // 200
    view._isCreatedForExpansion = true;                                                                         // 201
                                                                                                                // 202
  Blaze._fireCallbacks(view, 'created');                                                                        // 203
};                                                                                                              // 204
                                                                                                                // 205
Blaze._materializeView = function (view, parentView) {                                                          // 206
  Blaze._createView(view, parentView);                                                                          // 207
                                                                                                                // 208
  var domrange;                                                                                                 // 209
  var lastHtmljs;                                                                                               // 210
  // We don't expect to be called in a Computation, but just in case,                                           // 211
  // wrap in Tracker.nonreactive.                                                                               // 212
  Tracker.nonreactive(function () {                                                                             // 213
    view.autorun(function doRender(c) {                                                                         // 214
      // `view.autorun` sets the current view.                                                                  // 215
      view.renderCount++;                                                                                       // 216
      view._isInRender = true;                                                                                  // 217
      // Any dependencies that should invalidate this Computation come                                          // 218
      // from this line:                                                                                        // 219
      var htmljs = view._render();                                                                              // 220
      view._isInRender = false;                                                                                 // 221
                                                                                                                // 222
      Tracker.nonreactive(function doMaterialize() {                                                            // 223
        var materializer = new Blaze._DOMMaterializer({parentView: view});                                      // 224
        var rangesAndNodes = materializer.visit(htmljs, []);                                                    // 225
        if (c.firstRun || ! Blaze._isContentEqual(lastHtmljs, htmljs)) {                                        // 226
          if (c.firstRun) {                                                                                     // 227
            domrange = new Blaze._DOMRange(rangesAndNodes);                                                     // 228
            view._domrange = domrange;                                                                          // 229
            domrange.view = view;                                                                               // 230
            view.isRendered = true;                                                                             // 231
          } else {                                                                                              // 232
            domrange.setMembers(rangesAndNodes);                                                                // 233
          }                                                                                                     // 234
          Blaze._fireCallbacks(view, 'rendered');                                                               // 235
        }                                                                                                       // 236
      });                                                                                                       // 237
      lastHtmljs = htmljs;                                                                                      // 238
                                                                                                                // 239
      // Causes any nested views to stop immediately, not when we call                                          // 240
      // `setMembers` the next time around the autorun.  Otherwise,                                             // 241
      // helpers in the DOM tree to be replaced might be scheduled                                              // 242
      // to re-run before we have a chance to stop them.                                                        // 243
      Tracker.onInvalidate(function () {                                                                        // 244
        domrange.destroyMembers();                                                                              // 245
      });                                                                                                       // 246
    });                                                                                                         // 247
                                                                                                                // 248
    var teardownHook = null;                                                                                    // 249
                                                                                                                // 250
    domrange.onAttached(function attached(range, element) {                                                     // 251
      view._isAttached = true;                                                                                  // 252
                                                                                                                // 253
      teardownHook = Blaze._DOMBackend.Teardown.onElementTeardown(                                              // 254
        element, function teardown() {                                                                          // 255
          Blaze._destroyView(view, true /* _skipNodes */);                                                      // 256
        });                                                                                                     // 257
    });                                                                                                         // 258
                                                                                                                // 259
    // tear down the teardown hook                                                                              // 260
    view.onViewDestroyed(function () {                                                                          // 261
      teardownHook && teardownHook.stop();                                                                      // 262
      teardownHook = null;                                                                                      // 263
    });                                                                                                         // 264
  });                                                                                                           // 265
                                                                                                                // 266
  return domrange;                                                                                              // 267
};                                                                                                              // 268
                                                                                                                // 269
// Expands a View to HTMLjs, calling `render` recursively on all                                                // 270
// Views and evaluating any dynamic attributes.  Calls the `created`                                            // 271
// callback, but not the `materialized` or `rendered` callbacks.                                                // 272
// Destroys the view immediately, unless called in a Tracker Computation,                                       // 273
// in which case the view will be destroyed when the Computation is                                             // 274
// invalidated.  If called in a Tracker Computation, the result is a                                            // 275
// reactive string; that is, the Computation will be invalidated                                                // 276
// if any changes are made to the view or subviews that might affect                                            // 277
// the HTML.                                                                                                    // 278
Blaze._expandView = function (view, parentView) {                                                               // 279
  Blaze._createView(view, parentView, true /*forExpansion*/);                                                   // 280
                                                                                                                // 281
  view._isInRender = true;                                                                                      // 282
  var htmljs = Blaze._withCurrentView(view, function () {                                                       // 283
    return view._render();                                                                                      // 284
  });                                                                                                           // 285
  view._isInRender = false;                                                                                     // 286
                                                                                                                // 287
  var result = Blaze._expand(htmljs, view);                                                                     // 288
                                                                                                                // 289
  if (Tracker.active) {                                                                                         // 290
    Tracker.onInvalidate(function () {                                                                          // 291
      Blaze._destroyView(view);                                                                                 // 292
    });                                                                                                         // 293
  } else {                                                                                                      // 294
    Blaze._destroyView(view);                                                                                   // 295
  }                                                                                                             // 296
                                                                                                                // 297
  return result;                                                                                                // 298
};                                                                                                              // 299
                                                                                                                // 300
// Options: `parentView`                                                                                        // 301
Blaze._HTMLJSExpander = HTML.TransformingVisitor.extend();                                                      // 302
Blaze._HTMLJSExpander.def({                                                                                     // 303
  visitObject: function (x) {                                                                                   // 304
    if (x instanceof Blaze.Template)                                                                            // 305
      x = x.constructView();                                                                                    // 306
    if (x instanceof Blaze.View)                                                                                // 307
      return Blaze._expandView(x, this.parentView);                                                             // 308
                                                                                                                // 309
    // this will throw an error; other objects are not allowed!                                                 // 310
    return HTML.TransformingVisitor.prototype.visitObject.call(this, x);                                        // 311
  },                                                                                                            // 312
  visitAttributes: function (attrs) {                                                                           // 313
    // expand dynamic attributes                                                                                // 314
    if (typeof attrs === 'function')                                                                            // 315
      attrs = Blaze._withCurrentView(this.parentView, attrs);                                                   // 316
                                                                                                                // 317
    // call super (e.g. for case where `attrs` is an array)                                                     // 318
    return HTML.TransformingVisitor.prototype.visitAttributes.call(this, attrs);                                // 319
  },                                                                                                            // 320
  visitAttribute: function (name, value, tag) {                                                                 // 321
    // expand attribute values that are functions.  Any attribute value                                         // 322
    // that contains Views must be wrapped in a function.                                                       // 323
    if (typeof value === 'function')                                                                            // 324
      value = Blaze._withCurrentView(this.parentView, value);                                                   // 325
                                                                                                                // 326
    return HTML.TransformingVisitor.prototype.visitAttribute.call(                                              // 327
      this, name, value, tag);                                                                                  // 328
  }                                                                                                             // 329
});                                                                                                             // 330
                                                                                                                // 331
// Return Blaze.currentView, but only if it is being rendered                                                   // 332
// (i.e. we are in its render() method).                                                                        // 333
var currentViewIfRendering = function () {                                                                      // 334
  var view = Blaze.currentView;                                                                                 // 335
  return (view && view._isInRender) ? view : null;                                                              // 336
};                                                                                                              // 337
                                                                                                                // 338
Blaze._expand = function (htmljs, parentView) {                                                                 // 339
  parentView = parentView || currentViewIfRendering();                                                          // 340
  return (new Blaze._HTMLJSExpander(                                                                            // 341
    {parentView: parentView})).visit(htmljs);                                                                   // 342
};                                                                                                              // 343
                                                                                                                // 344
Blaze._expandAttributes = function (attrs, parentView) {                                                        // 345
  parentView = parentView || currentViewIfRendering();                                                          // 346
  return (new Blaze._HTMLJSExpander(                                                                            // 347
    {parentView: parentView})).visitAttributes(attrs);                                                          // 348
};                                                                                                              // 349
                                                                                                                // 350
Blaze._destroyView = function (view, _skipNodes) {                                                              // 351
  if (view.isDestroyed)                                                                                         // 352
    return;                                                                                                     // 353
  view.isDestroyed = true;                                                                                      // 354
                                                                                                                // 355
  Blaze._fireCallbacks(view, 'destroyed');                                                                      // 356
                                                                                                                // 357
  // Destroy views and elements recursively.  If _skipNodes,                                                    // 358
  // only recurse up to views, not elements, for the case where                                                 // 359
  // the backend (jQuery) is recursing over the elements already.                                               // 360
                                                                                                                // 361
  if (view._domrange)                                                                                           // 362
    view._domrange.destroyMembers(_skipNodes);                                                                  // 363
};                                                                                                              // 364
                                                                                                                // 365
Blaze._destroyNode = function (node) {                                                                          // 366
  if (node.nodeType === 1)                                                                                      // 367
    Blaze._DOMBackend.Teardown.tearDownElement(node);                                                           // 368
};                                                                                                              // 369
                                                                                                                // 370
// Are the HTMLjs entities `a` and `b` the same?  We could be                                                   // 371
// more elaborate here but the point is to catch the most basic                                                 // 372
// cases.                                                                                                       // 373
Blaze._isContentEqual = function (a, b) {                                                                       // 374
  if (a instanceof HTML.Raw) {                                                                                  // 375
    return (b instanceof HTML.Raw) && (a.value === b.value);                                                    // 376
  } else if (a == null) {                                                                                       // 377
    return (b == null);                                                                                         // 378
  } else {                                                                                                      // 379
    return (a === b) &&                                                                                         // 380
      ((typeof a === 'number') || (typeof a === 'boolean') ||                                                   // 381
       (typeof a === 'string'));                                                                                // 382
  }                                                                                                             // 383
};                                                                                                              // 384
                                                                                                                // 385
Blaze.currentView = null;                                                                                       // 386
                                                                                                                // 387
Blaze._withCurrentView = function (view, func) {                                                                // 388
  var oldView = Blaze.currentView;                                                                              // 389
  try {                                                                                                         // 390
    Blaze.currentView = view;                                                                                   // 391
    return func();                                                                                              // 392
  } finally {                                                                                                   // 393
    Blaze.currentView = oldView;                                                                                // 394
  }                                                                                                             // 395
};                                                                                                              // 396
                                                                                                                // 397
// Blaze.render publicly takes a View or a Template.                                                            // 398
// Privately, it takes any HTMLJS (extended with Views and Templates)                                           // 399
// except null or undefined, or a function that returns any extended                                            // 400
// HTMLJS.                                                                                                      // 401
var checkRenderContent = function (content) {                                                                   // 402
  if (content === null)                                                                                         // 403
    throw new Error("Can't render null");                                                                       // 404
  if (typeof content === 'undefined')                                                                           // 405
    throw new Error("Can't render undefined");                                                                  // 406
                                                                                                                // 407
  if ((content instanceof Blaze.View) ||                                                                        // 408
      (content instanceof Blaze.Template) ||                                                                    // 409
      (typeof content === 'function'))                                                                          // 410
    return;                                                                                                     // 411
                                                                                                                // 412
  try {                                                                                                         // 413
    // Throw if content doesn't look like HTMLJS at the top level                                               // 414
    // (i.e. verify that this is an HTML.Tag, or an array,                                                      // 415
    // or a primitive, etc.)                                                                                    // 416
    (new HTML.Visitor).visit(content);                                                                          // 417
  } catch (e) {                                                                                                 // 418
    // Make error message suitable for public API                                                               // 419
    throw new Error("Expected Template or View");                                                               // 420
  }                                                                                                             // 421
};                                                                                                              // 422
                                                                                                                // 423
// For Blaze.render and Blaze.toHTML, take content and                                                          // 424
// wrap it in a View, unless it's a single View or                                                              // 425
// Template already.                                                                                            // 426
var contentAsView = function (content) {                                                                        // 427
  checkRenderContent(content);                                                                                  // 428
                                                                                                                // 429
  if (content instanceof Blaze.Template) {                                                                      // 430
    return content.constructView();                                                                             // 431
  } else if (content instanceof Blaze.View) {                                                                   // 432
    return content;                                                                                             // 433
  } else {                                                                                                      // 434
    var func = content;                                                                                         // 435
    if (typeof func !== 'function') {                                                                           // 436
      func = function () {                                                                                      // 437
        return content;                                                                                         // 438
      };                                                                                                        // 439
    }                                                                                                           // 440
    return Blaze.View('render', func);                                                                          // 441
  }                                                                                                             // 442
};                                                                                                              // 443
                                                                                                                // 444
// For Blaze.renderWithData and Blaze.toHTMLWithData, wrap content                                              // 445
// in a function, if necessary, so it can be a content arg to                                                   // 446
// a Blaze.With.                                                                                                // 447
var contentAsFunc = function (content) {                                                                        // 448
  checkRenderContent(content);                                                                                  // 449
                                                                                                                // 450
  if (typeof content !== 'function') {                                                                          // 451
    return function () {                                                                                        // 452
      return content;                                                                                           // 453
    };                                                                                                          // 454
  } else {                                                                                                      // 455
    return content;                                                                                             // 456
  }                                                                                                             // 457
};                                                                                                              // 458
                                                                                                                // 459
Blaze.render = function (content, parentElement, nextNode, parentView) {                                        // 460
  if (! parentElement) {                                                                                        // 461
    Blaze._warn("Blaze.render without a parent element is deprecated. " +                                       // 462
                "You must specify where to insert the rendered content.");                                      // 463
  }                                                                                                             // 464
                                                                                                                // 465
  if (nextNode instanceof Blaze.View) {                                                                         // 466
    // handle omitted nextNode                                                                                  // 467
    parentView = nextNode;                                                                                      // 468
    nextNode = null;                                                                                            // 469
  }                                                                                                             // 470
                                                                                                                // 471
  // parentElement must be a DOM node. in particular, can't be the                                              // 472
  // result of a call to `$`. Can't check if `parentElement instanceof                                          // 473
  // Node` since 'Node' is undefined in IE8.                                                                    // 474
  if (parentElement && typeof parentElement.nodeType !== 'number')                                              // 475
    throw new Error("'parentElement' must be a DOM node");                                                      // 476
  if (nextNode && typeof nextNode.nodeType !== 'number') // 'nextNode' is optional                              // 477
    throw new Error("'nextNode' must be a DOM node");                                                           // 478
                                                                                                                // 479
  parentView = parentView || currentViewIfRendering();                                                          // 480
                                                                                                                // 481
  var view = contentAsView(content);                                                                            // 482
  Blaze._materializeView(view, parentView);                                                                     // 483
                                                                                                                // 484
  if (parentElement) {                                                                                          // 485
    view._domrange.attach(parentElement, nextNode);                                                             // 486
  }                                                                                                             // 487
                                                                                                                // 488
  return view;                                                                                                  // 489
};                                                                                                              // 490
                                                                                                                // 491
Blaze.insert = function (view, parentElement, nextNode) {                                                       // 492
  Blaze._warn("Blaze.insert has been deprecated.  Specify where to insert the " +                               // 493
              "rendered content in the call to Blaze.render.");                                                 // 494
                                                                                                                // 495
  if (! (view && (view._domrange instanceof Blaze._DOMRange)))                                                  // 496
    throw new Error("Expected template rendered with UI.render");                                               // 497
                                                                                                                // 498
  view._domrange.attach(parentElement, nextNode);                                                               // 499
};                                                                                                              // 500
                                                                                                                // 501
Blaze.renderWithData = function (content, data, parentElement, nextNode, parentView) {                          // 502
  // We defer the handling of optional arguments to Blaze.render.  At this point,                               // 503
  // `nextNode` may actually be `parentView`.                                                                   // 504
  return Blaze.render(Blaze._TemplateWith(data, contentAsFunc(content)),                                        // 505
                      parentElement, nextNode, parentView);                                                     // 506
};                                                                                                              // 507
                                                                                                                // 508
Blaze.remove = function (view) {                                                                                // 509
  if (! (view && (view._domrange instanceof Blaze._DOMRange)))                                                  // 510
    throw new Error("Expected template rendered with UI.render");                                               // 511
                                                                                                                // 512
  if (! view.isDestroyed) {                                                                                     // 513
    var range = view._domrange;                                                                                 // 514
    if (range.attached && ! range.parentRange)                                                                  // 515
      range.detach();                                                                                           // 516
    range.destroy();                                                                                            // 517
  }                                                                                                             // 518
};                                                                                                              // 519
                                                                                                                // 520
Blaze.toHTML = function (content, parentView) {                                                                 // 521
  parentView = parentView || currentViewIfRendering();                                                          // 522
                                                                                                                // 523
  return HTML.toHTML(Blaze._expandView(contentAsView(content), parentView));                                    // 524
};                                                                                                              // 525
                                                                                                                // 526
Blaze.toHTMLWithData = function (content, data, parentView) {                                                   // 527
  parentView = parentView || currentViewIfRendering();                                                          // 528
                                                                                                                // 529
  return HTML.toHTML(Blaze._expandView(Blaze._TemplateWith(                                                     // 530
    data, contentAsFunc(content)), parentView));                                                                // 531
};                                                                                                              // 532
                                                                                                                // 533
Blaze._toText = function (htmljs, parentView, textMode) {                                                       // 534
  if (typeof htmljs === 'function')                                                                             // 535
    throw new Error("Blaze._toText doesn't take a function, just HTMLjs");                                      // 536
                                                                                                                // 537
  if ((parentView != null) && ! (parentView instanceof Blaze.View)) {                                           // 538
    // omitted parentView argument                                                                              // 539
    textMode = parentView;                                                                                      // 540
    parentView = null;                                                                                          // 541
  }                                                                                                             // 542
  parentView = parentView || currentViewIfRendering();                                                          // 543
                                                                                                                // 544
  if (! textMode)                                                                                               // 545
    throw new Error("textMode required");                                                                       // 546
  if (! (textMode === HTML.TEXTMODE.STRING ||                                                                   // 547
         textMode === HTML.TEXTMODE.RCDATA ||                                                                   // 548
         textMode === HTML.TEXTMODE.ATTRIBUTE))                                                                 // 549
    throw new Error("Unknown textMode: " + textMode);                                                           // 550
                                                                                                                // 551
  return HTML.toText(Blaze._expand(htmljs, parentView), textMode);                                              // 552
};                                                                                                              // 553
                                                                                                                // 554
Blaze.getData = function (elementOrView) {                                                                      // 555
  var theWith;                                                                                                  // 556
                                                                                                                // 557
  if (! elementOrView) {                                                                                        // 558
    theWith = Blaze.getView('with');                                                                            // 559
  } else if (elementOrView instanceof Blaze.View) {                                                             // 560
    var view = elementOrView;                                                                                   // 561
    theWith = (view.name === 'with' ? view :                                                                    // 562
               Blaze.getView(view, 'with'));                                                                    // 563
  } else if (typeof elementOrView.nodeType === 'number') {                                                      // 564
    if (elementOrView.nodeType !== 1)                                                                           // 565
      throw new Error("Expected DOM element");                                                                  // 566
    theWith = Blaze.getView(elementOrView, 'with');                                                             // 567
  } else {                                                                                                      // 568
    throw new Error("Expected DOM element or View");                                                            // 569
  }                                                                                                             // 570
                                                                                                                // 571
  return theWith ? theWith.dataVar.get() : null;                                                                // 572
};                                                                                                              // 573
                                                                                                                // 574
// For back-compat                                                                                              // 575
Blaze.getElementData = function (element) {                                                                     // 576
  Blaze._warn("Blaze.getElementData has been deprecated.  Use " +                                               // 577
              "Blaze.getData(element) instead.");                                                               // 578
                                                                                                                // 579
  if (element.nodeType !== 1)                                                                                   // 580
    throw new Error("Expected DOM element");                                                                    // 581
                                                                                                                // 582
  return Blaze.getData(element);                                                                                // 583
};                                                                                                              // 584
                                                                                                                // 585
// Both arguments are optional.                                                                                 // 586
Blaze.getView = function (elementOrView, _viewName) {                                                           // 587
  var viewName = _viewName;                                                                                     // 588
                                                                                                                // 589
  if ((typeof elementOrView) === 'string') {                                                                    // 590
    // omitted elementOrView; viewName present                                                                  // 591
    viewName = elementOrView;                                                                                   // 592
    elementOrView = null;                                                                                       // 593
  }                                                                                                             // 594
                                                                                                                // 595
  // We could eventually shorten the code by folding the logic                                                  // 596
  // from the other methods into this method.                                                                   // 597
  if (! elementOrView) {                                                                                        // 598
    return Blaze._getCurrentView(viewName);                                                                     // 599
  } else if (elementOrView instanceof Blaze.View) {                                                             // 600
    return Blaze._getParentView(elementOrView, viewName);                                                       // 601
  } else if (typeof elementOrView.nodeType === 'number') {                                                      // 602
    return Blaze._getElementView(elementOrView, viewName);                                                      // 603
  } else {                                                                                                      // 604
    throw new Error("Expected DOM element or View");                                                            // 605
  }                                                                                                             // 606
};                                                                                                              // 607
                                                                                                                // 608
// Gets the current view or its nearest ancestor of name                                                        // 609
// `name`.                                                                                                      // 610
Blaze._getCurrentView = function (name) {                                                                       // 611
  var view = Blaze.currentView;                                                                                 // 612
  // Better to fail in cases where it doesn't make sense                                                        // 613
  // to use Blaze._getCurrentView().  There will be a current                                                   // 614
  // view anywhere it does.  You can check Blaze.currentView                                                    // 615
  // if you want to know whether there is one or not.                                                           // 616
  if (! view)                                                                                                   // 617
    throw new Error("There is no current view");                                                                // 618
                                                                                                                // 619
  if (name) {                                                                                                   // 620
    while (view && view.name !== name)                                                                          // 621
      view = view.parentView;                                                                                   // 622
    return view || null;                                                                                        // 623
  } else {                                                                                                      // 624
    // Blaze._getCurrentView() with no arguments just returns                                                   // 625
    // Blaze.currentView.                                                                                       // 626
    return view;                                                                                                // 627
  }                                                                                                             // 628
};                                                                                                              // 629
                                                                                                                // 630
Blaze._getParentView = function (view, name) {                                                                  // 631
  var v = view.parentView;                                                                                      // 632
                                                                                                                // 633
  if (name) {                                                                                                   // 634
    while (v && v.name !== name)                                                                                // 635
      v = v.parentView;                                                                                         // 636
  }                                                                                                             // 637
                                                                                                                // 638
  return v || null;                                                                                             // 639
};                                                                                                              // 640
                                                                                                                // 641
Blaze._getElementView = function (elem, name) {                                                                 // 642
  var range = Blaze._DOMRange.forElement(elem);                                                                 // 643
  var view = null;                                                                                              // 644
  while (range && ! view) {                                                                                     // 645
    view = (range.view || null);                                                                                // 646
    if (! view) {                                                                                               // 647
      if (range.parentRange)                                                                                    // 648
        range = range.parentRange;                                                                              // 649
      else                                                                                                      // 650
        range = Blaze._DOMRange.forElement(range.parentElement);                                                // 651
    }                                                                                                           // 652
  }                                                                                                             // 653
                                                                                                                // 654
  if (name) {                                                                                                   // 655
    while (view && view.name !== name)                                                                          // 656
      view = view.parentView;                                                                                   // 657
    return view || null;                                                                                        // 658
  } else {                                                                                                      // 659
    return view;                                                                                                // 660
  }                                                                                                             // 661
};                                                                                                              // 662
                                                                                                                // 663
Blaze._addEventMap = function (view, eventMap, thisInHandler) {                                                 // 664
  thisInHandler = (thisInHandler || null);                                                                      // 665
  var handles = [];                                                                                             // 666
                                                                                                                // 667
  if (! view._domrange)                                                                                         // 668
    throw new Error("View must have a DOMRange");                                                               // 669
                                                                                                                // 670
  view._domrange.onAttached(function attached_eventMaps(range, element) {                                       // 671
    _.each(eventMap, function (handler, spec) {                                                                 // 672
      var clauses = spec.split(/,\s+/);                                                                         // 673
      // iterate over clauses of spec, e.g. ['click .foo', 'click .bar']                                        // 674
      _.each(clauses, function (clause) {                                                                       // 675
        var parts = clause.split(/\s+/);                                                                        // 676
        if (parts.length === 0)                                                                                 // 677
          return;                                                                                               // 678
                                                                                                                // 679
        var newEvents = parts.shift();                                                                          // 680
        var selector = parts.join(' ');                                                                         // 681
        handles.push(Blaze._EventSupport.listen(                                                                // 682
          element, newEvents, selector,                                                                         // 683
          function (evt) {                                                                                      // 684
            if (! range.containsElement(evt.currentTarget))                                                     // 685
              return null;                                                                                      // 686
            var handlerThis = thisInHandler || this;                                                            // 687
            var handlerArgs = arguments;                                                                        // 688
            return Blaze._withCurrentView(view, function () {                                                   // 689
              return handler.apply(handlerThis, handlerArgs);                                                   // 690
            });                                                                                                 // 691
          },                                                                                                    // 692
          range, function (r) {                                                                                 // 693
            return r.parentRange;                                                                               // 694
          }));                                                                                                  // 695
      });                                                                                                       // 696
    });                                                                                                         // 697
  });                                                                                                           // 698
                                                                                                                // 699
  view.onViewDestroyed(function () {                                                                            // 700
    _.each(handles, function (h) {                                                                              // 701
      h.stop();                                                                                                 // 702
    });                                                                                                         // 703
    handles.length = 0;                                                                                         // 704
  });                                                                                                           // 705
};                                                                                                              // 706
                                                                                                                // 707
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/builtins.js                                                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Blaze._calculateCondition = function (cond) {                                                                   // 1
  if (cond instanceof Array && cond.length === 0)                                                               // 2
    cond = false;                                                                                               // 3
  return !! cond;                                                                                               // 4
};                                                                                                              // 5
                                                                                                                // 6
Blaze.With = function (data, contentFunc) {                                                                     // 7
  var view = Blaze.View('with', contentFunc);                                                                   // 8
                                                                                                                // 9
  view.dataVar = new ReactiveVar;                                                                               // 10
                                                                                                                // 11
  view.onViewCreated(function () {                                                                              // 12
    if (typeof data === 'function') {                                                                           // 13
      // `data` is a reactive function                                                                          // 14
      view.autorun(function () {                                                                                // 15
        view.dataVar.set(data());                                                                               // 16
      }, view.parentView);                                                                                      // 17
    } else {                                                                                                    // 18
      view.dataVar.set(data);                                                                                   // 19
    }                                                                                                           // 20
  });                                                                                                           // 21
                                                                                                                // 22
  return view;                                                                                                  // 23
};                                                                                                              // 24
                                                                                                                // 25
Blaze.If = function (conditionFunc, contentFunc, elseFunc, _not) {                                              // 26
  var conditionVar = new ReactiveVar;                                                                           // 27
                                                                                                                // 28
  var view = Blaze.View(_not ? 'unless' : 'if', function () {                                                   // 29
    return conditionVar.get() ? contentFunc() :                                                                 // 30
      (elseFunc ? elseFunc() : null);                                                                           // 31
  });                                                                                                           // 32
  view.__conditionVar = conditionVar;                                                                           // 33
  view.onViewCreated(function () {                                                                              // 34
    this.autorun(function () {                                                                                  // 35
      var cond = Blaze._calculateCondition(conditionFunc());                                                    // 36
      conditionVar.set(_not ? (! cond) : cond);                                                                 // 37
    }, this.parentView);                                                                                        // 38
  });                                                                                                           // 39
                                                                                                                // 40
  return view;                                                                                                  // 41
};                                                                                                              // 42
                                                                                                                // 43
Blaze.Unless = function (conditionFunc, contentFunc, elseFunc) {                                                // 44
  return Blaze.If(conditionFunc, contentFunc, elseFunc, true /*_not*/);                                         // 45
};                                                                                                              // 46
                                                                                                                // 47
Blaze.Each = function (argFunc, contentFunc, elseFunc) {                                                        // 48
  var eachView = Blaze.View('each', function () {                                                               // 49
    var subviews = this.initialSubviews;                                                                        // 50
    this.initialSubviews = null;                                                                                // 51
    if (this._isCreatedForExpansion) {                                                                          // 52
      this.expandedValueDep = new Tracker.Dependency;                                                           // 53
      this.expandedValueDep.depend();                                                                           // 54
    }                                                                                                           // 55
    return subviews;                                                                                            // 56
  });                                                                                                           // 57
  eachView.initialSubviews = [];                                                                                // 58
  eachView.numItems = 0;                                                                                        // 59
  eachView.inElseMode = false;                                                                                  // 60
  eachView.stopHandle = null;                                                                                   // 61
  eachView.contentFunc = contentFunc;                                                                           // 62
  eachView.elseFunc = elseFunc;                                                                                 // 63
  eachView.argVar = new ReactiveVar;                                                                            // 64
                                                                                                                // 65
  eachView.onViewCreated(function () {                                                                          // 66
    // We evaluate argFunc in an autorun to make sure                                                           // 67
    // Blaze.currentView is always set when it runs (rather than                                                // 68
    // passing argFunc straight to ObserveSequence).                                                            // 69
    eachView.autorun(function () {                                                                              // 70
      eachView.argVar.set(argFunc());                                                                           // 71
    }, eachView.parentView);                                                                                    // 72
                                                                                                                // 73
    eachView.stopHandle = ObserveSequence.observe(function () {                                                 // 74
      return eachView.argVar.get();                                                                             // 75
    }, {                                                                                                        // 76
      addedAt: function (id, item, index) {                                                                     // 77
        Tracker.nonreactive(function () {                                                                       // 78
          var newItemView = Blaze.With(item, eachView.contentFunc);                                             // 79
          eachView.numItems++;                                                                                  // 80
                                                                                                                // 81
          if (eachView.expandedValueDep) {                                                                      // 82
            eachView.expandedValueDep.changed();                                                                // 83
          } else if (eachView._domrange) {                                                                      // 84
            if (eachView.inElseMode) {                                                                          // 85
              eachView._domrange.removeMember(0);                                                               // 86
              eachView.inElseMode = false;                                                                      // 87
            }                                                                                                   // 88
                                                                                                                // 89
            var range = Blaze._materializeView(newItemView, eachView);                                          // 90
            eachView._domrange.addMember(range, index);                                                         // 91
          } else {                                                                                              // 92
            eachView.initialSubviews.splice(index, 0, newItemView);                                             // 93
          }                                                                                                     // 94
        });                                                                                                     // 95
      },                                                                                                        // 96
      removedAt: function (id, item, index) {                                                                   // 97
        Tracker.nonreactive(function () {                                                                       // 98
          eachView.numItems--;                                                                                  // 99
          if (eachView.expandedValueDep) {                                                                      // 100
            eachView.expandedValueDep.changed();                                                                // 101
          } else if (eachView._domrange) {                                                                      // 102
            eachView._domrange.removeMember(index);                                                             // 103
            if (eachView.elseFunc && eachView.numItems === 0) {                                                 // 104
              eachView.inElseMode = true;                                                                       // 105
              eachView._domrange.addMember(                                                                     // 106
                Blaze._materializeView(                                                                         // 107
                  Blaze.View('each_else',eachView.elseFunc),                                                    // 108
                  eachView), 0);                                                                                // 109
            }                                                                                                   // 110
          } else {                                                                                              // 111
            eachView.initialSubviews.splice(index, 1);                                                          // 112
          }                                                                                                     // 113
        });                                                                                                     // 114
      },                                                                                                        // 115
      changedAt: function (id, newItem, oldItem, index) {                                                       // 116
        Tracker.nonreactive(function () {                                                                       // 117
          var itemView;                                                                                         // 118
          if (eachView.expandedValueDep) {                                                                      // 119
            eachView.expandedValueDep.changed();                                                                // 120
          } else if (eachView._domrange) {                                                                      // 121
            itemView = eachView._domrange.getMember(index).view;                                                // 122
          } else {                                                                                              // 123
            itemView = eachView.initialSubviews[index];                                                         // 124
          }                                                                                                     // 125
          itemView.dataVar.set(newItem);                                                                        // 126
        });                                                                                                     // 127
      },                                                                                                        // 128
      movedTo: function (id, item, fromIndex, toIndex) {                                                        // 129
        Tracker.nonreactive(function () {                                                                       // 130
          if (eachView.expandedValueDep) {                                                                      // 131
            eachView.expandedValueDep.changed();                                                                // 132
          } else if (eachView._domrange) {                                                                      // 133
            eachView._domrange.moveMember(fromIndex, toIndex);                                                  // 134
          } else {                                                                                              // 135
            var subviews = eachView.initialSubviews;                                                            // 136
            var itemView = subviews[fromIndex];                                                                 // 137
            subviews.splice(fromIndex, 1);                                                                      // 138
            subviews.splice(toIndex, 0, itemView);                                                              // 139
          }                                                                                                     // 140
        });                                                                                                     // 141
      }                                                                                                         // 142
    });                                                                                                         // 143
                                                                                                                // 144
    if (eachView.elseFunc && eachView.numItems === 0) {                                                         // 145
      eachView.inElseMode = true;                                                                               // 146
      eachView.initialSubviews[0] =                                                                             // 147
        Blaze.View('each_else', eachView.elseFunc);                                                             // 148
    }                                                                                                           // 149
  });                                                                                                           // 150
                                                                                                                // 151
  eachView.onViewDestroyed(function () {                                                                        // 152
    if (eachView.stopHandle)                                                                                    // 153
      eachView.stopHandle.stop();                                                                               // 154
  });                                                                                                           // 155
                                                                                                                // 156
  return eachView;                                                                                              // 157
};                                                                                                              // 158
                                                                                                                // 159
Blaze._TemplateWith = function (arg, contentBlock) {                                                            // 160
  var w;                                                                                                        // 161
                                                                                                                // 162
  var argFunc = arg;                                                                                            // 163
  if (typeof arg !== 'function') {                                                                              // 164
    argFunc = function () {                                                                                     // 165
      return arg;                                                                                               // 166
    };                                                                                                          // 167
  }                                                                                                             // 168
                                                                                                                // 169
  // This is a little messy.  When we compile `{{> UI.contentBlock}}`, we                                       // 170
  // wrap it in Blaze._InOuterTemplateScope in order to skip the intermediate                                   // 171
  // parent Views in the current template.  However, when there's an argument                                   // 172
  // (`{{> UI.contentBlock arg}}`), the argument needs to be evaluated                                          // 173
  // in the original scope.  There's no good order to nest                                                      // 174
  // Blaze._InOuterTemplateScope and Spacebars.TemplateWith to achieve this,                                    // 175
  // so we wrap argFunc to run it in the "original parentView" of the                                           // 176
  // Blaze._InOuterTemplateScope.                                                                               // 177
  //                                                                                                            // 178
  // To make this better, reconsider _InOuterTemplateScope as a primitive.                                      // 179
  // Longer term, evaluate expressions in the proper lexical scope.                                             // 180
  var wrappedArgFunc = function () {                                                                            // 181
    var viewToEvaluateArg = null;                                                                               // 182
    if (w.parentView && w.parentView.name === 'InOuterTemplateScope') {                                         // 183
      viewToEvaluateArg = w.parentView.originalParentView;                                                      // 184
    }                                                                                                           // 185
    if (viewToEvaluateArg) {                                                                                    // 186
      return Blaze._withCurrentView(viewToEvaluateArg, argFunc);                                                // 187
    } else {                                                                                                    // 188
      return argFunc();                                                                                         // 189
    }                                                                                                           // 190
  };                                                                                                            // 191
                                                                                                                // 192
  w = Blaze.With(wrappedArgFunc, contentBlock);                                                                 // 193
  w.__isTemplateWith = true;                                                                                    // 194
  return w;                                                                                                     // 195
};                                                                                                              // 196
                                                                                                                // 197
Blaze._InOuterTemplateScope = function (templateView, contentFunc) {                                            // 198
  var view = Blaze.View('InOuterTemplateScope', contentFunc);                                                   // 199
  var parentView = templateView.parentView;                                                                     // 200
                                                                                                                // 201
  // Hack so that if you call `{{> foo bar}}` and it expands into                                               // 202
  // `{{#with bar}}{{> foo}}{{/with}}`, and then `foo` is a template                                            // 203
  // that inserts `{{> UI.contentBlock}}`, the data context for                                                 // 204
  // `UI.contentBlock` is not `bar` but the one enclosing that.                                                 // 205
  if (parentView.__isTemplateWith)                                                                              // 206
    parentView = parentView.parentView;                                                                         // 207
                                                                                                                // 208
  view.onViewCreated(function () {                                                                              // 209
    this.originalParentView = this.parentView;                                                                  // 210
    this.parentView = parentView;                                                                               // 211
  });                                                                                                           // 212
  return view;                                                                                                  // 213
};                                                                                                              // 214
                                                                                                                // 215
// XXX COMPAT WITH 0.9.0                                                                                        // 216
Blaze.InOuterTemplateScope = Blaze._InOuterTemplateScope;                                                       // 217
                                                                                                                // 218
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/lookup.js                                                                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Blaze._globalHelpers = {};                                                                                      // 1
                                                                                                                // 2
// Documented as Template.registerHelper.                                                                       // 3
// This definition also provides back-compat for `UI.registerHelper`.                                           // 4
Blaze.registerHelper = function (name, func) {                                                                  // 5
  Blaze._globalHelpers[name] = func;                                                                            // 6
};                                                                                                              // 7
                                                                                                                // 8
                                                                                                                // 9
var bindIfIsFunction = function (x, target) {                                                                   // 10
  if (typeof x !== 'function')                                                                                  // 11
    return x;                                                                                                   // 12
  return function () {                                                                                          // 13
    return x.apply(target, arguments);                                                                          // 14
  };                                                                                                            // 15
};                                                                                                              // 16
                                                                                                                // 17
// If `x` is a function, binds the value of `this` for that function                                            // 18
// to the current data context.                                                                                 // 19
var bindDataContext = function (x) {                                                                            // 20
  if (typeof x === 'function') {                                                                                // 21
    return function () {                                                                                        // 22
      var data = Blaze.getData();                                                                               // 23
      if (data == null)                                                                                         // 24
        data = {};                                                                                              // 25
      return x.apply(data, arguments);                                                                          // 26
    };                                                                                                          // 27
  }                                                                                                             // 28
  return x;                                                                                                     // 29
};                                                                                                              // 30
                                                                                                                // 31
var wrapHelper = function (f) {                                                                                 // 32
  return Blaze._wrapCatchingExceptions(f, 'template helper');                                                   // 33
};                                                                                                              // 34
                                                                                                                // 35
// Looks up a name, like "foo" or "..", as a helper of the                                                      // 36
// current template; a global helper; the name of a template;                                                   // 37
// or a property of the data context.  Called on the View of                                                    // 38
// a template (i.e. a View with a `.template` property,                                                         // 39
// where the helpers are).  Used for the first name in a                                                        // 40
// "path" in a template tag, like "foo" in `{{foo.bar}}` or                                                     // 41
// ".." in `{{frobulate ../blah}}`.                                                                             // 42
//                                                                                                              // 43
// Returns a function, a non-function value, or null.  If                                                       // 44
// a function is found, it is bound appropriately.                                                              // 45
//                                                                                                              // 46
// NOTE: This function must not establish any reactive                                                          // 47
// dependencies itself.  If there is any reactivity in the                                                      // 48
// value, lookup should return a function.                                                                      // 49
Blaze.View.prototype.lookup = function (name, _options) {                                                       // 50
  var template = this.template;                                                                                 // 51
  var lookupTemplate = _options && _options.template;                                                           // 52
                                                                                                                // 53
  if (/^\./.test(name)) {                                                                                       // 54
    // starts with a dot. must be a series of dots which maps to an                                             // 55
    // ancestor of the appropriate height.                                                                      // 56
    if (!/^(\.)+$/.test(name))                                                                                  // 57
      throw new Error("id starting with dot must be a series of dots");                                         // 58
                                                                                                                // 59
    return Blaze._parentData(name.length - 1, true /*_functionWrapped*/);                                       // 60
                                                                                                                // 61
  } else if (template && (name in template)) {                                                                  // 62
    return wrapHelper(bindDataContext(template[name]));                                                         // 63
  } else if (lookupTemplate && (name in Blaze.Template) &&                                                      // 64
             (Blaze.Template[name] instanceof Blaze.Template)) {                                                // 65
    return Blaze.Template[name];                                                                                // 66
  } else if (UI._globalHelpers[name]) {                                                                         // 67
    return wrapHelper(bindDataContext(UI._globalHelpers[name]));                                                // 68
  } else {                                                                                                      // 69
    return function () {                                                                                        // 70
      var isCalledAsFunction = (arguments.length > 0);                                                          // 71
      var data = Blaze.getData();                                                                               // 72
      if (lookupTemplate && ! (data && data[name])) {                                                           // 73
        throw new Error("No such template: " + name);                                                           // 74
      }                                                                                                         // 75
      if (isCalledAsFunction && ! (data && data[name])) {                                                       // 76
        throw new Error("No such function: " + name);                                                           // 77
      }                                                                                                         // 78
      if (! data)                                                                                               // 79
        return null;                                                                                            // 80
      var x = data[name];                                                                                       // 81
      if (typeof x !== 'function') {                                                                            // 82
        if (isCalledAsFunction) {                                                                               // 83
          throw new Error("Can't call non-function: " + x);                                                     // 84
        }                                                                                                       // 85
        return x;                                                                                               // 86
      }                                                                                                         // 87
      return x.apply(data, arguments);                                                                          // 88
    };                                                                                                          // 89
  }                                                                                                             // 90
  return null;                                                                                                  // 91
};                                                                                                              // 92
                                                                                                                // 93
// Implement Spacebars' {{../..}}.                                                                              // 94
// @param height {Number} The number of '..'s                                                                   // 95
Blaze._parentData = function (height, _functionWrapped) {                                                       // 96
  var theWith = Blaze.getView('with');                                                                          // 97
  for (var i = 0; (i < height) && theWith; i++) {                                                               // 98
    theWith = Blaze.getView(theWith, 'with');                                                                   // 99
  }                                                                                                             // 100
                                                                                                                // 101
  if (! theWith)                                                                                                // 102
    return null;                                                                                                // 103
  if (_functionWrapped)                                                                                         // 104
    return function () { return theWith.dataVar.get(); };                                                       // 105
  return theWith.dataVar.get();                                                                                 // 106
};                                                                                                              // 107
                                                                                                                // 108
                                                                                                                // 109
Blaze.View.prototype.lookupTemplate = function (name) {                                                         // 110
  return this.lookup(name, {template:true});                                                                    // 111
};                                                                                                              // 112
                                                                                                                // 113
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/template.js                                                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
// [new] Blaze.Template([viewName], renderFunction)                                                             // 1
//                                                                                                              // 2
// `Blaze.Template` is the class of templates, like `Template.foo` in                                           // 3
// Meteor, which is `instanceof Template`.                                                                      // 4
//                                                                                                              // 5
// `viewKind` is a string that looks like "Template.foo" for templates                                          // 6
// defined by the compiler.                                                                                     // 7
Blaze.Template = function (viewName, renderFunction) {                                                          // 8
  if (! (this instanceof Blaze.Template))                                                                       // 9
    // called without `new`                                                                                     // 10
    return new Blaze.Template(viewName, renderFunction);                                                        // 11
                                                                                                                // 12
  if (typeof viewName === 'function') {                                                                         // 13
    // omitted "viewName" argument                                                                              // 14
    renderFunction = viewName;                                                                                  // 15
    viewName = '';                                                                                              // 16
  }                                                                                                             // 17
  if (typeof viewName !== 'string')                                                                             // 18
    throw new Error("viewName must be a String (or omitted)");                                                  // 19
  if (typeof renderFunction !== 'function')                                                                     // 20
    throw new Error("renderFunction must be a function");                                                       // 21
                                                                                                                // 22
  this.viewName = viewName;                                                                                     // 23
  this.renderFunction = renderFunction;                                                                         // 24
                                                                                                                // 25
  this.__eventMaps = [];                                                                                        // 26
};                                                                                                              // 27
var Template = Blaze.Template;                                                                                  // 28
                                                                                                                // 29
Blaze.isTemplate = function (t) {                                                                               // 30
  return (t instanceof Blaze.Template);                                                                         // 31
};                                                                                                              // 32
                                                                                                                // 33
Template.prototype.constructView = function (contentFunc, elseFunc) {                                           // 34
  var self = this;                                                                                              // 35
  var view = Blaze.View(self.viewName, self.renderFunction);                                                    // 36
  view.template = self;                                                                                         // 37
                                                                                                                // 38
  view.templateContentBlock = (                                                                                 // 39
    contentFunc ? new Template('(contentBlock)', contentFunc) : null);                                          // 40
  view.templateElseBlock = (                                                                                    // 41
    elseFunc ? new Template('(elseBlock)', elseFunc) : null);                                                   // 42
                                                                                                                // 43
  if (self.__eventMaps || typeof self.events === 'object') {                                                    // 44
    view._onViewRendered(function () {                                                                          // 45
      if (view.renderCount !== 1)                                                                               // 46
        return;                                                                                                 // 47
                                                                                                                // 48
      if (! self.__eventMaps.length && typeof self.events === "object") {                                       // 49
        // Provide limited back-compat support for `.events = {...}`                                            // 50
        // syntax.  Pass `template.events` to the original `.events(...)`                                       // 51
        // function.  This code must run only once per template, in                                             // 52
        // order to not bind the handlers more than once, which is                                              // 53
        // ensured by the fact that we only do this when `__eventMaps`                                          // 54
        // is falsy, and we cause it to be set now.                                                             // 55
        Template.prototype.events.call(self, self.events);                                                      // 56
      }                                                                                                         // 57
                                                                                                                // 58
      _.each(self.__eventMaps, function (m) {                                                                   // 59
        Blaze._addEventMap(view, m, view);                                                                      // 60
      });                                                                                                       // 61
    });                                                                                                         // 62
  }                                                                                                             // 63
                                                                                                                // 64
  view._templateInstance = new Blaze.TemplateInstance(view);                                                    // 65
  view.templateInstance = function () {                                                                         // 66
    // Update data, firstNode, and lastNode, and return the TemplateInstance                                    // 67
    // object.                                                                                                  // 68
    var inst = view._templateInstance;                                                                          // 69
                                                                                                                // 70
    inst.data = Blaze.getData(view);                                                                            // 71
                                                                                                                // 72
    if (view._domrange && !view.isDestroyed) {                                                                  // 73
      inst.firstNode = view._domrange.firstNode();                                                              // 74
      inst.lastNode = view._domrange.lastNode();                                                                // 75
    } else {                                                                                                    // 76
      // on 'created' or 'destroyed' callbacks we don't have a DomRange                                         // 77
      inst.firstNode = null;                                                                                    // 78
      inst.lastNode = null;                                                                                     // 79
    }                                                                                                           // 80
                                                                                                                // 81
    return inst;                                                                                                // 82
  };                                                                                                            // 83
                                                                                                                // 84
  if (self.created) {                                                                                           // 85
    view.onViewCreated(function () {                                                                            // 86
      self.created.call(view.templateInstance());                                                               // 87
    });                                                                                                         // 88
  }                                                                                                             // 89
                                                                                                                // 90
  if (self.rendered) {                                                                                          // 91
    view.onViewReady(function () {                                                                              // 92
      self.rendered.call(view.templateInstance());                                                              // 93
    });                                                                                                         // 94
  }                                                                                                             // 95
                                                                                                                // 96
  if (self.destroyed) {                                                                                         // 97
    view.onViewDestroyed(function () {                                                                          // 98
      self.destroyed.call(view.templateInstance());                                                             // 99
    });                                                                                                         // 100
  }                                                                                                             // 101
                                                                                                                // 102
  return view;                                                                                                  // 103
};                                                                                                              // 104
                                                                                                                // 105
Blaze.TemplateInstance = function (view) {                                                                      // 106
  if (! (this instanceof Blaze.TemplateInstance))                                                               // 107
    // called without `new`                                                                                     // 108
    return new Blaze.TemplateInstance(view);                                                                    // 109
                                                                                                                // 110
  if (! (view instanceof Blaze.View))                                                                           // 111
    throw new Error("View required");                                                                           // 112
                                                                                                                // 113
  view._templateInstance = this;                                                                                // 114
  this.view = view;                                                                                             // 115
  this.data = null;                                                                                             // 116
  this.firstNode = null;                                                                                        // 117
  this.lastNode = null;                                                                                         // 118
};                                                                                                              // 119
                                                                                                                // 120
Blaze.TemplateInstance.prototype.$ = function (selector) {                                                      // 121
  var view = this.view;                                                                                         // 122
  if (! view._domrange)                                                                                         // 123
    throw new Error("Can't use $ on template instance with no DOM");                                            // 124
  return view._domrange.$(selector);                                                                            // 125
};                                                                                                              // 126
                                                                                                                // 127
Blaze.TemplateInstance.prototype.findAll = function (selector) {                                                // 128
  return Array.prototype.slice.call(this.$(selector));                                                          // 129
};                                                                                                              // 130
                                                                                                                // 131
Blaze.TemplateInstance.prototype.find = function (selector) {                                                   // 132
  var result = this.$(selector);                                                                                // 133
  return result[0] || null;                                                                                     // 134
};                                                                                                              // 135
                                                                                                                // 136
Blaze.TemplateInstance.prototype.autorun = function (f) {                                                       // 137
  return this.view.autorun(f);                                                                                  // 138
};                                                                                                              // 139
                                                                                                                // 140
Template.prototype.helpers = function (dict) {                                                                  // 141
  for (var k in dict)                                                                                           // 142
    this[k] = dict[k];                                                                                          // 143
};                                                                                                              // 144
                                                                                                                // 145
Template.prototype.events = function (eventMap) {                                                               // 146
  var template = this;                                                                                          // 147
  var eventMap2 = {};                                                                                           // 148
  for (var k in eventMap) {                                                                                     // 149
    eventMap2[k] = (function (k, v) {                                                                           // 150
      return function (event/*, ...*/) {                                                                        // 151
        var view = this; // passed by EventAugmenter                                                            // 152
        var data = Blaze.getData(event.currentTarget);                                                          // 153
        if (data == null)                                                                                       // 154
          data = {};                                                                                            // 155
        var args = Array.prototype.slice.call(arguments);                                                       // 156
        var tmplInstance = view.templateInstance();                                                             // 157
        args.splice(1, 0, tmplInstance);                                                                        // 158
        return v.apply(data, args);                                                                             // 159
      };                                                                                                        // 160
    })(k, eventMap[k]);                                                                                         // 161
  }                                                                                                             // 162
                                                                                                                // 163
  template.__eventMaps.push(eventMap2);                                                                         // 164
};                                                                                                              // 165
                                                                                                                // 166
Template.instance = function () {                                                                               // 167
  var view = Blaze.currentView;                                                                                 // 168
                                                                                                                // 169
  while (view && ! view.template)                                                                               // 170
    view = view.parentView;                                                                                     // 171
                                                                                                                // 172
  if (! view)                                                                                                   // 173
    return null;                                                                                                // 174
                                                                                                                // 175
  return view.templateInstance();                                                                               // 176
};                                                                                                              // 177
                                                                                                                // 178
// Note: Template.currentData() is documented to take zero arguments,                                           // 179
// while Blaze.getData takes up to one.                                                                         // 180
Template.currentData = Blaze.getData;                                                                           // 181
                                                                                                                // 182
Template.parentData = Blaze._parentData;                                                                        // 183
                                                                                                                // 184
Template.registerHelper = Blaze.registerHelper;                                                                 // 185
                                                                                                                // 186
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/blaze/backcompat.js                                                                                 //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
UI = Blaze;                                                                                                     // 1
                                                                                                                // 2
Blaze.ReactiveVar = ReactiveVar;                                                                                // 3
UI._templateInstance = Blaze.Template.instance;                                                                 // 4
                                                                                                                // 5
Handlebars = {};                                                                                                // 6
Handlebars.registerHelper = Blaze.registerHelper;                                                               // 7
                                                                                                                // 8
Handlebars._escape = Blaze._escape;                                                                             // 9
                                                                                                                // 10
// Return these from {{...}} helpers to achieve the same as returning                                           // 11
// strings from {{{...}}} helpers                                                                               // 12
Handlebars.SafeString = function(string) {                                                                      // 13
  this.string = string;                                                                                         // 14
};                                                                                                              // 15
Handlebars.SafeString.prototype.toString = function() {                                                         // 16
  return this.string.toString();                                                                                // 17
};                                                                                                              // 18
                                                                                                                // 19
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.blaze = {
  Blaze: Blaze,
  UI: UI,
  Handlebars: Handlebars
};

})();
