var EventEmitter = require("events").EventEmitter,
    Constants = require("../constants"),
    appDispatcher = require("../dispatcher");

var CHANGE_EVENT = "tree-changed";
var eventEmitter = new EventEmitter();

var _state = {
    tree: [
        "= Break into house",
        "== Through the door",
        "=== Smash door",
        "=== Pick lock",
        "== Through the window"
    ].join("\n")
};

var dispatchToken = appDispatcher.register(function (action) {
    switch (action.type) {
        case Constants.FileLoaded: {
            _state.tree = action.contents;
            break;
        }
        case Constants.TreeChanged: {
            _state.tree = action.tree;
            break;
        }
        default: {
            return;
        }
    }

    eventEmitter.emit(CHANGE_EVENT);
    return true;
});

module.exports = {
    dispatchToken: dispatchToken,

    getTree: function () {
        return _state.tree;
    },

    addListener(callback) {
        eventEmitter.on(CHANGE_EVENT, callback)
    },

    removeListener(callback) {
        eventEmitter.removeListener(CHANGE_EVENT, callback)
    }
};