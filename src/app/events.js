var ipc = require('ipc');
var dialogs = require("./dialog");

ipc.on("dialog:open", function (event) {
    event.returnValue = dialogs.openFile();
});

ipc.on("dialog:save", function (event, tree) {
    if (dialogs.saveFile(tree)) {
        event.sender.send("message:success", "Successfully saved.");
    }
});