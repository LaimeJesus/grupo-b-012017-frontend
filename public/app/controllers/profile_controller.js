mycontrollers.controller('ProfileController', function($scope, $route, $timeout, UserService, spinnerService){
  $scope.records = [];
  $scope.profile = {};
  $scope.profile.address = "";
  $scope.profile.url = "no-image";

  $scope.pictureChoosen = '';

  $scope.callbackProfile = function(response){
    console.log("profile loaded");
    console.log(response.data);
    $scope.load_profile(response.data);
    spinnerService.hide('generalSpinner');
  };

  $scope.load_profile = function(user){
    $scope.profile = user;
    $scope.profile.address = "";
    $scope.records = $scope.load_records(user.profile.purchaseRecords);
    if($scope.profile.profile.url === undefined){
      $scope.profile.profile.url = "http://image.ibb.co/kaSNyQ/no_image_fixed.png";
    }
  };

  $scope.parse_date = function(record){
    return {
      purchaselist : record.productlist,
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
    console.log("profile error");
      spinnerService.hide('generalSpinner');
  };

  $scope.getUser = function(){
      spinnerService.show('generalSpinner');
      UserService.getUser(UserService.getId()).then($scope.callbackProfile, $scope.errorHandler);
  };

  $scope.setProfilePicture = function( imageUrl ) {
    spinnerService.show('generalSpinner');

    UserService.setProfilePicture(UserService.getId() , imageUrl ).then(

      function(data) {
        console.log("TODO OK");
        spinnerService.hide('generalSpinner');
        $('#successAlert').show();
        $timeout(function () {
          $('#successAlert').hide();
         }, 3000);
        // $scope.getUser();
        $scope.profile.profile.url = $scope.pictureChoosen;
        $scope.pictureChoosen = "";
      } ,
      function(error) {
        console.log("TODO Mal");
        spinnerService.hide('generalSpinner');
      }

    )
  };

  $scope.pictureChoose = function() {
    return $scope.pictureChoosen === '';
  };

  $scope.getUser();


});


// mycontrollers.controller('ProfileController', function($scope, $route, $timeout, UserService, spinnerService){
//   $scope.records = [];
//   $scope.profile = {};
//   $scope.profile.address = "";
//   $scope.profile.url = "no-image";
//
//   $scope.pictureChoosen = '';
//
//   $scope.callbackProfile = function(response){
//     console.log("profile loaded");
//     console.log(response.data);
//     $scope.load_profile(response.data);
//     spinnerService.hide('generalSpinner');
//   };
//
//   $scope.load_profile = function(user){
//     $scope.profile = user;
//     $scope.profile.address = "";
//     $scope.records = $scope.load_records(user.profile.purchaseRecords);
//     if($scope.profile.profile.url === undefined){
//       $scope.profile.profile.url = "http://image.ibb.co/kaSNyQ/no_image_fixed.png";
//     }
//   };
//
//   $scope.parse_date = function(record){
//     return {
//       purchaselist : record.productlist,
//       purchasedate : new Date(record.purchaseDate.year, record.purchaseDate.month, record.purchaseDate.day)
//     };
//   }
//
//   $scope.load_records = function(records){
//     var res = [];
//     for(var i=0; i<records.length; i++){
//       res.push($scope.parse_date(records[i]));
//     }
//     return res;
//   };
//
//   $scope.errorHandler = function(error){
//     console.log("profile error");
//       spinnerService.hide('generalSpinner');
//   };
//
//   $scope.getUser = function(){
//       spinnerService.show('generalSpinner');
//       UserService.getUser(UserService.getId()).then($scope.callbackProfile, $scope.errorHandler);
//   };
//
//   $scope.setProfilePicture = function( imageUrl ) {
//     spinnerService.show('generalSpinner');
//
//     UserService.setProfilePicture(UserService.getId() , imageUrl ).then(
//
//       function(data) {
//         console.log("TODO OK");
//         spinnerService.hide('generalSpinner');
//         $('#successAlert').show();
//       } ,
//       function(error) {
//         console.log("TODO Mal");
//         spinnerService.hide('generalSpinner');
//       }
//
//     )
//   };
//
//   $scope.pictureChoose = function() {
//     return $scope.pictureChoosen === '';
//   };
//
//   $scope.reload = function() {
//     $('#successAlert').hide();
//     $route.reload();
//   };
//
//   $scope.getUser();
//
//
// });
