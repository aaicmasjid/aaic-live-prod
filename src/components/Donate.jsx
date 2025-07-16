import React from 'react';
import { FaDonate } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

function Donate() {
 
  const handleButtonClick = () => {
    window.open('https://us.mohid.co/il/wcs/aaicberkeley/masjid/online/donation', '_blank');
  };

  return (
     
    <Button   style={{background: 'goldenrod', fontVariantCaps: 'titling-caps', color: 'white', borderRadius: '50vw', borderBlockWidth: '1.25vw',  borderBlockStyle: 'solid', padding: '1.5vw', fontWeight: 'bold', fontSize: '2vw', cursor: 'pointer'}}
    onClick={handleButtonClick}><div style={{color: 'maroon', fontSize: '2.5vw'}}><FaDonate /></div><br/>Donate <br/> Dhuroni</Button>
  );
}

export default Donate;