'use strict';
var template = require('./template/head_cell.html');

var HeadCellStringView = Backbone.View.extend({
    tagName: 'th',
    events: {
        // "click ": "clickHeadCell",
        "click .sortable.both": "sortBoth",
        "click .sortable.desc": "sortAsc",
        "click .sortable.asc": "sortDesc"
    },

    initialize: function (options) {
        if (typeof options.value != 'undefined') {
            this.value = options.value;
        }
        if (typeof options.label != 'undefined') {
            this.label = options.label;
        } else {
            this.label = this.value.replace('_', ' ');
        }
      if (typeof options.sortable != 'undefined') {
        this.sortable = options.sortable;
      }
        this.template = _.template(template);
    },
    render: function () {
        this.$el.empty();
        if (typeof this.attributes == 'undefined') this.attributes = {};
        this.attributes = _.extend(this.attributes, {'data-field': this.value});
        this.$el.attr(this.attributes);


        this.$el.append(this.template({value: this.value, label: this.label}));
        if (this.value == "" || this.sortable===false) {
            this.$('.sortable').removeClass('sortable');
            this.$('.both').removeClass('both');
        }

        this.delegateEvents();
        return this;
    },
    sortBoth: function (e) {
        this.trigger('sort', {order: e.currentTarget.dataset.field, order_direction: 'asc'});
        Backbone.$(e.currentTarget).removeClass('both');
        Backbone.$(e.currentTarget).addClass('asc');

    },
    sortAsc: function (e) {
        this.trigger('sort', {order: e.currentTarget.dataset.field, order_direction: 'asc'});
        Backbone.$(e.currentTarget).removeClass('both');
        Backbone.$(e.currentTarget).removeClass('desc');
        Backbone.$(e.currentTarget).addClass('asc');

    },
    sortDesc: function (e) {
        this.trigger('sort', {order: e.currentTarget.dataset.field, order_direction: 'desc'});
        Backbone.$(e.currentTarget).removeClass('both');
        Backbone.$(e.currentTarget).removeClass('asc');
        Backbone.$(e.currentTarget).addClass('desc');

    },
    resetOrder: function () {
        Backbone.$('div.sortable').removeClass('asc');
        Backbone.$('div.sortable').removeClass('desc');
        Backbone.$('div.sortable').addClass('both');
    }
});
module.exports = HeadCellStringView;
