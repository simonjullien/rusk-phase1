define([
    "router",
    "model/app_model",
    "data/app_data",
    "controller/loader_controller"
],function (
    Router,
    AppModel,
    AppData,
    LoaderController
) {

    var AppController = function(){};
    _.extend(AppController.prototype, Backbone.Events);

    _.extend(AppController.prototype, {

        loaderController:null,
        appHasStarted:false,

        init: function() {

            //setup app routes
            Router.setRoutes([
                ["", AppData.PAGES.HOME.NAME],
                [AppData.PAGES.HOME.URL, AppData.PAGES.HOME.NAME],
                [AppData.PAGES.ABOUT.URL, AppData.PAGES.ABOUT.NAME],
                [AppData.PAGES.CONTACT.URL, AppData.PAGES.CONTACT.NAME],
                [AppData.PAGES.NEWS.URL, AppData.PAGES.NEWS.NAME],
                [AppData.PAGES.PRODUCTS.URL, AppData.PAGES.PRODUCTS.NAME],
                [AppData.PAGES.SEARCH.URL, AppData.PAGES.SEARCH.NAME]
            ]);

            Router.setAuthCallBack(_.bind(this.onSecurityCheck,this));

            Router.on("page", this.onRouterPage, this);

            AppModel.getNavigationModel().createNavigation(AppData.PAGES);

            //initial load
            this.loaderController = new LoaderController();
            this.loaderController.init();
            this.loaderController.addList(AppData.INITIAL_LOAD);
            this.loaderController.on('complete', this.appReady, this);
            this.loaderController.start();
        },

        onSecurityCheck: function(options){

            return true;
            
        },

        appReady:function(){
            if(!this.appHasStarted){
                this.appHasStarted = true;
                $('head').append(AppModel.getLoaderModel().getItemByID('/css/all.css'));
                this.trigger('AppController:ready');
            }
           
        },

        onRouterPage: function ( page, pageOptions ) {
            AppModel.set({'page': page, 'pageOptions': pageOptions});
        }

    });

    return AppController;
});