myservices.factory('UserService', ['$http','urlbase', function($http, urlbase) {
    var UserAPI = {};
    var user = {
        "username" : "",
        "logged" : false,
        "userId" : null,
        "address" : "",
        "isloggedWithMail" : false
    };

    UserAPI.reset = function(){
      user.username = "";
      user.logged = false;
      user.userId = null;
      user.address = "";
      user.isloggedWithMail = false;
    }

    UserAPI.setUsername = function(username){
      user.username = username;
    }
    UserAPI.getUsername = function(){
      return user.username;
    }
    UserAPI.getId = function () {
        return user.userId;
    }
    UserAPI.setId = function (id) {
        user.userId = id;
    }
    UserAPI.logged = function(bool){
      user.logged = bool;
    }
    UserAPI.islogged = function(){
      return user.logged;
    }
    UserAPI.getAddress = function () {
        return user.address;
    }
    UserAPI.setAddress = function (newAddress) {
        user.address = newAddress;
    }
    UserAPI.isloggedWithMail = function(){
      return user.isloggedWithMail;
    }
    UserAPI.setIsloggedWithMail = function(bool){
      user.isloggedWithMail = bool;
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
    UserAPI.logout = function(id) {
      return $http({
        method: 'POST',
        url: urlbase + 'users/'+ id +'/logout',
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    UserAPI.getUser = function(id){
      return $http({
        method: 'GET',
        url: urlbase + 'users/' + id,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    UserAPI.setProfilePicture = function(id , imageUrl){
      return $http({
        method: 'POST',
        url: urlbase + 'users/' + id + '/profile/imageUrl',
        data: imageUrl,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    }

    return UserAPI;
  }]);
