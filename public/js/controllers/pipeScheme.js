

angular.module('pipeScheme')
    .controller('PipeController', ['$scope', '$http', 'AccidentService', function($scope, $http, AccidentService) {
        
        $scope.changeState = function (state) {
            apiRequest(state).then(repopulate);
        };

        var repopulate = function(data) {
            var markers = []
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
            $scope.markers.clearLayers();
            $scope.markers = L
                .layerGroup(markers)
                .addTo($scope.map);
            $scope.focus = focusLoader($scope.currentAccident);
        };


        var init = function(data) {
            $scope.data = {};
            $scope.state = 'TX';
            $scope.focus = {};
            $scope.markers = L.layerGroup();

            $scope.map = L.map('map', {center: [35,-106], zoom: 10});
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo($scope.map);        
            repopulate(data);
        };

        var apiRequest = function (state) {
            return AccidentService.query({state:state}).$promise;
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
        $scope.states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
        apiRequest("TX").then(function (data) {init(data);});
}]);

