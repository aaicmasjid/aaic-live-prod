import React from 'react';
import moment from 'moment';
//import 'moment/locale/ar-sa'; // Or another suitable locale
import hijri from 'moment-hijri';
moment.locale('en-US');

function HijriDateList() {
  const startDate = moment().startOf('month'); // Get the start of the current Gregorian year
  const endDate = moment().endOf('month'); // Get the end of the current Gregorian year

  const hijriDates = [];
  let currentDate = startDate;
  const hijriCurrentDate = hijri(currentDate).format('iDD');
  const fullDate = new Date();
  const justDate = fullDate.getDate();

  while (currentDate.isBefore(endDate)) {
    if((hijriCurrentDate == 1) || (justDate == 1)){
    hijriDates.push(hijri(currentDate).format('iDD-iMMMM'));
    currentDate = currentDate.add(1, 'day');
    }
    if((hijriCurrentDate > 1) || (justDate > 1)){
        hijriDates.push(hijri(currentDate).format('iDD-iMMMM'));
        currentDate = currentDate.add(1, 'day');
        }
  }
//   while (currentDate.isBefore(endDate) && ((hijriCurrentDate > 1) || (justDate > 1))) {
//     hijriDates.push(hijri(currentDate).format('iMMMM-iDD'));
//     currentDate = currentDate.add(1, 'day');
//   }

  return (
    <ul style={{ listStyleType: 'none' }}>
      {hijriDates.map((date, index) => (
        <li key={index}>{date}</li>
      ))}
    </ul>
  );
}

export default HijriDateList;