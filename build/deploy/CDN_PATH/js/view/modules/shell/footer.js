define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "router",
    "handlebars",
    "util/utils",
    "model/app_model",
    "text!templates/modules/shell/footer.hbs"
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

        $privacy:null,
        $warranty:null,

        initialize: function() {
            _.bindAll(this,"onClickPrivacy","onClickWarranty");
            var allNavigation = AppModel.getNavigationModel().getAllRoutes();
            Utils.compileAndAppendTemplate(Template,{'navigation':allNavigation},this,false);

            this.$privacy = this.$el.find('.privacy-js');
            this.$warranty = this.$el.find('.warranty-js');

            this.addEvents();
        },

        addEvents:function(){
            this.$privacy.on('click', this.onClickPrivacy);
            this.$warranty.on('click', this.onClickWarranty);
        },

        onClickPrivacy:function(e){
            e.preventDefault();
            Utils.openPopup($(e.currentTarget).attr('href'), 800,600, 'directories=no, scrollbars=yes, titlebar=no,toolbar=no,location=no,status=no,menubar=no,resizable=no');
        },

        onClickWarranty:function(e){
            e.preventDefault();
            Utils.openPopup($(e.currentTarget).attr('href'), 800,600, 'directories=no, scrollbars=yes, titlebar=no,toolbar=no,location=no,status=no,menubar=no,resizable=no');
        },

        render: function() {}
    });
});