var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64-encoded image data
	// console.log(imageData);

	// Get image handle
	//
	var firstSmallImage = document.getElementById('firstSmallImage');

	// Unhide image elements
	//
	firstSmallImage.style.display = 'block';

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	firstSmallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	// console.log(imageURI);

	// Get image handle
	//
	var secondSmallImage = document.getElementById('secondSmallImage');

	// Unhide image elements
	//
	secondSmallImage.style.display = 'block';

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	secondSmallImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
    if (!navigator.camera) {
        alert("Camera not supported");
        return;
    }
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true, destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: source });
}

// alert dialog dismissed
function alertDismissed() {
	// do something
}

// Called if something bad happens.
function onFail(message) {
	navigator.notification.alert(
		'Failed because: ' + message,  // message
		alertDismissed,         // callback
		'Failure Occured',      // title
		'OK'                    // buttonName
	);
	return;
}
