import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from 'react';


import StartPage from './Component/StartPage/StartPage';
import CreateUser from './Component/profile/create/createUser';
import Login from './Component/profile/loginfolder/login';

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(loggedInUser){
      SetIsLoggedIn(true);
    }
    else{
      SetIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    SetIsLoggedIn(false);
    //navigate('/login');
    window.location.reload();
  }

  return (
    <Router>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/">StartPage</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : ( 
          <>
            <Link to="/signup">SignUp</Link> | <Link to="/login">Login</Link> | <Link to="/">StartPage</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<StartPage />} />
      </Routes>

    </Router>
  );
}

export default App;
