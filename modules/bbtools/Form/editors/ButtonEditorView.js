'use strict';


/**
 * specs:
 *
 */
var FormFieldEditorView = require('../FormFieldEditorView');

/**
 * genera un button generico
 *
 */
var ButtonEditorView = FormFieldEditorView.extend({
        tagName: 'button',
        // template: _.template('<button class="editor <%= attributes.button_class %> " ><%- label%></button>'),
        events: {
            'click ': 'onEvent'
        },
        label: 'label',
        initialize: function (options) {
            FormFieldEditorView.prototype.initialize.call(this, options);
            if (typeof options.label != 'undefined') {
                this.label = options.label;
            }
            this.attributes = (typeof options.attributes != 'undefined') ? options.attributes : this.attributes;

            this.bind('editor.render', this.onEditorRender, this);
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
                attributes: this.view_attributes
            };

            this.$el.attr(this.attributes);
            this.$el.addClass('editor');
            this.$el.html(data.label);
            this.setValue(this.model.get(this.key));
        }
    })
;
module.exports = ButtonEditorView;
