'use strict';


(function (factory) {

    // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
    // We use `self` instead of `window` for `WebWorker` support.
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);

    // Set up Backbone appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.BbTools = factory(root, exports);
        });

        // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined') {
        factory(root, exports);

        // Finally, as a browser global.
    } else {
        root.BbTools = factory(root, {});
    }

})(function (root, BbTools) {

    var BbTools = {};
    BbTools.Debug = require('./Debug');
    BbTools.Collection = require('./Collection/Collection');
    // BbTools.Risorsa = require('./Model/Risorsa');
    BbTools.Model = require('./Model/Model');
    BbTools.ApigilityModel = require('./Model/ApigilityModel');
    BbTools.View = {};
    BbTools.View.Modal = {};
    BbTools.View.Modal.Responsive = require('./View/Modal/Responsive');


    BbTools.init = function () {
    };


    root.BbTools = BbTools;
    return BbTools;
});
