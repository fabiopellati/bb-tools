'use strict';

var HeadCellStringView = require('./HeadCellStringView');
var HeadCellComponentView = require('./HeadCellComponentView');
var HeadRowView = Backbone.View.extend({
    tagName: 'tr',
    events: {
        "click ": "clickHeadRow"
    },

    initialize: function (options) {
        if (typeof  options.columns != 'undefined') {
            this.columns = options.columns;
        }
        if (typeof options.CellView != 'undefined') {
            this.CellView = options.CellView;
        } else {
            this.CellView = HeadCellStringView;
        }
        // this.model.bin
        // d('change', this.initCells, this);
        this.initCells();
    },

    /**
     * inizializza le celle
     *
     * @param e
     */
    initCells: function (e) {
        _.each(this.cells, function (cell) {
            cell.remove();
        }, this);
        this.cells = [];
        _.mapObject(this.columns, function (value, key) {
            if (value.prototype instanceof Backbone.View) {
                /**
                 * se value è una view che estende unaa view di Backbone viene renderizzata direttamente
                 * sarà cura del'estensore prevedere un eventuale ogggetto per la renderizzazione della cella th o td
                 */
                var cell = new value({});
            } else if (value instanceof Backbone.View) {
                /**
                 * se value è una view di Backbone vien renderizzata una cella con value come contenuto
                 */
                var cell = new HeadCellComponentView({model: this.model, value: value});

            } else if (typeof value == 'object') {
                /**
                 * se viene passato un oggetto Json si da per assodato che sia una definizione di oggetto
                 * con alcune proprietà predefinite:
                 * - renderInHead booleano se true l'oggetto così come definito viene renderizzato
                 *   anche nei titoli di colonna iniettato in una HeadCellComponent
                 *   se false viene renderizzata una cella con value ''
                 */
                if (value.renderInHead == true) {
                    var cellView = eval("new " + value.view + "(value.options)");
                    var cell = new HeadCellComponentView({model: this.model, value: cellView})
                } else {
                    var label = (typeof value.options.label != 'undefined') ? value.options.label : '';
                    var sortable = (typeof value.options.label != 'undefined') ? value.options.sortable : '';
                    var cell = new HeadCellStringView({model: this.model, value: key, label: label, sortable: sortable});
                }
                cell.bind('sort', this.onSort, this);
            } else if (typeof value == 'string') {
                /**
                 * se vaue è una stringa si presuppone che sia una proprietà (campo) del model e viene
                 * visualizzato con la proprietà di ordinamento
                 */
                var cell = new this.CellView({model: this.model, value: key, label: value});
                cell.bind('sort', this.onSort, this);
            } else {
                BbTools.Debug.log(value, 'tipo non supportato');
            }
            if (typeof cell != 'undefined') {
                this.cells.push(cell);
            }

        }, this);
        this.render();
    },


    /**
     *
     * @returns {View}
     */
    render: function () {
        this.$el.empty();
        if (typeof this.attributes == 'undefined') this.attributes = {};
        // this.attributes = _.extend(this.attributes, {'data-model-id': this.model.get('id')});
        this.$el.attr(this.attributes);

        _.each(this.cells, function (cell) {
            this.$el.append(
                cell.render().el
            );
        }, this);

        this.delegateEvents();
        return this;
    },
    onSort: function (e) {
        this.resetOrder();
        this.trigger('sort', {order: e.order, order_direction: e.order_direction});

    },
    resetOrder: function () {
        _.each(this.cells, function (cell) {
            if (typeof cell.value == 'string') {
                cell.resetOrder();
            }

        });
    }
    ,
    defaultOrder: function (field, direction) {
        Backbone.$('th[data-field=' + field + '] > div.sortable').removeClass('both');
        Backbone.$('th[data-field=' + field + '] > div.sortable').addClass(direction);

    }
    ,
    /**
     * metodo disponibile per l'override
     * @param e
     */
    clickHeadRow: function (e) {

    }
});
module.exports = HeadRowView;
