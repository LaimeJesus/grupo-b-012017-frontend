var controllers = angular.module('aloloco-app.controllers', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

controllers.controller('ProductController', function($scope, ProductService){
  $scope.products = [{"name" : "Tomate"}, {"name" : "Mayonesa"}];

  $scope.callback = function(data){
    console.log(data);
    $scope.products = data.products;
    //$scope.$apply();

  };
  $scope.errorHandler = function(error){
    console.log(error);
  };

  $scope.getProducts = function(){
    ProductService.getProducts().then($scope.callback, $scope.errorHandler);
  };

});

controllers.controller('UserController', function($scope, UserService){
  $scope.user = {};
  $scope.user = {"username":"Pepe", "password":"123"};
  $scope.logged = true;

  $scope.reset = function(){
    $scope.user.username = "";
    $scope.user.password = "";
    $scope.logged = false;
  }

  // $scope.reset();


  $scope.loginCall = function(response){
    $scope.user = response.user;
    $scope.logged = true;
  }

  $scope.signCall = function(response){
    $scope.reset();
  }

  $scope.logoutCall = function(response){
    $scope.reset();
  }

  $scope.errorHandler = function(error){
    $scope.reset();
  }

  $scope.login = function(){
    UserService.login($scope.user).then($scope.loginCall, $scope.errorHandler);
  };

  $scope.signup = function(){
    UserService.signup($scope.user).then($scope.signCall, $scope.errorHandler);
  };

  $scope.logout = function(){
    UserService.logout($scope.user).then($scope.logoutCall, $scope.errorHandler);
  };

});

app.controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.user = {};
  $ctrl.user.username = "";
  $ctrl.user.password = "";

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: '/views/modal_form_login.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.
