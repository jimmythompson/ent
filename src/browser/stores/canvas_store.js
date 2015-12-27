var EventEmitter = require("events").EventEmitter,
    Constants = require("../constants"),
    dispatcher = require("../dispatcher");

var CHANGE_EVENT = "canvas-changed";
var eventEmitter = new EventEmitter();

var _state = {
    canvasHTML: ""
};

var dispatchToken = dispatcher.register(function (action) {
    switch (action.type) {
        case Constants.CanvasUpdated: {
            _state.canvasHTML = action.html;
            break;
        }
        default:
        {
            return;
        }
    }

    eventEmitter.emit(CHANGE_EVENT);
});

module.exports = {
    dispatchToken: dispatchToken,

    getCanvasHTML: function () {
        return _state.canvasHTML;
    },

    addListener(callback) {
        eventEmitter.on(CHANGE_EVENT, callback)
    },

    removeListener(callback) {
        eventEmitter.removeListener(CHANGE_EVENT, callback)
    }
};