'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  pinMap.addEventListener('keydown', function (e) {
    if (window.utils.isActivateEvent(e)) {
      eventHandlerKeydownPin(e);
    }
  });

  pinMap.addEventListener('click', eventHandlerClickPin);

  /**
   * Функция-обработчик события клика по одному из пинов.
   * Функция вызывает showCard для открытия диалога вместе с коллбэком,
   * который уберет активный пин в случае закрытия диалога
   * @param {MouseEvent} e Нажатие мышкой
   */
  function eventHandlerClickPin(e) {
    var pin = (e.target.classList.contains('pin')) ? e.target : e.target.parentElement;

    removeActivePin();
    addActivePin(pin);

    window.showCard(removeActivePin);
  }

  /**
   * Функция-обработчик события нажатия Enter по одному из пинов.
   * Функция вызывает showCard для открытия диалога вместе с коллбэком,
   * который уберет активный пин и вернет на него фокус в случае закрытия диалога
   * @param {KeyboardEvent} e Нажатие с клавиатуры
   */
  function eventHandlerKeydownPin(e) {
    removeActivePin();
    addActivePin(e.target);

    window.showCard(function () {
      returnFocusPin(e.target);
    });
  }

  /**
   * Функция удаляет активный маркер и возвращает на него фокус
   * @param {HTMLDivElement} pin Маркер, которому необходимо вернуть фокус при закрытии диалога
   */
  function returnFocusPin(pin) {
    removeActivePin();
    pin.focus();
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
