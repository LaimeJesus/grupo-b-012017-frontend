
var services = angular.module('aloloco-app.services', ['ui.bootstrap']);

services.factory('ProductService', function($http) {
    var urlbase = 'http://localhost:8080/grupo-b-012017/rest';
    var ProductAPI = {};

    ProductAPI.getProducts = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:8080/grupo-b-012017/rest/product/all',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
      });
    }
    return ProductAPI;
  });


services.factory('UserService', function($http) {
    var urlbase = 'http://localhost:8080/grupo-b-012017/rest';
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }
    UserAPI.signup = function(user) {
      return $http({
        method: 'POST',
        url: urlbase + 'user/signup',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }
    UserAPI.logout = function(user) {
      return $http({
        method: 'POST',
        url: urlbase + 'user/logout',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
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
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      }
      ProductListAPI.create = function(userlist) {
        return $http({
          method: 'POST',
          data: userlist,
          url: urlbase + 'productlist/create',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      }
      ProductListAPI.selectproduct = function(userlistprodquantity) {
        return $http({
          method: 'POST',
          data: userlistprodquantity,
          url: urlbase + 'productlist/selectproduct',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      }

      return ProductListAPI;
    });

services.factory('modalFactory', function($uibModal) {
      return {
        open: function(size, template, params) {
          return $uibModal.open({
            animation: true,
            templateUrl: '/views/modal-login.html',
            controller: 'ModalResultInstanceCtrl',
            size: size,
            resolve: {
              params: function() {
                return params;
              }
            }
          });
        }
      };
    });
