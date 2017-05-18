angular.module('aloloco-app').service('LoginService', function($http, myURL) {
  var user = {};
  user.username = "";
  user.pasword = "";
  var logged = false;

  this.getUser = function(){
    return user;
  };
  this.setUser = function(newuser){
    logged = true
    user = newuser;
  };

  this.islogged = function(){
    return logged;
  };

	this.login = function(jsonObject, callback, errorHandler) {
		$http({
			url : myURL + "/user/login",
			method : "POST",
			data : jsonObject,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(callback).error(errorHandler);
	};
});
