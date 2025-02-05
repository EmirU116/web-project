import React, { useState } from 'react'


export default function CreateUser() {

    const [username, setUsername] = useState("");

    // function for updating the username input
    const handleInput = (e) => {
        setUsername(e.target.value);
    };

    // Function for saving the username
    const UserCreation = () => {
        if(!username.trim()){
            alert('Username cannot be empty');
            return;
        }

        // Get stored user or empty array
        const user = JSON.parse(localStorage.getItem('user')) || [];
        
        if(user.includes(username)){
            alert('Username already exists');
            return;
        }

        user.push(username);
        localStorage.setItem('user', JSON.stringify(user));

        alert('User Created');
        setUsername('');
    };


    return (
        <div className="signupContainer">
            <div className='signupFrom'>
                <h1>Sign Up </h1>
                <div className='UsernameContainer'>
                    <label>Username:</label>
                    <input type='text' placeholder='Enter Username' value={username} onChange={handleInput} />
                </div>
                <button onClick={UserCreation}>Create</button>
            </div>
        </div>
    );
};
