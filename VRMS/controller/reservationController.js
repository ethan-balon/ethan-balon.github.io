import { ReservationView } from "../view/reservationview.js";
import { ReservationModel } from "../model/reservationmodel.js";
import { CustomerModel } from "../model/customermodel.js";
import { vehicleSharedModel } from "../model/sharedModels.js";
import { VehicleView } from "../view/vehicleView.js";
import { RentalView } from "../view/rentalView.js";

class ReservationController {
    constructor(){
        this.reservationView =  new ReservationView()
        this.reservationModel = new ReservationModel()
        this.customerModel = new CustomerModel()
        this.vehicleView = new VehicleView()
        this.RentalView = new RentalView()
        this.vehicleModel = vehicleSharedModel
        this.bindAddReservation()
        this.bindCancelReservation()
        this.bindCustomerValues()
        this.bindVehicleValues()
        this.reservationView.displayAllReservations(this.reservationModel.getallReservations())
        
    }

    //bindCustomerValues() and bindVehicleValues() will initially setup the options for the reservation form
    bindCustomerValues(){
        this.reservationView.customerValues(this.customerModel.getallCustomers())
    }


    
    bindVehicleValues(){
        this.reservationView.vehicleValues(this.vehicleModel.getallVehicles())
    }

    bindAddReservation(){
        const button = document.getElementById("reservation_form")
        button.addEventListener("submit", (e)=>{
            e.preventDefault()
            const [targetCustomer, targetVehicle, startDate, status] = this.reservationView.get_values()
            const newReservation = {targetCustomer, targetVehicle, startDate, status}
            this.reservationModel.addReservation(newReservation)

            this.vehicleModel.reserveVehicle(targetVehicle)

            const allreservations = this.reservationModel.getallReservations()

            this.reservationView.displayAllReservations(allreservations)
            this.vehicleView.displayAllVehicles(this.vehicleModel.getallVehicles())
            this.RentalView.vehicleValues(this.vehicleModel.getallVehicles())
            this.reservationView.vehicleValues(this.vehicleModel.getallVehicles())
        })
    }


    bindCancelReservation() {
    const rentalTable = document.getElementById("reservationTable");
    rentalTable.addEventListener("click", (e) => {
        if (e.target.classList.contains("reservation-cancel-btn")) {
            const targetindex = e.target.dataset.index
            const allreservations = this.reservationModel.getallReservations()


            this.reservationModel.cancelReservation(targetindex)
            this.vehicleModel.statusVehicleUpdate(this.reservationModel.getReturningVehicle(targetindex))
            this.RentalView.displayAllRentals(this.reservationModel.getallReservations())
            this.vehicleView.displayAllVehicles(this.vehicleModel.getallVehicles())
            this.RentalView.vehicleValues(this.vehicleModel.getallVehicles())
            this.reservationView.vehicleValues(this.vehicleModel.getallVehicles())
            this.reservationView.displayAllReservations(allreservations)
        }
    });
    }


}

const app = new ReservationController()
