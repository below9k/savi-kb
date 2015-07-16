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

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/dsyko:jquery-ui-touch-punch/touch-punch/jquery.ui.touch-punch.js          //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
/*!                                                                                   // 1
 * jQuery UI Touch Punch 0.2.3                                                        // 2
 *                                                                                    // 3
 * Copyright 2011–2014, Dave Furfero                                                  // 4
 * Dual licensed under the MIT or GPL Version 2 licenses.                             // 5
 *                                                                                    // 6
 * Depends:                                                                           // 7
 *  jquery.ui.widget.js                                                               // 8
 *  jquery.ui.mouse.js                                                                // 9
 */                                                                                   // 10
(function ($) {                                                                       // 11
                                                                                      // 12
  // Detect touch support                                                             // 13
  $.support.touch = 'ontouchend' in document;                                         // 14
                                                                                      // 15
  // Ignore browsers without touch support                                            // 16
  if (!$.support.touch) {                                                             // 17
    return;                                                                           // 18
  }                                                                                   // 19
                                                                                      // 20
  var mouseProto = $.ui.mouse.prototype,                                              // 21
      _mouseInit = mouseProto._mouseInit,                                             // 22
      _mouseDestroy = mouseProto._mouseDestroy,                                       // 23
      touchHandled;                                                                   // 24
                                                                                      // 25
  /**                                                                                 // 26
   * Simulate a mouse event based on a corresponding touch event                      // 27
   * @param {Object} event A touch event                                              // 28
   * @param {String} simulatedType The corresponding mouse event                      // 29
   */                                                                                 // 30
  function simulateMouseEvent (event, simulatedType) {                                // 31
                                                                                      // 32
    // Ignore multi-touch events                                                      // 33
    if (event.originalEvent.touches.length > 1) {                                     // 34
      return;                                                                         // 35
    }                                                                                 // 36
                                                                                      // 37
    event.preventDefault();                                                           // 38
                                                                                      // 39
    var touch = event.originalEvent.changedTouches[0],                                // 40
        simulatedEvent = document.createEvent('MouseEvents');                         // 41
                                                                                      // 42
    // Initialize the simulated mouse event using the touch event's coordinates       // 43
    simulatedEvent.initMouseEvent(                                                    // 44
      simulatedType,    // type                                                       // 45
      true,             // bubbles                                                    // 46
      true,             // cancelable                                                 // 47
      window,           // view                                                       // 48
      1,                // detail                                                     // 49
      touch.screenX,    // screenX                                                    // 50
      touch.screenY,    // screenY                                                    // 51
      touch.clientX,    // clientX                                                    // 52
      touch.clientY,    // clientY                                                    // 53
      false,            // ctrlKey                                                    // 54
      false,            // altKey                                                     // 55
      false,            // shiftKey                                                   // 56
      false,            // metaKey                                                    // 57
      0,                // button                                                     // 58
      null              // relatedTarget                                              // 59
    );                                                                                // 60
                                                                                      // 61
    // Dispatch the simulated event to the target element                             // 62
    event.target.dispatchEvent(simulatedEvent);                                       // 63
  }                                                                                   // 64
                                                                                      // 65
  /**                                                                                 // 66
   * Handle the jQuery UI widget's touchstart events                                  // 67
   * @param {Object} event The widget element's touchstart event                      // 68
   */                                                                                 // 69
  mouseProto._touchStart = function (event) {                                         // 70
                                                                                      // 71
    var self = this;                                                                  // 72
                                                                                      // 73
    // Ignore the event if another widget is already being handled                    // 74
    if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) { // 75
      return;                                                                         // 76
    }                                                                                 // 77
                                                                                      // 78
    // Set the flag to prevent other widgets from inheriting the touch event          // 79
    touchHandled = true;                                                              // 80
                                                                                      // 81
    // Track movement to determine if interaction was a click                         // 82
    self._touchMoved = false;                                                         // 83
                                                                                      // 84
    // Simulate the mouseover event                                                   // 85
    simulateMouseEvent(event, 'mouseover');                                           // 86
                                                                                      // 87
    // Simulate the mousemove event                                                   // 88
    simulateMouseEvent(event, 'mousemove');                                           // 89
                                                                                      // 90
    // Simulate the mousedown event                                                   // 91
    simulateMouseEvent(event, 'mousedown');                                           // 92
  };                                                                                  // 93
                                                                                      // 94
  /**                                                                                 // 95
   * Handle the jQuery UI widget's touchmove events                                   // 96
   * @param {Object} event The document's touchmove event                             // 97
   */                                                                                 // 98
  mouseProto._touchMove = function (event) {                                          // 99
                                                                                      // 100
    // Ignore event if not handled                                                    // 101
    if (!touchHandled) {                                                              // 102
      return;                                                                         // 103
    }                                                                                 // 104
                                                                                      // 105
    // Interaction was not a click                                                    // 106
    this._touchMoved = true;                                                          // 107
                                                                                      // 108
    // Simulate the mousemove event                                                   // 109
    simulateMouseEvent(event, 'mousemove');                                           // 110
  };                                                                                  // 111
                                                                                      // 112
  /**                                                                                 // 113
   * Handle the jQuery UI widget's touchend events                                    // 114
   * @param {Object} event The document's touchend event                              // 115
   */                                                                                 // 116
  mouseProto._touchEnd = function (event) {                                           // 117
                                                                                      // 118
    // Ignore event if not handled                                                    // 119
    if (!touchHandled) {                                                              // 120
      return;                                                                         // 121
    }                                                                                 // 122
                                                                                      // 123
    // Simulate the mouseup event                                                     // 124
    simulateMouseEvent(event, 'mouseup');                                             // 125
                                                                                      // 126
    // Simulate the mouseout event                                                    // 127
    simulateMouseEvent(event, 'mouseout');                                            // 128
                                                                                      // 129
    // If the touch interaction did not move, it should trigger a click               // 130
    if (!this._touchMoved) {                                                          // 131
                                                                                      // 132
      // Simulate the click event                                                     // 133
      simulateMouseEvent(event, 'click');                                             // 134
    }                                                                                 // 135
                                                                                      // 136
    // Unset the flag to allow other widgets to inherit the touch event               // 137
    touchHandled = false;                                                             // 138
  };                                                                                  // 139
                                                                                      // 140
  /**                                                                                 // 141
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.        // 142
   * This method extends the widget with bound touch event handlers that              // 143
   * translate touch events to mouse events and pass them to the widget's             // 144
   * original mouse event handling methods.                                           // 145
   */                                                                                 // 146
  mouseProto._mouseInit = function () {                                               // 147
                                                                                      // 148
    var self = this;                                                                  // 149
                                                                                      // 150
    // Delegate the touch handlers to the widget's element                            // 151
    self.element.bind({                                                               // 152
      touchstart: $.proxy(self, '_touchStart'),                                       // 153
      touchmove: $.proxy(self, '_touchMove'),                                         // 154
      touchend: $.proxy(self, '_touchEnd')                                            // 155
    });                                                                               // 156
                                                                                      // 157
    // Call the original $.ui.mouse init method                                       // 158
    _mouseInit.call(self);                                                            // 159
  };                                                                                  // 160
                                                                                      // 161
  /**                                                                                 // 162
   * Remove the touch event handlers                                                  // 163
   */                                                                                 // 164
  mouseProto._mouseDestroy = function () {                                            // 165
                                                                                      // 166
    var self = this;                                                                  // 167
                                                                                      // 168
    // Delegate the touch handlers to the widget's element                            // 169
    self.element.unbind({                                                             // 170
      touchstart: $.proxy(self, '_touchStart'),                                       // 171
      touchmove: $.proxy(self, '_touchMove'),                                         // 172
      touchend: $.proxy(self, '_touchEnd')                                            // 173
    });                                                                               // 174
                                                                                      // 175
    // Call the original $.ui.mouse destroy method                                    // 176
    _mouseDestroy.call(self);                                                         // 177
  };                                                                                  // 178
                                                                                      // 179
})(jQuery);                                                                           // 180
////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dsyko:jquery-ui-touch-punch'] = {};

})();
