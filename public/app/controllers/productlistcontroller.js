'use strict';

/**
 * @ngdoc function
 * @name aloloco-app.controller:LoginController
 * @description
 * # loginController
 * Controller of the aloloco-app
 */
angular.module('aloloco-app')
  .controller('ProductListController', [
  '$scope',
  'ProductListService',
  function($scope, ProductListService) {
    $scope.productlists = [];
    $scope.spanLog = "";

    //esto deberia ir al final
    //$scope.getlists();

    $scope.getlists = function(user){
      ProductListService.getlists(LoginService.getUser(), $scope.callback, $scope.errorHandler);
    };

    $scope.createproductlist = function(name){
      var list = {"user" : LoginService.getUser(), "name" : name};
      ProductListService.createproductlist(list, $scope.callback, $scope.errorHandler);
    };

    $scope.callback = function(data) {
      $scope.productlists = data.productlists;
    };
    $scope.errorHandler = function(error) {
      $scope.spanLog = error.descripcion;
      $scope.loginFailure = true;
    };
} ]);
