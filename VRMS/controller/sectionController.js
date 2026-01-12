import { SectionView, LoginView } from "../view/sectionView.js";

class SectionController {
    constructor(){
        this.SectionView = new SectionView ()
        this.LoginView = new LoginView()

    }
    refresh_page(pageName) {
        //switches each page by marking the current section as active
        const sections = document.querySelectorAll(".section")
            for (let i=0; i<sections.length; i++){
                if (sections[i].id === pageName){
                    sections[i].classList.add("active")
                }else{
                    sections[i].classList.remove("active")
                }
        }   
    }
    refresh_buttons(access) {
        const adminButtons = document.querySelectorAll(".adminButton")
        const userButtons = document.querySelectorAll(".userButton")
        if (access === 'adminAccess') {
            //Full admin privilges 
            for (let i=0; i<adminButtons.length; i++){
                adminButtons[i].classList.add("active")
            }
            for (let i=0; i<userButtons.length; i++){
                userButtons[i].classList.add("active")
            }      
        }else if (access === 'noAccess') {
            //Logged out 
            for (let i=0; i<adminButtons.length; i++){
                adminButtons[i].classList.remove("active")
            }
            for (let i=0; i<userButtons.length; i++){
                userButtons[i].classList.remove("active")
            }      
        }

    }

    bindSection() {
        //refresh the page to the corresponding section when a section button is pressed
        const [customerButton, vehicleButton, rentalButton, reservationButton, searchButton, loginButton] = this.SectionView.get_values()

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
        loginButton.onclick = ()=> {
            this.refresh_page('login_page')
            this.refresh_buttons('noAccess')
        }
        
    }

    logintest() {
        //basic login function, this function allows for upgrading with password in the future
        const yesButton = this.LoginView.get_values()
        yesButton.onclick = ()=> {
            this.refresh_buttons('adminAccess')
            this.refresh_page('customer_page')
        }
    }

    
}

const app = new SectionController()
app.bindSection()
app.logintest()