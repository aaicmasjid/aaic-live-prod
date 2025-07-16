import React, { useState } from 'react';
import audio1 from '../audio/AlbanianQuran-1.mp3';
import { Link } from 'react-router-dom';

function Quran() {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlay = () => {
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//   };

  return (
    <div>
      {/* <audio controls autoPlay={isPlaying}> */}
      <audio controls style={{backgroundColor: 'green', padding: '1vw 0.25vw', width: '25vw', marginLeft: '0.5vw'}}>
        <source src={audio1} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
    <Link to="https://www.qurantranslations.net/albanian/?file=0#player">
     <br/> <button style={{ padding: '1.5vw 1.75vw', borderRadius: '50px'}}><p style={{fontSize: '2.20vw', cursor: 'pointer',padding: '0.35vw 0.5vw', fontWeight: 'bold', color: 'black', backgroundColor: 'goldenrod'}}>Listen to the Quran.</p>
        <p style={{fontSize: '2.20vw', fontWeight: 'bold', cursor: 'pointer'}}>Dëgjoni Kuranin.</p></button>
    </Link>
        
    </div>
  );
}

export default Quran;