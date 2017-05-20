var controllers = angular.module('aloloco-app.controllers', []);

controllers.controller('MainController',function($scope, UserService){
  $scope.user = UserService.getUser();
  $scope.logged = UserService.islogged();
});
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
        // $scope.products = [];
        // for(var i=0; i < data.products.length;i++){
        //   var prod = data.products[i];
        //   if(!prod.hasOwnProperty('url')){
        //     console.log(prod);
        //     prod.url="../images/no-image-available.png";
        //   };
        //   $scope.products.push(prod);
        // };
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

controllers.controller('ProductListController', [
  '$scope',
  'UserService',
  'ProductListService',
  function($scope, UserService, ProductListService) {
    $scope.productlists = [];
    $scope.spanLog = "";

    //esto deberia ir al final
    //$scope.getlists();
    $scope.newlist = false;
    $scope.showNewList = function(){
      $scope.newlist = true;
      $scope.name = "";
    }

    $scope.getlists = function(){
      if(UserService.islogged()){
        ProductListService.mylists(LoginService.getUser()).then($scope.callback, $scope.errorHandler);
      }
    };

    $scope.createproductlist = function(){
      $scope.newlist = false;
      var list = {"user" : LoginService.getUser(), "name" : $scope.name};
      ProductListService.create(list).then($scope.callback, $scope.errorHandler);
    };

    $scope.callback = function(info) {
      $scope.productlists.push($scope.name);
      $scope.name = "";
    };
    $scope.errorHandler = function(error) {
      console.log(error);
    };
}]);

controllers.controller('SignUpController', function($scope, UserService){

  $scope.user = {};
  $scope.user.username = "";
  $scope.user.password = "";

  $scope.reset = function (){
    $scope.user.username = "";
    $scope.user.password = "";
  };

  $scope.signcallback = function (response){
    console.log(response);
    $scope.reset();
  };

  $scope.errorHandler = function (error){
    console.log(error);
    $scope.reset();
  };

  $scope.signup = function (){
    UserService.signup($scope.user).then($scope.signCall, $scope.errorHandler);
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
    console.log(response);
    UserService.logged(true);
    UserService.user($scope.user);
  };

  $scope.logoutcallback = function(response){
    console.log(response);
    UserService.logged(false);
    $scope.reset();
    UserService.user($scope.user);
  }

  $scope.errorHandler = function(error){
    console.log(error);
    $scope.reset();
  };

  $scope.login = function(){
    console.log($scope.user);
    UserService.login($scope.user).then($scope.logincallback, $scope.errorHandler);
  };

  $scope.logout = function(){
    UserService.logout($scope.user).then($scope.logoutcallback, $scope.errorHandler);
  };
});
