'use strict';
var BackboneForms = require('backbone-forms');
var form = require('./template/form.hbs');
var form_field = require('./template/form_field.hbs');

var Form = Backbone.Form.extend({
    initialize: function (options) {
        Backbone.Form.prototype.initialize.apply(this, [options]);
        this.model.bind('change', this.modelChange, this);
        this.history_length = window.history.length;

    },
    events: {
        'click button.submit-button': 'submit',
        'click button.submit-button-close': 'submitClose',
        'click button.button-cancel': 'cancel',
        'click a.form-cancel': 'cancel',
        'keyup': 'onKeyup'
    },
    onKeyup: function (e) {
        if (e.keyCode == 13) {
            e.stopPropagation();
        }
    },
    cancel: function (e) {
        this.closeForm();
    },
    /**
     * esegue il submit col parametro close
     * @param e
     */
    submitClose: function (e) {
        this.submit(e, true);
    },
    /**
     * esegue la chiusura della form
     * per default equivare a window.history.back()
     */
    closeForm: function () {
        var diff = this.history_length - history.length;
        window.history.go(diff - 1);
    },
    /**
     * effettua il salvataggio del model
     * se il model restituisce degli errori li considera errori di validazione
     *
     * @param e
     * @param close se true esegue colse
     * @returns {*}
     */
    submit: function (e, close) {
        this.commit({validate: true});
        var that = this;
        var save = this.model.save({}, {
            success: function (model, response, options) {
                if (close === true) {
                    that.closeForm();
                }
            },
            error: function (model, response, options) {
                _.each(response.responseJSON.validation_messages, function (message, field) {
                    this.fields[field].setError(_.values(message)[0]);
                }, that);
            }
        });
        return save;
    },
    modelChange: function (e) {
        _.each(this.fields, function (field) {
            this.form.setValue(field.key, this.changed[field.key]);
        }, {form: this, changed: e.changed})
    }
});

/**
 * Bootstrap 3 templates
 */
Form.template = _.template('\
    <form class="form-horizontal" role="form">\
      <div data-fieldsets></div>\
      <% if (submitButton) { %>\
        <button type="submit" class="btn"><%= submitButton %></button>\
      <% } %>\
    </form>\
  ');


Form.Fieldset.template = _.template('\
    <fieldset data-fields>\
      <% if (legend) { %>\
        <legend><%= legend %></legend>\
      <% } %>\
    </fieldset>\
  ');


Form.Field.template = _.template('\
    <div class="form-group field-<%= key %>">\
      <label class="col-sm-2 control-label" for="<%= editorId %>"><%= title %></label>\
      <div class="col-sm-10">\
        <span data-editor></span>\
        <p class="help-block" data-error></p>\
        <p class="help-block"><%= help %></p>\
      </div>\
    </div>\
  ');


Form.NestedField.template = _.template('\
    <div class="field-<%= key %>">\
      <div title="<%= title %>" class="input-xlarge">\
        <span data-editor></span>\
        <div class="help-inline" data-error></div>\
      </div>\
      <div class="help-block"><%= help %></div>\
    </div>\
  ');

Form.editors.Base.prototype.className = 'form-control';
Form.Field.errorClassName = 'has-error';


if (Form.editors.List) {

    Form.editors.List.template = _.template('\
      <div class="bbf-list">\
        <ul class="list-unstyled clearfix" data-items></ul>\
        <button type="button" class="btn bbf-add" data-action="add">Add</button>\
      </div>\
    ');


    Form.editors.List.Item.template = _.template('\
      <li class="clearfix">\
        <div class="pull-left" data-editor></div>\
        <button type="button" class="btn bbf-del" data-action="remove">&times;</button>\
      </li>\
    ');


    Form.editors.List.Object.template = Form.editors.List.NestedModel.template = _.template('\
      <div class="bbf-list-modal"><%= summary %></div>\
    ');

}
/**
 * Bootstrap 3 templates
 */
Form.template = _.template(form);
Form.Field.template = _.template(form_field);


module.exports = Form;
