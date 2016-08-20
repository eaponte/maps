/* Map tiles by http://openlayers.org/ */

var lon = -74.0059;
var lat = 40.7128;
var zoomLevel = 3;

drawMap(); // Load generic map with the above longitude, latitude, and zoom level

/* If browser supports geolocation,
   ask for location sharing,
   otherwise notify that geolocation is not supported and load generic map */

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(foundPosition, errorHandler);
} else {
	document.getElementById("notifications").innerHTML = "Geolocation not supported by this browser...a map will load shortly.";
	setTimeout(drawMap, 2000);
}

/* If location is found, get longitude - latitude - zoom level, and load drawMap function */

function foundPosition(position) {
	lon = position.coords.longitude;
	lat = position.coords.latitude;
	zoomLevel = 12;
	document.getElementById("map-area").innerHTML = "";
	document.getElementById("notifications").innerHTML = "Loading map...";
	setTimeout(drawMap, 2000);
}

/* If no location found, display an error message and load generic map */

function errorHandler(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			document.getElementById("map-area").innerHTML = "";
			document.getElementById("notifications").innerHTML = "PERMISSION_DENIED_TO_SHARE_LOCATION...Loading map...";
			setTimeout(drawMap, 2000);
			break;
		case error.POSITION_UNAVAILABLE:
			document.getElementById("map-area").innerHTML = "";
			document.getElementById("notifications").innerHTML = "POSITION_UNAVAILABLE...Loading map...";
			setTimeout(drawMap, 2000);
			break;
		case error.TIMEOUT:
			document.getElementById("map-area").innerHTML = "";
			document.getElementById("notifications").innerHTML = "TIMEOUT_ERROR...Loading map...";
			setTimeout(drawMap, 2000);
			break;
		case error.UNKNOWN_ERROR:
			document.getElementById("map-area").innerHTML = "";
			document.getElementById("notifications").innerHTML = "UNKNOWN_ERROR...Loading map...";
			setTimeout(drawMap, 2000);
			break;
		default:
			document.getElementById("map-area").innerHTML = "";
			document.getElementById("notifications").innerHTML = "NO_LOCATION_FOUND...Loading map...";
			setTimeout(drawMap, 2000);
			break;
	}
}

/* Function to draw the map */

function drawMap() {
	document.getElementById("map-area").innerHTML = "";
	var map = new ol.Map({
		target: "map-area",
		layers: [
			// Generic tile loading
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
						// 	html: 'Enter new attribution here.'
						// })
					]
				})
			})
		],
		view: new ol.View({
			center: ol.proj.fromLonLat([ lon, lat ]),
			zoom: zoomLevel
		})

	});
	document.getElementById("notifications").innerHTML = "";
	document.getElementById("map-area").style.backgroundImage = "none";
}