

angular.module('pipeScheme')
    .controller('PipeController', ['$scope', '$http', 'AccidentService', 'GeoService', function($scope, $http, AccidentService, GeoService) {
        
        $scope.changeState = function (state) {
            apiRequest(state).then(repopulate);
        };

        var repopulate = function(data) {
            var markers = [];
            $scope.markers.clearLayers();           
            if (data.length) {
                $scope.currentAccident = data[0]._id;
                $scope.data[$scope.currentAccident] = data[0];
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
                $scope.focus = focusLoader($scope.currentAccident);
            };
        };

        var init = function(data) {
            $scope.data = {};
            $scope.state = 'TX';
            $scope.selected = 'TX';
            $scope.fatal = false;
            $scope.focus = {};
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
                        $scope.selected = data.results[0].address_components[5].short_name;
                        apiRequest($scope.selected).then(repopulate);
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

        var apiRequest = function (state) {
            var query = {state: state}; 
            if ($scope.fatal) query.fatal = true;
            return AccidentService.query(query).$promise;
        };

        var markerClick = function(e) {
            $scope.currentAccident = this.options.id;
            $scope.focus = focusLoader(this.options.id);
            $scope.$apply();
        };

        var focusLoader = function(id) {
            var accident = $scope.data[id];
            var focus = {
                narrative: accident.NARRATIVE,
                address: accident.LOCATION_STREET_ADDRESS,
                city: accident.LOCATION_CITY_NAME,
                county: accident.LOCATION_COUNTY_NAME,
                state: accident.LOCATION_STATE_ABBREVIATION,
                zip: accident.LOCATION_POSTAL_CODE,
                fatal: accident.FATALITY_IND,
                fatalities: accident.FATAL,
                injure: accident.INJURY_IND,
                injuries: accident.INJURE,
                datetime: accident.INCIDENT_IDENTIFIED_DATETIME,
                report: accident.REPORT_NUMBER
            };
            $scope.map.flyTo(new L.LatLng(accident.LOCATION_LATITUDE, accident.LOCATION_LONGITUDE), 9, {
                animate: true,
                duration: .7,
                easeLinearity: .9
            });
            return focus;
        };
        $scope.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
        apiRequest("TX").then(function (data) {init(data);});
}]);

