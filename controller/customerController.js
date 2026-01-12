import { CustomerView } from "../view/customerView.js";
import { CustomerModel } from "../model/customermodel.js";
import { RentalView } from "../view/rentalView.js";
import { ReservationView } from "../view/reservationview.js";

class CustomerController {
    constructor(){

        this.customerView =  new CustomerView()
        this.customerModel = new CustomerModel()
        this.rentalView = new RentalView()
        this.reservationView = new ReservationView()
        this.bindAddCustomer()
        this.bindDeleteCustomer()
        this.bindActivateCustomer()
        this.customerView.displayAllCustomers(this.customerModel.getallCustomers())
    }
    bindAddCustomer(){
        const button = document.getElementById("customer_form")
        button.addEventListener("submit", (e)=>{
            e.preventDefault()
            const [fullName, email, phoneNumber, date] = this.customerView.get_values()
            const newCustomer = {fullName, email, phoneNumber, date, status:"active"}
            this.customerModel.addCustomer(newCustomer)
            this.customerView.displayAllCustomers(this.customerModel.getallCustomers())
            this.rentalView.customerValues(this.customerModel.getallCustomers())
            this.reservationView.customerValues(this.customerModel.getallCustomers())

        })
    }

    bindDeleteCustomer() {
    const customerTable = document.getElementById("customerTable");
    customerTable.addEventListener("click", (e) => {
        if (e.target.classList.contains("customer-delete-btn")) {
            const targetindex = e.target.dataset.index
            this.customerModel.removeCustomer(targetindex)
            this.customerView.displayAllCustomers(this.customerModel.getallCustomers())
            this.rentalView.customerValues(this.customerModel.getallCustomers())
            this.reservationView.customerValues(this.customerModel.getallCustomers())
        }
        });
    }

    bindActivateCustomer() {
    //manually reactivate customer status
    const customerTable = document.getElementById("customerTable");
    customerTable.addEventListener("click", (e) => {
        if (e.target.classList.contains("customer-status-btn")) {
            const targetindex = e.target.dataset.index
            this.customerModel.activateCustomer(targetindex)
            this.customerView.displayAllCustomers(this.customerModel.getallCustomers())
            this.rentalView.customerValues(this.customerModel.getallCustomers())
            this.reservationView.customerValues(this.customerModel.getallCustomers())
        }
        });
    }


    
}

const app = new CustomerController()
