angular.module('aloloco-app').service('ProductService', function($http, myURL) {
  this.getproducts = function(callback, errorHandler) {
    $http({
      url : myURL + "/product/all",
      method : "GET",
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).success(callback).error(errorHandler);
  };
});
