import { Event } from "./event.js"

export class EventManager {
    // MAIN DATABASE
    #repository
    // LOCAL CACHE
    #allEventsLocal
    //R1 Whole part container 
    constructor(repository) {
        this.#repository = repository
        this.#allEventsLocal = []
    }

    //R2 Add part
    async addEvent(title, date, hours, startTime, location) {
        if (!date || hours === undefined || startTime === undefined ) {
            throw new Error("Missing required details")
        }
        title = title || "New Event";
        location = location || "No Location";

        if (typeof title !== "string" || !title.trim()) {
            throw new Error("Invalid title")
        }

        const newEvent = new Event(null, title, date, parseInt(hours), parseInt(startTime), location)

        const newId = await this.#repository.add(newEvent.toPlainObject())
        newEvent.id = newId 

        this.#allEventsLocal.push(newEvent)
        return newEvent
    }
    //R3 Sort parts
    sortEvents(byField = "date") {
        return this.#allEventsLocal.sort((a, b) => {
            if (byField === "date") return new Date(a.date) - new Date(b.date);
            if (typeof a[byField] === "string") return a[byField].localeCompare(b[byField]);
            return a[byField] - b[byField];
        });
    }
    //R6 Update/Edit Event
    async editEvent(id, title, date, hours, startTime, location) {
        const event = this.#allEventsLocal.find((e) => e.id === id);
        if (!event) throw new Error("Event not found");

        event.updateChanges(undefined, title, date, hours !== undefined ? parseInt(hours) : undefined, startTime !== undefined ? parseInt(startTime) : undefined, location);

        event.validate();
        
        if (this.#repository) await this.#repository.update(event.toPlainObject());
        return event;
    }
    //R5 Delete a part
    async deleteEvent(id) {
        const index = this.#allEventsLocal.findIndex((e) => e.id === id);
        if (index === -1) {
            throw new Error("Event not found");
        }
        const deletedEvent = this.#allEventsLocal[index];
        this.#allEventsLocal.splice(index, 1);
        if (this.#repository) {
            await this.#repository.remove(id);
        }
        return deletedEvent;
    }

    //R4Search parts using critera
    findEventId(id) {
        const event = this.#allEventsLocal.find((e) => e.id === id);
        return event
    }
    findEventTitle(title) {
        const event = this.#allEventsLocal.find((e) => e.title === title);
        return event
    }
    findEventDate(date) {
        const event = this.#allEventsLocal.find((e) => e.date === date);
        return event
    }
    findEventLocation(location) {
        const event = this.#allEventsLocal.find((e) => e.location === location);
        return event
    }

    //R7 Discard/Revert edits
    async undoEvent(id) {
        const event = this.#allEventsLocal.find(e => e.id === id);
        if (!event) throw new Error("Event not found");

        event.undoChanges();
        event.validate();

        if (this.#repository) {
            await this.#repository.update(event.toPlainObject());
        }

        return event;
    }

    //R12 GEt all parts
    getAllEvents() {
        return this.#allEventsLocal;
    }
    totalEvents() {
        return this.#allEventsLocal.length;
    }
    
    // Add a way to load events initially
    setEvents(eventsArray) {
        this.#allEventsLocal = eventsArray.map(item => new Event(item.id, item.title, item.date, item.hours, item.startTime, item.location));
    }
}
