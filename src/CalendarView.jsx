import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const familyColors = {
    Mom: '#a78bfa',      // purple-400
    Dad: '#60a5fa',      // blue-400
    Griffin: '#34d399',  // green-400
    Nell: '#f472b6',     // pink-400
    Gemma: '#f97316',    // orange-500
    Default: '#d1d5db',  // gray-300
  };

const CalendarView = ({ events }) => {
  return (
    <div style={{ height: '600px', padding: '8px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
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
