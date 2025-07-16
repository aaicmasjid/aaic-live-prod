import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropsTimings from './PropsTimings';

moment.locale('en-US');
function DateList() {
  const [dates, setDates] = useState([]);
  
  useEffect(() => {
    const generateDates = () => {
      const currentMonth = moment().month(); // 0-indexed (Jan = 0, Feb = 1, etc.)
      const currentYear = moment().year();

      const daysInMonth = moment(`${currentYear}-${currentMonth + 1}`, 'YYYY-M').daysInMonth();
      const dateList = [];
      
      for (let i = 1; i <= daysInMonth; i++) {
        const date = moment(`${currentYear}-${currentMonth + 1}-${i}`, 'YYYY-M-D');
        dateList.push(date.format('DD'));
      }

      setDates(dateList);
    };

    generateDates();
  }, []);

  return (
    <ul style={{ listStyleType: 'none' }}>
      {dates.map((date, index) => (
        <li key={index}>{date}</li> 
      ))} 
      <PropsTimings mo='12' />
      <PropsTimings dt='12' />
    </ul>
  );
}

export default DateList;