import React, { useState, useEffect } from 'react';

function BlinkingText() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span style={{ fontSize: '12px', visibility: isVisible ? 'visible' : 'hidden', color: 'magenta', fontWeight: 'bolder' }}>
      created by Mohammed Shafiuddin
    </span>
  )
}

export default BlinkingText;