import React, { useState } from 'react';
import './StartPage.css';

export default function StartPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function messageSender(e) {
    setInputMessage(e.target.value);
  }

  function sendMessage() {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, inputMessage]);
      setInputMessage("");
    }
  }

  return (
    <div>
      <div className='textDiv'>
        <div className='chat'>
          {messages.map((msg, index) => (
            <div key={index} className='message'>{msg}</div>
          ))}
        </div>
        <input
          type='text'
          placeholder='Write message'
          onChange={messageSender}
          value={inputMessage}
        />
        <button onClick={sendMessage}>SEND</button>
      </div>
    </div>
  );
}
