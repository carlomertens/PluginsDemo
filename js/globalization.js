function checkLanguage() {
  navigator.globalization.getPreferredLanguage(
	function (language) {alert('language: ' + language.value + '\n');},
	function () {alert('Error getting language\n');}
  );
}

function checkLocale() {
  navigator.globalization.getLocaleName(
	function (locale) {alert('locale: ' + locale.value + '\n');},
	function () {alert('Error getting locale\n');}
  );
}
