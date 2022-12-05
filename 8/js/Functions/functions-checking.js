/**
 * @description The function checks whether the lenght of the passed string matches the specified value
 * @param {string} str
 * @param {int} length
 */
const checkLengthString = (str, length=140) => str.length <= length;

export { checkLengthString };
