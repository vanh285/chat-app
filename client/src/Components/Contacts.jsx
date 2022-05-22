import React, { useEffect, useState } from 'react';
import logo from '../Assets/logo.png';
import './styles/contacts.css';
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentFullName, setCurrentFullName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentFullName(currentUser.fullName);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentFullName && (
        <div className='container'>
          <div className='brand'>
            <img src={logo} alt='Logo' />
            <h3>E2Talk</h3>
          </div>
          <div className='contacts'>
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className='avatar'>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt='avatar'
                    />
                  </div>
                  <div className='username'>
                    <h3>{contact.fullName}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='currentUser'>
            <div className='avatar'>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt='avatar'
              />
            </div>
            <div className='username'>
              <h2>{currentFullName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
