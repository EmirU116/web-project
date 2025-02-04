// Import necessary modules from React and socket.io-client
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './StartPage.css'; // Import CSS for styling

// Initialize socket connection to the server
const socket = io('http://localhost:4000');

// Define the StartPage component
export default function StartPage() {
  // State to hold the input message
  const [inputMessage, setInputMessage] = useState("");
  // State to hold the list of messages
  const [messages, setMessages] = useState([]);
  // State to hold the username
  const [username, setUsername] = useState("");

  // useEffect hook to run once when the component mounts
  useEffect(() => {
    // Assign a unique username to each client
    const clientNumber = Math.floor(Math.random() * 1000);
    setUsername(`Client ${clientNumber}`);

    // Listen for 'message' events from the server
    socket.on('message', (data) => {
      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  // Function to handle input message changes
  function messageSender(e) {
    setInputMessage(e.target.value);
  }

  // Function to send a message
  function sendMessage() {
      if (inputMessage.trim() !== "") {
        // Create a message object with the username and message
        const messageData = {
          username: username,
          message: inputMessage
        };
        // Emit the message to the server
        socket.emit('send_message', messageData);
        // Clear the input message
        setInputMessage("");
      }
  }

  function handleKeyPress(e) {
    if(e.key === 'Enter')
    {
      sendMessage();
    }    
  }

  // Render the component
  return (
    <div className='grid-container'>
      <div className='item1'>1
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </div>
      <div className='item2'>
          <div className='chat'>
            {messages.map((msg, index) => (
              <div key={index} className={msg.username === username ? 'message local' : 'message'}>
                <strong>{msg.username}: </strong>{msg.message}
              </div>
            ))}
          </div>
          <input
            type='text'
            placeholder='Write message'
            onKeyPress={handleKeyPress}
            onChange={messageSender}
            value={inputMessage}
          />
      </div>
      <div className='item3'>3</div>
      <div className='item4'>4</div>
      
    </div>
  );
}