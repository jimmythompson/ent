var Constants = require("../constants"),
    dispatcher = require("../dispatcher");

module.exports = {
    changeTree: function (tree) {
        dispatcher.dispatch({
            type: Constants.TreeChanged,
            tree: tree
        });
    }
};