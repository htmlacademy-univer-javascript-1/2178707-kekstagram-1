import { generateArrayPicturesData } from '../Functions/functions-generating.js';
import { renderingPictureWindow } from './render-picturesWindow.js';

/**
 * @description The function of creating a document fragment from pictures
 */
function createPicturesFragment() {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const newFragment = document.createDocumentFragment();
  const picturesData = generateArrayPicturesData();
  picturesData.forEach(({url, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.addEventListener('click', () => renderingPictureWindow(url, comments, likes));
    newFragment.append(newPicture);
  });
  return newFragment;
}

/**
 * @description The function rendering miniature pictures in the main page of the site,
 * by adding them to the block with pictures
 */
function renderingPicturesOnMainPage() {
  const photosContainer = document.querySelector('.pictures');
  photosContainer.append(createPicturesFragment());
}

export { renderingPicturesOnMainPage };
