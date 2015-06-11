var d3 = require("d3");
var TreeView = require("./tree_view");

var RECTANGLE_WIDTH = 150,
    RECTANGLE_HEIGHT = RECTANGLE_WIDTH / 2,
    MARGIN = 10;


module.exports = function (element) {
    var $element = element;

    this.clear = function () {
        d3.select($element)
          .select("svg").remove();
    };

    this.render = function (root) {
        var parent = $element.parentNode;

        var width = parent.offsetWidth;
        var height = parent.offsetHeight;

        this.clear();

        var tree = d3.layout.tree().nodeSize(
            [RECTANGLE_WIDTH + 2 * MARGIN, RECTANGLE_HEIGHT + 2 * MARGIN]);

        var nodes = tree.nodes(root);
        var links = tree.links(nodes);

        var svg = d3.select($element)
                    .append("svg")
                    .attr("xmlns", "http://www.w3.org/2000/svg")
                    .attr("width", width)
                    .attr("height", height);

        var treeView = new TreeView(svg);

        treeView.draw(nodes, links);
        treeView.move([width / 2, MARGIN], 1.0);
    };
};