myservices.factory('RecommendationService', ['$http','urlbase', function($http, urlbase) {


    var RecommendationAPI = {};


    RecommendationAPI.getRecommendation = function(productId) {
      return $http({
        method: 'GET',
        url: urlbase + 'recommendations/' + productId,
        headers: {
          "Accept": "application/json;odata=verbose",
          'Content-Type': 'application/json'
        }
      });
    };


    return RecommendationAPI;

}]);