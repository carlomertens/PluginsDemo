function currentPosition() {
	navigator.geolocation.getCurrentPosition(onCurrentPositionSuccess, onCurrentPositionError);
}

// onSuccess Geolocation
//
function onCurrentPositionSuccess(position) {
	var element = document.getElementById('geolocation');
	element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
						'Longitude: '          + position.coords.longitude             + '<br />' +
						'Altitude: '           + position.coords.altitude              + '<br />' +
						'Accuracy: '           + position.coords.accuracy              + '<br />' +
						'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
						'Heading: '            + position.coords.heading               + '<br />' +
						'Speed: '              + position.coords.speed                 + '<br />' +
						'Timestamp: '          + position.timestamp                    + '<br />';
}

// onError Callback receives a PositionError object
//
function onCurrentPositionError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

////////////////////////////////////////////////////////////////////////////
var watchID = null;
    
function watchPosition() {
		clearWatchPosition();
        // Throw an error if no update is received every 30 seconds
        var options = { timeout: 30000 };
        watchID = navigator.geolocation.watchPosition(onWatchPositionSuccess, onWatchPositionError, options);
    }

// onSuccess Geolocation
//
function onWatchPositionSuccess(position) {
	var element = document.getElementById('geolocation');
	element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
						'Longitude: ' + position.coords.longitude     + '<br />' +
						'<hr />'      + element.innerHTML;
}

// onError Callback receives a PositionError object
//
function onWatchPositionError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

function clearWatchPosition() {
	if (watchID != null) {
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
	}
	var element = document.getElementById('geolocation');
	element.innerHTML = '';
}
