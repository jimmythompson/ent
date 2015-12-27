var EventEmitter = require("events").EventEmitter;

var CHANGE_EVENT = "tree-changed";
var eventEmitter = new EventEmitter();

var _state = {
    content: [
        "= Break into house",
        "== Through the door",
        "=== Smash door",
        "=== Pick lock",
        "== Through the window"
    ].join("\n")
};

module.exports = {
    getContent: function () {
        return _state.content;
    },

    setContent: function (content) {
        _state.content = content;
    },

    addListener(callback) {
        eventEmitter.on(CHANGE_EVENT, callback)
    },

    removeListener(callback) {
        eventEmitter.removeListener(CHANGE_EVENT, callback)
    }
};