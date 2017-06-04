
var services = angular.module('aloloco-app.services', []);

services.constant('url', 'http://localhost:8080/rest/');

services.factory('ProductService', ['$http', 'url', function($http, url) {
    var urlbase = url;
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
        url: urlbase + 'productList/selectProduct'
      });
    }

    return ProductAPI;
  }]);


services.factory('UserService', ['$http','url', function($http, url) {
    var urlbase = url;
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

    UserAPI.getProfile = function(user){
      return $http({
        method: 'GET',
        url: urlbase + 'user/myprofile',
        params: {
          username : user.username
        },
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      })
    }

    return UserAPI;
  }]);

services.factory('ProductListService', ['$http','url', function($http, url) {
      var urlbase = url;
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
          })
      }

      return ProductListAPI;
    }]);

services.factory('ShopService', ['$http','url', function($http, url){
  var urlbase = url;
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

services.factory('OfferService', ['$http','url', function($http, url) {
    var urlbase = url;
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
