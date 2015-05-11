var parser = require("../parser");
var dialogs = require("../dialog");
var generateImage = require("../generate-image");

var $textarea = document.getElementById("text-area");

var updateTreeView = function () {
    var root = parser.parse($textarea.value);
    generateImage(root);
};

document.getElementById("load").addEventListener("click", function () {
    $textarea.value = dialogs.openDialog();
    updateTreeView();
});

document.getElementById("save").addEventListener("click", function () {
    dialogs.saveDialog($textarea.value);
});

document.getElementById("generate").addEventListener("click", updateTreeView);

