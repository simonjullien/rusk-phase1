define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "router",
    "handlebars",
    "util/utils",
    "model/app_model",
    "view/common/base_view",
    "text!templates/pages/about.hbs"
], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    Handlebars,
    Utils,
    AppModel,
    BaseView,
    Template
) {

    "use strict";

    return BaseView.extend({

        btn:null,

        events: {
            'click a.framework-navigation-js': 'onTriggerNavigation'
        },

        initialize: function() {
            var allNavigation = AppModel.getNavigationModel().getAllRoutes();
            this.compileAndAppendTemplate(Template,{'navigation':allNavigation});

            /*var $btn = $('.test-btn-js',this.el);
            var data = {'w':768, 'h':48, 'fn':16, 'r':2, 't':0.5, 'url':'/img/close-detail.png'};
            this.btn = new AnimatedBtn({el:$btn, data:data});*/
        },

        onTriggerNavigation:function(e){
            e.preventDefault();
            Utils.navigateToRoute(Router, $(e.currentTarget).attr('href'));
        },

        render: function() {}
    });
});