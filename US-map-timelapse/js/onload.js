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
      const quote = /, /g;
      const comma = /,/g;
      const firstLine = result[0].replace(quote, " ")
      const line = comma[Symbol.split](firstLine);
      let dates = [];
      for (var k = 4; k < line.length; k++) {
        let date = line[k];
        dates.push(date);
      }
      setTimeout(function(){
        dates.forEach((date, l) => {
          const saveL = l;
          // setTimeout(function(){
          //   dateContainer.innerHTML = date
          // }, saveL*750)
        });
      }, 1000);
      for (let i = 0; i < result.length; i++) {
        const fixCsv = result[i].replace(quote, " ");
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
      buildMap(objKey, locations, dates);
  });
}
