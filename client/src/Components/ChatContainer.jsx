import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Logout from './Logout';
import './styles/chatContainer.css';
import axios from 'axios';
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';
import msgNotification from '../Assets/msgNotification.mp3';
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const audioPlayer = useRef(null);
  const playAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.play();
    }
  };
  useEffect(() => {
    async function fetchChat() {
      if (currentChat && currentUser) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    }
    fetchChat();
  }, [currentChat, currentUser]);
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg.message });
      });
    }
  }, [socket]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    playAudio();
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);
  return (
    <>
      {currentChat && (
        <div className='chatBoxContainer'>
          <audio ref={audioPlayer} src={msgNotification} />
          <div className='chat-header'>
            <div className='user-details'>
              <div className='avatar'>
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt=''
                />
              </div>
              <div className='username'>
                <h3>{currentChat.fullName}</h3>
              </div>
            </div>
            <Logout />
          </div>

          <div className='chat-messages'>
            {messages.map((msg) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      msg.fromSelf ? 'sended' : 'received'
                    }`}
                  >
                    <div className='content'>
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <Messages /> */}
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
