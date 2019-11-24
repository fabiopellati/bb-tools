'use strict';
var Model = require('./Model');
var Collection = require('../Collection/Collection');

var ApigilityModel = Model.extend({

    linksCollections: {},

    /**
     * apigility rest espone una chiave con links questo metodo restituisce una Collection che punta a questi link
     *
     * @param link
     * @returns {*}
     */
    getLink: function (link) {
        var links = this.attributes._links;
        if (_.isObject(links) && _.has(links, link)) {
            var linkObject = _.propertyOf(links)(link);
            switch (linkObject.type) {
                case 'collection':
                    var Link = Collection.extend({
                        collection_name: link,
                        url: linkObject.href,
                        model: ApigilityModel
                    });
                    break;
                case 'entity':
                    var Link = ApigilityModel.extend({
                        collection_name: link,
                        url: linkObject.href
                    });
                    break;
            }
            return new Link();
        }
        return false;
    },

});
module.exports = ApigilityModel;