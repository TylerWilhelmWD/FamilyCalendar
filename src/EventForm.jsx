import React, { useState } from 'react';

const familyMembers = ['Mom', 'Dad', 'Griffin', 'Nell', 'Gemma'];

const EventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [member, setMember] = useState('Mom');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start || !end) return;

    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
      familyMember: member,
    };

    onAddEvent(newEvent);
    setTitle('');
    setStart('');
    setEnd('');
    setMember('Mom');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
      <h3 className="text-lg font-semibold">Add New Event</h3>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={member}
          onChange={(e) => setMember(e.target.value)}
          className="border p-2 rounded"
        >
          {familyMembers.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
