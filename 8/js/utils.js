'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var GOODS_CONTENT = 4;
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

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomValue: getRandomValue,
    getRandomContent: getRandomContent,
    getRandomBoolean: getRandomBoolean,
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
