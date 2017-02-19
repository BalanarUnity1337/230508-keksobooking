'use strict';

/**
 * Функция принимает JSON данные определенной карточки,
 * копирует шаблон маркера и располагает его в соответствии с полученными координатами.
 * Возвращает новый маркер.
 */
window.renderPin = (function () {
  var template = document.querySelector('#template');
  var pinTemplate = template.content.querySelector('.pin');

  return function (advertisement) {
    var pinClone = pinTemplate.cloneNode(true);

    pinClone.style.left = advertisement.location.x + 'px';
    pinClone.style.top = advertisement.location.y + 'px';
    pinClone.querySelector('img').src = advertisement.author.avatar;

    pinClone.content = advertisement;

    return pinClone;
  };
})();
