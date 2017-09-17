angular.module('pipeScheme')
    .factory('PhotoService', ['$resource', function ($resource) {
        return $resource('http://localhost:3000/api/photos', {
            location: "@location",
            owner: "@owner"
        });
    }]);
