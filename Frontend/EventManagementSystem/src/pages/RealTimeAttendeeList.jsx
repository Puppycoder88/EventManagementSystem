import { useEffect, useState } from "react";
import axios from "axios";

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/attendees");
        setAttendees(response.data);
      } catch (err) {
        console.error("API error:", err);
        setError("Failed to fetch attendees.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Attendees List</h2>
      
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading attendees...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : attendees.length === 0 ? (
        <p>No attendees found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left">Attendee Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Attendee Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Event Name</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{attendee.name}</td>
                <td className="border border-gray-300 px-4 py-2">{attendee.email}</td>
                <td className="border border-gray-300 px-4 py-2">{attendee.eventName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendeeList;
