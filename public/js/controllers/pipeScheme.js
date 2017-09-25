

angular.module('pipeScheme')
    .controller('PipeController', ['$rootScope', '$scope', '$http', 'AccidentService', 'PhotoService', 'GeoService', function($rootScope, $scope, $http, AccidentService, PhotoService, GeoService) {

        
        $scope.$on('accident.update', function (event) {
            AccidentService.API
                .query($scope.query)
                .$promise
                .then(function (data) {
                    $scope.data = {};
                    data.forEach(function (element) {
                        $scope.data[element._id] = element;
                    });
                    $scope.focus = data[0]._id;
                    $rootScope.$broadcast('map.update', $scope.data);
                });
        });

        $scope.updateView = AccidentService.update;

        var init = function() {
            $scope.show = true;
            $scope.state = 'TX';
            $scope.fatal = false;
            $scope.year = 'all';
            $scope.focus = '';

            $scope.query = {
                state: $scope.state,
                fatal: $scope.fatal,
                year: $scope.year
            };

            $scope.$watch(function(scope) { return scope.focus; },
                function () {
                    PhotoService.API
                        .query({
                            location: $scope.focus
                        })
                        .$promise
                            .then(function (photos) {
                                $scope.photos = photos;
                            });
                }
            );

            AccidentService.update();

            /*
            GeoService.getGeolocation().then(function (position) {
                $scope.map.flyTo(new L.LatLng(position.coords.latitude, position.coords.longitude), 6, {
                    animate: true,
                    duration: .7,
                    easeLinearity: .9
                });
                GeoService.convertGeolocation(position.coords).then(
                    function (data) {
                        console.log('google:' + data.results);
                        $scope.query.state = $scope.state = data.results[0].address_components[5].short_name;
                        $scope.updateView();
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }, function (err) {
                console.log(err);
            });
            */
                    
        };

        $scope.modalShow = false;

        $scope.toggleModal = function (formtype, args) {
            $scope.formtype = formtype;
            $scope.modalArgs = args;
            $scope.modalShow = !$scope.modalShow;
        };

        $scope.photoUpload = function () {
            if (!$scope.user.firstName) {
                $scope.flashmsg = "login before uploading a photo!";
                $scope.toggleModal('signin');
            } else {
                document.getElementById('fileBrowse').click();
            }
        }

        $scope.states = config.states;
        $scope.years = config.years;

        init();
}]);

