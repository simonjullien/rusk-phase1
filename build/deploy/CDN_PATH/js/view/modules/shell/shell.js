define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "router",
    "handlebars",
    "util/utils",
    "model/app_model",
    "view/modules/shell/footer",
    "view/modules/shell/header",
    "view/modules/shell/nav",
    "view/common/base_view"
], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    Handlebars,
    Utils,
    AppModel,
    Footer,
    Header,
    Nav,
    BaseView
) {

    "use strict";

    return BaseView.extend({

        footer:null,
        header:null,
        nav:null,

        initialize: function() {
           this.footer = new Footer({el:$('.site-footer-js')});
           this.header = new Header({el:this.$el});
           this.nav = new Nav({el:this.$el});
        },

        render: function() {}
    });
});