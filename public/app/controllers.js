var controllers = angular.module('aloloco-app.controllers', []);

controllers.controller('ProductController', function ($scope, ProductService) {

    $scope.products = [
        {"name": "Tomate", "id": 1},
        {"name": "Mayonesa", "id": 2},
        {"name": "Pollo", "id": 3},
        {"name": "Bondiola", "id": 4},
        {"name": "Huevo", "id": 5}
    ];

    $scope.selectedProduct = {
        "id" : 6,
        "name" : "Zanahoria",
        "category" : "Dairy",
        "price" : "13,50"
    };
    $scope.userLists = [
        {"name" : "list1" },
        {"name" : "list2" }
    ];

    $scope.selectedList = {"name": "Choose a List"};

    $scope.callback = function(data){
        console.log(data);
        $scope.products = data.data;
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

    $scope.getDetail = function(id){
        console.log("Pedi detalle");
        $scope.getProduct(id);
    };

    $scope.callbackAddProductToList = function(data) {
        console.log("La wea");
    };

    $scope.errorHandlerAddProductToList = function(error) {
        console.log("Penca");
    };

    $scope.addProductToList = function() {
        ProductService.addProductToList(
            $scope.selectedProduct.id,
            $scope.selectedList.name,
            $scope.callbackAddProductToList,
            $scope.errorHandlerAddProductToList
        )
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
