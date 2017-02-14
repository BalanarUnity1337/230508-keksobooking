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

  window.synchronizeFields(formTime, formTimeout, ['12', '13', '14'], ['12', '13', '14'], 'value', synchronizeFields);
  window.synchronizeFields(formTimeout, formTime, ['12', '13', '14'], ['12', '13', '14'], 'value', synchronizeFields);
  window.synchronizeFields(formType, formPrice, ['flat', 'bungalow', 'palace'], ['1000', '0', '10000'], 'min', synchronizeFields);
  window.synchronizeFields(formPrice, formType, ['1000', '0', '10000'], ['flat', 'bungalow', 'palace'], 'min', synchronizeFields);
  window.synchronizeFields(formRoomNumber, formCapacity, ['1', '2', '100'], ['0', '3', '3'], 'value', synchronizeFields);
  window.synchronizeFields(formCapacity, formRoomNumber, ['0', '3', '3'], ['1', '2', '100'], 'value', synchronizeFields);

  /**
   * Функция синхронизирует второе поле с первым
   * @param {HTMLSelectElement|HTMLInputElement} syncField1 Первое синхронизируемое поле
   * @param {HTMLSelectElement|HTMLInputElement} syncField2 Второе синхронизируемое поле
   * @param {Array} syncValues1 Массив синхронизируемых значений первого поля
   * @param {Array} syncValues2 Массив синхронизируемых значений второго поля
   * @param {String} syncProperty Свойство поля, которое снихронизируется
   */
  function synchronizeFields(syncField1, syncField2, syncValues1, syncValues2, syncProperty) {
    var indexOfSelectedValue = syncValues1.indexOf(syncField1.value);
    syncField2[syncProperty] = syncValues2[indexOfSelectedValue];
  }
})();
