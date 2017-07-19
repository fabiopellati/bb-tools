'use strict';


/**
 * specs:
 *
 */
var BaseView = require('../../FormFieldEditorView');

/**
 * genera una select con le options basate su una collection
 *
 */
var SelectModelEditorView = BaseView.extend({
    tagName: 'div',
    template: _.template('\
      <label class="<%= attributes.label_class %> control-label" for="<%= editorId %>"><%= title %></label>\
      <div class="<%= attributes.field_class %>">\
        <select class="<%= attributes.form_control_class %> form-control data-editor" id="<%= editorId %>">\
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
            throw new Error("editor bootstrap/SelectModelEditorView option obbligatoria non definita: 'key' equivalente all'attrib nel model")
        }
        this.name = (typeof options.name != 'undefined')? options.name : this.key;

        if (!options.collection.prototype instanceof Backbone.Collection) {
            throw new Error("editor bootstrap/SelectModelEditorView option deve essere un model");
            return;
        }
        this.title = (typeof options.title != 'undefined') ? options.title : this.key;

        if (typeof options.label != 'undefined') {
            this.label = options.label;
        }
        this.initAttributes(options);

        this.key_value = options.key_value;
        this.key_option = options.key_option;
        this.collection.bind('sync', this.setSelectOptions, this);
        this.bind('editor.render', this.onEditorRender, this);
        this.bind('editor.event', this.onEditorEvent, this);
        this.bind('editor.model.error', this.onEditorModelError, this);
        this.bind('editor.set.value', this.onEditorSetValue, this);
        this.model.bind('model.commit.success', this.onEditorModelSuccess, this);

        var fetch_data = (typeof options.fetch_data != 'undefined') ? options.fetch_data : {};
        this.collection.fetch({data: fetch_data});
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
        // _.each(this.options, function (row) {
        //     row.remove();
        // }, this);
        this.options = [];
        this.options.push({value: '', option: '---'});
        _.each(this.collection.models, function (model) {
            var option_value = model.get(this.key_value);
            if (typeof this.key_option == 'string') {
                var option_option = model.get(this.key_option);
            } else if (typeof this.key_option == 'object') {
                var option_option = this.key_option.reduce(function (prev, curr) {
                    var a = model.get(prev);
                    var b = model.get(curr);
                    return a + ' ' + b;
                });
            } else if (typeof this.key_option == 'function') {
                var option_option = this.key_option(model);
            }
            this.options.push({value: option_value, option: option_option,});

        }, this);
        this.render(this.cid);

    },

    /**
     * listener dell'evento editor.render
     *
     * @param e
     */
    onEditorRender: function (e) {
        // console.log({'onEditorRender':e});
        var data = {
            name: this.name,

            key: this.key,
            title: this.title, label: this.label,
            help: this.help,
            editorId: this.name + this.model.cid,
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

    },

});
module.exports = SelectModelEditorView;