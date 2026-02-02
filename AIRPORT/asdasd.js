import fs from "fs";

// New Zealand bounding box
const lamin = -47.5;
const lamax = -34.0;
const lomin = 166.0;
const lomax = 179.0;

const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (!data.states) {
      console.error("No data returned from OpenSky.");
      return;
    }

    const firstTen = data.states.slice(0, 10);

    // Convert raw arrays into clean objects
    // const formatted = firstTen.map(plane => ({
    //   callsign: plane[1]?.trim() || "",
    //   country: plane[2] || "",
    //   latitude: plane[6] || "",
    //   longitude: plane[5] || "",
    //   altitude: plane[7] || ""
    // }));

    // Save as pretty JSON
    fs.writeFileSync("entries.txt", JSON.stringify(firstTen, null, 2));

    console.log("Saved 10 entries to entries.txt");
  })
  .catch(err => console.error("Fetch error:", err));