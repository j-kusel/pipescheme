angular.module('pipeScheme')
    .directive('psGallery', function () {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                focus: '@',
//                test: '&',
                lightbox: '&',
                uploadAuth: '&upload'
            },
            link: link,
            templateUrl: "../../templates/gallery.html"
        }

        function link (scope, element, attrs) {
            console.log(scope.uploadAuth);
            if (window.PerfectScrollbar) {
                scope.ps = new PerfectScrollbar('#gallery', {});
            }
            scope.$on('gallery.update', function (event, photos) {
                scope.photos = photos;
                if (scope.ps) scope.ps.update();
            });

            scope.test = function () {
                console.log('test works');
            }
        }
    });



