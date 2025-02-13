// Import necessary modules from React and socket.io-client
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './StartPage.css'; // Import CSS for styling
import Avatar from 'react-avatar';

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

  // User Status 
  const [userActivity, setuserActivity] = useState("online");

  // display chat rooms
  const [chatRooms, setChatRooms] = useState([]);


  const createChats = async () => {
    try{
      const response = await fetch('http://localhost:4000/create_server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Chat Room',
          owner: username
        })
      });
      const data = await response.json();
      if(response.ok){
        setChatRooms(data);
      } else {
        console.log('Error: ', response.statusText);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    const displayChatRooms = async () => {
      try{
        const response = await fetch('http://localhost:4000/create_server');
        const data = await response.json();
        if(response.ok){
          setChatRooms(data);
        } else {
          console.log('Error: ', response.statusText);
        }
      } catch (error) {
        console.log('Error: ', error);
      }

    };
    displayChatRooms();
  }, []);
  // useEffect hook to run once when the component mounts
  useEffect(() => {
    
    const LoggedInUser = localStorage.getItem('loggedInUser');
    if(LoggedInUser){
      const displayLoggedInUser = LoggedInUser;
      setUsername(displayLoggedInUser);
    }
    else{
      // Assign a unique username to each client
      const clientNumber = Math.floor(Math.random() * 1000);
      setUsername(`Client ${clientNumber}`);
    }

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

  useEffect(() => {
    const handleUserStatus = () => {
      setuserActivity('online');
      clearTimeout(inactiveTimer);
      inactiveTimer = setTimeout(() => 
        setuserActivity('away'), 10000);
    };

    let inactiveTimer = setTimeout(() => setuserActivity('away'), 10000);

    window.addEventListener('mousemove', handleUserStatus);
    window.addEventListener('keydown', handleUserStatus);

    return () => {
      window.removeEventListener('mousemove', handleUserStatus);
      window.removeEventListener('keydown', handleUserStatus);
      clearTimeout(inactiveTimer);
    };
  }, []);

  // Function to handle input message changes
  function messageSender(e) {
    setInputMessage(e.target.value);
  }



  // Function to send a message
  function sendMessage() {

      if (inputMessage.trim() !== "") {
        // Create a message object with the username and message - basically where you send the message
        // the data that you want to include, adds in messageData as an object
        const messageData = {
          username: username,
          message: inputMessage,
          time: new Date().toLocaleTimeString()
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
        <li><button>User</button></li>
        <li><button>User</button></li>
        <li><button>User</button></li>
        <li><button>User</button></li>
        <li><button>User</button></li>
        <li><button>User</button></li>

        <button onClick={createChats}>Create Chat</button>
      </div>
      <div className='item2'>
          <div className='chat'>
            {messages.map((msg, index) => (
              <div key={index} className={msg.username === username ? 'message local' : 'message'}>
                <strong>{msg.username}: </strong>{msg.message} 
                <p>{msg.time}</p> {/* displays current time by accesing msg.<data> */}
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
      <div className='item3'>
        <Avatar name={username} size='70' round={true} />
        <li className={`userStatus ${userActivity}`}>{userActivity}</li>
      </div>
      <div className='item4'>
          <p>Chat Rooms</p>
          <ul>
            {chatRooms.length === 0 ? (
             <li>No servers</li> 
            ) : (
              chatRooms.map((server) => (
                <li key={server.id}>
                  {server.name} : (Owner: {server.owner})
                </li>
              ))
            )}
          </ul>
      </div>
      
    </div>
  );
}