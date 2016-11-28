const toggle = () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
};

const setAsDefaultEnv = (env) => {
	const proOption = document.querySelector(`option[value='${env}']`);
	if(proOption) proOption.selected = true;
};

const ajax = (url, successCallback, errorCallback, timeout, xml) => {
    const request = new XMLHttpRequest();
    request.timeout = timeout || 10000;
    request.open("GET", url);

    setReadyStateChange(request, successCallback, errorCallback, xml);
    request.send();
};

const setReadyStateChange = (request, successCallback, errorCallback, xml) => {
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                successCallback && successCallback(!xml ? request.responseText : request.responseXML);
            } else {
                errorCallback && errorCallback(request);
            }
        }
    };
};

ajax(chrome.extension.getURL("/json/config.json"), function(response) {
  const jsonConfig = JSON.parse(response);
  const URLS = jsonConfig.urls;
  const SELECT_OPTION = jsonConfig.defaultOption;
  if(URLS.find((url) => window.location.href.search(url) >= 0)) {
    toggle();
    setAsDefaultEnv(SELECT_OPTION);
  }
});


