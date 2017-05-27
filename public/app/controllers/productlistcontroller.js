controllers.controller('ProductListController', [
  '$scope',
  'UserService',
  'ProductListService',
  function($scope, UserService, ProductListService) {
    $scope.productlists = [{"name" : "Lista 1"} , {"name" : "Lista2"} , {"name" : "Lista 3"} , {"name" : "Lista4"} , {"name" : "Lista5"} ];
    $scope.spanLog = "";

    //esto deberia ir al final
    //$scope.getlists();
    $scope.newlist = false;
    $scope.showNewList = function(){
      $scope.newlist = true;
      $scope.name = "";
    }
    $scope.callbackGetLists = function(data) {
      console.log("Lists Received Succesfully");
      $scope.productlists = data.data;
    };
    $scope.errorHandlerGetList = function(error) {
      console.log("Lists Received Failure");
      console.log(error);
    };

    $scope.getlists = function(){
      if(UserService.islogged()){
        ProductListService.mylists(UserService.getUser()).then($scope.callbackGetLists, $scope.errorHandlerGetList);
      }
    };

    $scope.callbackCreate = function(data) {
      console.log("List Created Succesfully");
      console.log(data);
    }

    $scope.errorHandlerCreate = function(error) {
      console.log("List Creation Failed");
      console.log(error);
    }

    $scope.createproductlist = function(){
      if (UserService.islogged()){
        ProductListService.create(UserService.getUser().username , $scope.newListName).then($scope.callback, $scope.errorHandler);
      }
    };

}]);
