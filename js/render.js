import { generateArrayPicturesData } from './Functions/functions-generate.js';

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
    newPicture.querySelector('.picture__comments').textContent = comments;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newFragment.append(newPicture);
  });
  return newFragment;
}

const photosContainer = document.querySelector('.pictures');
photosContainer.append(createPicturesFragment());
