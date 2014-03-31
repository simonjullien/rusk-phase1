define([
    "router",
    "config",
    "model/app_model",
    "libs/createjs/preloadjs",
    "libs/createjs/soundjs"
],function (
    Router,
    Config,
    AppModel,
    PreloadJS,
    SoundJS
) {

    var loaderController = function(){};
    _.extend(loaderController.prototype, Backbone.Events);

    _.extend(loaderController.prototype, {

        preloader: null,
        loadDone: false,

        init: function() {
            this.preloader = new PreloadJS(false);
            this.preloader.installPlugin(SoundJS);
            this.preloader.setMaxConnections(4);
            this.preloader.maintainScriptOrder = false;
            this.preloader.addEventListener("fileload", _.bind( this.onFileLoaded, this ) );
            this.preloader.addEventListener("complete", _.bind( this.onComplete, this ) );
            this.preloader.addEventListener("progress", _.bind( this.onProgress, this ) );
            this.preloader.addEventListener("error", _.bind( this.onError, this ) );
        },

        onProgress: function( evt ) {
            this.trigger('progress', evt );
        },

        addList:function(list){
            for (var i = 0; i < list.length; i++) {
                this.addItem(list[i]);
            }
        },

        addItem: function( item ) {
            this.preloader.loadFile(item, false, Config.CDN);

        },

        onFileLoaded: function( evt ) {
            AppModel.getLoaderModel().setItem(evt);
        },

        onComplete: function( evt ) {
            this.loadDone = true;
            this.trigger('complete',evt);
        },

        start: function() {
            this.preloader.load();

        },

        hasLoaded: function() {
            return this.preloader.loaded;
        },

        getResult:function(filename) {
            return this.preloader.getResult(filename);
        },


        onError: function( evt ) {
            //console.error( "ASSET ERROR: "+evt.item.src );
            this.get( evt.item.id ).set({'loaded':true, 'error':true});

            this.trigger('load_error',evt);
        }

    });

    return loaderController;
});