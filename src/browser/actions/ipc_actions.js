var ipc = require("electron").ipcRenderer,
    Constants = require("../constants"),
    dispatcher = require("../dispatcher");

module.exports = {
    initBindings: function () {
        ipc.on("open:success", function(event, fileContents) {
            dispatcher.dispatch({
                type: Constants.FileLoaded,
                contents: fileContents
            })
        });

        ipc.on("save:success", function () {
        });

        ipc.on("export:success", function () {
        });
    }
}
