function accelerometer() {
	navigator.accelerometer.getCurrentAcceleration(onAccelerometerSuccess, onAccelerometerError);
}

function onAccelerometerSuccess(acceleration) {
	//alert('Acceleration X: ' + acceleration.x + '\n' +
	//	  'Acceleration Y: ' + acceleration.y + '\n' +
	//	  'Acceleration Z: ' + acceleration.z + '\n' +
	//	  'Timestamp: '      + acceleration.timestamp + '\n');
	navigator.notification.alert(
		'Acceleration X: ' + acceleration.x + '\n' +
		'Acceleration Y: ' + acceleration.y + '\n' +
		'Acceleration Z: ' + acceleration.z + '\n' +
		'Timestamp: '      + acceleration.timestamp + '\n',  // message
		null,         // callback
		'Accelerometer Values',      // title
		'OK'                    // buttonName
	);
	return;
};

function onAccelerometerError() {
    alert('Error!');
};
