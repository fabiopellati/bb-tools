'use strict';
var Model = require('./Model');

var ApigilityModel = Model.extend({

    /**
     * idrata il model partendo dall'oggetto passato come data
     * in apigility i dati sono nella chiave _embedded
     *
     * @param data
     * @returns {*}
     */
    parse: function (data) {
        _.mapObject(data._embedded, function (value, key) {
            this.key = new Backbone.Model(value);
        }, data);
        return data;
    },

});
module.exports = ApigilityModel;