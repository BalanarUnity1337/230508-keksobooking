'use strict';

var pins = document.querySelectorAll('.pin');
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

for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', eventHandlerClickPin);
}

dialogClose.addEventListener('click', function (e) {
  e.preventDefault();
  dialog.style.display = 'none';
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
 * Функция-обработчик события клика по одному из
 * элементов .pins[] (маркеры)
 * @param {HTMLDivElement} pin Маркер, который вызвал событие клика
 */
function eventHandlerClickPin() {
  removeActivePin();
  addActivePin(this);
  dialog.style.display = 'block';
}

/**
 * На нажатый маркер добавляется класс активности
 * @param {HTMLDivElement} pin Нажатый маркер
 */
function addActivePin(pin) {
  pin.classList.add('pin--active');
}

/**
 * Ищем маркер, который активен в данный момент
 * Если таковой имеется, то деактивируем его
 */
function removeActivePin() {
  var pinActive = document.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
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
