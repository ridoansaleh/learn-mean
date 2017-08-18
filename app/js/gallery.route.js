(function(){

"use strict";

var app = angular.module("GalleryApp");

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state("home", {
		    url: "/",
		    controller: "GalleryController",
		    templateUrl: "html/form.html"
		});
});

})();