import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/events", {
        params: { eventName, date },
      });

      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }, [eventName, date]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Handle event name change
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Filter Upcoming Events (events with date >= current date)
  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date());

  // Apply eventName and date filters dynamically
  const filteredUpcomingEvents = upcomingEvents.filter((event) => {
    const isEventNameMatch = eventName ? event.eventName.toLowerCase() === eventName.toLowerCase() : true;
    const isDateMatch = date ? event.date.split("T")[0] === date : true;
    return isEventNameMatch && isDateMatch;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Dashboard</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="border p-2" value={eventName} onChange={handleEventNameChange}>
          <option value="">All Event Names</option>
          {[...new Set(events.map(event => event.eventName))].map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>

        <input type="date" className="border p-2" value={date} onChange={handleDateChange} />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upcoming Events */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
            {filteredUpcomingEvents.length === 0 ? (
              <p>No upcoming events</p>
            ) : (
              filteredUpcomingEvents.map((event) => (
                <div key={event._id} className="p-4 border rounded shadow">
                  <h4 className="font-bold text-lg">{event.title}</h4>
                  <p><strong>Event Name:</strong> {event.eventName}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> {event.description}</p>
                </div>
              ))
            )}
          </div>

          {/* Past Events */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Past Events</h3>
            {events.filter((event) => new Date(event.date) < new Date()).length === 0 ? (
              <p>No past events</p>
            ) : (
              events
                .filter((event) => new Date(event.date) < new Date())
                .map((event) => (
                  <div key={event._id} className="p-4 border rounded shadow">
                    <h4 className="font-bold text-lg">{event.title}</h4>
                    <p><strong>Event Name:</strong> {event.eventName}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
