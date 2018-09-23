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
        y: evt.clientY
      };
      // создаем функцию отслеживания передвижения мышки
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        // координаты передвижения мышки
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        // если курсор вышел за левую границу слайдера
        if ((elem.offsetLeft - shift.x) < 1) {
          elem.style.left = 0 + 'px';
        }
        // находим правую границу слайдера
        var rightEdge = rangeLine.offsetWidth - elem.offsetWidth;
        // если курсор вышел за правую границу слайдера
        if ((elem.offsetLeft - shift.x) > rightEdge) {
          elem.style.left = rightEdge + 'px';
        }
        // отрисовываем передвижение
        elem.style.left = (elem.offsetLeft - shift.x) + 'px';

        // отрисовка линии отдельно для левого пина и отдельно для правого
        if (elem.classList.contains('range__btn--left')) {
          rangeFill.style.left = Math.ceil(100 * (elem.offsetLeft - shift.x + elem.offsetWidth / 2) / rangeLine.offsetWidth) + '%';

          // динамическое изменение цены
          rangeMin.textContent = Math.floor(100 * (elem.offsetLeft + (elem.offsetWidth / 2) - shift.x) / rangeLine.offsetWidth);
        } else if (elem.classList.contains('range__btn--right')) {
          rangeFill.style.right = 100 - Math.floor(100 * (elem.offsetLeft - shift.x + elem.offsetWidth / 2) / rangeLine.offsetWidth) + '%';

          // динамическое изменение цены
          rangeMax.textContent = Math.ceil(100 * (elem.offsetLeft + (elem.offsetWidth / 2) - shift.x) / rangeLine.offsetWidth);
        }
        /* console.log((elem.offsetLeft - shift.x) + 'px');
        console.log('percentage' + Math.ceil(100 * (elem.offsetLeft - shift.x) / rangeLine.offsetWidth) + '%'); */
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
