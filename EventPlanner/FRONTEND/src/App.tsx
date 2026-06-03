import { useState, useEffect, useMemo } from "react";
import type { JSX } from "react/jsx-runtime";
import "./App.css";
import "./components/EventPlanner.css";

// Import existing backend code directly
import { IndexedDbEventRepository } from "./backend/repo/indexed_db_event_repository.js";
import { EventManager } from "./backend/model/event_manager.js";

// Import React UI Components
import EventCard from "./components/EventCard";
import EventForm from "./components/EventForm";
import { OfflineBanner } from "./components/OfflineBanner";

export default function App(): JSX.Element {
  // Instantiate repository and event manager exactly once in the lifecycle
  const repo = useMemo(() => new IndexedDbEventRepository(), []);
  const manager = useMemo(() => new EventManager(repo), [repo]);

  // React state variables
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchField, setSearchField] = useState<string>("title");
  const [sortBy, setSortBy] = useState<string>("date");
  
  // Modal controls
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  // 1. Initial Data Load from IndexedDB
  useEffect(() => {
    async function loadInitialEvents() {
      try {
        const storedEvents = await repo.getAll();
        manager.setEvents(storedEvents || []);
        // Trigger React state update with a new array reference
        setEvents([...manager.getAllEvents()]);
      } catch (err) {
        console.error("Failed to load events from IndexedDB repository:", err);
      }
    }
    loadInitialEvents();
  }, [repo, manager]);

  // 2. Sorting & Filtering
  // We sort in-place inside the EventManager cache using your R3 implementation, 
  // then copy it, and then filter by user's search queries.
  const displayedEvents = useMemo(() => {
    // Sort in-place using backend sorting method
    manager.sortEvents(sortBy);
    const sorted = [...manager.getAllEvents()];

    // Apply front-end filtering
    return sorted.filter((event) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();

      if (searchField === "title") {
        return event.title.toLowerCase().includes(query);
      }
      if (searchField === "location") {
        return event.location.toLowerCase().includes(query);
      }
      if (searchField === "date") {
        return event.date.includes(query);
      }
      if (searchField === "id") {
        return event.id?.toString() === query;
      }
      return true;
    });
  }, [events, searchQuery, searchField, sortBy, manager]);

  // 3. Add & Edit Form Submit Handler
  const handleFormSubmit = async (
    title: string,
    date: string,
    hours: number,
    startTime: number,
    location: string
  ): Promise<boolean> => {
    try {
      if (editingEvent) {
        // Edit existing event using backend R6 method
        await manager.editEvent(
          editingEvent.id,
          title,
          date,
          hours,
          startTime,
          location
        );
      } else {
        // Add new event using backend R2 method
        await manager.addEvent(title, date, hours, startTime, location);
      }

      // Synchronize state and close form
      setEvents([...manager.getAllEvents()]);
      setEditingEvent(null);
      return true;
    } catch (err: any) {
      // Throw the error to be caught by the form's local error handler
      throw err;
    }
  };

  // 4. Delete Event Handler
  const handleDeleteEvent = async (id: number) => {
    if (confirm("Are you sure you want to permanently delete this event?")) {
      try {
        await manager.deleteEvent(id);
        setEvents([...manager.getAllEvents()]);
      } catch (err) {
        alert("Failed to delete event: " + err);
      }
    }
  };

  // 5. Revert/Undo Changes Handler
  const handleUndoChanges = async (id: number) => {
    try {
      await manager.undoEvent(id);
      setEvents([...manager.getAllEvents()]);
    } catch (err: any) {
      alert(`Could not revert changes: ${err.message}`);
    }
  };

  // Open modal for a new event
  const handleOpenAddForm = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  // Open modal for editing an event
  const handleOpenEditForm = (event: any) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  return (
    <div className="event-planner-container">
      {/* Premium styling for offline warning banner */}
      <OfflineBanner />

      <div className="event-planner-wrapper">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <div className="dashboard-title-group">
            <h1>Campus Event Planner</h1>
            <p className="subtitle">
              Plan, organize, and manage your campus schedules in real-time.
            </p>
          </div>

          <button className="btn-primary" onClick={handleOpenAddForm}>
            <span>✨</span> Create New Event
          </button>
        </header>

        {/* Real-time stats */}
        <section className="stats-bar">
          <div className="stat-pill">
            <span>📅</span> Total Events:{" "}
            <span className="stat-count">{events.length}</span>
          </div>
          <div className="stat-pill">
            <span>🔍</span> Matches Found:{" "}
            <span className="stat-count">{displayedEvents.length}</span>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="controls-container">
          <div className="search-wrapper">
            <select
              className="search-select"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              aria-label="Filter events by field"
            >
              <option value="title">Search Title</option>
              <option value="location">Search Location</option>
              <option value="date">Search Date</option>
              <option value="id">Search Event ID</option>
            </select>

            <input
              className="search-input"
              type="text"
              placeholder={`Search ${searchField}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Enter search query"
            />
          </div>

          <div className="sort-wrapper">
            <span className="sort-label">Sort By:</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort events by attribute"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="location">Location</option>
              <option value="hours">Duration</option>
              <option value="startTime">Start Time</option>
            </select>
          </div>
        </section>

        {/* Events Grid */}
        <main className="events-grid">
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleOpenEditForm}
                onDelete={handleDeleteEvent}
                onUndo={handleUndoChanges}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No events found</h3>
              <p>
                {searchQuery
                  ? "Try adjusting your search terms or filter parameters."
                  : "Get started by adding your first campus event!"}
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Adding/Editing Modal Form */}
      <EventForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingEvent={editingEvent}
      />
    </div>
  );
}
