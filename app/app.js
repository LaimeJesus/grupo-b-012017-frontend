(function(){
'use strict';

/**
 * @ngdoc overview
 * @name aloloco-app
 * @description
 * # aloloco-app
 *
 * Main module of the application.
 */
angular.module('aloloco-app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'routeProvider',
    'ProductService',
    'ProductListService',
    'SignUpService',
    'LoginService',
    'ProductController',
    'ProductListController',
    'SignUpController',
    'LoginController',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/index.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('aloloco-app').constant('myURL', 'http://localhost:8080/grupo-b-012017/rest/');

})();
