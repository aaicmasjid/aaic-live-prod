import  {React, useState, useEffect } from 'react';
import SunCalc from 'suncalc';
import DatePicker from "@deskpro/react-datepicker-hijri";
import moment from 'moment-hijri';
import { Link } from 'react-router-dom';
import { FiSunset, FiSunrise } from "react-icons/fi";
import { IconBase } from "react-icons/lib";
import { FaCloudSun } from "react-icons/fa";
import { MdWbSunny, MdOutlineWbSunny } from "react-icons/md";
import { TbSunMoon } from "react-icons/tb";
import { FaRegMoon } from "react-icons/fa6";


moment.locale('ar');

function PropsTimings() {
  
  const today = new Date();
  //const mo = today.getMonth()+1;
  const mo = (props) => {
    return <h3> {props.mo} </h3>;
};
  //const dt = today.getDate();
  const dt = (props) => {
    return <h3> {props.dt} </h3>;
};
  const yr = today.getFullYear();
  const dow = today.getDay();
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const dateString = mo+'/'+dt+'/'+yr;
  //const timeString = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+':'+today.getMilliseconds();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[today.getDay()];
  const [marchDaylight, setMarchDaylight] = useState(0);
  const [novlight, setNovDaylight] = useState(0);

  const [selectedDate, setSelectedDate] = useState(moment());
  const hijriDate = moment().format("iYYYY/iM/iD");
  const hijriMonth = moment().format("iM");
  const initialDate = moment(hijriDate, "iYYYY/iM/iD");
  const [isHovering, setIsHovering] = useState(false);
  
  const [value, setValue] = useState(initialDate); // Initialize with the moment object
  const hijriDateFormat = value.locale('en-gb').format('iMMMM') + " " +  value.format('iD')+"," + value.format('iYYYY'); 
  const [fajrSplit, setFajrSplit] = useState(0);
  //Jamat colors
  const [fajrColor, setFajrColor] = useState(0);
  const [dhuhrColor, setDhuhrColor] = useState(0);
  const [asrColor, setAsrColor] = useState(0);
  const [maghribColor, setMaghribrColor] = useState(0);
  const [ishaColor, setIshaColor] = useState(0);
 
  const handleChange = (date) => {
    setSelectedDate(date);
  };

  if ((mo === 3) && (dt > 7) && (dt < 15) && (dayOfWeek === 'Sun')) {
    setMarchDaylight(dt);  
  }
  if ((mo === 11) && (dt < 8) && (dayOfWeek === 'Sun')) {
    setNovDaylight(dt);  
  }
 // const [fajr, setFajr] = useState(0);
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
  const [amPm, setAmPm] = useState(' ');
  const [announcement1, setAnnouncement1] = useState('');
  const [announcement2, setAnnouncement2] = useState('');
  const [fajrHourMin, setFajrHourMin] = useState(null);
  useEffect(() => {
  const sunString = SunCalc.getTimes(today, 41.8781, -87.6298);
  const {nightEnd} = SunCalc.getTimes(today, 41.8781, -87.6298);
  setFajrDawn(nightEnd.getHours()+':'+(nightEnd.getMinutes()+ 17) + ' ' + 'AM');
 
  const {sunrise} = SunCalc.getTimes(today, 41.8781, -87.6298);
  setSunRise((sunRise) =>(sunrise.getHours()+':'+sunrise.getMinutes() + ' ' + 'AM'));
  
  const {solarNoon} = SunCalc.getTimes(today, 41.8781, -87.6298);
  if(solarNoon.getHours() < 12){
    setDhuhr(solarNoon.getHours()+':'+(solarNoon.getMinutes() +' ' + 'AM'));
  }if(solarNoon.getHours() > 12){
    setDhuhr(solarNoon.getHours()+':'+(solarNoon.getMinutes() +' ' + 'PM'));
  }
  

  const {goldenHour} = SunCalc.getTimes(today, 41.8781, -87.6298);
  setAsr(goldenHour.getHours()-13+':'+(goldenHour.getMinutes()) + ' ' + 'PM');

  const {sunset} = SunCalc.getTimes(today, 41.8781, -87.6298);
  setSunSet(sunset.getHours() - 12+':'+(sunset.getMinutes() +' ' + 'PM'));
  //Maghrib
  setMaghribJamat(sunset.getHours() - 12+':'+(sunset.getMinutes()+2 +' ' + 'PM'));
  //Isha
  const {nauticalDusk} = SunCalc.getTimes(today, 41.8781, -87.6298);
  setIsha(nauticalDusk.getHours() - 12+':'+(sunset.getMinutes()+24 +' ' + 'PM'));

   if ((mo === 1 && dt >= 1)) {

    setFajrJamat((fajrJamat) => '6:30 AM');
   //Fajr jamat 
  }if ((mo === 2 && (dt >= 1 && dt<=9))) {

    setFajrJamat((fajrJamat) => '6:15 AM');
    
  }if ((mo === 2 && (dt >= 10 && dt<=19))) {

    setFajrJamat((fajrJamat) => '6:00 AM');
    
  }if ((mo === 2 && (dt >= 20))) {

    setFajrJamat((fajrJamat) => '5:45 AM');
    
  }if ((mo === 3 && (dt >= 1 && dt< setMarchDaylight))) {

    setFajrJamat((fajrJamat) => '5:30 AM');
    
  }if ((mo === 3 && (dt >= 1 && dt< setMarchDaylight))) {

    setFajrJamat((fajrJamat) => '5:30 AM');
    
  }if ((mo === 3 && (dt>= setMarchDaylight) && (dt <= 22))) {


    
  }if ((mo === 3 && (dt>= 23))) {

    setFajrJamat((fajrJamat) => '5:45 AM');
    
  }if ((mo === 4 && (dt>= 1) && (dt<= 6))) {

    setFajrJamat((fajrJamat) => '5:30 AM');
    
  }if ((mo === 4 && (dt>= 7) && (dt<= 13))) {

    setFajrJamat((fajrJamat) => '5:20 AM');
    
  }if ((mo === 4 && (dt>= 14))) {

    setFajrJamat((fajrJamat) => '5:05 AM');
    
  }if ((mo === 5 && (dt>= 1) && (dt<= 7))) {

    setFajrJamat((fajrJamat) => '5:00 AM');
    
  }if ((mo === 5 && (dt>= 8) && (dt<= 18))) {

    setFajrJamat((fajrJamat) => '4:45 AM');
    
  }if ((mo === 5 && (dt>= 19))) {

    setFajrJamat((fajrJamat) => '4:30 AM');
    
  }if ((mo === 6 && (dt>= 2))) {

    setFajrJamat((fajrJamat) => '4:30 AM');
    
  }if ((mo === 7 && (dt>= 1) && (dt<= 13))) {

    setFajrJamat((fajrJamat) => '4:30 AM');
    
  }if ((mo === 7 && (dt>= 14))) {

    setFajrJamat((fajrJamat) => '4:45 AM');
    
  }if ((mo === 8 && (dt>= 1) && (dt<= 10))) {

    setFajrJamat((fajrJamat) => '5:00 AM');
    
  }if ((mo === 8 && (dt>= 11) && (dt<= 22))) {

    setFajrJamat((fajrJamat) => '5:15 AM');
    
  }if ((mo === 8 && (dt>= 23))) {

    setFajrJamat((fajrJamat) => '5:30 AM');
    
  }if ((mo === 9 && (dt>= 1) && (dt<= 14))) {

    setFajrJamat((fajrJamat) => '5:45 AM');
    
  }if ((mo === 9 && (dt>= 1) && (dt<= 14))) {

    setFajrJamat((fajrJamat) => '5:45 AM');
    
  }if ((mo === 9 && (dt>= 15))) {

    setFajrJamat((fajrJamat) => '6:00 AM');
    
  }if ((mo === 10 && (dt>= 1) && (dt<= 13))) {

    setFajrJamat((fajrJamat) => '6:00 AM');
    
  }if ((mo === 10 && (dt>= 14))) {

    setFajrJamat((fajrJamat) => '6:15 AM');
    
  }if ((mo === 11 && (dt>= 1) && (dt<= 2))) {

    setFajrJamat((fajrJamat) => '6:15 AM');
    
  }if ((mo === 11 && (dt>= 3) && (dt<= 13))) {

    setFajrJamat((fajrJamat) => '5:45 AM');
    
  }if ((mo === 11 && (dt>= 4) )) {

    setFajrJamat((fajrJamat) => '6:00 AM');
    
  }if ((mo === 12 && (dt>= 1))) {

    setFajrJamat((fajrJamat) => '6:15 AM');
    
  }

  const fajrJamatToString = fajrJamat.toString();
  const splitFajrJamat = fajrJamatToString.split(" ");
  
  //setFajrJamat((fajrJamat) => '6:15 AM');
  //Dhuhr jamat
  if((mo == 1||2||3||4||5||6||7||8||9||10||11||12)) {
    setDhuhrJamat((dhuhrJmat) => '1:30 PM');
  }

  if(hijriMonth == 8 || hijriMonth == 9){
    setAnnouncement1((announcement1 ) => 'Note: During Ramadan Fajr Jamat starts'); 
    setAnnouncement2((announcement2 ) => '10 mins after Fajr start time.'); 
  }
//ASR
if ((mo === 1 && dt >= 1)) {

  setAsrJamat((asrJamat) => '3:00 PM');
  
}if ((mo === 2 && (dt >= 1) && (dt <= 9))) {

  setAsrJamat((asrJamat) => '3:45 PM');
  
}if ((mo === 2 && (dt >= 10))) {

  setAsrJamat((asrJamat) => '4:00 PM');
  
}if ((mo === 3 && (dt >= 1) && (dt <= marchDaylight))) {

  setAsrJamat((asrJamat) => '4:15 PM');
  
}if ((mo === 3 && (dt >= 23))) {

  setAsrJamat((asrJamat) => '5:45 PM');
  
}if ((mo === 4 && (dt >= 1))) {

  setAsrJamat((asrJamat) => '6:30 PM');
  
}if ((mo === 5 && (dt >= 1))) {

  setAsrJamat((asrJamat) => '6:30 PM');
  
}if ((mo === 6 && (dt >= 1) && (dt <= 15))) {

  setAsrJamat((asrJamat) => '5:45 PM');
  
}if ((mo === 6 && (dt > 15))) {

  setAsrJamat((asrJamat) => '5:30 PM');
  
}if ((mo === 7 && (dt >= 1))) {

  setAsrJamat((asrJamat) => '6:30 PM');
  
}if ((mo === 8 && (dt >= 1) && (dt <= 15))) {

  setAsrJamat((asrJamat) => '6:15 PM');
  
}if ((mo === 8 && (dt <= 16))) {

  setAsrJamat((asrJamat) => '6:00 PM');
  
}if ((mo === 9 && (dt >= 1) && (dt <= 14))) {

  setAsrJamat((asrJamat) => '5:30 PM');
  
}if ((mo === 9 && (dt >= 15))) {

  setAsrJamat((asrJamat) => '5:15 PM');
  
}if ((mo === 10 && (dt >= 1) && (dt <= 14))) {

  setAsrJamat((asrJamat) => '5:00 PM');
  
}if ((mo === 10 && (dt >= 15))) {

  setAsrJamat((asrJamat) => '4:45 PM');
  
}if ((mo === 11 && (dt >= 1) && (dt < setNovDaylight))) {

  setAsrJamat((asrJamat) => '5:00 PM');
  
}if ((mo === 11 && (dt >= setNovDaylight))) {

  setAsrJamat((asrJamat) => '3:30 PM');
  
}if ((mo === 12 && (dt >= 1))) {

  setAsrJamat((asrJamat) => '3:00 PM');
  
}
//Isha
if ((mo === 1 && (dt >= 1))) {

  setIshaJamat((ishaJamat) => '7:30 PM');
}if ((mo === 2 && (dt >= 1))) {

  setIshaJamat((ishaJamat) => '7:30 PM');
}if ((mo === 3 && (dt >= 1) && (dt < marchDaylight))) {

  setIshaJamat((ishaJamat) => '7:30 PM');
}if ((mo === 3 && (dt >= marchDaylight))) {

  setIshaJamat((ishaJamat) => '8:30 PM');
}if ((mo === 4 && (dt >= 1) && (dt < 10))) {

  setIshaJamat((ishaJamat) => '9:00 PM');
}if ((mo === 4 && (dt >= 11))) {

  setIshaJamat((ishaJamat) => '9:15 PM');
}if ((mo === 5 && (dt >= 1) && (dt <= 18))) {

  setIshaJamat((ishaJamat) => '9:45 PM');
}if ((mo === 5 && (dt >= 19))) {

  setIshaJamat((ishaJamat) => '10:00 PM');
}if ((mo === 6 && (dt >= 1))) {

  setIshaJamat((ishaJamat) => '10:15 PM');
}if ((mo === 7 && (dt >= 1) && (dt <= 20))) {

  setIshaJamat((ishaJamat) => '10:15 PM');
}if ((mo === 7 && (dt >= 21))) {

  setIshaJamat((ishaJamat) => '10:00 PM');
}if ((mo === 8 && (dt >= 1) && (dt <= 15))) {

  setIshaJamat((ishaJamat) => '9:45 PM');
}if ((mo === 8 && (dt >= 16))) {

  setIshaJamat((ishaJamat) => '9:30 PM');
}if ((mo === 9 && (dt >= 1) && (dt <= 12))) {

  setIshaJamat((ishaJamat) => '9:00 PM');
}if ((mo === 9 && (dt >= 13) && (dt <= 21))) {

  setIshaJamat((ishaJamat) => '8:45 PM');
}if ((mo === 9 && (dt >= 22))) {

  setIshaJamat((ishaJamat) => '8:30 PM');
}if ((mo === 10 && (dt >= 1) && (dt <= 13))) {

  setIshaJamat((ishaJamat) => '8:00 PM');
}if ((mo === 10 && (dt >= 14))) {

  setIshaJamat((ishaJamat) => '7:45 PM');
}if ((mo === 11 && (dt >= 1))) {

  setIshaJamat((ishaJamat) => '7:30 PM');
}if ((mo === 12 && (dt >= 1))) {

  setIshaJamat((ishaJamat) => '7:30 PM');
}
  

  
}, []);



  return( 
  <div >
  
  
 <table className='my-table' style={{justifyContent: 'center', marginLeft:'2vw', 
        backgroundColor: 'white', fontWeight: 'bolder'}}>
 
       
    <tr style={{textAlign: 'center'}} >
      <td>{fajrDawn?.toLocaleString()}</td> 
      <td>{fajrJamat}</td> 
        <td>{sunRise}</td>
        <td> </td>
    
        <p style={{color: 'red', fontSize: '1.5vw', fontWeight: 'bolder'}}>
          During school days <br /> Sunday Dhuhr will be at 1 PM.</p>
       
        <td>{dhuhr}</td>
        <td>{dhuhrJamat}</td>

        <td>{asr}</td>
        <td>{asrJamat}</td>
   
        <td>{sunSet}</td>
        <td></td>

        <td></td>
        <td>{maghribJamat}</td>

        <td>{isha}</td>
        <td >{ishaJamat}</td>
      </tr>

      </table>
  </div>
  )
}

export default PropsTimings;