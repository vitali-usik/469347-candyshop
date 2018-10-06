'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var GOODS_CONTENT = 4;

  var DEBOUNCE_INTERVAL = 500;

  // нахождение случайного элемента массива
  var getRandomElement = function (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  // генерация случайного числа между мин и макс значениями
  var getRandomValue = function (min, max) {
    var random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };

  // генерация случайного контента
  var getRandomContent = function (contents) {
    var content = getRandomElement(contents);
    for (var i = 0; i < GOODS_CONTENT; i++) {
      content = getRandomElement(contents) + ', ' + content;
    }
    return content;
  };

  // генерация случайного булевого значения
  var getRandomBoolean = function () {
    return getRandomValue(0, 1) === 1;
  };

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomValue: getRandomValue,
    getRandomContent: getRandomContent,
    getRandomBoolean: getRandomBoolean,
    clearTimeout: clearTimeout,
    setTimeout: setTimeout,
    debounce: debounce,
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
