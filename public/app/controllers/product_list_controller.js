mycontrollers.controller('ProductListController', function($scope, $route, $location, UserService, ProductListService, ShopService, spinnerService, $q, AlertService) {
    $scope.productlists = [];
    $scope.spanLog = "";
    $scope.selectedProductList = {};
    $scope.newList = {};
    $scope.newList.name = "";
    $scope.loading = false;

    $scope.goDelivery = function () {
        $location.path('/delivery');
    }

    $scope.callbackGetLists = function(response) {
        $scope.productlists = response.data;
        spinnerService.hide('generalSpinner');
    };
    $scope.errorHandlerGetList = function(error) {
        spinnerService.hide('generalSpinner');
    };

    $scope.mylists = function(){
        spinnerService.show('generalSpinner');
        if(UserService.islogged()){
            ProductListService.mylists(UserService.getId()).then($scope.callbackGetLists, $scope.errorHandlerGetList);
        }
    };

    $scope.callbackCreate = function(response) {
        spinnerService.hide('generalSpinner');
        $scope.newList.name = "";
        $scope.productlists.push(response.data);
        swal(AlertService.newAlert('List created correctly', 'Added list: ' + response.data.name, 'success')).catch(swal.noop);
    }

    $scope.errorHandlerCreate = function(error) {
        $scope.newList.name = "";
        spinnerService.hide('generalSpinner');
        swal(AlertService.newAlert('Error in create product list', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
    }

    $scope.createproductlist = function(){
      spinnerService.show('generalSpinner');
      if (UserService.islogged()){
        ProductListService.create(UserService.getId() , $scope.newList.name).then($scope.callbackCreate, $scope.errorHandlerCreate);
      }
    };

    $scope.callbackListDetail = function (response) {
        $scope.selectedProductList = response.data;
        spinnerService.hide('generalSpinner');
    }

    $scope.errorHandlerListDetail = function () {
        spinnerService.hide('generalSpinner');
    }

    $scope.listDetail = function (listId) {
        spinnerService.show('generalSpinner');
        ProductListService.getList(UserService.getId(), listId).then( $scope.callbackListDetail , $scope.errorHandlerListDetail );
    }

    $scope.callbackDeleteSelectedProduct = function(data){
      spinnerService.hide('generalSpinner');
      swal(AlertService.newAlert('Deleted selected product', 'lists updated correctly', 'success')).catch(swal.noop);
    }

    $scope.errorHandlerDeleteSelectedProduct = function(error){
      spinnerService.hide('generalSpinner');
      swal(AlertService.newAlert('Error in delete selected product', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
    }

    $scope.deleteSelectedProduct = function(listId, selectedProductId){
      spinnerService.show('generalSpinner');
      swal(AlertService.getDeleteButton()).then(function(){
        ProductListService.deleteSelectedProduct(UserService.getId(), listId, selectedProductId).then( $scope.callbackDeleteSelectedProduct , $scope.errorHandlerDeleteSelectedProduct);
      }).catch(swal.noop);
      spinnerService.hide('generalSpinner');
    }

    $scope.callbackUpdateSelectedProduct = function(data){
      spinnerService.hide('generalSpinner');
      $location.path('/mylists');
      $scope.mylists();
      swal(AlertService.newAlert('Updated selected product', 'lists updated correctly', 'success')).catch(swal.noop);
    }

    $scope.errorHandlerUpdateSelectedProduct = function(error){
      spinnerService.hide('generalSpinner');
      swal(AlertService.newAlert('Error in update selected product', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
    }

    $scope.updateSelectedProduct = function(listId, selectedProductId, selectedProduct){
      spinnerService.show('generalSpinner');
      ProductListService.updateSelectedProduct(UserService.getId(), listId, selectedProductId, {quantity:selectedProduct.quantity, productId:selectedProduct.id}).then( $scope.callbackUpdateSelectedProduct , $scope.errorHandlerUpdateSelectedProduct );
    }

    $scope.deleteFromProductlist = function(id){
      $scope.productlists = $scope.productlists.filter(function(pl){
        return pl.id !== id;
      });
    }

    $scope.callbackDeleteListWithoutAlert = function(data){
      $scope.deleteFromProductlist($scope.idtodelete);
      $scope.idtodelete = -1;
      spinnerService.hide('generalSpinner');
    }

    $scope.callbackDeleteList = function(data){
      $scope.callbackDeleteListWithoutAlert(data);
      swal(AlertService.newAlert('Delete!', 'Your list has been deleted', 'success')).catch(swal.noop);
    }

    $scope.errorDeleteListwithoutAlert = function(error){
      spinnerService.hide('generalSpinner');
    }

    $scope.errorDeleteList = function(error){
      $scope.errorDeleteListwithoutAlert(error);
      // swal(AlertService.newAlert('Error deleting that list!', 'Your list has not been deleted.','error'));
      swal(AlertService.newAlert('Error in delete list', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
    }

    $scope.deleteList = function(listId){
      spinnerService.show('generalSpinner');
      $scope.idtodelete = listId;
      swal(AlertService.getDeleteButton()).then(function(){
        ProductListService.deleteList(UserService.getId(), listId).then($scope.callbackDeleteList, $scope.errorDeleteList);
      }).catch(swal.noop);

      spinnerService.hide('generalSpinner');
    };

    $scope.deleteListWithoutAlert = function(listId){
      spinnerService.show('generalSpinner');
      $scope.idtodelete = listId;
      ProductListService.deleteList(UserService.getId(), listId).then($scope.callbackDeleteListWithoutAlert, $scope.errorDeleteListwithoutAlert);
      spinnerService.hide('generalSpinner');
    };

    // ADDED FOR READY AND WAITING TIME USES IN PRODUCT LIST SELECTED
    $scope.callbackReady = function(response){
      var wu = response.data;
      ShopService.setId(wu.productlistId);
      ShopService.setRegisterId(wu.registerId);
      ShopService.countdown(wu.duration.milliseconds);
      swal(AlertService.newAlert('Waiting for list: ' + ShopService.getListName(), 'In register: ' + wu.registerId + ' for ' + Math.ceil(wu.duration.milliseconds / 1000) + ' seconds', 'success')).catch(swal.noop);
      spinnerService.hide('generalSpinner');
    };

    $scope.errorReady = function(error){
      ShopService.setListName("");
      swal(AlertService.newAlert('Error in ready', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
      spinnerService.hide('generalSpinner');
    };

    $scope.ready = function(listId, name){
      spinnerService.show('generalSpinner');
      ShopService.setListName(name);
      ProductListService.ready(UserService.getId(), listId).then($scope.callbackReady, $scope.errorReady);
    };

    $scope.callbackShop = function(data){
      $scope.deleteListWithoutAlert(ShopService.getListId());
      swal(AlertService.newAlert('Bought list', 'List: ' + ShopService.getListName() + ' added to history', 'success')).catch(swal.noop);
      ShopService.resetTimer();
      spinnerService.hide('generalSpinner');
    };

    $scope.errorShop = function(error){
      swal(AlertService.newAlert('Error shopping list', 'Problem: ' + error.data.errorMessage, 'error')).catch(swal.noop);
      ShopService.resetTimer();
      spinnerService.hide('generalSpinner');
    };

    $scope.shop = function(listId){
      spinnerService.show('generalSpinner');
      ProductListService.shop(UserService.getId(), listId).then($scope.callbackShop, $scope.errorShop);
    }
    $scope.someoneShopping = function(listId){
      return ShopService.getListId() !== listId;
    }
    $scope.someoneReady = function(){
      return ShopService.getListId() !== null;
    }
    $scope.someoneCanBuy = function(){
      return ShopService.getCanBuy();
    }

    $scope.callbackWaitingTime = function(data){
      spinnerService.hide('generalSpinner');
    }

    $scope.errorWaitingTime = function(error){
      spinnerService.hide('generalSpinner');
    }

    $scope.waitingTime = function(listId){
      spinnerService.show('generalSpinner');
      ProductListService.waitingTime(UserService.getId(), listId).then($scope.callbackWaitingTime, $scope.errorWaitingTime);
    }

    $scope.mylists();

});
