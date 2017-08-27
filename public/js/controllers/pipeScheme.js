

angular.module('pipeScheme')
    .controller('PipeController', ['$scope', '$http', function($scope, $http) {
        
        var init = function(api) {
            $scope.map = L.map('map', {center: [35,-106], zoom: 10});
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo($scope.map);        

            $scope.currentAccident = api.data[0]._id;
            $scope.data[$scope.currentAccident] = api.data[0];
            api.data.forEach(function (element) {
                $scope.data[element._id] = element;
                $scope.markers[element._id] = L
                    .marker([element.LOCATION_LATITUDE, element.LOCATION_LONGITUDE], {id: element._id})
                    .addTo($scope.map)
                    .on('click', markerClick);
            });    
            $scope.info = $scope.data[$scope.currentAccident].NARRATIVE;
            $scope.focus = focusLoader($scope.currentAccident);
        };

        var apiRequest = function () {
            $http.get('api/accidents/10/0')
                .then(function (data) {
                    init(data);
                });
        };

        var markerClick = function(e) {
            $scope.currentAccident = this.options.id;
            console.log($scope.currentAccident);
            $scope.focus = $scope.data[$scope.currentAccident].LOCATION_STATE_ABBREVIATION; //focusLoader(this.options.id);
        };

        var focusLoader = function(id) {
            var accident = $scope.data[id];
            var focus = {
                narrative: accident.NARRATIVE,
                address: accident.LOCATION_STREET_ADDRESS,
                city: accident.LOCATION_CITY_NAME,
                county: accident.COUNTY_NAME,
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
        $scope.data = {};
        $scope.focus = {};
        $scope.markers = {};
        $scope.info = 'meh';

        apiRequest();
}]);

