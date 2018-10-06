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
  // удаление всех карточек
  var removeItems = function () {
    while (catalogCards.firstChild) {
      catalogCards.removeChild(catalogCards.firstChild);
    }
  };

  // фильтр по типу продукта
  var filterByKind = function (evt, items) {
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

  // фильтр по сахару, глютену и вегетарианству
  var filteByFact = function (items, fact) {
    removeItems();
    Object.keys(items)
        .forEach(function (id) {
          var isVegetarian = (fact === 'vegetarian' && items[id].good.nutritionFacts[fact]);
          var noSugarOrGluten = (fact !== 'vegetarian' && !items[id].good.nutritionFacts[fact]);
          if (isVegetarian || noSugarOrGluten) {
            var card = window.data.createDomCard(items[id].good);
            fragment.appendChild(card);
          }
        });
    catalogCards.appendChild(fragment);
  };

  // фильтр по наличию
  var filterByAvailability = function (items) {
    removeItems();
    Object.keys(items)
    .forEach(function (id) {
      if (items[id].good.amount > 0) {
        var card = window.data.createDomCard(items[id].good);
        fragment.appendChild(card);
      }
    });
    catalogCards.appendChild(fragment);
  };

  // фильтр по избранному
  var filterBySelected = function (items) {
    removeItems();
    Object.keys(items)
    .forEach(function (id) {
      if (items[id].good.isFavorite) {
        var card = window.data.createDomCard(items[id].good);
        fragment.appendChild(card);
      }
    });
    catalogCards.appendChild(fragment);
  };

  // фильтр "показать все"
  var showAll = function (items) {
    removeItems();
    Object.keys(items)
    .forEach(function (id) {
      var card = window.data.createDomCard(items[id].good);
      fragment.appendChild(card);
    });
    catalogCards.appendChild(fragment);
  };

  /* var filterByMaxPrice = function (items) {
    Object.keys(items)
    .forEach(function (id) {
      Object.keys(items[id].good)
      .sort(function (a, b) {
        return items[id].good.price[b] - items[id].good.price[a];
      });
    });
  }; */

  /* var showEmptyFilters = function () {
    var catalog = document.querySelector('.catalog__cards-wrap');
    var notFound = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter').cloneNode(true);
    var btnSubmit = notFound.querySelector('.catalog__show-all');
    catalog.appendChild(notFound);

    btnSubmit.addEventListener('click', function (evt) {
      evt.preventDefault();
      showAll(window.data.catalog);
    });
  }; */


  // хэндлер для работы с фильтрами в баре
  var filterBtnsHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.innerText;
    if (target === 'Мороженое' || target === 'Газировка' || target === 'Жевательная резинка' || target === 'Мармелад' || target === 'Зефир') {
      filterByKind(evt, window.data.catalog);
    } else if (target === 'Без сахара') {
      filteByFact(window.data.catalog, 'sugar');
    } else if (target === 'Безглютеновое') {
      filteByFact(window.data.catalog, 'gluten');
    } else if (target === 'Вегетарианское') {
      filteByFact(window.data.catalog, 'vegetarian');
    } else if (target === 'В наличии') {
      filterByAvailability(window.data.catalog);
    } else if (target === 'Только избранное') {
      filterBySelected(window.data.catalog);
    } else if (target === 'Показать всё' || target === 'Сначала популярные') {
      showAll(window.data.catalog);
    } else if (target === 'Сначала дорогие') {
      // showEmptyFilters();
    }
  };

  // показывает количество товаров, подходящих под конкретные фильтры
  var initCountKind = function (labels, inputs, items) {
    labels.forEach(function (_, i) {
      var currentType = labels[i].innerText;
      if (window.data.types[currentType]) {
        inputs[i].textContent = '(' + window.data.types[currentType] + ')';
      }
      if (window.data.nutritionFacts[currentType]) {
        inputs[i].textContent = '(' + window.data.nutritionFacts[currentType] + ')';
      }
      if (currentType === 'Только избранное') {
        inputs[i].textContent = '(' + 0 + ')';
      }
      if (currentType === 'В наличии') {
        inputs[i].textContent = '(' + (Object.keys(items)).length + ')';
      }
    });
  };

  pinMove(rangeRight);
  pinMove(rangeLeft);

  sidebar.addEventListener('click', filterBtnsHandler);

  window.filters = {
    initCountKind: initCountKind
  };

})();
