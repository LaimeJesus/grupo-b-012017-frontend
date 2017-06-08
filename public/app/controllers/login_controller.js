mycontrollers.controller('LoginController', function($scope, $window, UserService, spinnerService){

  $scope.loginuser = {};
  $scope.loginuser.username = "";
  $scope.loginuser.password = "";

  $scope.reset = function (){
      $scope.loginuser.username = "";
      $scope.loginuser.password = "";
  };

  $scope.logincallback = function(response){
      console.log("Login Exitoso");
      UserService.setId(response.data.id);
      UserService.logged(true);
      UserService.setUser(response.data.username);
      $scope.reset();
      spinnerService.hide('generalSpinner');
  };

  $scope.errorHandler = function(error){
      console.log("Something Failed")
      $scope.reset();
      spinnerService.hide('generalSpinner');
  };

  $scope.login = function(){
      spinnerService.show('generalSpinner');
      UserService.login($scope.loginuser).then($scope.logincallback, $scope.errorHandler);
  };

  $scope.loginSuccesfully = function () {
      return UserService.islogged();
  };
  
});
