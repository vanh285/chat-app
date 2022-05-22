// Extensions
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Components & Assets
import './styles/loginRegister.css';
import logo from '../Assets/logo.png';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const handleValidation = () => {
    const { username, password } = values;
    if (password === '' || username === '') {
      toast.error('Passwords do not match!', toastConfig);
      return false;
    }
    return true;
  };
  const toastConfig = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }

    if (localStorage.getItem('registered')) {
      toast.success('Successfully registered! You can now login!', {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      localStorage.clear();
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastConfig);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className='formContainer'>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className='brand'>
            <img src={logo} alt='Logo' />
            <h1>E2Talk</h1>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
            min='3'
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />

          <button type='submit'>Login</button>
          <span>
            Don't have an account? <Link to='/register'>Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Login;
