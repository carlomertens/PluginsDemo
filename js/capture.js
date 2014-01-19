function captureAudioSuccess(mediaFiles) {
	var i, len;
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		uploadFile(mediaFiles[i]);
	}
}

// Called if something bad happens.
//
function captureAudioError(error) {
	var msg = 'An error occurred during capture: ' + error.code;
	navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureAudio() {
	// Launch device audio recording application,
	// allowing user to capture up to 2 audio clips
	navigator.device.capture.captureAudio(captureAudioSuccess, captureAudioError, {limit: 2});
}

////////////////////////////////////////////////////////////

// Called when capture operation is finished
//
function captureImageSuccess(mediaFiles) {
	var i, len;
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		uploadFile(mediaFiles[i]);
	}
}

// Called if something bad happens.
//
function captureImageError(error) {
	var msg = 'An error occurred during capture: ' + error.code;
	navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureImage() {
	// Launch device camera application,
	// allowing user to capture up to 2 images
	navigator.device.capture.captureImage(captureImageSuccess, captureImageError, {limit: 2});
}

////////////////////////////////////////////////////////////

// Called when capture operation is finished
//
function captureVideoSuccess(mediaFiles) {
	var i, len;
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		uploadFile(mediaFiles[i]);
	}
}

// Called if something bad happens.
//
function captureVideoError(error) {
	var msg = 'An error occurred during capture: ' + error.code;
	navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureVideo() {
	// Launch device video recording application,
	// allowing user to capture up to 2 video clips
	navigator.device.capture.captureVideo(captureVideoSuccess, captureVideoError, {limit: 2});
}
//////////////////////////////////////////////////////////////////////////////////////////////////

// Upload files to server
function uploadFile(mediaFile) {
	var ft = new FileTransfer(),
		path = mediaFile.fullPath,
		name = mediaFile.name;

	ft.upload(path,
		"http://my.domain.com/upload.php",
		function(result) {
			console.log('Upload success: ' + result.responseCode);
			console.log(result.bytesSent + ' bytes sent');
		},
		function(error) {
			console.log('Error uploading file ' + path + ': ' + error.code);
		},
		{ fileName: name });
}

