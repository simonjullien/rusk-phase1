define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "router",
    "tweenmax",
    "handlebars",
    "util/utils",
    "model/app_model"
], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    TweenMax,
    Handlebars,
    Utils,
    AppModel
) {

    "use strict";

    return Backbone.View.extend({

        initialize: function(options) {
            _.bindAll(this, "destroy");
        },

        enter:function(sign){
            TweenMax.set(this.$el,{x:sign*1000,opacity:0});
            TweenMax.to(this.$el,1,{x:0, z:-1,opacity:1, delay:Math.random()*0.2, ease:Expo.easeInOut});
        },

        out:function(sign){
            TweenMax.killTweensOf(this.$el);
            TweenMax.to(this.$el,1,{x:-sign*1000, z:-1,opacity:0, delay:Math.random()*0.2, ease:Expo.easeInOut, onComplete:this.destroy});
        },

        destroy:function(){
            this.$el.detach();
        }
    });
});