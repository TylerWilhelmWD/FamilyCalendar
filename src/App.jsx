import React, { useState, useEffect } from 'react';
import CalendarView from './CalendarView';
import TodoList from './TodoList';
import EventForm from './EventForm';

const LOCAL_STORAGE_KEY = 'familyCalendar.events';

function App() {
  const [events, setEvents] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false); // 🆕 fix

  // ✅ Load events from localStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const restored = parsed.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(restored);
      } catch (e) {
        console.error('❌ Failed to parse saved events:', e);
      }
    }
    setHasLoaded(true); // ✅ signal that loading is complete
  }, []);

  // ✅ Save to localStorage only after loading is done
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, hasLoaded]);

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Family Calendar</h1>
        <EventForm onAddEvent={handleAddEvent} />
        <CalendarView events={events} />
      </div>
      <div className="w-full md:w-1/3">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
