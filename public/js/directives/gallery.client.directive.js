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
            scope.$on('gallery.update', function (event, photos) {
                console.log('gallery updated');
                console.log(photos);
                scope.photos = photos;
            });

            scope.test = function () {
                console.log('test works');
            }
        }
    });



