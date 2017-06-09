myservices.factory('ProductListService', ['$http','urlbase', function($http, urlbase) {
      var ProductListAPI = {};

      ProductListAPI.mylists = function(userId) {
        return $http({
          method: 'GET',
          url: urlbase + 'users/'+ userId + '/productlists',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      ProductListAPI.selectproduct = function(username, listname, prodName, prodBrand, quantity) {
        return $http({
          method: 'POST',
          data: {
              "user" : {
                  "username" : username
              },
              "productlist" : {
                  "name" : listname
              },
              "product" : {
                  "id" : "",
                  "name" : prodName,
                  "brand" : prodBrand,
                  "imageUrl" : ""
              },
              "quantity" : quantity
          },
          url: urlbase + 'productlist/selectproduct',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      ProductListAPI.selections = function (userId , listId) {
          return $http({
              method: 'GET',
              url : urlbase + 'users/'+ userId +'/productlists/' + listId
          });
      }
      //////////////////////////////////////////////////////////////////////////
      ProductListAPI.create = function(userId , listname) {
        return $http({
          method: 'POST',
          url: urlbase + 'users/'+ userId + '/productlists/',
          data: {
              name : listname
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      ProductListAPI.getList = function(userId, listId){
        return $http({
          method: 'GET',
          url: urlbase + 'users/'+userId+'/productlists/'+listId
        });
      }
      ProductListAPI.deleteList = function(userId, listId){
        return $http({
          method: 'DELETE',
          url: urlbase + 'users/'+userId+'/productlists/'+listId
        });
      }
      //////////////////////////////////////////////////////////////////////////
      ProductListAPI.getSelectedProducts = function(userId, listId){
        return $http({
          method: 'GET',
          url: urlbase + 'users/'+userId+'/productlists/'+listId+'/selectedproducts'
        });
      }

      ProductListAPI.createSelectedProduct = function(userId, listId, selectedproduct){
        return $http({
          method:'POST',
          url: urlbase + 'users/'+userId+'/productlists/'+listId+'/selectedproducts',
          data: selectedproduct,
          headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type':'application/json'
          }
        });
      }
      ProductListAPI.updateSelectedProduct = function(userId, listId, selectedproductId, selectedproduct){
        return $http({
          method: 'PUT',
          url: urlbase + 'users/'+userId+'/productlists/'+listId+'/selectedproducts/'+selectedproductId,
          data: {
            productId: selectedproduct.productId,
            quantity: selectedproduct.quantity
          },
          headers: {
            'Content-Type':'application/json'
          }
        });
      }
      ProductListAPI.getSelectedProduct = function(userId, listId, selectedproductId){
        return $http({
          method: 'GET',
          url: urlbase + 'users/'+userId+'/productlists/'+listId+'/selectedproducts/'+selectedproductId,
        });
      }
      ProductListAPI.deleteSelectedProduct = function(userId, listId, selectedproductId){
        return $http({
          method: 'DELETE',
          url: urlbase + 'users/'+userId+'/productlists/'+listId+'/selectedproducts/'+selectedproductId,
        });
      }

      ProductListAPI.shop = function(userId, listId){
        return $http({
          method: 'POST',
          url: urlbase + 'users/'+userId+'/productlists/'+listId+'/shop',
          headers: {
            'Content-Type':'application/json'
          }
        });
      }

      ProductListAPI.ready = function(userId, listId){
        return $http({
          method: 'GET',
          url: urlbase + 'users/'+userId+'/productlists/'+listId+'/ready'
        });
      }
      ProductListAPI.waitingtime = function(userId, listId){
        return $http({
          method: 'GET',
          url: urlbase + 'users/'+userId+'/productlists/'+listId+'/waitingtime'
        });
      }
      return ProductListAPI;
    }]);
