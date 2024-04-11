import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Import CSS file

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          setTimerRunning(false);
        } else {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else {
            if (minutes > 0) {
              setMinutes(minutes - 1);
              setSeconds(59);
            } else {
              if (hours > 0) {
                setHours(hours - 1);
                setMinutes(59);
                setSeconds(59);
              }
            }
          }
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, hours, minutes, seconds]);

  const handleStartStop = () => {
    setTimerRunning(!timerRunning);
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    if (name === 'hours') {
      setHours(parseInt(value) || 0); // Ensure 0 is set if NaN
    } else if (name === 'minutes') {
      setMinutes(parseInt(value) || 0); // Ensure 0 is set if NaN
    } else if (name === 'seconds') {
      setSeconds(parseInt(value) || 0); // Ensure 0 is set if NaN
    }
  };

  return (
    <div className="countdown-timer">
      <div>
        <input type="number" name="hours" value={hours} onChange={handleTimeChange} placeholder="Hours" />
        <input type="number" name="minutes" value={minutes} onChange={handleTimeChange} placeholder="Minutes" />
        <input type="number" name="seconds" value={seconds} onChange={handleTimeChange} placeholder="Seconds" />
      </div>
      <button onClick={handleStartStop}>{timerRunning ? 'Stop' : 'Start'}</button>
      <div className="time-remaining">Time Remaining: {hours > 0 ? `${hours}h` : ''} {minutes}m {seconds}s</div>
    </div>
  );
};

export default CountdownTimer;
