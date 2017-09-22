angular.module('pipeScheme')
    .directive('psLightbox', function () {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: "../../templates/lightbox.html"
        };
    });
