'use strict';

/**
 *
 * ESEMPIO DI OPTIONS DA PASSARE AL COSTRUTTORE
 * {
         *     view: 'View/Toolbar/IconButtonView',
         *         options: {
         *     attributes: {
         *     class: 'btn btn-default',
         *             name: 'reset',
         *             title: 'Reset search'
         *     },
         *     icon: {
         *     class: 'fa fa-remove'
         *     },
         *     onEvent:function(e){
         *         Debug.log(e, 'datta definizione');
         *     }
         * }
         *
         *
         */

var ButtonGroupView = Backbone.View.extend({
    tagName: 'div',
    childs: [],
    events: {
        'click': 'onEventGroup'
    },
    initialize: function (options) {
        var that = this;
        this.childs = [];
        _.each(options.tools, function (tool) {
            if (tool.prototype instanceof Backbone.View) {
                var child = new tool({});
            } else if (tool instanceof Backbone.View) {
                var child = tool;
            } else if (typeof tool == 'object') {
                var child = eval("new " + tool.view + "(tool.options)");
            } else {
                BbTools.Debug.log(tool, 'tipo non supportato');
                return false;
            }
            that.childs.push(child);
        });

    },
    render: function () {
        if (typeof this.attributes != 'undefined') this.$el.attr(this.attributes);
        // this.$el.empty();
        _.each(this.childs, function (child) {
            child.model=this.model;
            this.$el.append(child.el);
            child.render();
        }, this);

        this.delegateEvents();
        return this;
    },
    onEventGroup: function (e) {
        // BbTools.Debug.log(e, 'sul group');
    }

});
module.exports = ButtonGroupView;
