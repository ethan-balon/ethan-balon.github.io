import { SectionView } from "../views/sectionView.js";


class sectionController {
    constructor() {
        this.SectionView = new SectionView()
    }

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

    bindSection() {
        const [mapButton, tutorialButton, savedListButton, aboutButton, advancedOptionsButton] = this.SectionView.get_values()

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
        
    }
}

const app = new sectionController()
app.bindSection()