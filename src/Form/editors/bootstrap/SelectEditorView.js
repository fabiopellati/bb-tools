'use strict';


/**
 * specs:
 *
 */
var BaseView = require('../../FormFieldEditorView');

/**
 * genera una select con le options statiche
 *
 */
var SelectEditorView = BaseView.extend({
    tagName: 'div',
    template: _.template('\
      <label class="<%= attributes.label_class %> control-label" for="<%= editorId %>"><%= title %></label>\
      <div class="<%= attributes.field_class %>">\
        <select class="<%= attributes.form_control_class %> form-control data_editor" id="<%= editorId %>">\
         <% for(i=0;i < options.length;i++){ %>\
         <% var option=options[i]; %>\
         <option value="<%= option.value %>"><%= option.option %></option>\
         <% }%>\
        </select>\
        <p class="<%= attributes.data_error_class %> help-block data-error"></p>\
        <p class="<%= attributes.help_block_class %>help-block"><%= help %></p>\
      </div>\
    '),
    options: [],
    label: 'label',
    initialize: function (options) {
        BaseView.prototype.initialize.call(this, options);
        if (typeof options.key != 'undefined') {
            this.key = options.key;
        } else {
            throw new Error("editor bootstrap/SelectEditorView option obbligatoria non definita: 'key' equivalente all'attrib nel model")
        }
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
            key: this.key,
            title: this.title, label: this.label,
            help: this.help,
            editorId: this.key + this.model.cid,
            attributes: this.view_attributes,
            options: this.options
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
        this.$el.removeClass('has-error');
        this.$('.help-block.data-error').empty();

        this.$el.find("option[value='" + e.value + "']").attr('selected', 'selected');
    },

    /**
     * sul commit del model si sono verificati errori ed il model ha emesso il relativo evento
     *
     * @param e
     */
    onEditorModelError: function (e) {
        this.$el.addClass('has-error');
        this.$('.help-block .data-error').empty();

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
        this.$el.removeClass('has-error');
        this.$el.addClass('has-success');

    }
});
module.exports = SelectEditorView;