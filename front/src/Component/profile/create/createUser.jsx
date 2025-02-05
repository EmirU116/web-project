import React, { useState } from 'react'


export default function CreateUser() {

    const [username, setUsername] = useState("");

    // function for updating the username input
    const handleInput = (e) => {
        setUsername(e.target.value);
    };

    const UserCreation = () => {
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
