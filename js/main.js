/* Map tiles by http://openlayers.org/ */

// Initial variables

	var lon = -74.0059;
	var lat = 40.7128;
	var zoomLevel = 3;
	var query;

// Load generic map with the above longitude, latitude, and zoom level

	drawMap();

// Geolocation feature

	/* Wait for a click on the geolocation button to initiate geolocation */

		document.getElementById("locate-me-btn").addEventListener("click", locateMe);

	/* If browser supports geolocation,
	   ask for location sharing,
	   otherwise notify that geolocation is not supported and load generic map */

		function locateMe() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(foundPosition, errorHandler);
			} else {
				hideMap();
				document.getElementById("notifications").innerHTML = "Geolocation not supported by this browser...a map will load shortly.";
				setTimeout(drawMap, 2000);
			}
		}

	/* If location is found, get longitude - latitude - zoom level, and load drawMap function */

		function foundPosition(position) {
			lon = position.coords.longitude;
			lat = position.coords.latitude;
			zoomLevel = 13;
			hideMap();
			document.getElementById("notifications").innerHTML = "Finding your location...";
			setTimeout(drawMap, 2000);
		}

	/* If no location found, display an error message and load generic map */

		function errorHandler(error) {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					hideMap();
					document.getElementById("notifications").innerHTML = "PERMISSION_DENIED_TO_SHARE_LOCATION...Loading map...";
					setTimeout(drawMap, 2000);
					break;
				case error.POSITION_UNAVAILABLE:
					hideMap();
					document.getElementById("notifications").innerHTML = "POSITION_UNAVAILABLE...Loading map...";
					setTimeout(drawMap, 2000);
					break;
				case error.TIMEOUT:
					hideMap();
					document.getElementById("notifications").innerHTML = "TIMEOUT_ERROR...Loading map...";
					setTimeout(drawMap, 2000);
					break;
				case error.UNKNOWN_ERROR:
					hideMap();
					document.getElementById("notifications").innerHTML = "UNKNOWN_ERROR...Loading map...";
					setTimeout(drawMap, 2000);
					break;
				default:
					hideMap();
					document.getElementById("notifications").innerHTML = "NO_LOCATION_FOUND...Loading map...";
					setTimeout(drawMap, 2000);
					break;
			}
		}

// Search feature

	document.getElementById("search-box").style.visibility = "hidden";
	document.getElementById("search-box").style.opacity = "0";

	/* Wait for a click on the 'open search box' button to toggle the search box view */

		document.getElementById("open-search-btn").addEventListener("click", toggleSearchBox);

	/* Function to toggle the search box view to open or close */

		function toggleSearchBox() {
			if (document.getElementById("search-box").style.visibility == "visible" || document.getElementById("search-box").style.visibility == "")
				{
					document.getElementById("search-box").style.visibility = "hidden";
					document.getElementById("search-box").style.opacity = "0";
					document.getElementById("search-box").style.transition = "all .5s ease-in-out";
					document.getElementById("q").value = "";
				} else
					{
						document.getElementById("search-box").style.visibility = "visible";
						document.getElementById("search-box").style.opacity = "1";
						document.getElementById("search-box").style.transition = "opacity .5s ease-in-out";
					}
		}

	/* Wait for a click on the search button, or an [Enter] keypress to perform the search */

		document.getElementById("search-btn").addEventListener("click", goSearch);

		function checkKey(e) {
			if (e.keyCode === 13)
			{
				e.preventDefault();
				goSearch();
			}
		}

	/* Function to go perform the search */

		function goSearch() {
			query = document.getElementById("q").value;

			if (query === undefined || query === "")
				{
					document.getElementById("q").value = "Enter a valid location...";
					return;
				}

			var xRequest = new XMLHttpRequest();

			/* Send request */

			xRequest.open("GET", "https://nominatim.openstreetmap.org/?q=" + query + "&format=json", true);
			xRequest.send();

			/* Handle the answer of request */

			xRequest.onreadystatechange = function() {
				
				/* If request is successful */

				if (this.readyState === 4 && this.status === 200)
				{
					var response = JSON.parse(this.responseText);

					if (response != undefined && response.length === 0)
					{
						document.getElementById("q").value = "Location not found...";
					} else
						{
							lon = parseFloat(response[0].lon);
							lat = parseFloat(response[0].lat);
							zoomLevel = 13;
							hideMap();
							document.getElementById("notifications").innerHTML = "Finding your location...";
							setTimeout(drawMap, 2000);
						}
				}
			}
		}

// Function to draw the map

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
		document.getElementById("map-controls").style.display = "block";
		document.getElementById("map-area").style.backgroundImage = "none";
	}

// Function to hide map during notifications

	function hideMap() {
		document.getElementById("map-controls").style.display = "none";
		document.getElementById("search-box").style.visibility = "hidden";
		document.getElementById("search-box").style.opacity = "0";
		document.getElementById("q").value = "";
		document.getElementById("map-area").innerHTML = "";
	}