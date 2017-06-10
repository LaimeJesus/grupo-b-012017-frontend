mycontrollers.controller('SignUpController', function($scope, $location, UserService, spinnerService){

  $scope.signupuser = {};
  $scope.signupuser.username = "";
  $scope.signupuser.email = "";
  $scope.signupuser.password = {};
  $scope.signupuser.password.password = "";
  $scope.signupuser.profile = {};
  $scope.signupuser.profile.address = {};
  $scope.signupuser.profile.address.address = "";

  $scope.reset = function (){
    $scope.signupuser.username = "";
    $scope.signupuser.email = "";
    $scope.signupuser.password = {};
    $scope.signupuser.password.password = "";
    $scope.signupuser.profile = {};
    $scope.signupuser.profile.address = {};
    $scope.signupuser.profile.address.address = "";
  };

  $scope.toproducts = function(){
    $location.path("/");
  }

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
