// fetch("https://opensky-network.org/api/states/all")
//   .then(response => response.json())
//   .then(data => {
//     // data.states is the array of aircraft
//     const firstTen = data.states.slice(0, 10);

//     console.log("First 10 aircraft:");
//     console.log(firstTen);
//   })
//   .catch(error => {
//     console.error("Error fetching OpenSky data:", error);
//   });




//   fetch("https://opensky-network.org/api/states/all")
//   .then(res => res.json())
//   .then(data => {
//     const firstTen = data.states.slice(0, 10);

//     firstTen.forEach((plane, index) => {
//       console.log(
//         `${index + 1}. Callsign: ${plane[1]?.trim() || "N/A"}, ` +
//         `Country: ${plane[2]}, ` +
//         `Altitude: ${plane[7]} m`
//       );
//     });
//   })
//   .catch(err => console.error(err));









// // Approx bounding box for New Zealand
// const lamin = -47.5;  // south
// const lamax = -34.0;  // north
// const lomin = 166.0;  // west
// const lomax = 179.0;  // east

// const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     if (!data.states) {
//       console.log("No aircraft found in NZ region right now.");
//       return;
//     }

//     const firstTen = data.states.slice(0, 10);

//     console.log("First 10 aircraft in New Zealand region:");
//     firstTen.forEach((plane, i) => {
//       console.log(
//         `${i + 1}. Callsign: ${plane[1]?.trim() || "N/A"}, ` +
//         `Country: ${plane[2]}, ` +
//         `Lat: ${plane[6]}, Lon: ${plane[5]}, ` +
//         `Alt: ${plane[7]} m`
//       );
//     });
//   })
//   .catch(err => console.error("Error fetching OpenSky data:", err));













// // New Zealand bounding box
// const lamin = -47.5;
// const lamax = -34.0;
// const lomin = 166.0;
// const lomax = 179.0;

// const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     if (!data.states) {
//       console.log("No data returned.");
//       return;
//     }

//     const firstTen = data.states.slice(0, 10);

//     // 🔹 Raw output only
//     console.log(firstTen);
//   })
//   .catch(err => console.error("Error fetching OpenSky data:", err));





// import fs from "fs";


// const lamin = -47.5;
// const lamax = -34.0;
// const lomin = 166.0;
// const lomax = 179.0;

// const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     if (!data.states) {
//       console.error("No data returned from OpenSky.");
//       return;
//     }

//     const firstTen = data.states.slice(0, 10);


//     // const formatted = firstTen.map(plane => ({
//     //   callsign: plane[1]?.trim() || "",
//     //   country: plane[2] || "",
//     //   latitude: plane[6] || "",
//     //   longitude: plane[5] || "",
//     //   altitude: plane[7] || ""
//     // }));


//     fs.writeFileSync("entries.txt", JSON.stringify(firstTen, null, 2));

//     console.log("Saved 10 entries to entries.txt");
//   })
//   .catch(err => console.error("Fetch error:", err));























//   // NZ bounding box
// const lamin = -47.5;
// const lamax = -34.0;
// const lomin = 166.0;
// const lomax = 179.0;

// const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     const firstTen = data.states.slice(0, 10);

//     console.log("Callsigns of first 10 planes:");

//     firstTen.forEach((plane, index) => {
//       // 👇 plane[1] is the callsign
//       const callsign = plane[1];

//       console.log(`${index + 1}:`, callsign);
//     });
//   })
//   .catch(err => console.error(err));











// // New Zealand bounding box
// const lamin = -47.5;
// const lamax = -34.0;
// const lomin = 166.0;
// const lomax = 179.0;

// const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

// fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     if (!data.states) {
//       console.log("No data returned.");
//       return;
//     }

//     const firstTen = data.states.slice(0, 10);

//     // 🔹 Save to localStorage as a string
//     localStorage.setItem("opensky_raw_entries", JSON.stringify(firstTen));

//     console.log("Saved raw entries to localStorage!");
//     console.log(firstTen); // still log it too
//   })
//   .catch(err => console.error("Error fetching OpenSky data:", err));
