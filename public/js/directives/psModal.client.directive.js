angular.module('pipeScheme')
    .directive('psModal', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                flashmsg: '=',
                show: '=',
                formtype: '='
            },
            link: function(scope, element, attrs) {
                scope.hideModal = function() {
                    scope.show = false;
                };
            },
            templateUrl: '../../templates/psModal.html'
        };
    });
