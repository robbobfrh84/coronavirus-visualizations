const fetchMe = document.getElementById('fetch-button');
fetchMe.addEventListener('click', function(){
    fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv')
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
        const fetchIt = document.getElementById('fetchIt');
        const newline = /\n/g;
        const str = data;
        const result = newline[Symbol.split](str);
        // const objKey = [];
        // const location = [];
        for (let i = 0; i < result.length; i++) {
          const comma = /,/g;
          const splitResult = comma[Symbol.split](result[i]);
          console.log(splitResult)
          // if (i == 0) {
          //   objKey = splitResult;
          // } else {
          //
          // }
        }
    });
});
