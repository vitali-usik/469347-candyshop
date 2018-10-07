'use strict';

(function () {
  var PICTURES = {
    'Академическая': 'academicheskaya',
    'Василеостровская': 'vasileostrovskaya',
    'Черная речка': 'rechka',
    'Петроградская': 'petrogradskaya',
    'Пролетарская': 'proletarskaya',
    'Площадь Восстания': 'vostaniya',
    'Проспект Просвещения': 'prosvesheniya',
    'Фрунзенская': 'frunzenskaya',
    'Чернышевская': 'chernishevskaya',
    'Технологический институт': 'tehinstitute'
  };

  var PATH = 'img/map/';
  var EXTEND = '.jpg';

  var deliveryBlock = document.querySelector('.deliver__toggle');
  var tabCourier = document.querySelector('.deliver__courier');
  var tabStore = document.querySelector('.deliver__store');

  var deliveryClickHandler = function (evt) {
    var tab = evt.target.id;
    if (tab === '') {
      return;
    }
    if (tab === 'deliver__courier') {
      tabStore.classList.add('visually-hidden');
      tabCourier.classList.remove('visually-hidden');
      window.order.formReset(tabStore);
    } else {
      tabCourier.classList.add('visually-hidden');
      tabStore.classList.remove('visually-hidden');
      window.order.formReset(tabCourier);
    }

    window.payment.inputsToggleHandler(tabStore);
    window.payment.inputsToggleHandler(tabCourier);
  };

  // функция изменения карты
  var changeMap = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var picture = tabStore.querySelector('.deliver__store-map-img');
    if (PICTURES[target.innerText]) {
      picture.src = PATH + PICTURES[target.innerText] + EXTEND;
      picture.alt = PICTURES[target.innerText];
      tabStore.querySelector('#store-' + PICTURES[target.innerText]).checked = true;
    }
  };

  tabStore.addEventListener('click', changeMap);

  window.payment.inputsToggleHandler(tabCourier);

  deliveryBlock.addEventListener('click', deliveryClickHandler);
})();
