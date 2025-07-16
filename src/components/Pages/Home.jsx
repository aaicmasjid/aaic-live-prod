import React from 'react'
//import videoBg from './src/images/AAIC-Google1.mp4';
import Footer from '../Footer.jsx';
//import FetchDataNoKey from '../FetchDataNoKey.jsx';
import TempApp from '../TempApp.jsx';
import PrayerTimesModern from '../PrayerTimesModern.jsx';
import Donate from '.././Donate.jsx';
import videoBg from '../../images/AAIC-Google1.mp4';
import Articles from '../Articles.jsx';
import Quran from '../Quran.jsx';
import ContactFormButton from '../ContactFormButton.jsx';
import MyCalendar from '../MyCalendar.jsx';
import Calendar from 'react-calendar';
import MonthlySchedule from '../MonthlySchedule.jsx';
import TimeChangeAlert from '../TimeChangeAlert.jsx';
import DayLightSavings from '../DayLightSavings.jsx';
import Blink from 'react-blink-text';
import BlinkingText from '../BlinkingText.jsx';
import HijriDatePicker from '../Greetings.jsx';
import Greetings from '../Greetings.jsx';
import Taraveeh from '../../images/2025Tayyab.jpg';
import WhatsAppCallButton from '../../WhatsAppCallButton.jsx';

const Home = () => {
  return (
    <div style={{backgroundColor: 'lightgoldenrodyellow'}}>
     <p> <BlinkingText /></p>
      <img src={require('../../images/aaic-pan1-careonside1.png') } alt=''/>
      <div style={{marginLeft: '2vw'}}>
      <WhatsAppCallButton/><br/>
      </div>
     <div style={{display: 'flex'}}>
      <div> <TimeChangeAlert /><br />
       <div style={{ display: 'flex', marginLeft: '2vw' }}><TempApp /></div><br /><br />
       {/* <div style={{ display: 'flex', marginLeft: '1vw'}}><br /> <MonthlySchedule /></div> */}
       </div>
       
       <div style={{ marginTop: '0vw', marginLeft: '1vw' }}>
        <div>

        </div><Donate /><br /><br /><Quran/><br />
       <Articles></Articles></div>
       
         </div>

         {/* <div style={{marginLeft: '10vw', marginTop: '150vw', marginRight: '50vw'}}> <MonthlySchedule /> </div> */}
    
      <div className='video_player' style={{ height: '37vw', marginLeft: '1vw', marginTop: '10vw', width: '95vw' }}>
      
      <div style={{justifyContent: 'center', marginLeft: '25vw'}}><ContactFormButton/></div>
      <br/>  <div><Footer /></div>
    <br/>
    <br/>
    <br/>
      <video controls autoPlay loop muted className="bg-vid">
          <source src={videoBg} type="video/mp4"></source>
        </video>
      </div>

    </div>

  )
}
export default Home
