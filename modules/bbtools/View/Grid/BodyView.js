'use strict';

var BodyRowView = require('./BodyRowView');


var BodyView = Backbone.View.extend({
    tagName: 'tbody',
    rows: [],
    initialize: function (options) {
        if (typeof options.columns != 'undeifned') {
            this.columns = options.columns;
        }
        if (typeof options.RowView != 'undefined') {
            this.RowView = options.RowView;
        } else {
            this.RowView = BodyRowView;
        }

        this.collection.bind('sync', this.initRows, this);
    },
    initRows: function (e) {
        _.each(this.rows, function (row) {
            row.remove();
        }, this);
        this.rows = [];
        _.each(this.collection.models, function (model) {
            var new_row = new this.RowView({model: model, columns: this.columns});
            this.listenTo(new_row, 'click', this.onClickRow);  // new_row.bind('row.click', this.onClickRow);
            this.rows.push(new_row);
        }, this);

        this.render();

    },
    render: function () {
        // var el = Backbone.$(this._createElement(_.result(this, 'tagName')));
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
    onClickRow: function (e) {
    }
});
module.exports = BodyView;