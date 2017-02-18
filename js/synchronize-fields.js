'use strict';

/**
 * Функция принимает на вход два поля, на каждое из которых навешивается
 * событие change для синхронизации их значений, полученных из двух
 * переданных массивов, по определенному свойству
 * @param {HTMLSelectElement|HTMLInputElement} syncField1 Первое синхронизируемое поле
 * @param {HTMLSelectElement|HTMLInputElement} syncField2 Второе синхронизируемое поле
 * @param {Array} syncValues1 Массив синхронизируемых значений первого поля
 * @param {Array} syncValues2 Массив синхронизируемых значений второго поля
 */
window.synchronizeFields = (function () {
  return function (syncField1, syncField2, syncValues1, syncValues2, callback) {
    syncField1.addEventListener('change', function () {
      var indexOfSelectedValue = syncValues1.indexOf(syncField1.value);
      if (typeof callback === 'function') {
        callback(syncField2, syncValues2[indexOfSelectedValue]);
      }
    });
  };
})();
