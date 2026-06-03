export class Event {
    // INITIAL VALUES
    #id
    #title
    #date
    #hours
    #startTime
    #location
    #previouslValues = []
    constructor(id, title, date, hours, startTime, location) {
        //ORIGINAL VALUES
        this.#id = id
        this.#title = title
        this.#date = date
        this.#hours = hours
        this.#startTime = startTime
        this.#location = location
        //COPY ORIGINAL VALUES FOR R7 FUNCTIONALITY
        this.#previouslValues = [id, title, date, hours, startTime, location]
    }



    get id() { return this.#id; }
    get title() { return this.#title; }
    get date() { return this.#date; }
    get hours() { return this.#hours; }
    get startTime() { return this.#startTime; }
    get location() { return this.#location; }

    set id(newId) { this.#id = newId; }

    //SAVES PREVIOUS AND PREPARES FOR R7 FUNCTIONAILITY
    savePreviousState() {
        this.#previouslValues = [
            this.#id,
            this.#title,
            this.#date,
            this.#hours,
            this.#startTime,
            this.#location
        ];
    }

    //R6 Update/Edit a part
    updateChanges(id, title, date, hours, startTime, location) {
        this.savePreviousState();
        if (id !== undefined) this.#id = id
        if (title !== undefined) this.#title = title
        if (date !== undefined) this.#date = date
        if (hours !== undefined) this.#hours = hours
        if (startTime !== undefined) this.#startTime = startTime
        if (location !== undefined) this.#location = location
    }

    //R7 - Discard/revert edits to a part
    undoChanges() {
        this.#id = this.#previouslValues[0]
        this.#title = this.#previouslValues[1]
        this.#date = this.#previouslValues[2]
        this.#hours = this.#previouslValues[3]
        this.#startTime = this.#previouslValues[4]
        this.#location = this.#previouslValues[5]
    }

    
    //R8 Validate inputs
    validate() {
        if (this.#id !== null && this.#id !== undefined && !Number.isInteger(this.#id)) throw new Error("Invalid event ID");
        if (!this.#title || typeof this.#title !== "string") throw new Error("Invalid event title");
        if (!this.#date || isNaN(new Date(this.#date).getTime())) throw new Error("Invalid event date");
        if (this.#hours === null || this.#hours === undefined || !Number.isInteger(this.#hours)) throw new Error("Invalid duration");
        if (this.#startTime === null || this.#startTime === undefined || !Number.isInteger(this.#startTime)) throw new Error("Invalid start time");
        if (!this.#location || typeof this.#location !== "string") throw new Error("Invalid location");
        
        if (this.#hours < 0 || this.#startTime < 0) throw new Error("Numbers cannot be less than 0");
        if (this.#startTime > 23) throw new Error("Hours cannot be greater than 23 or 11PM");
    }

    //R9 Calculations within a part
    calculateEndTime() {
        let endTime = this.#startTime + this.#hours;
        let nextDay = false;
        
        if (endTime > 23) {
            let endTimeDifference = endTime - 24;
            endTime = endTimeDifference;
            nextDay = true;
        }
        return { endTime, nextDay }; 
    }





    toPlainObject() {
        const data = {
            title: this.#title,
            date: this.#date,
            hours: this.#hours,
            startTime: this.#startTime,
            location: this.#location
        }

        if (this.#id !== null && this.#id !== undefined) {
            data.id = this.#id
        }

        return data
    }
}
