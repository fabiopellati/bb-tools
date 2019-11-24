'use strict';

var template = require('./template/page_navigator.hbs');

var PageNavigatorView = Backbone.View.extend({
    initialize: function (options) {
        if (typeof  options.template != 'undefined') {
            this.template = options.template;
        } else {
            this.template = _.template(template);
        }

        this.collection.bind('sync', this.render, this);
    },
    events: {
        'click .pagination .first': 'first',
        'click .pagination .next': 'next',
        'click .pagination .prev': 'prev',
        'click .pagination .last': 'last',
        'click .pagination .page': 'page',
        'click .pagination .refresh': 'refresh'
    },

    render: function () {
        var data = {
            models: this.collection.models,
            links: this.collection._links,
            page: this.collection.page,
            page_count: this.collection.page_count,
            page_size: this.collection.page_size,
            total_items: this.collection.total_items

        };
        var nav_pages = [];
        for (var i = -2; i < 3; i++) {
            if (data.page + i > 0 && data.page + i <= data.page_count) {
                var nav_page = {
                    page: data.page,
                    class: 'page',
                    data_page: data.page + i,
                    caption: data.page + i
                };
                if (data.page + i == 0) {
                    nav_page.caption = data.page;
                    nav_page.data_page = data.page;
                }
                if (data.page + i == data.page) {
                    nav_page.class = 'active';
                }
                nav_pages.push(nav_page)
            }
        }
        if (data.page < 2) {
            if (4 < data.page_count) {
                nav_pages.push({
                    page_count: data.page_count,
                    page: data.page,
                    class: 'page',
                    data_page: 4,
                    caption: 4
                })
            }
        }
        if (data.page < 3) {
            if (5 < data.page_count) {
                nav_pages.push({
                    page_count: data.page_count,
                    page: data.page,
                    class: 'page',
                    data_page: 5,
                    caption: 5
                })
            }
        }

        data.nav_pages = nav_pages;
        this.$el.html(this.template(data));
    },
    refresh: function (e) {
        this.trigger('go', {page: e.currentTarget.dataset.page});

        // this.collection.first_page();
    },
    first: function (e) {
        this.trigger('go', {page: e.currentTarget.dataset.page});

        // this.collection.first_page();
    },
    prev: function (e) {
        this.trigger('go', {page: e.currentTarget.dataset.page});
        // this.collection.prev_page();
    },
    next: function (e) {
        this.trigger('go', {page: e.currentTarget.dataset.page});
        // this.collection.next_page();
    },
    last: function (e) {
        this.trigger('go', {page: e.currentTarget.dataset.page});
        // this.collection.last_page();
    },
    page: function (e) {
        this.trigger('go', {page: e.currentTarget.dataset.page});
        // this.collection.go_page(e.currentTarget.dataset.page);
    }

});
module.exports = PageNavigatorView;
