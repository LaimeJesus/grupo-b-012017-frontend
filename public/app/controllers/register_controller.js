mycontrollers.controller('RegisterController', function($scope, spinnerService, RegisterService) {
  $scope.registers = [];

  $scope.callbackGetRegisters = function(response){
    console.log(response);
    $scope.registers = response.data;
  };

  $scope.errorGeneric = function(error){
    console.log(error);
  };

  $scope.getRegisters = function(){
    RegisterService.getRegisters().then($scope.callbackGetRegisters, $scope.errorGeneric);
  };

  $scope.updateRegister = function(register) {
    for(var i=0;i<$scope.registers.length; i++){
      if(register.id === $scope.registers[i].id){
        $scope.registers[i] = register;
        return;
      }
    }
  }

  $scope.callbackUpdateRegister = function(response){
    console.log(response);
    $scope.updateRegister(response.data);
  }

  $scope.close = function(registerId){
    RegisterService.closeRegister(registerId).then($scope.callbackUpdateRegister, $scope.errorGeneric);
  }

  $scope.open = function(registerId){
    RegisterService.openRegister(registerId).then($scope.callbackUpdateRegister, $scope.errorGeneric);
  }

  $scope.get = function(registerId){
    RegisterService.getRegister(registerId).then($scope.callbackUpdateRegister, $scope.errorGeneric);
  }

  $scope.getRegisters();

});
