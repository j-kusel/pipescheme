angular.module('pipeScheme')
    .factory('PhotoService', ['$resource', function ($resource) {
        var service = {
            API: $resource('/api/photos', {
                _id: "@_id",
                location: "@location",
                owner: "@owner"
            })
        };

        return service;
    }]);
