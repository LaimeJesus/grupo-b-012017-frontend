mycontrollers.controller('ProductController', function ($scope, ProductService, UserService, ProductListService, spinnerService, AlertService, RecommendationService) {

    $scope.products = [];

    $scope.selectedProduct = {};
    $scope.userLists = [];
    $scope.selected = {};
    $scope.selected.selectedList = {};
    $scope.selected.quantity = 1;

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];

    $scope.addRecommendations = function( products ) {
        slides = $scope.slides = [];
        for (var i = 0 ; i<products.length ; i++) {
            slides.push({
                image: products[i].imageUrl,
                text: [products[i].name + ' ' + products[i].brand,'Buy now'][slides.length % 4],
                id: i
            });
        }
    };

    $scope.someoneLogged = function () {
        return UserService.islogged();
    };

    $scope.nooneLogged = function () {
      return !$scope.someoneLogged();
    }

    $scope.callback = function (data) {
        $scope.products = data.data;
        spinnerService.hide('generalSpinner');
    };
    $scope.errorHandler = function(error){
        spinnerService.hide('generalSpinner');
    };

    $scope.getProducts = function(){
        spinnerService.show('generalSpinner');
        ProductService.getProducts().then($scope.callback, $scope.errorHandler);
    };

    $scope.callbackGetDetail = function(data) {
        $scope.selectedProduct = data.data;
        spinnerService.hide('generalSpinner');
    };
    $scope.errorHandlerGetDetail = function(error) {
        $scope.spanLog = error.descripcion;
        spinnerService.hide('generalSpinner');
    };

    $scope.getDetail = function(id){
        spinnerService.show('generalSpinner');
        ProductService.getDetail(id).then($scope.callbackGetDetail,$scope.errorHandlerGetDetail);
    };

    $scope.callbackGetLists = function (data) {
        $scope.userLists = data.data;
        $scope.resetSelectedProduct();
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerGetList = function(error) {
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
        UserService.setLastProduct($scope.selectedProduct.id);
        $scope.setRecommendation();
        swal(AlertService.newAlert('Added ' + $scope.selectedProduct.name, 'A product was added to: ' + $scope.selected.selectedList.name, 'success')).catch(swal.noop);
        $scope.resetSelectedProduct();
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerAddProductToList = function(error) {
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


    $scope.callbackRecommendation = function(data) {
        console.log(data.data);
        $scope.addRecommendations(data.data);
        $scope.updateLastProduct();
    };

    $scope.errorHandlerRecommendation = function(error) {
        console.log(error);
        $scope.updateLastProduct();
    };

    $scope.setRecommendation = function() {
        RecommendationService.getRecommendation(UserService.getLastProduct()).then($scope.callbackRecommendation, $scope.errorHandlerRecommendation);
    };

    $scope.recoAvailable = function(){
      return $scope.slides.length > 0;
    }

    $scope.updateLastProduct = function(){
      for(var i=0; i<$scope.products.length; i++){
        if($scope.products[i].id === UserService.getLastProduct()){
          console.log($scope.nameLastProduct);
          $scope.nameLastProduct = $scope.products[i].name;
          break;
        }
      }
    }
    $scope.nameLastProduct = "";
    $scope.getProducts();
    $scope.getLists();
    $scope.setRecommendation();
    // $scope.updateLastProduct();
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
