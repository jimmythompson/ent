var Constants = require("../constants"),
    dispatcher = require("../dispatcher");

module.exports = {
    updateCanvas: function (canvasHTML) {
        dispatcher.dispatch({
            type: Constants.CanvasUpdated,
            html: canvasHTML
        });
    }
};