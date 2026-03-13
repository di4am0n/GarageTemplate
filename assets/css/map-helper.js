"use strict";

function gMap() {
    if (!$('.google-map').length || typeof GMaps === 'undefined') {
        return;
    }

    $('.google-map').each(function() {
        var mapName = $(this).attr('id');
        var mapLat = $(this).data('map-lat');
        var mapLng = $(this).data('map-lng');
        var iconPath = $(this).data('icon-path');
        var mapZoom = $(this).data('map-zoom') || 11;
        var mapTitle = $(this).data('map-title');

        var styles = [
            {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
            {"featureType":"landscape","elementType":"all","stylers":[{"color":"#000"}]},
            {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
            {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
            {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
            {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
            {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
            {"featureType":"water","elementType":"all","stylers":[{"color":"#f1f1f1"},{"visibility":"on"}]}
        ];

        var map = new GMaps({
            div: '#' + mapName,
            scrollwheel: false,
            lat: mapLat,
            lng: mapLng,
            styles: styles,
            zoom: mapZoom
        });

        if (iconPath) {
            map.addMarker({
                icon: iconPath,
                lat: mapLat,
                lng: mapLng,
                title: mapTitle
            });
        }
    });
}

jQuery(document).on('ready', function() {
    gMap();
});
