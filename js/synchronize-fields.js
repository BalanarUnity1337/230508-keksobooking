'use strict';

/**
 * Функция принимает на вход два поля, на каждое из которых навешивается
 * событие change для синхронизации их значений, полученных из двух
 * переданных массивов, по определенному свойству
 * @param {HTMLSelectElement|HTMLInputElement} syncField1 Первое синхронизируемое поле
 * @param {HTMLSelectElement|HTMLInputElement} syncField2 Второе синхронизируемое поле
 * @param {Array} syncValues1 Массив синхронизируемых значений первого поля
 * @param {Array} syncValues2 Массив синхронизируемых значений второго поля
 * @param {String} syncProperty Свойство поля, которое необходимо синхронизировать
 */
window.synchronizeFields = (function () {
  return function (syncField1, syncField2, syncValues1, syncValues2, syncProperty) {
    syncField1.addEventListener('change', syncField2WithField1);
    syncField2.addEventListener('change', syncField1WithField2);

    /**
     * Синхронизация полей при загрузке страницы
     */
    syncField2WithField1();
    syncField1WithField2();

    /**
     * Функция синхронизирует второе поле с первым
     */
    function syncField2WithField1() {
      var indexOfSelectedValue = syncValues1.indexOf(syncField1.value);
      syncField2[syncProperty] = syncValues2[indexOfSelectedValue];
    }

    /**
     * Функция синхронизирует первое поле со вторым
     */
    function syncField1WithField2() {
      var indexOfSelectedValue = syncValues2.indexOf(syncField2.value);
      syncField1[syncProperty] = syncValues1[indexOfSelectedValue];
    }
  };
})();
