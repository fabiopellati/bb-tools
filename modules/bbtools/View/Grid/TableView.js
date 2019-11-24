'use strict';
var HeadView = require('./HeadView');
var BodyView = require('./BodyView');

var TableView = Backbone.View.extend({
    tagName: 'table',
    events: {
        "click tr": "onClickRow",
        "click td": "onClickCell"
    },

    initialize: function (options) {
        if (typeof options.columns != 'undeifned') {
            this.columns = options.columns;
        }

        /**
         * se passati moduli View dal costruttore
         * verranno usati per creare le view Body ed Head
         */
        if (typeof options.HeadView != 'undefined') {
            this.HeadView = options.HeadView;
        } else {
            this.HeadView = HeadView;
        }
        if (typeof options.BodyView != 'undefined') {
            this.BodyView = options.BodyView;
        } else {
            this.BodyView = BodyView;
        }

        if (typeof options.onClickRow != 'undefined') {
            this.onClickRow = options.onClickRow;
        }

        /**
         * pre inizializzazione delle subView
         */
        this.Head = new this.HeadView({
            columns: this.columns
        });
        this.Head.bind('sort', this.onSort, this);

        this.Body = new this.BodyView({
            columns: this.columns,
            collection: this.collection
        });

    },
    render: function () {
        var el = Backbone.$(this._createElement(_.result(this, 'tagName')));
        if (typeof this.attributes != 'undefined') el.attr(this.attributes);

        this.$el.empty();
        el.append(
            this.Head.render().el
        );
        el.append(
            this.Body.el
        );
        this.$el.append(el);

        this.delegateEvents();

        return this;
    },
    onSort: function (e) {
        this.trigger('sort', e);
    },
    defaultOrder: function (order, direction) {
        this.Head.defaultOrder(order, direction);
    },
    onClickRow: function (e) {
    },
    onClickCell: function (e) {
    }

});
module.exports = TableView;
