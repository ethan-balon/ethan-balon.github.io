export class flightModel {
    constructor() {
        
    }

    fetchEntries(){

        // coordinates of new zealand
        const lamin = -47.5
        const lamax = -34.0
        const lomin = 166.0
        const lomax = 179.0

        // build url using nz coordinates
        const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

        fetch(url) //fetch data from opensky within nz airspace
        .then(res => res.json()) //convert raw data into json
        .then(data => {

            const apiEntries = data.states.slice(0, 20); //FOR TESTING: will delete all except 20 for testing purpose

            if (localStorage.getItem("api_entries")) {
            localStorage.removeItem("api_entries")
            console.log("flightModel: Deleted old entries from localStorage")
            }

            localStorage.setItem("api_entries", JSON.stringify(apiEntries))
            console.log(`flightModel: Saved new entries to localStorage`)
        })
        .catch(err => console.error("Error fetching OpenSky data:", err))

    }
    getEntries() {
        const api_entries = localStorage.getItem("api_entries")
        return api_entries
    }
    getFLightID(target) {
        //sorry i know this is messy i will fix it later
        const api_entries = localStorage.getItem("api_entries")
        const formatted_entries = JSON.parse(api_entries)
        const targetFlight = formatted_entries[target]
        const targetID = targetFlight[0]
        return targetID
    }
    locateFlight(targetID) {
        console.log(`flightModel: Requesting opensky to locate flight ${targetID}`)
        window.open(`https://map.opensky-network.org/?icao=${targetID}`, "_blank")
    }
}

