import React, { useState, useEffect } from "react";
import { FiSunset, FiSunrise } from "react-icons/fi";
import { IconBase } from "react-icons/lib";
import { FaCloudSun } from "react-icons/fa";
import { MdWbSunny, MdOutlineWbSunny } from "react-icons/md";
import { TbSunMoon } from "react-icons/tb";
import { FaRegMoon } from "react-icons/fa6";

import Hijri from "./Hijri";
import CalendarInput from "./CalendarInput";



//https://react-icons.github.io/react-icons/search/#q=sun

function PrayerTimesModern() {
    const today = new Date();
    const monthName = today.toLocaleString('default', { month: 'long' });
    const shortMonth = monthName.slice(0, 3);
    // const month = today.getMonth().toLocaleString + 1;
    const dayOfWeek = today.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[dayOfWeek];
    const shorDayName = dayName.slice(0, 3);
    const year = today.getFullYear();
    const date = today.getDate();

    const currentDate = shorDayName + "," + shortMonth + " " + date + "," + year;
    const currHr = today.getHours();
    const currMin = today.getMinutes();
    const [data, setData] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        (async () => {

            // const response = await fetch(`${apiUrl}/api/prayertimes`); 
            const response = await fetch("https://aws.aaicx.com/api/prayertimes");
            const parsed = await response.json();
            setData(parsed);
        })
            ();
    }, []);

    //   replace(): Uses a regular expression (/[\[\]]/g) to match and replace all occurrences of opening and closing brackets ([ and ]) with an empty string.
    const jsonStr = JSON.stringify(data, null, 2);
    const jsonStringWithoutBrackets = jsonStr.replace(/[{}"",\[\]]/g, '');
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  

    // const prayerName = Object.keys(jsonStringWithoutBrackets);
    const prayerTimes = Object.values(jsonStringWithoutBrackets);
    const fajrHour = prayerTimes[137];
    const fajrMin = prayerTimes[139] + prayerTimes[140];
    const asrHour = prayerTimes[178]+prayerTimes[179];
    const asrMin = prayerTimes[181] + prayerTimes[182];
    //===========================================
    const maghribHour = prayerTimes[202]+prayerTimes[203];
    const maghribMin = prayerTimes[205] + prayerTimes[206];
    const ishaHour = +prayerTimes[223] + +prayerTimes[224] + +12;
    const ishaMin = prayerTimes[226] + prayerTimes[227];
    const dhuhrMin = prayerTimes[161] + prayerTimes[162];
    const militaryAsrHour = +asrHour + +12;
    const militaryMaghribHour = +maghribHour + +12;
    //============================
    const totalFajrHours = (fajrHour * 60);
    const totalFajrHoursMin = +totalFajrHours + +fajrMin;
    const totalDhuhrHours = 780;
    const totalDhuhrHoursMin = +totalDhuhrHours + +dhuhrMin;
    const totalAsrHours = (militaryAsrHour * 60);
    const totalAsrHoursMin = +totalAsrHours + +asrMin;
    const totalMaghribHours = (militaryMaghribHour * 60);
    const totalMaghribHoursMin = +totalMaghribHours + +maghribMin;
    const totalIshaHours = (ishaHour * 60);
    const totalIshaHoursMin = +totalIshaHours + +ishaMin;
    const totalCurrHours = (currHr * 60) + +currMin;

    const getFajrColor = () => {
        if ((totalCurrHours >= totalIshaHoursMin)) {
            return 'cyan';
        } if ((totalCurrHours <= totalFajrHoursMin)) {
            return 'cyan';
        } else {
            return 'white';
        }
    };
    const getDhuhrrColor = () => {
        if ((totalCurrHours <= totalDhuhrHoursMin) && (totalCurrHours >= totalFajrHoursMin)) {
            return 'cyan';
        } else {
            return 'white';
        }
    };
    const getAsrColor = () => {
        if ((totalCurrHours <= totalAsrHoursMin) && ((totalCurrHours >= totalDhuhrHoursMin))) {
            return 'cyan';
        } else {
            return 'white';
        }
    };
    const getMaghribColor = () => {
        if ((totalCurrHours >= totalAsrHoursMin) && (totalCurrHours <= totalMaghribHoursMin)) {
            return 'cyan';
        } else {
            return 'white';
        }
    };
    const getIshaColor = () => {

        if ((totalCurrHours >= totalMaghribHoursMin) && (totalCurrHours <= totalIshaHoursMin)) {
            return 'cyan';
        } else {
            return 'white';
        }
    };
    return (

        <div >
            
            <div>
                &nbsp;<table className="my-table" style={{ justifyContent: 'center', marginTop: '-2vw', marginLeft: '1vw' }}>

                    <thead style={{ backgroundColor: 'green', color: 'white', fontSize: '2vw', textAlign: 'center' }}>
                        <th > Prayers <br />  نماز <br /> lutjet  </th>
                        <th > STARTS <br />  نماز کے اوقات  <br />&emsp;Orari i namazit &emsp;</th>
                        <th >IQAMA <br />  إِقَامَة <br />
                            &emsp;qëndro&emsp; </th>
                    </thead >
                    <tbody style={{ blockSize: '20vw', textAlign: 'center', color: 'black', fontWeight: 'bolder', marginLeft: '2vw' }}>

                        <tr style={{ backgroundColor: getFajrColor() }}>
                            <td ><IconBase style={{ color: 'darkgoldenrod' }}><FaCloudSun /> </IconBase>&emsp;Fajr - Sabahu</td>
                            <td><p>{data.fajr} </p></td>
                            <td><p>{data.fajrJamat} </p></td>
                        </tr>
                        <tr>
                            <td style={{ background: 'white' }}> <IconBase style={{ color: 'darkgoldenrod' }}><FiSunrise /> </IconBase>&emsp;Sunrise <br /> lindja e diellit </td>
                            <td style={{ background: 'white' }}> {data.sunrise} </td>
                            <td style={{ background: 'white' }}></td>
                        </tr>
                        <tr style={{ backgroundColor: getDhuhrrColor() }}>
                            <td><IconBase style={{ color: 'goldenrod' }}> <MdWbSunny /></IconBase>Dhuhr <br /> <p style={{ color: 'red', fontSize: '1vw' }}>School days on Sunday Dhuhr 1:00 PM</p>&emsp;Dreka<p style={{ color: 'red', fontSize: '1vw' }}>Ditët e shkollës të dielën Dreka 13:00</p></td>
                            <td>{data.dhuhr} </td>
                            <td><p>{data.dhuhrJamat} </p></td>
                        </tr>
                        <tr style={{ backgroundColor: getAsrColor() }}>
                            <td><IconBase style={{ color: 'goldenrod' }}> <MdOutlineWbSunny /></IconBase>Asr <br />&emsp; Ikindija </td>
                            <td>{data.asr} </td>
                            <td><p>{data.asrJamat} </p></td>
                        </tr>
                        <tr >
                            <td style={{ background: 'white' }}><IconBase style={{ color: 'burlywood' }}> <FiSunset /></IconBase> Sunset <br />perëndimi i diellit </td>
                            <td style={{ background: 'white' }}>{data.sunset}<br /> </td>
                            <td style={{ background: 'white' }}><p ></p></td>
                        </tr>
                        <tr style={{ backgroundColor: getMaghribColor() }}>
                            <td><IconBase style={{ color: 'gray' }}> <TbSunMoon /></IconBase> Maghrib <br />&emsp; Akshami</td>
                            <td>{data.maghrib}</td>
                            <td><p>{data.maghribJamat} </p></td>
                        </tr>
                        <tr style={{ backgroundColor: getIshaColor() }}>
                            <td><IconBase style={{ color: 'darkgoldenrod' }}> <FaRegMoon /></IconBase> Isha <br /> &nbsp;&nbsp;&nbsp;&nbsp;Jacia </td>
                            <td>{data.isha}</td>
                            <td><p>{data.ishaJamat} </p></td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <table style={{marginLeft: '1vw'}}>
            <div>
                <th style={{ border: '1px solid black', backgroundColor: 'gray', display: 'flex'}}>
                    <tr style={{ fontSize: '3.0vw', color: 'white' }}>&emsp;&emsp;&emsp;{currentDate}
                    &emsp; <Hijri /><br />
                        </tr>
                </th>

                    <th  style={{ color: 'white', backgroundColor: 'green', fontWeight: 'bolder', fontSize: '4.0vw', marginLeft: '60vw' }} >
                        &emsp;Search Jamat Timings&emsp;<br /><CalendarInput />&emsp;&emsp;<br />
                    </th>
                </div>
                </table><br />
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default PrayerTimesModern;