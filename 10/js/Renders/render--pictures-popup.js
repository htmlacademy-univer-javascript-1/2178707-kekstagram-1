// =======================================================================
// /////////////////////////// rendering popup ///////////////////////////
// =======================================================================

/**
 * @description The function of rendering a picture window after clicking on the thumbnail image
 * @param {*} pictureUrl Url img
 * @param {*} pictureCommentsData Array of comments
 * @param {*} pictureLikes Count likes
 */
function renderingPicturePopup(pictureUrl, pictureCommentsData, pictureLikes) {
  const picturePopup = document.querySelector('.big-picture');
  picturePopup.querySelector('.big-picture__img').querySelector('img').src = pictureUrl;
  picturePopup.querySelector('.likes-count').textContent = pictureLikes;
  picturePopup.querySelector('.comments-count').textContent = pictureCommentsData.length;
  const picturePopupComments = picturePopup.querySelector('.social__comments');
  picturePopupComments.innerHTML = '';
  pictureCommentsData.forEach((commentData) => {
    const newComment = createComment(commentData);
    picturePopupComments.append(newComment);
  });

  doAfterOpenPopup(picturePopup);
  addCloseButtonPopup(picturePopup);

  // temprorality
  picturePopup.querySelector('.social__comment-count').classList.add('hidden');
  picturePopup.querySelector('.comments-loader').classList.add('hidden');
}

// =======================================================================
// ////////////////////// create comment block ///////////////////////////
// =======================================================================

/**
 * The function create a comment block
 */
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
// /////////////////////////// do with popup /////////////////////////////
// =======================================================================

/**
 * @description The function adds a close button (click and ESC) to the popup
 * @param {*} popup
 */
function addCloseButtonPopup(popup) {
  const closeButton = popup.querySelector('#picture-cancel');
  closeButton.addEventListener('click',  closePopupOnClick);
  document.addEventListener('keydown', closePopupOnKeydownESC);

  function closePopupOnClick ()  {
    popup.classList.add('hidden');
    doAfterClosePopup();
  }

  function closePopupOnKeydownESC (evt) {
    if (evt.keyCode === 27) {
      popup.classList.add('hidden');
      doAfterClosePopup();
    }
  }

  function doAfterClosePopup() {
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closePopupOnKeydownESC);
  }
}

function doAfterOpenPopup(popup) {
  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export { renderingPicturePopup };
