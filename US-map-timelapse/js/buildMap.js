const buildMap = function(objKey, locations) {

	mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYm9iZnJoODQiLCJhIjoiY2pvamcyNXUzMDFiMDNwcnc2Z2dibm10ZCJ9.y7ll2wHKfb5WIwtAtK9eJA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 2.99,
    center: [-100, 37]
  })

  var geojson = {
    type: 'FeatureCollection',
    features: []
  }

  locations.forEach( (l, i) => {
    l.previous = 0
    geojson.features.push({
      type: 'Feature',
      id: "long_"+l.Long+"_lat_"+l.Lat,
      size: 5,
      opacity: 0.5,
      locationInfo: l,
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(l.Long), parseFloat(l.Lat)]
      }
    })
  })

  const dates = objKey.splice(4,objKey.length)
  // const dates = objKey.splice(objKey.length-4,objKey.length)

  map.on('load', function() {

    geojson.features.forEach( (marker, i) => {
      var el = document.createElement('div')
      el.className = 'marker'
      el.id = marker.id
      el.style.opacity = 0
      el.style.border = initialBorder
      el.style.backgroundColor = "darkgoldenrod"
      if (!isNaN(marker.geometry.coordinates[0])) {
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      }
    })

    dates.forEach((d, i) => {
      const saveI = i
      const saveD = d

      geojson.features.forEach( (marker, mi) => {
        const saveMi = mi
        const saveL = geojson.features.length-1

        setTimeout(function(){
          const el = document.getElementById(marker.id)
          const cnt = marker.locationInfo[d]
          if (cnt > marker.locationInfo.previous) {
            scale(el, cnt, marker, marker.locationInfo.placed)
            marker.locationInfo.placed = true
            setTimeout(function(){
              el.style.border = "solid " + (marker.size / 5) + "px rgba(0,0,0,0.5)"
            },100+(random(0,400)))
          }
          marker.locationInfo.previous = cnt

          if (saveMi >= saveL) {
            dateContainer.innerHTML = d
          }
        }, saveI*(saveMi*2))
        
      })

    })
  })

}

const initialBorder = "solid 30px rgb(128,0,128)"

const scale = function(el, cnt, marker, placed) {
  if ( cnt > 1 && cnt < 3)  { setSize(el, placed, 8, 5) }
  if ( cnt >= 3 && cnt < 5)  { setSize(el, placed, 12, 5) }
  if ( cnt >= 5 && cnt < 10)  { setSize(el, placed, 16, 5) }
  else if ( cnt >= 10 )      { setSize(el, placed, 20, 10) }
  else {
    el.style.opacity = marker.opacity
    setSize(el, placed, 5, 5)
  }
}

const setSize = function( el, placed, size, border ){
  el.style.width = size+"px"
  el.style.height = size+"px"
  if (placed) el.style.border = "solid "+border+"px rgba(128,0,128,0.5)"
}
