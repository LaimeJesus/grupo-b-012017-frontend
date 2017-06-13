mycontrollers.controller('MainController', function ($scope, $location, UserService, spinnerService, ShopService, $q, $timeout) {
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();

    $scope.shopping = {};
    $scope.shopping.waiting = false;
    $scope.shopping.seconds = 0;
    $scope.shopping.ready = false;
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
      // $scope.shopping.waiting = true;
      $('#waiting').show();
      $timeout(function () {
        // $scope.shopping.waiting = false;
        $('#waiting').hide();
      }, 3000);
    };

    $scope.showReadyAlert = function(){
      // $scope.shopping.ready = true;
     $('#ready').show();
      $timeout(function () {
        // $scope.shopping.ready = false;
         $('#ready').hide();
      }, 3000);
    }

    $scope.$on('start', function(event, json){

      var seconds = Math.ceil(json.ms / 1000);
      $scope.shopping.seconds = seconds;
      $scope.shopping.listId = json.listId;

      $scope.showWaitingAlert();

      console.log("waiting" + seconds);
      var defer = $q.defer();
      defer.promise.then($scope.callbackPuedeComprar, $scope.errorPuedeComprar);
      var timer = setInterval(function() {
        $scope.$apply();
        // console.log(seconds);
        // console.log("..");
        if (seconds === 0) {
              clearInterval(timer);
              defer.resolve();
          }
          seconds--;
      }, 1000);
    });
});
