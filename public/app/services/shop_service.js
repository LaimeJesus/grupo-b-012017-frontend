myservices.factory('ShopService', ['$http','urlbase','$rootScope', function($http, urlbase, $rootScope){
  var ShopAPI = {};

  var shopping = {};
  shopping.canBuy = false;
  shopping.listId = null;
  shopping.registerId = null;
  shopping.listName = "";
  ShopAPI.getCanBuy = function(){
    return shopping.canBuy;
  };
  ShopAPI.getListId = function(){
    return shopping.listId;
  };
  ShopAPI.getListName = function(){
    return shopping.listName;
  };
  ShopAPI.setListName = function(name){
    shopping.listName = name;
  };
  ShopAPI.getShopping = function(){
    return shopping;
  };
  ShopAPI.setCanBuy = function(bool){
    shopping.canBuy = bool;
  };
  ShopAPI.resetTimer = function(){
    shopping.canBuy = false;
    shopping.listId = null;
    shopping.registerId = null;
    shopping.listName = "";
  };
  ShopAPI.setId = function(id){
    shopping.listId = id;
  };
  ShopAPI.setRegisterId = function(id){
    shopping.registerId = id;
  };
  ShopAPI.getRegisterId = function(id){
    return shopping.registerId;
  };
  ShopAPI.countdown = function(miliseconds){
    $rootScope.$broadcast('start', miliseconds);
  };
  return ShopAPI;
}]);
