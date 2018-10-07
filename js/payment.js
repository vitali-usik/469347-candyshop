'use strict';

(function () {
  // находим блок с оплатой и все соответствующие ему инпуты
  var payment = document.querySelector('.payment');
  var paymentBtn = payment.querySelector('.payment__method');
  var paymentCash = payment.querySelector('.payment__cash-wrap');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var cardStatus = paymentCard.querySelector('.payment__card-status');
  var cardNumber = paymentCard.querySelector('#payment__card-number');
  var cardDate = paymentCard.querySelector('#payment__card-date');
  var cardCvc = paymentCard.querySelector('#payment__card-cvc');
  var cardHolder = paymentCard.querySelector('#payment__cardholder');
  // var btnSend = document.querySelector('.buy__submit-btn');

  // проверяем валидность введенного номера карты с помощью алгоритма луна
  var checkCardNumber = function (number) {
    var arr = number.split('');
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      if (i % 2 === 0) {
        var even = parseInt(number[i], 10) * 2;
        arr[i] = even > 9 ? even - 9 : even;
      } else {
        arr[i] = parseInt(arr[i], 10);
      }

      sum += arr[i];
    }
    return sum % 10 === 0;
  };

  // меняем статус в зависимости от введенных данных
  var changeStatus = function () {
    var isNumberValid = checkCardNumber(cardNumber.value);
    var isValidCvc = parseInt(cardCvc.value, 10) > 99 && parseInt(cardCvc.value, 10) < 1000;
    var isCardValid = cardNumber.validity.valid && cardDate.validity.valid && cardCvc.validity.valid && cardHolder.validity.valid && isNumberValid && isValidCvc;
    var statusText = isCardValid ? 'Одобрен' : 'Не определен';
    cardStatus.textContent = statusText;
  };

  cardNumber.addEventListener('invalid', function () {
    var validityText = '';
    if (cardNumber.validity.patternMismatch) {
      validityText = 'Номер карты состоит только из цифр';
    } else if (cardNumber.validity.tooShort || cardNumber.validity.tooLong) {
      validityText = 'Номер карты должен состоять из 16 цифр';
    } else if (cardNumber.validity.valueMissing) {
      validityText = 'Поле обязательно к заполнению';
    }
    cardNumber.setCustomValidity(validityText);
  });

  cardDate.addEventListener('invalid', function () {
    var validityText = '';
    if (cardDate.validity.tooShort || cardDate.validity.tooLong || cardDate.validity.patternMismatch) {
      validityText = 'Срок действия карты должен быть указан в формате ММ/ГГ';
    } else if (cardDate.validity.valueMissing) {
      validityText = 'Поле обязательно к заполнению';
    }
    cardDate.setCustomValidity(validityText);
  });

  cardCvc.addEventListener('invalid', function () {
    var validityText = '';
    if (cardCvc.validity.tooShort || cardCvc.validity.tooLong || cardCvc.validity.patternMismatch) {
      validityText = 'Поле должно содержать 3 цифры, диапазон допустимых значений от 100 до 999';
    } else if (cardCvc.validity.valueMissing) {
      validityText = 'Поле обязательно к заполнению';
    }
    cardCvc.setCustomValidity(validityText);
  });

  cardHolder.addEventListener('invalid', function () {
    var validityText = '';
    if (cardHolder.validity.patternMismatch) {
      validityText = 'Поле должно содержать только латинские буквы';
    } else if (cardHolder.validity.valueMissing) {
      validityText = 'Поле обязательно к заполнению';
    }
    cardHolder.setCustomValidity(validityText);
  });

  // отдельно проверяем валидность карты с помощью алгоритма луна при change и выводим сообщение о его невалидности, если таковая имеется (при событии invalid такая проверка не срабатывает)
  cardNumber.addEventListener('change', function () {
    if (!checkCardNumber(cardNumber.value)) {
      cardNumber.setCustomValidity('Проверьте правильность указанного номера');
    }
  });

  var inputsToggleHandler = function (element) {
    var inputs = element.querySelectorAll('input');
    inputs.forEach(function (input) {
      if (element.classList.contains('visually-hidden')) {
        input.disabled = true;
        input.required = '';
      } else {
        input.disabled = false;
        input.required = 'required';
      }
    });
  };

  // добавляем тоггл на переключение вкладок
  var paymentBtnHandler = function (evt) {
  // evt.preventDefault();
    var tab = evt.target.id;
    if (tab === 'payment__cash') {
      paymentCash.classList.remove('visually-hidden');
      paymentCard.classList.add('visually-hidden');
    } else {
      paymentCash.classList.add('visually-hidden');
      paymentCard.classList.remove('visually-hidden');
    }
    inputsToggleHandler(paymentCard);
  };


  // вешаем обработчик на весь блок и меняем статус при изменении
  paymentCard.addEventListener('change', function () {
    changeStatus();
  });

  // вешаем обработичк на кнопки и переключаем вкладки при клике
  paymentBtn.addEventListener('click', paymentBtnHandler);

  window.payment = {
    checkCardNumber: checkCardNumber,
    inputsToggleHandler: inputsToggleHandler
  };
})();
