'use strict';


var paymentCard = document.querySelector('.payment__card-wrap');
var cardStatus = paymentCard.querySelector('.payment__card-status');
var cardNumber = paymentCard.querySelector('#payment__card-number');
var cardDate = paymentCard.querySelector('#payment__card-date');
var cardCvc = paymentCard.querySelector('#payment__card-cvc');
var cardHolder = paymentCard.querySelector('#payment__cardholder');

var checkCardNumber = function (number) {
  var arr = number.split('');
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    if (i % 2 === 1) {
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

var changeStatus = function () {
  var isNumberValid = checkCardNumber(cardNumber.value);
  var isCardValid = cardNumber.validity.valid && cardDate.validity.valid && cardCvc.validity.valid && cardHolder.validity.valid && isNumberValid;

  var statusText = 'Не определен';
  if (isCardValid) {
    statusText = 'Одобрен';
  }

  cardStatus.textContent = statusText;
};

cardNumber.addEventListener('change', function () {
  if (cardNumber.validity.tooShort || cardNumber.validity.tooLong) {
    cardNumber.setCustomValidity('Номер карты должен состоять из 16 цифр');
  } else if (cardNumber.validity.valueMissing) {
    cardNumber.setCustomValidity('Поле обязательно к заполнению');
  } else if (cardNumber.validity.patternMismatch) {
    cardNumber.setCustomValidity('Номер карты состоит только из цифр');
  } else if (!checkCardNumber(cardNumber.value)) {
    cardNumber.setCustomValidity('Проверьте правильность указанного номера');
  } else {
    cardNumber.setCustomValidity('');
  }
  changeStatus();
});

cardDate.addEventListener('change', function () {
  if (cardDate.validity.tooShort || cardDate.validity.tooLong || cardDate.validity.patternMismatch) {
    cardDate.setCustomValidity('Срок действия карты должен быть указан в формате ММ/ГГ');
  } else if (cardDate.validity.valueMissing) {
    cardDate.setCustomValidity('Поле обязательно к заполнению');
  } else {
    cardDate.setCustomValidity('');
  }
  changeStatus();
});

cardCvc.addEventListener('change', function () {
  if (cardCvc.validity.tooShort || cardCvc.validity.tooLong || cardCvc.validity.patternMismatch) {
    cardCvc.setCustomValidity('Поле должно содержать 3 цифры');
  } else if (cardCvc.validity.valueMissing) {
    cardCvc.setCustomValidity('Поле обязательно к заполнению');
  } else {
    cardCvc.setCustomValidity('');
  }
  changeStatus();
});

cardHolder.addEventListener('change', function () {
  if (cardHolder.validity.patternMismatch) {
    cardHolder.setCustomValidity('Поле должно содержать только латинские буквы');
  } else if (cardHolder.validity.valueMissing) {
    cardHolder.setCustomValidity('Поле обязательно к заполнению');
  } else {
    cardHolder.setCustomValidity('');
  }
  changeStatus();
});
