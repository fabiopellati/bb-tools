'use strict';
var Collection = Backbone.Collection.extend({
    collection_name: '',
    _first_page: '',
    _next_page: '',
    _prev_page: '',
    _last_page: '',
    _self_page: '',

    _selected: [],
    initialize: function (options) {
        this.bind('add', function (model) {
            model.bind('select', this.onSelectModel, this);
            model.bind('unselect', this.onUnSelectModel, this);
        }, this);
        // this.model.on('error', this.onModelError, this);
    },

    // onModelError:function(model, response, options){
    //     this.trigger('error',{"model":model, "response":response, "options":options});
    // },

    delete_selected: function () {
        if (this._selected.length == 0) {
            var message = "<h4>nessuna riga selezionata</h4>";
            var modal_options = {
                message: message
            }
        } else {
            var message = "<h4>saranno eliminate le seguenti righe:</h4><ul>";
            _.each(this._selected, function (id) {
                var model = this.get(id);
                var identifier=model.getIdentifier();
                message = message + "<li><h5>" + identifier + "</h5></li>";
            },this);
            message = message + "</ul>";
            message = message + "<h4>si desidera proseguire?</h4>";
            var modal_options = {
                buttons: ['yes', 'no'],
                message: message
            }

        }
        modal_options.id = 'delete_selected';
        var modal = new BbTools.View.Modal.Responsive(modal_options);
        modal.bind('modal.before.show', this.onEvent, this);
        modal.bind('modal.show', this.onEvent, this);
        modal.bind('modal.before.hide', this.onEvent, this);
        modal.bind('modal.hide', this.onEvent, this);
        modal.bind('yes', this.onDeleteYes, this);
        modal.show();
    },
    /**
     * evento generico e.type permette di testare che tipo di evento è stato scatenato
     * @param e
     */
    onEvent: function (e) {

    },
    /**
     * evento eseguito quando vine confermata con yes la richiesta di eliminazione sulla modal
     * @see delete_selected
     * @param e
     */
    onDeleteYes: function (e) {
        _.each(this._selected, function (id) {
            this.get(id).destroy({
                error: function (model, response, options) {
                    var modal = new BbTools.View.Modal.Responsive({
                        id: 'delete_failed_' + model.getIdentifier(),
                        message: '<h4>la riga ' + model.getIdentifier() + ' non è stata eliminata</h4>'
                    });
                    modal.show();


                }
            });
        }, this);
        this._selected = [];
        this.fetch();
        // BbTools.Debug.log(e, 'collection cancel yes');

    },

    /**
     * listener eseguito quando il model in una collection viene contrassegnato come selected
     * @param e
     */
    onSelectModel: function (e) {
        this._selected.push(e.id);
        this._selected = _.uniq(this._selected);
        // BbTools.Debug.log(e, 'collection on selectModel');
    },

    /**
     * listener eseguito quando il model in una collection viene rimosso dall'elenco dei selected
     * @param e
     */
    onUnSelectModel: function (e) {
        var index = this._selected.indexOf(e.id);
        if (index > -1) {
            this._selected.splice(index, 1);
        }
    },
    /**
     * apigility restituisce un oggetto con
     * _embedded{
     *      nome_risorsa:[
     *          righe,
     *      ]
     *
     * vengono estratte le righe prendendo i valori della prima chiave (none_risorsa nell'esempio)
     * prendendo come per assodato che ci sia sempre solo una chiave.
     *
     * @param data
     */
    parse: function (data) {
        this.page = data.page;
        this.page_count = data.page_count;
        this.page_size = data.page_size;
        this.total_items = data.total_items;
        return _.first(_.values(data._embedded));
    },
    first_page: function () {
        if (_.isString(this._links.first.href)) {
            this.url = this._links.first.href;
            this.fetch();
        }
    },
    prev_page: function () {
        if (_.isString(this._links.prev.href)) {
            this.url = this._links.prev.href;
            this.fetch();
        }
    },
    next_page: function () {
        if (_.isString(this._links.next.href)) {
            this.url = this._links.next.href;
            this.fetch();
        }
    },
    last_page: function () {
        if (_.isString(this._links.last.href)) {
            this.url = this._links.last.href;
            this.fetch();
        }
    },
    go_page: function (page) {
        this.url = this._links.first.href;
        this.fetch({data: {page: page}});
    },
    goFetch: function (options) {
        var uri = this.url;
        var url_split = {};
        uri.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3) {
                if ($0 == $1 && typeof $3 == 'undefined') {
                    url_split['url'] = $1;
                } else {
                    url_split[$1] = $3;
                }
            }
        );

        this.url = url_split.url;
        if (typeof options == 'undefined') var options = {};
        this.fetch(options);

    }

});

module.exports = Collection;