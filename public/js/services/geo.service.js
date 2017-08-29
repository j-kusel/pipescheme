angular.module('pipeScheme')
    .factory('GeoService', ['$q', '$window', '$resource', function ($q, $window, $resource) {

        function getGeolocation() {
            var qPromise = $q.defer();
            var location = $window.navigator.geolocation;

            if (!location) {
                qPromise.reject('Geolocation request refused.');
            } else {
                location.getCurrentPosition(
                    (position) => { qPromise.resolve(position); },
                    (err) => { qPromise.reject(err); }
                );
            };

            return qPromise.promise;
        }

        function convertGeolocation(coords) {
            var rPromise = $resource('https://maps.googleapis.com/maps/api/geocode/json', {
                latlng: "@latlng",
                key: "@key"
            });
            var apiKey = require( // LOCAL API KEY HERE );
            var latlng = coords[0].toString() + ',' + coords[1].toString();
            return rPromise.query({latlng:latlng, key: apiKey}).$promise;
        }

        return { 
            getGeolocation: getGeolocation
            convertGeolocation: convertGeolocation
        };
    }]);
