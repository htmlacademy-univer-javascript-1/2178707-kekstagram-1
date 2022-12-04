import { getRandomArrayElement } from './functions/random-functions.js';
import { getRandomNumber } from './functions/random-functions.js';
import { COMMENTS_DATA } from './data.js';
import { TASK4_RULES } from './task-rules/task4-rules.js';


/**
 * The function create an object (Comment) from random values taken from a data set
 * @param {*} idPost // IDnumber of the post (individual)
 * @param {*} idComm // IDnumber of the comment (individual)
 */
function createComment(idPost, idComm) {
  return {
    id: `${idPost*10000+idComm}`,
    avatar: `img/avatar-${getRandomNumber(1, 6)}`,
    message: getRandomArrayElement(COMMENTS_DATA.messages),
    name: getRandomArrayElement(COMMENTS_DATA.names)
  };
}


/**
 * The function create an object (Post) from random values taken from a data set
 * @param {*} idPost // IDnumber of the post (individual)
 */
function createUserPostInfo(idPost) {
  return {
    id: idPost,
    url:`photos/${idPost}.jpg`,
    description: getRandomArrayElement(COMMENTS_DATA.description),
    likes: getRandomNumber(TASK4_RULES.numLikes.min, TASK4_RULES.numLikes.max),
    comments: Array.from({length: getRandomNumber()}).map((value, index) => createComment(idPost, index + 1))
  };
}

export {createUserPostInfo};
