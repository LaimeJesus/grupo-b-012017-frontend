mycontrollers.controller('LoginController', function($scope, $window, $location, UserService, spinnerService, $timeout){

  $scope.loginuser = {};
  $scope.loginuser.username = "";
  $scope.loginuser.password = "";

  $scope.loginError = false;

  $scope.reset = function (){
      $scope.loginuser.username = "";
      $scope.loginuser.password = "";
  };

  $scope.saveUserData = function(data) {
    UserService.setId(data.id);
    UserService.logged(true);
    UserService.setUser(data.username);
  };

  $scope.logincallback = function(response){
      console.log("Login Exitoso");
      $scope.saveUserData(response.data);
      $scope.reset();
      $location.path('/');
      spinnerService.hide('generalSpinner');
  };

  $scope.errorHandler = function(error){
      console.log("Something Failed");
      $scope.loginError = true;
      $timeout(function () { $scope.loginError = false; }, 3000);
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

  $scope.errorHandlerLogWithMail = function(error){
    console.log("can not log with mail");
    console.log(error);
    UserService.googleSignOut();
    spinnerService.hide('generalSpinner');
  };

  gapi.load('auth2', function() {//load in the auth2 api's, without it gapi.auth2 will be undefined
      gapi.auth2.init(
              {
                  client_id: '133189555236-qnmaelj9jr3n4jahdq52n8drgjd1nbf6.apps.googleusercontent.com'
              }
      );
      var GoogleAuth  = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
      $scope.onLogInButtonClick = function(){//add a function to the controller so ng-click can bind to it
          spinnerService.show('generalSpinner');
          GoogleAuth.signIn().then(function(googleUser){//request to sign in
            var profile = googleUser.getBasicProfile();
            var user = {};
            user.email = profile.U3;
            // user.username = profile.ig;
            user.username = profile.U3;
            UserService.logInWithMail(user).then($scope.logincallback, $scope.errorHandlerLogWithMail);
          },
          function(error){
            console.log("cancel log with gmail");
          }
        );
        spinnerService.hide('generalSpinner');
      };
  });

});
