// https://docs.mapbox.com/mapbox-gl-js/example/add-image-animated/
const buildMap = function(objKey, locations) {

  console.log(objKey)
  const dates = [1,2,3,4,5,6].splice(2,4)
  console.log("dates :", dates)

	mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYm9iZnJoODQiLCJhIjoiY2pvamcyNXUzMDFiMDNwcnc2Z2dibm10ZCJ9.y7ll2wHKfb5WIwtAtK9eJA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 0.5,
        center: [150, 20]
    })
    var size = 25
    var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        onAdd: function() {
            var canvas = document.createElement('canvas')
            canvas.width = this.width
            canvas.height = this.height
            this.context = canvas.getContext('2d')
        },
        render: function() {
            var duration = 1000;
            var t = (performance.now() % duration) / duration
            var radius = (size / 2) * 0.3
            var outerRadius = (size / 2) * 0.7 * t + radius
            var context = this.context
            context.clearRect(0, 0, this.width, this.height)
            context.beginPath()
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
            context.fill()
            context.beginPath()
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)'
            context.strokeStyle = 'white'
            context.lineWidth = 2 + 4 * (1 - t)
            context.fill()
            context.stroke()
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;
            map.triggerRepaint()
            return true
        }
    }

    map.on('load', function() {

        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })

        let cnt = 0
        setTimeout(function(){ place(117.2264, 31.8257) }, 1000)
        setTimeout(function(){ place(116.4142, 40.1824) }, 2000)
        setTimeout(function(){ place(107.874, 30.0572) }, 3000)
        setTimeout(function(){ place(117.9874, 26.0789) }, 4000)
        setTimeout(function(){ place(103.8343, 36.0611) }, 5000)

        const place = function(lng, lat){
          cnt++
          map.addLayer({
              'id': 'points'+cnt,
              'type': 'symbol',
              'source': {
                  'type': 'geojson',
                  'data': {
                      'type': 'FeatureCollection',
                      'features': [
                          {
                              'type': 'Feature',
                              'geometry': {
                                  'type': 'Point',
                                  'coordinates': [lng, lat]
                              }
                          }
                      ]
                  }
              },
              'layout': {
                  'icon-image': 'pulsing-dot',
                  "icon-allow-overlap": true,
              }
          })
        }

    })

}