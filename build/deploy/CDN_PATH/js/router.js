define(["backbone","underscore"],function(Backbone,_) {

    var Router = Backbone.Router.extend({

        page:null,
        pageOptions:null,
        authCheck:null,
        pageList:null,

        initialize: function( options ) {
            if(options) {
                this.authCheck = options.authCheck;
            }
            this.pageList = [];
            //this came from welly but I think its a mistake cause it react twice on 'route'
            //this.on('route', this.onRoute, this);
        },

        start: function() {
            Backbone.history.start();
            
        },

        setRoutes: function(routes) {
            _.each( routes, function( routeDef ) {
                this.route(routeDef[0],routeDef[1]);
            },this);
             Backbone.history.on('route', this.onRoute, this);
        },

        getPreviousPage: function(){
            if(this.pageList.length > 1){
                return this.pageList[this.pageList.length - 2];
            }else{
                return 'HOME';
            }
        },

        onRoute: function (router, page, options) {
            if( this.authCheck ) {
                if( !this.authCheck.call(this, {'page': page})) {
                    return false;
                }
            }
            this.setPage(page, options);
        },

        setAuthCallBack:function( cb ) {
            this.authCheck = cb;
        },

        setPage : function(page, options) {
            this.pageList.push(page);
            this.page = page;
            this.pageOptions = options;
            this.trigger('page', page, options);
        },

        /**
         * Intercept navigation requests to check with auth system.
         * Designed to retain click context for pop-ups eg facebook login.
         */
        navigate: function(fragment, triggerRoute) {

            triggerRoute = triggerRoute === false ? false : true;

            if( this.authCheck ) {

                if( !this.authCheck.call(this, fragment)) {
                    return false;
                }

            }
            return Backbone.Router.prototype.navigate.call(this,fragment, triggerRoute);
        },

        back: function() {
            history.back();
        }


    });

    return new Router();
});