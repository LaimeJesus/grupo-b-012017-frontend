mycontrollers.controller('AdminProductController', function ($scope, ProductService, UserService, OfferService, spinnerService) {

  $scope.product = {};
  $scope.categories = [];

  $scope.resetProduct = function(){
    $scope.product.name = "";
    $scope.product.brand = "";
    $scope.product.category = "";
    $scope.product.stock = 0;
    $scope.product.imageUrl = "";
    $scope.product.processingTime = 0;
    $scope.product.price = {};
    $scope.product.price.integer = 0;
    $scope.product.price.decimal = 0;
  };

  $scope.getCategories = function(){
    OfferService.getAllCategories().then($scope.callbackGeneric, $scope.errorGeneric);
  };

  $scope.callbackGeneric = function(response){
    console.log(response);
  };

  $scope.errorGeneric = function(error){
    console.log(error);
  };

  $scope.create = function(){
    ProductService.createProduct($scope.product).then($scope.callbackGeneric, $scope.errorGeneric);
  };

  $scope.upload = function(){
    var file = document.getElementById('file').files[0],
        reader = new FileReader();
      reader.onloadend = function(e) {
        var data = e.target.result;
        console.log('ESTE ES EL ARCHIVO:' + data);
        ProductService.uploadProduct(data).then($scope.callbackGeneric, $scope.errorGeneric);
    }
  };
  $scope.resetProduct();
  $scope.getCategories();
});
