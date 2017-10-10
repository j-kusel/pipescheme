angular.module('pipeScheme')
    .directive('psLeaflet', function () {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                focus: '='
            },
            link: link,
            template: '<div id="map" style="width: 100%; height: 320px; z-index: 1"></div>'
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
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(scope.map)
            L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
            }).addTo(scope.map);

            var OrangeIcon = L.Icon.extend({
                options: {
                    iconAnchor: [12, 40]
                }
            })

            var orangeIcon = new OrangeIcon({iconUrl: 'assets/marker.png'});
            

            var unregisterFn = scope.$on('map.update', function (event, data) {
                var markers = [];
                var focus;
                scope.markers
                    .off()
                    .clearLayers();
                var first;
                for (var key in data) {
                    let element = data[key];
                    if (!first) first = [element.LOCATION_LATITUDE, element.LOCATION_LONGITUDE];
                    var marker = L
                        .marker([element.LOCATION_LATITUDE,
                            element.LOCATION_LONGITUDE], {
                                id: key,
                                icon: orangeIcon
                            })
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

            scope.$on('$destroy', function () {
                scope.markers.off();
                unregisterFn;
            });
        }
    });



