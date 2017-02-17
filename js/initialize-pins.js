'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  pinMap.addEventListener('keydown', function (e) {
    if (window.utils.isActivateEvent(e)) {
      eventHandlerPin(e);
    }
  });

  pinMap.addEventListener('click', eventHandlerPin);

  /**
   * Функция-обработчик события клика или нажатия с клавиатуры
   * по одному из пинов (маркеры)
   * @param {MouseEvent|KeyboardEvent} e Событие
   */
  function eventHandlerPin(e) {
    var pin = (e.target.classList.contains('pin')) ? e.target : e.target.parentElement;
    removeActivePin();
    addActivePin(pin);
    var changePinProperties = (e.type === 'keydown') ? function () {
      pin.focus();
      removeActivePin();
    } : function () {
      removeActivePin();
    };
    window.showCard(changePinProperties);
  }

  /**
   * На нажатый маркер добавляется класс активности
   * @param {HTMLDivElement} pin Нажатый маркер
   */
  function addActivePin(pin) {
    pin.classList.add('pin--active');
    pin.setAttribute('aria-pressed', 'true');
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
