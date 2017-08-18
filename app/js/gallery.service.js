(function(){

"use strict";

var app = angular.module("GalleryApp");

app.constant("globalConfig", {
  apiAddress: 'http://localhost:3500'
})

app.factory("GalleryService", function($http, globalConfig){
  var url = "";
  return {
    getImages: function() {
      url = globalConfig.apiAddress + "/";
      console.log("url : ",url);
      return $http.get(url);
    },
    postImage: function() {
      url = globalConfig.apiAddress + "/saveImage";
      return $http.post(url);
    }
  };
});

app.factory("convertDataURI", function(){
  var dataURItoBlob;
  return function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  };
});

})();