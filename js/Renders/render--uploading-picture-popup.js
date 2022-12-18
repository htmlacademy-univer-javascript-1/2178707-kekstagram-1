import { scalePopupSettings } from '../settings.js';
import { filterEffectSettings } from '../settings.js';
import { effectsDictionary } from '../data.js';
import { effectsMeasurements } from '../data.js';

const formUploadingPicture = document.querySelector('.img-upload__form');
const pictureFile = formUploadingPicture.querySelector('#upload-file');
const mainPicture = formUploadingPicture.querySelector('.img-upload__preview');
const uploadedPicturePopup = formUploadingPicture.querySelector('.img-upload__overlay');
const scaleElement = formUploadingPicture.querySelector('.scale__control--value');
const filterEffectSlider = formUploadingPicture.querySelector('.effect-level__slider');

pictureFile.addEventListener('change', () => {
  renderingUploadingPicturesPopup();
});

const getStringAttribute = (nameAttribute, value) =>  `${nameAttribute}(${value})`;
// =======================================================================
// //////////////////////// rendering a popup ///////////////////////////
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
  filterEffectSlider.classList.add('hidden');
  mainPicture.style.transform = getStringAttribute('scale', scalePopupSettings.start / 100);
  scaleElement.value = `${valueScaleElement}%`;
  uploadedPicturePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
}


// =======================================================================
// //////////////////////// rendering a scale ////////////////////////////
// =======================================================================


let valueScaleElement = scalePopupSettings.start;
const scaleBiggerButton = formUploadingPicture.querySelector('.scale__control--bigger');
const scaleSmallerButton = formUploadingPicture.querySelector('.scale__control--smaller');

scaleBiggerButton.addEventListener('click', changeValueScaleBigger);
scaleSmallerButton.addEventListener('click', changeValueScaleSmaller);

function changeValueScaleBigger() {
  if (valueScaleElement > 100 - scalePopupSettings.step) {
    valueScaleElement = 100;
  }
  else {
    valueScaleElement += scalePopupSettings.step;
  }
  scaleElement.value = `${valueScaleElement}%`;
  mainPicture.style.transform = getStringAttribute('scale', valueScaleElement / 100);
}

function changeValueScaleSmaller() {
  if (valueScaleElement < 2 * scalePopupSettings.step) {
    valueScaleElement = scalePopupSettings.step;
  }
  else {
    valueScaleElement -= scalePopupSettings.step;
  }
  scaleElement.value = `${valueScaleElement}%`;
  mainPicture.style.transform = getStringAttribute('scale', valueScaleElement / 100);
}


// =======================================================================
// /////////////////// effect filter picture /////////////////////////////
// =======================================================================


const filterEffects = formUploadingPicture.querySelectorAll('.effects__radio');
let previewEffectValue = '';


filterEffects.forEach((effect) => {
  effect.addEventListener('change', (evt) => {
    const effectName = evt.target.value;
    if (effectName !== 'none') {
      mainPicture.classList.add(getNameEffectClass(effectName));
      mainPicture.classList.remove(getNameEffectClass(previewEffectValue));
      filterEffectSlider.classList.remove('hidden');
      filterEffectSlider.noUiSlider.updateOptions(filterEffectSettings[effectName]);
      previewEffectValue = effectName;
      filterEffectSlider.noUiSlider.on('update', () => {
        mainPicture.style.filter = getStringAttribute(effectsDictionary[effectName], filterEffectSlider.noUiSlider.get() + effectsMeasurements[effectName]);
      });
    }
    else {
      mainPicture.classList.remove(getNameEffectClass(previewEffectValue));
      mainPicture.style.filter = null;
      filterEffectSlider.classList.add('hidden');
    }
  });
});

function getNameEffectClass (value){
  return `effects__preview--${value}`;
}

noUiSlider.create(filterEffectSlider, filterEffectSettings.chrome);
