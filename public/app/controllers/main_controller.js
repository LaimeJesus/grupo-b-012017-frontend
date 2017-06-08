mycontrollers.controller('MainController', function ($scope, $location, UserService, spinnerService) {
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();

    $scope.someoneLogged = function () {
        return UserService.islogged();
    };

    $scope.callbackLogout = function (data) {
        console.log("Logout Exitoso");
        UserService.logged(false);
        console.log(UserService.islogged());
        UserService.setUser({});
        console.log(UserService.getUser());
        $location.path('/');
        spinnerService.show('generalSpinner');
    };

    $scope.errorHandlerLogout = function (error) {
        console.log("Logout Fallo");
        $location.path('/');
        spinnerService.show('generalSpinner');
    };

    $scope.logout = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
        spinnerService.show('generalSpinner');
        UserService.logout(UserService.getUser()).then($scope.callbackLogout, $scope.errorHandlerLogout);
    };
});
