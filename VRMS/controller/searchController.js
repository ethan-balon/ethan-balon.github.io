import { vehicleSharedModel } from "../model/sharedModels.js";
import { SearchView } from "../view/searchview.js";
import { SearchModel } from "../model/searchmodel.js";

class searchController {
    constructor() {
        this.vehicleModel = vehicleSharedModel
        this.searchView = new SearchView()
        this.searchModel = new SearchModel()
        this.bindsearchVehicle()
    }

    bindsearchVehicle(){
        const button = document.getElementById("search_form")
        button.addEventListener("submit", (e)=>{
            e.preventDefault()
            const searchTerm = this.searchView.get_values()
            this.vehicleModel.searchVehicle(searchTerm)
        })
    }

}

const app = new searchController()