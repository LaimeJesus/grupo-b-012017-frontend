services.factory('ProductListService', function($http) {
      var urlbase = 'http://localhost:8080/grupo-b-012017/rest/';
      var ProductListAPI = {};

      ProductListAPI.mylists = function(username) {
        return $http({
          method: 'GET',
          params: {
            username : username
          },
          url: urlbase + 'productlist/mylists',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      ProductListAPI.create = function(username , listname) {
        return $http({
          method: 'POST',
          data: {
            username : username,
            name : listname
          },
          url: urlbase + 'productlist/create',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      ProductListAPI.selectproduct = function(userlistprodquantity) {
        return $http({
          method: 'POST',
          data: userlistprodquantity,
          url: urlbase + 'productlist/selectproduct',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      return ProductListAPI;
    });
