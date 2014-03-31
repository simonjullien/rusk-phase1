/**
 * ...
 * @author emlyn@resn.co.nz
 */

require.config({

	paths: {
		"jquery": "libs/jquery-1.10.2",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"swfobject": "libs/swfobject",
		"handlebars": "libs/handlebars-v1.1.2",
		"text": "libs/text",
		"console": "libs/console-shim",
		"tweenmax": "libs/tweenmax/TweenMax",
		"templates": "../templates",
        "libs/createjs/preloadjs": "libs/createjs/preloadjs-NEXT.min",
        "libs/createjs/tweenjs":"libs/createjs/tweenjs-0.5.0.min",
        "libs/createjs/easeljs": "libs/createjs/easeljs-0.7.0.min",
        "libs/createjs/movieclip": "libs/createjs/movieclip-0.7.0.min",
        "libs/createjs/soundjs": "libs/createjs/soundjs-0.5.0.min"
	},

	shim: {
		'jquery': {
			exports: 'jQuery'
		},
		'libs/jquery-migrate-1.2.1':{
			deps:['jquery']
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'handlebars': {
			exports: 'Handlebars'
		},
		'console': {
			exports: 'console'
		},
		'tweenmax': {
            exports: 'TweenMax'
        },
        'libs/createjs/preloadjs': {
            exports: 'createjs.LoadQueue'
        },
        'libs/createjs/movieclip': {
            deps: ['libs/createjs/easeljs','libs/createjs/tweenjs'],
            exports: 'createjs'
        },
        'libs/createjs/soundjs': {
            deps: ['libs/createjs/preloadjs'],
            exports: 'createjs.Sound'
        },

		'libs/swfobject': {
			deps: ['jquery'],
			exports: 'swfobject'
		},
		'libs/swffit':['libs/swfobject'],
		'libs/swfmacmousewheel':['libs/swfobject'],
		'libs/jquery-swfobject': ['jquery']
	},

	waitSeconds: 12

  });

require(["jquery","config", "view/preloader"], function($, Config, preloader) {
	require(["main"], function(Main){
		Main.start();
	});
});

