var formUploadingPicture = document.querySelector('.img-upload__form');
var pictureFile = formUploadingPicture.querySelector('#upload-file');
var uploadedPicturePopup = formUploadingPicture.querySelector('.img-upload__overlay');
var popupPicture = formUploadingPicture.querySelector('.img-upload__preview');

pictureFile.addEventListener('change', function () {
  renderingUploadingPicturesPopup(uploadedPicturePopup);
});

// =======================================================================
// /////////////////////////// rendering popup ///////////////////////////
// =======================================================================

function renderingUploadingPicturesPopup() {
  doAfterOpenPopup();
  addCloseButtonPopup();
}

// =======================================================================
// /////////////////////////// do with popup /////////////////////////////
// =======================================================================

/**
 * @description The function adds a close button (click and ESC) to the popup
 * @param {*} popup
 */
function addCloseButtonPopup() {
  const closeButton = uploadedPicturePopup.querySelector('#upload-cancel');
  closeButton.addEventListener('click',  closePopupOnClick);
  document.addEventListener('keydown', closePopupOnKeydownESC);

  function closePopupOnClick ()  {
    uploadedPicturePopup.classList.add('hidden');
    doAfterClosePopup();
  };

  function closePopupOnKeydownESC (evt) {
    if (evt.keyCode === 27) {
      uploadedPicturePopup.classList.add('hidden');
      doAfterClosePopup();
    }
  }

  function doAfterClosePopup() {
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closePopupOnKeydownESC);
    pictureFile.value = '';
  }
}

function doAfterOpenPopup() {
  uploadedPicturePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
}
