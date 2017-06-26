myservices.factory('RegisterService', ['$http','urlbase', function($http, urlbase) {
      var RegisterAPI = {};

      RegisterAPI.getRegisters = function() {
        return $http({
          method: 'GET',
          url: urlbase + 'registers/',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      RegisterAPI.closeRegister = function(registerId) {
        return $http({
          method: 'PUT',
          url: urlbase + 'registers/' + registerId + '/close',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      RegisterAPI.openRegister = function(registerId) {
          return $http({
            method: 'PUT',
            url: urlbase + 'registers/' + registerId + '/open',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      }
      RegisterAPI.getRegister = function(registerId) {
          return $http({
            method: 'GET',
            url: urlbase + 'registers/' + registerId,
            headers: {
              'Content-Type': 'application/json'
            }
          });
      }
      return RegisterAPI;
    }]);
