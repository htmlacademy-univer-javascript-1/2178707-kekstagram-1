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

export { createComment };
