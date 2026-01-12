import { CustomerModel } from "../model/customermodel.js";
import { VehicleModel } from "../model/vehiclemodel.js";
import { RentalModel } from "../model/rentalmodel.js";

describe("CustomerModel", function() {
  let customermodel;

  beforeEach(function() {
    // clear local storage and initialize new customer model before each test
    localStorage.clear();
    customermodel = new CustomerModel();
  });

  it("should add a new customer to the system", function() {
    //create test customer. add to the system, check for the customer
    const newCustomer = {
      fullName: "Ethan",
      email: "ethan@gmail.com",
      phoneNumber: "232323",
      date: "1/1/2025"
    };

    customermodel.addCustomer(newCustomer);

    expect(customermodel.getallCustomers().length).toBe(1);
    expect(customermodel.getallCustomers()[0].fullName).toBe("Ethan");
    expect(JSON.parse(localStorage.getItem("customerdatabase")).length).toBe(1);
  });
  
  it("should remove a customer from the system", function() {
    //create 2 test customers, add them to the system, remove the first customer, and check for the second customer
    const customer1 = { fullName: "Ethan", email:"ethan@gmail.com", phoneNumber:"232323", date:"1/1/2025" };
    const customer2 = { fullName: "James" , email:"james@gmail.com", phoneNumber:"245825", date:"1/3/2025"};

    customermodel.addCustomer(customer1);
    customermodel.addCustomer(customer2);

    customermodel.removeCustomer(0);

    const customers = customermodel.getallCustomers();
    expect(customers.length).toBe(1);
    expect(customers[0].fullName).toBe("James");
    expect(JSON.parse(localStorage.getItem("customerdatabase")).length).toBe(1);
  });

  it("should get a customer by index", function() {
    //create 2 test customers, add them to the system, and only get customer2 using index
    const customer1 = { fullName: "Ethan", email:"ethan@gmail.com", phoneNumber:"232323", date:"1/1/2025" };
    const customer2 = { fullName: "James" , email:"james@gmail.com", phoneNumber:"245825", date:"1/3/2025"};
    customermodel.addCustomer(customer1);
    customermodel.addCustomer(customer2);

    const fetchedCustomer2 = customermodel.getCustomer(1);
    expect(fetchedCustomer2.fullName).toBe("James");
  });

  it("should toggle customer status with activateCustomer", function() {
    //create test customer with status deactivated by default, toggle the customer to be activated, and toggle the customer to be deactivated again
    const customer = { fullName: "Ethan", email:"ethan@gmail.com", phoneNumber:"232323", date:"1/1/2025", status: "deactivated" };
    customermodel.addCustomer(customer);


    customermodel.activateCustomer(0);
    expect(customermodel.getCustomer(0).status).toBe("active");
    expect(JSON.parse(localStorage.getItem("customerdatabase"))[0].status).toBe("active");


    customermodel.activateCustomer(0);
    expect(customermodel.getCustomer(0).status).toBe("deactivated");
    expect(JSON.parse(localStorage.getItem("customerdatabase"))[0].status).toBe("deactivated");
  });

  it("should initialize with empty array if localStorage is empty", function() {
    //run getallCustomers() function and return array even with empty localstorage
    expect(customermodel.getallCustomers()).toEqual([]);
  });

  it("should load existing customers from localStorage on initialization", function() {
    const savedCustomers = [{ fullName: "Ethan" }];
    localStorage.setItem("customerdatabase", JSON.stringify(savedCustomers));

    const newModel = new CustomerModel();
    expect(newModel.getallCustomers().length).toBe(1);
    expect(newModel.getCustomer(0).fullName).toBe("Ethan");
  });
});



// Create mock search view due to searchview requiring index.html
class MockSearchView {
    constructor() {
        this.displayed = null;
    }

    displayResult(matchedVehicles) {
        this.displayed = matchedVehicles;
    }
}

