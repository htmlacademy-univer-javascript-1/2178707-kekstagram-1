// Правила задания
const RULES = {
  numPhoto: 25,
  numLikes: {min: 15, max: 200}
};

// Данные для создания объектов
const DATA = {
  names: [
    'Алеша Попович',
    'Илья Муромец',
    'Соловей Разбойник',
    'Добрыня Никитич',
    'Змей Горыныч',
    'Баба-Яга',
    'Елисей Силович',
    'Забава Путятишна',
    'Князь Киевский',
    'Настасья Филиповна',
    'Тугарин Змей'
  ],

  messages: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],

  description: [
    'Это мы все вместе на фоне Киевграда!',
    'Вчера мост на Енисеевской упал, пришлось валить дерево и переходить через него',
    'Дань заплачена вовремя, все остались довльны! Ну, по крайней мере мы точно!',
    'Одна голова хорошо, а две лучше! А если три - значит Змей Горыныч...',
    'Селфи с богатырями! /(L-L)/'
  ]
};

// Вспомогательные стрелочные функции
// const checkLengthString = (str, length=140) => str.length <= length;

const getRandomNumber = (min = 0, max = 10 ) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

// Основные функции
function createComment(idPost, idComm) {
  return {
    id: `${idPost*10000+idComm}`,
    avatar: `img/avatar-${getRandomNumber(1, 6)}`,
    message: getRandomArrayElement(DATA.messages),
    name: getRandomArrayElement(DATA.names)
  };
}

function createUserPostInfo(idPost) {
  return {
    id: idPost,
    url:`photos/${idPost}.jpg`,
    description: getRandomArrayElement(DATA.description),
    likes: getRandomNumber(RULES.numLikes.min, RULES.numLikes.max),
    comments: Array.from({length: getRandomNumber()}).map((value, index) => createComment(idPost, index + 1))
  };
}

// eslint-disable-next-line no-unused-vars
const resultModule4 = Array.from({length: 10}).map((value, index) => createUserPostInfo(index + 1));
