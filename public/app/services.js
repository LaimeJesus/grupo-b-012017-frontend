
var services = angular.module('aloloco-app.services', []);

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
