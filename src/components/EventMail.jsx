import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import React, { useState } from 'react';


const ContactFormButton = () => {
    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
      setShowComponent(!showComponent);
    }; 

  return (
    
     <div>
      <button style={{padding: '2px 4px', color:'white', fontWeight: 'bolder', backgroundColor: 'green', borderRadius: '65px', fontSize: '7vw' }} onClick={handleClick}>&nbsp;Contact AAIC &nbsp;</button>
      {showComponent && <ContactForm />}
    </div>
   
  );
};

export default ContactFormButton;