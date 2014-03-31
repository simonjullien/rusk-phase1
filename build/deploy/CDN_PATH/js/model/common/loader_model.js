define(["backbone"],function (Backbone) {
    var LoaderModel = Backbone.Model.extend({

		load_list:null,

		ON_ITEM_LOADED:'LOADER_MODEL:ON_ITEM_LOADED',

		setItem:function(item){
			console.log(item.item.id);
			if(!this.load_list){
				this.createLoadList();
			}
			this.load_list[item.item.id] = item.result;
			this.trigger(this.ON_ITEM_LOADED);
		},

		getItemByID:function(id){
			return this.load_list[id];
		},

		createLoadList:function(){
			this.load_list = [];
		}

    });

    return LoaderModel;
});