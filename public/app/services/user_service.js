myservices.factory('UserService', ['$http','urlbase', function($http, urlbase) {
    var UserAPI = {};

    var username = {};
    var logged = false;
    var userId = {};

    UserAPI.reset = function(){
      username.username = "";
      logged = false;
      userId = {};
    }

    UserAPI.setUser = function(newuser){
      username = newuser;
    }
    UserAPI.getUser = function(){
      return username;
    }
    UserAPI.getId = function () {
        return userId;
    }
    UserAPI.setId = function (id) {
        userId = id;
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
        url: urlbase + 'users/login',
        data: user,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    UserAPI.googleSignOut = function(){
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }

    //user.email, user.username
    UserAPI.logInWithMail = function(user){
        return $http({
          method: 'POST',
          url: urlbase + 'users/loginwithmail',
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
        url: urlbase + 'users/signup',
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
        url: urlbase + 'users/logout',
        data: {
            username : username
        },
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    UserAPI.getProfile = function(userId){
      return $http({
        method: 'GET',
        url: urlbase + 'users/' + userId,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    return UserAPI;
  }]);
