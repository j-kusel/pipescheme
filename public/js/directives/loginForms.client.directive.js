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
    .directive('psAccount', ['PhotoService', function (PhotoService) {
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

                scope.deletePhoto = function (id) {
                    PhotoService.API.delete({_id: id})
                        .$promise
                        .then(() => {console.log(Date.now());});
                }
            },
            templateUrl: "../../templates/account.html"
        };
    }]);


