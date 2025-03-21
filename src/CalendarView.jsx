import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const LOCAL_STORAGE_KEY = 'familyCalendar.events';

const localizer = momentLocalizer(moment);
const familyColors = {
  Mom: '#a78bfa',
  Dad: '#60a5fa',
  Griffin: '#34d399',
  Nell: '#f472b6',
  Gemma: '#f97316',
  Default: '#d1d5db',
};

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', familyMember: 'Mom' });

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
        console.error('❌ Failed to load saved events:', e);
      }
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, hasLoaded]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;

    const eventToAdd = {
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
    };

    setEvents((prev) => [...prev, eventToAdd]);
    setNewEvent({ title: '', start: '', end: '', familyMember: 'Mom' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Family Calendar</h2>

      {/* Event Form */}
      <form onSubmit={handleAddEvent} className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <h3 className="text-lg font-semibold">Add New Event</h3>
        <input
          type="text"
          placeholder="Event title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <select
          value={newEvent.familyMember}
          onChange={(e) => setNewEvent({ ...newEvent, familyMember: e.target.value })}
          className="border p-2 rounded w-full"
        >
          {Object.keys(familyColors).map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Add Event
        </button>
      </form>

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '600px' }}
        eventPropGetter={(event) => {
          const color = familyColors[event.familyMember] || familyColors.Default;
          return {
            style: {
              backgroundColor: color,
              color: '#1f2937',
              borderRadius: '6px',
              border: 'none',
              padding: '4px',
            },
          };
        }}
      />
    </div>
  );
};

export default CalendarView;
