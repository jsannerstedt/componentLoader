define(function () {
    "use strict";

    return function (ko, options) {
        var componentPrefix = (options && options.componentPrefix || "cstm") + "-",
            componentDir = (options && options.componentDir || "components") + "/";

        ko.components.getComponentNameForNode = function (node) {
            var tagNameLower = node.tagName && node.tagName.toLowerCase(),
                moduleName;

            if (tagNameLower.indexOf(componentPrefix) === 0) {
                moduleName = tagNameLower.substr(componentPrefix.length).replace(/-/g, "/");
                return componentDir + moduleName;
            } else {
                return null;
            }
        };
    };
});