import { renderingPicturePopup } from './render--pictures-popup.js';


// Container for pictures
const picturesContainer = document.querySelector('.pictures');
// Picture markup template (html)
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Document-fragment
const pictureFragment = document.createDocumentFragment();




// =======================================================================
// //////////////////////// rendering pictures ///////////////////////////
// =======================================================================

function renderingPicturesOnMainPage(picturesData) {
  getDefaultContainerState();
  picturesContainer.append(createPicturesFragment(picturesData));
}

function createPicturesFragment(picturesData) {
  picturesData.forEach(({url, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.addEventListener('click', () => renderingPicturePopup(url, comments, likes));
    pictureFragment.append(newPicture);
  });
  return pictureFragment;
}

function getDefaultContainerState() {
  const currentPictures = picturesContainer.querySelectorAll('.picture')
  currentPictures.forEach((picture) => {
    picturesContainer.removeChild(picture);
  });
}


// =======================================================================
// /////////////////////////////// export ////////////////////////////////
// =======================================================================

export { renderingPicturesOnMainPage };
