
const loadJSON = (cb) => {

  let xhr = new XMLHttpRequest();

  xhr.overrideMimeType('application/json');
  xhr.open('GET', './ncov-time-series.json', true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == '200') {
      // console.log(xhr);
      cb(xhr.responseText);
    }
  }

  xhr.send(null);
}

const geocodingLatLng = (url, lat, lng, key, cb) => {

  let xhr = new XMLHttpRequest();
  let endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + key;

  // console.log(endpoint);

  xhr.overrideMimeType('application/json');
  xhr.open('GET', endpoint, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == '200') {
      // console.log(xhr);
      cb(xhr.responseText);
    }
  }

  xhr.send(null);
};