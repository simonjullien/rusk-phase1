define([
	"jquery",
	"view/pages/about",
	"view/pages/contact",
	"view/pages/home",
	"view/pages/news",
	"view/pages/products",
	"view/pages/search",
	"model/pages/about_model",
	"model/pages/contact_model",
	"model/pages/home_model",
	"model/pages/news_model",
	"model/pages/products_model",
	"model/pages/search_model",
	"libs/createjs/preloadjs",
	"libs/jquery-migrate-1.2.1",
	"console"
	],function(
		$,
		AboutView,
		ContactView,
		HomeView,
		NewsView,
		ProductsView,
		SearchView,
		AboutModel,
		ContactModel,
		HomeModel,
		NewsModel,
		ProductsModel,
		SearchModel,
		preloadjs
	) {
	var data = {
		PAGES:{
			'ABOUT':{
				'NAME': "ABOUT",
				'VIEW':AboutView,
				'MODEL':AboutModel,
				'URL':"about"
			},
			'CONTACT':{
				'NAME': "CONTACT",
				'VIEW':ContactView,
				'MODEL':ContactModel,
				'URL':"contact"
			},
			'HOME':{
				'NAME': "HOME",
				'VIEW':HomeView,
				'MODEL':HomeModel,
				'URL':"home"
			},
			'NEWS':{
				'NAME': "NEWS",
				'VIEW':NewsView,
				'MODEL':NewsModel,
				'URL':"news"
			},
			'PRODUCTS':{
				'NAME': "PRODUCTS",
				'VIEW':ProductsView,
				'MODEL':ProductsModel,
				'URL':"products"
			},
			'SEARCH':{
				'NAME': "SEARCH",
				'VIEW':SearchView,
				'MODEL':SearchModel,
				'URL':"search"
			}
		}
	};

	data.INITIAL_LOAD = [
		{ src: '/css/all.css', id:'/css/all.css', type:preloadjs.CSS}/*,
		{ src: '/img/bear_body_sprite@2x.png', id:'/img/bear_body_sprite@2x.png', type:preloadjs.IMAGE}*/
	];

    return data;
	
});