'use strict';


/**
 * specs:
 *
 */
var BaseView = require('./ButtonEditorView');

/**
 * genera un button con funzione di commit del model
 *
 */
var ButtonCommitEditorView = BaseView.extend({
        // template: _.template('<button class="<%= attributes.button_class %> editor commit" ><%- label%></button>'),

        label: 'salva',
        initialize: function (options) {
            BaseView.prototype.initialize.call(this, options);
            this.$el.addClass('commit');

            this.bind('model.commit.success', this.onModelCommitSuccess, this);
            this.bind('editor.event', this.onEditorEvent, this);

        },
        /**
         *
         * @param e
         */
        onEditorEvent: function (e) {
            this.commit();
        },

        /**
         * aggiorna i dati del model
         *
         * @param options
         */
        commit: function () {
            this.validate();
            var that = this;
            that.trigger('model.commit', {this: that});
            var callback = {
                success: function (data) {
                    that.trigger('model.commit.success', {this: that, data: data});
                    that.model.trigger('model.commit.success', {this: that, data: data})
                },
                error: function (e) {
                    that.trigger('model.commit.error', {this: that, e: e});
                }
            };
            this.model.save(null, callback);

        },

        /**
         *
         * @param e
         */
        onModelCommitSuccess: function (e) {
            // BbTools.Debug.log(e, 'model.commit.success');
        }
    })
;
module.exports = ButtonCommitEditorView;