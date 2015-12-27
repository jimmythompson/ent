var ipc = require("ipc"),
    TreeStore = require("../stores/tree_store");

module.exports = {
    openLoadFilePrompt: function () {
        ipc.send("dialog:open");
    },

    openSaveFilePrompt: function () {
        ipc.send("dialog:save", TreeStore.getTree());
    }
};