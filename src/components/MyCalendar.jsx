import React, { useState } from 'react';
import Calendar from 'react-calendar';

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleEventAdd = (newDate, eventData) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [newDate.toDateString()]: eventData,
    }));
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={({ date, view }) => {
          const event = events[date.toDateString()];
          if (event) {
            return <div className="event-marker">{event}</div>;
          }
        }}
      />
      {events[date.toDateString()] && (
        <div>
          <h2>Events on {date.toDateString()}:</h2>
          <p>{events[date.toDateString()]}</p>
        </div>
      )}
      <button onClick={() => handleEventAdd(date, 'New Event')}>
        Add Event
      </button>
    </div>
  );
}

export default MyCalendar;