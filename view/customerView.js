export class CustomerView {
        get_values(){
            const fullName = document.getElementById('full_name').value
            const email = document.getElementById('email').value
            const phoneNumber = document.getElementById('phone_number').value
            const date = document.getElementById('date').value
            return [fullName, email, phoneNumber, date]
    }
        displayAllCustomers(allCustomers){
            const customerTable = document.getElementById('customerTable')
            let html = ``
            for (let i = 0; i<allCustomers.length;i++) {
                html += `<tr>`
                html += `<td>${allCustomers[i].fullName}</td>`
                html += `<td>${allCustomers[i].email}</td>`
                html += `<td>${allCustomers[i].phoneNumber}</td>`
                html += `<td>${allCustomers[i].date}</td>`
                html += `<td>${allCustomers[i].status}</td>`
                html += `<td><button class="customer-status-btn" data-index="${i}">status</button></td>`
                html += `<td><button class="customer-delete-btn" data-index="${i}">delete</button></td>`;
                html += `</tr>`
            }
            customerTable.innerHTML = html
        }
}