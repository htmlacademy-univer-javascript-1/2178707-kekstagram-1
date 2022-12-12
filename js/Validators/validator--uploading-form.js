const checkingHastag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const formUploadingPicture = document.querySelector('.img-upload__form');
const uploadedPicturePopup = formUploadingPicture.querySelector('.img-upload__overlay');
let errorMessage = 'Не более 20 символов в одном хештеге';
const description = uploadedPicturePopup.querySelector('.text__description');
const hastagsField = uploadedPicturePopup.querySelector('.text__hashtags');

const pristineUploadingForm = new Pristine(formUploadingPicture, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

// ==========================================================================
// ///////////////////////////// Validating ////////////////////////////////
// ==========================================================================

formUploadingPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristineUploadingForm.validate()) {
    formUploadingPicture.submit();
  }
});

pristineUploadingForm.addValidator(
  description,
  (string) => string.length <= 140,
  'Длина комментария не более 140 символов'
);

pristineUploadingForm.addValidator(
  hastagsField,
  ValidateHastag,
  getErrorMessage
);

/**
 * @description The function of checking the validity of hastags entered
 * @param {*} string - a string from the hastag field
 */
function ValidateHastag(string) {
  if (string === '') {
    return true;
  }
  let hastags = string.split(' ').map((hastag) => hastag.toLowerCase());
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
