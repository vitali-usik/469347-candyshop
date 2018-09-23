'use strict';

(function () {
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
  var PATH = 'img/cards/';

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

  var PRICE_AMOUNT_NODE_INDEX = 0;
  var PRICE_WEIGHT_NODE_INDEX = 2;

  var catalog = {};
  var basket = {};

  var catalogCards = document.querySelector('.catalog__cards');
  var basketCards = document.querySelector('.goods__cards');

  // создание массива товаров
  var createGoods = function (count) {
    var goods = [];
    for (var j = 0; j < count; j++) {
      goods.push(
          {
            'id': j,
            'name': GOOD_NAMES[j],
            'picture': PATH + window.utils.getRandomElement(PICTURE_ROUTES),
            'amount': window.utils.getRandomValue(MIN_VALUE_AMOUNT, MAX_VALUE_AMOUNT),
            'price': window.utils.getRandomValue(MIN_VALUE_PRICE, MAX_VALUE_PRICE),
            'weight': window.utils.getRandomValue(MIN_VALUE_WEIGHT, MAX_VALUE_WEIGHT),
            'rating': {
              'value': window.utils.getRandomValue(MIN_RATING_VALUE, MAX_RATING_VALUE),
              'number': window.utils.getRandomValue(MIN_RATING_NUMBER, MAX_RATING_NUMBER)},
            'nutritionFacts': {
              'sugar': window.utils.getRandomBoolean(),
              'energy': window.utils.getRandomValue(MIN_ENERGY_VALUE, MAX_ENERGY_VALUE),
              'contents': window.utils.getRandomContent(GOOD_INGRIDIENTS)
            }});
    }
    return goods;
  };

  // добавление класса в зависимости от количества товара
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

  // добавление класса в зависимости от рейтинга
  var checkRating = function (element, good) {
    if (good.rating.value !== 5) {
      var rating = element.querySelector('.stars__rating');
      rating.classList.remove('stars__rating--five');
      rating.classList.add('stars__rating--' + NUMBERS[good.rating.value]);
    }
  };

  // добавление значения в зависимости от состава товара
  var setNutrition = function (element, good) {
    var nutrition = element.querySelector('.card__characteristic');
    nutrition.textContent = good.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';
  };

  // создание карточки
  var createCard = function (item) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
    var cardElement = cardTemplate.cloneNode(true);

    checkAvailability(cardElement, item);

    var picture = cardElement.querySelector('.card__img');
    picture.src = item.picture;
    picture.alt = item.name;

    cardElement.querySelector('.card__title').textContent = item.name;

    var price = cardElement.querySelector('.card__price');
    price.childNodes[PRICE_AMOUNT_NODE_INDEX].textContent = item.price + ' ';
    price.childNodes[PRICE_WEIGHT_NODE_INDEX].textContent = '/ ' + item.weight + ' Г';

    checkRating(cardElement, item);
    cardElement.querySelector('.star__count').textContent = item.rating.number;
    setNutrition(cardElement, item);
    cardElement.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;

    /* cardElement.addEventListener('click', function (evt) {
      cardClickHandler(evt, cardElement);
    }); */
    cardElement.addEventListener('click', cardClickHandler);

    return cardElement;
  };

  // отрисовка карточек
  var renderCards = function (count, block) {
    var goods = createGoods(count);
    var fragment = document.createDocumentFragment();
    switch (block) {
      case 'catalog':
        goods.forEach(function (good) {
          var card = createCard(good);
          fragment.appendChild(card);
          catalog[good.name.toUpperCase()] = {'good': good, 'card': card};
        });
        break;
      case 'goods':
        goods.forEach(function (good) {
          var card = getBasketGood(good);
          fragment.appendChild(card);
          basket[good.name.toUpperCase()] = {'good': good, 'card': card};
        });
        break;
    }
    return fragment;

  };

  var updateAmount = function (itemName, delta) {
    var item = basket[itemName]['good'];
    var card = basket[itemName]['card'];
    item.amount += delta;
    var amount = card.querySelector('.card-order__count');
    amount.value = item.amount;
  };

  var cardClickHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('card__btn-composition')) {
      evt.currentTarget.querySelector('.card__composition').classList.toggle('card__composition--hidden');
    } else if (target.classList.contains('card__btn-favorite')) {
      target.classList.toggle('card__btn-favorite--selected');
      target.blur();
    } else if (target.classList.contains('card__btn')) {
      var cardName = evt.currentTarget.querySelector('.card__title').innerText;
      var catalogItem = catalog[cardName];
      if (catalogItem['good'].amount === 0) {
        return;
      }
      if (basket[cardName]) {
        updateAmount(cardName, 1);
        target.blur();
      } else {
        addToBasket(cardName);
        target.blur();
      }
      catalogItem['good'].amount--;
      var headerBasket = document.querySelector('.main-header__basket');
      if (headerBasket.innerText === 'В корзине ничего нет') {
        headerBasket.innerText = 1;
      } else {
        headerBasket.textContent++;
      }
      checkAvailability(catalogItem['card'], catalogItem['good']);
    }
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

    content.querySelector('.card-order__count').value = item.amount;

    /* content.addEventListener('click', function (evt) {
      btnBasketHandler(evt, content);
    }); */
    return content;
  };

  var addToBasket = function (itemName) {
    var good = Object.assign({}, catalog[itemName]['good']);
    good.amount = 1;
    var card = getBasketGood(good);
    basketCards.classList.remove('goods__cards--empty');
    basketCards.querySelector('.goods__card-empty').style.display = 'none';
    basketCards.appendChild(card);
    basket[good.name.toUpperCase()] = {'good': good, 'card': card};
  };

  catalogCards.classList.remove('catalog__cards--load');
  catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
  catalogCards.appendChild(renderCards(GOODS_AMOUNT, 'catalog'));
}
)();


/*  var btnBasketHandler = function (evt, element) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('card-order__close')) {
      element.remove();
    } else if (target.classList.contains('card-order__btn--increase')) {
      element.querySelector('.card-order__count').value++;
    } else if (target.classList.contains('card-order__btn--decrease')) {
      element.querySelector('.card-order__count').value--;
      if (element.querySelector('.card-order__count').value === 0) {
        element.remove();
      }
    }
  }; */
