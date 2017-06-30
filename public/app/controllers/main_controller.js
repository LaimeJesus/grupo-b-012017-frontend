mycontrollers.controller('MainController', function ($scope, $location, UserService, spinnerService, ShopService, $q, $timeout, AlertService) {
    $scope.shopping = {};
    $scope.shopping.seconds = 0;
    $scope.shopping.listId = false;

    $scope.someoneLogged = function () {
        return UserService.islogged();
    };

    $scope.isAdmin = function(){
      return UserService.isAdmin();
    }

    $scope.callbackLogout = function (data) {
        console.log("Logout Exitoso");
        console.log(UserService.islogged());
        console.log(UserService.getUsername());
        console.log(UserService.isloggedWithMail());
        if(UserService.isloggedWithMail()){
          UserService.setIsloggedWithMail(false);
          gapi.auth2.getAuthInstance().signOut().then(function () {
            console.log('User signed out.');
          });
        }
        console.log("IS SIGNED IN " + gapi.auth2.getAuthInstance().isSignedIn.get());
        swal(AlertService.newAlert('Desloging correctly ', 'User: ' + UserService.getUsername(), 'success')).catch(swal.noop);
        UserService.reset();
        $location.path('/');
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerLogout = function (error) {
        console.log("Logout Fallo");
        $location.path('/');
        if(UserService.isloggedWithMail()){
          UserService.setIsloggedWithMail(false);
          gapi.auth2.getAuthInstance().signOut().then(function () {
            console.log('User signed out.');
          });
        }
        swal(AlertService.newAlert('Error in login', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
        spinnerService.hide('generalSpinner');
    };

    $scope.logout = function () {
        spinnerService.show('generalSpinner');
        UserService.logout(UserService.getId()).then($scope.callbackLogout, $scope.errorHandlerLogout);
    };

    $scope.callbackPuedeComprar = function(){
      console.log("puede comprar");
      ShopService.setCanBuy(true);
      swal(AlertService.newAlert('Ready to buy list: ' + ShopService.getListName(), 'In register: ' + ShopService.getRegisterId(), 'success'));
      spinnerService.hide('generalSpinner');
    };

    $scope.errorPuedeComprar = function(){
      console.log("no puede comprar");
      swal(AlertService.newAlert('Error in buy list: ' + ShopService.getListName(), 'In register: ' + ShopService.getRegisterId(), 'error'));
      ShopService.resetTimer();
      spinnerService.hide('generalSpinner');
    };

    $scope.$on('start', function(event, ms){
      var seconds = Math.ceil(ms / 1000);
      $scope.shopping.seconds = seconds;
      $scope.shopping.listId = ShopService.getListId();

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
