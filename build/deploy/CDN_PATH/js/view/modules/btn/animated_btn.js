/* global Expo:true */
define([
    "jquery",
    "underscore",
    "backbone",
    "tweenmax",
    "config",
    "view/common/base_view",
    "libs/createjs/preloadjs",
], function (
	$,
	_,
	Backbone,
	TweenMax,
	Config,
	BaseView,
	PreloadJS
) {

	"use strict";

	return BaseView.extend({

		preloader: null,
		data:null,
		$img:null,
		sourceImg:null,
		tweenObj:0,
		totalTime:1,
		btnW:null,

		initialize: function(options) {
			_.bindAll(this,
				"rollOver",
				"rollOut",
				"onFileLoaded",
				"onComplete",
				"updateCss"
			);
			this.btnW = this.$el.width();
			this.tweenObj = {'progress':0};
			this.data = options.data;
			this.totalTime = this.data.t;
			this.startLoad();
		},

		startLoad: function(){
			this.preloader = new PreloadJS(false);
			this.preloader.addEventListener("fileload", this.onFileLoaded );
			this.preloader.addEventListener("complete", this.onComplete );
			var item = { src: this.data.url, id: this.data.url, type:PreloadJS.IMAGE};
			this.preloader.loadFile(item, false, Config.CDN);
			this.preloader.load();
		},

		onFileLoaded:function(e){

			this.$img = $(e.result);
			this.sourceImg = e.result.src;
			console.log(this.sourceImg);
		},

		onComplete:function(e){
			this.initAfterLoad();
		},

		initAfterLoad: function() {
			this.initCss();
			this.$el.on('mouseenter',this.rollOver);
			this.$el.on('mouseleave',this.rollOut);
		},

		initCss:function(){
			this.$el.css({
				'overflow':'hidden',
				'background-image':'url('+this.sourceImg+')',
				'background-repeat':'no-repeat',
				'background-size':this.data.w/this.data.r+'px '+this.data.h/this.data.r+'px',
				'background-position':0+'px'
			});
		},

		updateCss:function(){
			var frame = Math.round(this.tweenObj.progress * (this.data.fn-1));
			this.$el.css({
				'background-position': (frame * -this.btnW)+'px 0px'
			});
		},

		rollOver: function(e){
			var time = this.totalTime;
			if(this.tweenObj.progress > 0){
				time = (1-this.tweenObj.progress) * this.totalTime;
			}
			TweenMax.killTweensOf(this.tweenObj);
			TweenMax.to(this.tweenObj, time, {'progress':1, onUpdate:this.updateCss, ease:Linear.easeNone});
		},

		rollOut: function(e){
			var time = this.totalTime;
			if(this.tweenObj.progress < 1){
				time = this.tweenObj.progress * this.totalTime;
			}
			TweenMax.killTweensOf(this.tweenObj);
			TweenMax.to(this.tweenObj, time, {'progress':0, onUpdate:this.updateCss, ease:Linear.easeNone});
		},

		destroy: function () {
			this.off();
			this.$el.off('mouseenter',this.rollOver);
			this.$el.off('mouseleave',this.rollOut);
			TweenMax.killTweensOf(this.tweenObj);
			if(this.preloader){
				this.preloader.removeEventListener("fileload", this.onFileLoaded );
				this.preloader.removeEventListener("complete", this.onComplete );
			}
		}
	});
});