import React from 'react';
import moment from 'moment';
import 'moment/locale/ar-sa'; // Or another suitable locale
import hijri from 'moment-hijri';

function HijriArabicDateList() {
  const startDate = moment().startOf('year'); // Get the start of the current Gregorian year
  const endDate = moment().endOf('year'); // Get the end of the current Gregorian year

  const hijriDates = [];
  let currentDate = startDate;

  while (currentDate.isBefore(endDate)) {
    hijriDates.push(hijri(currentDate).format('iDD'));
    currentDate = currentDate.add(1, 'day');
  }

  return (
    <ul style={{ listStyleType: 'none' }}>
      {hijriDates.map((date, index) => (
        <li key={index}>{date}</li>
      ))}
    </ul>
  );
}

export default HijriArabicDateList;