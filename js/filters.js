'use strict';

(function () {
  var range = document.querySelector('.range');

  range.addEventListener('mouseup', function () {
    var rangeLine = document.querySelector('.range__filter');
    var rangeRight = range.querySelector('.range__btn--right');
    var rangeLeft = range.querySelector('.range__btn--left');
    var rangeMax = range.querySelector('.range__price--max');
    var rangeMin = range.querySelector('.range__price--min');

    rangeMax.textContent = Math.ceil(100 * (rangeRight.offsetLeft + rangeRight.offsetWidth) / rangeLine.offsetWidth);
    rangeMin.textContent = Math.floor(100 * (rangeLeft.offsetLeft) / rangeLine.offsetWidth);
  });
})();
