var controllers = angular.module('aloloco-app.controllers', ['angularSpinners', 'ui.bootstrap']);

controllers.controller('ProductController', function ($scope, ProductService, UserService, ProductListService, spinnerService) {

    $scope.products = [];

    $scope.selectedProduct = {};
    $scope.selected = {};
    $scope.selected.quantity = 1;
    $scope.selected.selectedList = {"name": "Choose a List"};

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

    $scope.resetSelectedProduct = function(){
      $scope.selected.selectedList = {"name": "Choose a List"};
      $scope.selected.quantity = 1;
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
      ProductListService.createSelectedProduct(
          UserService.getId(),
          $scope.selected.selectedList.id,
          {
            quantity : $scope.selected.quantity,
            productId : $scope.selectedProduct.id
          }).then( $scope.callbackAddProductToList , $scope.errorHandlerAddProductToList);
    };

    $scope.getProducts();
    $scope.getLists();

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

controllers.controller('ProductListController', function($scope, $route, $location, UserService, ProductListService, ShopService, spinnerService) {
    $scope.productlists = [];
    $scope.spanLog = "";
    $scope.selectedProductList = {};
    $scope.newListName = "";
    $scope.loading = false;



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
      // $scope.showInterval($scope.current, data.time);
      console.log(data);
        spinnerService.hide('generalSpinner');
    }

    $scope.errorReady = function(error){
      console.log(error);
        spinnerService.hide('generalSpinner');
    }

    $scope.ready = function(listId){
        spinnerService.show('generalSpinner');
      ProductListService.ready(UserService.getId(), listId).then($scope.callbackReady, $scope.errorReady);
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

controllers.controller('SignUpController', function($scope, $location, UserService, spinnerService){

  $scope.signupuser = {};
  $scope.signupuser.username = "";
  $scope.signupuser.password = "";

  $scope.reset = function (){
    $scope.signupuser.username = "";
    $scope.signupuser.password = "";
  };

  $scope.signcallback = function (response){
    $scope.reset();
    spinnerService.hide('generalSpinner');
    $location.path("/");
  };

  $scope.errorHandler = function (error){
    $scope.reset();
    spinnerService.hide('generalSpinner');
    $location.path("/");
  };

  $scope.signup = function (){
    spinnerService.show('generalSpinner');
    UserService.signup($scope.signupuser).then($scope.signcallback, $scope.errorHandler);
  };

});

controllers.controller('LoginController', function($scope, $window, UserService, spinnerService){

  $scope.loginuser = {};
  $scope.loginuser.username = "";
  $scope.loginuser.password = "";

  $scope.reset = function (){
    $scope.loginuser.username = "";
    $scope.loginuser.password = "";
  };

  $scope.logincallback = function(response){
    console.log("Login Exitoso");
    UserService.setId(response.data.id);
    UserService.logged(true);
    UserService.setUser(response.data.username);
    $scope.reset();
      spinnerService.hide('generalSpinner');
  };

  $scope.errorHandler = function(error){
    console.log("Something Failed")
    $scope.reset();
      spinnerService.hide('generalSpinner');
  };

  $scope.login = function(){
      spinnerService.show('generalSpinner');
    UserService.login($scope.loginuser).then($scope.logincallback, $scope.errorHandler);
  };

  $scope.loginSuccesfully = function () {
      return UserService.islogged();
  };
});

controllers.controller('HomeOfferController', function($scope , OfferService, spinnerService){

    $scope.offer = {};
    $scope.offer.startDate = "";
    $scope.offer.endDate = "";
    $scope.offer.discount = "";
    $scope.offer.type = "";
    $scope.offer.category = "";
    $scope.allCategories = [];

    $scope.offers = [];

    $scope.isCategory = function() {
        return $scope.offer.type === "Category";
    };

    $scope.isCrossing = function() {
        return $scope.offer.type === "Crossing";
    };

    $scope.isCombination = function() {
        return $scope.offer.type === "Combination";
    };

    $scope.getType = function (offer) {
        if (offer.category !== undefined){
            console.log("Category");
            return "Category";
        } else {
            if (offer.minQuantity !== undefined){
                console.log("Crossing");
                return "Crossing";
            } else {
                console.log("Combination");
                return "Combination";
            }
        }
    }

    $scope.getDate = function (date) {
        console.log("Fecha de entrada : ");
        console.log(date);
        return date.month + '/' + date.day + '/' + date.year;
    }

    $scope.callbackAllCategories = function(data) {
        console.log("All Categories received succesfully");
        console.log(data);
        $scope.allCategories = data.data;
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerAllCategories = function(error) {
        console.log("All Categories something failed");
        console.log(error);
        spinnerService.hide('generalSpinner');
    };

    $scope.getAllCategories = function() {
        spinnerService.show('generalSpinner');
        if ($scope.allCategories !== []) {
            OfferService.getAllCategories().then($scope.callbackAllCategories , $scope.errorHandlerAllCategories);
        }
    };

    $scope.callbackNewOffer = function (response) {
        console.log("Category Offer created succesfully");
        console.log(response);
        spinnerService.hide('generalSpinner');
    }

    $scope.errorHandlerNewOffer = function(error) {
        console.log("Category Offer created failed");
        console.log(error);
        spinnerService.hide('generalSpinner');
    };

    $scope.createnewoffer = function() {
        spinnerService.show('generalSpinner');

        var values = $scope.offer.startDate.split(" ");
        var fecha =values[0];
        var hora = values[1];
        var fechaCortada = fecha.split("/");
        var mes = fechaCortada[0];
        var dia = fechaCortada[1];
        var año = fechaCortada[2];
        var horaCortada = hora.split(":");
        var hora = horaCortada[0];
        var min = horaCortada[1];
        var values1 = $scope.offer.endDate.split(" ");
        var fecha1 =values1[0];
        var hora1 = values1[1];
        var fechaCortada1 = fecha1.split("/");
        var mes1 = fechaCortada1[0];
        var dia1 = fechaCortada1[1];
        var año1 = fechaCortada1[2];
        var horaCortada1 = hora1.split(":");
        var hora1 = horaCortada1[0];
        var min1 = horaCortada1[1];

        if ($scope.getType($scope.offer) === 'Category') {
            var data = {
                "category" : $scope.offer.category,
                "start" : {
                    "day" : dia,
                    "month" : mes,
                    "year" : año
                },
                "end" : {
                    "day" : dia1,
                    "month" : mes1,
                    "year" : año1
                },
                "discount" : $scope.offer.discount
            }
            OfferService.newCategoryOffer(data).then($scope.callbackNewOffer, $scope.errorHandlerNewOffer);
        }
    };

    $scope.callbackAllOffers = function (response) {
        console.log(response);
        $scope.offers = response.data;
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerAllOffers = function (error) {
        console.log(error);
        spinnerService.hide('generalSpinner');
    };

    $scope.allOffers = function () {
        spinnerService.show('generalSpinner');
        OfferService.getAllOffers().then($scope.callbackAllOffers , $scope.errorHandlerAllOffers);
    }

    $scope.getAllCategories();
    $scope.allOffers();

});

controllers.controller('ProfileController', function($scope, UserService, spinnerService){
  $scope.address = "";
  $scope.records = [];
  $scope.profile = {};
  $scope.purchase = {};

  $scope.callbackProfile = function(response){
    console.log("profile loaded");
    $scope.address = response.data.profile.address;
    $scope.profile = response.data;
    $scope.records = response.data.profile.purchaseRecords;
      spinnerService.hide('generalSpinner');
  };

  $scope.errorHandler = function(error){
    console.log("profile error");
      spinnerService.hide('generalSpinner');
  };

  $scope.getProfile = function(){
      spinnerService.show('generalSpinner');
      UserService.getProfile(UserService.getId()).then($scope.callbackProfile, $scope.errorHandler);
  };

  $scope.getProfile();


});

controllers.controller('DeliveryController', function($scope){

    $scope.initialize = function () {
        var map;
        function initMap() {
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();

            var unqui = {
                lat: -34.70637,
                lng: -58.2772431
            };
            var addressLucas = {
                lat: -34.783098,
                lng: -58.216737
            };

            var request = {
                origin: addressLucas,
                destination: unqui,
                travelMode: google.maps.TravelMode.DRIVING
            };

            var map = new google.maps.Map(document.getElementById('map'), {
                center: unqui,
                zoom: 11
            });

            var marker = new google.maps.Marker({
                position: unqui,
                map: map,
                title: 'Universidad Nacional de Quilmes'
            });
            var marker = new google.maps.Marker({
                position: addressLucas,
                map: map,
                title: 'Casa de Sandi'
            });

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap(map);
                } else {
                    alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
                }
            });
        }
    };

    $scope.initialize();

});
