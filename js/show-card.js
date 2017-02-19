'use strict';

window.showCard = (function () {
  var onDialogClose;

  /**
   * Формируем на основе шаблона новую карточку,
   * используя данные JSON формата, показываем ее
   * и добавляем прослушку события нажатия на клавиатуру.
   * @param {JSON} card
   */
  function showDialog(card) {
    var template = document.querySelector('#template');
    var dialogTemplate = template.content.querySelector('.dialog');
    var cardClone = dialogTemplate.cloneNode(true);
    var cardCloneFeatures = cardClone.querySelector('.lodge__features');
    var cardClonePhotos = cardClone.querySelector('.lodge__photos');

    cardClone.querySelector('.dialog__title img').src = card.author.avatar;
    cardClone.querySelector('.lodge__title').innerText = card.offer.title;
    cardClone.querySelector('.lodge__address').innerText = card.offer.address;
    cardClone.querySelector('.lodge__price').innerText = card.offer.price;
    cardClone.querySelector('.lodge__rooms-and-guests').innerText = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardClone.querySelector('.lodge__checkin-time').innerText = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardClone.querySelector('.lodge__description').innerText = card.offer.description;
    cardClone.querySelector('.lodge__type').innerText = getType(card.offer.type);
    cardCloneFeatures.innerHTML = getFeatures(card.offer.features);
    cardClonePhotos.innerHTML = getPhotos(card.offer.photos);

    var sectionTokyo = document.querySelector('.tokyo');
    var dialog = document.querySelector('.dialog');

    if (dialog) {
      sectionTokyo.removeChild(dialog);
    }
    sectionTokyo.appendChild(cardClone);

    cardClone.classList.remove('dialog--invisible');

    var dialogClose = cardClone.querySelector('.dialog__close');

    dialogClose.focus();
    dialogClose.addEventListener('click', hideDialog);
    document.addEventListener('keydown', eventHandlerKeydownDialog);

    /**
     * Функция принимает на вход тип жилья
     * и возвращает его русскоязычный эквивалент.
     * @param {String} typeValue
     * @return {String|Undefined} Возвращается тип жилья
     */
    function getType(typeValue) {
      var type;
      switch (typeValue) {
        case 'flat':
          type = 'Квартира';
          break;
        case 'bungalo':
          type = 'Лачуга';
          break;
        case 'house':
          type = 'Дворец';
          break;
      }
      return type;
    }

    /**
     * Функция принимает на вход массив удобств жилья,
     * создает для каждого удобства свой div
     * и помещает его внутрь .lodge__features (cardCloneFeatures).
     * Возвращается внутренний HTML-код cardCloneFeatures.
     * @param {Array} featuresValues Список (массив) удобств
     * @return {String}
     */
    function getFeatures(featuresValues) {
      featuresValues.forEach(function (feature) {
        var newElement = document.createElement('div');
        newElement.classList.add('feature__image', 'feature__image--' + feature);
        cardCloneFeatures.appendChild(newElement);
      });
      return cardCloneFeatures.innerHTML;
    }

    /**
     * Функция принимает на вход массив url фотографий,
     * создает для каждой ссылки свой элемент img
     * и помещает его внутрь .lodge__photos (cardClonePhotos).
     * Возвращается внутренний HTML-код cardClonePhotos.
     * @param {Array} photos Массив url фотографий
     * @return {String}
     */
    function getPhotos(photos) {
      photos.forEach(function (photo) {
        var newElement = document.createElement('img');
        newElement.src = photo;
        newElement.alt = 'Lodge photo';
        newElement.width = 52;
        newElement.height = 52;
        cardClonePhotos.appendChild(newElement);
      });
      return cardClonePhotos.innerHTML;
    }
  }

  /**
   * Скрываем окно диалога и удаляем
   * прослушку события нажатия на клавиатуру
   * @param {KeyboardEvent|MouseEvent} e
   */
  function hideDialog(e) {
    e.preventDefault();

    var dialog = document.querySelector('.dialog');
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

  return function (callback, data) {
    onDialogClose = callback;
    showDialog(data);
  };
})();
