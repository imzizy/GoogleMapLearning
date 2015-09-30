/**
 * Created by Zizy on 9/29/15.
 */

'use strict'


angular.module('myAppControllers', [])


    .controller('mainController', ['$scope', '$http','$timeout',
        function ($scope, $http,$timeout) {
            $http.get("./../app/res/query0827.json").success(function (data) {
                $scope.data = data;

            });


            var infoWindow, markers, map = null;
            var autocomplete, strStartPlace, strEndPlace, directionsDisplay, directionsService;

            var arrMarkers = [];
            function initMap() {

                directionsDisplay = new google.maps.DirectionsRenderer;
                directionsService = new google.maps.DirectionsService;


                var uluru = {lat: 23.694307, lng: 120.52561};
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 7,
                    center: uluru
                });
                createMarker(map);


                directionsDisplay.setMap(map);
                directionsDisplay.setPanel(document.getElementById('route-panel'));


                var startPlace = document.getElementById('startPlace');
                autocomplete = new google.maps.places.Autocomplete(startPlace);
                autocomplete.bindTo('bounds', map);


                autocomplete.addListener('place_changed', function () {
                    console.log("here!");
                    strStartPlace = autocomplete.getPlace().formatted_address;
                    console.log(strStartPlace + ', ' + strEndPlace);


                });

            }
            $timeout(function(){
                directionsDisplay = new google.maps.DirectionsRenderer;
                directionsService = new google.maps.DirectionsService;


                var uluru = {lat: 23.694307, lng: 120.52561};
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 7,
                    center: uluru
                });
                createMarker(map);


                directionsDisplay.setMap(map);
                directionsDisplay.setPanel(document.getElementById('route-panel'));


                var startPlace = document.getElementById('startPlace');
                autocomplete = new google.maps.places.Autocomplete(startPlace);
                autocomplete.bindTo('bounds', map);


                autocomplete.addListener('place_changed', function () {
                    console.log("here!");
                    strStartPlace = autocomplete.getPlace().formatted_address;
                    console.log(strStartPlace + ', ' + strEndPlace);


                });




            },100);
            function btnSearchClick() {
                var keyWords = $("#txtSearch").val();

                getData(function (json1) {
                    var findOneAtLeast = false;
                    $.each(json1.results.bindings, function (key, data) {

                        if (data.number.value - parseInt(keyWords) == 0) {
                            findOneAtLeast = true;

                            delAllMarkers();

                            var latLng = new google.maps.LatLng(data.lai.value, data.long.value);
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: map,
                                title: data.place.value
                            });
                            arrMarkers.push(marker);

                            var contentString = '<div id="content">' +
                                '<div id="siteNotice">' +
                                '</div>' +
                                '<h1 id="firstHeading" class="firstHeading">' + data.place.value + '</p>' +
                                '</h1>' +
                                '<div id="bodyContent">' +
                                '<p><b>Address:' + data.adress.value + '</p>' +
                                '<p><b>Police:' + data.police.value + '</p>' +
                                '<p><b>Phone:' + data.phone.value + '</p>' +
                                '<p><b>Range:' + data.range.value + '</p>' +
                                '<p><b>Pay:' + data.pay.value + '</p>' +
                                '</div>' + '<button id="btnGoThere" onclick="btnGoThereClick(???)" class="btn btn-success center-block" data-toggle="modal" data-target="#myModal">去这里</button>' +
                                '</div>';


                            // 是否有更好的实现。。
                            contentString = contentString.replace("???", "'" + data.lai.value + "," + data.long.value + "'");

                            marker.addListener('click', function () {
                                if (infoWindow != null) {
                                    infoWindow.close();
                                }
                                infoWindow = new google.maps.InfoWindow({
                                    content: contentString
                                });


                                infoWindow.open(map, marker);

                            });

                        }


                    });

                    if (!findOneAtLeast) {
                        createMarker(map);
                    }
                });
            }

            function getData(callback) {
                if (markers == null) {
                    $.getJSON('../res/query0827.json', function (json1) {
                        markers = json1;
                        callback(json1);
                    })
                } else {
//                return markers;
                    callback(markers);
                }

            }

            function btnGoThereClick(endPlace) {

                infoWindow.close();
                strEndPlace = endPlace;

                delAllMarkers();

            }

            function btnStartDisplayRoute() {
                calculateAndDisplayRoute(directionsService, directionsDisplay);

                if ($("#right-panel").css("left") != "0px") {
                    $("#right-panel").animate({left: "0px"});

                }

            }

            function btnCloseRoute() {
                if ($("#right-panel").css("left") == "0px") {
                    $("#right-panel").animate({left: "-1000px"});

                }

                directionsDisplay.setMap(null);
                $("#route-panel").empty();

                initMap();
            }

            function delAllMarkers() {
                for (var key in arrMarkers) {
                    arrMarkers  [key].setMap(null);
                }
                arrMarkers = [];
            }


            function createMarker(map) {
                delAllMarkers();

                getData(function (json1) {
                    $.each(json1.results.bindings, function (key, data) {
                        var latLng = new google.maps.LatLng(data.lai.value, data.long.value);
                        // Creating a marker and putting it on the map
                        var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: data.place.value
                        });
                        arrMarkers.push(marker);

                        var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h1 id="firstHeading" class="firstHeading">' + data.place.value + '</p>' +
                            '</h1>' +
                            '<div id="bodyContent">' +
                            '<p><b>Address:' + data.adress.value + '</p>' +
                            '<p><b>Police:' + data.police.value + '</p>' +
                            '<p><b>Phone:' + data.phone.value + '</p>' +
                            '<p><b>Range:' + data.range.value + '</p>' +
                            '<p><b>Pay:' + data.pay.value + '</p>' +
                            '</div>' + '<button id="btnGoThere" onclick="btnGoThereClick(???)" class="btn btn-success center-block" data-toggle="modal" data-target="#myModal">去这里</button>' +
                            '</div>';


                        // 是否有更好的实现。。
                        contentString = contentString.replace("???", "'" + data.lai.value + "," + data.long.value + "'");

                        marker.addListener('click', function () {
                            if (infoWindow != null) {
                                infoWindow.close();
                            }
                            infoWindow = new google.maps.InfoWindow({
                                content: contentString
                            });


                            infoWindow.open(map, marker);

                        });
                    });
                });
            }

            function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//            var start = document.getElementById('start').value;
//            var end = document.getElementById('end').value;
                directionsService.route({
                    origin: strStartPlace,
                    destination: strEndPlace,
                    travelMode: google.maps.TravelMode.DRIVING
                }, function (response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        map.setCenter(new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng() + 10));
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }
        }]);



