'use strict';

(function () {
  var sidebar = document.querySelector('.catalog__sidebar');
  var range = document.querySelector('.range');
  var rangeLine = document.querySelector('.range__filter');
  var rangeFill = range.querySelector('.range__fill-line');
  var rangeRight = range.querySelector('.range__btn--right');
  var rangeLeft = range.querySelector('.range__btn--left');
  var rangeMax = range.querySelector('.range__price--max');
  var rangeMin = range.querySelector('.range__price--min');

  var catalogCards = document.querySelector('.catalog__cards');
  // var catalog = document.querySelector('.catalog__cards-wrap');
  // var notFound = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter').cloneNode(true);

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

  // фильтр по типу продукта
  var filterByKind = function (evt, items) {
    evt.preventDefault();
    var target = evt.target.innerText;
    // var count = 0;
    Object.keys(items)
    .forEach(function (id) {
      items[id].card.remove();
      if (items[id].good.kind === target) {
        // count++;
        catalogCards.appendChild(items[id].card);
      }
      return items[id].good;
    });
  };


  // фильтр по сахару и глютену
  var filterByFacts = function (evt, items, fact) {
    evt.preventDefault();
    Object.keys(items)
    .forEach(function (id) {
      items[id].card.remove();
      if (items[id].good.nutritionFacts[fact] === false) {
        catalogCards.appendChild(items[id].card);
      }
      return items[id].good;
    });
  };

  // фильтр по вегетаринству
  var filterByVegan = function (evt, items) {
    evt.preventDefault();
    Object.keys(items)
    .forEach(function (id) {
      items[id].card.remove();
      if (items[id].good.nutritionFacts['vegetarian'] === true) {
        catalogCards.appendChild(items[id].card);
      }
      return items[id].good;
    });
  };

  // фильтр по наличию
  var filterByAvailability = function (evt, items) {
    evt.preventDefault();
    Object.keys(items)
    .forEach(function (id) {
      items[id].card.remove();
      if (items[id].good.amount > 0) {
        catalogCards.appendChild(items[id].card);
      }
      return items[id].good;
    });
  };

  // фильтр по избранному
  var filterBySelected = function (evt, items) {
    evt.preventDefault();
    Object.keys(items)
    .forEach(function (id) {
      items[id].card.remove();
      var select = items[id].card.getAttribute('data-selected');
      if (select === 'true') {
        catalogCards.appendChild(items[id].card);
      }
      return items[id].good;
    });
  };

  // фильтр "показать все"
  var showAll = function (evt, items) {
    evt.preventDefault();
    Object.keys(items)
    .forEach(function (id) {
      catalogCards.appendChild(items[id].card);
    });
  };

  var filterByMinPrice = function () {

  };

  var filterBtnsHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.innerText;
    if (target === 'Мороженное' || target === 'Газировка' || target === 'Жевательная резинка' || target === 'Мармелад' || target === 'Зефир') {
      filterByKind(evt, window.data.catalog);
    }
    if (target === 'Без сахара') {
      filterByFacts(evt, window.data.catalog, 'sugar');
    }
    if (target === 'Безглютеновое') {
      filterByFacts(evt, window.data.catalog, 'gluten');
    }
    if (target === 'Вегетарианское') {
      filterByVegan(evt, window.data.catalog);
    }
    if (target === 'В наличии') {
      filterByAvailability(evt, window.data.catalog);
    }
    if (target === 'Только избранное') {
      filterBySelected(evt, window.data.catalog);
    }
    if (target === 'Показать всё') {
      showAll(evt, window.data.catalog);
    }
    if (target === 'Сначала популярные') {
      filterByMinPrice(evt, window.data.catalog);
    }
  };

  pinMove(rangeRight);
  pinMove(rangeLeft);

  sidebar.addEventListener('click', filterBtnsHandler);


})();
