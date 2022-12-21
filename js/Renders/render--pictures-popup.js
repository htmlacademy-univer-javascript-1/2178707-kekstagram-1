// =======================================================================
// /////////////////////////// Rendering popup ///////////////////////////
// =======================================================================

// Picture-popup
const picturePopup = document.querySelector('.big-picture');


function renderingPicturePopup(pictureUrl, pictureCommentsData, pictureLikes) {
  doAfterOpenPopup();
  setPicturePopupData(pictureUrl, pictureLikes, pictureCommentsData.length);
  createCommentsBlock(pictureCommentsData);
  addCloseButtonPopup();

  // temprorality
  picturePopup.querySelector('.social__comment-count').classList.add('hidden');
  picturePopup.querySelector('.comments-loader').classList.add('hidden');

}

function setPicturePopupData(pictureUrl, pictureCommentsLength, pictureLikes) {
  picturePopup.querySelector('.big-picture__img').querySelector('img').src = pictureUrl;
  picturePopup.querySelector('.likes-count').textContent = pictureLikes;
  picturePopup.querySelector('.comments-count').textContent = pictureCommentsLength;
}




// =======================================================================
// ///////////////////// Creating comments block /////////////////////////
// =======================================================================

function createCommentsBlock(pictureCommentsData) {
  const picturePopupComments = picturePopup.querySelector('.social__comments');
  picturePopupComments.innerHTML = '';
  pictureCommentsData.forEach((commentData) => {
    const newComment = createComment(commentData);
    picturePopupComments.append(newComment);
  });
}

function createComment(commentData) {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.append(createCommentAvatar(commentData.name, commentData.avatar));
  comment.append(createCommentText(commentData.message));
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
  closeButton.removeEventListener('click',  closePopup);
  document.removeEventListener('keydown', closePopupOnKeydownESC);
}




// =======================================================================
// /////////////////////////////// Export ////////////////////////////////
// =======================================================================

export { renderingPicturePopup };
