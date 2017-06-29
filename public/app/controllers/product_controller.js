mycontrollers.controller('ProductController', function ($scope, ProductService, UserService, ProductListService, spinnerService, AlertService) {

    $scope.products = [];

    $scope.selectedProduct = {};
    $scope.userLists = [];
    $scope.selected = {};
    $scope.selected.selectedList = {};
    $scope.selected.quantity = 1;

    $scope.someoneLogged = function () {
        return UserService.islogged();
    };

    $scope.nooneLogged = function () {
      return !$scope.someoneLogged();
    }

    $scope.callback = function (data) {
        console.log(data);
        $scope.products = data.data;
        for (var i=0 ; i<data.data.length ; i++){
          if ($scope.products[i].imageUrl === "no-image"){
            // $scope.products[i].imageUrl = "../images/no-image-available.png"
            $scope.products[i].imageUrl = "http://image.ibb.co/kaSNyQ/no_image_fixed.png";
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

    $scope.callbackGetDetail = function(data) {
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

    $scope.getDetail = function(id){
        spinnerService.show('generalSpinner');
        console.log("Pedi detalle");
        ProductService.getDetail(id).then($scope.callbackGetDetail,$scope.errorHandlerGetDetail);
    };

    $scope.callbackGetLists = function (data) {
        console.log("Listas obtenidas exitosamente");
        console.log(data);
        $scope.userLists = data.data;
        $scope.resetSelectedProduct();
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

    $scope.resetSelectedProduct = function(){
      $scope.selected.selectedList = $scope.userLists[0];
      $scope.selected.quantity = 1;
    };

    $scope.callbackAddProductToList = function(data) {
        console.log("PRODUCT ADDED TO LIST");
        swal(AlertService.newAlert('Added ' + $scope.selectedProduct.name, 'A product was added to: ' + $scope.selected.selectedList.name, 'success')).catch(swal.noop);
        $scope.resetSelectedProduct();
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerAddProductToList = function(error) {
        console.log("PRODUCT NOT ADDED TO LIST");
        swal(AlertService.newAlert('Error adding ' + $scope.selectedProduct.name, 'A product was not added to: ' + $scope.selected.selectedList.name, 'error')).catch(swal.noop);
        $scope.resetSelectedProduct();
        spinnerService.hide('generalSpinner');
    };

    $scope.addProductToList = function() {
        spinnerService.show('generalSpinner');
        ProductListService.createSelectedProduct(
            UserService.getId(),
            $scope.selected.selectedList.id,
            {
                quantity : $scope.selected.quantity,
                productId : $scope.selectedProduct.id
            }).then( $scope.callbackAddProductToList , $scope.errorHandlerAddProductToList);
    };

    $scope.getProducts();
    $scope.getLists()

    ///////////////////////////////////////////////////////////////////////////
    //PAGINATION
    ///////////////////////////////////////////////////////////////////////////

    $(window).on("resize.doResize", function (){
      console.log(window.innerWidth);
      if (window.innerWidth < 750){
        $scope.$apply(function(){
          $scope.pagination.maxSize = 2;
          $scope.pagination.itemsPerPage = 2;
        });
      } else{
        if(window.innerWidth < 1000){
          $scope.$apply(function(){
            $scope.pagination.maxSize = 3;
            $scope.pagination.itemsPerPage = 3;
          });
        } else{
          $scope.$apply(function(){
            $scope.pagination.maxSize = 5;
            $scope.pagination.itemsPerPage = 5;
          });
        }
      }
    });

    $scope.$on("$destroy",function (){
        $(window).off("resize.doResize"); //remove the handler added earlier
    });

    $scope.pagination = {};
    $scope.pagination.currentPage = 1;
    if (window.innerWidth > 700){
      $scope.pagination.maxSize = 5;
      $scope.pagination.itemsPerPage = 5;
    } else{
      $scope.pagination.maxSize = 2;
      $scope.pagination.itemsPerPage = 2;
    }

    // $scope.pagination.numOfPages = Math.floor($scope.products.length/$scope.pagination.maxSize) + 1;
    // $scope.pagination.numOfPages = 10;
    // $scope.numOfPages = Math.floor($scope.products.length/$scope.pagination.maxSize);

    $scope.setPage = function (pageNo) {
      $scope.pagination.currentPage = pageNo;
    };

});
