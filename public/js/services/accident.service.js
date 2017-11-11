angular.module('pipeScheme')
    .factory('AccidentService', ['$rootScope', '$resource', function($rootScope, $resource) {
        var service = {
            API: $resource('http://pipescheme.com/api/accidents/:state', {
                state: "@state",
                fatal: "@fatal"
            }),
            update: function () {
                $rootScope.$broadcast('accident.update');
            }
        };

        return service;
    }]);
