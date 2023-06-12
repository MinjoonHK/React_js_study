import React, { useState } from 'react';
import { BrowserRouter as Router, Route, redirect } from 'react-router-dom'; //router 
import DashBoard from './Dashboard';
import Login from './Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <div className="App">
      {/* <Login/> */}
      <DashBoard/>
    </div>
  );
}

export default App;
