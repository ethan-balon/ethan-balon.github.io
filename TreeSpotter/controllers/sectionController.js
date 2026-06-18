import { SectionView } from "../views/sectionView.js";
import { TutorialController } from "./tutorialController.js";
import { MapController } from "./mapController.js";
import { SavedListController } from "./savedListController.js";


export class sectionController {
    constructor() {
        this.SectionView = new SectionView()
        this.tutorialController = new TutorialController()
        this.mapController = new MapController()
        this.savedListController = new SavedListController()
        const introductionChecker = localStorage.getItem("introductionChecker")
        this.introductionChecker = introductionChecker
        this.infoBarText = this.SectionView.get_infobar()
    }

    refreshInfoBar(text) {
        this.infoBarText.textContent = text
    }

    //replace the current page with the required page
    refreshPage(pageName) {
    const sections = document.querySelectorAll(".section")
        for (let i=0; i<sections.length; i++){
            if (sections[i].id === pageName){
                sections[i].classList.add("active")
            }else{
                sections[i].classList.remove("active")
            }
        }
    }

    //replace the current aside with the required aside
    refreshAside(asideName) {
        const sections = document.querySelectorAll(".asidesection")
            for (let i=0; i<sections.length; i++){
                if (sections[i].id === asideName){
                    sections[i].classList.add("active")
                }else{
                    sections[i].classList.remove("active")
                }
            }   
    }

    changeScreen(pageName) {
        this.refreshPage(pageName + '_page')
        this.refreshAside(pageName + '_aside')
        //default infobartext
        if (pageName === "map") {
            this.refreshInfoBar("Type on the search bar to search for a tree, or press enter to display all trees in your area.")
        }
        else if (pageName === "tutorial") {
            this.refreshInfoBar("Click on the video to play the full tutorial, or use the chapters on the left side menu")
        }
        else if (pageName === "saved_list") {
            this.refreshInfoBar("Navigate or remove a saved tree on the list below")
            this.savedListController.loadAndRender()
        }
        else{
            this.refreshInfoBar()
        }
    }

    //enables functionality of section buttons
    bindSection() {
        const [mapButton, tutorialButton, savedListButton, aboutButton, advancedOptionsButton, introductionClose, introductionDSA, introductionTutorial] = this.SectionView.get_values()

        
        mapButton.onclick = ()=> {
            this.changeScreen("map")
        }

        tutorialButton.onclick = ()=> {
            this.changeScreen("tutorial")
        }

        savedListButton.onclick = ()=> {
            this.changeScreen("saved_list")
        }

        aboutButton.onclick = ()=> {
            this.changeScreen("about")
        }

        // advancedOptionsButton.onclick = ()=> {
        //     this.changeScreen("advanced_options")
        // }


        //BUTTONS ON INTRODUCTION PAGE
        introductionClose.onclick = ()=> {
            this.changeScreen("map")
        }
        
        introductionDSA.onclick = ()=> {
            localStorage.setItem("introductionChecker", true)
            this.changeScreen("map")
        }

        introductionTutorial.onclick = ()=> {
            this.changeScreen("tutorial")
        }
    }



    //determines what should be the initial page displayed to the user depending on previous settings
    intialPage() {
        if (this.introductionChecker) {
            this.changeScreen("map")
        }else{
            this.changeScreen("introduction")
        }
    }
}

const app = new sectionController()
app.bindSection()
app.intialPage()