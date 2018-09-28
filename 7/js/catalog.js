'use strict';

(function () {
  var basketCards = document.querySelector('.goods__cards');
  var catalogCards = document.querySelector('.catalog__cards');
  var basket = document.querySelector('.goods__card-wrap');


  // обновляем количество товара
  var updateAmount = function (id, delta) {
    var item = window.data.basket[id]['good'];
    var card = window.data.basket[id]['card'];
    item.amount += delta;
    var amount = card.querySelector('.card-order__count');
    amount.value = item.amount;
  };

  var cardClickHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    // находим ближайшего родителя к элементу на котором произошло событие
    var good = target.closest('.catalog__card');
    // достаем айдишник товара
    var goodId = good.getAttribute('data-id');

    if (target.classList.contains('card__btn-composition')) {
      // обращаемся к определенному товару и его объекту в DOM
      window.data.catalog[goodId]['card'].querySelector('.card__composition').classList.toggle('card__composition--hidden');
    } else if (target.classList.contains('card__btn-favorite')) {
      target.classList.toggle('card__btn-favorite--selected');
      target.blur();
    } else if (target.classList.contains('card__btn')) {
      var catalogItem = window.data.catalog[goodId];
      if (catalogItem['good'].amount === 0) {
        return;
      }
      if (window.data.basket[goodId]) {
        updateAmount(goodId, 1);
        target.blur();
      } else {
        addToBasket(goodId);
        target.blur();
      }
      catalogItem['good'].amount--;
      var headerBasket = document.querySelector('.main-header__basket');
      if (headerBasket.innerText === 'В корзине ничего нет') {
        headerBasket.innerText = 1;
      } else {
        headerBasket.textContent++;
      }
      window.data.addClassNameByGoodAvailability(catalogItem['card'], catalogItem['good']);
    }
  };

  var addToBasket = function (id) {
    var good = Object.assign({}, window.data.catalog[id]['good']);
    good.amount = 1;
    var card = window.data.createBasketDomCard(good);
    card.setAttribute('data-id', id);
    basketCards.classList.remove('goods__cards--empty');
    basketCards.querySelector('.goods__card-empty').style.display = 'none';
    basketCards.appendChild(card);
    window.data.basket[id] = {'good': good, 'card': card};
    console.log(window.data.basket);
  };

  var btnBasketHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    // находим ближайшего родителя к элементу на котором произошло событие
    var good = target.closest('.card-order');
    // достаем айдишник товара
    var goodId = good.getAttribute('data-id');
    if (target.classList.contains('card-order__close')) {
      // удаляем элемент из корзины
      basketCards.removeChild(window.data.basket[goodId]['card']);
      delete window.data.basket[goodId];
      if (Object.keys(window.data.basket).length === 0) {
        basketCards.classList.add('goods__cards--empty');
        basketCards.querySelector('.goods__card-empty').style.display = 'block';
      }
    } else if (target.classList.contains('card-order__btn--increase')) {
      window.data.basket[goodId]['card'].querySelector('.card-order__count').value++;
      updateAmount(goodId, 1);
    } else if (target.classList.contains('card-order__btn--decrease')) {
      window.data.basket[goodId]['card'].querySelector('.card-order__count').value--;
      updateAmount(goodId, -1);
      if (window.data.basket[goodId]['card'].querySelector('.card-order__count').value === '0') {
        basketCards.removeChild(window.data.basket[goodId]['card']);
        delete window.data.basket[goodId];
      }
    }
  };

  catalogCards.addEventListener('click', cardClickHandler);
  basket.addEventListener('click', btnBasketHandler);

  window.catalog = {
    cardClickHandler: cardClickHandler,
    btnBasketHandler: btnBasketHandler
  };
})();
