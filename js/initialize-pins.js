'use strict';

window.initializePins = (function () {
  (function () {
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
      var changePinProperties = (e.type === 'keydown') ? function () {
        pin.focus();
        removeActivePin();
      } : function () {
        removeActivePin();
      };
      window.showCard(changePinProperties, addActivePin(pin));
    }

    /**
     * На нажатый маркер добавляется класс активности
     * @param {HTMLDivElement} pin Нажатый маркер
     */
    function addActivePin(pin) {
      pin.classList.add('pin--active');
      window.utils.toggleAriaPressed(pin);
    }

    /**
     * Ищем маркер, который активен в данный момент
     * Если таковой имеется, то деактивируем его
     */
    function removeActivePin() {
      var pinActive = document.querySelector('.pin--active');
      if (pinActive) {
        pinActive.classList.remove('pin--active');
        window.utils.toggleAriaPressed(pinActive);
      }
    }
  })();

  window.utils = (function () {
    var ENTER_KEY_CODE = 13;
    var ESCAPE_KEY_CODE = 27;

    return {
      /**
       * Переключаем состояние роли Button 'aria-pressed'
       * @param {HTMLDivElement} element
       */
      toggleAriaPressed: function (element) {
        var pressed = (element.getAttribute('aria-pressed') === 'true');
        element.setAttribute('aria-pressed', !pressed);
      },

      /**
       * Проверяем нажатие Enter
       * @param {KeyboardEvent} e
       * @return {Boolean} Возвращается true, если был нажат Enter
       */
      isActivateEvent: function (e) {
        return e.keyCode === ENTER_KEY_CODE;
      },

      /**
       * Проверяем был ли нажат Escape
       * Если был, то скрываем окно диалога и деактивируем активный пин
       * @param {KeyboardEvent} e
       * @return {Boolean} Возвращается true, если был нажат Escape
       */
      isDeactivateEvent: function (e) {
        return e.keyCode === ESCAPE_KEY_CODE;
      }
    };
  })();
})();
