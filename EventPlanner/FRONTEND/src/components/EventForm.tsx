import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import type { JSX } from "react/jsx-runtime";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    title: string,
    date: string,
    hours: number,
    startTime: number,
    location: string
  ) => Promise<boolean>; // Returns true if save was successful
  editingEvent: any;
}

export default function EventForm({
  isOpen,
  onClose,
  onSubmit,
  editingEvent,
}: EventFormProps): JSX.Element | null {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Sync state with editingEvent when editing starts or when modal opens
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setHours(editingEvent.hours !== undefined ? editingEvent.hours.toString() : "");
      setStartTime(editingEvent.startTime !== undefined ? editingEvent.startTime.toString() : "");
      setLocation(editingEvent.location);
    } else {
      // Clear for new event
      setTitle("");
      setDate("");
      setHours("");
      setStartTime("");
      setLocation("");
    }
    setError(null);
  }, [editingEvent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    // Front-end numeric pre-validation
    const parsedHours = parseInt(hours, 10);
    const parsedStartTime = parseInt(startTime, 10);

    if (isNaN(parsedHours) || parsedHours < 0) {
      setError("Duration must be a positive integer.");
      return;
    }

    if (isNaN(parsedStartTime) || parsedStartTime < 0 || parsedStartTime > 23) {
      setError("Start time must be a number between 0 and 23 (inclusive).");
      return;
    }

    try {
      // Call onSubmit. If successful, it returns true and we close.
      // If the backend throws a validation error, we catch it!
      const success = await onSubmit(
        title,
        date,
        parsedHours,
        parsedStartTime,
        location
      );
      if (success) {
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingEvent ? "✏️ Edit Event" : "✨ Add New Event"}</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="error-alert">
                <span>⚠️</span> {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="event-title">
                Event Title
              </label>
              <input
                id="event-title"
                className="form-input"
                type="text"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g., Study Session, Birthday Bash"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="event-date">
                Event Date
              </label>
              <input
                id="event-date"
                className="form-input"
                type="date"
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="event-start-time">
                  Start Time (Hour 0-23)
                </label>
                <input
                  id="event-start-time"
                  className="form-input"
                  type="number"
                  min="0"
                  max="23"
                  value={startTime}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setStartTime(e.target.value)
                  }
                  placeholder="e.g., 14 for 2:00 PM"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="event-hours">
                  Duration (Hours)
                </label>
                <input
                  id="event-hours"
                  className="form-input"
                  type="number"
                  min="1"
                  value={hours}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHours(e.target.value)
                  }
                  placeholder="e.g., 2"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="event-location">
                Location
              </label>
              <input
                id="event-location"
                className="form-input"
                type="text"
                value={location}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
                placeholder="e.g., Library Block C, Main Cafe"
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" type="submit">
              {editingEvent ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
