import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState("");

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('user')) || [];

        if(users.includes(username)){
            alert('Login Successful');
        }
        else{
            alert('User does not exist, please sign up');
        }
    }

    return (
    <div>
        <h1>Login</h1>
        <div className='loginContainer'>
            <label>Username:</label>
            <input type='text' value={username} onChange={handleChange} placeholder='Enter Username' />
        </div>
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}
