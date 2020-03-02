window.onload = function(){
  console.log('oh, hi!')
}

const date = '02-27';
const fetchMe = document.getElementById('fetch-button');
fetchMe.addEventListener('click', function(){
    fetch('http://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'+date+'-2020.csv')
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
        const jsonResponse = JSON.stringify(data)
        const fetchIt = document.getElementById('fetchIt');
        fetchIt.innerHTML = `
        Fetch Response:
            ${data}
        `
    });
});
