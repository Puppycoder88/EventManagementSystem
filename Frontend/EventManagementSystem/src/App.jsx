import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontScreen from "./components/FrontScreen/FrontScreenTemp";
// import EventDashboard from "./pages/EventPage";
import EventDashboard from "./pages/EventDashboard";
import RegisterPage from "./pages/RegisterPage";
import EventCreation from "./pages/EventCreation";
import SidebarLayout from "./components/EventManager";  // Sidebar wrapper
import RealTimeAttendeeList from "./pages/RealTimeAttendeeList"; // New component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontScreen />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Wrap event-related pages inside SidebarLayout */}
        <Route element={<SidebarLayout />}>
          <Route path="/event-dashboard" element={<EventDashboard />} />
          <Route path="/event-creation" element={<EventCreation />} />
          <Route path="/real-time-attendee-list" element={<RealTimeAttendeeList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
