angular.module('aloloco-app')
  .controller('SignUpController', [
  '$scope',
  'SignUpService',
  function($scope, SignUpService) {
    $scope.signup = {};
    $scope.signup.username = "";
    $scope.signup.password = "";
    $scope.signup.repeatpassword = "";

    $scope.signup = function(user) {
    //SignUpService.signup($scope.signup, $scope.callback, $scope.errorHandler);
      SignUpService.signup(user).success($scope.callback).error($scope.errorHandler);
    };
    $scope.callback = function(data) {
      console.log(data);
    };
    $scope.errorHandler = function(error) {
      console.log(error);
      $scope.spanLog = error.descripcion;
      $scope.loginFailure = true;
    };
} ]);
