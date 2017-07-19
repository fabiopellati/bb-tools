'use strict';

var CrudGridRouter;
CrudGridRouter = Backbone.Router.extend({
    page: null,
    query: null,
    search_into: null,
    filters: null,
    order: null,
    order_direction: null,
    initialize: function (options) {
        Backbone.Router.prototype.initialize.apply(this, [options]);
        this.collection = options.collection;
        this.gridView = options.gridView;
        this.gridView.bind('sort', this.onSort, this);
        if (typeof options.searchView != 'undefined') {
            this.searchView = options.searchView;
        }
        if (typeof options.pageNavigator != 'undefined') {
            this.pageNavigator = options.pageNavigator;
        }
        if (typeof options.filters == 'object') {
            this.filters = options.filters;
        }
        if (typeof options.searchView != 'undefined') {
            this.searchView.bind('search', this.onSearch, this);
        }
        if (typeof options.pageNavigator != 'undefined') {
            this.pageNavigator.bind('go', this.onPage, this);
        }
        if (typeof options.filters == 'object') {
            this.filters.bind('sync', this.onFilter, this);
        }

        this.collection.on('request', this.onRequest, this);
        this.collection.on('error', this.onModelError, this);


    },
    routes: {
        ':mode/(:page)(/:second_a)(/:second_b)(/:third_a)(/:third_b)(/:fourth_a)(/:fourth_b)': 'goMode',
    },


    /**
     * sulle request blocco l'interfaccia
     *
     * @param model
     * @param xhr
     * @param options
     */
    onRequest: function (model, xhr, options) {
        xhr.then(function () {
            App.unblockUI();
        });
        App.blockUI();
    },

    /**
     * listener dell'evento model change:[attribute]
     * @param response
     */
    onModelError: function (model, response, options) {
        // console.log(model);
        // console.log(response);
        // console.log(options);
        // return;
        if (response.status == 422) {
            if (_.has(response.responseJSON.validation_messages, this.key)) {
                var messages = _.propertyOf(response.responseJSON.validation_messages)(this.key);
                this.trigger('editor.model.error', {'messages': messages});
            }
        }
        App.unblockUI();
        var message = "<h4>"+ response.statusText +"</h4>";
        message = message + "<h5>" + response.responseText + "</h5>";
        var modal_options = {
            buttons: ['ok'],
            message: message
        };
        var modal = new BbTools.View.Modal.Responsive(modal_options);
        modal.show();

    },

    /**
     *
     * @param e
     */
    onSort: function (e) {
        this.order = e.order;
        this.order_direction = e.order_direction;
        var route = this.composeRoute();
        this.navigate(route, {replace: true});
        this.goFetch();
    },

    /**
     *
     * @param e
     */
    onSearch: function (e) {
        this.query = e.search;
        this.search_into = e.search_into;
        this.page = null;
        var route = this.composeRoute();
        this.navigate(route, {replace: true});
        this.goFetch();

    },

    /**
     * e.filter si aspetta un object con una o più chiavi valorizzate dove la chiave è il nome del filtro (alias campo
     * filtrato ) e il valore è il valore da applicare al filtro
     * @param e
     */
    onFilter: function (e) {
        var route = this.composeRoute();
        this.navigate(route, {replace: true});
        this.goFetch();

    },

    /**
     *
     * @param e
     */
    onPage: function (e) {
        this.page = e.page;
        var route = this.composeRoute();
        this.navigate(route, {replace: true});
        this.goFetch();
    },

    /**
     * analizza il mode e in funzione di come è composto carica i parametri adeguatamente
     * p    solo page
     *
     * @param mode
     * @param page
     * @param second_a
     * @param second_b
     * @param third_a
     * @param third_b
     * @param fourth_a
     * @param fourth_b
     */
    goMode: function (mode, page, second_a, second_b, third_a, third_b, fourth_a, fourth_b) {
        this.reset();
        var mode_split = mode.split('');
        var first = mode_split.shift();
        if (_.isNull(page)) page = 1;

        this.page = page;
        var parserMode = function (mode, a, b,that) {
            if (mode == 'o') {
                that.order = a;
                that.order_direction = b;
                that.gridView.defaultOrder(that.order, that.order_direction);
            } else if (mode == 's') {
                that.query = a;
                that.search_into = b;
                that.searchView.default(that.query);
            } else if (mode == 'f') {
                if (_.isString(a)) {
                    a =a.split(',')
                }
                if (_.isString(b)) {
                    b =b.split(',')
                }

                var values = _.object(a, b);
                _.each(values, function (element, index, list) {
                        that.filters.set(index,element);
                }) ;
            }

        };

        var second = mode_split.shift();
        if (typeof second != 'undefined') {
            parserMode(second, second_a, second_b,this);
        }
        var third = mode_split.shift();
        if (typeof third != 'undefined') {
            parserMode(third, third_a, third_b,this);
        }
        var fourth = mode_split.shift();
        if (typeof fourth != 'undefined') {
            parserMode(fourth, fourth_a, fourth_b,this);
        }
        this.goFetch();
    },


    /**
     * esegue il fetch sulla collection componendo adeguatamente i paramentri
     * nel caso venga invocato con la ricerca o i filtri e una pagina superiore alla lungezza del
     * paginatore il server restituirà un codice 409
     * questo evento viene gestito dalla callback error che imposta la pagina a 1
     */
    goFetch: function () {
        var data = {};
        if (!_.isNull(this.page)) data.page = this.page;
        if (!_.isNull(this.query)) data.search = this.query;
        if (!_.isNull(this.query)) data.search_into = this.search_into;
        if (_.isString(data.search_into)) {
            data.search_into = data.search_into.split(',')
        }
        if (!_.isNull(this.order)) data.order = this.order;
        if (!_.isNull(this.order)) data.order_direction = this.order_direction;
        if (!_.isNull(this.filters)) data.filters_keys = _.keys(this.filters.attributes);
        if (_.isString(data.filters_keys)) {
            data.filters_keys = data.filters_keys.split(',')
        }
        if (!_.isNull(this.filters)) data.filters_values = _.values(this.filters.attributes);
        if (_.isString(data.filters_values)) {
            data.filters_values = data.filters_values.split(',')
        }
        var that = this;
        var options = {
            error: function (e) {
                data.page = that.page = 1;
                that.navigate(that.composeRoute());
                that.collection.goFetch({data: data});
            }
        };
        if (data != {}) {
            options.data = data;
        }
        this.collection.goFetch(options);


    },


    /**
     * reset di tutti i parametri
     */
    reset: function () {
        this.page = null;
        this.order = null;
        this.order_direction = null;
        this.query = null;
        this.search_into = null;
    },

    /**
     * compone la rotta per le azioni di navigate
     *
     * @returns {string}
     */
    composeRoute: function () {
        var route = '';
        var mode = 'p';

        if (_.isNull(this.page) || _.isUndefined(this.page)) this.page = 1;
        // if(!_.isNull(this.query)) this.page=1;
        route += this.page;
        if (!_.isNull(this.order) && !_.isUndefined(this.order)) {
            mode += 'o';
            route += '/' + this.order;
            route += '/' + this.order_direction;
        }
        if (!_.isNull(this.query) && !_.isUndefined(this.query)) {
            mode += 's';
            route += '/' + this.query;
            route += '/' + this.search_into;
        }
        if (!_.isNull(this.filters) && !_.isUndefined(this.filters)) {
            mode += 'f';
            route += '/' + _.keys(this.filters.attributes);
            route += '/' + _.values(this.filters.attributes);
        }

        return mode + '/' + route;
    }
});
module.exports = CrudGridRouter;