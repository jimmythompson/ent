var $ = require("jquery");
var xmldom = require("xmldom");
var parser = require("../app/parser");
var dialogs = require("../app/dialog");
var generator = require("./image_generator");

var $content = document.getElementById("content");
var $textarea = document.getElementById("text-area");

var updateTreeView = function () {
    var root = parser.parse($textarea.value);

    generator.clear();

    if (root) {
        generator.generate(root, $content);
    }

    showSuccessMessage("Dat tree, ooft!");
};

var showSuccessMessage = function (message) {
    var $success = $(".success");

    $success.text(message);
    $success.fadeIn("slow", function () {
        setTimeout(function () {
            $success.fadeOut("slow");
        }, 2000);
    });
};

$("#generate").on("click", updateTreeView);

$("#load").on("click", function () {
    $textarea.value = dialogs.openDialog();
    updateTreeView();
});

$("#save").on("click", function () {
    dialogs.saveDialog($textarea.value);
});
