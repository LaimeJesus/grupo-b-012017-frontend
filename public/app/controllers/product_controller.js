mycontrollers.controller('ProductController', function ($scope, ProductService, UserService, ProductListService, spinnerService) {

    $scope.products = [];

    $scope.selectedProduct = {};

    $scope.userLists = [
        {"name" : "list1" },
        {"name" : "list2" }
    ];

    $scope.selectedList = {"name": "Choose a List"};

    $scope.callback = function (data) {
        console.log(data);
        $scope.products = data.data;
        for (var i=0 ; i<data.data.length ; i++){
          if ($scope.products[i].imageUrl == "no-image"){
            $scope.products[i].imageUrl = "../images/no-image-available.png"
          }
        }
        spinnerService.hide('generalSpinner');
    };
    $scope.errorHandler = function(error){
        console.log(error);
        spinnerService.hide('generalSpinner');
    };

    $scope.getProducts = function(){
        spinnerService.show('generalSpinner');
        ProductService.getProducts().then($scope.callback, $scope.errorHandler);
    };

    $scope.callbackGetDetal = function(data) {
        console.log("Detalle obtenido exitosamente");
        console.log(data);
        $scope.selectedProduct = data.data;
        spinnerService.hide('generalSpinner');
    };
    $scope.errorHandlerGetDetail = function(error) {
        console.log("Detalle no obtenido, algo fallo");
        $scope.spanLog = error.descripcion;
        spinnerService.hide('generalSpinner');
    };

    $scope.getDetail = function(name,brand){
        spinnerService.show('generalSpinner');
        console.log("Pedi detalle");
        ProductService.getDetail(name,brand).then($scope.callbackGetDetal,$scope.errorHandlerGetDetail);
    };

    $scope.callbackGetLists = function (data) {
        console.log("Listas obtenidas exitosamente");
        console.log(data);
        $scope.userLists = data.data;
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerGetList = function(error) {
        console.log("Listas no obtenidas, algo fallo");
        console.log(error);
        spinnerService.hide('generalSpinner');
    };

    $scope.getLists = function () {
        spinnerService.show('generalSpinner');
        if(UserService.islogged()){
            ProductListService.mylists(UserService.getId()).then( $scope.callbackGetLists , $scope.errorHandlerGetList )
        }
    };

    $scope.callbackAddProductToList = function(data) {
        console.log("PRODUCT ADDED TO LIST");
        $scope.resetSelectedProduct();
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerAddProductToList = function(error) {
        console.log("PRODUCT NOT ADDED TO LIST");
        $scope.resetSelectedProduct();
        spinnerService.hide('generalSpinner');
    };

    $scope.addProductToList = function() {
        spinnerService.show('generalSpinner');
        console.log(UserService.getId());
        console.log($scope.selectedList.id);
        console.log($scope.quantity);
        console.log($scope.selectedProduct.id);
        ProductListService.createSelectedProduct(
            UserService.getId(),
            $scope.selectedList.id,
            {
                quantity : $scope.quantity,
                productId : $scope.selectedProduct.id
            }).then( $scope.callbackAddProductToList , $scope.errorHandlerAddProductToList);
    };

    $scope.getProducts();
    $scope.getLists()

    ///////////////////////////////////////////////////////////////////////////
    //PAGINATION
    ///////////////////////////////////////////////////////////////////////////

      $scope.pagination = {};
      $scope.pagination.currentPage = 1;
      $scope.pagination.maxSize = 4;
      $scope.pagination.itemsPerPage = 3;

      // $scope.pagination.numOfPages = Math.floor($scope.products.length/$scope.pagination.maxSize) + 1;
      // $scope.pagination.numOfPages = 10;
      // $scope.numOfPages = Math.floor($scope.products.length/$scope.pagination.maxSize);

      $scope.setPage = function (pageNo) {
        $scope.pagination.currentPage = pageNo;
      };

});
