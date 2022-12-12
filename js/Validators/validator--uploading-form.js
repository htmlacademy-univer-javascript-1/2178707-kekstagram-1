const checkingHastag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

var formUploadingPicture = document.querySelector('.img-upload__form');
var uploadedPicturePopup = formUploadingPicture.querySelector('.img-upload__overlay');
var errorMessage = 'Не более 20 символов в одном хештеге';
var description = uploadedPicturePopup.querySelector('.text__description');
var hastags = uploadedPicturePopup.querySelector('.text__hashtags');

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
  hastags,
  ValidateHastag,
  getErrorMessage
);

/**
 * @description The function of checking the validity of hastags entered
 * @param {*} string - a string from the hastag field
 */
function ValidateHastag(string) {
  if (string == '') {
    return true;
  }
  var hastags = string.split(' ').map(hastag => hastag.toLowerCase());
  if (hastags.some((hastag) => hastag === '') && hastags.length > 1) {
    errorMessage = 'Не оставляйте пробел в конце строки';
    return false;
  }
  if (hastags.length > 5) {
    errorMessage = 'Не более 5 хештегов';
    return false;
  }
  if (hastags.indexOf('#') != -1) {
    errorMessage = 'Пустой хештег';
    return false;
  }
  if (hastags.some((hastag) => !checkingHastag.test(hastag))) {
    errorMessage = 'Более 20 символов в хештеге или запрещенный символ в хештеге';
    return false;
  };
  if (hastags.length != [...new Set(hastags)].length) {
    errorMessage = 'Не повторяйте имена хештегов';
    return false;
  }
  return true;
}

var isValidHastag = (hastag) => checkingHastag.test(hastag);

function getErrorMessage() {
  return errorMessage;
}

// ==========================================================================
// //////////////////// Cancel escape with on focus ////////////////////////
// ==========================================================================

hastags.addEventListener('keydown', (evt) => {
  cancelEscapeWithEsc(hastags, evt);
});

description.addEventListener('keydown', (evt) => {
  cancelEscapeWithEsc(description, evt);
});

function cancelEscapeWithEsc(field, evt) {
  if (field === document.activeElement && evt.keyCode == 27) {
    evt.stopPropagation();
  }
}
