mycontrollers.controller('MainController', function ($scope, $location, UserService, spinnerService, ShopService, $q) {
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
        UserService.googleSignOut();
        spinnerService.show('generalSpinner');
        UserService.logout(UserService.getId()).then($scope.callbackLogout, $scope.errorHandlerLogout);
    };

    $scope.callbackPuedeComprar = function(){
      console.log("puede comprar");
      // $scope.shopping.canBuy = true;
      ShopService.setCanBuy(true);
      // $scope.shopping.listId = null;
      spinnerService.hide('generalSpinner');
    }

    $scope.errorPuedeComprar = function(){
      console.log("no puede comprar");
      // $scope.shopping.canBuy = false;
      // $scope.shopping.listId = null;
      ShopService.resetTimer();
      spinnerService.hide('generalSpinner');
    }

    $scope.$on('start', function(event, ms){
      var seconds = Math.ceil(ms / 1000);
      console.log("waiting" + seconds);
      var defer = $q.defer();
      defer.promise.then($scope.callbackPuedeComprar, $scope.errorPuedeComprar);
      var timer = setInterval(function() {
        $scope.$apply();
        console.log(seconds);
        console.log("..");
        if (seconds === 0) {
              clearInterval(timer);
              defer.resolve();
          }
          seconds--;
      }, 1000);
    });
});
