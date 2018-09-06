'use strict';

var GOODS_AMOUNT = 26;
var GOOD_NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'];

var PICTURE_ROUTES = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustard.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-cucumber.jpg',
  'ice-eggplant.jpg',
  'ice-garlic.jpg',
  'ice-italian.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg'
];

var GOOD_INGRIDIENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var GOODS_CONTENT = 4;

var MIN_VALUE_AMOUNT = 0;
var MAX_VALUE_AMOUNT = 20;

var MIN_VALUE_PRICE = 100;
var MAX_VALUE_PRICE = 1500;

var MIN_VALUE_WEIGHT = 30;
var MAX_VALUE_WEIGHT = 300;

var MIN_RATING_VALUE = 1;
var MAX_RATING_VALUE = 5;

var MIN_RATING_NUMBER = 10;
var MAX_RATING_NUMBER = 900;

var MIN_ENERGY_VALUE = 70;
var MAX_ENERGY_VALUE = 500;

var goods = [];


var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var randomElement = arr[randomIndex];
  return randomElement;
};

var getRandomValue = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

var getRandomContent = function (contents) {
  var content = getRandomElement(contents);
  for (var i = 0; i < GOODS_CONTENT; i++) {
    content = getRandomElement(contents) + ', ' + content;
  }
  return content;
};

var getRandomBoolean = function () {
  return getRandomValue(0, 1) === 1 ? true : false;
};

for (var j = 0; j < GOODS_AMOUNT; j++) {
  goods.push({'name': GOOD_NAMES[j], 'picture': 'img/cards/' + getRandomElement(PICTURE_ROUTES), 'amount': getRandomValue(MIN_VALUE_AMOUNT, MAX_VALUE_AMOUNT), 'price': getRandomValue(MIN_VALUE_PRICE, MAX_VALUE_PRICE), 'weight': getRandomValue(MIN_VALUE_WEIGHT, MAX_VALUE_WEIGHT), 'rating': {'value': getRandomValue(MIN_RATING_VALUE, MAX_RATING_VALUE), 'number': getRandomValue(MIN_RATING_NUMBER, MAX_RATING_NUMBER)}, 'nutritionFacts': {'sugar': getRandomBoolean(), 'energy': getRandomValue(MIN_ENERGY_VALUE, MAX_ENERGY_VALUE), 'contents': getRandomContent(GOOD_INGRIDIENTS)}});
}

var userCatalog = document.querySelector('.catalog__cards');
userCatalog.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

for (var i = 0; i < GOODS_AMOUNT; i++) {
  var cardElement = cardTemplate.cloneNode(true);
  userCatalog.appendChild(cardElement);

  cardElement.querySelector('.card__title').textContent = GOOD_NAMES[i];

  cardElement.querySelector('.star__count').textContent = goods[i].rating.number;
  var stars = document.querySelector('.stars__rating');
  if (goods[i].rating.value === 1) {
    stars.classList.add('stars__rating--one');
  } else if (goods[i].rating.value === 2) {
    stars.classList.add('stars__rating--two');
  } else if (goods[i].rating.value === 3) {
    stars.classList.add('stars__rating--three');
  } else if (goods[i].rating.value === 4) {
    stars.classList.add('stars__rating--four');
  } else {
    stars.classList.add('stars__rating--five');
  }

  if (goods.amount > 5) {
    cardElement.classList.add('card--in-stock');
  } else if (goods.amount > 0 && goods.amount < 6) {
    cardElement.classList.add('card--little');
  } else {
    cardElement.classList.add('card--soon');
  }
}

console.log(goods);
