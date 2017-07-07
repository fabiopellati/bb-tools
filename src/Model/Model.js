'use strict';

var Model = Backbone.Model.extend({
    initialize: function (options) {
        this.bind('select', this.onSelect, this);
        this.bind('unselect', this.onUnSelect, this);
    },

    /**
     * listener eseguito quando il model in una collection viene contrassegnato come selected
     * @param e
     */
    onSelect: function (e) {
    }
    ,

    /**
     * listener eseguito quando il model in una collection viene rimosso dall'elenco dei selected
     * @param e
     */
    onUnSelect: function (e) {
    },

    /**
     * idrata il model partendo dall'oggetto passato come data
     *
     * @param data
     * @returns {*}
     */
    parse: function (data) {
        _.mapObject(data, function (value, key) {
            this.key = new Backbone.Model(value);
        }, data);
        return data;
    },

    /**
     * restituisce il testo per identificare il model nelle interfaccie
     * per default restituisce l'attributo id
     *
     * @returns {*}
     */
    getIdentifier: function () {
        return this.id;
    }
});
module.exports = Model;