angular.module('aloloco-app').service('ProductListService', function($http, myURL) {
  this.getlists = function(jsonObject, callback, errorHandler) {
    $http({
      url : myURL + "/productlists/mylists",
      method : "GET",
      data : jsonObject,
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).success(callback).error(errorHandler);
  };

  this.createproductlist = function(jsonObject, callback, errorHandler) {
    $http({
      url : myURL + "/productlists/create",
      method : "POST",
      data : jsonObject,
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).success(callback).error(errorHandler);
  };

});
