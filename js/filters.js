'use strict';

(function () {
  var range = document.querySelector('.range');
  var rangeLine = document.querySelector('.range__filter');
  var rangeFill = range.querySelector('.range__fill-line');
  var rangeRight = range.querySelector('.range__btn--right');
  var rangeLeft = range.querySelector('.range__btn--left');
  var rangeMax = range.querySelector('.range__price--max');
  var rangeMin = range.querySelector('.range__price--min');

  /* range.addEventListener('mouseup', function () {
    rangeMax.textContent = Math.ceil(100 * (rangeRight.offsetLeft + rangeRight.offsetWidth) / rangeLine.offsetWidth);
    rangeMin.textContent = Math.floor(100 * (rangeLeft.offsetLeft) / rangeLine.offsetWidth);
  }); */

  /* console.log(Math.ceil(100 * (rangeRight.offsetLeft + rangeRight.offsetWidth) / rangeLine.offsetWidth));
  console.log(Math.floor(100 * (rangeLeft.offsetLeft) / rangeLine.offsetWidth));

  console.log(rangeLeft.offsetLeft);
  console.log(rangeRight.offsetLeft);
  console.log(rangeLine.offsetWidth);
 */
  var pinMove = function (elem) {
    elem.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      // запоминаем начальные координаты передвигаемого пина
      var startCoords = {
        x: evt.clientX,
      };
      // создаем функцию отслеживания передвижения мышки
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        // координаты передвижения мышки
        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };

        startCoords = {
          x: moveEvt.clientX,
        };
        // находим динамическое положение пина
        var newLeft = elem.offsetLeft - shift.x;
        // находим правую границу слайдера
        var rightEdge = rangeLine.offsetWidth - elem.offsetWidth;
        // если курсор вышел за левую границу слайдера
        if (newLeft < 1) {
          elem.style.left = 1 + 'px';
        } else if (newLeft >= rightEdge) {
          // если курсор вышел за правую границу слайдера
          elem.style.left = rightEdge + 'px';
        }
        // отрисовываем передвижение
        elem.style.left = (elem.offsetLeft - shift.x) + 'px'; // ЕСЛИ ВМЕСТО elem.offsetLeft - shift.x СТАВЛЮ ПЕРЕМЕННУЮ newLeft ТО ВСЕ КРАШИТСЯ(!!!)

        // отрисовка линии отдельно для левого пина и отдельно для правого
        if (elem.classList.contains('range__btn--left')) {
          rangeFill.style.left = elem.offsetLeft + 'px';

          // динамическое изменение цены
          rangeMin.textContent = elem.offsetLeft;
        } else if (elem.classList.contains('range__btn--right')) {
          rangeFill.style.right = (rangeLine.offsetWidth - elem.offsetLeft) + 'px';

          // динамическое изменение цены
          rangeMax.textContent = elem.offsetLeft;
        }
      };
      // снимаем обработчики при отпускании кнопки мыши
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      // добавляем обрботчики на весь документ
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };

  pinMove(rangeRight);
  pinMove(rangeLeft);

})();
