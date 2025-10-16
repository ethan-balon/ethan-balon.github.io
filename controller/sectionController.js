import { SectionView } from "../view/view.js";

class Controller {
    constructor(){
        this.SectionView = new SectionView ()

    }
    refresh_page(pageName) {
        const sections = document.querySelectorAll(".section")
            for (let i=0; i<sections.length; i++){
                if (sections[i].id === pageName){
                    console.log(sections[i].id)
                    sections[i].classList.add("active")
                }else{
                    sections[i].classList.remove("active")
                }
        }   
    }
    bindSection() {
        const [customerButton, vehicleButton, rentalButton, reservationButton, searchButton] = this.SectionView.get_values()

        vehicleButton.onclick = ()=> {
            this.refresh_page('vehicle_page')
        }
        rentalButton.onclick = ()=> {
            this.refresh_page('rental_page')
        }
        reservationButton.onclick = ()=> {
            this.refresh_page('reservation_page')
        }
        customerButton.onclick = ()=> {
            this.refresh_page('customer_page')
        }
        searchButton.onclick = ()=> {
            this.refresh_page('search_page')
        }
        
    }

    
}

const app = new Controller()
app.bindSection()