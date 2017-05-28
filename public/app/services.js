
var services = angular.module('aloloco-app.services', []);

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


services.factory('UserService', function($http) {
    var urlbase = 'http://localhost:8080/grupo-b-012017/rest/';
    var UserAPI = {};

    var username = {};
    var logged = false;

    UserAPI.reset = function(){
      username.username = "";
      logged = false;
    }

    UserAPI.setUser = function(newuser){
      username = newuser;
    }
    UserAPI.getUser = function(){
      return username;
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
        url: urlbase + 'user/login',
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
  });

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

services.factory('ShopService', functin($http){
  var urlbase = 'http://localhost:8080/grupo-b-012017/rest/';
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
})
