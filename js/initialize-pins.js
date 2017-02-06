'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  pinMap.addEventListener('keydown', function (e) {
    if (isActivateEvent(e)) {
      eventHandlerPin(e);
    }
  });

  pinMap.addEventListener('click', function (e) {
    eventHandlerPin(e);
  });

  dialogClose.addEventListener('click', function (e) {
    e.preventDefault();
    hideDialog();
    removeActivePin();
  });

  /**
   * Функция-обработчик события клика или нажатия с клавиатуры
   * по одному из пинов (маркеры)
   * @param {MouseEvent} e Событие
   */
  function eventHandlerPin(e) {
    var pin = (e.target.classList.contains('pin')) ? e.target : e.target.parentElement;
    removeActivePin();
    addActivePin(pin);
    showDialog();
  }

  /**
   * На нажатый маркер добавляется класс активности
   * @param {HTMLDivElement} pin Нажатый маркер
   */
  function addActivePin(pin) {
    pin.classList.add('pin--active');
    toggleAriaPressed(pin);
  }

  /**
   * Ищем маркер, который активен в данный момент
   * Если таковой имеется, то деактивируем его
   */
  function removeActivePin() {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      toggleAriaPressed(pinActive);
    }
  }
  /**
   * Проверяем нажатие Enter
   * @param {KeyboardEvent} e
   * @return {Boolean} Возвращается true, если был нажат Enter
   */
  function isActivateEvent(e) {
    return e.keyCode === ENTER_KEY_CODE;
  }

  /**
   * Проверяем был ли нажат Escape
   * Если был, то скрываем окно диалога и деактивируем активный пин
   * @param {KeyboardEvent} e
   */
  function eventHandlerKeydownDialog(e) {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      removeActivePin();
      hideDialog();
    }
  }

  /**
   * Показываем окно диалога и добавляем
   * прослушку события нажатия на клавиатуру
   */
  function showDialog() {
    dialog.style.display = 'block';
    document.addEventListener('keydown', eventHandlerKeydownDialog);
  }

  /**
   * Скрываем окно диалога и удаляем
   * прослушку события нажатия на клавиатуру
   */
  function hideDialog() {
    dialog.style.display = 'none';
    document.removeEventListener('keydown', eventHandlerKeydownDialog);
  }

  /**
   * Переключаем состояние роли Button 'aria-pressed'
   * @param {HTMLDivElement} element
   */
  function toggleAriaPressed(element) {
    var pressed = (element.getAttribute('aria-pressed') === 'true');
    element.setAttribute('aria-pressed', !pressed);
  }
};
