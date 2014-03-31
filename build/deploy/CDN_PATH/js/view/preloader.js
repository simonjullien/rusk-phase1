define([
    "jquery",'config'
],function(
    $, Config
){
    function destroyPreloader(){

    }

    window.onload = function(){
        //TweenLite.to(preloaderHolder,1, {opacity:1, ease:Power4.easeOut});
        window.destroyPreloader = destroyPreloader;
    };
});