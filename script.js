const dark = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
]
const GOOGLE_API_KEY = '';
const GOOGLE_GEOCODING_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json?[PARAMS]&key=' + GOOGLE_API_KEY;
// const GOOGLE_GEOCODING_LAT_LONG_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

// is actually important
let ncovJSON;
let geocodingJSON;
let map;

const mapEl = document.getElementById('map');
// let map;
const __initMap__ = () => {

  // let lat;
  // let lng;
  // let overlay;
  // let bound = new google.maps.LatLngBounds();

  // for (m in geocodingJSON) {
  //   lat = +geocodingJSON[m].latitude;
  //   lng = +geocodingJSON[m].longitude;
  //   bound.extend(new google.maps.LatLng(lat, lng));
  // }  

  map = new google.maps.Map(d3.select("#map").node(), {
    // center: { lat: 31.82571, lng: 117.2264},
    center: new google.maps.LatLng(31.82571, 117.2264),
    zoom: 5,
    // matTypeId: google.maps.MapTypeId.TERRAIN,
    styles: dark,
  });


  d3.json('./ncov-time-series.json', (err, data) => {
    console.log(data);
    for (let i = 2; i < data.length; i++) {
      // console.log(typeof data[i].D, typeof data[i].D);
      let lat = parseInt(data[i].D, 10);
      let lng = parseInt(data[i].E, 10);
      let _keys = Object.keys(data[i]);
      console.log(data[i], _keys);
      let _key = _keys[_keys.length - 1];
      let volume = data[i][_key];
      console.log(_key, volume);
      let center = { lat, lng };
      let cityCircle = new google.maps.Circle({
        map,
        center,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        // radius: 1000,
        radius: Math.sqrt(volume) * 100,
      });
      // console.log(cityCircle);
    }
  });

  // map.fitBounds(bound);

  // d3.json('./ncov-time-series.json', (err, data) => {  
  //   overlay = new google.maps.OverlayView();
  //   overlay.onAdd = () => {
  //     console.log(this);
  //     console.log(err, data);
  //     let layer = d3.select(overlay.getPanes().overlayLayer)
  //       .append('div').attr('class', 'effective');

  //     overlay.draw = () => {
  //       let projection = overlay.getProjection();
  //       let padding = 10;
  //       // console.log(ncovJSON);
  //       let marker = layer.selectAll('svg')
  //         .data(d3.entries(data))
  //         .each(transform)
  //         .enter()
  //         .append('svg')
  //         .each(transform)
  //         .attr('class', 'marker');

  //       marker.append('circle')
  //         .attr('r', 4.5)
  //         .attr('cx', padding)
  //         .attr('cy', padding);

  //       function transform(d) {
  //         // console.log('d', d);
  //         // console.log(this);
  //         d = new google.maps.LatLng(d.value.D, d.value.E);
  //         d = projection.fromLatLngToDivPixel(d);
  //         console.log(d);
  //         return d3.select(this)
  //           .style("left", (d.x - padding) + "px")
  //           .style("top", (d.y - padding) + "px");
  //       }
  //     }; 
  //   };
  //   overlay.setMap(map);
  // });

  // console.log(map);
}

let height = window.innerHeight;
let width = window.innerWidth;
let bottomHeight = (height * 0.15);

const mapBtn = document.getElementById('mapBtn');
let mapBtnDim = {
  width: '175px',
  height: '50px',
};

const offsetY = (((height / 2) - (bottomHeight - 25)));

const btnAnimateInConfig = {
  targets: mapBtn,
  translateY: offsetY,
  backgroundColor: '#3dc9e4f9',
  easing: 'spring(1, 80, 12, 7)',
  // easing: 'cubicBezier(.5, .05, .1, .3)',
};
const btnAnimateOutConfig = {
  targets: mapBtn,
  // translateY: ((-offsetY) / 2),
  translateY: 0,
  // top: (height * 0.5) - (mapBtnDim.height / 2),
  // left: (width * 0.5) - (mapBtnDim.width / 2),
  // top: 50 % - var(--get-map - btn - h) / 2,
  // left: calc(50 % - var(--get - map - btn - w) / 2),
  backgroundColor: '#46b1c7fa',
  easing: 'spring(1, 80, 12, 7)',
};
const mapAnimateInConfig = { };
const mapAnimateOutConfig = { };

const btnAnimateIn = () => anime(btnAnimateInConfig);
const btnAnimateOut = () => anime(btnAnimateOutConfig);
const mapAnimateIn = () => anime(mapAnimateOutConfig);
const mapAnimateOut = () => anime(mapAnimateOutConfig);

let mapState = {
  isRendered: false,
};

const mapIn = () => {
  btnAnimateIn();
  mapEl.hidden = false;
  __initMap__();
};
const mapOut = () => {
  btnAnimateOut();
  mapEl.hidden = true;
};

// get ncov data callback
function loadNCOVData(path, cb) {

  fetch('./ncov-time-series.json')

}

// lat is D, long is E

const getNCOVDataCb = (res) => {
  ncovJSON = JSON.parse(res);
  // console.log(ncovJSON);
  ncovJSON.map((val, i) => {
    // console.log(val.D, val.E, i);
    parseCoordinates(val.D, val.E);
  });
};

const geocodingCb = (res) => {
  geocodingJSON = JSON.parse(res);
  // console.log(geocodingJSON);
};

const parseCoordinates = (x, y) => {
  // console.log(x, y);
  // let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${x},${y}&key=${GOOGLE_API_KEY}`;
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=';
  geocodingLatLng(url, x, y, GOOGLE_API_KEY, res => geocodingCb(res));
  // fetch(url)
  //   .then(res = console.log(res));
};

// event listeners
mapBtn.addEventListener('click', () => {
  // loadJSON(res => getNCOVDataCb(res));
  if (mapState.isRendered === false) {
    mapIn();
  } else {
    mapOut();
  }
  mapState.isRendered = !mapState.isRendered;
});

