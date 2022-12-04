import { COMMENTS_DATA } from '../data.js';
import { getRandomNumber } from './functions-random.js';
import { getRandomArrayElement } from './functions-random.js';
import { pictureSettings } from '../Settings/module4-task1-settings.js';

/**
 * @description The function generate an object (comment) with an individual identifier from a random set
 * @param {int} idComm - individual index (id) of the comment
 */
function generateCommentData(idPost, idComm) {
  return {
    id: `${idPost*1000000+idComm}`,
    avatar: `img/avatar-${getRandomNumber(1, 6)}`,
    message: getRandomArrayElement(COMMENTS_DATA.textComments),
    name: getRandomArrayElement(COMMENTS_DATA.nameUsers)
  };
}

/**
 * @description The function generate an object (picture) with an andividual identifier from a random set
 * @param {int} idPost 
 */ 
function generatePictureData(idPost) {
  return {
    id: idPost,
    url:`photos/${idPost}.jpg`,
    description: getRandomArrayElement(COMMENTS_DATA.pictureDescriptions),
    likes: getRandomNumber(pictureSettings.numLikes.min, pictureSettings.numLikes.max),
    comments: Array.from({length: getRandomNumber()}).map((value, index) => generateCommentData(idPost, index + 1))
  };
}

/**
 * @description The function generate an array of pictures data
 * @param {int} count - count pictures data (array length)
 */
function generateArrayPicturesData() {
  return Array.from({length: pictureSettings.numPictures}).map((value, index) => generatePictureData(index + 1));
}


export { generateArrayPicturesData }
