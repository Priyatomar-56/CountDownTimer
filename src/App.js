import React from 'react';
import './App.css'; // Import CSS file
import CountdownTimer from './CountdownTimer';
import UserInfo from './UserInfo';

function App() {
  return (
    <div className="container">
      <div className="content Container1 shado">
        <h1>Priya Countdown Timer</h1>
        <CountdownTimer />
        <hr />
      </div>
      <div className='Container1 shado'>
        <h1>User Information</h1>
        <UserInfo /></div>
       
    
    </div>
  );
}

export default App;
