import { RentalView } from "../view/rentalView.js";
import { ReservationView } from "../view/reservationview.js";
import { VehicleView } from "../view/vehicleView.js";
import { RentalModel } from "../model/rentalmodel.js";
import { CustomerModel } from "../model/customermodel.js";
import { vehicleSharedModel } from "../model/sharedModels.js";

class RentalController {
    constructor(){
        this.rentalView=  new RentalView()
        this.rentalModel = new RentalModel()
        this.customerModel = new CustomerModel()
        this.vehicleModel = vehicleSharedModel
        this.vehicleView = new VehicleView()
        this.ReservationView = new ReservationView()
        this.bindAddRental()
        this.bindDeleteRental()
        this.bindReturnental()
        this.rentalView.displayAllRentals(this.rentalModel.getallRentals())
        this.bindCustomerValues()
        this.bindVehicleValues()
        
    }



    bindCustomerValues(){
        //initial setup for customer options in rental form
        this.rentalView.customerValues(this.customerModel.getallCustomers())
    }



    bindVehicleValues(){
        //initial setup for vehicle options in rental form
        this.rentalView.vehicleValues(this.vehicleModel.getallVehicles())
    }



    bindAddRental(){
        const button = document.getElementById("rental_form")
        button.addEventListener("submit", (e)=>{
            e.preventDefault()
            const [targetCustomer, targetVehicle, startDate, endDate, totalCost, status] = this.rentalView.get_values()
            const newRental = {targetCustomer, targetVehicle, startDate, endDate, totalCost, status}
            this.rentalModel.addRental(newRental)

            this.vehicleModel.statusVehicleUpdate(targetVehicle)

            const allrentals = this.rentalModel.getallRentals()
            this.rentalView.displayAllRentals(allrentals)
            this.vehicleView.displayAllVehicles(this.vehicleModel.getallVehicles())
            this.rentalView.vehicleValues(this.vehicleModel.getallVehicles())
            this.ReservationView.vehicleValues(this.vehicleModel.getallVehicles())
        })
    }

    bindDeleteRental() {
    const rentalTable = document.getElementById("rentalTable");
    rentalTable.addEventListener("click", (e) => {

        if (e.target.classList.contains("rental-delete-btn")) {
            const targetindex = e.target.dataset.index
            this.rentalModel.removeRental(targetindex)
            this.rentalView.displayAllRentals(this.rentalModel.getallRentals())
        }
    });
    }
    bindReturnental() {
    const rentalTable = document.getElementById("rentalTable");
    rentalTable.addEventListener("click", (e) => {

        if (e.target.classList.contains("rental-return-btn")) {
            const targetindex = e.target.dataset.index
            this.rentalModel.returnRental(targetindex)
            this.vehicleModel.statusVehicleUpdate(this.rentalModel.getReturningVehicle(targetindex))
            this.rentalView.displayAllRentals(this.rentalModel.getallRentals())
            this.vehicleView.displayAllVehicles(this.vehicleModel.getallVehicles())
            this.rentalView.vehicleValues(this.vehicleModel.getallVehicles())
            this.ReservationView.vehicleValues(this.vehicleModel.getallVehicles())
        }
    });
    }


   
}

const app = new RentalController()
