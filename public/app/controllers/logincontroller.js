controllers.controller('LoginController', function($scope, $window, UserService){

  $scope.loginuser = {};
  $scope.loginuser.username = "";
  $scope.loginuser.password = "";

  $scope.reset = function (){
    $scope.loginuser.username = "";
    $scope.loginuser.password = "";
  };

  $scope.logincallback = function(response){
    console.log("Login Exitoso");
    UserService.logged(true);
    UserService.setUser($scope.loginuser.username);
    $scope.reset();
    //$window.location.href = '/';

  };

  $scope.errorHandler = function(error){
    console.log("Something Failed")
    $scope.reset();
  };

  $scope.login = function(){
    UserService.login($scope.loginuser).then($scope.logincallback, $scope.errorHandler);
  };

  $scope.logout = function(){
    UserService.logout($scope.user).then($scope.logoutcallback, $scope.errorHandler);
  };

  $scope.loginadmincallback = function(data){
    UserService.loggedAsAdmin(true);
    $scope.resetadmin();
    UserService.user(data.user);
  };

  $scope.erroradminHandler = function(error){
    $scope.resetadmin();
  };

  $scope.loginAsAdmin = function(){
    UserService.loginAsAdmin($scope.loginuseradmin).then($scope.loginadmincallback, $scope.erroradminHandler)
  };
  $scope.loginSuccesfully = function () {
      return UserService.islogged();
  }

});
