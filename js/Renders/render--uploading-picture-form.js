import { scalePopupSettings } from '../Settings/settings--uploading-picture.js';
import { filterEffectSettings } from '../Settings/settings--uploading-picture.js';
import { effectsDictionary } from '../data.js';
import { effectsMeasurements } from '../data.js';
import { getStringAttribute } from '../util.js';
import { getNameEffectClass } from '../util.js';
import { checkValidateUploadingFile } from '../Validators/validator--uploading-form.js';


// User-form
const userForm = document.querySelector('.img-upload__form');
// Input-file (picture)
const pictureFile = userForm.querySelector('#upload-file');
// Prewie picture
const mainPicture = userForm.querySelector('.img-upload__preview');
// Picture-form
const uploadedPictureForm = userForm.querySelector('.img-upload__overlay');
// Effect intensivity scale
const filterEffectSlider = userForm.querySelector('.effect-level__slider');
// Effects checkbox (radio)
const filterEffects = userForm.querySelectorAll('.effects__radio');


pictureFile.addEventListener('change', (evt) => {
  if (checkValidateUploadingFile(evt.target.files[0])) {
    renderingUploadingPicturesForm();
  }
});




// =======================================================================
// //////////////////////// rendering the form ///////////////////////////
// =======================================================================

function renderingUploadingPicturesForm() {
  doAfterOpenForm();
  setPicture();
  addScalePicture();
  addPicturesEffect();
  addCloseButtonForm();
}




// =======================================================================
// ////////////////////// rendering the picture //////////////////////////
// =======================================================================

function setPicture() {
  mainPicture.querySelector('img').src = URL.createObjectURL(pictureFile.files[0]);
}



// =======================================================================
// /////////////////////// rendering the scale ///////////////////////////
// =======================================================================

// Picture scale
const scaleElement = userForm.querySelector('.scale__control--value');
// Scale +
const scaleBiggerButton = userForm.querySelector('.scale__control--bigger');
// Scale -
const scaleSmallerButton = userForm.querySelector('.scale__control--smaller');
// Current picture scale value
let valueScaleElement = scalePopupSettings.start;


function addScalePicture() {
  scaleBiggerButton.addEventListener('click', changeValueScaleBigger);
  scaleSmallerButton.addEventListener('click', changeValueScaleSmaller);
}

function changeValueScaleBigger() {
  if (valueScaleElement > scalePopupSettings.max - scalePopupSettings.step) {
    valueScaleElement = scalePopupSettings.max;
  }
  else {
    valueScaleElement += scalePopupSettings.step;
  }
  scaleElement.value = `${valueScaleElement}%`;
  mainPicture.style.transform = getStringAttribute('scale', valueScaleElement / scalePopupSettings.max);
}

function changeValueScaleSmaller() {
  if (valueScaleElement < 2 * scalePopupSettings.step) {
    valueScaleElement = scalePopupSettings.step;
  }
  else {
    valueScaleElement -= scalePopupSettings.step;
  }
  scaleElement.value = `${valueScaleElement}%`;
  mainPicture.style.transform = getStringAttribute('scale', valueScaleElement / scalePopupSettings.max);
}




// =======================================================================
// /////////////////// effect filter picture /////////////////////////////
// =======================================================================

noUiSlider.create(filterEffectSlider, filterEffectSettings.chrome);
let previewEffectName = '';

function addPicturesEffect () {
  filterEffects.forEach((effect) => {
    effect.addEventListener('change', (evt) => {
      const effectName = evt.target.value;
      if (effectName !== 'none') { setSelectedEffect(effectName); }
      else { setOriginalEffect(); }
    });
  });
}

function setSelectedEffect(effectName) {
  mainPicture.classList.add(getNameEffectClass(effectName));
  mainPicture.classList.remove(getNameEffectClass(previewEffectName));
  filterEffectSlider.classList.remove('hidden');
  filterEffectSlider.noUiSlider.updateOptions(filterEffectSettings[effectName]);
  filterEffectSlider.noUiSlider.set(filterEffectSettings[effectName].range.max);
  previewEffectName = effectName;
  filterEffectSlider.noUiSlider.on('update', () => {
    mainPicture.style.filter = getStringAttribute(
      effectsDictionary[effectName],
      filterEffectSlider.noUiSlider.get() + effectsMeasurements[effectName]
    );
  });
}

function setOriginalEffect() {
  mainPicture.classList.remove(getNameEffectClass(previewEffectName));
  mainPicture.style.filter = null;
  filterEffectSlider.classList.add('hidden');
}




// =======================================================================
// ////////////////////// close button settings //////////////////////////
// =======================================================================

// Close-form-button
const closeButton = uploadedPictureForm.querySelector('#upload-cancel');


function addCloseButtonForm() {
  closeButton.addEventListener('click',  closeForm);
  document.addEventListener('keydown', closeFormOnKeydownESC);
}

function closeForm ()  {
  uploadedPictureForm.classList.add('hidden');
  doAfterCloseForm();
}

function closeFormOnKeydownESC (evt) {
  if (evt.keyCode === 27) {
    closeForm();
  }
}




// =======================================================================
// ////////////////////// open/close settings ////////////////////////////
// =======================================================================

function doAfterOpenForm() {
  filterEffectSlider.classList.add('hidden');
  mainPicture.style.transform = getStringAttribute('scale', scalePopupSettings.start / 100);
  scaleElement.value = `${scalePopupSettings.start}%`;
  uploadedPictureForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function doAfterCloseForm() {
  userForm.querySelector('.text__hashtags').value = '';
  userForm.querySelector('.text__description').value = '';
  document.body.classList.remove('modal-open');
  mainPicture.classList.remove(getNameEffectClass(previewEffectName));
  filterEffectSlider.classList.add('hidden');
  mainPicture.style.filter = null;
  pictureFile.value = '';
  closeButton.removeEventListener('click',  closeForm);
  document.removeEventListener('keydown', closeFormOnKeydownESC);
}




// =======================================================================
// /////////////////////////////// export ////////////////////////////////
// =======================================================================

export { closeForm };
