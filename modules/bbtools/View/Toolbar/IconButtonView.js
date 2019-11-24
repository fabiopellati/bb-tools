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
    if (typeof  options.beforeRender== 'function') {
      this.beforeRender = options.beforeRender;

    }
    this.template = _.template('<i class="<%- icon.class %>"></i>');
  },
  render: function () {
    this.beforeRender();
    this.$el.empty();
    this.$el.append(this.template({ icon: this.icon }));
    this.delegateEvents();
    return this;
  },
  onEvent: function (e) {
    this.trigger('button.event', this);
  },
  beforeRender: function (e) {
    this.trigger('button.before.render', this);
  }

});
module.exports = IconButtonView;
