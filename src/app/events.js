var ipc = require('ipc');
var dialogs = require("./dialog");

ipc.on("dialog:open", function (event) {
    var openedFile = dialogs.openFile();

    if (openedFile) {
        event.sender.send("open:success", openedFile);
    }
});

ipc.on("dialog:save", function (event, tree) {
    if (dialogs.saveFile(tree)) {
        event.sender.send("save:success");
    }
});