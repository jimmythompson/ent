var $ = require("jquery");
var ipc = require("ipc");
var xmldom = require("xmldom");

var parser = require("../app/parser");
var generator = require("./image_generator");

var $success = $(".alert.success");
var $error = $(".alert.error");

var $content = document.getElementById("content");
var $textarea = document.getElementById("text-area");

var renderTree = function () {
    try {
        var root = parser.parse($textarea.value);
        generator.clear();

        generator.generate(root, $content);
    } catch (error) {
        showErrorMessage("Could not parse the tree");
    }
};

var showErrorMessage = function (message) {
    $error.text(message);
    $error.fadeIn("slow", function () {
        setTimeout(function () {
            $error.fadeOut("slow");
        }, 2000);
    });
};

var showSuccessMessage = function (message) {
    $success.text(message);
    $success.fadeIn("slow", function () {
        setTimeout(function () {
            $success.fadeOut("slow");
        }, 2000);
    });
};

$("#generate").on("click", renderTree);

$("#load").on("click", function () {
    $textarea.value = ipc.sendSync("dialog:open");
    renderTree();
    showSuccessMessage("Successfully loaded file");
});

$("#save").on("click", function () {
    ipc.send("dialog:save", $textarea.value);
});

ipc.on("message:success", showSuccessMessage);
