import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Routes/Chat';
import Login from './Routes/Login';
import Register from './Routes/Register';
import SetAvatar from './Routes/SetAvatar';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
