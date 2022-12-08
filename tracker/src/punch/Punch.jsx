import React, { useState, useEffect } from 'react';
import './punch.css';

function Punch() {
  const [punchInTime, setPunchInTime] = useState('');
  const [lunchStartTime, setLunchStartTime] = useState('');
  const [lunchEndTime, setLunchEndTime] = useState('');
  const [punchOutTime, setPunchOutTime] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  function handlePunchInChange(event) {
    setPunchInTime(event.target.value);
  }

  function handleLunchStartChange(event) {
    setLunchStartTime(event.target.value);
  }

  function handleLunchEndChange(event) {
    setLunchEndTime(event.target.value);
  }

  function handleCalculate() {
    const workHoursPerDay = 8;

    // Parse the input times as Date objects
    const punchIn = new Date(`1970-01-01 ${punchInTime}`);
    const lunchStart = new Date(`1970-01-01 ${lunchStartTime}`);
    const lunchEnd = new Date(`1970-01-01 ${lunchEndTime}`);

    // Calculate the total lunch time in milliseconds
    const lunchTime = lunchEnd - lunchStart;

    // Calculate the punch out time by adding the total work hours and lunch time to the punch in time
    const punchOut = new Date(punchIn.getTime() + workHoursPerDay * 60 * 60 * 1000 + lunchTime);

    // Format the punch out time as a string and set it in the state
    const punchOutTime = punchOut.toTimeString().split(' ')[0];
    setPunchOutTime(punchOutTime);
  }

  // Update the time left every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the time left until punch out
      const now = new Date();
      const punchOut = new Date(`1970-01-01 ${punchOutTime}`);
      const timeLeft = punchOut - now;

      // Format the time left as a string and set it in the state
      const timeLeftFormatted = new Date(timeLeft).toTimeString().split(' ')[0];
      setTimeLeft(timeLeftFormatted);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [punchOutTime]);

  return (
    <div className="Punch">
      <h1>Punch Time Calculator</h1>
      <div className="Punch-inputs-wrapper">
        <div className="Punch-inputs">
        <p>Punch In:</p>
        <input type="time" onChange={handlePunchInChange} required />
        </div>
        <div className="Punch-inputs">
        <p>Lunch Start:</p>
        <input type="time" onChange={handleLunchStartChange} required/>
        </div>
        <div className="Punch-inputs">
        <p>Lunch End:</p>
        <input type="time" onChange={handleLunchEndChange} required/>
        </div>
        <button className='calculate-btn' onClick={handleCalculate}>Calculate Punch Out</button>
      </div>
      {punchOutTime && (
        <div className="Punch-results">
          <p>Your punch out time is: {punchOutTime}</p>
          {timeLeft && <p>Time left until punch out: {timeLeft}</p>}
        </div>
      )}
    </div>
  );
}

export default Punch;