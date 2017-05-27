controllers.controller('ProductController', function ($scope, ProductService , UserService , ProductListService) {

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

    $scope.callbackGetLists = function (data) {
        console.log("Listas obtenidas exitosamente");
        console.log(data);
        $scope.userLists = data.data;
    };

    $scope.errorHandlerGetList = function(error) {
        console.log("Listas no obtenidas, algo fallo");
        console.log(error);
    };

    $scope.getLists = function () {
        if(UserService.islogged()){
            ProductListService.mylists(UserService.getUser()).then( $scope.callbackGetLists() , $scope.errorHandlerGetList() )
        }
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
