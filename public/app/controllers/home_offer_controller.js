mycontrollers.controller('HomeOfferController', function($scope , OfferService, spinnerService){

    $scope.offer = {};
    $scope.offer.startDate = "";
    $scope.offer.endDate = "";
    $scope.offer.discount = "";
    $scope.offer.type = "Category Offer";
    $scope.offer.category = "";

    $scope.allCategories = [];
    $scope.offers = [];

    $scope.isCategory = function() {
        return $scope.offer.type === "Category Offer";
    };

    $scope.isCrossing = function() {
        return $scope.offer.type === "Crossing Offer";
    };

    $scope.isCombination = function() {
        return $scope.offer.type === "Combination Offer";
    };

    $scope.getType = function (offer) {
        if (offer.category !== undefined){
            console.log("Category");
            return "Category";
        } else {
            if (offer.minQuantity !== undefined){
                console.log("Crossing");
                return "Crossing";
            } else {
                console.log("Combination");
                return "Combination";
            }
        }
    }

    $scope.getDate = function (date) {
        console.log("Fecha de entrada : ");
        console.log(date);
        return date.month + '/' + date.day + '/' + date.year;
    }

    $scope.callbackAllCategories = function(data) {
        console.log("All Categories received succesfully");
        console.log(data);
        $scope.allCategories = data.data;
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerAllCategories = function(error) {
        console.log("All Categories something failed");
        console.log(error);
        spinnerService.hide('generalSpinner');
    };

    $scope.getAllCategories = function() {
        spinnerService.show('generalSpinner');
        if ($scope.allCategories.length == 0) {
            OfferService.getAllCategories().then($scope.callbackAllCategories , $scope.errorHandlerAllCategories);
        }
    };

    $scope.resetCreateOffer = function(){
      $scope.offer = {};
      $scope.offer.startDate = "";
      $scope.offer.endDate = "";
      $scope.offer.discount = "";
      $scope.offer.type = "Category Offer";
      $scope.offer.category = "";
    };

    $scope.callbackNewOffer = function (response) {
        console.log("Category Offer created succesfully");
        console.log(response);
        $scope.resetCreateOffer();
        spinnerService.hide('generalSpinner');
    }

    $scope.errorHandlerNewOffer = function(error) {
        console.log("Category Offer created failed");
        console.log(error);
        $scope.resetCreateOffer();
        spinnerService.hide('generalSpinner');
    };

    $scope.createnewoffer = function() {
        spinnerService.show('generalSpinner');

        var values = $scope.offer.startDate.split(" ");
        var fecha =values[0];
        var hora = values[1];
        var fechaCortada = fecha.split("/");
        var mes = fechaCortada[0];
        var dia = fechaCortada[1];
        var año = fechaCortada[2];
        var horaCortada = hora.split(":");
        var hora = horaCortada[0];
        var min = horaCortada[1];
        var values1 = $scope.offer.endDate.split(" ");
        var fecha1 =values1[0];
        var hora1 = values1[1];
        var fechaCortada1 = fecha1.split("/");
        var mes1 = fechaCortada1[0];
        var dia1 = fechaCortada1[1];
        var año1 = fechaCortada1[2];
        var horaCortada1 = hora1.split(":");
        var hora1 = horaCortada1[0];
        var min1 = horaCortada1[1];

        if ($scope.getType($scope.offer) === 'Category') {
            var data = {
                "category" : $scope.offer.category,
                "start" : {
                    "day" : dia,
                    "month" : mes,
                    "year" : año
                },
                "end" : {
                    "day" : dia1,
                    "month" : mes1,
                    "year" : año1
                },
                "discount" : $scope.offer.discount
            }
            OfferService.newCategoryOffer(data).then($scope.callbackNewOffer, $scope.errorHandlerNewOffer);
        }
    };

    $scope.callbackAllOffers = function (response) {
        console.log(response);
        $scope.offers = response.data;
        spinnerService.hide('generalSpinner');
    };

    $scope.errorHandlerAllOffers = function (error) {
        console.log(error);
        spinnerService.hide('generalSpinner');
    };

    $scope.allOffers = function () {
        spinnerService.show('generalSpinner');
        OfferService.getAllOffers().then($scope.callbackAllOffers , $scope.errorHandlerAllOffers);
    }

    $scope.getAllCategories();
    $scope.allOffers();

});
