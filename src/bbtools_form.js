'use strict';


(function (factory) {

    // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
    // We use `self` instead of `window` for `WebWorker` support.
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);

    // Set up Backbone appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.BbToolsForm = factory(root, exports);
        });

        // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined') {
        factory(root, exports);

        // Finally, as a browser global.
    } else {
        root.BbToolsForm = factory(root, {});
    }


})(function (root, BbToolsForm) {


    var BbToolsForm = {};
    BbToolsForm.editors = {};
    BbToolsForm.editors.TextEditorView = require('./Form/editors/bootstrap/TextEditorView');
    BbToolsForm.editors.DateTextEditorView = require('./Form/editors/bootstrap/DateTextEditorView');
    BbToolsForm.editors.SelectEditorView = require('./Form/editors/bootstrap/SelectEditorView');
    BbToolsForm.editors.SelectModelEditorView = require('./Form/editors/bootstrap/SelectModelEditorView');
    BbToolsForm.editors.ReadOnlyEditorView = require('./Form/editors/bootstrap/ReadOnlyEditorView');
    BbToolsForm.editors.ButtonEditorView = require('./Form/editors/ButtonEditorView');
    BbToolsForm.editors.ButtonCommitEditorView = require('./Form/editors/ButtonCommitEditorView');
    // BbToolsForm.BootstrapForm = require('./Form/BootstrapForm');
    // BbToolsForm.BootstrapForm.editors.DateText = require('./Form/editors/datetext');
    BbToolsForm.Router = require('./Router/CrudFormRouter');


    BbToolsForm.init = function () {
    };


    root.BbToolsForm = BbToolsForm;
    return BbToolsForm;
});
