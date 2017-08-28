angular.module('pipeScheme')
    .factory('AccidentService', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/accidents/:state',
            { state: "@state" });
    }]);
