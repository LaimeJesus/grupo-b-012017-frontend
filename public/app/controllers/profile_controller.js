mycontrollers.controller('ProfileController', function($scope, UserService, spinnerService){
  $scope.address = "";
  $scope.records = [];
  $scope.profile = {};
  $scope.purchase = {};

  $scope.callbackProfile = function(response){
    console.log("profile loaded");
    console.log(response.data);
    $scope.address = response.data.profile.address;
    $scope.profile = response.data;
    $scope.records = $scope.toDate(response.data.profile.purchaseRecords);
    // $scope.records = response.data.profile.purchaseRecords;
    spinnerService.hide('generalSpinner');
  };

  $scope.toDate = function(records){
    var res = [];
    for(var i=0; i<records.length; i++){

      var newrecord = {
        purchaselist : records[i].productlist,
        purchasedate : new Date(records[i].purchaseDate.year, records[i].purchaseDate.month, records[i].purchaseDate.day)
      };
      console.log(newrecord);
      res.push(newrecord);
    }
    return res;
  };

  $scope.errorHandler = function(error){
    console.log("profile error");
      spinnerService.hide('generalSpinner');
  };

  $scope.getProfile = function(){
      spinnerService.show('generalSpinner');
      UserService.getProfile(UserService.getId()).then($scope.callbackProfile, $scope.errorHandler);
  };

  $scope.getProfile();


});
