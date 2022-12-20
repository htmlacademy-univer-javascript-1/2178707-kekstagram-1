import { renderingPicturesOnMainPage } from './Renders/render--main-page-pictures.js';
import { closeForm } from './Renders/render--uploading-picture-form.js';
import { pristineUploadingForm } from './Validators/validator--uploading-form.js';


fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => renderingPicturesOnMainPage(pictures));


// User-form
const formUploadingPicture = document.querySelector('.img-upload__form');
// Form-picture
const uploadedPictureForm = formUploadingPicture.querySelector('.img-upload__overlay');
// Form-hastag
const hastagsField = uploadedPictureForm.querySelector('.text__hashtags');
// Form-description
const description = uploadedPictureForm.querySelector('.text__description');
// Form-submit-button
const submitButton = uploadedPictureForm.querySelector('.img-upload__submit');




// ==========================================================================
// /////////////////////// Block/unblock button /////////////////////////////
// ==========================================================================

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'ЗАГРУЖАЮ...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'ОПУБЛИКОВАТЬ';
};




// ==========================================================================
// ////////////////////////////// Error message /////////////////////////////
// ==========================================================================

// Error-popup-template
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorPopup = errorTemplate.cloneNode(true);
// Error-popup-button
const errorButton = errorPopup.querySelector('.error__button');


const showError = () => {
  errorButton.addEventListener('click', closeError);
  document.addEventListener('keydown', closeErorrOnKeydownEsc);
  document.addEventListener('click', closeErrorOnClickOutput);
  document.body.append(errorPopup);
};

const closeError = () => {
  errorPopup.remove();
  cleanEvents();
  unblockSubmitButton();
};

const closeErrorOnClickOutput = (evt) => {
  const isInsideClick = evt.composedPath().includes(errorPopup);
  if (isInsideClick) {
    closeError();
  }
};

const closeErorrOnKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    closeError();
  }
};




// ==========================================================================
// ///////////////////////////// Success message ////////////////////////////
// ==========================================================================

// Success-popup-template
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successPopup = successTemplate.cloneNode(true);
// Error-Success-button
const successButton = successPopup.querySelector('.success__button');


const showSuccess = () => {
  successButton.addEventListener('click', closeSuccess);
  document.addEventListener('keydown', closeSuccessOnKeydownEsc);
  document.addEventListener('click', closeSuccessOnClickOutput);
  document.body.append(successPopup);
};

const closeSuccess = (evt) => {
  successPopup.remove();
  cleanEvents();
  unblockSubmitButton();
};

const closeSuccessOnClickOutput = (evt) => {
  const isInsideClick = evt.composedPath().includes(successPopup);
  if (isInsideClick) {
    closeSuccess();
  }
};

const closeSuccessOnKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    closeSuccessr();
  }
};




// ==========================================================================
// /////////////////////////////// Cleaning /////////////////////////////////
// ==========================================================================

function cleanTextInput() {
  description.value = '';
  hastagsField.value = '';
}

const cleanEvents = () => {
  formUploadingPicture.querySelector('#upload-file').value = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeErorrOnKeydownEsc);
  document.removeEventListener('click', closeErrorOnClickOutput);
};




// ==========================================================================
// /////////////////////////////// Submit ///////////////////////////////////
// ==========================================================================

const setUserFormSubmit = (onSuccess) => {
  formUploadingPicture.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristineUploadingForm.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      fetch(
        'https://26.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
            cleanTextInput();
            unblockSubmitButton();
            showSuccess();
          }
          else {
            uploadedPictureForm.classList.add('hidden');
            showError();
          }
        })
        .catch(() => {
          uploadedPictureForm.classList.add('hidden');
          showError();
        });
    }
  });
} 

setUserFormSubmit(closeForm);

