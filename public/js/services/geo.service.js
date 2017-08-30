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
            var apiKey = 'AIzaSyBj1SDb6bveF-hp9gFJMDrMVPsJdX_DiUg';
            var latlng = coords.latitude.toString() + ',' + coords.longitude.toString();
            console.log('coords: ' + latlng);
            return rPromise.get({latlng:latlng, key: apiKey}).$promise;
        }

        return { 
            getGeolocation: getGeolocation,
            convertGeolocation: convertGeolocation
        };
    }]);
