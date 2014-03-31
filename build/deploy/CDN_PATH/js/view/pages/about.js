define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "router",
    "handlebars",
    "tweenmax",
    "util/utils",
    "model/app_model",
    "view/common/base_view",
    "view/modules/about/about_view_holder",
    "text!templates/pages/about.hbs"
], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    Handlebars,
    TweenMax,
    Utils,
    AppModel,
    BaseView,
    ViewHolder,
    Template
) {

    "use strict";

    return BaseView.extend({

        $transitionNode:null,
        viewsList:null,

        currentView:null,
        previousIndex: -1,
        $leftArrow:null,
        $rightArrow:null,

        events: {
            'click a.framework-navigation-js': 'onTriggerNavigation'
        },

        initialize: function() {
            _.bindAll(this,"onLeftClick","onRightClick","onKeyDown","destroy");
            var allNavigation = AppModel.getNavigationModel().getAllRoutes();
            this.compileAndAppendTemplate(Template,{'navigation':allNavigation});

            this.$leftArrow = this.$el.find('.left-arrow-js');
            this.$rightArrow = this.$el.find('.right-arrow-js');

            this.$transitionNode = this.$el.find('.content-transition-js');
            this.build();
            this.addEvents();

            //start at index 0
            this.model.setIndexTp(0);
        },

        build:function(){
            this.viewsList = [];
            var tpList = this.model.getTemplateList();
            for (var i = 0; i < tpList.length; i++) {
                var $item = this.prepareTp(tpList[i]);
                var view = new ViewHolder({el:$item});
                this.viewsList.push(view);
            }
        },

        addEvents:function(){
            $(window).on('keydown', this.onKeyDown);
            this.model.on('about:index:change', this.onAboutIndexChange, this);
            this.$leftArrow.on('click',this.onLeftClick);
            this.$rightArrow.on('click',this.onRightClick);
        },

        removeEvents:function(){
            $(window).off('keydown', this.onKeyDown);
            this.model.off('about:index:change', this.onAboutIndexChange);
            this.$leftArrow.off('click',this.onLeftClick);
            this.$rightArrow.off('click',this.onRightClick);
        },

        onKeyDown:function(e){
            e = e || window.event;
            if (e.keyCode === 37) {
                this.onLeftClick();
            }else if (e.keyCode === 39) {
                this.onRightClick();
            }
        },

        onLeftClick:function(e){
            if(this.model.getIndexTp() > 0){
                this.model.setIndexTp(this.model.getIndexTp()-1);
            }
        },

        onRightClick:function(e){
            if(this.model.getIndexTp() < this.viewsList.length-1){
                this.model.setIndexTp(this.model.getIndexTp()+1);
            }
        },

        onAboutIndexChange:function(){
            if(this.currentView){
                this.currentView.out(this.getSign());
            }
            var nexView = this.viewsList[this.model.getIndexTp()];
            this.$transitionNode.append(nexView.$el);
            nexView.enter(this.getSign());
            this.currentView = nexView;
            this.previousIndex = this.model.getIndexTp();

            if(this.model.getIndexTp() === 0){
                this.$leftArrow.addClass('disabled');
                this.$rightArrow.removeClass('disabled');
            }else if(this.model.getIndexTp() === this.viewsList.length-1){
                this.$leftArrow.removeClass('disabled');
                this.$rightArrow.addClass('disabled');
            }else{
                this.$leftArrow.removeClass('disabled');
                this.$rightArrow.removeClass('disabled');
            }
        },

        getSign:function(){
            if(this.model.getIndexTp() > this.previousIndex){
                return 1;
            }else{
                return -1;
            }
        },

        prepareTp:function(template){
            var templateData = {};
            var compiledTemplate = Handlebars.compile(template);
            return $(compiledTemplate(templateData));
        },

        onTriggerNavigation:function(e){
            e.preventDefault();
            Utils.navigateToRoute(Router, $(e.currentTarget).attr('href'));
        },

        destroy:function(){
            this.removeEvents();
            this.stopListening();
            this.undelegateEvents();
            this.off();
            this.$node.remove();
        }
    });
});