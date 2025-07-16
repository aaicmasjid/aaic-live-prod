import React, { useState, useEffect } from 'react';
import moment from 'moment-hijri';
import dayjs from 'dayjs';
import DateList from './DateList';
import HijriDateList from './HijriDateList';
import PropsTimings from './PropsTimings';

moment.locale('ar');
function MonthlySchedule() {
  const [date, setDate] = useState(new Date());
  const hijriDate = moment().format("iYYYY/iM/iD");
  const hijriMonth = moment().format("iM");
  const initialDate = moment(hijriDate, "iYYYY/iM/iD");
 const [value, setValue] = useState(initialDate); // Initialize with the moment object
  const hijriDateFormat = value.locale('en-gb').format('iMMMM'); 
  const [datesByMonth, setDatesByMonth] = useState({});
  
  const today = new Date();
    const mo = today.getMonth()+1;
    const dt = today.getDate();
    const yr = today.getFullYear();
    const dow = today.getDay();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const dateString = mo+'/'+dt+'/'+yr;
    
   const [fajrJamat, setFajrJamat] = useState(0);
    const [sunRise, setSunRise] = useState(0);
    const [dhuhr, setDhuhr] = useState(0);
    const [dhuhrJamat, setDhuhrJamat] = useState(0);
    const [asr, setAsr] = useState(0);
    const [asrJamat, setAsrJamat] = useState(0);
    const [sunSet, setSunSet] = useState(0);
    const [maghrib, setMaghrib] = useState(0);
    const [maghribJamat, setMaghribJamat] = useState(0);
    const [isha, setIsha] = useState(0);
    const [ishaJamat, setIshaJamat] = useState(0);
    const [times, setTimes] = useState({});
    const [fajrDawn, setFajrDawn] = useState(null);
    const [amPm, setAmPm] = useState('');

  return (
    <div>
      <table className='my-table' style={{justifyContent: 'center', marginLeft:'2vw', borderCollapse: 'collapse', width: '100%' }}>
        
          <th ><Month date={date} />
            <td > <DateList /></td>
          </th>
      
          {/* <th>  {hijriDateFormat} */}
          <th style={{ border: '1px solid black' }}> Hijri Dates 
           &emsp; <td style={{textAlign: 'center'}}> <HijriDateList /></td>
          </th>
  
    
    
      </table>
     
    </div>
  );
}

function Month({ date }) {
  // Logic to generate dates for the month
  const dt = new Date();
  date = dt.toLocaleString('default', { month: 'long' });
  // Render the grid of days using the Week and Day components
  return date;
}

function Week() {
  // Render a row of days
}

function Day({ date }) {
  // Render a single day cell
}

export default MonthlySchedule;