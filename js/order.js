'use strict';

(function () {
  var success = document.querySelector('.modal--success');
  var error = document.querySelector('.modal--error');
  var form = document.querySelector('#form-order');
  var closeSuccess = success.querySelector('.modal__close');
  var closeError = error.querySelector('.modal__close');

  var closeEscHandler = function (evt) {
    window.utils.isEscEvent(evt, closeModal);
  };


  var closeModal = function (evt) {
    evt.preventDefault();
    evt.currentTarget.closest('.modal').classList.add('modal--hidden');
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
  });

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
