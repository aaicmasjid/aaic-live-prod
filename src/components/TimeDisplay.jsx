import React, { useState, useEffect } from 'react';

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1 seconds (1 minute)
    //60000); // Update every 60 seconds (1 minute)
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div>
      <p>Time: {formattedTime}</p>
    </div>
  );
}

export default TimeDisplay;