// Выпадающее меню

const toogleButtonElement = document.querySelector('.main-header__toggle');
const menuElement = document.querySelector('.main-nav');
const nojsElement = document.querySelector('.no-js');
nojsElement.classList.remove('no-js');


toogleButtonElement.addEventListener('click', function () {
  toogleButtonElement.classList.toggle('main-header__toggle--closed');
  menuElement.classList.toggle('main-nav--opened');
})

// карта
ymaps.ready(init);
const geoObjects = [];
const marks = [
  {
    latitude: 34.869497,
    longitude: -111.760186,
    hintContent: '<div class="map__hint">Седона</div>'
  }
]

function init() {
  const myMap = new ymaps.Map("map", {
    center: [34.869497, -111.760186],
    zoom: 8
  });

  marks.forEach(function(mark, i) {
    geoObjects.push(new ymaps.Placemark([mark.latitude, mark.longitude], {
      hintContent: mark.hintContent
    }, {
      iconLayout: 'default#Image',
      iconImageHref: '../img/icons/pin.png',
      iconImageSize: [27, 27]
    }))
  });


  const clusterer = new ymaps.Clusterer()

  myMap.geoObjects.add(clusterer)
  clusterer.add(geoObjects)
}
