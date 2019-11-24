'use strict';


/**
 * specs:
 *
 */
var FormFieldEditorView = require('../FormFieldEditorView');

var TextEditorView;
TextEditorView = FormFieldEditorView.extend({
    tagName: 'div',
    template: _.template('<input class="data-editor" />'),

    /**
     * inizializza il parent
     * aggancia gli eventi
     *
     * @param options
     */
    initialize: function (options) {
        FormFieldEditorView.prototype.initialize.call(this, options);

        this.bind('editor.set.value', this.onEditorSetValue, this);
        this.bind('editor.render', this.onEditorRender, this);
        this.bind('editor.model.error', this.onEditorModelError, this);
        this.render(this.cid);
    },

    /**
     * sul commit del model si sono verificati errori ed il model ha emesso il relativo evento
     *
     * @param e
     */
    onEditorModelError: function (e) {
        _.mapObject(e.messages, function (val, key) {
            var message = document.createElement('div');
            var text = document.createTextNode(val);
            message.appendChild(text);
            this.$el.append(message);
        }, this);

    },

    /**
     * listener dell'evento editor.render
     *
     * @param e
     */
    onEditorRender: function (e) {
        this.$el.empty();
        var data = {
            name: this.name

        };
        this.$el.append(this.template(data));
        this.setValue(this.model.get(this.key));
    },

    /**
     * listener dell'evento editor.set.value
     *
     * @param e
     */
    onEditorSetValue: function (e) {
        this.$('.data-editor').val(e.value);
    },

    /**
     * evento generico
     *
     * @param e
     */
    onEvent: function (e) {
        this.trigger('editor.event', this);
    }


});
module.exports = TextEditorView;