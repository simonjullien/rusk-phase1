define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "router",
    "handlebars",
    "util/utils",
    "model/app_model"
], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    Handlebars,
    Utils,
    AppModel
) {

    "use strict";

    return Backbone.View.extend({

        initialize: function(options) {
        },

        enter:function(){

        },

        out:function(){
            this.destroy();
        },

        destroy:function(){
            this.$el.detach();
        }
    });
});