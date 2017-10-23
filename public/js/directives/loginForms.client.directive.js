angular.module('pipeScheme')
    .directive('psSignin', function () {
        return {
            restrict: 'E',
            scope: {
                flashmsg: '=',
                formtype: '@'
            },
            templateUrl: "../../templates/signinForm.html"
        };
    })
    .directive('psSignup', function () {
        return {
            restrict: 'E',
            scope: {
                flashmsg: '=',
                formtype: '@'
            },
            templateUrl: "../../templates/signupForm.html"
        };
    })
    .directive('psAccount', ['PhotoService', '$rootScope', function (PhotoService, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                flashmsg: '=',
                formtype: '@',
                user: '='
            },
            link: function (scope, element, attrs) {
                if (scope.user) {
                    PhotoService.API.query({owner: scope.user._id})
                        .$promise
                        .then((photos) => {scope.photos = photos;});
                }

                scope.deletePhoto = function (id, index) {
                    PhotoService.API.delete({_id: id})
                        .$promise
                        .then(() => {
                            scope.photos.splice(index, 1);
                            $rootScope.$broadcast('focus.update')
                        });
                }


            },
            templateUrl: "../../templates/account.html"
        };
    }]);


