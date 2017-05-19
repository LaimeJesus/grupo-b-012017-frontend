var controllers = angular.module('aloloco-app.controllers', []);

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

// controllers.controller("ModalFormController", ['$scope', '$uibModal', '$log',
//
//     function ($scope, $uibModal, $log) {
//         $scope.showLogin = function () {
//             $scope.message = "Show Form Button Clicked";
//             console.log($scope.message);
//             var modalInstance = $modal.open({
//                 templateUrl: '/views/modal_form_login.html',
//                 controller: ModalInstanceCtrl,
//                 scope: $scope,
//                 resolve: {
//                     loginForm: function () {
//                         return $scope.loginForm;
//                     }
//                 }
//             });
//
//             // modalInstance.result.then(function (selectedItem) {
//             //     $scope.selected = selectedItem;
//             // }, function () {
//             //     $log.info('Modal dismissed at: ' + new Date());
//             // });
//         };
//     }]);
//
// var ModalInstanceCtrl = function ($scope, $uibModalInstance, loginForm) {
//     $scope.form = {}
//     $scope.loginForm = function () {
//         if ($scope.form.loginForm.$valid) {
//             console.log('user form is in scope');
//             $uibModalInstance.close('closed');
//         } else {
//             console.log('userform is not in scope');
//         }
//     };
//
//     $scope.cancel = function () {
//         $uibModalInstance.dismiss('cancel');
//     };
// };
