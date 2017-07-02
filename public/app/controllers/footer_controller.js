mycontrollers.controller('FooterController', function ($scope, ProductService, UserService, RecommendationService, spinnerService, AlertService) {



    $scope.callbackRecommendation = function(data) {
        console.log(data.data);
    };

    $scope.errorHandlerRecommendation = function(error) {
        console.log(error);
    };

    $scope.setRecommendation = function() {
        RecommendationService.getRecommendation(UserService.getLastProduct()).then($scope.callbackRecommendation, $scope.errorHandlerRecommendation);
    };

    $scope.setRecommendation();

});