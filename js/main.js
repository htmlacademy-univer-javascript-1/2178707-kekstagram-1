function getRandomNumber(min, max) 
{
    if (min > max) 
        [min, max] = [max, min];
        
    if (min < 0)
        throw {name: 'incorrectValues', message: 'Only positive values'};

    return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomNumber(24,45);


/**
 * Функция сравнивает длину строки с передаваемым значением
 * 
 * @param {*} str - проверяемая строка
 * @param {*} length - ограничение длины строки
 * @returns 
 */
const checkLengthOfString = (str, length="140") => str.length <= length;

checkLengthOfString("Какая-то случайная строка", 90);
