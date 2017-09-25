angular.module('pipeScheme')
    .factory('PhotoService', ['$resource', function ($resource) {
        var service = {
            API: $resource('http://localhost:3000/api/photos', {
                location: "@location",
                owner: "@owner"
            })
        };

        return service;
    }]);
