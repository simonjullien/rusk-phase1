define([
	"jquery",
	"underscore",
	"backbone",
    "config",
    "router"
], function (
	$,
	_,
	Backbone,
    Config,
    Router
) {
	"use strict";
    return Backbone.View.extend({

        $node:null,

        initialize: function () {

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
            
        },

        out:function(){
            this.destroy();
        },

        destroy: function () {
            this.stopListening();
            this.undelegateEvents();
            this.off();
            this.$node.remove();
        }
    });
});
