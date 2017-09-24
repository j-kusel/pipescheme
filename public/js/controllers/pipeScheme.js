

angular.module('pipeScheme')
    .controller('PipeController', ['$scope', '$http', 'AccidentService', 'PhotoService', 'GeoService', function($scope, $http, AccidentService, PhotoService, GeoService) {
        
        $scope.$on('accident.update', function (event) {
            AccidentService.API
                .query($scope.query)
                .$promise
                .then(repopulate);
        });

        $scope.updateView = AccidentService.update;

        var repopulate = function(data) {
            console.log('repopulate:' + data);
            var markers = [];
            $scope.markers.clearLayers();           
            if (data.length) {
                $scope.focus = data[0];
                $scope.data[$scope.focus._id] = data[0];
                data.forEach(function (element) {
                    $scope.data[element._id] = element;
                    var marker = L
                        .marker([element.LOCATION_LATITUDE,
                            element.LOCATION_LONGITUDE],
                            {id: element._id})
                        .on('click', markerClick);
                    markers.push(marker);
                });
                $scope.markers = L
                    .layerGroup(markers)
                    .addTo($scope.map);
            };

            $scope.map.flyTo(new L.LatLng(
                    $scope.focus.LOCATION_LATITUDE,
                    $scope.focus.LOCATION_LONGITUDE
                ), 9, {
                    animate: true,
                    duration: .7,
                    easeLinearity: .9
                }
            );

        };

        var init = function(data) {
            $scope.show = true;
            $scope.data = {};
            $scope.state = 'TX';
            $scope.fatal = false;
            $scope.year = 'all';
            $scope.focus = {};
            $scope.query = {
                state: $scope.state,
                fatal: $scope.fatal,
                year: 'all'
            };

            $scope.markers = L.layerGroup();

            $scope.map = L.map('map', {
                center: [35,-106],
                zoom: 10,
                scrollWheelZoom: false,
                zoomControl: false
            });

            L.control.zoom({position: 'bottomleft'}).addTo($scope.map);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo($scope.map);
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
                    
            repopulate(data);
        };

        var photoRequest = function (accident) {
            var query = {location: accident};
            return PhotoService.query(query).$promise;
        }

        var markerClick = function(e) {
            $scope.focus = $scope.data[this.options.id];

            $scope.map.flyTo(new L.LatLng(
                    $scope.focus.LOCATION_LATITUDE,
                    $scope.focus.LOCATION_LONGITUDE
                ), 9, {
                    animate: true,
                    duration: .7,
                    easeLinearity: .9
                }
            );

            photoRequest($scope.focus._id)
                .then(function (photos) {
                    $scope.photos = photos;
                });
            $scope.$apply();
        };

        var focusLoader = function(id) {
            var accident = $scope.data[id];

            return accident;
        };

        $scope.modalShow = false;

        $scope.toggleModal = function (formtype) {
            $scope.formtype = formtype;
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
        $scope.photoFocus = function (photoIndex) {
            $scope.photoIndex = photoIndex;
            $scope.formtype = 'lightbox';
            $scope.modalShow = !$scope.modalShow;
        }


        $scope.query = {};
        $scope.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
        $scope.years = ['all','2011','2012','2013','2014','2015','2016','2017'];
        $scope.state = 'TX';
        AccidentService.API.query({state: $scope.state}).$promise.then(function (data) {
            console.log('init data: ' + data);
            init(data);
        });
}]);

