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
            var rPromise = $resource('/api/geo', {
                latlng: "@latlng"
            });
            var latlng = coords.latitude.toString() + ',' + coords.longitude.toString();
            return rPromise.get({latlng:latlng}).$promise;
        }

        return { 
            getGeolocation: getGeolocation,
            convertGeolocation: convertGeolocation
        };
    }]);
