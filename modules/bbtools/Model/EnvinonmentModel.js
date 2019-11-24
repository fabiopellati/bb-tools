'use strict';

var EnvironmentModel = Backbone.Model.extend({

    bindModels: [],

    initialize: function () {
        this.on('change', this.onChange, this);
    },

    /**
     *
     * @param m
     * @param options
     */
    onChange: function (m, options) {
        var that=this;
        _.mapObject(m.changed, function (value, key) {

            that.bindModels.map(function (bindModel) {
                bindModel.set(key, value);
            });
        })
    },

    /**
     *
     * @param model
     */
    bindModel: function (model) {
        this.bindModels.push(model);
    }

});
module.exports = EnvironmentModel;