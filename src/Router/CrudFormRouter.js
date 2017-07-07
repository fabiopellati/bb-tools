'use strict';

var Router = Backbone.Router.extend({
    initialize: function (options) {
        Backbone.Router.prototype.initialize.apply(this, [options]);
        this.model = options.model;
        if (typeof options.formView != 'undefined') {
            this.formView = options.formView;
        }

        if (typeof options.formTitle != 'undefined') {
            this.formTitle = options.formTitle;
        }

        _.each(Backbone.$('a.form-cancel'), function (element) {
            Backbone.$(element).bind('click', {this: this}, this.onFormCancel);
        }, this);
        this.model.on('sync', this.onModelSync, this);
        this.model.on('request', this.onRequest, this);
        this.bind('cancel', this.onFormCancel, this);
        this.listenTo(this.model, 'error', this.onModelError, this);

    },

    onFormCancel: function (e) {
        // var diff = this.history_length - history.length;
        // window.history.go(diff - 1);

    },

    /**
     * sulle request blocco l'interfaccia
     *
     * @param model
     * @param xhr
     * @param options
     */
    onRequest: function (model, xhr, options) {
        xhr.then(function () {
            App.unblockUI();
        });
        App.blockUI();
    },

    /**
     *
     * @param e
     */
    onModelSync: function (e) {
        Backbone.$('ul.page-breadcrumb > li > a.active').html(this.formTitle());
        Backbone.$('ul.page-breadcrumb > li > a.active').attr('href', window.location.href);
        Backbone.$('ul.page-breadcrumb > li > a.breadcrumb-grid').attr('href', 'javascript:history.back()');
    },
    formTitle: function (e) {
    },
    /**
     * listener dell'evento model change:[attribute]
     * @param e
     */
    onModelError: function (model, e) {
        console.log(e);
        if (e.status == 422) {
            if (_.has(e.responseJSON.validation_messages, this.key)) {
                var messages = _.propertyOf(e.responseJSON.validation_messages)(this.key);
                this.trigger('editor.model.error', {'messages': messages});
            }
        }

    },


});
module.exports = Router;
