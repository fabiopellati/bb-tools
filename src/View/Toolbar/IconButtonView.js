'use strict';

var IconButtonView = Backbone.View.extend({
    tagName: 'button',
    events: {
        "click ": "onEvent"
    },
    initialize: function (options) {
        if (typeof  options.icon != 'undefined') {
            this.icon = options.icon;
        }
        if (typeof  options.onEvent == 'function') {
            this.onEvent = options.onEvent;
        }

        this.template = _.template('<i class="<%- icon.class %>"></i>');
    },
    render: function () {
        this.$el.empty();
        this.$el.append(this.template({icon: this.icon}));
        this.delegateEvents();
        return this;
    },
    onEvent: function (e) {
        this.trigger('button.event', this);
    }

});
module.exports = IconButtonView;