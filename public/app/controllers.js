var controllers = angular.module('aloloco-app.controllers', []);

controllers.controller('MainController', function ($scope, UserService) {
    $scope.user = UserService.getUser();
    $scope.logged = UserService.islogged();

    $scope.someoneLogged = function () {
        return UserService.islogged();
    };

    $scope.callbackLogout = function (data) {
        console.log("Logout Exitoso");
        UserService.logged(false);
        console.log(UserService.islogged());
        UserService.setUser({});
        console.log(UserService.getUser());
    };

    $scope.errorHandlerLogout = function (error) {
        console.log("Logout Fallo");
    };

    $scope.logout = function () {
        UserService.logout(UserService.getUser()).then($scope.callbackLogout(), $scope.errorHandlerLogout());
    };

});

controllers.controller('ProductController', function ($scope, ProductService, UserService, ProductListService) {

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
            ProductListService.mylists(UserService.getId()).then( $scope.callbackGetLists , $scope.errorHandlerGetList )
        }
    };

    $scope.callbackAddProductToList = function(data) {
        console.log("La wea");
        console.log(data);
    };

    $scope.errorHandlerAddProductToList = function(error) {
        console.log("Penca");
    };

    $scope.addProductToList = function() {
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
});

controllers.controller('ProductListController', [
  '$scope',
  'UserService',
  'ProductListService',
  'ShopService',
  function($scope, UserService, ProductListService, ShopService) {
    $scope.productlists = [];
    $scope.spanLog = "";
    $scope.selectedProductList = {};
    $scope.newListName = "";

    $scope.callbackGetLists = function(response) {
      console.log("Lists Received Succesfully");
      console.log(response);
      $scope.productlists = response.data;
    };
    $scope.errorHandlerGetList = function(error) {
      console.log("Lists Received Failure");
      console.log(error);
    };

    $scope.mylists = function(){
      if(UserService.islogged()){
        ProductListService.mylists(UserService.getId()).then($scope.callbackGetLists, $scope.errorHandlerGetList);
      }
    };

    $scope.callbackCreate = function(response) {
      console.log("List Created Succesfully");
      console.log(response.data);
    }

    $scope.errorHandlerCreate = function(error) {
      console.log("List Creation Failed");
      console.log(error);
    }

    $scope.createproductlist = function(){
      if (UserService.islogged()){
        ProductListService.create(UserService.getId() , $scope.newListName).then($scope.callbackCreate, $scope.errorHandlerCreate);
      }
    };

    $scope.callbackListDetail = function (response) {
        console.log("Lista obtenida correctamente");
        console.log(response);
        $scope.selectedProductList = response.data;
    }

    $scope.errorHandlerListDetail = function () {
        console.log("Lista obtenida erroneamente");
    }

    $scope.listDetail = function (listId) {
        ProductListService.getList(UserService.getId(), listId).then( $scope.callbackListDetail , $scope.errorHandlerListDetail );
    }

    $scope.callbackDeleteSelectedProduct = function(data){
      console.log("Selected product borrada");
    }

    $scope.errorHandlerDeleteSelectedProduct = function(error){
      console.log("Selected product no borrada");
    }

    $scope.deleteSelectedProduct = function(listId, selectedProductId){
      ProductListService.deleteSelectedProduct(UserService.getId(), listId, selectedProductId).then( $scope.callbackDeleteSelectedProduct , $scope.errorHandlerDeleteSelectedProduct );
    }

    // ADDED FOR READY AND WAITING TIME USES IN PRODUCT LIST SELECTED

    $scope.current = null;

    $scope.callbackReady = function(data){
      $scope.showInterval($scope.current, data.time);
    };

    $scope.canUseReady = function(){
      return $scope.current == null;
    }

    $scope.errorReady = function(error){
      console.log("failed ready")
      $scope.current = null;
    }

    $scope.ready = function(listname){
      $scope.current = listname;
      ShopService.ready(UserService.getUser().username, listname).then($scope.callbackReady, $scope.errorReady);
    };
    $scope.waitingTime = function(listname){
      ShopService.waitingTime(UserService.getUser().username, listname).then($scope.callbackWaitingTime, $scope.errorWaitingTime);
    }


    $scope.mylists();

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

controllers.controller('LoginController', function($scope, $window, UserService){

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
    //$window.location.href = '/';
  };

  $scope.errorHandler = function(error){
    console.log("Something Failed")
    $scope.reset();
  };

  $scope.login = function(){
    UserService.login($scope.loginuser).then($scope.logincallback, $scope.errorHandler);
  };

  $scope.loginSuccesfully = function () {
      return UserService.islogged();
  };
});

controllers.controller('HomeOfferController', function($scope , OfferService){

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

    $scope.callbackAllCategories = function(data) {
        console.log("All Categories received succesfully");
        console.log(data);
        $scope.allCategories = data.data;
    };

    $scope.errorHandlerAllCategories = function(error) {
        console.log("All Categories something failed");
        console.log(error);
    };

    $scope.getAllCategories = function() {
        if ($scope.allCategories !== []) {
            OfferService.getAllCategories().then($scope.callbackAllCategories , $scope.errorHandlerAllCategories);
        }
    };

    $scope.callbackNewOffer = function (response) {
        console.log("Category Offer created succesfully");
        console.log(response);
    }

    $scope.errorHandlerNewOffer = function(error) {
        console.log("Category Offer created failed");
        console.log(error);
    };

    $scope.createnewoffer = function() {
        console.log($scope.offer.startDate);
        console.log($scope.offer.endDate);
        console.log($scope.offer.discount);
        console.log($scope.offer.type);
        console.log($scope.offer.category);
        OfferService.newCategoryOffer($scope.offer).then($scope.callbackNewOffer, $scope.errorHandlerNewOffer);
    };

    $scope.callbackAllOffers = function (response) {
        console.log(response);
        $scope.offers = response.data;
    };

    $scope.errorHandlerAllOffers = function (error) {
        console.log(error);
    };

    $scope.allOffers = function () {
        OfferService.getAllOffers().then($scope.callbackAllOffers , $scope.errorHandlerAllOffers);
    }

    $scope.getAllCategories();
    $scope.allOffers();

});

controllers.controller('ProfileController', function($scope, UserService){
  $scope.address = "";
  $scope.records = [];

  $scope.getProfile = function(){
    // UserService.getProfile(UserService.getUser()).then($scope.callbackProfile, $scope.errorHandler);
  };

  $scope.callbackProfile = function(data){
    console.log("profile loaded");
    $scope.address = data.address;
    $scope.records = data.records;
  };

  $scope.errorHandler = function(error){
    console.log("profile error");
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
