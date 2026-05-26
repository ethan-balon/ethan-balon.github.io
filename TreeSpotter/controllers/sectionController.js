import { SectionView } from "../views/sectionView.js";


class sectionController {
    constructor() {
        this.SectionView = new SectionView()
        const introductionChecker = localStorage.getItem("introductionChecker")
        this.introductionChecker = introductionChecker
    }

    //replace the current page with the required page
    refresh_page(pageName) {
    const sections = document.querySelectorAll(".section")
        for (let i=0; i<sections.length; i++){
            if (sections[i].id === pageName){
                sections[i].classList.add("active")
            }else{
                sections[i].classList.remove("active")
            }
        }   
    }

    //enables functionality of section buttons
    bindSection() {
        const [mapButton, tutorialButton, savedListButton, aboutButton, advancedOptionsButton, introductionClose, introductionDSA, introductionTutorial] = this.SectionView.get_values()

        mapButton.onclick = ()=> {
            this.refresh_page('map_page')
        }

        tutorialButton.onclick = ()=> {
            this.refresh_page('tutorial_page')
        }

        savedListButton.onclick = ()=> {
            this.refresh_page('saved_list_page')
        }

        aboutButton.onclick = ()=> {
            this.refresh_page('about_page')
        }

        advancedOptionsButton.onclick = ()=> {
            this.refresh_page('advanced_options_page')
        }


        //BUTTONS ON INTRODUCTION PAGE
        introductionClose.onclick = ()=> {
            this.refresh_page('map_page')
        }
        
        introductionDSA.onclick = ()=> {
            localStorage.setItem("introductionChecker", true)
            this.refresh_page('map_page')
        }

        introductionTutorial.onclick = ()=> {
            this.refresh_page('tutorial_page')
        }
    }



    //determines what should be the initial page displayed to the user depending on previous settings
    intialPage() {
        if (this.introductionChecker) {
            this.refresh_page('map_page')
        }else{
            this.refresh_page('introduction_page')
        }
    }
}

const app = new sectionController()
app.bindSection()
app.intialPage()