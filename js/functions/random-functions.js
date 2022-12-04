/**
 * The function returns a random value from the range
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
 * The function returns a random array elemnent
 */
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

export {getRandomArrayElement};
export {getRandomNumber};
