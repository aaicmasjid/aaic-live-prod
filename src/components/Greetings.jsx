import  {React, useState, useEffect } from 'react';
import DatePicker from '@deskpro/react-datepicker-hijri';
import moment from 'moment-hijri';

const Greetings = () => {
 
  const [startDate, setStartDate] = useState(moment());
  const hijriMonth = moment().format("iM");
  const hijriDate = moment().format("iYYYY/iM/iD");
  const hijriDay = moment().format("iD");

   //Ramadan greeting Beging - ramadan kareem flasing
        const [ramadanKareem, setRamadanKareem] = useState('');
        const [isVisible, setIsVisible] = useState(true);
        useEffect(() => {
          const intervalId = setInterval(() => {
            setIsVisible(prev => !prev);
          }, 1000); // Toggle visibility every 500ms
       if(hijriMonth == 9){
          setRamadanKareem((ramadanKareem) => 'Ramadan Kareem')
        }
          return () => clearInterval(intervalId); // Clean up the interval on component unmount
        }, []);
        //Ramadan greeting END...

       
  return (
 <div>
    <p style={{marginLeft: '27vw', visibility: isVisible ? 'visible' : 'hidden', 
        background: 'golden', fontWeight: 'bolder', color: 'brown',  border: '2px solid black',
          borderRadius: 50, display: 'flex', justifyContent: 'center',  alignItems: 'center'
        }}>
            {ramadanKareem}
           </p>

 </div>
  );
};

export default Greetings;