export class RentalView {
        get_values(){
            const targetCustomer = document.getElementById('target_customer').value
            const targetVehicle = document.getElementById('target_vehicle').value
            const startDate = document.getElementById('start_date').value
            const endDate = document.getElementById('end_date').value
            const totalCost = document.getElementById('total_cost').value
            const status = "Rented"

            return [targetCustomer, targetVehicle, startDate, endDate, totalCost, status]
    }



    displayAllRentals(allrentals) {
    const vehicleTable  = document.getElementById('rentalTable');
    let html = ``;
    for (let i = 0; i < allrentals.length; i++) {
        html += `<tr>`;
        html += `<td>${allrentals[i].targetCustomer}</td>`;
        html += `<td>${allrentals[i].targetVehicle}</td>`;
        html += `<td>${allrentals[i].startDate}</td>`;
        html += `<td>${allrentals[i].endDate}</td>`;
        html += `<td>${allrentals[i].totalCost}</td>`;
        html += `<td>${allrentals[i].status}</td>`;
        html += `<td><button class="rental-return-btn" data-index="${i}">return</button></td>`;
        html += `<td><button class="rental-delete-btn" data-index="${i}">delete</button></td>`;
        html += `</tr>`;
    }
    vehicleTable.innerHTML = html;
}
    customerValues(allcustomers) {
        const targetcustomer = document.getElementById('target_customer');
        let html = `<option>Select Customer</option>`;
        for (let i = 0; i < allcustomers.length; i++) {
        if (allcustomers[i].status === "active") {
            html += `<option value="${allcustomers[i].fullName}">${allcustomers[i].fullName}</option>`;
            }
        }
        targetcustomer.innerHTML = html;
    }
    vehicleValues(allvehicles) {

        const targetvehicle = document.getElementById('target_vehicle');
        let html = `<option>Select Vehicle</option>`;
        for (let i = 0; i < allvehicles.length; i++) {
        if (allvehicles[i].status === "available") {
            html += `<option value="${allvehicles[i].vehicleId}">${allvehicles[i].year} ${allvehicles[i].make} ${allvehicles[i].model} - (${allvehicles[i].registrationNumber})</option>`;
        }
    }
    targetvehicle.innerHTML = html;
    }
        
}