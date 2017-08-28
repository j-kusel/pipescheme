

angular.module('pipeScheme')
    .controller('PipeController', ['$scope', '$http', 'AccidentService', function($scope, $http, AccidentService) {
        
        var init = function(data) {
            $scope.data = {};
            $scope.focus = {};
            $scope.markers = {};
            $scope.info = 'meh';

            $scope.map = L.map('map', {center: [35,-106], zoom: 10});
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo($scope.map);        

            $scope.currentAccident = data[0]._id;
            $scope.data[$scope.currentAccident] = data[0];
            data.forEach(function (element) {
                $scope.data[element._id] = element;
                $scope.markers[element._id] = L
                    .marker([element.LOCATION_LATITUDE, element.LOCATION_LONGITUDE], {id: element._id})
                    .addTo($scope.map)
                    .on('click', markerClick);
            });    
            $scope.info = $scope.data[$scope.currentAccident].NARRATIVE;
            $scope.focus = focusLoader($scope.currentAccident);
        };

        var apiRequest = function (state) {
            AccidentService.query({state:"WI"})
                .$promise
                    .then(function (data) {
                        init(data)
                    });
        };

        var markerClick = function(e) {
            console.log('made it to the click callback');
            $scope.currentAccident = this.options.id;
            console.log($scope.currentAccident);
            $scope.focus = focusLoader(this.options.id);
            $scope.$apply(function () {
                console.log('timeout called');
            });
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
                datetime: accident.INCIDENT_IDENTIFIED_DATETIME
            };
            return focus;
        };

        apiRequest();
}]);

