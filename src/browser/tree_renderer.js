var d3 = require("d3");
var TreeView = require("./tree_view");

var RECTANGLE_WIDTH = 150,
    RECTANGLE_HEIGHT = RECTANGLE_WIDTH / 2,
    MARGIN = 10;


module.exports = function (element) {
    var $element = element,
        $svg = null;

    this.clear = function () {
        if ($svg) {
            $svg.remove();
        }
    };

    this.render = function (root) {
        this.clear();

        var tree = d3.layout.tree().nodeSize(
            [RECTANGLE_WIDTH + 2 * MARGIN, RECTANGLE_HEIGHT + 2 * MARGIN]);

        var nodes = tree.nodes(root);
        var links = tree.links(nodes);

        $svg = d3.select($element)
                 .append("svg")
                 .attr("xmlns", "http://www.w3.org/2000/svg");

        this.resize();

        var treeView = new TreeView($svg);

        treeView.draw(nodes, links);
        treeView.move([$svg.attr("width") / 2, MARGIN], 1.0);
    };

    this.resize = function () {
        if ($svg) {
            var parent = $element.parentNode;

            $svg.attr("width", parent.offsetWidth)
                .attr("height", parent.offsetHeight);
        }
    };
};
