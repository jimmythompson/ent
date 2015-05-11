var parser = require("../parser");
var dialogs = require("../dialog");
var generateImage = require("../generate-image");

var $textarea = document.getElementById("text-area");

document.getElementById("load").addEventListener("click", function () {
    $textarea.value = dialogs.openDialog();
});

document.getElementById("save").addEventListener("click", function () {
    dialogs.saveDialog($textarea.value);
});

document.getElementById("generate").addEventListener("click", function () {
    var root = parser.parse($textarea.value);
    generateImage(root);
});

