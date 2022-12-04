/**
 * Takes the lower and upper bounds of a range of numbers [min, max] and returns a random number from the range (including the bounds)
 * @param {*} min lower bound (int)
 * @param {*} max upper bound (int)
 */
const getRandomNumber = (min = 0, max = 10 ) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Takes an array and returns it's random element
 */
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

export {getRandomArrayElement};
export {getRandomNumber};
