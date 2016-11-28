const PRO_ENV = "pro";

const toggle = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => checkbox.checked = true);
}

const setAsDefaultEnv = (env) => {
	const proOption = document.querySelector("option[value='" + PRO_ENV + "']");
	if(proOption) proOption.selected = true;
}

toggle();
setAsDefaultEnv(PRO_ENV);


