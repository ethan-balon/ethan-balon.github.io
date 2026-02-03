export class flightView {
        // get_values(){
        //     const fullName = document.getElementById('full_name').value
        //     const email = document.getElementById('email').value
        //     const phoneNumber = document.getElementById('phone_number').value
        //     const date = document.getElementById('date').value
        //     return [fullName, email, phoneNumber, date]
    // }
    updateClock() {
      const now = new Date(); // Uses the user's local computer time
      const timeString = `Last updated: ${now.toLocaleTimeString()}`;
      console.log(`flightView: Table updated on ${now.toLocaleTimeString()}`);
      document.getElementById("clock").textContent = timeString;
    }
    updateTable(api_entries){
      const formatted_entries = JSON.parse(api_entries)
      console.log('flightView: displaying entries')
      console.log(formatted_entries)
      // const vehicleTable  = document.getElementById('vehicleTable');
      // let html = ``;
      // for (let i = 0; i < api_entries.length; i++) {
      //     html += `<tr>`;
      //     html += `<td>${api_entries[i].vehicleId}</td>`;
      //     html += `<td>${api_entries[i].make}</td>`;
      //     html += `<td>${api_entries[i].model}</td>`;
      //     html += `<td>${api_entries[i].year}</td>`;
      //     html += `<td>${api_entries[i].registrationNumber}</td>`;
      //     html += `<td>${api_entries[i].type}</td>`;
      //     html += `<td>${api_entries[i].mileage}</td>`;
      //     html += `<td>${api_entries[i].location}</td>`;
      //     html += `<td>${api_entries[i].status}</td>`
      //     html += `<td><button class="vehicle-update-btn" data-index="${i}">status</button></td>`;
      //     html += `<td><button class="vehicle-delete-btn" data-index="${i}">delete</button></td>`;
      //     html += `</tr>`;
      // }
      // vehicleTable.innerHTML = html;
    }

}


