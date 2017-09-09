angular.module('pipeScheme')
    .directive('psSignin', function () {
        return {
            restrict: 'E',
            scope: {
                flashmsg: '=',
                show: '=',
            },
            link: function(scope, element, attrs) {
                scope.hideModal = function() {
                    scope.show = false;
                };
            },
            templateUrl: '../../templates/modalSignin.html'
        };
    });
