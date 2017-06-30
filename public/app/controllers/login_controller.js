mycontrollers.controller('LoginController', function($scope, $window, $location, UserService, spinnerService, $timeout, AlertService){

    $scope.loginuser = {
        "username" : "",
        "password" : {
            "password": ""
        }
    };
    $scope.loginuser.username = "";
    $scope.loginuser.password.password = "";
    $scope.loginError = false;

    $scope.reset = function (){
        $scope.loginuser.username = "";
        $scope.loginuser.password.password = "";
    };

    $scope.saveUserData = function(data) {
        UserService.setId(data.id);
        UserService.logged(true);
        UserService.setUsername(data.username);
        UserService.setRole(data.role);
        if(typeof data.profile.address != 'undefined'){
          UserService.setAddress(data.profile.address.address);
        }else{
          UserService.setAddress("");
        }
    };

    $scope.logincallback = function(response){
        console.log("Login Exitoso");
        console.log(response.data);
        $scope.saveUserData(response.data);
        swal(AlertService.newAlert('User: ' + response.data.username, 'Logged correctly', 'success')).catch(swal.noop);
        $scope.reset();
        $location.path('/');
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandler = function(error){
        console.log(error);
        swal(AlertService.newAlert('Error in login', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
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
        UserService.setIsloggedWithMail(false);
        gapi.auth2.getAuthInstance().signOut().then(function () {
          console.log('User signed out.');
        });
        swal(AlertService.newAlert('Error in login', 'Problem: ' + error.data.errorMessage, 'error'));
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
                    user.username = profile.U3;
                    UserService.setIsloggedWithMail(true);
                    UserService.logInWithMail(user).then($scope.logincallback,$scope.errorHandlerLogWithMail);
                },
                function(error){
                    console.log("cancel log with gmail");
                    swal(AlertService.newAlert('Error in login', 'Problem: ' + error.data.errorMessage, 'error'));
                }
            );
            spinnerService.hide('generalSpinner');
        };
    });

});
