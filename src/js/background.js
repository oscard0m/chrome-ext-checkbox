const toggle = () => {
	const checkboxes = document.querySelectorAll('input[type=\'checkbox\']');

	checkboxes.forEach((checkbox) => {
		checkbox.checked = true;
	});
};

const setAsDefaultEnv = (env) => {
	const proOption = document.querySelector(`option[value='${env}']`);

	if (proOption) {
		proOption.selected = true;
	}
};

const getConfigFile = (fileURL, successCallback, errorCallback) => {
	const request = fetch(fileURL);

	successCallback && request.then(successCallback);
	errorCallback && request.catch(errorCallback);
};

const parseResponse = (response) => {
	const contentType = response.headers.get('content-type');

	if (contentType && contentType.indexOf('application/json') !== -1) {
		response.json().then(jsonConfig => {
			const URLS = jsonConfig.urls;
			const SELECT_OPTION = jsonConfig.defaultOption;

			if (URLS.find((url) => window.location.href.search(url) >= 0)) {
				toggle();
				setAsDefaultEnv(SELECT_OPTION);
			}
		});
	}
};

getConfigFile(chrome.runtime.getURL('/json/config.json'), parseResponse);


