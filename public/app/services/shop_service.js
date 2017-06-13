myservices.factory('ShopService', ['$http','urlbase','$rootScope', function($http, urlbase, $rootScope){
  var ShopAPI = {};

  var shopping = {};
  shopping.canBuy = false;
  shopping.listId = null;

  ShopAPI.getCanBuy = function(){
    return shopping.canBuy;
  };

  ShopAPI.getListId = function(){
    return shopping.listId;
  };

  ShopAPI.getShopping = function(){
    return shopping;
  };
  ShopAPI.setCanBuy = function(bool){
    shopping.canBuy = bool;
  }
  ShopAPI.resetTimer = function(){
    shopping.canBuy = false;
    shopping.listId = null;
  };
  ShopAPI.setId = function(id){
    shopping.listId = id;
  };
  ShopAPI.countdown = function(miliseconds, callback, error){
    $rootScope.$broadcast('start', miliseconds);
  };
  return ShopAPI;
}]);
