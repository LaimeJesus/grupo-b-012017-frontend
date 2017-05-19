/**
 * @ngdoc overview
 * @name aloloco-app
 * @description
 * # aloloco-app
 *
 * Main module of the application.
 */
var app = angular.module('aloloco-app', [
    'aloloco-app.controllers', 
    'aloloco-app.services',
    'ngRoute'
])
    // 'ngAnimate',
    // 'ngAria',
    // 'ngCookies',
    // 'ngMessages',
    // 'ngResource',
    // 'ngRoute',
    // 'ngSanitize',
    // 'ngTouch',
    // 'routeProvider',
  //   'SignUpService',
  //   'LoginService',
  //   'ProductService',
  //   'ProductListService',
  //   'SignUpController',
  //   'LoginController',
  //   'ProductController',
  //   'ProductListController',
  // ])
   .config(function ($routeProvider) {
     $routeProvider
       .when('/', {
         templateUrl: '../views/all_products.html',
         controller: 'ProductController',
       })
       .otherwise({
         redirectTo: '/'
       });
   });

// app.constant('myURL', 'http://localhost:8080/grupo-b-012017/rest/');
