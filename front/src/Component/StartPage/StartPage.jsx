import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function StartPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  function messageSender(e) {
    setInputMessage(e.target.value);
  }

  function sendMessage() {
    if (inputMessage.trim() !== "") {
      socket.send(inputMessage);
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