const formUploadingPicture = document.querySelector('.img-upload__form');
const pictureFile = formUploadingPicture.querySelector('#upload-file');
const uploadedPicturePopup = formUploadingPicture.querySelector('.img-upload__overlay');

pictureFile.addEventListener('change', function () {
  renderingUploadingPicturesPopup();
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
  }

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
