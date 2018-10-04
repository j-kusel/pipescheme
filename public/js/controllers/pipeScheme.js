

angular.module('pipeScheme')
    .controller('PipeController', ['$rootScope', '$scope', '$http', 'AccidentService', 'PhotoService', 'GeoService', function($rootScope, $scope, $http, AccidentService, PhotoService, GeoService) {

        
        $scope.$on('accident.update', function (event) {
            AccidentService.API
                .query($scope.query)
                .$promise
                .then(function (data) {
                    if (data.length) {
                        $scope.data = {};
                        data.forEach(function (element) {
                            $scope.data[element._id] = element;
                        });
                        $scope.focus = data[0]._id;
                        $rootScope.$broadcast('map.update', $scope.data);
                    }
                });
        });

        $scope.updateView = AccidentService.update;

        var init = function() {
            $scope.show = true;
            $scope.state = 'TX';
            $scope.fatal = false;
            $scope.year = 'all';
            $scope.focus = '';
            $scope.scrollbar = new PerfectScrollbar('#narrative', {
                scrollYMarginOffset: 5
            });

            $scope.tabs = {
                gallery: false,
                provider: true
            };

            $scope.query = {
                state: $scope.state,
                fatal: $scope.fatal,
                year: $scope.year
            };

            var focusUpdate = function () {
                $scope.scrollbar.update();
                PhotoService.API
                    .query({
                        location: $scope.focus
                    })
                    .$promise
                        .then(function (photos) {
                            console.log(JSON.stringify(photos));
                            $rootScope.$broadcast('gallery.update', photos);
                            $rootScope.$broadcast('lightbox.update', photos);
                        });
            }

            $scope.$on('focus.update', focusUpdate);
            $scope.$watch(function(scope) { return scope.focus; }, focusUpdate);

            AccidentService.update();

            GeoService.getGeolocation().then(function (position) {
                GeoService.convertGeolocation(position.coords).then(
                    function (data) {
                        console.log(data);
                        var state;
                        data.results[0].address_components.forEach((comp) => {
                            if (comp.types.includes('administrative_area_level_1')) state = comp.short_name;
                        });
                        $scope.query.state = $scope.state = state;
                        console.log($scope.query.state);
                        console.log($scope.state);
                        AccidentService.update();
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }, function (err) {
                console.log(err);
            });
                    
        };

        $scope.modalShow = false;

        $scope.toggleModal = function (formtype, args) {
            $scope.formtype = formtype;
            $scope.modalArgs = args;
            $scope.modalShow = !$scope.modalShow; 
        };

        $scope.tabFocus = function (tabSelect) {
            for (var tab in $scope.tabs) $scope.tabs[tab] = false;
            $scope.tabs[tabSelect] = true;
        }

        $scope.photoUpload = function () {
            console.log('does the function work?');
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

