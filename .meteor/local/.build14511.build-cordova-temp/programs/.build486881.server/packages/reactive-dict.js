(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;

/* Package-scope variables */
var ReactiveDict;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/reactive-dict/reactive-dict.js                                              //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
// XXX come up with a serialization method which canonicalizes object key               // 1
// order, which would allow us to use objects as values for equals.                     // 2
var stringify = function (value) {                                                      // 3
  if (value === undefined)                                                              // 4
    return 'undefined';                                                                 // 5
  return EJSON.stringify(value);                                                        // 6
};                                                                                      // 7
var parse = function (serialized) {                                                     // 8
  if (serialized === undefined || serialized === 'undefined')                           // 9
    return undefined;                                                                   // 10
  return EJSON.parse(serialized);                                                       // 11
};                                                                                      // 12
                                                                                        // 13
// migrationData, if present, should be data previously returned from                   // 14
// getMigrationData()                                                                   // 15
ReactiveDict = function (migrationData) {                                               // 16
  this.keys = migrationData || {}; // key -> value                                      // 17
  this.keyDeps = {}; // key -> Dependency                                               // 18
  this.keyValueDeps = {}; // key -> Dependency                                          // 19
};                                                                                      // 20
                                                                                        // 21
_.extend(ReactiveDict.prototype, {                                                      // 22
  set: function (key, value) {                                                          // 23
    var self = this;                                                                    // 24
                                                                                        // 25
    value = stringify(value);                                                           // 26
                                                                                        // 27
    var oldSerializedValue = 'undefined';                                               // 28
    if (_.has(self.keys, key)) oldSerializedValue = self.keys[key];                     // 29
    if (value === oldSerializedValue)                                                   // 30
      return;                                                                           // 31
    self.keys[key] = value;                                                             // 32
                                                                                        // 33
    var changed = function (v) {                                                        // 34
      v && v.changed();                                                                 // 35
    };                                                                                  // 36
                                                                                        // 37
    changed(self.keyDeps[key]);                                                         // 38
    if (self.keyValueDeps[key]) {                                                       // 39
      changed(self.keyValueDeps[key][oldSerializedValue]);                              // 40
      changed(self.keyValueDeps[key][value]);                                           // 41
    }                                                                                   // 42
  },                                                                                    // 43
                                                                                        // 44
  setDefault: function (key, value) {                                                   // 45
    var self = this;                                                                    // 46
    // for now, explicitly check for undefined, since there is no                       // 47
    // ReactiveDict.clear().  Later we might have a ReactiveDict.clear(), in which case // 48
    // we should check if it has the key.                                               // 49
    if (self.keys[key] === undefined) {                                                 // 50
      self.set(key, value);                                                             // 51
    }                                                                                   // 52
  },                                                                                    // 53
                                                                                        // 54
  get: function (key) {                                                                 // 55
    var self = this;                                                                    // 56
    self._ensureKey(key);                                                               // 57
    self.keyDeps[key].depend();                                                         // 58
    return parse(self.keys[key]);                                                       // 59
  },                                                                                    // 60
                                                                                        // 61
  equals: function (key, value) {                                                       // 62
    var self = this;                                                                    // 63
                                                                                        // 64
    // Mongo.ObjectID is in the 'mongo' package                                         // 65
    var ObjectID = null;                                                                // 66
    if (typeof Mongo !== 'undefined') {                                                 // 67
      ObjectID = Mongo.ObjectID;                                                        // 68
    }                                                                                   // 69
                                                                                        // 70
    // We don't allow objects (or arrays that might include objects) for                // 71
    // .equals, because JSON.stringify doesn't canonicalize object key                  // 72
    // order. (We can make equals have the right return value by parsing the            // 73
    // current value and using EJSON.equals, but we won't have a canonical              // 74
    // element of keyValueDeps[key] to store the dependency.) You can still use         // 75
    // "EJSON.equals(reactiveDict.get(key), value)".                                    // 76
    //                                                                                  // 77
    // XXX we could allow arrays as long as we recursively check that there             // 78
    // are no objects                                                                   // 79
    if (typeof value !== 'string' &&                                                    // 80
        typeof value !== 'number' &&                                                    // 81
        typeof value !== 'boolean' &&                                                   // 82
        typeof value !== 'undefined' &&                                                 // 83
        !(value instanceof Date) &&                                                     // 84
        !(ObjectID && value instanceof ObjectID) &&                                     // 85
        value !== null)                                                                 // 86
      throw new Error("ReactiveDict.equals: value must be scalar");                     // 87
    var serializedValue = stringify(value);                                             // 88
                                                                                        // 89
    if (Tracker.active) {                                                               // 90
      self._ensureKey(key);                                                             // 91
                                                                                        // 92
      if (! _.has(self.keyValueDeps[key], serializedValue))                             // 93
        self.keyValueDeps[key][serializedValue] = new Tracker.Dependency;               // 94
                                                                                        // 95
      var isNew = self.keyValueDeps[key][serializedValue].depend();                     // 96
      if (isNew) {                                                                      // 97
        Tracker.onInvalidate(function () {                                              // 98
          // clean up [key][serializedValue] if it's now empty, so we don't             // 99
          // use O(n) memory for n = values seen ever                                   // 100
          if (! self.keyValueDeps[key][serializedValue].hasDependents())                // 101
            delete self.keyValueDeps[key][serializedValue];                             // 102
        });                                                                             // 103
      }                                                                                 // 104
    }                                                                                   // 105
                                                                                        // 106
    var oldValue = undefined;                                                           // 107
    if (_.has(self.keys, key)) oldValue = parse(self.keys[key]);                        // 108
    return EJSON.equals(oldValue, value);                                               // 109
  },                                                                                    // 110
                                                                                        // 111
  _ensureKey: function (key) {                                                          // 112
    var self = this;                                                                    // 113
    if (!(key in self.keyDeps)) {                                                       // 114
      self.keyDeps[key] = new Tracker.Dependency;                                       // 115
      self.keyValueDeps[key] = {};                                                      // 116
    }                                                                                   // 117
  },                                                                                    // 118
                                                                                        // 119
  // Get a JSON value that can be passed to the constructor to                          // 120
  // create a new ReactiveDict with the same contents as this one                       // 121
  getMigrationData: function () {                                                       // 122
    // XXX sanitize and make sure it's JSONible?                                        // 123
    return this.keys;                                                                   // 124
  }                                                                                     // 125
});                                                                                     // 126
                                                                                        // 127
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['reactive-dict'] = {
  ReactiveDict: ReactiveDict
};

})();
