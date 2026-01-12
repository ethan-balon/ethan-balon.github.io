
export class SearchView {
    get_values(){
            const searchTerm = document.getElementById('search_terms').value

            return searchTerm
}
    displayResult(matchedVehicles) {
   const vehicleTable  = document.getElementById('searchTable');
    let html = ``;
    for (let i = 0; i < matchedVehicles.length; i++) {
        html += `<tr>`;
        html += `<td>${matchedVehicles[i].vehicleId}</td>`;
        html += `<td>${matchedVehicles[i].make}</td>`;
        html += `<td>${matchedVehicles[i].model}</td>`;
        html += `<td>${matchedVehicles[i].year}</td>`;
        html += `<td>${matchedVehicles[i].registrationNumber}</td>`;
        html += `<td>${matchedVehicles[i].type}</td>`;
        html += `<td>${matchedVehicles[i].mileage}</td>`;
        html += `<td>${matchedVehicles[i].location}</td>`;
        html += `<td>${matchedVehicles[i].status}</td>`
        html += `</tr>`;
    }
    vehicleTable.innerHTML = html;
    }
}