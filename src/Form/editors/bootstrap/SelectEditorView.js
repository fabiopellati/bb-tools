'use strict';


/**
 * specs:
 *
 */
var BaseView = require('../../FormFieldEditorView');
var SelectEditorTemplate = require('./template/SelectEditorTemplate.html');

/**
 * genera una select con le options statiche
 *
 */
var SelectEditorView = BaseView.extend({
    tagName: 'div',
    template: _.template(SelectEditorTemplate),
    options: [],
    label: 'label',
    initialize: function (options) {
        BaseView.prototype.initialize.call(this, options);
        if (typeof options.key != 'undefined') {
            this.key = options.key;
        } else {
            throw new Error("editor bootstrap/SelectEditorView option obbligatoria non definita: 'key' equivalente all'attrib nel model")
        }
        if (typeof options.readonly != 'undefined' && options.readonly === true) {
            this.readonly=true;
        }
        this.name = (typeof options.name != 'undefined')? options.name : this.key;

        this.title = (typeof options.title != 'undefined') ? options.title : this.key;

        if (typeof options.label != 'undefined') {
            this.label = options.label;
        }
        this.initAttributes(options);
        this.bind('editor.render', this.onEditorRender, this);
        this.bind('editor.event', this.onEditorEvent, this);
        this.bind('editor.model.error', this.onEditorModelError, this);
        this.bind('editor.set.value', this.onEditorSetValue, this);
        this.model.bind('model.commit.success', this.onEditorModelSuccess, this);
        this.setSelectOptions(options);
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
     *
     * @param options
     */
    setSelectOptions: function (options) {
        if (typeof options.options == 'undefined') {
            return;
        }
        this.options.push({value: '', option: '---'});
        _.each(options.options, function (option) {
            if (typeof option == 'string') {
                this.options.push({value: option, option: option});
            } else if (typeof option == 'object') {
                this.options.push({value: option.value, option: option.option});
            }
        }, this);
        this.render(this.cid);

    },

    /**
     * listener dell'evento editor.render
     *
     * @param e
     */
    onEditorRender: function (e) {
        var data = {
            name: this.name,
            key: this.key,
            title: this.title, label: this.label,
            help: this.help,
            editorId: this.name + this.model.cid,
            attributes: this.view_attributes,
            options: this.options,
            disabled: (this.readonly)?'disabled ':''
        };
        this.$el.attr(this.attributes);
        this.$el.html(this.template(data));
        this.setValue(this.model.get(this.key));
    },

    /**
     * listener dell'evento editor.set.value
     *
     * @param e
     */
    onEditorSetValue: function (e) {
        this.resetStatusClass();
        this.resetDataError();

        this.$el.find("option[value='" + e.value + "']").attr('selected', 'selected');
    },

    /**
     * sul commit del model si sono verificati errori ed il model ha emesso il relativo evento
     *
     * @param e
     */
    onEditorModelError: function (e) {
        this.$el.addClass('has-error');
        this.$el.removeClass('has-warning');
        _.mapObject(e.messages, function (val, key) {
            var message = document.createElement('div');
            var text = document.createTextNode(val);
            message.appendChild(text);
            this.$('.help-block.data-error').append(message);
        }, this);

    },

    /**
     * commit del model avvenuto con successo
     *
     * @param e
     */
    onEditorModelSuccess: function (e) {
        this.resetStatusClass();
        this.resetDataError();

        this.$el.addClass('has-success');


    }
});
module.exports = SelectEditorView;