describe("VehicleModel", function() {
    let vehicleModel;
    let mockSearchView;

    beforeEach(function() {
      //cleaR locatlstorage and initialize models and views
        localStorage.clear();

        mockSearchView = new MockSearchView();
        vehicleModel = new VehicleModel();
        vehicleModel.searchView = mockSearchView; // use the mock searchview instead of the real searchview
    });

    it("should add a new vehicle", function() {
      // create a test vehicle and check if it is in the system
        const vehicle = { vehicleId: "V1", make: "Toyota", model: "Corolla", type: "Sedan" };
        vehicleModel.addVehicle(vehicle);

        const vehicles = vehicleModel.getallVehicles();
        expect(vehicles.length).toBe(1);
        expect(vehicles[0].make).toBe("Toyota");
        expect(JSON.parse(localStorage.getItem("vehicledatabase")).length).toBe(1);
    });

    it("should remove a vehicle by index", function() {
      //create 2 test vehicles, delete the first vehicle, and check if there is still the second vehicle.
        const v1 = { vehicleId: "V1", make: "Toyota" };
        const v2 = { vehicleId: "V2", make: "Honda" };
        vehicleModel.addVehicle(v1);
        vehicleModel.addVehicle(v2);

        vehicleModel.removeVehicle(0);

        const vehicles = vehicleModel.getallVehicles();
        expect(vehicles.length).toBe(1);
        expect(vehicles[0].vehicleId).toBe("V2");
    });


    it("should update vehicle status to unavailable", function() {
      //create a test vehicle with status available, set it to unavailable, and check if the status has changed
        const vehicle = { vehicleId: "V1", status: "available" };
        vehicleModel.addVehicle(vehicle);

        vehicleModel.statusVehicleUpdate("V1");

        expect(vehicleModel.getallVehicles()[0].status).toBe("unavailable");
    });

    it("should reserve a vehicle", function() {
      //create a test vehicle also with status available, set it to reserved, and check if the status has changed
        const vehicle = { vehicleId: "V1", status: "available" };
        vehicleModel.addVehicle(vehicle);

        vehicleModel.reserveVehicle("V1");

        expect(vehicleModel.getallVehicles()[0].status).toBe("reserved");
    });

    it("should search vehicles by make, model, or type", function() {
      //create three test vehicles, use the searchVehicle() function to search vehicles by make, model, type and location
        const v1 = { vehicleId: "V1", make: "Toyota", model: "Corolla", type: "Sedan", location:"Christchurch"};
        const v2 = { vehicleId: "V2", make: "Honda", model: "Civic", type: "Sedan", location:"Auckland"};
        const v3 = { vehicleId: "V3", make: "Toyota", model: "Camry", type: "SUV", location:"Wellington" };
        vehicleModel.addVehicle(v1);
        vehicleModel.addVehicle(v2);
        vehicleModel.addVehicle(v3);

        // Search by make
        vehicleModel.searchVehicle("Toyota");
        expect(mockSearchView.displayed.length).toBe(2);

        // Search by model
        vehicleModel.searchVehicle("Civic");
        expect(mockSearchView.displayed.length).toBe(1);
        expect(mockSearchView.displayed[0].vehicleId).toBe("V2");

        // Search by type
        vehicleModel.searchVehicle("SUV");
        expect(mockSearchView.displayed.length).toBe(1);
        expect(mockSearchView.displayed[0].vehicleId).toBe("V3");

        // Search by location
        vehicleModel.searchVehicle("Christchurch");
        expect(mockSearchView.displayed.length).toBe(1);
        expect(mockSearchView.displayed[0].vehicleId).toBe("V1");
    });

    it("should initialize with empty array if localStorage is empty", function() {
      //run getallVehicles() when localstorage is empty and expect an empty array
        const newModel = new VehicleModel();
        newModel.searchView = mockSearchView;
        expect(newModel.getallVehicles()).toEqual([]);
    });

    it("should load vehicles from localStorage on initialization", function() {
      //create a test vehicle and save it to localstorage, initialize vehicle model and check if vehicle is in the system
        const savedVehicles = [{ vehicleId: "V1", make: "Ford" }];
        localStorage.setItem("vehicledatabase", JSON.stringify(savedVehicles));

        const newModel = new VehicleModel();
        newModel.searchView = mockSearchView;

        expect(newModel.getallVehicles().length).toBe(1);
        expect(newModel.getallVehicles()[0].make).toBe("Ford");
    });
});


describe("RentalModel", function() {
    let rentalModel;

    beforeEach(function() {
      //clear localstorage and initialise rentalmodel before each test
        localStorage.clear();
        rentalModel = new RentalModel();
    });

    it("should initialize with an empty array if localStorage is empty", function() {
      //check if getallRentals() returns array even if locatlstorage is empty
        expect(rentalModel.getallRentals()).toEqual([]);
    });

    it("should load rentals from localStorage on initialization", function() {
      //create test rental and check if it is in the system
        const savedRentals = [{ rentalId: "R1" }];
        localStorage.setItem("rentaldatabase", JSON.stringify(savedRentals));

        const newModel = new RentalModel();
        expect(newModel.getallRentals().length).toBe(1);
        expect(newModel.getallRentals()[0].rentalId).toBe("R1");
    });

    it("should add a new rental", function() {
      //cjreate a test rental, test if rental is in the system, test if rental is in localstorage
        const rental = { rentalId: "R1" };
        rentalModel.addRental(rental);

        const rentals = rentalModel.getallRentals();
        expect(rentals.length).toBe(1);
        expect(rentals[0].rentalId).toBe("R1");


        const saved = JSON.parse(localStorage.getItem("rentaldatabase"));
        expect(saved.length).toBe(1);
        expect(saved[0].rentalId).toBe("R1");
    });

    it("should remove a rental by index", function() {
      //create 2 test rentals, delete first rental, check if second rental is still in syhstem
        const r1 = { rentalId: "R1" };
        const r2 = { rentalId: "R2" };
        rentalModel.addRental(r1);
        rentalModel.addRental(r2);

        rentalModel.removeRental(0);

        const rentals = rentalModel.getallRentals();
        expect(rentals.length).toBe(1);
        expect(rentals[0].rentalId).toBe("R2");
    });


    it("should save rentals to localStorage", function() {
      //create test rental and add to the system, check if it is in local storage
        const rental = { rentalId: "R1" };
        rentalModel.addRental(rental);

        const saved = JSON.parse(localStorage.getItem("rentaldatabase"));
        expect(saved.length).toBe(1);
        expect(saved[0].rentalId).toBe("R1");
    });
});