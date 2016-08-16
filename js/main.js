/* Map tiles by http://openlayers.org/ */

// var lat = parseFloat(geoplugin_latitude());
// var lon = parseFloat(geoplugin_longitude());

var map = new ol.Map({

	target: "map-area",
	layers: [
		// new ol.layer.Tile({
		// 	source: new ol.source.OSM()
		// }),
		new ol.layer.Tile({
			source: new ol.source.OSM({
				attributions: [
					new ol.Attribution({
						html: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.'
					}),
					// new ol.Attribution({
					// 	html: 'Geolocation by <a href="http://www.geoplugin.com/" target="_blank">geoPlugin</a>.'
					// })
				]
			})
		})
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([ -74.0059, 40.7128 ]),
		zoom: 12
	})

});