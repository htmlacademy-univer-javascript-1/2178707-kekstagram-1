import { closeForm } from './Renders/render--uploading-picture-form.js';
import { pristineUploadingForm } from './Validators/validator--uploading-form.js';
import { setDefualtFilterClick } from './Renders/render--filter-pictures.js';
import { EVENT_RESPONSE_TIME } from './Settings/settings--events-time.js';
import { renderingPicturesOnMainPage } from './Renders/render--main-page-pictures.js';
import { debounce } from './util.js';


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
// ////////////////////// request to the server /////////////////////////////
// ==========================================================================

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    renderingPicturesOnMainPage(pictures);
    setDefualtFilterClick(debounce((defaultFilter) => renderingPicturesOnMainPage(defaultFilter(pictures)), EVENT_RESPONSE_TIME));
    showFilltersField();
  })
  .catch();




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
};

setUserFormSubmit(closeForm);




// ==========================================================================
// /////////////////////// Block/unblock button /////////////////////////////
// ==========================================================================

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'ЗАГРУЖАЮ...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'ОПУБЛИКОВАТЬ';
}




// ==========================================================================
// ////////////////////////////// Error message /////////////////////////////
// ==========================================================================

// Error-popup-template
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorPopup = errorTemplate.cloneNode(true);
// Error-popup-button
const errorButton = errorPopup.querySelector('.error__button');


function showError() {
  errorButton.addEventListener('click', closeError);
  document.addEventListener('keydown', closeErorrOnKeydownEsc);
  document.addEventListener('click', closeErrorOnClickOutput);
  document.body.append(errorPopup);
}

function closeError() {
  errorPopup.remove();
  cleanEvents();
  unblockSubmitButton();
}

function closeErrorOnClickOutput(evt) {
  const isInsideClick = evt.composedPath().includes(errorPopup);
  if (isInsideClick) {
    closeError();
  }
}

function closeErorrOnKeydownEsc(evt) {
  if (evt.keyCode === 27) {
    closeError();
  }
}




// ==========================================================================
// ///////////////////////////// Success message ////////////////////////////
// ==========================================================================

// Success-popup-template
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successPopup = successTemplate.cloneNode(true);
// Error-Success-button
const successButton = successPopup.querySelector('.success__button');


function showSuccess() {
  successButton.addEventListener('click', closeSuccess);
  document.addEventListener('keydown', closeSuccessOnKeydownEsc);
  document.addEventListener('click', closeSuccessOnClickOutput);
  document.body.append(successPopup);
}

function closeSuccess() {
  successPopup.remove();
  cleanEvents();
  unblockSubmitButton();
}

function closeSuccessOnClickOutput(evt) {
  const isInsideClick = evt.composedPath().includes(successPopup);
  if (isInsideClick) {
    closeSuccess();
  }
}

function closeSuccessOnKeydownEsc(evt) {
  if (evt.keyCode === 27) {
    closeSuccess();
  }
}


// ==========================================================================
// /////////////////////////////// Cleaning /////////////////////////////////
// ==========================================================================

function showFilltersField() {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}


// ==========================================================================
// /////////////////////////////// Cleaning /////////////////////////////////
// ==========================================================================

function cleanTextInput() {
  description.value = '';
  hastagsField.value = '';
}

function cleanEvents() {
  formUploadingPicture.querySelector('#upload-file').value = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeErorrOnKeydownEsc);
  document.removeEventListener('click', closeErrorOnClickOutput);
}
