angular.module('aloloco-app').service('SignUpService', function($http, myURL) {
  this.signup = function(jsonObject, callback, errorHandler) {
    $http({
      url : myURL + "user/signup",
      method : "POST",
      data : jsonObject,
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).success(callback).error(errorHandler);
  };
});
