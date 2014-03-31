define([
    "jquery",
    "underscore",
    "config",
    "router",
    "controller/app_controller",
    "model/app_model",
    "view/app_view"
],function(
    $,
    _,
    Config,
    Router,
    AppController,
    AppModel,
    AppView
) {

    "use strict";

return {

    appView: null,
    appController: null,

    start: function () {
        this.appView = new AppView();
        this.appController = new AppController();
        
        this.appController.on('AppController:ready', this.onAppReady, this);
        this.appController.init();
    },

    onAppReady: function () {
        this.removePreloader();
        console.log('start app');
        this.appView.start();
        Router.start();
    },

    removePreloader: function(){
        if(window.destroyPreloader){
            window.destroyPreloader();
        }
        this.killPreloader();
    },

    killPreloader: function(){
        $('#preloader-container').remove();
    },
};

});