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

  var types = [];
  var nutritionFacts = [];

  // счетчик для различных типов товаров
  var fillTypes = function (items) {
    Object.keys(items).forEach(function (id) {
      if (types[items[id].good.kind]) {
        types[items[id].good.kind]++;
      } else {
        types[items[id].good.kind] = 1;
      }
      if (!items[id].good.nutritionFacts.sugar) {
        nutritionFacts['Без сахара']++;
      } else {
        nutritionFacts['Без сахара'] = 1;
      }
      if (!items[id].good.nutritionFacts.gluten) {
        nutritionFacts['Безглютеновое']++;
      } else {
        nutritionFacts['Безглютеновое'] = 1;
      }
      if (items[id].good.nutritionFacts.vegetarian) {
        nutritionFacts['Вегетарианское']++;
      } else {
        nutritionFacts['Вегетарианское'] = 1;
      }
    });
  };


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

  var addClassByFavorite = function (element, good) {
    if (good.isFavorite === true) {
      element.querySelector('.card__btn-favorite').classList.add('card__btn-favorite--selected');
    }
  };

  // добавление значения в зависимости от состава товара
  var setNutrition = function (element, good) {
    var nutrition = element.querySelector('.card__characteristic');
    nutrition.textContent = good.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';
  };

  // создание карточки каталога в DOM
  var createDomCard = function (item) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
    var cardElement = cardTemplate.cloneNode(true);

    addClassNameByGoodAvailability(cardElement, item);

    var picture = cardElement.querySelector('.card__img');
    picture.src = PATH + item.picture;
    picture.alt = item.name;

    cardElement.setAttribute('data-id', item.id);

    cardElement.querySelector('.card__title').textContent = item.name;

    var price = cardElement.querySelector('.card__price');
    price.childNodes[PRICE_AMOUNT_NODE_INDEX].textContent = item.price + ' ';
    price.childNodes[PRICE_WEIGHT_NODE_INDEX].textContent = '/ ' + item.weight + ' Г';

    addGoodsRate(cardElement, item);
    cardElement.querySelector('.star__count').textContent = item.rating.number;
    setNutrition(cardElement, item);
    cardElement.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;

    addClassByFavorite(cardElement, item);

    return cardElement;
  };

  // создание карточки корзины в DOM
  var createBasketDomCard = function (item) {
    var basketGood = document.querySelector('#card-order').content.querySelector('.goods__card');
    var content = basketGood.cloneNode(true);

    var picture = content.querySelector('.card-order__img');
    picture.src = PATH + item.picture;
    picture.alt = item.name;

    content.setAttribute('data-id', item.id);

    content.querySelector('.card-order__title').textContent = item.name;

    var price = content.querySelector('.card-order__price');
    price.textContent = item.price + ' ₽';

    content.querySelector('.card-order__count').value = item.amount;

    return content;
  };

  // отрисовка карточек
  var renderCards = function (items, block) {
    var fragment = document.createDocumentFragment();
    switch (block) {
      case 'catalog':
        items.forEach(function (item, i) {
          item.id = 'good-' + i;
          var card = createDomCard(item);
          fragment.appendChild(card);
          catalog[item.id] = {'good': item, 'card': card};
        });
        fillTypes(catalog);
        break;
      case 'basket':
        items.forEach(function (item) {
          var card = createBasketDomCard(item);
          fragment.appendChild(card);
          basket[item.id] = {'good': item, 'card': card};
        });
        break;
    }
    return fragment;
  };

  var init = function () {
    catalogCards.classList.remove('catalog__cards--load');
    catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
  };

  // обработка успешного запроса и добавление айдишника
  var successHandler = function (cards) {
    catalogCards.appendChild(renderCards(cards, 'catalog'));
    init();
  };

  // обработка ошибок при запросе
  var errorHandler = function () {
    error.classList.remove('modal--hidden');
  };

  window.backend.loadData(successHandler, errorHandler);


  window.data = {
    addClassNameByGoodAvailability: addClassNameByGoodAvailability,
    createDomCard: createDomCard,
    createBasketDomCard: createBasketDomCard,
    renderCards: renderCards,
    successHandler: successHandler,
    catalog: catalog,
    basket: basket,
    types: types,
    nutritionFacts: nutritionFacts
  };
})();
