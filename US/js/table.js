const table = function(objKey, locs) {

  const dates = objKey.splice(4,objKey.length)
  // Save this 👇. It's good for debugging - only uses last two days.
  // const dates = objKey.splice(objKey.length-2,objKey.length)

  const usLocations = locs.filter( l => l["Country/Region"] == "US" )

  const usDates = []
  let total = 0
  let oldTotal = total
  dates.forEach( (d, i) => {
    let dailyCnt = 0
    usLocations.forEach( l => {
      if (l[d] === "") {
        //  Handles Dates that are empty
        //  - which means they were the same as the Day before...
        //  dailyCnt += parseInt(l[dates[i-1]]) // This was wrong, but wondering if it fixed something, and it was right at some point.
      } else {
        dailyCnt += parseInt(l[d])
      }
    })
    total += dailyCnt - oldTotal
    usDates.push({ "Daily Increase": total - oldTotal, "Total": total, "Date": d })
    oldTotal = dailyCnt
  })

  usDates.reverse()
  tableContainer.innerHTML += `
    <tr>
      <th>Date</th>
      <th>New</th>
      <th>% increase</th>
      <th>Total</th>
    </tr>
  `

  console.log("usLocations :", usLocations)
  console.log("dates :", dates)
  console.log("usDates", usDates)

  usDates.forEach( (d, i) => {

    let per = `-`
    if (i < usDates.length-1) {
      per =( (d["Daily Increase"]*100) / usDates[i+1]["Total"] ).toFixed(1) + "%"
    }
    if (d["Daily Increase"] == 0) {
      per = `-`
    }
    tableContainer.innerHTML += `
    <tr>
      <td style="width:100px">${d.Date} &nbsp; &nbsp; </td>
      <td style="width:auto">${d["Daily Increase"]}</td>
      <th style="width:auto">${per}</th>
      <td style="width:auto">${d["Total"]}</td>
    </tr>
    `
  })


}
