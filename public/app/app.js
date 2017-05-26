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
         "navbar" : {
         "title" : "A lo loco!!!",
         "search" : "Busqueda",
         "login" : "Ingresar",
         "signup" : "Registrarse",
         "logout" : "Cerrar Sesion",
         "products" : "Productos",
         "mylists" : "Mis Listas",
         "profile" : "Mi Perfil"
          }
        }
     );
     $translateProvider.translations(
       "en-us" , {
         "navbar" : {
         "title" : "Crazy Shop",
         "search" : "Search",
         "login" : "Log In",
         "signup" : "Sign Up",
         "logout" : "Log Out",
         "products" : "Products",
         "mylists" : "My Lists",
         "profile" : "My Profile"
          }
        }
     );
     $translateProvider.useSanitizeValueStrategy('escapeParameters');
   }]);

app.run(["$window", "$translate", function($window, $translate){
  var language = ($window.navigator.userLanguage || $window.navigator.language).indexOf("en") == 0? "en-us" : "es-es";
  $translate.use(language);
}]);
