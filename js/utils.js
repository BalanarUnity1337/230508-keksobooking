'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  return {
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
