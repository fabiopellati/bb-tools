'use strict';


/**
 * specs:
 *
 */
var FormFieldEditorView = require('./TextEditorView');

var DateTextEditorView = FormFieldEditorView.extend({
    /**
     *
     * @param options
     */
    initialize: function (options) {
        FormFieldEditorView.prototype.initialize.call(this, options);
        if (typeof options.write_pattern != 'undefined') {
            this.write_pattern =  options.write_pattern;
        } else {
            this.write_pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        }
        if (typeof options.write_replace != 'undefined') {
            this.write_replace =  options.write_replace;
        } else {
            this.write_replace = '$3-$2-$1';
        }

        if (typeof options.read_pattern != 'undefined') {
            this.read_pattern =  options.read_pattern;
        } else {
            this.read_pattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
        }
        if (typeof options.read_replace != 'undefined') {
            this.read_replace =  options.read_replace;
        } else {
            this.read_replace = '$3/$2/$1';
        }
    },

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
        var pattern =this.write_pattern;
        if (_.isString(value)) {
            if (pattern.test(value)) {
                var replaced = value.replace(pattern, this.write_replace);
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
        var pattern =this.read_pattern;
        if (_.isString(value) && pattern.test(value)) {
            var replaced = value.replace(pattern, this.read_replace);
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
        this.writeValue(value)

    }

});
module.exports = DateTextEditorView;