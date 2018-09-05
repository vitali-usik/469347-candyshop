'use strict';

var GOODS_AMOUNT = 26;
var CONTENTS_AMOUNT = 5;
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
var amount = [];
var price;
var weight;
var rating = {
  value: [],
  number: []
};
var nutrition_facts = {
  sugar: true,
  energy: [],
  contents: []
};
var goods = [];



var getNumbersRange = function (arr, minValue, maxValue) {
  for (var i = minValue; i < maxValue + 1; i++) {
    arr.push(i);
  }
  return arr;
};

getNumbersRange(amount, 0, 20);
getNumbersRange(rating.value, 1, 5);
getNumbersRange(rating.number, 10, 900);
getNumbersRange(nutrition_facts.energy, 70, 500);

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var randomElement = arr[randomIndex];
  return randomElement;
};

var generateRandomContents = function (contents) {
  for (var i = 0; i < CONTENTS_AMOUNT.length; i++) {
    var randomData = getRandomElement(contents);
    var randomContent = randomContent + randomData;
    console.log(randomContent);
  }
  return randomContent;
};

for (var i = 0; i < GOODS_AMOUNT; i++) {
  goods.push({'name': GOOD_NAMES[i], 'amount': 20, 'price': '', 'weight': '', 'rating': '', 'nutrition_facts': ''});
}

console.log(goods);
console.log(generateRandomContents(GOOD_INGRIDIENTS));
