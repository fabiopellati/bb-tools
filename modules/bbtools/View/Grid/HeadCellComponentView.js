'use strict';

var HeadCellComponentView = Backbone.View.extend({
    tagName: 'th',
    events: {
        "click ": "clickCell"
    },

    initialize: function (options) {
        if (typeof options.value != 'undefined') {
            this.value = options.value;
        }
        if (typeof options.sortable != 'undefined') {
            this.sortable = options.sortable;
        }
        if (this.value == 'id') {
            this.tagName = 'th';
        } else {
            this.tagName = 'td';
        }
        this.el = null;
        this._ensureElement();
    },
    render: function () {
        this.$el.empty();
        if (typeof this.attributes == 'undefined') this.attributes = {};
        this.$el.attr(this.attributes);
        this.$el.append(this.value.render().el);
        this.delegateEvents();
        return this;
    },
    clickCell: function (e) {
        this.trigger('cell.click', e);
    }
});
module.exports = HeadCellComponentView;