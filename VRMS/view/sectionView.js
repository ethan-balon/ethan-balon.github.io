export class SectionView {
    get_values(){
        let customer_button = document.getElementById('customer_button')
        let vehicle_button = document.getElementById('vehicle_button')
        let rental_button = document.getElementById('rental_button')
        let reservation_button = document.getElementById('reservation_button')
        let search_vehcle_button = document.getElementById('search_vehcle_button')
        let loginButton = document.getElementById('login_button')
        return [customer_button, vehicle_button, rental_button, reservation_button, search_vehcle_button, loginButton]
    }
}
export class LoginView {
    get_values(){
        let login_button = document.getElementById('logintest')
        return login_button
    }
}