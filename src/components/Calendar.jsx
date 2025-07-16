import React from 'react';
import dayjs from 'dayjs';

function Calendar() {
  const currentMonth = dayjs(); // Get the current month

  // Get the number of days in the current month
  const numDays = currentMonth.daysInMonth(); 

  // Create an array of days for the current month
  const days = Array.from({ length: numDays }, (_, i) => {
    const date = currentMonth.startOf('month').add(i, 'day');
    return {
      date: date.format('YYYY-MM-DD'),
      customData: 'Your custom data here' // Add custom data for each day
    };
  });

  return (
    <div>
      {days.map((day, index) => (
        <div key={index}>
          {day.date}: {day.customData}
        </div>
      ))}
    </div>
  );
}

export default Calendar;