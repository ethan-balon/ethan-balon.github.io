import { flightModel } from "../model/flightModel.js";
import { flightView } from "../view/flightView.js";

class CustomerController {
    constructor(){

        this.flightModel =  new flightModel()
        this.flightView = new flightView()
        this.bindUpdateFlights()
        this.startbindUpdateFlights()
    }

    bindUpdateFlights(){
    const button = document.getElementById("updateButton");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        // this.flightModel.fetchEntries()
        const api_entries = this.flightModel.getEntries()
        this.flightView.updateTable(api_entries)
        this.flightView.updateBanner(api_entries)
        this.flightView.updateClock()
    })
    }
    startbindUpdateFlights(){
        // this.flightModel.fetchEntries()
        const api_entries = this.flightModel.getEntries()
        this.flightView.updateTable(api_entries)
        this.flightView.updateClock()
    }

    
}

const app = new CustomerController()




// function getData() {
//   try {
//     updateTable('hello');
//   } catch(err) {
//     flightTable.innerHTML = err;
//   }
// }
// const flightTable  = document.getElementById('flightTable');


// function updateTable(data) {
//     flightTable.innerHTML = ' '
//     let thing = Math.floor(Math.random() * 100)
//     while (thing != 100) { 
//     console.log(thing) 
//     thing += 1
//     let html = ' ';
//     html += `<tr>`;
//     html += `<td><p>test</p></td>`;
//     html += `<td><p>${Math.floor(Math.random() * 100)}</p></td>`;
//     html += `</tr>`;
//     flightTable.innerHTML = flightTable.innerHTML + html;
//     }
    
// }
