import type { JSX } from "react/jsx-runtime";

// We import the Event class from backend. 
// Since it's a JS class, we can type it as any or define a specific interface.
interface EventCardProps {
  event: any; 
  onEdit: (event: any) => void;
  onDelete: (id: number) => void;
  onUndo: (id: number) => void;
}

export default function EventCard({
  event,
  onEdit,
  onDelete,
  onUndo,
}: EventCardProps): JSX.Element {
  const { title, date, hours, startTime, location, id } = event;

  // Calculate ending time using backend class method
  const { endTime, nextDay } = event.calculateEndTime();

  // Helper to format integer hours (0-23) into readable AM/PM format
  const formatTime = (hour: number): string => {
    if (hour === null || hour === undefined || isNaN(hour)) return "N/A";
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${ampm}`;
  };

  // Helper to format dates to a more user-friendly form
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-card" id={`event-card-${id}`}>
      <div className="event-card-header">
        <h3 className="event-card-title">{title}</h3>
        <span className="event-location-badge">
          <span className="event-detail-icon">📍</span> {location}
        </span>
      </div>

      <div className="event-details-body">
        <div className="event-detail-item">
          <span className="event-detail-icon">📅</span>
          <span>{formatDate(date)}</span>
        </div>

        <div className="event-detail-item">
          <span className="event-detail-icon">🕒</span>
          <span>
            <span className="time-highlight">{formatTime(startTime)}</span>
            {" - "}
            <span className="time-highlight">{formatTime(endTime)}</span>
            {nextDay && (
              <span className="next-day-alert" title="Ends on the following day">
                +1 Day
              </span>
            )}
          </span>
        </div>

        <div className="event-detail-item">
          <span className="event-detail-icon">⏳</span>
          <span>
            Duration: <span className="time-highlight">{hours} hr{hours !== 1 ? "s" : ""}</span>
          </span>
        </div>
      </div>

      <div className="event-card-actions">
        {/* Undo button to discard/revert the last edits */}
        <button
          className="btn-action btn-undo"
          onClick={() => onUndo(id)}
          title="Discard last edits and restore original values"
        >
          <span>↩️</span> Revert
        </button>

        <button
          className="btn-action btn-edit"
          onClick={() => onEdit(event)}
          title="Edit event details"
        >
          <span>✏️</span> Edit
        </button>

        <button
          className="btn-action btn-delete"
          onClick={() => onDelete(id)}
          title="Delete event permanently"
        >
          <span>🗑️</span> Delete
        </button>
      </div>
    </div>
  );
}
