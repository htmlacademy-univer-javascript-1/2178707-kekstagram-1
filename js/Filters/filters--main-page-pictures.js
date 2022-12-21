// ==========================================================================
// ////////////////////////////// Filtering /////////////////////////////////
// ==========================================================================

const getDefaultFilteredPictures = (pictures) => pictures;

const getRandomFilteredPictures = (pictures) => pictures.slice().sort(compareRandom);

const getDiscussedFilteredPictures = (pictures) => pictures.slice().sort(compareDiscussing);




// ==========================================================================
// ////////////////////////////// Comparing /////////////////////////////////
// ==========================================================================

const compareDiscussing = (picture1, picture2) => picture2.comments.length - picture1.comments.length;

const compareRandom = (picture1, picture2) => 0.5 - Math.random();




// ==========================================================================
// //////////////////////////////// Export //////////////////////////////////
// ==========================================================================

export { getDiscussedFilteredPictures };
export { getDefaultFilteredPictures };
export { getRandomFilteredPictures };
