import { flightModel } from "../model/flightModel.js";
import { flightView } from "../view/flightView.js";

class CustomerController {
    constructor(){

        this.flightModel =  new flightModel()
        this.flightView = new flightView()
        this.bindUpdateCustomer()
        this.startbindUpdateCustomer()
    }

    bindUpdateCustomer(){
    const button = document.getElementById("updateButton");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        this.flightView.updateClock()
        this.flightModel.updateTable()
    })
    }
    startbindUpdateCustomer(){
        this.flightView.updateClock()
        this.flightModel.updateTable()
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
