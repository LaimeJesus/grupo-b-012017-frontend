myservices.factory('ProductService', ['$http', 'urlbase', function($http, urlbase) {
    var ProductAPI = {};

    ProductAPI.getDetail = function(id) {
      return $http({
        method: 'GET',
        url: urlbase + 'products/' + id
      });
    }

    ProductAPI.addProductToList = function(username, prodListName, idProd, cant) {
      return $http({
        method: 'POST',
        data: {
            user : username,
            productList : prodListName,
            product : idProd,
            quantity : cant
        },
        url: urlbase + 'productList/selectProduct'
      });
    }
    ///////////////////////////////////////////////////////////////////////////
    ProductAPI.getProducts = function() {
      return $http({
        method: 'GET',
        url: urlbase + 'products/'
      });
    }
    ProductAPI.deleteProducts = function() {
      return $http({
        method: 'DELETE',
        url: urlbase + 'products/'
      });
    }

    ProductAPI.getProductById = function(id){
      return $http({
        method: 'GET',
        url: urlbase + 'products/' + id
      });
    }

    ProductAPI.uploadProduct = function(file){
      return $http({
        method: 'PUT',
        url: urlbase + 'products/upload',
        data: file,
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });
    }

    ProductAPI.createProduct = function(data){
      return $http({
        method: 'POST',
        url: urlbase + 'products/',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    ProductAPI.updateProduct = function(id, product){
      return $http({
        method: 'PUT',
        url: urlbase + 'products/' + id,
        data: product,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    ProductAPI.deleteProduct = function(id){
      return $http({
        method: 'DELETE',
        url: urlbase + 'products/' + id
      });
    }
    return ProductAPI;
  }]);
