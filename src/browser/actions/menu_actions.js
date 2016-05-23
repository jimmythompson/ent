var ipc = require("electron").ipcRenderer,
    dispatcher = require("../dispatcher"),
    Constants = require("../constants"),
    CanvasStore = require("../stores/canvas_store"),
    TreeStore = require("../stores/tree_store");

module.exports = {
    openLoadFilePrompt: function () {
        ipc.send("dialog:open");
    },

    openSaveFilePrompt: function () {
        ipc.send("dialog:save", TreeStore.getTree());
    },

    exportFilePrompt: function () {
        ipc.send("dialog:export", CanvasStore.getCanvasHTML());
    },

    toggleShowHide: function () {
        dispatcher.dispatch({
            type: Constants.SidebarToggled
        });
    }
};