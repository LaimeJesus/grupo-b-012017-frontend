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
    'ngRoute',
    'ngResource',
    'pascalprecht.translate',
    'tmh.dynamicLocale'
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

   app.config(['$translateProvider' , function ($translateProvider) {

     $translateProvider.translations(
       "es-es" , {
         "index" : {
         "title" : "A lo loco!"
          }
        }
     );
     $translateProvider.translations(
       "en-us" , {
         "index" : {
         "title" : "A LOCOLCOLCOCLOCLCOLC!"
          }
        }
     );
   }]);

app.run(["$window", "$translate", function($window, $translate){
  var language = ($window.navigator.userLanguage || $window.navigator.language).indexOf("en") == 0? "en-us" : "es-es";
  $translate.use(language);
}]);
