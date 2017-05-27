services.factory('ProductService', function($http) {
    var urlbase = 'http://localhost:8080/grupo-b-012017/rest/';
    var ProductAPI = {};

    ProductAPI.getProducts = function() {
      return $http({
        method: 'GET',
        url: urlbase + 'product/all'
      });
    }

    ProductAPI.getDetail = function(name, brand) {
      return $http({
        method: 'GET',
        params: {
          name: name,
          brand: brand
        },
        url: urlbase + 'product/detail'
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
        url: 'http://localhost:8080/grupo-b-012017/rest/productList/selectProduct'
      });
    }

    return ProductAPI;
  });
