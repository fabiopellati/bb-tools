'use strict';


(function (factory) {

    // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
    // We use `self` instead of `window` for `WebWorker` support.
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);

    // Set up Backbone appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.BbToolsGrid = factory(root, exports);
        });

        // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined') {
        factory(root, exports);

        // Finally, as a browser global.
    } else {
        root.BbToolsGrid = factory(root, {});
    }

})(function (root, BbToolsGrid) {

    var BbToolsGrid = {};
    BbToolsGrid.Router = require('./Router/CrudGridRouter');
    BbToolsGrid.Grid = require('./View/Grid/Grid');
    BbToolsGrid.PageNavigatorView = require('./View/PageNavigator/PageNavigatorView');
    BbToolsGrid.Toolbar = require('./View/Toolbar/Toolbar');
    BbToolsGrid.SearchView = require('./View/Search/SearchView');


    BbToolsGrid.init = function () {
    };


    root.BbToolsGrid = BbToolsGrid;
    return BbToolsGrid;
});
