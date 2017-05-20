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
]).config(function ($routeProvider, $locationProvider) {
     $routeProvider
       .when('/', {
         templateUrl: '../views/all_products.html',
         controller: 'ProductController',
       })
       .when('/signup',{
         templateUrl: '../views/signup.html',
         controller: 'SignUpController',
       })
       .when('/login',{
         templateUrl: '../views/login.html',
         controller: 'LoginController',
       })
       .when('/mylists',{
         templateUrl: '../views/productlist.html',
         controller: 'ProductListController',
       })
       .otherwise({
         redirectTo: '/'
       });
      $locationProvider.html5Mode(true);
   });
