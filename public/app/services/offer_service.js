myservices.factory('OfferService', ['$http','urlbase', function($http, urlbase) {
    var OfferServiceAPI = {};

    OfferServiceAPI.getAllCategories = function() {
        return $http({
            method: 'GET',
            url: urlbase + 'offer/categories'
        })
    };

    OfferServiceAPI.newCategoryOffer = function(data) {
        return $http({
            method: 'POST',
            data: data,
            url: urlbase + 'offers/category'
        })
    };

    OfferServiceAPI.getAllOffers = function() {
        return $http({
            method: 'GET',
            url: urlbase + 'offers/'
        })
    };

    return OfferServiceAPI;

}]);
