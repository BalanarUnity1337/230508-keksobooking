'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');

  var filters = document.querySelector('.tokyo__filters-container');
  var filterType = filters.querySelector('#housing_type');
  var filterPrice = filters.querySelector('#housing_price');
  var filterRoomsNumber = filters.querySelector('#housing_room-number');
  var filterGuestsNumber = filters.querySelector('#housing_guests-number');
  var filterFeatures = filters.querySelectorAll('input[type=checkbox]');

  pinMap.addEventListener('keydown', function (e) {
    if (window.utils.isActivateEvent(e)) {
      eventHandlerKeydownPin(e);
    }
  });

  pinMap.addEventListener('click', eventHandlerClickPin);

  filters.addEventListener('change', eventHandlerChangeFilters);

  window.load(
      'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data',
      function (evt) {
        var similarApartments = evt.target.response;

        similarApartments.forEach(function (apartment) {
          pinMap.appendChild(window.renderPin(apartment));
        });

        eventHandlerChangeFilters();
      }
  );

  /**
   * Обработчик любых изменений, происходящих в блоке фильтров
   */
  function eventHandlerChangeFilters() {
    var pins = getPins();

    pins.forEach(function (pin) {
      var result = isMatchesType(pin.content) &&
        isMatchesPrice(pin.content) &&
        isMatchesRoomsNumber(pin.content) &&
        isMatchesGuestsNumber(pin.content) &&
        isMatchesFeatures(pin.content);

      if (!result) {
        pin.classList.add('pin--invisible');
      } else {
        pin.classList.remove('pin--invisible');
      }
    });

    /**
     * Получаем список всех маркеров
     * @return {Array} Массив маркеров без .pin__main
     */
    function getPins() {
      pins = document.querySelectorAll('.pin');
      return [].slice.call(pins, 1);
    }
  }

  /**
   * Функция сравнивает тип жилья, выбранного в фильтре, с типом,
   * который присутствует у карточки
   * @param {Object} data
   * @return {Boolean} true, если у карточки присутствует значение, которое выбрано в фильтре
   */
  function isMatchesType(data) {
    return (filterType.value === 'any') || (filterType.value === data.offer.type);
  }

  /**
   * Функция сравнивает цену, указанную в фильтре, с ценой,
   * которая указана на карточке
   * @param {Object} data
   * @return {Boolean} true, если у карточки присутствует значение, которое входит в диапазон выбранной цены в фильтре
   */
  function isMatchesPrice(data) {
    var result = false;

    switch (filterPrice.value) {
      case 'low':
        if (data.offer.price < 10000) {
          result = true;
        }
        break;
      case 'middle':
        if (data.offer.price >= 10000 && data.offer.price <= 50000) {
          result = true;
        }
        break;
      case 'hight':
        if (data.offer.price > 50000) {
          result = true;
        }
        break;
    }
    return result;
  }

  /**
   * Функция сравнивает кол-во комнат, указанных в фильтре, с тем,
   * что указано в карточке жилья
   * @param {Object} data
   * @return {Boolean} true, если кол-во комнат у карточки соответствует значению в фильтре
   */
  function isMatchesRoomsNumber(data) {
    return (filterRoomsNumber.value === 'any') || (filterRoomsNumber.value === data.offer.rooms);
  }

  /**
   * Функция сравнивает кол-во гостей, указанных в фильтре, с тем,
   * что указано в карточке жилья
   * @param {Object} data
   * @return {Boolean} true, если кол-во гостей у карточки соответствует значению в фильтре
   */
  function isMatchesGuestsNumber(data) {
    return (filterGuestsNumber.value === 'any') || (filterGuestsNumber.value === data.offer.guests);
  }

  /**
   * Функция проверяет удобства, указанные в фильтре, с удобствами, которые есть в карточке объявления
   * @param {Object} data
   * @return {Boolean} true, если удобства, указанные в фильтре, соответствуют удобствам в карточке объявления
   */
  function isMatchesFeatures(data) {
    var checkedFeatures = [].filter.call(filterFeatures, isFeatureChecked).map(getFeatureValue);

    return checkedFeatures.every(checkFeatures);

    /**
     * Функция принимает checkbox и проверяет, выбран он или нет
     * @param {HTMLInputElement} feature
     * @return {Boolean}
     */
    function isFeatureChecked(feature) {
      return feature.checked;
    }

    /**
     * Функция принимает checkbox и возвращает его значение
     * @param {HTMLInputElement} feature
     * @return {String}
     */
    function getFeatureValue(feature) {
      return feature.value;
    }

    /**
     * Функция принимает значения активных checkbox и
     * проверяет их наличие в карточке объявления
     * @param {HTMLInputElement} feature
     * @return {Boolean} true, если переданное значение найдено в карточке объявления
     */
    function checkFeatures(feature) {
      return (checkedFeatures.length === 0) || (data.offer.features.indexOf(feature) !== -1);
    }
  }

  /**
   * Функция-обработчик события клика по одному из пинов.
   * Функция вызывает showCard для открытия диалога вместе с коллбэком,
   * который уберет активный пин в случае закрытия диалога
   * @param {MouseEvent} e Нажатие мышкой
   */
  function eventHandlerClickPin(e) {
    var currentPin = (e.target.classList.contains('pin')) ? e.target : e.target.parentElement;
    if (currentPin !== pinMain) {
      removeActivePin();
      addActivePin(currentPin);

      window.showCard(removeActivePin, currentPin.content);
    }
  }

  /**
   * Функция-обработчик события нажатия Enter по одному из пинов.
   * Функция вызывает showCard для открытия диалога вместе с коллбэком,
   * который уберет активный пин и вернет на него фокус в случае закрытия диалога
   * @param {KeyboardEvent} e Нажатие с клавиатуры
   */
  function eventHandlerKeydownPin(e) {
    if (e.target !== pinMain) {
      removeActivePin();
      addActivePin(e.target);

      window.showCard(function () {
        returnFocusPin(e.target);
      }, e.target.content);
    }
  }

  /**
   * Функция удаляет активный маркер и возвращает на него фокус
   * @param {HTMLDivElement} currentPin Маркер, которому необходимо вернуть фокус при закрытии диалога
   */
  function returnFocusPin(currentPin) {
    removeActivePin();
    currentPin.focus();
  }

  /**
   * На нажатый маркер добавляется класс активности
   * @param {HTMLDivElement} currentPin Нажатый маркер
   */
  function addActivePin(currentPin) {
    currentPin.classList.add('pin--active');
    currentPin.setAttribute('aria-pressed', 'true');
  }

  /**
   * Ищем маркер, который активен в данный момент
   * Если таковой имеется, то деактивируем его
   */
  function removeActivePin() {
    var pinActive = document.querySelector('.pin--active');

    if (pinActive) {
      pinActive.classList.remove('pin--active');
      pinActive.setAttribute('aria-pressed', 'false');
    }
  }
})();
