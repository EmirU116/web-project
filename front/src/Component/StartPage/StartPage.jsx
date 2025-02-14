import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './StartPage.css';
import Avatar from 'react-avatar';

// Initialize socket connection to the server
const socket = io('http://localhost:4000');

export default function StartPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [userActivity, setUserActivity] = useState("online");
  const [chatRooms, setChatRooms] = useState([]);
  const [serverName, setServerName] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUsername(loggedInUser);
    } else {
      const clientNumber = Math.floor(Math.random() * 1000);
      setUsername(`Client ${clientNumber}`);
    }

    // Listen for incoming messages
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const createChatServer = async () => {
    try {
      const response = await fetch('http://localhost:4000/create_server', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: serverName, owner: username })
      });
      window.location.reload();
      if (response.ok) {
        const newServer = await response.json();
        chatservername(serverName);
        setChatRooms((prev) => [...prev, newServer]); // Add new server to list
       
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function chatservername(e){
    setServerName(e.target.value);
  }
  
  // Function to fetch chat servers (update this too)
  const fetchChatRooms = async () => {
    try {
      const response = await fetch('http://localhost:4000/create_server');
      const data = await response.json();
      if (response.ok) {
        setChatRooms(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Call fetchChatRooms() inside useEffect when component mounts
  useEffect(() => {
    fetchChatRooms();
  }, []);
  
  // Handle sending messages
  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const messageData = {
        username,
        message: inputMessage,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', messageData);
      setInputMessage("");
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='grid-container'>
      {/* Sidebar - User List */}
      <div className='item1'>
        <h3>Users</h3>
        <input placeholder="Server Name" onChange={chatservername} value={serverName}/>
        <button onClick={createChatServer}>Create Chat</button>
      </div>

      {/* Chat Messages Section */}
      <div className='item2'>
        <div className='chat'>
          {messages.map((msg, index) => (
            <div key={index} className={msg.username === username ? 'message local' : 'message'}>
              <strong>{msg.username}: </strong>{msg.message} 
              <p>{msg.time}</p>
            </div>
          ))}
        </div>
        <input
          type='text'
          placeholder='Write message'
          onKeyPress={handleKeyPress}
          onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage}
        />
      </div>

      {/* User Profile Section */}
      <div className='item3'>
        <Avatar name={username} size='70' round={true} />
        <li className={`userStatus ${userActivity}`}>{userActivity}</li>
      </div>

      {/* List of Chat Rooms */}
      <div className='item4'>
        <h3>Chat Rooms</h3>
        <ul>
          {chatRooms.length === 0 ? (
            <li>No servers</li>
          ) : (
            chatRooms.map((server) => (
              <li className="lobbynames" key={server.id}>
                <p>{server.name}</p> 
                <a>Owner: {server.owner}</a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
