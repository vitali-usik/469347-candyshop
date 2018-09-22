'use strict';

// находим блок с оплатой и все соответствующие ему инпуты
var paymentCard = document.querySelector('.payment__card-wrap');
var cardStatus = paymentCard.querySelector('.payment__card-status');
var cardNumber = paymentCard.querySelector('#payment__card-number');
var cardDate = paymentCard.querySelector('#payment__card-date');
var cardCvc = paymentCard.querySelector('#payment__card-cvc');
var cardHolder = paymentCard.querySelector('#payment__cardholder');

// проверяем валидность введенного номера карты с помощью алгоритма луна
var checkCardNumber = function (number) {
  var arr = number.split('');
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      var even = parseInt(number[i], 10) * 2;

      if (even > 9) {
        arr[i] = even - 9;
      } else {
        arr[i] = even;
      }
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
  var isCardValid = cardNumber.validity.valid && cardDate.validity.valid && cardCvc.validity.valid && cardHolder.validity.valid && isNumberValid;
  var statusText = 'Не определен';
  if (isCardValid) {
    statusText = 'Одобрен';
  }

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
    validityText = 'Поле должно содержать 3 цифры';
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

// вешаем обработчик на весь блок и меняем статус при изменении
paymentCard.addEventListener('change', changeStatus);
