import { COUNTS_LOADING_COMMENT } from '../Settings/settings--popup-picture.js';

// =======================================================================
// /////////////////////////// Rendering popup ///////////////////////////
// =======================================================================

// Picture-popup
const picturePopup = document.querySelector('.big-picture');
// Count comments (# из ##)
const commentsCount = picturePopup.querySelector('.social__comment-count');
// Comments-block
const popupPictureComments = picturePopup.querySelector('.social__comments');
// All-comments-count
const allCommentsCount = picturePopup.querySelector('.comments-count');


function renderingPicturePopup(pictureUrl, pictureCommentsData, pictureLikes) {
  doAfterOpenPopup();
  setPicturePopupData(pictureUrl, pictureLikes, pictureCommentsData.length);
  createCommentsBlock(pictureCommentsData);
  addCloseButtonPopup();
}

function setPicturePopupData(pictureUrl, pictureLikes, pictureCommentsLength) {
  picturePopup.querySelector('.big-picture__img').querySelector('img').src = pictureUrl;
  picturePopup.querySelector('.likes-count').textContent = pictureLikes;
  allCommentsCount.textContent = pictureCommentsLength;
}




// =======================================================================
// ///////////////////// Creating comments block /////////////////////////
// =======================================================================

function createCommentsBlock(pictureCommentsData) {
  popupPictureComments.innerHTML = '';
  pictureCommentsData.forEach((commentData) => {
    const newComment = createComment(commentData);
    popupPictureComments.append(newComment);
  });
  loadComments();
}

function createComment(commentData) {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.append(createCommentAvatar(commentData.name, commentData.avatar));
  comment.append(createCommentText(commentData.message));
  comment.classList.add('hidden');
  return comment;
}

function createCommentAvatar(name, avatarPicture) {
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = avatarPicture;
  commentAvatar.alt = name;
  commentAvatar.width = '35';
  commentAvatar.height = '35';
  return commentAvatar;
}

function createCommentText(text) {
  const commentText = document.createElement('p');
  commentText.classList.add('social_text');
  commentText.textContent = text;
  return commentText;
}




// =======================================================================
// ////////////// Loading comments button settings ///////////////////////
// =======================================================================

// Comments-loader-button
const commentsLoaderButton = picturePopup.querySelector('.comments-loader');
// Current-comment-count
let currentCommentCount = 0;

commentsLoaderButton.addEventListener('click', loadComments);

function loadComments() {
  const hiddenComments = popupPictureComments.querySelectorAll('.hidden');
  for (let i = 0; i < COUNTS_LOADING_COMMENT && i < hiddenComments.length; i++) {
    hiddenComments[i].classList.remove('hidden');
    if (i === hiddenComments.length - 1) {
      commentsLoaderButton.classList.add('hidden');
    }
    currentCommentCount += 1;
  }
  commentsCount.innerHTML = `${currentCommentCount} из ${allCommentsCount.innerHTML} комментариев`;
}




// =======================================================================
// ////////////////////// Close button settings //////////////////////////
// =======================================================================

// Close-popup-button
const closeButton = picturePopup.querySelector('#picture-cancel');


function addCloseButtonPopup() {
  closeButton.addEventListener('click',  closePopup);
  document.addEventListener('keydown', closePopupOnKeydownESC);
}

function closePopup () {
  picturePopup.classList.add('hidden');
  doAfterClosePopup();
}

function closePopupOnKeydownESC (evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
}




// =======================================================================
// //////////////////////// Open/close settings //////////////////////////
// =======================================================================

function doAfterOpenPopup() {
  picturePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function doAfterClosePopup() {
  document.body.classList.remove('modal-open');
  commentsLoaderButton.classList.remove('hidden');
  closeButton.removeEventListener('click',  closePopup);
  document.removeEventListener('keydown', closePopupOnKeydownESC);
  currentCommentCount = 0;
}




// =======================================================================
// /////////////////////////////// Export ////////////////////////////////
// =======================================================================

export { renderingPicturePopup };
