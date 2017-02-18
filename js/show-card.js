'use strict';

window.showCard = (function () {
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var onDialogClose;

  /**
   * Показываем окно диалога и добавляем
   * прослушку события нажатия на клавиатуру
   * @param {HTMLDivElement} pin Текущий нажатый маркер
   */
  function showDialog() {
    dialog.classList.remove('dialog--invisible');
    dialogClose.focus();
    document.addEventListener('keydown', eventHandlerKeydownDialog);
  }

  /**
   * Скрываем окно диалога и удаляем
   * прослушку события нажатия на клавиатуру
   * @param {KeyboardEvent|MouseEvent} e
   */
  function hideDialog(e) {
    e.preventDefault();
    dialog.classList.add('dialog--invisible');
    document.removeEventListener('keydown', eventHandlerKeydownDialog);
    if (typeof onDialogClose === 'function') {
      onDialogClose();
    }
  }

  /**
   * Проверяем был ли нажат Escape
   * Если был, то скрываем окно диалога и деактивируем активный пин
   * @param {KeyboardEvent} e
   */
  function eventHandlerKeydownDialog(e) {
    if (window.utils.isDeactivateEvent(e)) {
      hideDialog(e);
    }
  }

  return function (callback) {
    onDialogClose = callback;
    showDialog();
    dialogClose.addEventListener('click', hideDialog);
  };
})();
