import { useState } from 'react';
import axios from 'axios';

const EventCreation = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    date: '',
    time: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5001/api/event-creation', eventData);

      if (response.status === 201) { // Corrected status for POST success
        setMessage('Event created successfully!');
        setEventData({
          eventName: '',
          date: '',
          time: '',
          description: '',
        });
         // Hide success message after 10 seconds
         setTimeout(() => {
          setMessage('');
        }, 1000);
      } else {
        setMessage('Failed to create event. Please try again.');
      }
    } catch {
      setMessage('Error creating event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Create an Event</h1>

      {/* Success or Error Message */}
      {message && (
        <div className={`mb-4 p-2 border rounded-md ${message.toLowerCase().includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className={`mt-4 p-2 w-full bg-blue-500 text-white rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventCreation;
