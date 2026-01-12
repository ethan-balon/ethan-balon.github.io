export class CustomerModel {
    constructor(){
        const saved = localStorage.getItem("customerdatabase")
        this.allCustomers = saved ? JSON.parse(saved) : [];
    }
    addCustomer(newCustomer) {
        this.allCustomers.push(newCustomer)
        this.saveCustomers()
    }
    getallCustomers() {
        return this.allCustomers
    }
    saveCustomers(){
        localStorage.setItem("customerdatabase", JSON.stringify(this.allCustomers))
    }
    removeCustomer(targetindex) {
        this.allCustomers.splice(targetindex, 1)
        this.saveCustomers()
    }
    getCustomer(targetindex) {
        return this.allCustomers[targetindex]
    }
    activateCustomer(targetindex) {
        const targetCustomer = this.allCustomers[targetindex]
        if (targetCustomer.status === "deactivated") {
            targetCustomer.status = "active"
        }else {
            targetCustomer.status = "deactivated"
        }
        this.saveCustomers()
    }
}

