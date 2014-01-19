function readFile() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
	fileEntry.file(gotFile, fail);
}

function gotFile(file){
	readDataUrl(file);
	readAsText(file);
}

function readDataUrl(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		console.log("Read as data URL");
		console.log(evt.target.result);
	};
	reader.readAsDataURL(file);
}

function readAsText(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		console.log("Read as text");
		console.log(evt.target.result);
	};
	reader.readAsText(file);
	navigator.notification.alert(
		'File Read',  // message
		null,         // callback
		'File Read: '+file,      // title
		'OK'                    // buttonName
	);
}

function fail(error) {
	navigator.notification.alert(
		'Failed because: ' + error,  // message
		null,         // callback
		'Failure Occured',      // title
		'OK'                    // buttonName
	);
	return;
}
/////////////////////////////////////////////////////////////////////////////

function writeFile() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotWriteFS, fail);
}

function gotWriteFS(fileSystem) {
	fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileWriteEntry, fail);
}

function gotFileWriteEntry(fileEntry) {
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	writer.onwriteend = function(evt) {
		console.log("contents of file now 'some sample text'");
		writer.truncate(11);
		writer.onwriteend = function(evt) {
			console.log("contents of file now 'some sample'");
			writer.seek(4);
			writer.write(" different text");
			writer.onwriteend = function(evt){
				console.log("contents of file now 'some different text'");
			}
		};
	};
	writer.write("some sample text");
	navigator.notification.alert(
		'File Saved',  // message
		null,         // callback
		'Files readme.txt written...',      // title
		'OK'                    // buttonName
	);
}

///////////////////////////////////////////////////////////////////////////////

function uploadFile() {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(
		uploadPhoto,
		function(message) { alert('get picture failed'); },
		{
			quality         : 50,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
	);
}

function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType="image/jpeg";

	var params = {};
	params.value1 = "test";
	params.value2 = "param";

	options.params = params;

	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://some.server.com/upload.php"), win, uploadfail, options);
}

function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
}

function uploadfail(error) {
	alert("An error has occurred: Code = " + error.code);
	console.log("upload error source " + error.source);
	console.log("upload error target " + error.target);
}

///////////////////////////////////////////////////////////////////////////////

// !! Assumes filePath is a valid path on the device

function downloadFile() {
	var fileTransfer = new FileTransfer();
	var uri = encodeURI("http://some.server.com/download.php");

	fileTransfer.download(
		uri,
		filePath,
		function(entry) {
			console.log("download complete: " + entry.fullPath);
		},
		function(error) {
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("upload error code" + error.code);
		},
		false,
		{
			headers: {
				"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		}
	);
}
