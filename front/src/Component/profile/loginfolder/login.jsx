import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('user')) || [];

        if(users.includes(username)){
            alert('Login Successful');
            setLoginStatus('Login Successful');
            localStorage.setItem('loggedInUser', username);
            navigate('/');
            window.location.reload();
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
        {loginStatus && <p>{loginStatus}</p>}
    </div>
  )
}
