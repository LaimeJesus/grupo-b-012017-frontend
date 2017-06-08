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

  $scope.errorHandlerLogWithMail = function(error){
    console.log("can not log with mail");
    console.log(error);
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
            user.username = profile.ig;
            UserService.logInWithMail(user).then($scope.logincallback, $scope.errorHandlerLogWithMail);
          });
      };
  });
  // window.onSignIn = function(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

});
