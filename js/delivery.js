'use strict';

(function () {
  var deliveryBlock = document.querySelector('.deliver__toggle');

  var deliveryClickHandler = function (evt) {
    var tab = evt.target.id;
    if (tab === '') {
      return;
    }
    if (evt.target.id === 'deliver__courier') {
      document.querySelector('.deliver__store').classList.add('visually-hidden');
    } else {
      document.querySelector('.deliver__courier').classList.add('visually-hidden');
    }
    document.querySelector('.' + tab).classList.remove('visually-hidden');
  };

  deliveryBlock.addEventListener('click', function (evt) {
    deliveryClickHandler(evt);
  });
})();
