'use strict';

var GOODS_AMOUNT = 26;
var GOODS_AMOUNT_BASKET = 3;
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

var NUMBERS = ['one', 'two', 'three', 'four', 'five'];

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
var IMG_SRC = 'img/cards/';

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

var catalogCards = document.querySelector('.catalog__cards');
var basketCards = document.querySelector('.goods__cards');


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

var createGoods = function (count) {
  var goods = [];
  for (var j = 0; j < count; j++) {
    goods.push({'name': GOOD_NAMES[j], 'picture': IMG_SRC + getRandomElement(PICTURE_ROUTES), 'amount': getRandomValue(MIN_VALUE_AMOUNT, MAX_VALUE_AMOUNT), 'price': getRandomValue(MIN_VALUE_PRICE, MAX_VALUE_PRICE), 'weight': getRandomValue(MIN_VALUE_WEIGHT, MAX_VALUE_WEIGHT), 'rating': {'value': getRandomValue(MIN_RATING_VALUE, MAX_RATING_VALUE), 'number': getRandomValue(MIN_RATING_NUMBER, MAX_RATING_NUMBER)}, 'nutritionFacts': {'sugar': getRandomBoolean(), 'energy': getRandomValue(MIN_ENERGY_VALUE, MAX_ENERGY_VALUE), 'contents': getRandomContent(GOOD_INGRIDIENTS)}});
  }
  return goods;
};

var createCard = function (item) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
  var cardElement = cardTemplate.cloneNode(true);
  checkAvailability(cardElement, item);
  var picture = cardElement.querySelector('.card__img');
  picture.src = item.picture;
  picture.alt = item.name;

  cardElement.querySelector('.card__title').textContent = item.name;

  var price = cardElement.querySelector('.card__price');
  price.childNodes[0].textContent = item.price + ' ';
  price.childNodes[2].textContent = '/ ' + item.weight + ' Г';

  checkRating(cardElement, item);
  cardElement.querySelector('.star__count').textContent = item.rating.number;
  getNutrition(cardElement, item);
  cardElement.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;
  return cardElement;
};

var checkAvailability = function (element, good) {
  if (good.amount < 6) {
    element.classList.remove('card--in-stock');
  }
  if (good.amount > 0) {
    element.classList.add('card--little');
  } else {
    element.classList.add('card--soon');
  }
};

var checkRating = function (element, good) {
  var rating = element.querySelector('.stars__rating');
  if (good.rating.value !== 5) {
    rating.classList.remove('stars__rating--five');
    rating.classList.add('stars__rating--' + NUMBERS[good.rating.value]);
  }
};

var getNutrition = function (element, good) {
  var nutrition = element.querySelector('.card__characteristic');
  nutrition.textContent = good.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';
};

var getBasketGood = function (item) {
  var basketGood = document.querySelector('#card-order').content.querySelector('.goods_card');
  var content = basketGood.cloneNode(true);

  var picture = content.querySelector('.card-order__img');
  picture.src = item.picture;
  picture.alt = item.name;

  content.querySelector('.card-order__title').textContent = item.name;

  var price = content.querySelector('.card-order__price');
  price.textContent = item.price + ' ₽';
  return content;
};

var renderCards = function (count, block) {
  var goods = createGoods(count);
  var fragment = document.createDocumentFragment();
  if (block === 'catalog') {
    goods.forEach(function (good) {
      fragment.appendChild(createCard(good));
    });
  }
  if (block === 'goods') {
    goods.forEach(function (good) {
      fragment.appendChild(getBasketGood(good));
    });
  }
  return fragment;
};


catalogCards.classList.remove('catalog__cards--load');
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
catalogCards.appendChild(renderCards(GOODS_AMOUNT, 'catalog'));

basketCards.classList.remove('goods__cards--empty');
basketCards.querySelector('.goods__card-empty').style.display = 'none';
basketCards.appendChild(renderCards(GOODS_AMOUNT_BASKET, 'goods'));


