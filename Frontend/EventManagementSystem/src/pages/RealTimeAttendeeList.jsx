import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAttendees, setSelectedAttendees] = useState([]); // Track selected attendees
  const [selectAll, setSelectAll] = useState(false); // Track "Select All" checkbox

  // Fetch attendees
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

  // Handle individual checkbox toggle
  const handleCheckboxChange = (id) => {
    setSelectedAttendees((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((attendeeId) => attendeeId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAttendees([]); // Uncheck all
    } else {
      setSelectedAttendees(attendees.map((attendee) => attendee._id)); // Select all
    }
    setSelectAll(!selectAll); // Toggle select all state
  };

  // Ensure "Select All" is only checked when all attendees are manually selected
  useEffect(() => {
    setSelectAll(selectedAttendees.length === attendees.length && attendees.length > 0);
  }, [selectedAttendees, attendees]);

  // Delete selected attendees
  const handleDeleteSelected = async () => {
    if (selectedAttendees.length === 0) {
      alert("No attendees selected for deletion.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/attendees/delete", {
        attendeeIds: selectedAttendees,
      });

      // Update UI after deletion
      setAttendees((prevAttendees) =>
        prevAttendees.filter((attendee) => !selectedAttendees.includes(attendee._id))
      );
      setSelectedAttendees([]);
      alert("Selected attendees deleted successfully.");
    } catch (err) {
      console.error("Error deleting attendees:", err);
      alert("Failed to delete attendees.");
    }
  };

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
        <>
         

          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectAll}
                  />
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">Attendee Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Attendee Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Event Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                <button
            onClick={handleDeleteSelected}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash/>
          </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee._id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedAttendees.includes(attendee._id)}
                      onChange={() => handleCheckboxChange(attendee._id)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{attendee.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{attendee.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{attendee.eventName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDeleteSelected([attendee._id])} // Delete single attendee
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AttendeeList;
