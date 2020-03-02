window.onload = function(){
  getData()
}

const getData = function(){
  fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv')
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
      const fetchIt = document.getElementById('fetchIt');
      const newline = /\n/g;
      const str = data;
      const result = newline[Symbol.split](str);
      let objKey = [];
      let locations = [];
      for (let i = 0; i < result.length; i++) {
        const quote = /, /g;
        const fixCsv = result[i].replace(quote, " ");
        const comma = /,/g;
        const splitResult = comma[Symbol.split](fixCsv);
        if (i == 0) {
          objKey = splitResult
        } else {
          const location = {};
          objKey.forEach((item, j) => {
            location[item] = splitResult[j];
          });
          locations.push(location);
        }
      }
      buildMap(objKey, locations)
  });
}
