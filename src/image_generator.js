var parser = require("../parser");

document.getElementById("generate").addEventListener('click', function () {
    var root = parser.parse(
        document.getElementById("text-area").value);

    var margin = { "top": 20, "right": 40, "bottom": 40, "left": 20 };
    var width = 1000 - margin.left - margin.right;
    var height =  1000 - margin.top - margin.bottom;
    var rectWidth = 150;
    var rectHeight = rectWidth / 2;
    var rectRounding = 8;
    var joinRadius = 24;

    d3.select("svg").remove();

    var svg = d3.select(document.getElementById("content"))
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var conjunctions = function(nodes) {
        var out = [];
        nodes.forEach(function(node) {
            if ("conjunction" in node) {
                out.push(node)
            }
        });
        return out;
    };

    var tree = d3.layout.tree()
        .size([width, height]);
    var nodes = tree.nodes(root);
    var links = tree.links(nodes);
    var joins = conjunctions(nodes);

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
});


