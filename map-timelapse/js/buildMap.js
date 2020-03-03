// https://docs.mapbox.com/mapbox-gl-js/example/add-image-animated/
const buildMap = function(objKey, locations) {

	mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYm9iZnJoODQiLCJhIjoiY2pvamcyNXUzMDFiMDNwcnc2Z2dibm10ZCJ9.y7ll2wHKfb5WIwtAtK9eJA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 1.1,
        center: [150, 25]
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

        // setTimeout(function(){ place(117.2264, 31.8257, 0) }, 1000)
        // setTimeout(function(){ place(116.4142, 40.1824), 1}, 2000)
        // setTimeout(function(){ place(107.874, 30.0572), 2}, 3000)
        // setTimeout(function(){ place(117.9874, 26.0789) }, 4000)
        // setTimeout(function(){ place(103.8343, 36.0611) }, 5000)

        //
        //let dates = objKey.splice(4,objKey.length)
        dates = objKey.splice(objKey.length-1, objKey.length)
        //
        //

        dates.forEach((date, i)=>{
          const longLat = []
          const saveI = i
          const objCnt = 0
          for (const l in locations) {
            const loc = locations[l]
            if (loc[date] > 0) {
              // longLat.push({
              //   'type': 'Feature',
              //   'geometry': {
              //     'type': 'Point',
              //     'coordinates': [loc.Long, loc.Lat]
              //   }
              // })
              const saveL = l
              const id = "cord_"+loc.Long+"_"+loc.Lat
              // const langLat = [parseFloat(loc.Long), parseFloat(loc.Lat)]
              setTimeout(function(){
                dateHeader.innerHTML = date
                // longLat.push({
                //   'type': 'Feature',
                //   'geometry': {
                //     'type': 'Point',
                //     'coordinates': [loc.Long, loc.Lat]
                //   }
                // })
                place([{
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [loc.Long, loc.Lat]
                  }
                }], id)

              }, ((saveI+1)*(saveL+1))*20)

            }
          }

          // setTimeout(function(){
          //   // console.log(date)
          //   dateHeader.innerHTML = date
          //   longLat.forEach( (ll,j) => {
          //     place(longLat, saveI+"-"+j)
          //   })
          // }, i*1000)
        })

        const place = function(longLat, cnt){

          map.addLayer({
              'id': 'points'+cnt,
              'type': 'symbol',
              'source': {
                  'type': 'geojson',
                  'data': {
                      'type': 'FeatureCollection',
                      'features': longLat,
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
