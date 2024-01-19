// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;

  inputEls.forEach((inputEl) => {
    if (inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disable = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disable = false;
  }
}

function setEventLisnener(formEl, option) {
  const { inputSelector } = options;
  const submitButton = formEl.querySelector(".popup__button");

  inputEls.forEach((inputEl) => {
    inputEls.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, option);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(config) {
  const formEl = { ...document.querySelectorAll(options.formSelector) };
  formEl.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault(inputEl);
    });

    setEventListeners(formEl, options);
    //look for all inputs inside of form
    //loop through all inputs to see if all are valid
    // if inpput is not valid
    //get validation message
    //add error class to input
    //display error message
    //disable button
    // if all inputs are valid
    //enable button
    // reset error message
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

enableValidation(config);
