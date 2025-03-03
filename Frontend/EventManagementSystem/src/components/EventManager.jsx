import { Link, Outlet } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 fixed h-full">
        <h2 className="text-xl font-bold mb-6">Event Manager</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/event-dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Event Dashboard
            </Link>
          </li>
          <li>
            <Link to="/event-creation" className="block p-2 hover:bg-gray-700 rounded">
              Event Creation
            </Link>
          </li>
          <li>
            <Link to="/real-time-attendee-list" className="block p-2 hover:bg-gray-700 rounded">
              Real-time Attendee List
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 p-6 w-full">
        <Outlet />  {/* This renders the active page */}
      </main>
    </div>
  );
};

export default SidebarLayout;
