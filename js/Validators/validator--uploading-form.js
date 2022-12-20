// Regular expression (RegExp) for checking hastag
const checkingHastag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


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
// ////////////////////////// Create pristine ///////////////////////////////
// ==========================================================================

const pristineUploadingForm = new Pristine(formUploadingPicture, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});




// ==========================================================================
// ///////////////////////////// Validating ////////////////////////////////
// ==========================================================================

let errorMessage = '';

// Description-validating
pristineUploadingForm.addValidator(
  description,
  (string) => string.length <= 140,
  'Длина комментария не более 140 символов'
);

// Hastag-validating
pristineUploadingForm.addValidator(
  hastagsField,
  ValidateHastag,
  getErrorMessage
);

function ValidateHastag(string) {
  if (string === '') {
    return true;
  }
  const hastags = string.split(' ').map((hastag) => hastag.toLowerCase());
  if (hastags.some((hastag) => hastag === '') && hastags.length > 1) {
    errorMessage = 'Не оставляйте пробел в конце строки';
    return false;
  }
  if (hastags.length > 5) {
    errorMessage = 'Не более 5 хештегов';
    return false;
  }
  if (hastags.indexOf('#') !== -1) {
    errorMessage = 'Пустой хештег';
    return false;
  }
  if (hastags.some((hastag) => !checkingHastag.test(hastag))) {
    errorMessage = 'Более 20 символов в хештеге или запрещенный символ в хештеге';
    return false;
  }
  if (hastags.length !== [...new Set(hastags)].length) {
    errorMessage = 'Не повторяйте имена хештегов';
    return false;
  }
  return true;
}

function getErrorMessage() {
  return errorMessage;
}




// ==========================================================================
// //////////////////// Cancel escape with on focus ////////////////////////
// ==========================================================================

hastagsField.addEventListener('keydown', (evt) => {
  cancelEscapeWithEsc(hastagsField, evt);
});

description.addEventListener('keydown', (evt) => {
  cancelEscapeWithEsc(description, evt);
});

function cancelEscapeWithEsc(field, evt) {
  if (field === document.activeElement && evt.keyCode === 27) {
    evt.stopPropagation();
  }
}




// =======================================================================
// /////////////////////////////// export ////////////////////////////////
// =======================================================================

export { pristineUploadingForm };
