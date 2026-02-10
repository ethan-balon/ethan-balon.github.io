export class flightView {
    updateClock() {
      const now = new Date(); 
      const timeString = `Last updated: ${now.toLocaleTimeString()}`;
      console.log(`flightView: Table updated on ${now.toLocaleTimeString()}`);
      document.getElementById("clock").textContent = timeString;
    }
    updateTable(api_entries){
      const formatted_entries = JSON.parse(api_entries)
      console.log('flightView: displaying entries')
      console.log(formatted_entries)

      const flightTable  = document.getElementById('flightTable');
      let html = ``;
      for (let i = 0; i < api_entries.length; i++) {
          html += `<tr>`;
          html += `<td>${api_entries[i].vehicleId}</td>`;
          html += `<td>${api_entries[i].make}</td>`;
          html += `<td>${api_entries[i].model}</td>`;
          html += `<td>${api_entries[i].year}</td>`;
          html += `<td>${api_entries[i].registrationNumber}</td>`;
          html += `<td>${api_entries[i].type}</td>`;
          html += `<td>${api_entries[i].mileage}</td>`;
          html += `<td>${api_entries[i].location}</td>`;
          html += `<td>${api_entries[i].status}</td>`
          html += `<td><button class="vehicle-update-btn" data-index="${i}">save</button></td>`;
          html += `<td><button class="vehicle-delete-btn" data-index="${i}">locate</button></td>`;
          html += `</tr>`;
      }
      flightTable.innerHTML = html;
    }

}


