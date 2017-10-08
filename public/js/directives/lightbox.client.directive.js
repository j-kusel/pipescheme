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
            scope.advance = function (direction) {
                var newIndex = scope.args['photoIndex'] + direction;
                if (newIndex < 0) {
                    scope.args['photoIndex'] = scope.args['photos'].length - 1;
                } else if (newIndex > scope.args['photos'].length - 1) {
                    scope.args['photoIndex'] = 0;
                } else {
                    scope.args['photoIndex'] = newIndex;
                }

            }
        }

    });
