'use strict';

var BodyCellCheckboxView = Backbone.View.extend({
    tagName: 'label',
    events: {
        "change input ": "change",
        "click ": "click"
    },
    template: _.template('<input type="checkbox" name="<%- name %>" value="<%- row_id %>"/> <span></span>'),
    initialize: function (options) {
        if (typeof options.value != 'undefined') {
            this.value = options.value;
        }
    },
    render: function () {
        this.$el.empty();
        if (typeof this.attributes == 'undefined') this.attributes = {};
        this.attributes = _.extend(this.attributes, {'data-model-id': this.model.id});
        this.$el.attr(this.attributes);
        this.$el.append(this.template({row_id: this.model.id, name: this.attributes.name}));
        this.delegateEvents();
        return this;
    },
    change: function (e) {
        this.trigger('cell.change', {
            id: e.currentTarget.value,
            name: e.currentTarget.name,
            checked: e.currentTarget.checked,
            model: this.model
        });


    },
    click: function (e) {
        e.stopPropagation();
    }
});
module.exports = BodyCellCheckboxView;