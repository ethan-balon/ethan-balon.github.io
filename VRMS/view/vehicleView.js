export class VehicleView {
        get_values(){
            const vehicleId = document.getElementById('vehicle_id').value
            const make = document.getElementById('make').value
            const model = document.getElementById('model').value
            const year = document.getElementById('year').value
            const registrationNumber = document.getElementById('registration_number').value
            const type = document.getElementById('type').value
            const mileage = document.getElementById('mileage').value
            const location = document.getElementById('location').value

            return [vehicleId, make, model, year, registrationNumber, type, mileage, location]
    }

    displayAllVehicles(allvehicles) {
    const vehicleTable  = document.getElementById('vehicleTable');
    let html = ``;
    for (let i = 0; i < allvehicles.length; i++) {
        html += `<tr>`;
        html += `<td>${allvehicles[i].vehicleId}</td>`;
        html += `<td>${allvehicles[i].make}</td>`;
        html += `<td>${allvehicles[i].model}</td>`;
        html += `<td>${allvehicles[i].year}</td>`;
        html += `<td>${allvehicles[i].registrationNumber}</td>`;
        html += `<td>${allvehicles[i].type}</td>`;
        html += `<td>${allvehicles[i].mileage}</td>`;
        html += `<td>${allvehicles[i].location}</td>`;
        html += `<td>${allvehicles[i].status}</td>`
        html += `<td><button class="vehicle-update-btn" data-index="${i}">status</button></td>`;
        html += `<td><button class="vehicle-delete-btn" data-index="${i}">delete</button></td>`;
        html += `</tr>`;
    }
    vehicleTable.innerHTML = html;
}
        
}