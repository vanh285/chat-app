import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import loader from '../Assets/loader.gif';
import './styles/setAvatar.css';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

const SetAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  const toastConfig = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  useEffect(() => {
    async function toLogin() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      }
    }
    toLogin();
  });
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select you avatar!', toastConfig);
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        isAvatarImageSet: true,
        image: avatars[selectedAvatar],
      });
      console.log(data);
      if (data) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.clear('chat-app-user');
        navigate('/');
        localStorage.setItem(
          'registered',
          JSON.stringify({ registered: true })
        );
      }
    }
  };
  useEffect(() => {
    prepareAvatars();
  }, []);
  async function prepareAvatars() {
    const data = [];
    for (let i = 0; i < 5; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}?apikey=LouRbnYhj1ysNq`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString('base64'));
    }
    setAvatars(data);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <div className='avatarContainer'>
          <img src={loader} alt='Loader' />
        </div>
      ) : (
        <div className='avatarContainer'>
          <div className='titleContainer'></div>
          <h1>Select your avatar</h1>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? 'avatar-selected' : ''
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt='avatar'
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className='submitButton' onClick={() => setProfilePicture()}>
            Set as Profile picture
          </button>
          <button
            className='submitButton'
            onClick={() => {
              navigate('/');
            }}
          >
            Generate other Avatars
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default SetAvatar;
