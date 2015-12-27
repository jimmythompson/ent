var d3 = require("d3"),
    sprintf = require("sprintf-js").sprintf,
    inlineStyle = require("./inline_style");

var RECTANGLE_WIDTH = 150,
    RECTANGLE_HEIGHT = RECTANGLE_WIDTH / 2;

var rotate_format = function (translation, scale) {
    return sprintf("translate(%s) scale(%s)", translation, scale);
};

var diagonalCoords = function(d) {
    var point1 = { x: d.source.x, y: (d.source.y + RECTANGLE_HEIGHT) };
    var point4 = { x: d.target.x, y: d.target.y };

    var mid =  (point1.y + point4.y) / 2;

    var point2 = { x: point1.x, y: mid };
    var point3 = { x: point4.x, y: mid };

    return [point1, point2, point3, point4];
};

var diagonal = d3.svg.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .interpolate("step");


module.exports = function (svg, onInteraction) {
    var $this = this,
        graph = svg.append("g"),
        behavior = d3.behavior.zoom().scaleExtent([0.5, 8]);

    behavior.on("zoom", function () {
        $this.move(behavior.translate(), behavior.scale());
    });

    svg.call(behavior);

    this.draw = function (nodes, links) {
        graph.selectAll("rect.node")
            .data(nodes)
            .enter()
            .append("rect")
            .attr("class", "node")
            .attr("width", RECTANGLE_WIDTH)
            .attr("height", RECTANGLE_HEIGHT)
            .attr("x", function(d) { return d.x - RECTANGLE_HEIGHT; })
            .attr("y", function(d) { return d.y; });

        graph.selectAll("text.node")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", "node")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y + (RECTANGLE_HEIGHT / 2) + 3; })
            .attr("text-anchor", "middle")
            .text(function(d) { return d.name; });

        graph.selectAll("path.link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", function(d) { return diagonal(diagonalCoords(d)); });

        graph.selectAll("*")
            .attr("style", function () {
                return inlineStyle(this, svg.node());
            });
    };

    this.move = function (translation, scale) {
        behavior.translate(translation)
                .scale(scale);
        graph.attr("transform", rotate_format(translation, scale));
        onInteraction();
    };
};

