import { useState } from 'react';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegisterPage'; // Add RegistrationPage import

const FrontScreen = () => {
  const [isRegistered, setIsRegistered] = useState(false); // Track whether the user is on login or register page

  const handleSwitchToLogin = () => {
    setIsRegistered(false);  // Switch to login page
  };

  const handleSwitchToRegister = () => {
    setIsRegistered(true);  // Switch to register page
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Left side with h1 */}
      <div className="flex-1 flex justify-center items-center p-4 bg-teal-700">
        <h1 className="text-4xl font-bold text-white text-center">Welcome to the <br />Event Management System</h1>
      </div>

      {/* Right side with LoginPage or RegistrationPage */}
      <div className="flex-1 flex justify-center items-center">
        {isRegistered ? (
          <RegistrationPage handleSwitchToLogin={handleSwitchToLogin} /> // Pass function to switch to login
        ) : (
          <LoginPage handleSwitchToRegister={handleSwitchToRegister} /> // Pass function to switch to register
        )}
      </div>
    </div>
  );
};

export default FrontScreen;
