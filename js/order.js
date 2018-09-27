'use strict';

(function () {
  // var order = document.querySelector('.buy');
  // var submitBtn = order.querySelector('.buy__submit-btn-wrap');
  var success = document.querySelector('.modal--success');
  var error = document.querySelector('.modal--error');
  var form = document.querySelector('#form-order');
  /* var closeSuccess = success.querySelector('.modal__close');
  var closeError = error.querySelector('.modal__close');
 */
  /* var closeEscHandler = function (evt) {
    window.utils.isEscEvent(evt, closeModal);
  }; */


  // Не могу додуматься как написать единую функцию, которая бы закрывала модалку с упешной отправкой и с ошибками
  /* var closeModal = function (evt) {
    evt.preventDefault();
    if (evt.currentTarget.classList.contains('modal--success')) {
      success.classList.add('modal--hidden');
    } else if (evt.currentTarget.classList.contains('modal--error')) {
      error.classList.add('modal--hidden');
    }
    document.removeEventListener('keydown', closeEscHandler);
  };

  closeSuccess.addEventListener('click', closeModal);

  closeSuccess.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closeModal);
  });

  closeSuccess.addEventListener('focus', function (evt) {
    window.utils.isEnterEvent(evt, closeModal);
  });

  closeError.addEventListener('click', closeModal);

  closeError.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closeModal);
  });

  closeError.addEventListener('focus', function (evt) {
    window.utils.isEnterEvent(evt, closeModal);
  }); */

  form.addEventListener('submit', function (evt) {
    window.backend.saveData(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });
  // обработка успешной отправки формы
  var successHandler = function () {
    success.classList.remove('modal--hidden');
  };

  // обработка ошибок
  var errorHandler = function () {
    error.classList.remove('modal--hidden');
  };

})();
