// angular.module('aloloco-app').service('SignUpService', function($http) {
//   this.signup = function(jsonObject, callback, errorHandler) {
//     $http({
//       //url : myURL + "user/signup",
//       url : 'http://localhost:8080/grupo-b-012017/rest/',
//       method : "POST",
//       data : jsonObject,
//       headers : {
//         'Content-Type' : 'application/x-www-form-urlencoded'
//       }
//     }).success(callback).error(errorHandler);
//   };
// });

angular.module('aloloco-app').factory("SignUpService", ['$http',function($http){
  var urlbase = "http://localhost:8080/grupo-b-012017/rest/";
  var SignUpService = {};

  SignUpService.signup = function(user) {
    return $http.post(urlbase+"/user/signup", user);
  }

  return SignUpService;
}]);
