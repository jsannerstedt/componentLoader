/**
 * Created by joel on 2015-06-04.
 */
define(function () {
    "use strict";

    return function (onChange) {
        window.addEventListener('hashchange', processHash);
        processHash();

        function processHash() {
            var hash = location.hash || '#',
                parts = hash.slice(1).split("?");
            onChange(parts[0], getParams(parts[1]));
        }

        function getParams(query) {
            var values = query ? query.split("&") : [],
                params = {};

            values.forEach(function (value) {
                var nameValue = value.split("=");
                params[nameValue[0]] = nameValue[1];
            });
            return params;
        }
    };
});