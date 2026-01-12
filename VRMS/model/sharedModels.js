import { VehicleModel } from "./vehiclemodel.js";

export const vehicleSharedModel = new VehicleModel()

//purpose of shared model is to ensure the options in rental and reservation form are in sync
//this is to prevent inconsistencies in vehicle and customer availability