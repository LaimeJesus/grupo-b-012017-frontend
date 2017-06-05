
var services = angular.module('aloloco-app.services', []);

services.constant('urlbase', 'http://localhost:8080/grupo-b-012017/rest/');

services.factory('ProductService', ['$http', 'urlbase', function($http, urlbase) {
    var ProductAPI = {};

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

    return ProductAPI;
  }]);


services.factory('UserService', ['$http','urlbase', function($http, urlbase) {
    var UserAPI = {};

    var username = {};
    var logged = false;
    var userId = {};

    UserAPI.reset = function(){
      username.username = "";
      logged = false;
      userId = {};
    }

    UserAPI.setUser = function(newuser){
      username = newuser;
    }
    UserAPI.getUser = function(){
      return username;
    }
    UserAPI.getId = function () {
        return userId;
    }
    UserAPI.setId = function (id) {
        userId = id;
    }
    UserAPI.logged = function(bool){
      logged = bool;
    }
    UserAPI.islogged = function(){
      return logged;
    }

    UserAPI.login = function(user) {
      return $http({
        method: 'POST',
        url: urlbase + 'users/login',
        data: user,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }
    UserAPI.signup = function(user) {
      return $http({
        method: 'POST',
        url: urlbase + 'user/signup',
        data: user,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }
    UserAPI.logout = function(username) {
        console.log("Usuario : " + username);
      return $http({
        method: 'POST',
        url: urlbase + 'user/logout',
        data: {
            username : username
        },
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    UserAPI.getProfile = function(userId){
      return $http({
        method: 'GET',
        url: urlbase + 'users/' + userId,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      })
    }

    return UserAPI;
  }]);

services.factory('ProductListService', ['$http','urlbase', function($http, urlbase) {
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
            'Content-Type':'applications/json'
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

services.factory('ShopService', ['$http','urlbase', function($http, urlbase){
  var ShopAPI = {};
  ShopAPI.waitingTime = function(username, listname){
    return $http({
      method: 'GET',
      params: {
        username : username,
        listname : listname
      },
      url: urlbase + 'shop/waitingtime'
    });
  }
  ShopAPI.ready = function(username, listname){
    return $http({
      method: 'POST',
      data: {
        username : username,
        listname : listname
      },
      url: urlbase + 'shop/ready',
      headers : {
        "Content-Type" : 'application/json'
      }
    });
  }
  return ShopAPI;
}]);

services.factory('OfferService', ['$http','urlbase', function($http, urlbase) {
    var OfferServiceAPI = {};

    OfferServiceAPI.getAllCategories = function() {
        return $http({
            method: 'GET',
            url: urlbase + 'offer/categories'
        })
    };

    OfferServiceAPI.newCategoryOffer = function(data) {
        return $http({
            method: 'POST',
            data: data,
            url: urlbase + 'offers/category'
        })
    };

    OfferServiceAPI.getAllOffers = function() {
        return $http({
            method: 'GET',
            url: urlbase + 'offers/'
        })
    };

    return OfferServiceAPI;

}]);
