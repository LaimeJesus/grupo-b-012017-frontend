mycontrollers.controller('AdminProductController', function ($scope, ProductService, UserService, OfferService, spinnerService, AlertService, UrlCheckerService) {

  $scope.adminProduct = {};
  $scope.products = [];
  $scope.categories = [];

  $scope.resetProduct = function(){
    $scope.adminProduct = {};
    $scope.adminProduct.id = null;
    $scope.adminProduct.name = "";
    $scope.adminProduct.brand = "";
    $scope.adminProduct.category = "";
    $scope.adminProduct.stock = 1;
    $scope.adminProduct.imageUrl = "";
    $scope.adminProduct.processingTime = {};
    $scope.adminProduct.processingTime.milliseconds = 0;
    $scope.adminProduct.price = {};
    $scope.adminProduct.price.integer = 0;
    $scope.adminProduct.price.decimal = 0;
  };

  $scope.callbackGetCategories = function(response){
    console.log(response.data);
    $scope.categories = response.data.map(function(cat){
      return cat.name;
    });
    console.log($scope.categories);
    $scope.adminProduct.category = response.data[0];
    spinnerService.hide('generalSpinner');
  };

  $scope.errorGetCategories = function(error){
    spinnerService.hide('generalSpinner');
  };

  $scope.getCategories = function(){
    spinnerService.show('generalSpinner');
    OfferService.getAllCategories().then($scope.callbackGetCategories, $scope.errorGetCategories);
  };

  $scope.callbackCreateProduct = function(response) {
    spinnerService.hide('generalSpinner');
    $scope.getProducts();
    $scope.resetProduct();
    $scope.adminProduct.category = $scope.categories[0];
    swal(AlertService.newAlert('Product Creation', 'Product created succesfully', 'success'));
  };

  $scope.errorHandlerCreateProduct = function(error) {
    spinnerService.hide('generalSpinner');
    $scope.resetProduct();
    $scope.adminProduct.category = $scope.categories[0];
    swal(AlertService.newAlert('Product Creation', 'Problem: ' + error.data.getMessage, 'error'));
  };

  // $('#modalCreateProduct').on('hidden.bs.modal', function () {
  //     $scope.resetProduct();
  //     $scope.adminProduct.category = $scope.categories[0];
  // });

  $scope.updateAdminProduct = function(){
    $scope.resetProduct();
    $scope.adminProduct.category = $scope.categories[0];
  };

  $scope.create = function(){
    spinnerService.show('generalSpinner');
    ProductService.createProduct($scope.adminProduct).then($scope.callbackCreateProduct, $scope.errorHandlerCreateProduct);
  };

  $scope.callbackUpdateProduct = function(response){
    // for(var i=0;i<$scope.products.length;i++){
    //   if($scope.products[i].id === $scope.adminProduct.id){
    //     $scope.products[i].name = $scope.adminProduct.name;
    //     $scope.products[i].brand = $scope.adminProduct.brand;
    //     $scope.products[i].stock = $scope.adminProduct.stock;
    //     $scope.products[i].processingTime.milliseconds = $scope.adminProduct.processingTime.milliseconds;
    //     $scope.products[i].category = $scope.adminProduct.category;
    //     $scope.products[i].price.integer = $scope.adminProduct.price.integer;
    //     $scope.products[i].price.decimal = $scope.adminProduct.price.decimal;
    //     if(UrlCheckerService.isValidImageUrl($scope.adminProduct)){
    //       $scope.products[i].imageUrl = $scope.adminProduct.imageUrl;
    //     }else{
    //       $scope.products[i].imageUrl = UrlCheckerService.getValidUrl();
    //     }
    //     break;
    //   }
    // }
    $scope.getProducts();
    $scope.resetProduct();
    $scope.adminProduct.category = $scope.categories[0];
    spinnerService.hide('generalSpinner');
    swal(AlertService.newAlert('Product Update', 'Product updated succesfully', 'success')).catch(swal.noop);
  };

  $scope.errorHandlerUpdateProduct = function(error){
    spinnerService.hide('generalSpinner');
    $scope.resetProduct();
    $scope.adminProduct.category = $scope.categories[0];
    swal(AlertService.newAlert('Update product', 'Problem: ' + error.data.getMessage, 'error')).catch(swal.noop);
  };

  $scope.update = function(){
    console.log($scope.adminProduct);
    ProductService.updateProduct($scope.adminProduct.id, $scope.adminProduct).then($scope.callbackUpdateProduct, $scope.errorHandlerUpdateProduct);
  };

  // $('#modalUpdateProduct').on('hidden.bs.modal', function () {
  //     $scope.resetProduct();
  //     $scope.adminProduct.category = $scope.categories[0];
  // });

  $scope.updateProduct = function(product){
    $scope.adminProduct = product;
  };

  $scope.callbackDeleteProduct = function(response){
    $scope.products = $scope.products.filter(function(p){
      return p.id !== $scope.productidtodelete;
    });
    // $scope.getProducts();
    $scope.productidtodelete = 0;
    spinnerService.hide('generalSpinner');
    swal(AlertService.newAlert('Product Delete', 'Product deleted succesfully', 'success')).catch(swal.noop);
  };

  $scope.errorHandlerDeleteProduct = function(error){
    $scope.productidtodelete = 0;
    spinnerService.hide('generalSpinner');
    swal(AlertService.newAlert('Update product', 'Problem: ' + error.data.getMessage, 'error')).catch(swal.noop);
  };

  $scope.delete = function(productId){
    $scope.productidtodelete = productId;
    swal(AlertService.getDeleteButton()).then(function(){
      ProductService.deleteProduct(productId).then($scope.callbackDeleteProduct, $scope.errorHandlerDeleteProduct);
    }).catch(swal.noop);
  };

  $scope.callbackUploadProduct = function(response){
    spinnerService.hide('generalSpinner');
    swal(AlertService.newAlert('Products Upload', 'Products uploaded succesfully', 'success')).catch(swal.noop);
    $scope.products = response.data;
  };

  $scope.errorUploadProduct = function(error){
    spinnerService.hide('generalSpinner');
    swal(AlertService.newAlert('Products upload', 'Problem: ' + error.data.getMessage, 'error')).catch(swal.noop);
  };
  $scope.upload = function(){
    var file = document.getElementById('file').files[0],
        reader = new FileReader();
      reader.onloadend = function(e) {
        spinnerService.show('generalSpinner');
        var data = e.target.result;
        console.log('ESTE ES EL ARCHIVO:' + data);
        ProductService.uploadProduct(data).then($scope.callbackUploadProduct, $scope.errorUploadProduct);
    }
  };

  $scope.errorGetProducts = function(error){
    spinnerService.hide('generalSpinner');
  };

  $scope.callbackGetProducts = function(response){
    $scope.products = response.data;
    spinnerService.hide('generalSpinner');
  };

  $scope.getProducts = function(){
    spinnerService.show('generalSpinner');
    ProductService.getProducts().then($scope.callbackGetProducts, $scope.errorGetProducts);
  };

  $scope.resetProduct();
  $scope.getCategories();
  $scope.getProducts();

});
