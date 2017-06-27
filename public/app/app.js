/**
 * @ngdoc overview
 * @name aloloco-app
 * @description
 * # aloloco-app
 *
 * Main module of the application.
 */
var app = angular.module('aloloco-app', [
    'aloloco-app.myservices',
    'aloloco-app.mycontrollers',
    'aloloco-app.myfilters',
    'ngRoute',
    'ngResource',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngMap'

]).config(function ($routeProvider, $locationProvider) {
     $routeProvider
       .when('/', {
         templateUrl: '../views/newproducts.html',
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
       .when('/offers',{
           templateUrl: '../views/homeOffer.html',
           controller: 'HomeOfferController',
       })
       .when('/myprofile', {
           templateUrl: '../views/profile.html',
           controller: 'ProfileController'
       })
       .when('/createOffer',{
           templateUrl: '../views/createOffer.html',
           controller: 'HomeOfferController',
       })
       .when('/delivery',{
           templateUrl: '../views/delivery.html',
           controller: 'DeliveryController',
       })
       .when('/adminRegisters',{
         templateUrl: '../views/registers.html',
         controller: 'RegisterController',
       })
       .when('/adminProduct', {
         templateUrl: '../views/admin_product.html',
         controller: 'AdminProductController',
       })
       .otherwise({
         redirectTo: '/'
       });
      $locationProvider.html5Mode(true);
   });
