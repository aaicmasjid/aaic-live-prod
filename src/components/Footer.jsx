import React from "react";
//import Anchor from './Anchor';
import "./Footer.css";

const Footer = () => {
  return (
    <div >
 
        
        {/* <Anchor link="https://github.com/mshafi2" name="Github">
          <i className="icon ion-logo-github" />
        </Anchor>
        <Anchor link="https://www.linkedin.com/in/mohammed-shafiuddin" name="LinkedIn">
          <i className="icon ion-logo-linkedin" />
        </Anchor>
        <Anchor link="https://twitter.com" name="Twitter">
          <i className="icon ion-logo-twitter" />
        </Anchor>
        <Anchor link="shafichicago@gmail.com" name="Email">
          <i className="icon ion-gmail.com" />
        </Anchor> */}
      
  
          <div style={{fontSize: '1.75vw', fontWeight: 'bolder', textAlign: "center"}}> 
            
        Copyright &copy; {new Date().getFullYear()} Contact: Mohammed Shafiuddin <a href="tel:+13127149744">1-312-714-9744</a>
         <br />AAIC Address: 5825 St Charles Rd, Berkeley, IL 60163. All Rights Reserved.
         <br />
        <p > DIRECTIONS</p>
         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.173178025641!2d-87.91697768869031!3d41.88913256460397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e4b478fcb5157%3A0x4695c19b7daa30b5!2s5825%20St%20Charles%20Rd%2C%20Berkeley%2C%20IL%2060163!5e0!3m2!1sen!2sus!4v1727318186200!5m2!1sen!2sus" 
      width="150" 
      height="65" 
      style={{border:"1"}} 
      allowFullscreen
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade">
      </iframe>
      </div>
       
    </div>
  );
};

export default Footer;
