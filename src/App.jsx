import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { FaCalendarAlt, FaBroom, FaUtensils, FaImages, FaList } from 'react-icons/fa';
import CalendarView from './CalendarView';
import ChoreChart from './ChoreChart';
import TodoList from './TodoList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pb-16">
        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<CalendarView />} />
            <Route path="/chores" element={<ChoreChart />} />
            <Route path="/todos" element={<TodoList />} />
          </Routes>
        </div>

        {/* Sticky Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t flex justify-around py-3">
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
          <NavLink to="/lists" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <FaList size={24} />
            <span className="text-xs">Lists</span>
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;
