'use strict';

(function () {
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
    } else {
      tabCourier.classList.add('visually-hidden');
      tabStore.classList.remove('visually-hidden');
    }
  };

  deliveryBlock.addEventListener('click', deliveryClickHandler);
})();
