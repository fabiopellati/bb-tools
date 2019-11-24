'use strict';


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


module.exports = BbToolsForm;
