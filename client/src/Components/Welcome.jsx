import React from 'react';
import welcome from '../Assets/welcome.gif';
import './styles/welcome.css';
const Welcome = ({ currentUser }) => {
  return (
    <>
      <div className='welcomeContainer'>
        <img src={welcome} alt='welcome' />
        <h1>
          Welcome, <span>{currentUser.fullName}</span>
        </h1>
        <h3>Please select a chat </h3>
      </div>
    </>
  );
};

export default Welcome;
