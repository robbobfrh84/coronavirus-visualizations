const table = function(objKey, locs) {

  const dates = objKey.splice(4,objKey.length)
  // Save this 👇. It's good for debugging - only uses last two days.
  // const dates = objKey.splice(objKey.length-1,objKey.length)

  const usLocations = locs.filter( l => l["Country/Region"] == "US" )

  const usDatesTotals = []
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
        if (!currentStates.includes(l["Province/State"])) {
          dailyCnt += parseInt(l[d])
          // console.log("NOT A STATE: ", l, '-')
        } else {
          // console.log("A STATE: ", l, '-')
        }
        //dailyCnt += parseInt(l[d])
      }
    })

    // 🐛bug patch...
    // if (d == "3/10/20") {
    //   dailyCnt = 959
    // }
    // 🐛 bug patch...

    total += dailyCnt - oldTotal
    let dailyIncrease = total - oldTotal

    usDatesTotals.push({ "Daily Increase": dailyIncrease, "Total": total, "Date": d })
    oldTotal = dailyCnt
  })

  usDatesTotals.reverse()
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
  console.log("usDatesTotals", usDatesTotals)

  usDatesTotals.forEach( (d, i) => {

    let per = `-`
    if (i < usDatesTotals.length-1) {
      per =( (d["Daily Increase"]*100) / usDatesTotals[i+1]["Total"] ).toFixed(1) + "%"
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
