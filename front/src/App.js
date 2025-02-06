import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


import StartPage from './Component/StartPage/StartPage';
import CreateUser from './Component/profile/create/createUser';
import Login from './Component/profile/loginfolder/login';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/signup">SignUp</Link> | <Link to="/login">Login</Link> | <Link to="/">StartPage</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<StartPage />} />
      </Routes>
      <div>
      </div>

    </Router>
  );
}

export default App;
