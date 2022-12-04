import { generateArrayPicturesData } from './Functions/functions-generate.js';

const photosContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

/**
 * @description The function of creating a document fragment from pictures
 */
function createPicturesFragment() {
  const newFragment = document.createDocumentFragment();
  const picturesData = generateArrayPicturesData();
  picturesData.forEach(({url, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__comments').textContent = comments;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newFragment.append(newPicture);
  });
  return newFragment;
}

photosContainer.append(createPicturesFragment());
