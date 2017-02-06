'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');
var form = document.querySelector('.notice__form');
var formTitle = form.querySelector('#title');
var formPrice = form.querySelector('#price');
var formAddress = form.querySelector('#address');
var formTime = form.querySelector('#time');
var formTimeout = form.querySelector('#timeout');
var formType = form.querySelector('#type');
var formRoomNumber = form.querySelector('#room_number');
var formCapacity = form.querySelector('#capacity');
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

/**
 * При загрузке окна происходит первичная валидация:
 * минимальное значение цены за ночь и количество мест
 * должны скорректироваться сразу, т.к. option по умолчанию
 * может быть и другой
 */
window.addEventListener('load', function () {
  formPriceValidation();
  formCapacityValidation();
  formPrice.required = true;
  formPrice.max = 1000000;
  formTitle.required = true;
  formTitle.minLength = 30;
  formTitle.maxLength = 100;
  formAddress.required = true;
});

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

formTime.addEventListener('change', function () {
  formTimeout.selectedIndex = formTime.selectedIndex;
});

formTimeout.addEventListener('change', function () {
  formTime.selectedIndex = formTimeout.selectedIndex;
});

formType.addEventListener('change', function () {
  formPriceValidation();
});

formRoomNumber.addEventListener('change', function () {
  formCapacityValidation();
});

formCapacity.addEventListener('change', function () {
  formRoomNumber.selectedIndex = (formCapacity.selectedIndex === 0) ? 1 : 0;
});

/**
 * Функция-обработчик события клика или нажатия с клавиатуры
 * по одному из пинов (маркеры)
 * @param {MouseEvent} e Событие
 */
function eventHandlerPin(e) {
  // var pin = e.target;
  // if (e.path.length === 11) {
  //   pin = e.path[1];
  // }
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
 * Автокорректировка полей #capacity (Количество комнат) и #room_number (Количество мест)
 */
function formCapacityValidation() {
  formCapacity.selectedIndex = (formRoomNumber.selectedIndex === 0) ? 1 : 0;
}

/**
 * Корректировка минимального значения поля #price (Цена за ночь)
 * в зависимости от выбранного типа жилья
 */
function formPriceValidation() {
  var formTypeSelectedOption = formType.selectedIndex;
  switch (formTypeSelectedOption) {
    case 0:
      formPrice.min = 1000;
      break;
    case 1:
      formPrice.min = 0;
      break;
    case 2:
      formPrice.min = 10000;
      break;
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
