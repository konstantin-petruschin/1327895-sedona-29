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
const mapWrapper = document.querySelector('#map');

if (mapWrapper) {
  ymaps.ready(init);
}

function init() {
  const myMap = new ymaps.Map('map', {
    center: [34.869497, -111.760186],
    zoom: 8
  });

  myMap.geoObjects.add(new ymaps.Placemark([34.869497, -111.760186],
    {
      hintContent: '<div class="map__hint">Седона</div>'
    }, {
      preset: 'islands#circleIcon',
      iconColor: '#81b3d3'
    }))
}
