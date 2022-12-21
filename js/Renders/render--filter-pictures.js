import { getDefaultFilteredPictures } from '../Filters/filters--main-page-pictures.js';
import { getDiscussedFilteredPictures } from '../Filters/filters--main-page-pictures.js';
import { getRandomFilteredPictures } from '../Filters/filters--main-page-pictures.js';


// Filter-field
const filterField = document.querySelector('.img-filters__form');
// Default-filter-button
const defaultFilterButton = filterField.querySelector('#filter-default');
// DRandom-filter-button
const randomFilterButton = filterField.querySelector('#filter-random');
// Discussed-filter-button
const discussedFilterButton = filterField.querySelector('#filter-discussed');




// =======================================================================
// ///////////////// Filters button settings /////////////////////////////
// =======================================================================

const setFilterClick = (renderingPictures) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    renderingPictures(getDefaultFilteredPictures);
  });
  randomFilterButton.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    renderingPictures(getRandomFilteredPictures);
  });
  discussedFilterButton.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    renderingPictures(getDiscussedFilteredPictures);
  });
};

function setActiveButton(button) {
  filterField.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
}


// =======================================================================
// /////////////////////////////// export ////////////////////////////////
// =======================================================================

export { setFilterClick};
