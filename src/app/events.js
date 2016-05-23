var ipc = require('electron').ipcMain;
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

ipc.on("dialog:export", function (event, svg) {
    if (dialogs.exportToSvg(svg)) {
        event.sender.send("export:success");
    }
});
