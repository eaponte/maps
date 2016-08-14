/* Map tiles by http://openlayers.org/ */

var map = new ol.Map({

	target: "map-area",
	layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([-73.93, 40.73]),
		zoom: 12
	})

});