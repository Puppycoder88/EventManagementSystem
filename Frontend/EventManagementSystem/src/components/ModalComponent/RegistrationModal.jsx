import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import axios from "axios";

const RegistrationModal = ({ event, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5001/api/registration-modal", {
        eventId: event._id,
        name: formData.name,
        email: formData.email,
        eventName: event.eventName,
      });
      alert("Registration Successful!");
      onClose(); // Close modal after success
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Failed to register. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register for {event.eventName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              {loading ? "Registering..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Add PropTypes for props validation
RegistrationModal.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    category: PropTypes.string,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegistrationModal;
