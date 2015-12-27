var EventEmitter = require("events").EventEmitter,
    Constants = require("../constants"),
    dispatcher = require("../dispatcher");

var CHANGE_EVENT = "config-changed";
var eventEmitter = new EventEmitter();

var _state = {
    showSidebar: true
};

var dispatchToken = dispatcher.register(function (action) {
    switch (action.type) {
        case Constants.SidebarToggled: {
            _state.showSidebar = !_state.showSidebar;
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

    isSidebarEnabled: function () {
        return _state.showSidebar;
    },

    addListener(callback) {
        eventEmitter.on(CHANGE_EVENT, callback)
    },

    removeListener(callback) {
        eventEmitter.removeListener(CHANGE_EVENT, callback)
    }
};