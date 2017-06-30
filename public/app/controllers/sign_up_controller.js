mycontrollers.controller('SignUpController', function($scope, $location, UserService, spinnerService, AlertService){

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
    spinnerService.hide('generalSpinner');
    swal(AlertService.newAlert('User: ' + $scope.signupuser.username, 'Created correctly', 'success'));
    $scope.reset();
    $location.path("/");
  };

  $scope.errorHandler = function (error){
    spinnerService.hide('generalSpinner');
    swal(AlertService.newAlert('Error in signup', 'Problem: ' + error.data.getMessage, 'error'));
    $scope.reset();
    $location.path("/");
  };

  $scope.signup = function (){
    spinnerService.show('generalSpinner');
    UserService.signup($scope.signupuser).then($scope.signcallback, $scope.errorHandler);
  };

});
