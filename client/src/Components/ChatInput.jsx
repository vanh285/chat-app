import React, { useState } from 'react';
import './styles/chatInput.css';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };
  return (
    <>
      <div className='chatInputContainer'>
        <div className='buttonContainer'>
          <div className='emoji'>
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            sendChat(e);
          }}
          className='inputContainer'
        >
          <input
            type='text'
            placeholder='Aa'
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button className='sendButton'>
            <IoMdSend />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatInput;
