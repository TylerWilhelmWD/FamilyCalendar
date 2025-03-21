import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaBroom,
  FaUtensils,
  FaImages,
  FaList,
  FaClipboardList  // ✅ Add this line
} from 'react-icons/fa';import CalendarView from './CalendarView';
import ChoreChart from './ChoreChart';
import TodoList from './TodoList';
import ChoreOverview from './ChoreOverview';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        
        {/* Top Banner (Can be adjusted if needed) */}
        <header className="bg-white shadow-md p-4 text-center font-bold text-xl">
          Family Calendar
        </header>

        {/* Main Content Area - Respects Nav & Header */}
        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<CalendarView />} />
            <Route path="/chores" element={<ChoreChart />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/chore-overview" element={<ChoreOverview />} />
          </Routes>
        </div>

        {/* Sticky Bottom Navigation Bar - Transparent & Floating */}
        <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md border-t flex justify-around py-3 z-50">
          <NavLink to="/" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <FaCalendarAlt size={24} />
            <span className="text-xs">Calendar</span>
          </NavLink>
          <NavLink to="/chores" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <FaBroom size={24} />
            <span className="text-xs">Chores</span>
          </NavLink>
          <NavLink to="/meals" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <FaUtensils size={24} />
            <span className="text-xs">Meals</span>
          </NavLink>
          <NavLink to="/photos" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <FaImages size={24} />
            <span className="text-xs">Photos</span>
          </NavLink>
          {/* <NavLink to="/lists" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <FaList size={24} />
            <span className="text-xs">Lists</span>
          </NavLink> */}
          <NavLink to="/chore-overview" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
  <FaClipboardList size={24} />
  <span className="text-xs">Overview</span>
</NavLink>
          
        </nav>

      </div>
    </Router>
  );
}

export default App;
