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
      import TimeDisplay from './TimeDisplay';
      
      moment.locale('ar');
      function TimeChangeAlert() {
        const today = new Date();
        const mo = today.getMonth()+1;
        const dt = today.getDate();
        const yr = today.getFullYear();
        // const dow = today.getDay();
        // const hour = today.getHours();
        // const minutes = today.getMinutes();
        //const tim = 'Time:'+ {TimeDisplay}
        const dateString = mo+'/'+dt+'/'+yr;
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeek = daysOfWeek[today.getDay()];
        
        //Begin - Daylight savings 
        const sundays = [];
        const novSundays = [];
        const marDate = new Date(yr, 2);
        const novDate = new Date(yr, 10);
        let marDls = "";
        let novDls = "";

      //Calculate March Daylight savings
      while (marDate.getMonth() === 2) {
        marDate.setDate(marDate.getDate());
        const dateIter = marDate.getDay();
        if(dateIter === 0){
        sundays.push(new Date(marDate));
        const nDate = new Date(marDate).getDate();
        if((nDate > 6) && (nDate < 16)){
        //Day for march daylight saving time
        marDls = new Date(marDate).getDate(); 
        }
        }
        marDate.setDate(marDate.getDate() + 1); 
      }
      //Calculate November Daylight savings
      while (novDate.getMonth() === 10) {
        novDate.setDate(novDate.getDate());
        const dateIter = novDate.getDay();
        if(dateIter == 0){
        novSundays.push(new Date(novDate));
        const nDate = new Date(novDate).getDate();
        if((nDate > 1) && (nDate < 8)){
        //Day for Noveber daylight saving time
        novDls = new Date(novDate).getDate(); 
        }
        }
        novDate.setDate(novDate.getDate() + 1); 
      }
      //End - Daylight savings 
   
        const [selectedDate, setSelectedDate] = useState(moment());
        const hijriDate = moment().format("iYYYY/iM/iD");
        const hijriMonth = moment().format("iM");
        const hijriDt =  moment().format("iD");
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
        //Prayer timings settings
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
        const [ishaAnnouncement, setIshaAnnouncement] = useState(0);
        //const [times, setTimes] = useState({});
        const [fajrDawn, setFajrDawn] = useState(null);
        const [amPm, setAmPm] = useState(' ');
        const [announcement1, setAnnouncement1] = useState('');
        const [announcement2, setAnnouncement2] = useState('');
        const [fajrHourMin, setFajrHourMin] = useState(null);
        const [nextFajrChange, setNextFajrChange] = useState('');
        const [fajrMin, setFajrMin] = useState('');
        const [nextAsrChange, setNextAsrChange] = useState('');
        const [nextIshaChange, setNextIshaChange] = useState('');
        //Ramadan greeting Begin - ramadan kareem flasing
        const [ramadanKareem, setRamadanKareem] = useState('');
        const [isVisible, setIsVisible] = useState(true);
        useEffect(() => {
          const intervalId = setInterval(() => {
            setIsVisible(prev => !prev);
          }, 1000); // Toggle visibility every 500ms
      
          return () => clearInterval(intervalId); // Clean up the interval on component unmount
        }, []);
        //Ramadan greeting END...
        useEffect(() => {
        const sunString = SunCalc.getTimes(today, 41.8781, -87.6298);
        const {nightEnd} = SunCalc.getTimes(today, 41.8781, -87.6298);
        const adjustFajrMins = nightEnd.getMinutes() + +17;
      
        // if(adjustFajrMins <= 9){
        //   adjustFajrMins = '0'+adjustFajrMins;
        // }
        if(adjustFajrMins == 60){
          setFajrDawn(nightEnd.getHours()+1+':'+'00' + ' ' + 'AM');
        }if((adjustFajrMins) > 60){
          setFajrDawn(nightEnd.getHours()+1+':' +((adjustFajrMins - 60) + ' ' + 'AM'));
      
        }if(((adjustFajrMins) < 60)){
          setFajrDawn(nightEnd.getHours()+':'+((adjustFajrMins+17)) + ' ' + 'AM');
          //setFajrMin('00');
        }
        //setFajrDawn(nightEnd.getHours()+':'+(nightEnd.getMinutes()+ 17) + ' ' + 'AM');
      
        const {sunrise} = SunCalc.getTimes(today, 41.8781, -87.6298);
        const sunRiseMin = sunrise.getMinutes();
        if(sunrise.getMinutes() <= 9){
        setSunRise((sunRise) =>(sunrise.getHours()+':' + 0 + sunRiseMin + ' ' + 'AM'));
        }if(sunrise.getMinutes() >= 10)
        setSunRise((sunRise) =>(sunrise.getHours()+':'+ sunRiseMin + ' ' + 'AM'));
        
        const {solarNoon} = SunCalc.getTimes(today, 41.8781, -87.6298);
        const solarNoonDhurHour = solarNoon.getHours();
        const solarNoonMin = solarNoon.getMinutes();
        if(solarNoonDhurHour <= 12){
          if(solarNoonMin <= 9){
          setDhuhr(solarNoonDhurHour +':'+ 0 + solarNoonMin +' ' + 'AM');
          }if(solarNoonMin > 9){
            setDhuhr(solarNoonDhurHour +':'+ solarNoonMin +' ' + 'AM');
          }
        }if(solarNoonDhurHour > 12){
          if(solarNoonMin <= 9){
          setDhuhr(solarNoonDhurHour - 12 +':'+ 0 + solarNoonMin +' ' + 'PM');
          } if(solarNoonMin > 9){
            setDhuhr(solarNoonDhurHour +':'+ solarNoonMin +' ' + 'PM');
            }
        }
        //ASR time
        const {goldenHour} = SunCalc.getTimes(today, 41.8781, -87.6298);
        const goldenHourAsrMin = goldenHour.getMinutes();
        if(goldenHourAsrMin <= 9){
        setAsr(goldenHour.getHours()-13+':'+ 0 + goldenHourAsrMin + ' ' + 'PM');
      }if(goldenHourAsrMin >= 10){
        setAsr(goldenHour.getHours()-13+':'+ goldenHourAsrMin + ' ' + 'PM');
      }

        const {sunset} = SunCalc.getTimes(today, 41.8781, -87.6298);
        const sunsetMin = sunset.getMinutes();
        if(sunsetMin <= 9){
        setSunSet(sunset.getHours() - 12+':'+ 0 + sunsetMin +' ' + 'PM');
        }if(sunsetMin >= 10){
          setSunSet(sunset.getHours() - 12+':'+ sunsetMin +' ' + 'PM');
        }
        //Maghrib
        const maghribPrayerMin = sunsetMin+1;
        if(sunsetMin <= 9){
        setMaghribJamat(sunset.getHours() - 12+':'+ maghribPrayerMin +' ' + 'PM');
        }if(sunsetMin >= 10){
        setMaghribJamat(sunset.getHours() - 12+':'+ maghribPrayerMin +' ' + 'PM');
        }
        //Isha
        const {nauticalDusk} = SunCalc.getTimes(today, 41.8781, -87.6298);
        const ishaHour = nauticalDusk.getHours() - 12;
        const ishaMins = sunset.getMinutes()+24;
        if(ishaMins >= 59){
          if(((ishaMins - 60) < 9) || (ishaMins - 60) == 0){
          setIsha(ishaHour + 1 + ':' + 0 + (ishaMins - 60) +' ' + 'PM');
          } if((ishaMins - 60) > 9){
            setIsha(ishaHour +  ':' + (ishaMins - 60) +' ' + 'PM');
            }
        }
        if(ishaMins <= 59){
        setIsha(ishaHour + ':'+ ishaMins +' ' + 'PM');
        }
      //Fajr jamat 
        if ((mo === 1 && dt >= 1)) {
          setFajrJamat((fajrJamat) => '6:15 AM');
          setNextFajrChange('Fajr Jamat time change on 01-FEB to 6:00 AM');
        }if ((mo === 2 && (dt >= 1 && dt<=16))) {
          setFajrJamat((fajrJamat) => '6:00 AM');
          setNextFajrChange('Fajr Jamat time change on 17-FEB to 5:45 AM');
        }if ((mo === 2 && (dt >= 17) && (hijriMonth != 9))) {
          setFajrJamat((fajrJamat) => '5:45 AM');
          setNextFajrChange('Fajr Jamat time change on 1-MAR to 5:30 AM');
        }if ((mo == 3) && dt< marDls) {
          setFajrJamat('5:30 AM');
          //   if((nightEnd.getMinutes()+17) == 60){
          //     setFajrJamat(nightEnd.getHours()+1+':'+'20' + ' ' + 'AM');
          //   }if((nightEnd.getMinutes()+17) > 60){

          //     setFajrJamat(nightEnd.getHours()+1+':'+((nightEnd.getMinutes()+17+20)-60) + ' ' + 'AM');
          // }
          setNextFajrChange('Fajr Jamat time change on MAR-'+ marDls+ ' to 6:20 AM');
        }if ((mo == 3) && dt>= marDls && dt <=15) {
          setFajrJamat('6:20 AM');
          setNextFajrChange('Fajr Jamat time change on MAR-16 to 6:05 AM');
        }if ( mo == 3 && dt >= 16 && dt <= 22) {
          setFajrJamat('6:05 AM');
          setNextFajrChange('Fajr Jamat time change on MAR-23 to 5:50 AM');
        }if ((mo === 3 & (dt >= 23))) {
          setFajrJamat((fajrJamat) => '5:50 AM');
          setNextFajrChange('Fajr Jamat time change on 01-APR to 5:30 AM');
        }if ((mo === 4 && (dt >= 1) && (dt <= 6))) {

          setFajrJamat((fajrJamat) => '5:30 AM');
          setNextFajrChange('Fajr Jamat time change on 7-APR to 5:20 AM');
          
        }if ((mo === 4 && (dt>= 7) && (dt<= 13))) {

          setFajrJamat((fajrJamat) => '5:20 AM');
          setNextFajrChange('Fajr Jamat time change on 14-APR to 5:05 AM');
          
        }if ((mo === 4 && (dt>= 14))) {

          setFajrJamat((fajrJamat) => '5:05 AM');
          setNextFajrChange('Fajr Jamat time change on 1-MAY to 5:00 AM');
        }if ((mo === 5 && (dt>= 1) && (dt<= 7))) {

          setFajrJamat((fajrJamat) => '5:00 AM');
          setNextFajrChange('Fajr Jamat time change on 8-MAY to 4:45 AM');
        }if ((mo === 5 && (dt>= 8) && (dt<= 18))) {

          setFajrJamat((fajrJamat) => '4:45 AM');
          setNextFajrChange('Fajr Jamat time change on 19-MAY to 4:30 AM');
        }if ((mo === 5 && (dt>= 19))) {
          setFajrJamat((fajrJamat) => '4:30 AM');
          setNextFajrChange('Fajr Jamat time change on 14-JUL to 4:45 AM');
        }if ((mo === 6 && (dt>= 2))) {
          setFajrJamat((fajrJamat) => '4:30 AM');
          setNextFajrChange('Fajr Jamat time change on 14-JUL to 4:45 AM');
        }if ((mo === 7 && (dt>= 1) && (dt<= 13))) {
          setFajrJamat((fajrJamat) => '4:30 AM');
          setNextFajrChange('Fajr Jamat time change on 14-JUL to 4:45 AM');
        }if ((mo === 7 && (dt>= 14))) {
          setFajrJamat((fajrJamat) => '4:45 AM');
          setNextFajrChange('Fajr Jamat time change on 1-AUG to 5:00 AM');
        }if ((mo === 8 && (dt>= 1) && (dt<= 10))) {
          setFajrJamat((fajrJamat) => '5:00 AM');
          setNextFajrChange('Fajr Jamat time change on 11-AUG to 5:15 AM'); 
        }if ((mo === 8 && (dt>= 11) && (dt<= 22))) {
          setFajrJamat((fajrJamat) => '5:15 AM');
          setNextFajrChange('Fajr Jamat time change on 23-AUG to 5:30 AM');
        }if ((mo === 8 && (dt>= 23))) {
          setFajrJamat((fajrJamat) => '5:30 AM');
          setNextFajrChange('Fajr Jamat time change on 1-SEP to 5:45 AM');
        }if ((mo === 9 && (dt>= 1) && (dt<= 14))) {
          setFajrJamat((fajrJamat) => '5:45 AM');
          setNextFajrChange('Fajr Jamat time change on 15-SEP to 6:00 AM');
        }if ((mo === 9 && (dt>= 15))) {
          setFajrJamat((fajrJamat) => '6:00 AM');
          setNextFajrChange('Fajr Jamat time change on 14-OCT to 6:15 AM');
        }if ((mo === 10 && (dt>= 1) && (dt<= 13))) {
          setFajrJamat((fajrJamat) => '6:00 AM');
          setNextFajrChange('Fajr Jamat time change on 14-OCT to 6:15 AM');
        }if ((mo === 10 && (dt>= 14))) {
          setFajrJamat((fajrJamat) => '6:15 AM');
          setNextFajrChange('Fajr Jamat time change on 03-NOV to 5:45 AM'); 
        }if ((mo === 11 && (dt>= 1) && (dt<= 2))) {
          setFajrJamat((fajrJamat) => '6:15 AM');
          setNextFajrChange('Fajr Jamat time change on 03-NOV to 5:45 AM');
        }if ((mo === 11 && (dt>= 3) && (dt<= 13))) {
          setFajrJamat((fajrJamat) => '5:45 AM');
          setNextFajrChange('Fajr Jamat time change on 14-NOV to 6:00 AM');
        }if ((mo === 11 && (dt>= 14) )) {
          setFajrJamat((fajrJamat) => '6:00 AM');
          setNextFajrChange('Fajr Jamat time change on 01-DEC to 6:15 AM');
        }if ((mo === 12 && (dt>= 1))) {
          setFajrJamat((fajrJamat) => '6:15 AM');
          setNextFajrChange('Fajr Jamat time change on 01-FEB to 6:00 AM');
        }

        const fajrJamatToString = fajrJamat.toString();
        const splitFajrJamat = fajrJamatToString.split(" ");

        //setFajrJamat((fajrJamat) => '6:15 AM');
        //Dhuhr jamat
        if((mo == 1||2||3||4||5||6||7||8||9||10||11||12)) {
          setDhuhrJamat((dhuhrJmat) => '1:30 PM');
        }

        if(hijriMonth == 8 || hijriMonth == 9){
          setAnnouncement1((announcement1 ) => 'Note: During Ramadan Fajr Jamat starts '); 
          setAnnouncement2((announcement2 ) => '20 mins after Fajr start time.'); 
        } if((hijriMonth == 9) || (hijriMonth == 8 && hijriDt == 29)){
          setRamadanKareem((ramadanKareem) => 'Ramadan Kareem')
        }
      //ASR
      if ((mo === 1) && (dt >= 1) && (dt <= 5)) {

        setAsrJamat((asrJamat) => '3:00 PM');
        setNextAsrChange('ASR Jamat time change on 6-JAN to 3:15 PM');
        
      }if ((mo === 1) && (dt >= 6) && (dt <= 19)) {

        setAsrJamat((asrJamat) => '3:15 PM');
        setNextAsrChange('ASR Jamat time change on 20-JAN to 3:45 PM');
      }if ((mo === 1) && (dt >= 20)) {
        setAsrJamat((asrJamat) => '3:45 PM');
        setNextAsrChange('ASR Jamat time change on 9-FEB to 4:00 PM');
      } if ((mo === 2) && (dt >= 1) && (dt <= 8)) {

        setAsrJamat((asrJamat) => '3:45 PM');
        setNextAsrChange('ASR Jamat time change on 9-FEB to 4:00 PM');
      }if ((mo === 2) && (dt >= 9) && (dt <= 22)) {

        setAsrJamat((asrJamat) => '4:00 PM');
        setNextAsrChange('ASR Jamat time change on 22-FEB to 4:15 PM');
      }if ((mo === 2 && (dt >= 22))) {

        setAsrJamat((asrJamat) => '4:15 PM');
        setNextAsrChange('ASR Jamat time change on ' + marDls + ' - MAR to 5:45 PM');
        
      }if ((mo === 3 && (dt >= 1) && (dt < marDls))) {

        setAsrJamat((asrJamat) => '4:15 PM');
        setNextAsrChange('ASR Jamat time change on ' + marDls + ' - MAR to 5:15 PM');
      }if ((mo === 3 && (dt >= marDls))) {

        setAsrJamat((asrJamat) => '5:15 PM');
        setNextAsrChange('ASR Jamat time change on 01 - APR to 6:30 PM');
        
      }if ((mo === 4 && (dt >= 1))) {

        setAsrJamat((asrJamat) => '6:30 PM');
        setNextAsrChange('ASR Jamat time change on 01 - JUN to 5:45 PM');
      }if ((mo === 5 && (dt >= 1))) {

        setAsrJamat((asrJamat) => '6:30 PM');
        setNextAsrChange('ASR Jamat time change on 01 - JUN to 5:45 PM');
        
      }if ((mo === 6 && (dt >= 1) && (dt <= 15))) {

        setAsrJamat((asrJamat) => '5:45 PM');
        setNextAsrChange('ASR Jamat time change on 15 - JUN to 5:30 PM');
      }if ((mo === 6 && (dt > 15))) {

        setAsrJamat((asrJamat) => '5:30 PM');
        setNextAsrChange('ASR Jamat time change on 01 - JUL to 6:30 PM');
        
      }if ((mo === 7 && (dt >= 1))) {

        setAsrJamat((asrJamat) => '6:30 PM');
        setNextAsrChange('ASR Jamat time change on 1 - AUG to 6:15 PM');
        
      }if ((mo === 8 && (dt >= 1) && (dt <= 15))) {

        setAsrJamat((asrJamat) => '6:15 PM');
        setNextAsrChange('ASR Jamat time change on 16 - AUG to 6:00 PM');
      }if ((mo === 8 && (dt <= 16))) {

        setAsrJamat((asrJamat) => '6:00 PM');
        setNextAsrChange('ASR Jamat time change on 1 - SEP to 5:30 PM');
      }if ((mo === 9 && (dt >= 1) && (dt <= 14))) {

        setAsrJamat((asrJamat) => '5:30 PM');
        setNextAsrChange('ASR Jamat time change on 15 - SEP to 5:15 PM');
      }if ((mo === 9 && (dt >= 15))) {

        setAsrJamat((asrJamat) => '5:15 PM');
        setNextAsrChange('ASR Jamat time change on 1 - OCT to 5:00 PM');
      }if ((mo === 10 && (dt >= 1) && (dt <= 14))) {

        setAsrJamat((asrJamat) => '5:00 PM');
        setNextAsrChange('ASR Jamat time change on 15 - OCT to 4:45 PM');
        
      }if ((mo === 10 && (dt >= 15))) {

        setAsrJamat((asrJamat) => '4:45 PM');
        setNextAsrChange('ASR Jamat time change on 1 - NOV to 5:00 PM');
        
      }if ((mo === 11 && (dt >= 1) && (dt < novDls))) {

        setAsrJamat((asrJamat) => '5:00 PM');
        setNextAsrChange('ASR Jamat time change on ' + novDls + ' - NOV to 3:30 PM');
        
      }if ((mo === 11 && (dt >= novDls))) {

        setAsrJamat((asrJamat) => '3:30 PM');
        setNextAsrChange('ASR Jamat time change on 01 - DEC to 3:00 PM');
      }if ((mo === 12 && (dt >= 1))) {

        setAsrJamat((asrJamat) => '3:00 PM');
        
      }
      //Isha
      if ((mo === 1 && (dt >= 1))) {

        setIshaJamat((ishaJamat) => '7:30 PM');
        setNextIshaChange('Isha Jamat time change on ' + marDls + '- MAR' + ' to 8:30 PM');
      }if ((mo === 2 && (dt >= 1)  && ((hijriMonth != 8 && hijriDt != 29) ) || hijriMonth != 9)) {
        setIshaJamat((ishaJamat) => '7:30 PM');
        setNextIshaChange('Isha Jamat time change on ' + marDls + '-MAR' + ' to 8:30 PM');
      }if ((mo === 2 && dt >= 1)  && ((hijriMonth == 8 && hijriDt >= 29) || (hijriMonth == 9))) {
        setIshaJamat((ishaJamat) => '8:00 PM');
        setNextIshaChange('Isha Jamat time change on ' + marDls + '-MAR' + ' to 8:30 PM');
      }if ((mo === 3) && (dt >= 1) && (dt < marDls)&& ((hijriMonth == 8 && hijriDt >= 29) || (hijriMonth == 9))) {
        setIshaJamat((ishaJamat) => '8:00 PM');
        setNextIshaChange('Isha Jamat time change on ' + marDls + '-MAR' + ' to 8:30 PM');
        //setIshaAnnouncement('Isha Jamat time change on ' + hijriDateFormat)
      }if ((mo === 3) && (dt >= 1) && (dt < marDls)&& ((hijriMonth != 8) || (hijriMonth != 9))) {
        setIshaJamat((ishaJamat) => '7:30 PM');
        setNextIshaChange('Isha Jamat time change on ' + marDls + '-MAR' + ' to 8:30 PM');
        setIshaAnnouncement('Isha Jamat time change on ' + hijriDateFormat)
      } if (mo === 3 && dt >= marDls) {
        setIshaJamat((ishaJamat) => '9:00 PM');
        setNextIshaChange('Isha Jamat time change on 20-APR to 9:15 PM');
      }if (mo === 3 && dt >= 20) {
        setIshaJamat((ishaJamat) => '9:15 PM');
        setNextIshaChange('Isha Jamat time change on 01-APR to 9:00 PM');
      }if ((mo === 4 && (dt >= 1) && (dt < 10))) {
        setIshaJamat((ishaJamat) => '9:00 PM');
        setNextIshaChange('Isha Jamat time change on 11-APR to 9:15 PM');
      }if ((mo === 4 && (dt >= 11))) {
        setIshaJamat((ishaJamat) => '9:15 PM');
        setNextIshaChange('Isha Jamat time change on 01-MAY to 9:45 PM');
      }if ((mo === 5 && (dt >= 1) && (dt <= 18))) {
        setIshaJamat((ishaJamat) => '9:45 PM');
        setNextIshaChange('Isha Jamat time change on 19-MAY to 10:00 PM');
      }if ((mo === 5 && (dt >= 19))) {
        setIshaJamat((ishaJamat) => '10:00 PM');
        setNextIshaChange('Isha Jamat time change on 01-JUN to 10:15 PM');
      }if ((mo === 6 && (dt >= 1))) {
        setIshaJamat((ishaJamat) => '10:15 PM');
        setNextIshaChange('Isha Jamat time change on 21-JUL to 10:00 PM');
      }if ((mo === 7 && (dt >= 1) && (dt <= 20))) {
        setIshaJamat((ishaJamat) => '10:15 PM');
        setNextIshaChange('Isha Jamat time change on 21-JUL to 10:00 PM');
      }if ((mo === 7 && (dt >= 21))) {
        setIshaJamat((ishaJamat) => '10:00 PM');
        setNextIshaChange('Isha Jamat time change on 1-AUG to 9:45 PM');
      }if ((mo === 8 && (dt >= 1) && (dt <= 15))) {
        setIshaJamat((ishaJamat) => '9:45 PM');
        setNextIshaChange('Isha Jamat time change on 16-AUG to 9:30 PM');
      }if ((mo === 8 && (dt >= 16))) {
        setIshaJamat((ishaJamat) => '9:30 PM');
        setNextIshaChange('Isha Jamat time change on 01-SEP to 9:00 PM');
      }if ((mo === 9 && (dt >= 1) && (dt <= 12))) {
        setIshaJamat((ishaJamat) => '9:00 PM');
        setNextIshaChange('Isha Jamat time change on 13-SEP to 8:45 PM');
      }if ((mo === 9 && (dt >= 13) && (dt <= 21))) {
        setIshaJamat((ishaJamat) => '8:45 PM');
        setNextIshaChange('Isha Jamat time change on 22-SEP to 8:30 PM');
      }if ((mo === 9 && (dt >= 22))) {
        setIshaJamat((ishaJamat) => '8:30 PM');
        setNextIshaChange('Isha Jamat time change on 01-OCT to 8:00 PM');
      }if ((mo === 10 && (dt >= 1) && (dt <= 13))) {
        setIshaJamat((ishaJamat) => '8:00 PM');
        setNextIshaChange('Isha Jamat time change on 14-OCT to 7:45 PM');
      }if ((mo === 10 && (dt >= 14))) {
        setIshaJamat((ishaJamat) => '7:45 PM');
        setNextIshaChange('Isha Jamat time change on 01-NOV to 7:30 PM');
      }if ((mo === 11 && (dt >= 1) && (dt < marDls))) {
        setIshaJamat((ishaJamat) => '7:30 PM');
        setNextIshaChange('Isha Jamat time change on ' + 'March DLS' + '-MAR' + ' to 8:30 PM');
      }if ((mo === 11 && (dt >= marDls))) {
        setIshaJamat((ishaJamat) => '7:30 PM');
        setNextIshaChange('Isha Jamat time change on ' + 'March DLS' + '-MAR' + ' to 8:30 PM');
      }
      if ((mo === 12 && (dt >= 1))) {
        setIshaJamat((ishaJamat) => '7:30 PM');
        setNextIshaChange('Isha Jamat time change on ' + 'March DLS' + '-MAR' + ' to 8:30 PM');
      }
        
      }, []);
    
        return( 
        <div >
          <div>
          <p style={{marginLeft: '27vw', visibility: isVisible ? 'visible' : 'hidden', 
        background: 'golden', fontWeight: 'bolder', color: 'brown',  border: '2px golden',
          borderRadius: 50, display: 'flex', justifyContent: 'center',  alignItems: 'center'
        }}>
            {ramadanKareem}
           </p>
          </div>
        <table className='my-table' style={{background: 'red', textAlign: 'center', marginLeft: '2vw', fontWeight: 'bolder', 
          color: 'white'}}>
            {/* <th>
            {announcement1}
            {announcement2}
            </th> */}
      
        </table>
        
      <table className='my-table' style={{justifyContent: 'center', marginLeft:'2vw', 
              backgroundColor: 'white', fontWeight: 'bolder'}}>    
      <tr style={{background: 'maroon', color: 'white'}}> 
    
            <th style={{background:'white', color: 'green'}}>
            
            Date: {dateString}<br/> 
         
              <TimeDisplay/>
          
            </th>
            <th >
                <Link  to="https://chicagohilal.org/">
                    <button style={{borderRadius: '50%', color: 'white', fontWeight: 'bolder',
                    padding: '10px 20px',
                      backgroundColor: isHovering ? 'green' : 'goldenrod' 
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    >confirm moon sighting</button>
                  </Link>
            </th>
            <th style={{background:'white', color: 'green'}}>
            <p style={{color: 'green'}}>Hijri Date: {hijriDateFormat} </p> 
            </th>
          </tr>
    
          <tr style={{textAlign: 'center', fontWeight: 'bolder', background: 'green', color: 'white'}}>
            <td >Prayers</td> 
            <td>Start</td>
            <td >&emsp;Iqama </td>
          </tr>
            
          <tr style={{textAlign: 'center', fontWeight: 'bolder'}} >
            <td><FiSunrise/>Fajr</td>
            <td>{fajrDawn?.toLocaleString()}</td> 
            <td>{fajrJamat}</td> 
          </tr>

            <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>
              <td ><FiSunrise /> Sunrise</td>
              <td>{sunRise}</td>
              <td> </td>
            </tr>

            <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>
              <td><MdWbSunny /> Dhuhr<br/>
              <p style={{color: 'red', fontWeight: 'bolder', fontWeight: 'bolder'}}>
                During school days <br /> Sunday Dhuhr will be at 1 PM.</p>
              </td>
              <td>{dhuhr}</td>
              <td>{dhuhrJamat}</td>
            </tr>

            <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>
              <td><MdOutlineWbSunny /> Asr</td>
              <td>{asr}</td>
              <td>{asrJamat}</td>
            </tr>

            <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>
              <td><FiSunset /> Sunset</td>
              <td>{sunSet}</td>
              <td></td>
            </tr>

            <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>
              <td><TbSunMoon /> Maghrib</td>
              <td></td>
              <td>{maghribJamat}</td>
            </tr>

            <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>
              <td><FaRegMoon /> Isha</td>
              <td>{isha}</td>
              <td >{ishaJamat}</td>
            </tr>

            </table >
            <br/>
            <table className='my-table'  style={{marginLeft: '2vw',textAlign: 'center', fontWeight: 'bolder', background: 'white', color: 'magenta', border: '1vw'}}>
             <th style={{color: 'white', background: 'green'}}>Prayer Time Change Alert</th>
              <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>{nextFajrChange}</tr>
              <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>{nextAsrChange}</tr>
              <tr style={{textAlign: 'center', fontWeight: 'bolder'}}>{nextIshaChange}</tr>   
            </table>
        </div>
        )
      }

      export default TimeChangeAlert;