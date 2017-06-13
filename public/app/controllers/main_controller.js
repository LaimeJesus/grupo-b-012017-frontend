mycontrollers.controller('MainController', function ($scope, $location, UserService, spinnerService, ShopService, $q, $timeout) {
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();

    $scope.shopping = {};
    $scope.shopping.seconds = 0;
    $scope.shopping.listId = false;

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
      ShopService.setCanBuy(true);
      $scope.showReadyAlert();
      spinnerService.hide('generalSpinner');
    };

    $scope.errorPuedeComprar = function(){
      console.log("no puede comprar");
      ShopService.resetTimer();
      spinnerService.hide('generalSpinner');
    };

    $scope.showWaitingAlert = function(){
      $('#waiting').show();
      $timeout(function () {
        $('#waiting').hide();
      }, 3000);
    };

    $scope.showReadyAlert = function(){
     $('#ready').show();
      $timeout(function () {
         $('#ready').hide();
      }, 3000);
    }

    $scope.$on('start', function(event, ms){
      var seconds = Math.ceil(ms / 1000);
      $scope.shopping.seconds = seconds;
      $scope.shopping.listId = ShopService.getListId();

      $scope.showWaitingAlert();

      console.log("waiting" + seconds);
      var defer = $q.defer();
      defer.promise.then($scope.callbackPuedeComprar, $scope.errorPuedeComprar);
      var timer = setInterval(function() {
        $scope.$apply();
        if (seconds === 0) {
              clearInterval(timer);
              defer.resolve();
          }
          seconds--;
      }, 1000);
    });
});
