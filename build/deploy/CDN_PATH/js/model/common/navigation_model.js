define(["backbone", "router"],function (Backbone, Router) {
	var NavigationModel = Backbone.Model.extend({

		pages:null,

		createNavigation:function(pages){
			this.pages = pages;
		},

		getAllRoutes:function(){
			var routes = {};
			for (var a in this.pages){
				routes[a] = this.pages[a].URL;
			}
			routes.BACK = this.pages[Router.getPreviousPage()].URL;
			return routes;
		},

		getModelForPage:function(page){
			return this.pages[page].MODEL;
		},

		getViewForPage:function(page){
			return this.pages[page].VIEW;
		}
	});

	return NavigationModel;
});