define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "router",
    "handlebars",
    "util/utils",
    "model/app_model",
    "text!templates/modules/shell/nav.hbs"
], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    Handlebars,
    Utils,
    AppModel,
    Template
) {

    "use strict";

    return Backbone.View.extend({

        initialize: function() {
            var allNavigation = AppModel.getNavigationModel().getAllRoutes();
            this.compileAndAppendTemplate(Template,{'navigation':allNavigation});
        },

        render: function() {}
    });
});