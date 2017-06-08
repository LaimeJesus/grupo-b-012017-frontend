myservices.factory('ShopService', ['$http','urlbase', function($http, urlbase){
  var ShopAPI = {};
  ShopAPI.waitingTime = function(username, listname){
    return $http({
      method: 'GET',
      params: {
        username : username,
        listname : listname
      },
      url: urlbase + 'shop/waitingtime'
    });
  }
  ShopAPI.ready = function(username, listname){
    return $http({
      method: 'POST',
      data: {
        username : username,
        listname : listname
      },
      url: urlbase + 'shop/ready',
      headers : {
        "Content-Type" : 'application/json'
      }
    });
  }
  return ShopAPI;
}]);
