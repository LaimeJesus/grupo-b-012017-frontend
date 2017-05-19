'use strict';

/**
 * @ngdoc function
 * @name aloloco-app.controller:LoginController
 * @description
 * # loginController
 * Controller of the aloloco-app
 */
angular.module('aloloco-app')
  .controller('ProductController', [
  '$scope',
  'ProductService',
  function($scope, ProductService) {
    $scope.products = [];
    $scope.spanLog = "";
    //esto deberia ir al final
    $scope.getproducts();

    $scope.getlists = function(){
      ProductListService.getproducts($scope.callback, $scope.errorHandler);
    };

    $scope.callback = function(data) {
      $scope.products = data;
    };
    $scope.errorHandler = function(error) {
      $scope.spanLog = error.descripcion;
    };
} ]);
