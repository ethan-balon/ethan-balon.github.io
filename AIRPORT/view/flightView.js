export class flightView {
        // get_values(){
        //     const fullName = document.getElementById('full_name').value
        //     const email = document.getElementById('email').value
        //     const phoneNumber = document.getElementById('phone_number').value
        //     const date = document.getElementById('date').value
        //     return [fullName, email, phoneNumber, date]
    // }
    updateClock() {
      const now = new Date(); // Uses the user's local computer time
      const timeString = `Last updated: ${now.toLocaleTimeString()}`;
      console.log(`flightView: Table updated on ${now.toLocaleTimeString()}`);
      document.getElementById("clock").textContent = timeString;
    }

}


