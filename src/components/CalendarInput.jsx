import React, { useState, useEffect  } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaBox } from 'react-icons/fa';

function CalendarInput() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [data1, setData1] = useState('');

  const fetchData = async () => {
    const apiUrl =   process.env.REACT_APP_API_URL;
    const formattedDate = selectedDate.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    //const year = date.getFullYear();
    const month = selectedDate.getMonth() + 1; // JavaScript months are 0-indexed
    const day = selectedDate.getDate();
    try {
      // const response = await fetch(`${apiUrl}/api/jt?intMonth=${month}&intDate=${day}`); 
      const response = await fetch(`${apiUrl}/api/jt?intMonth=${month}&intDate=${day}`);
      const data = await response.json();
      setData1(data);
      // Do something with the data, e.g., update state to render it
      console.log(data);
      // <div>{data.fajrJamat} </div>
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center'}}>
    <div>  <DatePicker sstyle={{ fontSize: '12vw', padding: '10px', width: '200px' }} selected={selectedDate} onChange={handleDateChange}  /></div>
      <button style={{fontWeight: 'bolder', borderRadius: '20vw', borderColor: 'purple', padding: '0.65vw 0.75vw', cursor: 'pointer' }} onClick={fetchData}>Jamat Search</button>

      {/* Render the fetched data here */}
     <div> 
      Fajr: {data1.fajrJamat} <br/>
      Dhuhr: {data1.dhuhrJamat}<br/>
      Asr: {data1.asrJamat}<br/>
      Maghrib: {data1.maghribJamat}<br/>
      Isha: {data1.ishaJamat}<br/>
     </div>
      
    </div>
  );
}

export default CalendarInput;