export class RentalModel {
    constructor(){
        const saved = localStorage.getItem("rentaldatabase")
        this.allrentals = saved ? JSON.parse(saved) : []
    }
    addRental(newRental) {
        
        this.allrentals.push(newRental)
        this.saveRentals()

      
    }
    getallRentals() {
        return this.allrentals
    }
    saveRentals(){
        localStorage.setItem("rentaldatabase", JSON.stringify(this.allrentals))
    }
    removeallrentals() {
        this.allrentals = []
        this.saveRentals()
    }
    removeRental(targetindex) {
        this.allrentals.splice(targetindex, 1)
        this.saveRentals()
    }
    returnRental(targetindex) {
        const targetRental = this.allrentals[targetindex]
        targetRental.status = "Returned"
        this.saveRentals()
    }
    getReturningVehicle(targetindex) {
        const targetRental = this.allrentals[targetindex]
        return(targetRental.targetVehicle)
    }

}
