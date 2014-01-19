function currentHeading() {
	navigator.compass.getCurrentHeading(onCompassSuccess, onCompassError);
}

// onSuccess: Get the current heading
//
function onCompassSuccess(heading) {
	//alert('Heading: ' + heading.magneticHeading);
	navigator.notification.alert(
		'Heading: ' + heading.magneticHeading,  // message
		null,         // callback
		'Compass',      // title
		'OK'                    // buttonName
	);
	return;
}

// onError: Failed to get the heading
//
function onCompassError(compassError) {
	alert('Compass Error: ' + compassError.code);
}


// The watch id references the current `watchHeading`
var watchID = null;

// Start watching the compass
//
function startWatch() {
	var element = document.getElementById('heading');
	element.innerHTML = 'Waiting for heading...';
	// Update compass every 1.5 seconds
	var options = { frequency: 1500 };
	watchID = navigator.compass.watchHeading(onWatchSuccess, onWatchError, options);
}

// Stop watching the compass
//
function stopWatch() {
	var element = document.getElementById('heading');
	if (watchID) {
		navigator.compass.clearWatch(watchID);
		watchID = null;
	}
	element.innerHTML = '';
}

// onSuccess: Get the current heading
//
function onWatchSuccess(heading) {
	var element = document.getElementById('heading');
	element.innerHTML = 'Heading: ' + heading.magneticHeading;
}

// onError: Failed to get the heading
//
function onWatchError(compassError) {
	alert('Compass error: ' + compassError.code);
}
