'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var formTitle = form.querySelector('#title');
  var formPrice = form.querySelector('#price');
  var formAddress = form.querySelector('#address');
  var formTime = form.querySelector('#time');
  var formTimeout = form.querySelector('#timeout');
  var formType = form.querySelector('#type');
  var formRoomNumber = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');

  formPrice.required = true;
  formPrice.max = 1000000;
  formPrice.min = 1000;
  formTitle.required = true;
  formTitle.minLength = 30;
  formTitle.maxLength = 100;
  formAddress.required = true;

  window.synchronizeFields(formTime, formTimeout, ['12', '13', '14'], ['12', '13', '14'], syncPropertyValue);
  window.synchronizeFields(formTimeout, formTime, ['12', '13', '14'], ['12', '13', '14'], syncPropertyValue);
  window.synchronizeFields(formType, formPrice, ['flat', 'bungalow', 'palace'], ['1000', '0', '10000'], syncPropertyMin);
  window.synchronizeFields(formRoomNumber, formCapacity, ['1', '2', '100'], ['0', '3', '3'], syncPropertyValue);
  window.synchronizeFields(formCapacity, formRoomNumber, ['0', '3', '3'], ['1', '2', '100'], syncPropertyValue);

  /**
   *
   * @param {HTMLSelectElement|HTMLInputElement} element Поле, которое синхронизируется
   * @param {String} value Значение, которое необходимо присвоить полю
   */
  function syncPropertyValue(element, value) {
    element.value = value;
  }

  /**
   *
   * @param {HTMLSelectElement} element Поле, которое синхронизируется
   * @param {String} value Значение, которое необходимо присвоить полю
   */
  function syncPropertyMin(element, value) {
    element.min = value;
  }
})();
