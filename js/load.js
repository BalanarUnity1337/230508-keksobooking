'use strict';

/**
 * Функция принимает адрес, по которому необходимо получить JSON данные
 * и функцию обратного вызова, которая выполнится при загрузке данных.
 */
window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function (e) {
      if (e.target.status >= 200 && e.target.status <= 300) {
        onLoad(e);
      }
    });

    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
  };
})();
