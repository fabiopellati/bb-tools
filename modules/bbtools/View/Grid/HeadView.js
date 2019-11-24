'use strict';

var HeadRowView = require('./HeadRowView');
var HeadView = Backbone.View.extend({
    tagName: 'thead',
    rows: [],
    initialize: function (options) {
        if (typeof options.columns != 'undefined') {
            this.columns = options.columns;
        }
        if (typeof options.RowView != 'undefined') {
            this.RowView = options.RowView;
        } else {
            this.RowView = HeadRowView;
        }
        this.initRows();
        // this.model.bind('sync', this.initRows, this);
    },
    initRows: function (e) {
        _.each(this.rows, function (row) {
            row.remove();
        }, this);
        this.rows = [];
        var new_row = new this.RowView({columns: this.columns});
        this.listenTo(new_row, 'row.click', this.onClickHeadRow);
        this.listenTo(new_row, 'sort', this.onSort);
        this.rows.push(new_row);

        this.render();
    },
    render: function () {
        this.$el.empty();
        if (typeof this.attributes != 'undefined') this.$el.attr(this.attributes);

        _.each(this.rows, function (row) {
            this.$el.append(
                row.render().el
            );
        }, this);

        this.delegateEvents();
        return this;
    },
    onClickHeadRow: function (e) {
    },
    onSort: function (e) {
        this.trigger('sort', {order: e.order, order_direction: e.order_direction});

    },

    resetOrder: function () {
        _.each(this.rows, function (row) {
            row.resetOrder();
        }, this);
    },

    defaultOrder: function (field, direction) {
        this.resetOrder();
        _.each(this.rows, function (row) {
            row.defaultOrder(field, direction);
        }, this);
    }

});
module.exports = HeadView;