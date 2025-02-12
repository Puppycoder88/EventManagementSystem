import PropTypes from 'prop-types';
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterPage = ({ handleSwitchToLogin }) => {
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", values);
      console.log("Registration Response:", response.data);
  
      if (response.status === 200 || response.status === 201) {  // Ensure it's a success response
        setSuccessMessage("Registration successful! Redirecting to login...");
  
        // Reset form after successful registration
        resetForm();
  
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          handleSwitchToLogin();
        }, 3000);
      } else {
        console.error("Unexpected response status:", response.status);
      }
  
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
    }
    setSubmitting(false);
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

      {/* Success Message */}
      {successMessage && (
        <p className="text-green-600 text-center mb-4">{successMessage}</p>
      )}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field type="text" name="name" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <div className="flex justify-between text-sm text-gray-600">
              <p>Already have an account?</p>
              <button type="button" onClick={handleSwitchToLogin} className="text-blue-500 hover:underline">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

RegisterPage.propTypes = {
  handleSwitchToLogin: PropTypes.func.isRequired,
};

export default RegisterPage;
