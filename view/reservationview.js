export class ReservationView {
        get_values(){
            const targetCustomer = document.getElementById('reserve_customer').value
            const targetVehicle = document.getElementById('reserve_vehicle').value
            const startDate = document.getElementById('reserve_date').value
            const status = "reserved"

            return [targetCustomer, targetVehicle, startDate, status]
    }



    displayAllReservations(allReservations) {
    const vehicleTable  = document.getElementById('reservationTable');
    let html = ``;
    for (let i = 0; i < allReservations.length; i++) {
        html += `<tr>`;
        html += `<td>${allReservations[i].targetCustomer}</td>`;
        html += `<td>${allReservations[i].targetVehicle}</td>`;
        html += `<td>${allReservations[i].startDate}</td>`;
        html += `<td>${allReservations[i].status}</td>`;
        html += `<td><button class="reservation-cancel-btn" data-index="${i}">cancel</button></td>`;
        html += `</tr>`;
    }
    vehicleTable.innerHTML = html;
}
    customerValues(allcustomers) {
        const targetcustomer = document.getElementById('reserve_customer');
        let html = `<option>Select Customer</option>`;
        for (let i = 0; i < allcustomers.length; i++) {
        if (allcustomers[i].status === "active") {
            html += `<option value="${allcustomers[i].fullName}">${allcustomers[i].fullName}</option>`;
            }
        }
        targetcustomer.innerHTML = html;
    }
    vehicleValues(allvehicles) {

        const targetvehicle = document.getElementById('reserve_vehicle');
        let html = `<option>Select Vehicle</option>`;
        for (let i = 0; i < allvehicles.length; i++) {
        if (allvehicles[i].status === "available") {
            html += `<option value="${allvehicles[i].vehicleId}">${allvehicles[i].year} ${allvehicles[i].make} ${allvehicles[i].model} - (${allvehicles[i].registrationNumber})</option>`;
        }
    }
    targetvehicle.innerHTML = html;
    }
        
}