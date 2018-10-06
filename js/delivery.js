'use strict';

(function () {
  var PICTURES = {
    'Академическая': 'academicheskaya.jpg',
    'Василеостровская': 'vasileostrovskaya.jpg',
    'Черная речка': 'rechka.jpg',
    'Петроградская': 'petrogradskaya.jpg',
    'Пролетарская': 'proletarskaya.jpg',
    'Площадь Восстания': 'vostaniya.jpg',
    'Проспект Просвещения': 'prosvesheniya.jpg',
    'Фрунзенская': 'frunzenskaya.jpg',
    'Чернышевская': 'chernishevskaya.jpg',
    'Технологический институт': 'tehinstitute.jpg'
  };

  var PATH = 'img/map/';

  var deliveryBlock = document.querySelector('.deliver__toggle');
  var tabCourier = document.querySelector('.deliver__courier');
  var tabStore = document.querySelector('.deliver__store');
  var deliverInputs = tabStore.querySelectorAll('.input-btn__input');
  var deliverLabels = tabStore.querySelectorAll('.input-btn__label');

  var deliveryClickHandler = function (evt) {
    var tab = evt.target.id;
    if (tab === '') {
      return;
    }
    if (tab === 'deliver__courier') {
      tabStore.classList.add('visually-hidden');
      tabCourier.classList.remove('visually-hidden');
    } else {
      tabCourier.classList.add('visually-hidden');
      tabStore.classList.remove('visually-hidden');
    }

    window.payment.inputsToggleHandler(tabStore);
    window.payment.inputsToggleHandler(tabCourier);
  };

  var changeMap = function (evt, inputs) {
    evt.preventDefault();
    var target = evt.target;
    var picture = tabStore.querySelector('.deliver__store-map-img');
    for (var i = 0; i < inputs.length; i++) {
      if (PICTURES[target.innerText]) {
        inputs[i].checked = true;
        picture.src = PATH + PICTURES[target.innerText];
        picture.alt = PICTURES[target.innerText];
      }
    }
  };

  tabStore.addEventListener('click', function (evt) {
    changeMap(evt, deliverInputs);
  });

  window.payment.inputsToggleHandler(tabCourier);

  deliveryBlock.addEventListener('click', deliveryClickHandler);
})();
