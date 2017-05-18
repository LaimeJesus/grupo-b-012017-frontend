angular.module('aloloco-app')
  .controller('SignUpController', [
  '$scope',
  'SignUpService',
  function($scope, SignUpService) {
    $scope.signup = {};
    $scope.signup.username = "";
    $scope.signup.password = "";
    $scope.signup.repeatpassword = "";

    $scope.signup = function() {
    SignUpService.signup($scope.signup, $scope.callback,
    	$scope.errorHandler);
    };
    $scope.callback = function(data) {
      var nuevoUser = data.id;
      alert("new user");
    };
    $scope.errorHandler = function(error) {
      $scope.spanLog = error.descripcion;
      $scope.loginFailure = true;
    };
} ]);
