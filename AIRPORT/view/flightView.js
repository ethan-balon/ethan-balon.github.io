export class flightView {
    updateClock() {
      const now = new Date(); 
      const timeString = `Last updated: ${now.toLocaleTimeString()}`
      console.log(`flightView: Table updated on ${now.toLocaleTimeString()}`)
      document.getElementById("clock").textContent = timeString;
    }
    updateTable(api_entries){
      const formatted_entries = JSON.parse(api_entries)
      console.log('flightView: displaying entries')
      console.log(formatted_entries)

      const flightTable  = document.getElementById('flightTable')
      let html = ``
      html += `<tr><th>CALLSIGN</th><th>COUNTRY</th><th>ALTITUDE</th><th>SPEED</th><th>ARRIVED</th></tr>`
      for (let i = 0; i < formatted_entries.length; i++) {
          let target_flight = formatted_entries[i]
          //make values readable for user
          let callsign = target_flight[1] ? target_flight[1] : "Not Available" //replace invisible callsign with N/A
          let altitude = target_flight[7] === null ? "Grounded" : target_flight[7] //replace null with grounded
          let arrived = target_flight[8] === true ? "Yes" : "No" //replace true and false with yes and no

          html += `<tr>`
          html += `<td>${callsign}</td>`
          html += `<td>${target_flight[2]}</td>`
          html += `<td>${altitude} ft</td>`
          html += `<td>${target_flight[9]} kts</td>`
          html += `<td>${arrived}</td>`
          html += `<td><button class="vehicle-update-btn" data-index="${i}">save</button></td>`
          html += `<td><button class="flight-locate-btn" data-index="${i}">locate</button></td>`
          html += `</tr>`
      }
      flightTable.innerHTML = html
    }



    updateBanner(api_entries){
      const formatted_entries = JSON.parse(api_entries)
      console.log('flightView: displaying entries for banner')
      console.log(formatted_entries)
      let message = `MESSAGE: These flights have landed`
      let html = ` `
      let flightBanner  = document.getElementById('flightBanner')
        for (let i = 0; i < formatted_entries.length; i++) {
          let target_flight = formatted_entries[i]
          if (target_flight[8] === true) {
            html += `, Flight: ${target_flight[1]} from: ${target_flight[2]}`
          }
      }
      if (html === ` `){
        message = `MESSAGE: No flights have landed yet! Any arriving planes will be displayed on this banner`
      }
      flightBanner.textContent = message + html
      
    }

}



