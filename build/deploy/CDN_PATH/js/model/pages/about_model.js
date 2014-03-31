define(
	[
	"backbone",
	"text!templates/modules/about/about_history.hbs",
	"text!templates/modules/about/about_people.hbs",
	"text!templates/modules/about/about_today.hbs"
	],function (
		Backbone,
		TemplateHistory,
		TemplatePeople,
		TemplateToday
	) {
	var PageModel = Backbone.Model.extend({

		templateList:null,
		indexTp:0,

		initialize: function() {
			this.templateList = [TemplateHistory,TemplatePeople,TemplateToday];
		},

		setIndexTp:function(ind){
			this.indexTp = ind;
			this.trigger('about:index:change');
		},

		getIndexTp:function(){
			return this.indexTp;
		},

		getTemplateList:function(){
			return this.templateList;
		}
	});

	return PageModel;
});