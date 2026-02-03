export class flightModel {

    fetchEntries(){

        // New Zealand location
        const lamin = -47.5;
        const lamax = -34.0;
        const lomin = 166.0;
        const lomax = 179.0;

        const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.states) {
            console.log("flightModel: No data returned.");
            return;
            }

            const firstTen = data.states.slice(0, 10); //delete all except 10 for testing purpose

            if (localStorage.getItem("api_entries")) {
            localStorage.removeItem("api_entries");
            console.log("flightModel: Deleted old entries from localStorage");
            }

            localStorage.setItem("api_entries", JSON.stringify(firstTen));

            console.log("flightModel: Saved raw entries to localStorage");
            console.log(firstTen); 
        })
        .catch(err => console.error("Error fetching OpenSky data:", err));

    }
    getEntries() {
        const api_entries = localStorage.getItem("api_entries")
        return api_entries
    }
}

