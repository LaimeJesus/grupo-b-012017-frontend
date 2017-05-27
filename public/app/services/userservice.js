
services.factory('UserService', function($http) {
    var urlbase = 'http://localhost:8080/grupo-b-012017/rest/';
    var UserAPI = {};

    var username = {};
    var logged = false;

    UserAPI.reset = function(){
      username.username = "";
      logged = false;
    }

    UserAPI.setUser = function(newuser){
      username = newuser;
    }
    UserAPI.getUser = function(){
      return username;
    }

    UserAPI.logged = function(bool){
      logged = bool;
    }
    UserAPI.islogged = function(){
      return logged;
    }


    UserAPI.login = function(user) {
      return $http({
        method: 'POST',
        url: urlbase + 'user/login',
        data: user,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }
    UserAPI.signup = function(user) {
      return $http({
        method: 'POST',
        url: urlbase + 'user/signup',
        data: user,
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }
    UserAPI.logout = function(username) {
        console.log("Usuario : " + username);
      return $http({
        method: 'POST',
        url: urlbase + 'user/logout',
        data: {
            username : username
        },
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    return UserAPI;
  });
