// Extensions
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Components & Assets
import './styles/loginRegister.css';
import logo from '../Assets/logo.png';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    fullname: '',
    password: '',
    confirmPassword: '',
  });
  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, [navigate]);
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!', toastConfig);
      return false;
    } else if (username.length < 3) {
      toast.error('Username should be longer than 3 characters!', toastConfig);
      return false;
    } else if (password.length < 8) {
      toast.error(
        'Password should be at least 8 characters long!',
        toastConfig
      );
      return false;
    } else if (email === '') {
      toast.error('Email is required! ', toastConfig);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password, fullName } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        fullName,
        email,
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
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='text'
            placeholder='Full Name'
            name='fullName'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={(e) => handleChange(e)}
          />

          <button type='submit'>Create User</button>
          <span>
            Already have an account? <Link to='/login'>Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Register;
