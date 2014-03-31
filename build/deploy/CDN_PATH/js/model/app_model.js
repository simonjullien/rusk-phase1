define([
	"backbone",
	"model/common/navigation_model",
	"model/common/loader_model"
	],function (
		Backbone,
		NavigationModel,
		LoaderModel
	) {
	var Model = Backbone.Model.extend({

		loaderModel:null,
		navigationModel:null,

		initialize: function () {
			this.create();
		},

		create:function(){
			this.loaderModel = new LoaderModel();
			this.navigationModel = new NavigationModel();
		},

		/***************************************************************
		///////LOADER MODEL
		***************************************************************/
		getLoaderModel:function(){
			return this.loaderModel;
		},

		/***************************************************************
		///////NAVIGATION MODEL
		***************************************************************/
		getNavigationModel:function(){
			return this.navigationModel;
		},

		getPageModel:function(){
			return this.navigationModel.getModelForPage(this.get('page'));
		},

		getPageView:function(){
			return this.navigationModel.getViewForPage(this.get('page'));
		}

    });

    return new Model();
});