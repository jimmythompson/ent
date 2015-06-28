var filterEachElement = function (styleDeclaration, callback) {
    var accepted = [];
    for (var i = 0; i < styleDeclaration.length; ++i) {
        var key = styleDeclaration[i],
            value = styleDeclaration.getPropertyValue(key);

        if (callback(key, value)) {
            accepted[key] = value;
        }
    }
    return accepted;
};

var getComputedStyle = function (element) {
    if (element instanceof SVGElement) {
        element.setAttribute("id", "__intermediate");

        var e = document.getElementById("__intermediate");
        element.removeAttribute("id");

        return window.getComputedStyle(e);
    }

    return window.getComputedStyle(element);
};

var getUniqueStyle = function (element, base) {
    var computedStyle = getComputedStyle(element),
        baseStyle = getComputedStyle(base),
        restrictedAttributes = ["width", "height"];

    return filterEachElement(computedStyle, function (key, value) {
        return restrictedAttributes.indexOf(key) === -1 &&
            value !== baseStyle.getPropertyValue(key);
    });
};

var toString = function (obj) {
    var output = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            output.push(key + ": " + value);
        }
    }

    return output.join("; ");
};

module.exports = function (element, base) {
    return toString(getUniqueStyle(element, base)); 
};
