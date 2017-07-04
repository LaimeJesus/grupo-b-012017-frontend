mycontrollers.controller('ProfileController', function($scope, $route, $timeout, UserService, spinnerService, AlertService, UrlCheckerService){
  $scope.records = [];
  $scope.profile = {};
  $scope.profile.address = "";
  $scope.profile.url = "";

  $scope.pictureChoosen = '';

  $scope.resetChangePassword = function(){
    $scope.changePassword.oldpassword = "";
    $scope.changePassword.newpassword = "";
  };

  $scope.changePassword = {};
  $scope.resetChangePassword();

  $scope.callbackProfile = function(response){
    $scope.load_profile(response.data);
    spinnerService.hide('generalSpinner');
  };

  $scope.load_profile = function(user){
    $scope.profile = user;
    $scope.records = $scope.load_records(user.profile.purchaseRecords);
    if($scope.profile.profile.url === undefined){
      $scope.profile.profile.url = UrlCheckerService.getValidImageUrl();
    }
  };

  $scope.parse_date = function(record){
    return {
      // purchaselist : record.productlist,
      name : record.name,
      totalAmount : record.totalAmount,
      purchasedate : new Date(record.purchaseDate.year, record.purchaseDate.month, record.purchaseDate.day)
    };
  }

  $scope.load_records = function(records){
    var res = [];
    for(var i=0; i<records.length; i++){
      res.push($scope.parse_date(records[i]));
    }
    return res;
  };

  $scope.errorHandler = function(error){
    spinnerService.hide('generalSpinner');
  };

  $scope.getUser = function(){
    spinnerService.show('generalSpinner');
    UserService.getUser(UserService.getId()).then($scope.callbackProfile, $scope.errorHandler);
  };

  $scope.callbackSetPicture = function(response){
    $scope.profile.profile.url = $scope.pictureChoosen;
    $scope.pictureChoosen = "";
    swal(AlertService.newAlert('Upload picture correctly', 'New picture user url is: ' + $scope.profile.profile.url, 'success')).catch(swal.noop);
    spinnerService.hide('generalSpinner');
  };

  $scope.errorSetPicture = function(error){
    spinnerService.hide('generalSpinner');
    swal(AlertService.newAlert('Error in load photo', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
  };

  $scope.setProfilePicture = function( imageUrl ) {
    spinnerService.show('generalSpinner');
    UserService.setProfilePicture(UserService.getId(), imageUrl).then($scope.callbackSetPicture, $scope.errorSetPicture);
  };

  $scope.pictureChoose = function() {
    return $scope.pictureChoosen === '' || UrlCheckerService.isValidImageUrl($scope.pictureChoosen);
  };

  $scope.checkChangedPassword = function(){
    return $scope.changePassword.oldpassword !== $scope.changePassword.newpassword;
  };

  $scope.callbackChangePassword = function(response){
    $scope.resetChangePassword();
    swal(AlertService.newAlert('Changed password correctly', 'Be careful with your new password', 'success')).catch(swal.noop);
    spinnerService.hide('generalSpinner');
  }

  $scope.errorChangePassword = function(error){
    $scope.resetChangePassword();
    swal(AlertService.newAlert('Error in change password', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
    spinnerService.hide('generalSpinner');
  }

  $scope.changePasswordMethod = function(newPassword){
    UserService.changePassword(UserService.getId(), $scope.changePassword).then($scope.callbackChangePassword, $scope.errorChangePassword);
  };

  $scope.getUser();


});
