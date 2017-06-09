mycontrollers.controller('DeliveryController', function($scope){

    $scope.myAddress = {};
    $scope.map = {};
    $scope.uluru = {lat: -34.767074, lng: -58.219502}; //Supermercado Dia - 138 y Av. 14 , Berazategui
    $scope.myMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: $scope.uluru
    });

    $scope.supermarketMarker = new google.maps.Marker({
        position: $scope.uluru,
        map: $scope.myMap
    });

    $scope.userMarker = new google.maps.Marker({
        position: $scope.uluru,
        map: $scope.myMap
    });

    $scope.searchAddress = function () {

        var geocoder = new google.maps.Geocoder();
        var resultsMap = $scope.myMap;

        geocoder.geocode(
            {'address': $scope.myAddress},

            function (results, status) {

                if (status === 'OK') {
                    resultsMap.setCenter(results[0].geometry.location);

                    $scope.userMarker.setMap(null);

                    $scope.userMarker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location
                    });

                    $scope.generateRoute();

                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            }
        );
    };

    $scope.generateRoute = function () {

        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;

        directionsDisplay.setMap($scope.myMap);

        directionsService.route( {
                origin: $scope.supermarketMarker.position,
                destination: $scope.userMarker.position,
                travelMode: 'DRIVING'
            },

            function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    console.log("Estoy entrando al OK");

                    directionsDisplay.setDirections(response);
                } else {
                    alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
                }
        });

    };

});
