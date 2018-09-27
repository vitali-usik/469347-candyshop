'use strict';

(function () {
  var PATH = 'img/cards/';

  var NUMBERS = ['one', 'two', 'three', 'four', 'five'];

  var PRICE_AMOUNT_NODE_INDEX = 0;
  var PRICE_WEIGHT_NODE_INDEX = 2;

  var catalogCards = document.querySelector('.catalog__cards');

  var catalog = {};
  var basket = {};

  var error = document.querySelector('.modal--error');

  // добавление класса в зависимости от количества товара
  var addClassNameByGoodAvailability = function (element, good) {
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
  var addGoodsRate = function (element, good) {
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

  // создание карточки в DOM
  var createDomCard = function (item) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
    var cardElement = cardTemplate.cloneNode(true);

    addClassNameByGoodAvailability(cardElement, item);

    var picture = cardElement.querySelector('.card__img');
    picture.src = PATH + item.picture;
    picture.alt = item.name;

    cardElement.querySelector('.card__title').textContent = item.name;

    var price = cardElement.querySelector('.card__price');
    price.childNodes[PRICE_AMOUNT_NODE_INDEX].textContent = item.price + ' ';
    price.childNodes[PRICE_WEIGHT_NODE_INDEX].textContent = '/ ' + item.weight + ' Г';

    addGoodsRate(cardElement, item);
    cardElement.querySelector('.star__count').textContent = item.rating.number;
    setNutrition(cardElement, item);
    cardElement.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;

    cardElement.addEventListener('click', function (evtClick) {
      window.catalog.cardClickHandler(evtClick);
    });

    return cardElement;
  };

  var init = function () {
    catalogCards.classList.remove('catalog__cards--load');
    catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
  };

  // обработка успешного запроса
  var successHandler = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(createDomCard(cards[i]));
    }
    catalogCards.appendChild(fragment);
  };

  // обработка ошибок при запросе
  var errorHandler = function () {
    error.classList.remove('modal--hidden');
  };

  init();
  window.backend.loadData(successHandler, errorHandler);

  window.data = {
    addClassNameByGoodAvailability: addClassNameByGoodAvailability,
    createDomCard: createDomCard,
    catalog: catalog,
    basket: basket
  };
})();
