mycontrollers.controller('ProfileController', function($scope, UserService, spinnerService){
  $scope.address = "";
  $scope.records = [];
  $scope.profile = {};
  $scope.purchase = {};

  $scope.callbackProfile = function(response){
    console.log("profile loaded");
    $scope.address = response.data.profile.address;
    $scope.profile = response.data;
    $scope.records = response.data.profile.purchaseRecords;
      spinnerService.hide('generalSpinner');
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
