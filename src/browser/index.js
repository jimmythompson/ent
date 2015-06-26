var $ = require("jquery");
var ipc = require("ipc");
var xmldom = require("xmldom");

var parser = require("../app/parser");
var TreeRenderer = require("./tree_renderer");

var $success = $(".alert.success"),
    $error = $(".alert.error"),
    $showHide = $("#show-hide"),
    $sidebar = $(".sidebar");

var $content = document.getElementById("content"),
    $textarea = document.getElementById("text-area");

var renderer = new TreeRenderer($content);

var renderTree = function () {
    try {
        renderer.render(parser.parse($textarea.value));
    } catch (error) {
        console.log(error);
        showErrorMessage("Could not create tree");
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
    ipc.send("dialog:open");
});

ipc.on("open:success", function(fileContents) {
    $textarea.value = fileContents;
    renderTree();
    showSuccessMessage("Loaded tree successfully");
});

$("#save").on("click", function () {
    ipc.send("dialog:save", $textarea.value);
});

ipc.on("save:success", function () {
    showSuccessMessage("Saved text tree successfully");
});

var expanded = true;

$showHide.on("click", function () {
    if (expanded) {
        $showHide.html("&#x25B2;");
        $sidebar.fadeOut("fast", function () {
            expanded = false;
        });
    } else {
        $showHide.html("&#x25BC;");
        $sidebar.fadeIn("fast", function () {
            expanded = true;
        });
    }
});

$("#export").on("click", function () {
    ipc.send("dialog:export", $content.innerHTML);
});

ipc.on("export:success", function () {
    showSuccessMessage("Exported tree to SVG successfully");
});

window.onresize = function () {
    $content.width = window.innerWidth;
    $content.height = window.innerHeight;
    renderer.resize();
};
