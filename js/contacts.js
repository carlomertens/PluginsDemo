
function createContact(firstName,lastName) {
	
	// create
	var contact = navigator.contacts.create();
	contact.displayName = "Plumber";
	contact.nickname = "Plumber";                 // specify both to support all devices
	var name = new ContactName();
	name.givenName = firstName;//"Jane";
	name.familyName = lastName;//"Doe";
	contact.name = name;
	
	alert("Saving contact:" + firstName + " " + lastName + " ...");

	// save
	contact.save(onSaveSuccess,onSaveError);
}

/////////////////////////////////////////////////////////////////////////

function findContact(firstName,lastName) {
	// find all contacts with firstName lastName in any name field
	var options = new ContactFindOptions();
	options.filter = firstName + " "  + lastName;//"Bob";
	options.multiple = true;  // return multiple results

	var fields = ["displayName", "name"];// return contact.displayName and contact.name field

	alert("Searching for " + firstName + " "  + lastName + "...");
	
	navigator.contacts.find(fields, onFindContactSuccess, onFindContactError, options);
}

// onSuccess: Get a snapshot of the current contacts

function onFindContactSuccess(contacts) {
	//alert("Contacts Length = " + contacts.length);
	for (var i = 0; i < contacts.length; i++) {
		//console.log("Display Name = " + contacts[i].displayName);
		alert("Display Name = " + contacts[i].displayName);
		alert("Contact Name = " + contacts[i].name.givenName);
		alert("Contact Name = " + contacts[i].name.familyName);
	}
}

// onError: Failed to get the contacts

function onFindContactError(contactError) {
	alert('onError!');
}

////////////////////////////////////////////////////////////////////////////

function removeContact(firstName,lastName) {

	var contactFields = ["displayName", "name"];
	var contactOptions = { filter: firstName + " "  + lastName, multiple: true };
	
	navigator.contacts.find(contactFields, onFindRemoveSuccess, onFindRemoveError, contactOptions);
}

function onFindRemoveSuccess(contacts) {
	//alert("Contacts Length = " + contacts.length);
	for (var i = 0; i < contacts.length; i++) {
		//console.log("Display Name = " + contacts[i].displayName);
		alert("Removing Name: " + contacts[i].name.firstName + " " + contacts[i].name.lastName);
		contacts[i].remove(onRemoveContactSuccess,onRemoveContactError);
	}
}

function onFindRemoveError(contacts) {
	alert('onFindRemoveError!');
}

function onRemoveContactSuccess(contacts) {
	alert('Contact Deleted!');
}

function onRemoveContactError(contacts) {
	alert('onRemoveContactError!');
}
/////////////////////////////////////////////////////////////////////////////

function createSaveCloneRemoveContact() {
	// create
	var contact = navigator.contacts.create();
	contact.displayName = "Plumber";
	contact.nickname = "Plumber";                 // specify both to support all devices
	var name = new ContactName();
	name.givenName = "Jane";
	name.familyName = "Doe";
	contact.name = name;

	// save
	contact.save(onSaveSuccess,onSaveError);

	// clone
	var clone = contact.clone();
	clone.name.givenName = "John";
	console.log("Original contact name = " + contact.name.givenName);
	console.log("Cloned contact name = " + clone.name.givenName);

	// remove
	contact.remove(onRemoveSuccess,onRemoveError);
}

// onSaveSuccess: Get a snapshot of the current contacts
//
function onSaveSuccess(contact) {
	alert("Save Success");
}

// onSaveError: Failed to get the contacts
//
function onSaveError(contactError) {
	alert("SaveError = " + contactError.code);
}

// onRemoveSuccess: Get a snapshot of the current contacts
//
function onRemoveSuccess(contacts) {
	alert("Removal Success");
}

// onRemoveError: Failed to get the contacts
//
function onRemoveError(contactError) {
	alert("RemoveError = " + contactError.code);
}
