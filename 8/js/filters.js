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

  var fragment = document.createDocumentFragment();


  // функция движения ползунка слайдера
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

  var removeItems = function () {
    while (catalogCards.firstChild) {
      catalogCards.removeChild(catalogCards.firstChild);
    }
  };

  // фильтр по типу продукта
  var filterByKind = function (evt, items) {
    evt.preventDefault();
    var target = evt.target.innerText;
    removeItems();
    Object.keys(items)
    .forEach(function (id) {
      if (items[id].good.kind === target) {
        var card = window.data.createDomCard(items[id].good);
        fragment.appendChild(card);
      }
    });
    catalogCards.appendChild(fragment);
  };

  // фильтр по сахару и глютену
  var filterByFacts = function (items, fact) {
    removeItems();
    Object.keys(items)
    .forEach(function (id) {
      if (!items[id].good.nutritionFacts[fact]) {
        var card = window.data.createDomCard(items[id].good);
        fragment.appendChild(card);
      }
    });
    catalogCards.appendChild(fragment);
  };

  // фильтр по вегетаринству
  var filterByVegan = function (items) {
    removeItems();
    Object.keys(items)
    .forEach(function (id) {
      if (items[id].good.nutritionFacts['vegetarian']) {
        var card = window.data.createDomCard(items[id].good);
        fragment.appendChild(card);
      }
    });
    catalogCards.appendChild(fragment);
  };

  // фильтр по наличию
  var filterByAvailability = function (items) {
    Object.keys(items)
    .forEach(function (id) {
      items[id].card.remove();
      if (items[id].good.amount > 0) {
        catalogCards.appendChild(items[id].card);
      }
    });
  };

  // фильтр по избранному
  var filterBySelected = function (items) {
    Object.keys(items)
    .forEach(function (id) {
      items[id].card.remove();
      if (items[id].good.isFavorite) {
        catalogCards.appendChild(items[id].card);
      }
    });
  };

  // фильтр "показать все"
  var showAll = function (items) {
    Object.keys(items)
    .forEach(function (id) {
      items[id].card.remove();
      catalogCards.appendChild(items[id].card);
    });
  };


  // счетчик для различных типов товаров
  var fillTypes = function (items) {
    window.data.nutritionFacts['Без сахара'] = 0;
    window.data.nutritionFacts['Безглютеновое'] = 0;
    window.data.nutritionFacts['Вегетарианское'] = 0;
    Object.keys(items).forEach(function (id) {
      if (window.data.types[items[id].good.kind]) {
        window.data.types[items[id].good.kind]++;
      } else {
        window.data.types[items[id].good.kind] = 1;
      }
      if (!items[id].good.nutritionFacts.sugar) {
        window.data.nutritionFacts['Без сахара']++;
      }
      if (!items[id].good.nutritionFacts.gluten) {
        window.data.nutritionFacts['Безглютеновое']++;
      }
      if (items[id].good.nutritionFacts.vegetarian) {
        window.data.nutritionFacts['Вегетарианское']++;
      }
    });
  };

  var filterBtnsHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.innerText;
    if (target === 'Мороженое' || target === 'Газировка' || target === 'Жевательная резинка' || target === 'Мармелад' || target === 'Зефир') {
      filterByKind(evt, window.data.catalog);
    } else if (target === 'Без сахара') {
      filterByFacts(window.data.catalog, 'sugar');
    } else if (target === 'Безглютеновое') {
      filterByFacts(window.data.catalog, 'gluten');
    } else if (target === 'Вегетарианское') {
      filterByVegan(window.data.catalog);
    } else if (target === 'В наличии') {
      filterByAvailability(window.data.catalog);
    } else if (target === 'Только избранное') {
      filterBySelected(window.data.catalog);
    } else if (target === 'Показать всё' || target === 'Сначала популярные') {
      showAll(window.data.catalog);
    }
  };

  pinMove(rangeRight);
  pinMove(rangeLeft);

  sidebar.addEventListener('click', filterBtnsHandler);

  window.filters = {
    fillTypes: fillTypes
  };


})();
