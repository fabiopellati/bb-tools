'use strict';


/**
 * specs:
 *
 */
var FormFieldEditorView = require('./TextEditorView');

var DateTextEditorView = FormFieldEditorView.extend({

    /**
     *
     * @param value
     * @returns {*}
     */
    filter: function (value) {
        return this.filterForWrite(value);
    },

    /**
     * filtra value per la scrittura sul model
     *
     * @param value
     * @returns {*}
     */
    filterForWrite: function (value) {
        var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        if (_.isString(value)) {
            if (pattern.test(value)) {
                var replaced = value.replace(pattern, '$3-$2-$1');
                return replaced;
            }
        }
        return value;

    },
    /**
     * filtra value per la scrittura sul model
     *
     * @param value
     * @returns {*}
     */
    filterForRead: function (value) {
        var pattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        if (_.isString(value) && pattern.test(value)) {
            var replaced = value.replace(pattern, '$3/$2/$1');
            return replaced;
        }
        return value;

    },
    /**
     * listener dell'evento editor.set.value
     *
     * @param e
     */
    onEditorSetValue: function (e) {
        this.$el.removeClass('has-error');
        this.$el.find('.help-block.data-error').empty();
        var value = this.filterForRead(e.value);

        this.$('.data_editor').val(value);
    }

});
module.exports = DateTextEditorView;