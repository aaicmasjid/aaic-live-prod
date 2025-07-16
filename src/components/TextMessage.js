import React from 'react';
const TextMessge = () => {
    const handleButtonClick = async () => {
        try {
            const response = await fetch('http://localhost:3000/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: '+13127149744', // Replace with the recipient's phone number
                    message: 'Hello from React!'
                })
            });
            if (response.ok) {
                alert('SMS sent!');
            } else {
                alert('Failed to send SMS');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };
    return (
        <button onClick={handleButtonClick}>Send SMS</button>
    );
};
export default TextMessge;