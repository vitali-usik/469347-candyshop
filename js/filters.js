'use strict';

(function () {
  var range = document.querySelector('.range');
  var rangeLine = document.querySelector('.range__filter');
  var rangeFill = range.querySelector('.range__fill-line');
  var rangeRight = range.querySelector('.range__btn--right');
  var rangeLeft = range.querySelector('.range__btn--left');
  var rangeMax = range.querySelector('.range__price--max');
  var rangeMin = range.querySelector('.range__price--min');

  // функция движения ползунка слейдера
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
        if (newLeft < 0) {
          newLeft = 0;
        } else if (newLeft > rightEdge) {
          // если курсор вышел за правую границу слайдера
          newLeft = rightEdge;
        }
        // отрисовываем передвижение
        elem.style.left = newLeft + 'px';

        // отрисовка линии отдельно для левого пина и отдельно для правого
        if (elem.classList.contains('range__btn--left')) {
          rangeFill.style.left = newLeft + 'px';
          // если левый пин заходит за правый
          if (rangeRight.offsetLeft < newLeft) {
            newLeft = rangeRight.offsetLeft;
            elem.style.left = newLeft + 'px';
            rangeMin.textContent = newLeft;
            return;
          }
          // динамическое изменение цены
          rangeMin.textContent = newLeft;
        } else if (elem.classList.contains('range__btn--right')) {
          rangeFill.style.right = (rangeLine.offsetWidth - newLeft) + 'px';
          // если правый пин заходит за левый
          if (rangeLeft.offsetLeft > newLeft) {
            newLeft = rangeLeft.offsetLeft;
            elem.style.left = newLeft + 'px';
            rangeMax.textContent = newLeft;
            return;
          }
          // динамическое изменение цены
          rangeMax.textContent = newLeft;
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
