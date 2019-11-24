'use strict';

var BodyCellComponentView = Backbone.View.extend({
    tagName: 'td',
    events: {
        "click ": "clickCell"
    },

    initialize: function (options) {
        if (typeof options.value != 'undefined') {
            this.value = options.value;
            this.value.bind('selected', function (e) {
                this.trigger('selected', e)
            }, this);
            this.value.bind('cell.change', function (e) {
                this.trigger('cell.change', e)
            }, this);
        }

    },
    render: function () {
        this.$el.empty();
        if (typeof this.attributes == 'undefined') this.attributes = {};
        this.attributes = _.extend(this.attributes, {'data-model-id': this.model.get('id')});
        this.$el.attr(this.attributes);
        this.$el.model=this.model;
        this.$el.append(this.value.render().el);
        this.delegateEvents();
        return this;
    },
    clickCell: function (e) {

        this.trigger('cell.click', e);
    }
});
module.exports = BodyCellComponentView;
