var controllers = angular.module('aloloco-app.controllers', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

controllers.controller('ProductController', function ($scope, ProductService) {

    $scope.products = [{"name" : "Tomate"}, {"name" : "Mayonesa"}, {"name" : "Pollo"}, {"name" : "Bondiola"} , {"name" : "Huevo"} ];
    $scope.selectedProduct = {};


    $scope.callback = function(data){
        console.log(data);
        $scope.products = [];
        for(var i=0; i < data.products.length;i++){
          var prod = data.products[i];
          if(!prod.hasOwnProperty('url')){
            //prod.url = '../images/no-image-available.png';
            console.log(prod);
            prod.url="../images/no-image-available.png";
          };
          $scope.products.push(prod);
        };
    };
    $scope.errorHandler = function(error){
        console.log(error);
    };

    $scope.getProducts = function(){
        ProductService.getProducts().then($scope.callback, $scope.errorHandler);
    };

    $scope.getProduct = function(id) {
        ProductService.getProduct(id , $scope.callbackGetProduct , $scope.errorHandlerGetProduct);
    };

    $scope.callbackGetProduct = function(data) {
        $scope.selectedProduct = data;
    };
    $scope.errorHandlerGetProduct = function(error) {
        $scope.spanLog = error.descripcion;
    };

    $scope.getDetail = function(prod){
        console.log(prod);
    };

    $scope.getProducts();

});

controllers.controller('UserController', function($scope, UserService){
  UserService.setUser({"username":"Pepe", "password":"123"});
  $scope.user = UserService.getUser();
  UserService.logged(true);
  $scope.logged = UserService.islogged();

  $scope.reset = function (){
    UserService.reset();
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();
  };

  // $scope.reset();


  $scope.loginCall = function (response){
    UserService.setUser(response.user);
    UserService.logged(true);
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();
  };

  $scope.signCall = function (response){
    $scope.reset();
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();
  };

  $scope.logoutCall = function (response){
    $scope.reset();
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();
  };

  $scope.errorHandler = function (error){
    $scope.reset();
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();
  };

  $scope.login = function (){
    UserService.login($scope.user).then($scope.loginCall, $scope.errorHandler);
  };

  $scope.signup = function (){
    UserService.signup($scope.user).then($scope.signCall, $scope.errorHandler);
  };

  $scope.logout = function (){
    UserService.logout($scope.user).then($scope.logoutCall, $scope.errorHandler);
  };

});

controllers.controller('ProductListController', [
  '$scope',
  'UserService',
  'ProductListService',
  function($scope, UserService, ProductListService) {
    $scope.productlists = [];
    $scope.spanLog = "";

    //esto deberia ir al final
    //$scope.getlists();

    $scope.getlists = function(){
      if(UserService.islogged()){
        ProductListService.mylists(LoginService.getUser()).then($scope.callback, $scope.errorHandler);
      }
    };

    $scope.createproductlist = function(name){
      var list = {"user" : LoginService.getUser(), "name" : name};
      ProductListService.create(list).then($scope.callback, $scope.errorHandler);
    };

    $scope.callback = function(data) {
      $scope.productlists = data.productlists;
    };
    $scope.errorHandler = function(error) {
      console.log(error);
    };
}]);

var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.user = {};

  $scope.open = function () {
    var modalInstance = $modal.open({
      templateUrl: 'modal-login.html',
      controller: ModalInstanceCtrl,
      resolve: {
        user: function () {
          return $scope.user;
        }
      }
    });
    modalInstance.result.then(function (user) {
      $scope.user = user;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

var ModalInstanceCtrl = function ($scope, $modalInstance, user) {
  $scope.user = user;
  $scope.ok = function () {
    $modalInstance.close($scope.user);
  };

  $scope.cancel = function () {
    $scope.user = {};
    $modalInstance.dismiss('cancel');
  };
};
