import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './StartPage.css';

const socket = io('http://localhost:4000');

export default function StartPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Assign a unique username to each client
    const clientNumber = Math.floor(Math.random() * 1000);
    setUsername(`Client ${clientNumber}`);

    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
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
      const messageData = {
        username: username,
        message: inputMessage
      };
      socket.emit('send_message', messageData);
      setInputMessage("");
    }
  }

  return (
    <div>
      <div className='textDiv'>
        <div className='chat'>
          {messages.map((msg, index) => (
            <div key={index} className='message'>
              <strong>{msg.username}: </strong>{msg.message}
            </div>
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