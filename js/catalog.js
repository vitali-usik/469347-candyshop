'use strict';

(function () {
  var basketCards = document.querySelector('.goods__cards');

  var updateAmount = function (itemName, delta) {
    var item = window.data.basket[itemName]['good'];
    var card = window.data.basket[itemName]['card'];
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
      var catalogItem = window.data.catalog[cardName];
      if (catalogItem['good'].amount === 0) {
        return;
      }
      if (window.data.basket[cardName]) {
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
      window.data.addClassNameByGoodAvailability(catalogItem['card'], catalogItem['good']);
    }
  };

  var getBasketGood = function (item) {
    var basketGood = document.querySelector('#card-order').content.querySelector('.goods__card');
    var content = basketGood.cloneNode(true);

    var picture = content.querySelector('.card-order__img');
    picture.src = item.picture;
    picture.alt = item.name;

    content.querySelector('.card-order__title').textContent = item.name;

    var price = content.querySelector('.card-order__price');
    price.textContent = item.price + ' ₽';

    content.querySelector('.card-order__count').value = item.amount;

    content.addEventListener('click', function (evt) {
      btnBasketHandler(evt, content);
    });
    return content;
  };

  var addToBasket = function (itemName) {
    var good = Object.assign({}, window.data.catalog[itemName]['good']);
    good.amount = 1;
    var card = getBasketGood(good);
    basketCards.classList.remove('goods__cards--empty');
    basketCards.querySelector('.goods__card-empty').style.display = 'none';
    basketCards.appendChild(card);
    window.data.basket[good.name.toUpperCase()] = {'good': good, 'card': card};
  };

  var btnBasketHandler = function (evt, element) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('card-order__close')) {
      basketCards.removeChild(element);
      basketCards.classList.add('goods__cards--empty');
      basketCards.querySelector('.goods__card-empty').style.display = 'block';
    } else if (target.classList.contains('card-order__btn--increase')) {
      element.querySelector('.card-order__count').value++;
    } else if (target.classList.contains('card-order__btn--decrease')) {
      element.querySelector('.card-order__count').value--;
      if (element.querySelector('.card-order__count').value === '0') {
        basketCards.removeChild(element);
        basketCards.classList.add('goods__cards--empty');
        basketCards.querySelector('.goods__card-empty').style.display = 'block';
      }
    }
  };

  window.catalog = {
    cardClickHandler: cardClickHandler
  };
})();
