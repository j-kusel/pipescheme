angular.module('pipeScheme')
    .directive('psLeaflet', function () {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                focus: '='
            },
            link: link,
            template: '<div id="map" style="width: 100%; height: 350px; z-index: 1"></div>'
        };

        function link (scope, element, attrs) {
            scope.markers = L.layerGroup();
            
            scope.map = L.map('map', {
                center: [35,-106],
                zoom: 10,
                scrollWheelZoom: false,
                zoomControl: false
            });

            L.control.zoom({position: 'bottomleft'}).addTo(scope.map);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(scope.map);

            scope.$on('map.update', function (event, data) {
                var markers = [];
                var focus;
                scope.markers.clearLayers();
                var first;
                for (var key in data) {
                    let element = data[key];
                    if (!first) first = [element.LOCATION_LATITUDE, element.LOCATION_LONGITUDE];
                    var marker = L
                        .marker([element.LOCATION_LATITUDE,
                            element.LOCATION_LONGITUDE],
                            {id: key})
                        .on('click', function () {
                            let self = this;
                            scope.$apply(function () {
                                scope.focus = self.options.id;                
                            });
                            let accident = data[self.options.id];
        
                            scope.map.flyTo(new L.LatLng(
                                    accident.LOCATION_LATITUDE,
                                    accident.LOCATION_LONGITUDE
                                ), 9, {
                                    animate: true,
                                    duration: .7,
                                    easeLinearity: .9
                                }
                            );
    
                        });
                    markers.push(marker);
                };
                scope.markers = L
                    .layerGroup(markers)
                    .addTo(scope.map);
        
                scope.map.flyTo(new L.LatLng(
                        first[0],
                        first[1],
                    ), 9, {
                        animate: true,
                        duration: .7,
                        easeLinearity: .9
                    }
                );
        
            });
        }
    });



