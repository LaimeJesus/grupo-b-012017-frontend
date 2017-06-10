mycontrollers.controller('DeliveryController', function($scope , UserService){

    $scope.userAddress = UserService.getAddress();
    $scope.validForm = false;
    $scope.myAddress = "";
    $scope.map = {};
    $scope.currentDistance = 0;
    $scope.limitDistance = 50.00;
    $scope.uluru = {lat: -34.767074, lng: -58.219502}; //Supermercado Dia - 138 y Av. 14 , Berazategui
    $scope.myMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: $scope.uluru
    });
    $scope.useMyAddress = false;

    $scope.supermarketMarker = new google.maps.Marker({
        position: $scope.uluru,
        map: $scope.myMap
    });

    $scope.userMarker = new google.maps.Marker({
        position: $scope.uluru,
        map: $scope.myMap
    });

    $scope.myAddressSelected = function () {
        return $scope.useMyAddress;
    }

    $scope.deliveryReady = function () {
        return $scope.validForm || $scope.useMyAddress;
    }

    $scope.searchAddress = function () {

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode(
            {'address': $scope.myAddress},

            function (results, status) {

                if (status === 'OK') {

                    $scope.myMap = new google.maps.Map(document.getElementById('map'), {
                        zoom: 15,
                        center: $scope.uluru
                    });
                    var resultsMap = $scope.myMap;

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

        $scope.currentDistance = (
            google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng($scope.supermarketMarker.position.lat(), $scope.supermarketMarker.position.lng()),
                new google.maps.LatLng($scope.userMarker.position.lat(), $scope.userMarker.position.lng())
            ) / 1000
        ).toFixed(2);

        if ($scope.currentDistance < $scope.limitDistance) {

            directionsService.route({
                    origin: $scope.supermarketMarker.position,
                    destination: $scope.userMarker.position,
                    travelMode: 'DRIVING'
                },

                function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {

                        $scope.validForm = true;

                        directionsDisplay = new google.maps.DirectionsRenderer;
                        directionsDisplay.setMap($scope.myMap);
                        directionsDisplay.setDirections(response);

                    } else {
                        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
                    }
                });

        } else {
            $scope.validForm = false;
        }

    };

    $scope.hacerAlgo = function () {

    };

});
