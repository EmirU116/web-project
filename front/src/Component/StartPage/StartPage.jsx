import React, { useState } from 'react'
import './StartPage.css'


export default function StartPage() {
  const [inputmessage, setinputmessage] = useState("");

  function  messageSender(e) {
    setinputmessage(e.target.value);
    console.log(inputmessage);

    
  }


  return (
        <div>
            <div className='textDiv'>
                <div className='chat'>tset</div>
                <input type='text' placeholder='Write message' onChange={messageSender} value={inputmessage}></input>
                <button onClick={messageSender}>SEND </button>
            </div>

    </div>
  )
}
