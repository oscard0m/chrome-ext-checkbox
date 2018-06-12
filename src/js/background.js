const configKeys = ['urls', 'defaultOption'];

const toggle = () => {
	const checkboxes = document.querySelectorAll('input[type=\'checkbox\']');

	checkboxes.forEach(checkbox => { checkbox.checked = true; });
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

const doActions = (urls, selectOption) => {
	if (urls.find(url => window.location.href.search(url) >= 0)) {
		toggle();
		selectOption && setAsDefaultEnv(selectOption);
	}
};

const parseResponse = (response) => {
	const contentType = response.headers.get('content-type');

	if (contentType && contentType.indexOf('application/json') !== -1) {
		response.json().then(jsonConfig => {
			for (const key of Object.keys(jsonConfig)) {
				const isDefaultOption = configKeys.some(arrElem => arrElem === key);
				const { urls, selectOption } = isDefaultOption ? jsonConfig : jsonConfig[key];

				doActions(urls, selectOption);
			}

		});
	}
};

getConfigFile(chrome.runtime.getURL('/json/config.json'), parseResponse);


