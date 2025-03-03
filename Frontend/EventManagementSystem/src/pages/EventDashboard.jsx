import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import RegistrationModal from "../components/ModalComponent/RegistrationModal"; // Import modal

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from API
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/event-dashboard");
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Open registration modal
  const openRegisterModal = (event) => {
    setSelectedEvent(event);
  };

  // Close modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  // Separate upcoming and past events
  const currentDate = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= currentDate);
  const pastEvents = events.filter((event) => new Date(event.date) < currentDate);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-10 text-gray-700">Event Dashboard</h2>

      {loading ? (
        <p className="text-center text-lg font-semibold">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upcoming Events */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Upcoming Events</h3>
            {upcomingEvents.length === 0 ? (
              <p>No upcoming events</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event._id} className="p-4 my-4 border rounded shadow">
                  <h4 className="font-bold text-lg">{event.eventName}</h4>
                  <p>Category: {event.category || "N/A"}</p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Description: {event.description}</p>
                  <button
                    onClick={() => openRegisterModal(event)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Register
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Past Events */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Past Events</h3>
            {pastEvents.length === 0 ? (
              <p>No past events</p>
            ) : (
              pastEvents.map((event) => (
                <div key={event._id} className="p-4 my-4 border rounded shadow">
                  <h4 className="font-bold text-lg">{event.eventName}</h4>
                  <p>Category: {event.category || "N/A"}</p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Description: {event.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Show Modal if Event is Selected */}
      {selectedEvent && <RegistrationModal event={selectedEvent} onClose={closeModal} />}
    </div>
  );
};

export default EventDashboard;
