(function(){
  'use strict';

/**
 * @ngdoc function
 * @name aloloco-app.controller:LoginController
 * @description
 * # loginController
 * Controller of the aloloco-app
 */
angular.module('aloloco-app')
  .controller('LoginController', [
  '$scope',
  'LoginService',
  function($scope, LoginService) {

    $scope.login = LoginService.getUser();
    $scope.loginFailure = false;
    $scope.spanLog = "";

    $scope.login = function() {
      LoginService.login($scope.login, $scope.callback,
          $scope.errorHandler);
    };
    $scope.callback = function(data) {
      LoginService.setUser(data.user);
    };
    $scope.errorHandler = function(error) {
      $scope.spanLog = error.descripcion;
      $scope.loginFailure = true;
    };
}   ]);
})();
