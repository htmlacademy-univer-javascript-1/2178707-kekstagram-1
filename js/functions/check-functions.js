/**
 * The fucntion checks whether the passed string (str) satifies the specified length
 * Check that the string is less or equal to the specified length
 */
const checkLengthString = (str, length=140) => str.length <= length;

export  { checkLengthString };