'use strict';
var Model = require('./Model');

var ApigilityModel = Model.extend({

    linksCollections:{},

    /**
     * apigility rest espone una chiave con links questo metodo restituisce una Collection che punta a questi link
     *
     * @param link
     * @returns {*}
     */
    getLinkCollection : function(link){
        var links= this.attributes._links;
        if (_.isObject(links) && _.has(links,link)) {
            var linkObject = _.propertyOf(links)(link);
            var Collection = ApigilityModel.extend({
                collection_name: link,
                url: linkObject.href,
                model: ApigilityModel
            });
            return new Collection();
        }
        return false;
    },

});
module.exports = ApigilityModel;