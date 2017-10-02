'use strict';


/**
 * specs:
 *
 */
var TextEditorTemplate = require('./template/TextEditorTemplate.html');
var ReadOnlyTextEditorTemplate = require('./template/ReadOnlyTextEditorTemplate.html');
var FormFieldEditorView = require('../../FormFieldEditorView');

var TextEditorView = FormFieldEditorView.extend({
    tagName: 'div',
    template: _.template(TextEditorTemplate),

    view_attributes: {
        label_class: 'col-md-3',
        field_class: 'col-md-9',
        form_control_class: '',
        data_error_class: '',
        help_block_class: ''
    },


    /**
     *
     * @param options
     */
    initialize: function (options) {
        FormFieldEditorView.prototype.initialize.call(this, options);
        if (typeof options.key != 'undefined') {
            this.key = options.key;
        } else {
            throw new Error("editor bootstrap/InputTextEditorView option obbligatoria non definita: 'key' equivalente all'attrib nel model")
        }
        if (typeof options.readonly != 'undefined' && options.readonly === true) {
            this.readonly = true;
            this.template = _.template(ReadOnlyTextEditorTemplate);
        }

        this.title = (typeof options.title != 'undefined') ? options.title : this.key;
        this.help = (typeof options.help != 'undefined') ? options.help : '';

        this.initAttributes(options);
        this.bind('editor.set.value', this.onEditorSetValue, this);
        this.bind('editor.render', this.onEditorRender, this);
        this.bind('editor.model.error', this.onEditorModelError, this);
        this.model.bind('model.commit.success', this.onEditorModelSuccess, this);
        this.render(this.cid);
    },

    /**
     * inizializza gli attributes dell'editor
     * @param options
     */
    initAttributes: function (options) {
        this.attributes = (typeof options.attributes != 'undefined') ? options.attributes : this.attributes;
        if (_.has(this.attributes, 'class')) {
            if (!/(form-group)/.test(this.attributes.class)) {
                this.attributes.class = 'form-group ' + this.attributes.class;
            }
        } else {
            _.extend(this.attributes, {class: 'form-group'});
        }
        _.extend(this.attributes, {"data-field": this.key});

    },

    /**
     * sul commit del model si sono verificati errori ed il model ha emesso il relativo evento
     *
     * @param e
     */
    onEditorModelError: function (e) {
        this.$el.addClass('has-error');

        this.$el.find('.help-block.data-error').empty();

        _.mapObject(e.messages, function (val, key) {
            var message = document.createElement('div');
            var text = document.createTextNode(val);
            message.appendChild(text);
            this.$el.find('.help-block.data-error').append(message);
        }, this);

    },

    /**
     * commit del model avvenuto con successo
     *
     * @param e
     */
    onEditorModelSuccess: function (e) {
        this.$el.removeClass('has-error');
        this.$el.addClass('has-success');

    },

    /**
     * listener dell'evento editor.render
     *
     * @param e
     */
    onEditorRender: function (e) {
        this.$el.empty();
        var data = {
            name: this.name,
            key: this.key,
            title: this.title,
            help: this.help,
            editorId: this.name + this.model.cid,
            attributes: this.view_attributes,
            input_attributes: this.input_attributes
        };
        this.$el.attr(this.attributes);
        this.$el.html(this.template(data));
        this.setValue(this.model.get(this.key));
    },

    /**
     * scrive il valore etnendo conto del tipo di template caricato
     * @param value
     */
    writeValue: function (value) {
        if (this.readonly) {
            this.$('.data-editor').text(value);
        } else {
            this.$('.data-editor').val(value);
        }
    },
    /**
     *
     *
     */
    focus: function () {
        this.$('.data-editor').focus();
        this.trigger('editor.focus', this);

    },
    /**
     * listener dell'evento editor.set.value
     *
     * @param e
     */
    onEditorSetValue: function (e) {
        this.$el.removeClass('has-error');
        this.$el.find('.help-block.data-error').empty();
        this.writeValue(e.value);
    },


    /**
     * evento generico
     *
     * @param e
     */
    onEvent: function (e) {
        this.trigger('editor.event', this);
        this.trigger('editor.text.event', this);
    }


});
module.exports = TextEditorView;