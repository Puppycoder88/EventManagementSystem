import PropTypes from 'prop-types';  
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ handleSwitchToRegister }) => {  
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", values);
      console.log(response.data);
      navigate("/event-dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
    setSubmitting(false);
  };

  // Function to handle Guest Login
  const handleGuestLogin = async () => {
    try {
      const guestCredentials = {
        email: "guest@example.com",  // Example guest email
        password: "guest1234"       // Example guest password
      };

      const response = await axios.post("http://localhost:5000/api/auth/login", guestCredentials);
      console.log("Guest login successful:", response.data);
      navigate("/event-dashboard"); // Redirect guest to dashboard
    } catch (err) {
      console.error("Guest login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* Guest Login Button */}
            <button type="button" onClick={handleGuestLogin} className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">
              Login as Guest
            </button>

            <div className="flex justify-between text-sm text-gray-600">
              <p>Do not have an account?</p>
              <button type="button" onClick={handleSwitchToRegister} className="text-blue-500 hover:underline">
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginPage.propTypes = {
  handleSwitchToRegister: PropTypes.func.isRequired,
};

export default LoginPage;
