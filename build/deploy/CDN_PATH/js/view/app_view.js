define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "handlebars",
    "view/common/base_view",
    "view/common/transitioner",
    "view/modules/shell/shell"
], function (
    $,
    _,
    Backbone,
    Config,
    Handlebars,
    BaseView,
    Transitioner,
    Shell
) {

    "use strict";

    return BaseView.extend({

        transitioner:null,
        $rootNode:null,

        initialize: function() {
            
        },

        start:function(){
            this.$rootNode = $('#rootNode');
            this.transitioner = new Transitioner({el:this.$rootNode});
            this.addEvents();
        },

        addEvents:function(){
            window.onresize = _.bind(this.onResize, this);
        },

        onResize: function (evt) {
            if(this.transitioner){
                this.transitioner.onResize(evt);
            }
        },

        render: function() {}
    });
});