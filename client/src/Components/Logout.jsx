import React from 'react';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './styles/logout.css';
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
      <button id='logoutBtn' onClick={handleLogout}>
        <BiPowerOff />
      </button>
    </>
  );
};

export default Logout;
