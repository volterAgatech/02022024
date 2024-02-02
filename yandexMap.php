<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/src/fonts/inter/stylesheet.css">
  <link rel="stylesheet" href="/src/fonts/roboto/stylesheet.css">
  <link rel="stylesheet" href="/src/scss/main.css">
  <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=2f672484-0af7-41bb-bcd6-c0a8407d1966" type="text/javascript"></script>
  <title>Яндексы</title>
</head>

<body>
  <?php
  include "./templates/header.php";
  ?>
  <section class="main-form">
    <div class="container short">
      <h2>Вы выбрали:</h2><h3 class="currenadd"></h3><br>
      <h3>Коардинаты</h3><h3 class="coards"></h3>
      <div id="map"></div>
    </div>
  </section>
  <style>
    #map {
      width: 500px;
      height: 500px;
    }
  </style>
  <script>
    ymaps.ready(init);

    function init() {
      let currenadd = document.querySelector('.currenadd');
      let coards = document.querySelector('.coards');
      var myMapCoards = new Object();
      var myPlacemark,
        myMap = new ymaps.Map('map', {
          center: [55.753994, 37.622093],
          zoom: 9
        }, {
          searchControlProvider: 'yandex#search'
        });

      // Слушаем клик на карте.
      myMap.events.add('click', function(e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
          myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
          myPlacemark = createPlacemark(coords);
          myMap.geoObjects.add(myPlacemark);
          // Слушаем событие окончания перетаскивания на метке.
          myPlacemark.events.add('dragend', function() {
            getAddress(myPlacemark.geometry.getCoordinates());
          });
        }
        getAddress(coords);
        // currenadd.innerHTML = myPlacemark.properties._data.balloonContent;
      });

      // Создание метки.
      function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
          iconCaption: 'поиск...'
        }, {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true
        });
      }

      // Определяем адрес по координатам (обратное геокодирование).
      function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function(res) {
          var firstGeoObject = res.geoObjects.get(0);
          myMapCoards.cord = coords;
          myMapCoards.place = [
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            firstGeoObject.getAddressLine()
          ];
          myPlacemark.properties
            .set({
              // Формируем строку с данными об объекте.
              iconCaption: [
                // Название населенного пункта или вышестоящее административно-территориальное образование.
                firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
              ].filter(Boolean).join(', '),
              // В качестве контента балуна задаем строку с адресом объекта.
              balloonContent: firstGeoObject.getAddressLine()
            });
          console.log(myMapCoards);

          currenadd.innerHTML = myMapCoards.place[0] + ' , ' + myMapCoards.place[1];
          coards.innerHTML = myMapCoards.cord[0] + '|' + myMapCoards.cord[1];
        });
      }
    }
  </script>
</body>

</html>