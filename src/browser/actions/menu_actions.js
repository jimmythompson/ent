var ipc = require("ipc"),
    dispatcher = require("../dispatcher"),
    Constants = require("../constants"),
    TreeStore = require("../stores/tree_store");

module.exports = {
    openLoadFilePrompt: function () {
        ipc.send("dialog:open");
    },

    openSaveFilePrompt: function () {
        ipc.send("dialog:save", TreeStore.getTree());
    },

    toggleShowHide: function () {
        dispatcher.dispatch({
            type: Constants.SidebarToggled
        });
    }
};