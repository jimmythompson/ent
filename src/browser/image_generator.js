var d3 = require("d3");

module.exports.clear = function () {
    d3.select("g").remove();
};

module.exports.generate = function (root, element) {
    var margin = 10;
    var width = element.parentNode.offsetWidth - (2 * margin);
    var height = element.parentNode.offsetHeight - (2 * margin);
    var rectWidth = 150;
    var rectHeight = rectWidth / 2;
    var rectRounding = 8;
    
    var svg = d3.select(element)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 3 + ", " + margin + ")");

    var tree = d3.layout.tree()
        .size([width, height])
        .nodeSize([rectWidth + 10, rectHeight + rectHeight / 5]);

    var nodes = tree.nodes(root);
    var links = tree.links(nodes);

    var diagonalCoords = function(d) {
        var point1 = { x: d.source.x, y: (d.source.y + rectHeight) };
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

    svg.selectAll("path.link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", function(d) { return diagonal(diagonalCoords(d)); });

    svg.selectAll("rect.node")
        .data(nodes)
        .enter()
        .append("rect")
        .attr("class", "node")
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("x", function(d) { return d.x - rectHeight; })
        .attr("y", function(d) { return d.y; })
        .attr("rx", rectRounding)
        .attr("ry", rectRounding);

    svg.selectAll("text.node")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "node")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y + (rectHeight / 2) + 3; })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; });
};