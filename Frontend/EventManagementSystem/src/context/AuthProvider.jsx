import { useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext"; // Import AuthContext

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define prop types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
