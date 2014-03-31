define([
	"jquery",
	"underscore",
	"backbone",
    "config",
    "router",
    "tweenmax"
], function (
	$,
	_,
	Backbone,
    Config,
    Router,
    TweenMax
) {
	"use strict";
    return Backbone.View.extend({

        $node:null,

        initialize: function () {
            _.bindAll(this,"destroy");
        },

        render: function () {

        },

        onResize: function (w,h) {

        },

        compileAndAppendTemplate:function(template, data){
            var templateData = data || {};
            var compiledTemplate = this.getCompiledTemplate(template);
            this.$node = $(compiledTemplate(templateData));
            this.$el.append(this.$node);
        },

        getCompiledTemplate:function(t){
            return Handlebars.compile(t);
        },

        enter:function(){
            TweenMax.set(this.$node,{opacity:0});
            TweenMax.to(this.$node, 1, {opacity:1, delay:0.5, ease:Expo.easeInOut});
        },

        out:function(){
            TweenMax.killTweensOf(this.$node);
            TweenMax.to(this.$node, 1, {opacity:0, ease:Expo.easeInOut, onComplete:this.destroy});
        },

        destroy: function () {
            this.stopListening();
            this.undelegateEvents();
            this.off();
            this.$node.remove();
        }
    });
});
