import React, { useState } from "react";
import DatePicker from "@deskpro/react-datepicker-hijri";
import moment from "moment-hijri";
import "@deskpro/react-datepicker-hijri/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

moment.locale("ar");

function Hijri() {
  // Get the current date in Hijri format
  const hijriDate = moment().format("iYYYY/iM/iD");

  // Convert the Hijri date to a moment object
  const initialDate = moment(hijriDate, "iYYYY/iM/iD");

 

  const [value, setValue] = useState(initialDate); // Initialize with the moment object
  const hijriDateFormat = value.locale('en-gb').format('iMMMM') + " " +  value.format('iD')+"," + value.format('iYYYY') 
  const handleDateChange = (date) => {

  };

  return (
    <div>
      <p style={{marginLeft: '5vw'}}>{hijriDateFormat} <br/></p> 
      &emsp;&emsp;&emsp;<Link to="https://chicagohilal.org/">
      <button style={{ borderRadius: '50%' }}><p style={{fontSize: '1.75vw', cursor: 'pointer',padding: '0.35vw 0.5vw', fontWeight: 'bolder', color: 'black', backgroundColor: 'goldenrod'}}>confirm moon sighting</p></button>
    </Link>
    </div>
  );
}
export default Hijri