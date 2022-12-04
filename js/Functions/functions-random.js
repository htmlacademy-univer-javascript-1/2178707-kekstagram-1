/**
 * @description The function returns a random number from the range [min, max]
 * @param {*} min lower limit of the range
 * @param {*} max upper limit of the range
 */
const getRandomNumber = (min = 0, max = 10 ) => {
    const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
};

/**
 * @description The function returns a random element from the array
 * @param {*} array 
 */
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

export { getRandomNumber };
export { getRandomArrayElement };
