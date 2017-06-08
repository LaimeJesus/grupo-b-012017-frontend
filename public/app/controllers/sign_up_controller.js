mycontrollers.controller('SignUpController', function($scope, $location, UserService, spinnerService){

  $scope.signupuser = {};
  $scope.signupuser.username = "";
  $scope.signupuser.password = "";

  $scope.reset = function (){
    $scope.signupuser.username = "";
    $scope.signupuser.password = "";
  };

  $scope.signcallback = function (response){
    $scope.reset();
    spinnerService.hide('generalSpinner');
    $location.path("/");
  };

  $scope.errorHandler = function (error){
    $scope.reset();
    spinnerService.hide('generalSpinner');
    $location.path("/");
  };

  $scope.signup = function (){
    spinnerService.show('generalSpinner');
    UserService.signup($scope.signupuser).then($scope.signcallback, $scope.errorHandler);
  };

});
