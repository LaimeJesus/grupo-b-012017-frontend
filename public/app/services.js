
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
          'Access-Control-Allow-Origin': '*',
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
