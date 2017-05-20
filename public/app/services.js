
var services = angular.module('aloloco-app.services', []);

services.factory('ProductService', function($http) {
    var urlbase = 'http://localhost:8080/grupo-b-012017/rest';
    var ProductAPI = {};

    ProductAPI.getProducts = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:8080/grupo-b-012017/rest/product/all'
      });
    }
    
    ProductAPI.getProduct = function(id) {
      return $http({
        method: 'GET',
        url: 'http://localhost:8080/grupo-b-012017/rest/product/?id=' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
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
        url: 'http://localhost:8080/grupo-b-012017/rest/productList/selectProduct',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
      });
    }
    
    return ProductAPI;
  });


services.factory('UserService', function($http) {
    var urlbase = 'http://localhost:8080/grupo-b-012017/rest/';
    var UserAPI = {};

    var user = {};
    var logged = false;

    UserAPI.reset = function(){
      user.username = "";
      user.password = "";
      logged = false;
    }

    UserAPI.setUser = function(newuser){
      user = newuser;
    }
    UserAPI.getUser = function(){
      return user;
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
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }
    UserAPI.logout = function(user) {
      return $http({
        method: 'POST',
        url: urlbase + 'user/logout',
        data: user,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    return UserAPI;
  });

services.factory('ProductListService', function($http) {
      var urlbase = 'http://localhost:8080/grupo-b-012017/rest';
      var ProductListAPI = {};

      ProductListAPI.mylists = function(user) {
        return $http({
          method: 'GET',
          params: {username: user.username},
          url: urlbase + 'productlist/mylists',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      ProductListAPI.create = function(userlist) {
        return $http({
          method: 'POST',
          data: userlist,
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
