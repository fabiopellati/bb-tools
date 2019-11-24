'use strict';

var BodyCellStringView = Backbone.View.extend({
    tagName: 'td',
    events: {
        "click ": "clickCell"
    },

    initialize: function (options) {
        if (typeof options.value != 'undefined') {
            this.value = options.value;
        }

        if (_.isFunction(options.formatValue)) {
            this.formatValue = options.formatValue;
        }

    },
    render: function () {
        this.$el.empty();
        if (typeof this.attributes == 'undefined') this.attributes = {};
        this.attributes = _.extend(this.attributes, {'data-model-id': this.model.get('id')});
        this.$el.attr(this.attributes);
        var value = this.formatValue(this.model.get(this.value));
        this.$el.append(value);
        this.delegateEvents();
        return this;
    },
    formatValue: function (value) {
        return value;
    },

    clickCell: function (e) {
        this.trigger('cell.click', e);
    }
});
module.exports = BodyCellStringView;