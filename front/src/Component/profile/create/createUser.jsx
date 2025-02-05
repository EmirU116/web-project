import React from 'react'

export default function createUser() {
  return (
    <div className="signupContainer">
        <div className='signupFrom'>
            <h1>Sign Up </h1>
            <div className='UsernameContainer'>
                <label>Username:</label>
                <input type='text' placeholder='Enter Username' />
            </div>
            <button>Create</button>
        </div>
    </div>
  );
};
