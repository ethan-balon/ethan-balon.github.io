import { VehicleView } from "../view/vehicleView.js";
import { RentalView } from "../view/rentalView.js";
import { ReservationView } from "../view/reservationview.js";
import { vehicleSharedModel } from "../model/sharedModels.js";

class VehicleController {
    constructor(){
        this.vehicleView =  new VehicleView()
        this.vehicleModel = vehicleSharedModel
        this.rentalView = new RentalView()
        this.ReservationView = new ReservationView()
        this.bindAddVehicle()
        this.bindDeleteVehicle()
        this.bindActivateVehicle()
        this.vehicleView.displayAllVehicles(this.vehicleModel.getallVehicles())
    }
    bindAddVehicle(){
        const button = document.getElementById("vehicle_form")
        button.addEventListener("submit", (e)=>{
            e.preventDefault()
            const [vehicleId, make, model, year, registrationNumber, type, mileage, location] = this.vehicleView.get_values()
            const vehicle = {vehicleId, make, model, year, registrationNumber, type, mileage, location, status:'available'}
            this.vehicleModel.addVehicle(vehicle)
            const allvehicles = this.vehicleModel.getallVehicles()



            this.vehicleView.displayAllVehicles(allvehicles)
            this.rentalView.vehicleValues(this.vehicleModel.getallVehicles())
            this.ReservationView.vehicleValues(this.vehicleModel.getallVehicles())
        })
    }


    bindDeleteVehicle() {
    const vehicleTable = document.getElementById("vehicleTable");
    vehicleTable.addEventListener("click", (e) => {
        if (e.target.classList.contains("vehicle-delete-btn")) {
            const targetindex = e.target.dataset.index
            this.vehicleModel.removeVehicle(targetindex)


            
            this.vehicleView.displayAllVehicles(this.vehicleModel.getallVehicles())
            this.rentalView.vehicleValues(this.vehicleModel.getallVehicles())
            this.ReservationView.vehicleValues(this.vehicleModel.getallVehicles())
        }
    });
    }


    bindActivateVehicle() {
        //manually activate vehicle status to available
    const vehicleTable = document.getElementById("vehicleTable");
    vehicleTable.addEventListener("click", (e) => {
        if (e.target.classList.contains("vehicle-update-btn")) {
            const allvehicles = this.vehicleModel.getallVehicles()
            const targetindex = e.target.dataset.index
            const targetvehicle = allvehicles[targetindex].vehicleId
            this.vehicleModel.statusVehicleUpdate(targetvehicle)
            this.vehicleView.displayAllVehicles(allvehicles)
            this.rentalView.vehicleValues(allvehicles)
            this.ReservationView.vehicleValues(allvehicles)
        }
        });
    }


}

const app = new VehicleController()
