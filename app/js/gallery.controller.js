(function(){
	
'use strict';

var app = angular.module('GalleryApp');

app.controller('GalleryController', function($scope, GalleryService, $http){
	
	$scope.uploadme;

	// GalleryService.getImages().then(function(res) {
 //      // console.log("data : ",res.data);
 //      $scope.images = res.data;
 //    }).catch(function(err) {
 //      console.log(err);
 //    });

    $scope.saveImage = function(data, form) {
    	var fd = new FormData();
        fd.append('image', $scope.myFile);
        fd.append('description', data.description);

        $http.post(
            'http://localhost:3500/saveImage',
            fd, 
            {
	            transformRequest: angular.identity,
	            headers: {
	              'Content-Type': undefined
	            }
            }
        ).then(
	        function success(response) {
	          console.log('success', response);
	        },
	        function error(response) {
	          console.log('error', response);
	        }
        );
    };
});

})();