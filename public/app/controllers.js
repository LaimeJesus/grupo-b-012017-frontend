var controllers = angular.module('aloloco-app.controllers', []);

controllers.controller('MainController',function($scope, UserService){
  $scope.user = UserService.getUser();
  $scope.logged = UserService.islogged();
});
controllers.controller('ProductController', function ($scope, ProductService) {

    $scope.products = [];

    $scope.selectedProduct = {};

    $scope.userLists = [
        {"name" : "list1" },
        {"name" : "list2" }
    ];

    $scope.selectedList = {"name": "Choose a List"};

    $scope.callback = function(data){
        console.log(data);
        $scope.products = data.data;
        for (var i=0 ; i<data.data.length ; i++){
          if ($scope.products[i].imageUrl == "no-image"){
            $scope.products[i].imageUrl = "../images/no-image-available.png"
          }
        }
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

    $scope.callbackGetDetal = function(data) {
        console.log("Detalle obtenido exitosamente");
        console.log(data);
        $scope.selectedProduct = data.data;
    };
    $scope.errorHandlerGetDetail = function(error) {
        console.log("Detalle no obtenido, algo fallo");
        $scope.spanLog = error.descripcion;
    };

    $scope.getDetail = function(name,brand){
        console.log("Pedi detalle");
        ProductService.getDetail(name,brand).then($scope.callbackGetDetal,$scope.errorHandlerGetDetail);
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

    $scope.getImage = function(product) {
      if (product.imageUrl != "no-image"){
        return product.imageUrl;
      } else {
        return "../images/no-image-available";
      }
    }

    $scope.getProducts();

});

controllers.controller('ProductListController', [
  '$scope',
  'UserService',
  'ProductListService',
  function($scope, UserService, ProductListService) {
    $scope.productlists = [{"name" : "Lista 1"} , {"name" : "Lista2"} , {"name" : "Lista 3"} , {"name" : "Lista4"} , {"name" : "Lista5"} ];
    $scope.spanLog = "";

    //esto deberia ir al final
    //$scope.getlists();
    $scope.newlist = false;
    $scope.showNewList = function(){
      $scope.newlist = true;
      $scope.name = "";
    }
    $scope.callbackGetLists = function(data) {
      console.log("Lists Received Succesfully");
      $scope.productlists = data.data;
    };
    $scope.errorHandlerGetList = function(error) {
      console.log("Lists Received Failure");
      console.log(error);
    };

    $scope.getlists = function(){
      if(UserService.islogged()){
        ProductListService.mylists(UserService.getUser().username).then($scope.callbackGetLists, $scope.errorHandlerGetList);
      }
    };

    $scope.callbackCreate = function(data) {
      console.log("List Created Succesfully");
      console.log(data);
    }

    $scope.errorHandlerCreate = function(error) {
      console.log("List Creation Failed");
      console.log(error);
    }

    $scope.createproductlist = function(){
      if (UserService.islogged()){
        ProductListService.create(UserService.getUser().username , $scope.newListName).then($scope.callback, $scope.errorHandler);
      }
    };

}]);

controllers.controller('SignUpController', function($scope, UserService){

  $scope.signupuser = {};
  $scope.signupuser.username = "";
  $scope.signupuser.password = "";

  $scope.reset = function (){
    $scope.signupuser.username = "";
    $scope.signupuser.password = "";
  };

  $scope.signcallback = function (response){
    $scope.reset();
  };

  $scope.errorHandler = function (error){
    $scope.reset();
  };

  $scope.signup = function (){
    UserService.signup($scope.signupuser).then($scope.signcallback, $scope.errorHandler);
  };

});

controllers.controller('LoginController', function($scope, UserService){

  $scope.user = {};
  $scope.user.username = "";
  $scope.user.password = "";

  $scope.reset = function (){
    $scope.user.username = "";
    $scope.user.password = "";
  };

  $scope.logincallback = function(response){
    UserService.logged(true);
    UserService.setUser($scope.loginuser);
  };

  $scope.logoutcallback = function(response){
    UserService.logged(false);
    $scope.reset();
    UserService.user($scope.user);
  }

  $scope.errorHandler = function(error){
    $scope.reset();
  };

  $scope.login = function(){
    UserService.login($scope.loginuser).then($scope.logincallback, $scope.errorHandler);
  };

  $scope.logout = function(){
    UserService.logout($scope.user).then($scope.logoutcallback, $scope.errorHandler);
  };
});
