angular.module('pipeScheme')
    .directive('psLightbox', function () {
        return {
            restrict: 'E',
            scope: {
                args: '='
            },
            link: link,
            templateUrl: "../../templates/lightbox.html"
        };

        function link (scope, element, attrs) {
            scope.advance = function () {
                if (scope.args['photoIndex'] < scope.args['photos'].length - 1) {
                    scope.args['photoIndex']++;
                } else {
                    scope.args['photoIndex'] = 0;
                };
                console.log('click works: ' + scope.args['photoIndex']);

            }
        }

    });
