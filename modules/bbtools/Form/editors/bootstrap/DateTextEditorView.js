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

    if (typeof options.write_pattern !== 'undefined') {
      this.write_pattern =  options.write_pattern;
    } else {
      this.write_pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    }
    if (typeof options.write_replace !== 'undefined') {
      this.write_replace =  options.write_replace;
    } else {
      this.write_replace = '$3-$2-$1';
    }

    if (typeof options.read_pattern !== 'undefined') {
      this.read_pattern =  options.read_pattern;
    } else {
      this.read_pattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    }
    if (typeof options.read_replace !== 'undefined') {
      this.read_replace =  options.read_replace;
    } else {
      this.read_replace = '$3/$2/$1';
    }


    FormFieldEditorView.prototype.initialize.call(this, options);
  },



});
module.exports = DateTextEditorView;
