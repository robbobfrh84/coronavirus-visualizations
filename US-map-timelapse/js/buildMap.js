// https://docs.mapbox.com/mapbox-gl-js/example/add-image-animated/
const buildMap = function(objKey, locations) {

  console.log("locations :", locations)

	mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYm9iZnJoODQiLCJhIjoiY2pvamcyNXUzMDFiMDNwcnc2Z2dibm10ZCJ9.y7ll2wHKfb5WIwtAtK9eJA';
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 2.5,
      center: [-100, 37]
  })

  var geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    }]
  }

  markers = {
    'marker1': {
      size: 5,
      opacity: 0.5
    }
  }

  geojson.features.forEach(function(marker) {
    var el = document.createElement('div')
    el.className = 'marker'
    el.id = "marker1"
    el.style.width = markers["marker1"].size+"px"
    el.style.height = markers["marker1"].size+"px"
    el.style.opacity = markers["marker1"].opacity
    el.style.border = "solid " + (markers["marker1"].size / 5) + "px rgba(0,0,0,0.5)"
    // el.innerHTML = /*html*/`
    //   <div class="recoverd"></div>
    //   <div class="died"></div>
    // `
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
  });

  for (var i = 0; i < 5; i++) {
    const saveI = i+1
    setTimeout(function(){
      markers["marker1"].size += 5
      marker1.style.border = "solid " + (markers["marker1"].size / 5) + "px rgba(0,0,0,0.5)"
      marker1.style.width = markers["marker1"].size+"px";
      marker1.style.height = markers["marker1"].size+"px";
    },1000*saveI)
  }

}
