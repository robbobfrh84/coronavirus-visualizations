const table = function(objKey, locs) {

  const dates = objKey.splice(4,objKey.length)

  const usLocations = locs.filter( l => l["Country/Region"] == "US" )

  const usDates = []
  let total = 0
  let oldTotal = total
  dates.forEach( d => {
    let dailyCnt = 0
    usLocations.forEach( l => {
      dailyCnt += parseInt(l[d])
    })
    total += dailyCnt - oldTotal
    usDates.push({ "Daily Increase": total - oldTotal, "Total": total, "Date": d })
    oldTotal = dailyCnt
  })

  console.log("usDates :", usDates)
  usDates.reverse()
  tableContainer.innerHTML += `
    <tr>
      <th>Date</th>
      <th>New</th>
      <th>% increase</th>
      <th>Total</th>
    </tr>
  `

  usDates.forEach( (d, i) => {
    let per = Math.round( (d["Daily Increase"]*100) / d["Total"] )
    console.log(d["Daily Increase"] == 0, per)
    if (d["Daily Increase"] == 0) {
      per = d["Total"]
    }
    tableContainer.innerHTML += `
    <tr>
      <td>${d.Date} &nbsp; &nbsp; </td>
      <td>${d["Daily Increase"]}</td>
      <th>${per}</th>
      <td>${d["Total"]}</td>
    </tr>
    `
  })


}
