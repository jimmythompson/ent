var ipc = require("ipc");

module.exports = {
    openLoadFilePrompt: function () {
        ipc.send("dialog:open");
    }
};