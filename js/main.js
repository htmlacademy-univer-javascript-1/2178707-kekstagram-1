function getRandomNumber(min_value, max_value) 
{
    if (min > max) 
        [min, max] = [max, min];
        
    if (min < 0)
        throw {name: 'incorrectValues', message: 'Only positive values'};

    return Math.floor(Math.random() * (max_value - min_value + 1) + min_value);
}

/**
 * Функция сравнивает длину строки с передаваемым значением
 * 
 * @param {*} str - проверяемая строка
 * @param {*} length - ограничение длины строки
 * @returns 
 */
const checkLengthOfString = (str, length="140") => str.length <= length;

checkLengthOfString("Какая-то случайная строка", 90);
getRandomNumber(24,45);