import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css'; // Import the styles

function WhatsAppCallButton() {
  const phoneNumber = '+355694441284'; // Replace with the desired phone number

  const handleCall = () => {
    window.location.href = `https://wa.me/${phoneNumber}`;
  };

  return (
    <button style={{backgroundSize: 'cover', color: 'darkgreen', fontWeight: 'bolder', borderRadius: '20px',  padding: '2px 1px'}}  onClick={handleCall}>
      <FaWhatsapp/> Confirm prayer timings call Imam on WhatsApp .
    </button>
  );
}

export default WhatsAppCallButton;