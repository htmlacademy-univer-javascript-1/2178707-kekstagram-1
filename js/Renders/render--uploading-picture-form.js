import { scalePopupSettings } from '../settings.js';
import { filterEffectSettings } from '../settings.js';
import { effectsDictionary } from '../data.js';
import { effectsMeasurements } from '../data.js';
import { getStringAttribute } from '../Functions/functions.js';


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



pictureFile.addEventListener('change', () => {
  renderingUploadingPicturesForm();
});




// =======================================================================
// //////////////////////// rendering the form ///////////////////////////
// =======================================================================

function renderingUploadingPicturesForm() {
  doAfterOpenForm();
  addScalePicture();
  addPicturesEffect();
  addCloseButtonForm();
}




// =======================================================================
// //////////////////////// rendering a scale ////////////////////////////
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
      if (effectName !== 'none') { setSelectedEffect(effectName) }
      else { setOriginalEffect(effectName) }
    });
  });
}

function setSelectedEffect(effectName) {
  mainPicture.classList.add(getNameEffectClass(effectName));
  mainPicture.classList.remove(getNameEffectClass(previewEffectName));
  filterEffectSlider.classList.remove('hidden');
  filterEffectSlider.noUiSlider.updateOptions(filterEffectSettings[effectName]);
  previewEffectName = effectName;
  filterEffectSlider.noUiSlider.on('update', () => {
    mainPicture.style.filter = getStringAttribute(
      effectsDictionary[effectName], 
      filterEffectSlider.noUiSlider.get() + effectsMeasurements[effectName]
    );
  });
}

function setOriginalEffect(effectName) {
  mainPicture.classList.remove(getNameEffectClass(previewEffectName));
  mainPicture.style.filter = null;
  filterEffectSlider.classList.add('hidden');
}

function getNameEffectClass (value){
  return `effects__preview--${value}`;
}




// =======================================================================
// ////////////////////// close button settings //////////////////////////
// =======================================================================

function addCloseButtonForm() {
  const closeButton = uploadedPictureForm.querySelector('#upload-cancel');
  closeButton.addEventListener('click',  closeForm);
  document.addEventListener('keydown', closeFormOnKeydownESC);
}

function closeForm ()  {
  uploadedPictureForm.classList.add('hidden');
  doAfterCloseForm();
}

function closeFormOnKeydownESC (evt) {
  if (evt.keyCode === 27) {
    closeForm()
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
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormOnKeydownESC);
  mainPicture.classList.remove(getNameEffectClass(previewEffectName));
  mainPicture.style.filter = null;
  filterEffectSlider.classList.add('hidden');
  pictureFile.value = '';
}




// =======================================================================
// /////////////////////////////// export ////////////////////////////////
// =======================================================================

export { closeForm };
