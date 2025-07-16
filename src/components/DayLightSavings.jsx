import React from 'react'

function DayLightSavings() {
    const today = new Date();
        const mo = today.getMonth()+1;
        const dt = today.getDate();
        const yr = today.getFullYear();
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
      const mardlsaving = 'MAR' + ' ' + marDls + ' ' +  yr;
      const novdlsaving = 'NOV' + ' ' + novDls + ' '+ yr;
      //End - Daylight savings
      
      
  return (
    <div>
        <table className='my-table'>
            <th>
                <th style={{background: 'green', color: 'white', fontWeight: 'bolder'}}>
                    Daylight Saving
                </th>
                <tr>
                    Spring   
                    <p style={{marginLeft: '1.12vw', color: 'red', fontWeight: 'bolder'}}>{mardlsaving}
                    </p> 
                </tr>
                <tr>
                    Fall 
                    <p style={{marginLeft: '2vw', color: 'red', fontWeight: 'bolder'}}>{novdlsaving} </p>
                </tr>
            </th>
        </table>
    </div>
  )
}

export default DayLightSavings