mycontrollers.controller('ProductListController', function($scope, $route, $location, UserService, ProductListService, ShopService, spinnerService, $q) {
    $scope.productlists = [];
    $scope.spanLog = "";
    $scope.selectedProductList = {};
    $scope.newListName = "";
    $scope.loading = false;

    $scope.goDelivery = function () {
        $location.path('/delivery');
    }

    $scope.callbackGetLists = function(response) {
        console.log("Lists Received Succesfully");
        console.log(response);
        $scope.productlists = response.data;
        spinnerService.hide('generalSpinner');
    };
    $scope.errorHandlerGetList = function(error) {
        console.log("Lists Received Failure");
        console.log(error);
        spinnerService.hide('generalSpinner');
    };

    $scope.mylists = function(){
        spinnerService.show('generalSpinner');
        if(UserService.islogged()){
            ProductListService.mylists(UserService.getId()).then($scope.callbackGetLists, $scope.errorHandlerGetList);
        }
    };

    $scope.callbackCreate = function(response) {
        console.log("List Created Succesfully");
        console.log(response.data);
        spinnerService.hide('generalSpinner');
        $('#modalNewProductList').modal('hide');
        $route.reload();
    }

    $scope.errorHandlerCreate = function(error) {
        console.log("List Creation Failed");
        console.log(error);
        spinnerService.hide('generalSpinner');
        $('#modalNewProductList').modal('hide');
        $route.reload();
    }

    $scope.createproductlist = function(){
      spinnerService.show('generalSpinner');

      if (UserService.islogged()){
        ProductListService.create(UserService.getId() , $scope.newListName).then($scope.callbackCreate, $scope.errorHandlerCreate);
      }
    };

    $scope.callbackListDetail = function (response) {
        console.log("Lista obtenida correctamente");
        console.log(response);
        $scope.selectedProductList = response.data;
        spinnerService.hide('generalSpinner');
    }

    $scope.errorHandlerListDetail = function () {
        console.log("Lista obtenida erroneamente");
        spinnerService.hide('generalSpinner');
    }

    $scope.listDetail = function (listId) {
        spinnerService.show('generalSpinner');
        ProductListService.getList(UserService.getId(), listId).then( $scope.callbackListDetail , $scope.errorHandlerListDetail );
    }

    $scope.callbackDeleteSelectedProduct = function(data){
      console.log("Selected product borrado");
        spinnerService.hide('generalSpinner');
    }

    $scope.errorHandlerDeleteSelectedProduct = function(error){
      console.log("Selected product no borrado");
        spinnerService.hide('generalSpinner');
    }

    $scope.deleteSelectedProduct = function(listId, selectedProductId){
        spinnerService.show('generalSpinner');
      ProductListService.deleteSelectedProduct(UserService.getId(), listId, selectedProductId).then( $scope.callbackDeleteSelectedProduct , $scope.errorHandlerDeleteSelectedProduct );
    }

    $scope.callbackUpdateSelectedProduct = function(data){
      console.log("Selected product actualizado");
        spinnerService.hide('generalSpinner');
    }

    $scope.errorHandlerUpdateSelectedProduct = function(error){
      console.log("Selected product no actualizado");
        spinnerService.hide('generalSpinner');
    }

    $scope.updateSelectedProduct = function(listId, selectedProductId, selectedProduct){
        spinnerService.show('generalSpinner');
      ProductListService.updateSelectedProduct(UserService.getId(), listId, selectedProductId, {quantity:selectedProduct.quantity, productId:selectedProduct.id}).then( $scope.callbackUpdateSelectedProduct , $scope.errorHandlerUpdateSelectedProduct );
    }

    // ADDED FOR READY AND WAITING TIME USES IN PRODUCT LIST SELECTED
    $scope.callbackReady = function(data){
      $scope.countdown(data.duration.imillis);
      console.log(data);
      spinnerService.hide('generalSpinner');
    }

    $scope.errorReady = function(error){
      console.log(error);
      spinnerService.hide('generalSpinner');
      $scope.shopping.listId = null;
    }

    $scope.shopping = {};
    $scope.shopping.canBuy = false;
    $scope.shopping.listId = null;
    $scope.shopping.seconds = 0;

    $scope.countdown = function(miliseconds){
      $scope.shopping.seconds = Math.ceil(miliseconds / 1000);
      var defer = $q.defer();
      defer.promise.then(function() {
        console.log("puede comprar");
        $scope.shopping.canBuy = true;
        $scope.shopping.listId = null;
      });
      var timer = setInterval(function() {
        $scope.$apply();
        if ($scope.shopping.seconds === 0) {
              clearInterval(timer);
              defer.resolve();
          }
          $scope.shopping.seconds--;
      }, 1000);
    }

    $scope.ready = function(listId){
      spinnerService.show('generalSpinner');
      $scope.shopping.listId = listId;
      ProductListService.ready(UserService.getId(), listId).then($scope.callbackReady, $scope.errorReady);
    }

    $scope.callbackShop = function(data){
      console.log("lista comprada");
      $scope.shopping.canBuy = false;
      $scope.shopping.listId = null;
    }
    $scope.errorShop = function(error){
      console.log("lista no comprada");
      $scope.shopping.canBuy = false;
      $scope.shopping.listId = null;
    }

    $scope.shop = function(listId){
      spinnerService.show('generalSpinner');
      ProductListService.shop(UserService.getId(), listId).then($scope.callbackShop, $scope.errorShop);
    }

    $scope.callbackWaitingTime = function(data){
      console.log(data);
        spinnerService.hide('generalSpinner');
    }

    $scope.errorWaitingTime = function(error){
      console.log(error);
        spinnerService.hide('generalSpinner');
    }

    $scope.waitingTime = function(listId){
        spinnerService.show('generalSpinner');
      ProductListService.waitingTime(UserService.getId(), listId).then($scope.callbackWaitingTime, $scope.errorWaitingTime);
    }

    $scope.mylists();

});