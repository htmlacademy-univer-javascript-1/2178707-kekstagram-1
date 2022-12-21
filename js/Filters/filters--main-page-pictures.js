// ==========================================================================
// ////////////////////////////// Filtering /////////////////////////////////
// ==========================================================================

const getDefaultFilteredPictures = (pictures) => pictures;

const getRandomFilteredPictures = (pictures) => pictures.slice().sort(compareRandom);

const getDiscussedFilteredPictures = (pictures) => pictures.slice().sort(compareDiscussing);




// ==========================================================================
// ////////////////////////////// Comparing /////////////////////////////////
// ==========================================================================

function compareDiscussing (picture1, picture2) {
  return picture2.comments.length - picture1.comments.length;
}

function compareRandom () {
  return 0.5 - Math.random();
} 




// ==========================================================================
// //////////////////////////////// Export //////////////////////////////////
// ==========================================================================

export { getDiscussedFilteredPictures };
export { getDefaultFilteredPictures };
export { getRandomFilteredPictures };
