'use strict';

var IconButtonView = require('../Toolbar/IconButtonView');
var template = require('./template/search.hbs');
var SearchView = Backbone.View.extend({
    initialize: function (options) {
        if (typeof  options.template != 'undefined') {
            this.template = options.template;
        } else {
            this.template = _.template(template);
        }
        if (typeof  options.search_columns != 'undefined') {
            this.search_columns = options.search_columns;
        }
        this.render();
    },
    events: {
        'keyup  input': 'search',
    },

    render: function () {
        this.$el.html(this.template({}));
        if (typeof this.attributes != 'undefined') this.$el.attr(this.attributes);

    },

    default: function (query) {
        _.each(this.$('input'), function (element) {
            element.value = this.query;
        }, {query: query});
    },

    clearSearch: function () {
        _.each(this.$('input'), function (element) {
            element.value = '';
            this.trigger('search', {});
        }, this);

    },

    /**
     * salta alcuni tasti
     * key 16 Shift
     * @param e
     */
    search: function (e) {
        if (e.keyCode != 13) {
            return;
        }
        // if (e.key.length != 1
        //     && e.keyCode != 8
        //     && e.keyCode != 46
        // ) {
        //     return;
        // }
        var data = {
            search: e.currentTarget.value,
            search_into: this.search_columns
        };
        this.trigger('search', data);
        // this.collection.goFetch(data);
    },

    /**
     *
     */
    getResetButton: function () {
        var button = new IconButtonView({
            attributes: {
                class: 'btn btn-default',
                name: 'reset',
                title: 'Reset search'
            },
            icon: {
                class: 'fa fa-remove'
            },
            onEvent: function (e) {
                // BbTools.Debug.log(e, 'sulla definizione in SearchView');
                this.trigger('click');
            }
        });
        button.bind('click', this.clearSearch, this);
        button.render();
        return button;
    }
});
module.exports = SearchView;
