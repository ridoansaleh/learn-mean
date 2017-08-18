(function(){

"use strict";

var app = angular.module("GalleryApp");

app.directive('fileModel',['$parse', function ($parse) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        var model = $parse(attrs.fileModel);
	        var modelSetter = model.assign;

	        element.bind('change', function(){
	            scope.$apply(function(){
	                modelSetter(scope, element[0].files[0]);
	            });
	        });
	    }
	};
}]);

app.directive("fileread", [function() {
    return {
	    scope: {
	        fileread: "="
	    },
	    link: function(scope, element, attributes) {
	        element.bind("change", function(changeEvent) {
		        var reader = new FileReader();
		        reader.onload = function(loadEvent) {
			        scope.$apply(function() {
			            scope.fileread = loadEvent.target.result;
			        });
		        }
		        reader.readAsDataURL(changeEvent.target.files[0]);
	        });
	    }
    }
 }]);

})();