'use strict';

(function () {
  var MIN_PRICE = 0;
  var MAX_PRICE = 235;
  var sidebar = document.querySelector('.catalog__sidebar');
  var range = document.querySelector('.range');
  var rangeLine = document.querySelector('.range__filter');
  var rangeFill = range.querySelector('.range__fill-line');
  var rangeRight = range.querySelector('.range__btn--right');
  var rangeLeft = range.querySelector('.range__btn--left');
  var rangeMax = range.querySelector('.range__price--max');
  var rangeMin = range.querySelector('.range__price--min');
  var rangeCount = range.querySelector('.range__count');

  var catalogCards = document.querySelector('.catalog__cards');
  var inputsFilter = sidebar.querySelectorAll('input');

  var fragment = document.createDocumentFragment();

  var filteredByKind = [];
  // var filteredByType = [];

  var uncheckedInput = function (items) {
    items.forEach(function (item) {
      item.checked = false;
    });
  };

  // удаление всех карточек
  var removeItems = function () {
    while (catalogCards.firstChild) {
      catalogCards.removeChild(catalogCards.firstChild);
    }
  };

  // функция показа блока с пустым значением примененных фильтров
  var showEmptyFilters = function () {
    var notFound = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter').cloneNode(true);
    var btnSubmit = notFound.querySelector('.catalog__show-all');
    removeItems();
    catalogCards.appendChild(notFound);
    uncheckedInput(inputsFilter);

    btnSubmit.addEventListener('click', function (evt) {
      evt.preventDefault();
      showAll(evt, window.data.catalog);
    });
  };

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
          rangeFill.style.right = (rangeLine.offsetWidth - elem.offsetWidth - newLeft) + 'px';
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

        filterByPriceSlider(window.data.catalog);
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

  var addCardToFragment = function (good, frag) {
    var card = window.data.createDomCard(good);
    frag.appendChild(card);
  };

  // фильтр по типу продукта
  var filterByKind = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    var tag = evt.target;
    var parent = tag.closest('.input-btn');
    var input = parent.querySelector('.input-btn__input');
    if (input.checked) {
      input.checked = false;
    } else {
      input.checked = true;
    }
    removeItems();
    // так как товар имеет ОДИН тип продукта, если он ранее был уже отфильтрован по какому-либо типу, показываем блок с пустым фильтром и выходим из функции, другое поведение нелогично и в тз иное не прописано. Написано, что можно выбрать одновременно два типа на фильтрацию, но дальнейшее поведение не указано
    if (filteredByKind.length > 0) {
      showEmptyFilters();
      filteredByKind = [];
      return;
    } else if (filteredByKind.length === 0) {
      Object.keys(items)
      .forEach(function (id) {
        if (items[id].good.kind === target) {
          filteredByKind.push(items[id].good);
          addCardToFragment(items[id].good, fragment);
        }
      });
      catalogCards.appendChild(fragment);
    }
  });

  // фильтр по сахару, глютену и вегетарианству
  var filterByFact = window.utils.debounce(function (evt, items, fact) {
    var tag = evt.target;
    var parent = tag.closest('.input-btn');
    var input = parent.querySelector('.input-btn__input');
    if (input.checked) {
      input.checked = false;
    } else {
      input.checked = true;
    }
    removeItems();
    Object.keys(items)
        .forEach(function (id) {
          var isVegetarian = (fact === 'vegetarian' && items[id].good.nutritionFacts[fact]);
          var noSugarOrGluten = (fact !== 'vegetarian' && !items[id].good.nutritionFacts[fact]);
          if (isVegetarian || noSugarOrGluten) {
            addCardToFragment(items[id].good, fragment);
          }
        });
    catalogCards.appendChild(fragment);
  });

  // фильтр по наличию
  var filterByAvailability = window.utils.debounce(function (evt, items) {
    removeItems();
    uncheckedInput(inputsFilter);
    var tag = evt.target;
    var parent = tag.closest('.input-btn');
    Object.keys(items)
    .forEach(function (id) {
      if (items[id].good.amount > 0) {
        parent.querySelector('.input-btn__input').checked = true;
        addCardToFragment(items[id].good, fragment);
      }
    });
    catalogCards.appendChild(fragment);
    if ((catalogCards.querySelectorAll('.catalog__card')).length === 0) {
      showEmptyFilters();
    }
  });

  // фильтр по избранному
  var filterBySelected = window.utils.debounce(function (evt, items) {
    removeItems();
    uncheckedInput(inputsFilter);
    var tag = evt.target;
    var parent = tag.closest('.input-btn');
    Object.keys(items)
    .forEach(function (id) {
      parent.querySelector('.input-btn__input').checked = true;
      if (items[id].good.isFavorite) {
        addCardToFragment(items[id].good, fragment);
      }
    });
    catalogCards.appendChild(fragment);
    if ((catalogCards.querySelectorAll('.catalog__card')).length === 0) {
      showEmptyFilters();
    }
  });

  // фильтр "показать все"
  var showAll = window.utils.debounce(function (items) {
    removeItems();
    uncheckedInput(inputsFilter);
    Object.keys(items)
    .forEach(function (id) {
      addCardToFragment(items[id].good, fragment);
    });
    catalogCards.appendChild(fragment);
  });

  var compareMax = function (a, b) {
    if (a.price > b.price) {
      return -1;
    } else if (a.price < b.price) {
      return 1;
    }
    return 0;
  };

  var compareMin = function (a, b) {
    if (a.price < b.price) {
      return -1;
    } else if (a.price > b.price) {
      return 1;
    }
    return 0;
  };

  var compareRating = function (a, b) {
    if (a.rating.value > b.rating.value) {
      return -1;
    } else if (a.rating.value < b.rating.value) {
      return 1;
    } else if (a.rating.value === b.rating.value && a.rating.number > b.rating.number) {
      return -1;
    } else if (a.rating.value === b.rating.value && a.rating.number < b.rating.number) {
      return 1;
    }
    return 0;
  };

  // фильтр по цене
  var filterByPrice = window.utils.debounce(function (evt, items, value) {
    var priceArr = [];
    var tag = evt.target;
    var parent = tag.closest('.input-btn');
    removeItems();
    uncheckedInput(inputsFilter);
    Object.keys(items)
    .forEach(function (id) {
      priceArr.push(items[id].good);
    });
    switch (value) {
      case 'max': priceArr.sort(compareMax);
        break;
      case 'min': priceArr.sort(compareMin);
        break;
    }
    priceArr.forEach(function (_, i) {
      parent.querySelector('.input-btn__input').checked = true;
      addCardToFragment(priceArr[i], fragment);
    });
    catalogCards.appendChild(fragment);
  });

  // фильтр по популярности
  var filterByPopular = window.utils.debounce(function (evt, items) {
    var ratingArr = [];
    removeItems();
    var tag = evt.target;
    var parent = tag.closest('.input-btn');
    parent.querySelector('.input-btn__input').checked = true;
    uncheckedInput(inputsFilter);
    Object.keys(items)
    .forEach(function (id) {
      ratingArr.push(items[id].good);
    });
    ratingArr.sort(compareRating);
    ratingArr.forEach(function (_, i) {
      addCardToFragment(ratingArr[i], fragment);
    });
    catalogCards.appendChild(fragment);
  });

  var filterByPriceSlider = window.utils.debounce(function (items) {
    var filteredItems = [];
    removeItems();
    Object.keys(items)
    .forEach(function (id) {
      if (items[id].good.price <= rangeMax.innerText && items[id].good.price >= rangeMin.innerText) {
        filteredItems.push(items[id].good);
      }
    });
    rangeCount.textContent = '(' + filteredItems.length + ')';
    filteredItems.forEach(function (_, i) {
      addCardToFragment(filteredItems[i], fragment);
    });
    catalogCards.appendChild(fragment);
    if ((catalogCards.querySelectorAll('.catalog__card')).length === 0) {
      showEmptyFilters();
    }
  });

  // хэндлер для работы с фильтрами в баре
  var filterBtnsHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.innerText;
    if (target === 'Мороженое' || target === 'Газировка' || target === 'Жевательная резинка' || target === 'Мармелад' || target === 'Зефир') {
      filterByKind(evt, window.data.catalog);
    } else if (target === 'Без сахара') {
      filterByFact(evt, window.data.catalog, 'sugar');
    } else if (target === 'Безглютеновое') {
      filterByFact(evt, window.data.catalog, 'gluten');
    } else if (target === 'Вегетарианское') {
      filterByFact(evt, window.data.catalog, 'vegetarian');
    } else if (target === 'В наличии') {
      filterByAvailability(evt, window.data.catalog);
    } else if (target === 'Только избранное') {
      filterBySelected(evt, window.data.catalog);
    } else if (target === 'Показать всё') {
      showAll(window.data.catalog);
    } else if (target === 'Сначала дорогие') {
      filterByPrice(evt, window.data.catalog, 'max');
    } else if (target === 'Сначала дешёвые') {
      filterByPrice(evt, window.data.catalog, 'min');
    } else if (target === 'По рейтингу') {
      filterByPopular(evt, window.data.catalog);
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
    rangeCount.textContent = '(' + (Object.keys(items)).length + ')';
  };

  var init = function () {
    rangeMax.textContent = MAX_PRICE;
    rangeMin.textContent = MIN_PRICE;
    rangeFill.style.right = MIN_PRICE + 'px';
    rangeFill.style.left = MIN_PRICE + 'px';
    rangeRight.style.left = MAX_PRICE + 'px';
    rangeLeft.style.left = MIN_PRICE + 'px';
  };


  init();
  pinMove(rangeRight);
  pinMove(rangeLeft);

  sidebar.addEventListener('click', filterBtnsHandler);

  window.filters = {
    initCountKind: initCountKind
  };

})();
