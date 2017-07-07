'use strict';

var BodyCellStringView = require('./BodyCellStringView');
var BodyCellComponentView = require('./BodyCellComponentView');

var BodyRowView = Backbone.View.extend({
        tagName: 'tr',
        events: {
            "click ": "clickRow",
        },

        initialize: function (options) {
            if (typeof options.columns != 'undeifned') {
                this.columns = options.columns;
            }
            if (typeof options.CellView != 'undefined') {
                this.CellView = options.CellView;
            } else {
                this.CellView = BodyCellStringView;
            }

            this.model.bind('change', this.initCells, this);
            this.initCells();
        },

        /**
         * inizializza le celle
         * per ogni colonna valuta il tipo di value
         * se è una stringa inserisce una CellView standard
         * se è un oggetto json cerca di crearlo utilizzando value.view come prototipo e value.options
         * come parametro del costruttore
         * se invece il prototipo di value è un Backbone.View allora crea  ina view concreat dal prototipo e
         * la passa come value ad un  BodyCellComponentView
         *
         *
         * @param e
         */
        initCells: function (e) {
            _.each(this.cells, function (cell) {
                cell.remove();
            }, this);
            this.cells = [];
            // var columns=_.values(this.columns);
            _.mapObject(this.columns, function (value, key) {
                if (value.prototype instanceof Backbone.View) {
                    var cellValue = new value({});
                    var cell = new BodyCellComponentView({model: this.model, value: cellValue})
                } else if (value instanceof Backbone.View) {
                    var cell = value;
                } else if (typeof value == 'object') {
                    value.options.model = this.model;
                    var attributes = (typeof value.attributes != 'undefined') ? value.attributes : {};
                    var valuecell = eval("new " + value.view + "(value.options)");
                    var cell = new BodyCellComponentView({model: this.model, value: valuecell, attributes: attributes});
                } else if (typeof value == 'string') {
                    var cell = new this.CellView({model: this.model, value: key, label: value});

                } else {
                    BbTools.Debug.log(value, 'tipo non supportato');
                }

                if (typeof cell != 'undefined') {
                    this.listenTo(cell, 'cell.change', this.onCellChange);
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
            this.attributes = _.extend(this.attributes, {'data-model-id': this.model.get('id')});
            this.$el.attr(this.attributes);

            _.each(this.cells, function (cell) {
                this.$el.append(
                    cell.render().el
                );
            }, this);

            this.delegateEvents();
            return this;
        },

        selectRow: function (id) {
            this.$el.addClass('selected');
            this.model.trigger('select', {id: id});

        },
        unSelectRow: function (id) {
            this.$el.removeClass('selected');
            this.model.trigger('unselect', {id: id});

        },
        /**
         * metodo disponibile per l'override
         * @param e
         */
        clickRow: function (e) {
        },

        onCellChange: function (e) {
            if (e.name == 'select_row') {
                if (e.checked == true) {
                    this.selectRow(e.id);
                } else if (e.checked == false) {
                    // BbTools.Debug.log(e, 'BodyRowView.onCellChange');
                    this.unSelectRow(e.id);

                }
            }
        }

    })
;
module.exports = BodyRowView;