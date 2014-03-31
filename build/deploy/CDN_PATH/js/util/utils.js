define([
	"jquery",
	"config",
	"underscore"

],function(
		$,
		Config,
		_
	) {
	"use strict";
	return {

		centerAndScale: function (div, desiredWidth, originalWidth, originalHeight, centerWidth) {
			if (!centerWidth) {
				centerWidth = desiredWidth;
			}
			var screenWidth = desiredWidth;
			var scale = (screenWidth / originalWidth);
			var scaleString = "scale(" + scale + "," + scale + ")";

			var overflow = centerWidth - (scale * originalWidth);

			var offsetX = (overflow) / 2;
			var offsetY = (scale * originalHeight) / 2;




			div.css("left", offsetX);
			div.css("transform", scaleString);
			div.css("margin-top", -offsetY);
			div.css("top","50%");

		},

		navigateToRoute:function(router, destination){
            if(destination){
                router.navigate(destination);
            }
        },

        getVendorPrefix: function () {
            var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice.call(styles).join('') .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
          return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
          };
        },

        getCorrectedDate:function(dateString){
			// from 2014-01-29T16:39:53+0000 to 29/01/2014
			var dateAndTime = dateString.split("T");
			var date = dateAndTime[0].split("-");
			return date[2] +'/'+ date[1] +'/'+ date[0];
        },


        compileAndAppendTemplate:function(template, data, scope, isPrepend){
            var templateData = data || {};
            var compiledTemplate = Handlebars.compile(template);
            scope.$node = $(compiledTemplate(templateData));
            if(isPrepend){
				scope.$el.prepend(scope.$node);
            }else{
				scope.$el.append(scope.$node);
            }
        },

		openPopup:function(href, width, height, other){
			var _other = ''|| other;
			if(_other === undefined){	_other = '';	}
			var newWindow = window.open(href,'_blank','width='+width+',height='+height + _other);
            if (window.focus) {
                newWindow.focus();
            }
        }
	};
});