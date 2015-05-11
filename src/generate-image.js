var d3 = require("d3");

module.exports = function (root, element) {
    var margin = { "top": 10, "right": 10, "bottom": 10, "left": 10 };
    var width = window.innerWidth - (margin.left + margin.right);
    var height =  window.innerHeight - (margin.top + margin.bottom);
    var rectWidth = 150;
    var rectHeight = rectWidth / 2;
    var rectRounding = 8;
    var joinRadius = 24;

    d3.select("svg").remove();

    var svg = d3.select(element)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 3 + "," + margin.top + ")");

    var tree = d3.layout.tree()
        .size([width, height])
        .nodeSize([rectWidth + 10, rectHeight + rectHeight / 5]);
    var nodes = tree.nodes(root);
    var links = tree.links(nodes);
    var joins = nodes.filter(function (node) {
        return "conjunction" in node;
    });

    var diagonalCoords = function(d) {
        var point1 = { "x": d.source.x, "y": (d.source.y + rectHeight) }
        var point4 = { "x": d.target.x, "y": d.target.y };
        var mid =  (point1.y + point4.y) / 2;
        var point2 = { "x": point1.x, "y": mid };
        var point3 = { "x": point4.x, "y": mid };
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

    svg.selectAll("circle.join")
        .data(joins)
        .enter()
        .append("circle")
        .attr("class", "join")
        .attr("r", joinRadius)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y + rectHeight * 2; });

    svg.selectAll("text.node")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "node")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y + (rectHeight / 2) + 3; })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; });

    svg.selectAll("text.join")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "join")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y + rectHeight * 2 + 3})
        .attr("text-anchor", "middle")
        .text(function(d) { return d.conjunction; });
};