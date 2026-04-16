import { useEffect, useState } from "react";
import { getCalendarEvents, deleteEvent } from "../API/client";

export default function CalendarPanel() {
  const [events, setEvents] = useState([]);

  const load = async () => {
    const data = await getCalendarEvents();

    // sort by time
    data.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

    setEvents(data);
  };

  useEffect(() => {
    load();

    const interval = setInterval(load, 5000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="header">
        <h2>Calendar Events</h2>
        <button onClick={load}>Refresh</button>
      </div>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((ev) => {
          const start = new Date(ev.start_time);
          const end = ev.end_time ? new Date(ev.end_time) : null;

          return (
            <div key={ev.uid} className="event">
              <div className="event-left">
                <strong>{ev.title}</strong>

                <div className="time">
                  {start.toLocaleString()}
                  {end && ` → ${end.toLocaleString()}`}
                </div>

                {ev.location && <div className="location">📍 {ev.location}</div>}
              </div>

              <div className="event-right">
                <button onClick={() => deleteEvent(ev.uid).then(load)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}