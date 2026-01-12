export class ReservationModel {
    constructor(){
        const saved = localStorage.getItem("reservationdatabase")
        this.allReservations =  saved ? JSON.parse(saved) : []
    }
    addReservation(newVehicle) {
        
        this.allReservations.push(newVehicle)
        this.saveReservations()

      
    }
    getallReservations() {
        return this.allReservations
    }
    saveReservations(){
        localStorage.setItem("reservationdatabase", JSON.stringify(this.allrentals))
    }
    removeReservation(targetindex) {
        this.allReservations.splice(targetindex, 1)
        this.saveReservations()
    }
    cancelReservation(targetindex) {
        const targetReservation = this.allReservations[targetindex]
        targetReservation.status = "cancelled"
        this.saveReservations()
    }
    getReturningVehicle(targetindex) {
        const targetReservation = this.allReservations[targetindex]
        return(targetReservation.targetVehicle)
    }
}
