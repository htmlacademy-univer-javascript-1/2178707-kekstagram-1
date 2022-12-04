import { createComment } from '../CreateBlocks/create-comment.js';


/**
 * The function apllies specified hidden settings to the window
 */
function setHiddenSettings(pictureWindow) {
  pictureWindow.classList.remove('hidden');
  pictureWindow.querySelector('.social__comment-count').classList.add('hidden');
  pictureWindow.querySelector('.comments-loader').classList.add('hidden');
}

/**
 * @description The function adds a close button (click and ESC) to the window by id 
 * @param {*} window 
 * @param {str} id format: '#[name-id]'
 */
function addCloseButton(window, id) {
  const closeButton = window.querySelector(id);
  closeButton.addEventListener('click', function () {
    window.classList.add('hidden');
    doAfterClosePictureWindow();
  })
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode == 27) {
      window.classList.add('hidden');
      doAfterClosePictureWindow();
    };
  })
}

function doAfterOpenPictureWindow() {
  document.body.classList.add('modal-open');
}

function doAfterClosePictureWindow() {
  document.body.classList.remove('modal-open');
}


/**
 * @description The function of rendering a picture window after clicking on the thumbnail image
 * @param {*} pictureUrl Url img
 * @param {*} pictureCommentsData Array of comments
 * @param {*} pictureLikes Count likes
 */
function renderingPictureWindow(pictureUrl, pictureCommentsData, pictureLikes) {
  doAfterOpenPictureWindow();
  const pictureWindow = document.querySelector('.big-picture');
  pictureWindow.querySelector('.big-picture__img').querySelector('img').src = pictureUrl;
  pictureWindow.querySelector('.likes-count').textContent = pictureLikes;
  pictureWindow.querySelector('.comments-count').textContent = pictureCommentsData.length;
  const pictureWindowComments = pictureWindow.querySelector('.social__comments');
  pictureWindowComments.innerHTML = '';
  pictureCommentsData.forEach((commentData) => {
    const newComment = createComment(commentData);
    pictureWindowComments.append(newComment);
  });
  setHiddenSettings(pictureWindow);
  addCloseButton(pictureWindow, '#picture-cancel');
}

export { renderingPictureWindow };
