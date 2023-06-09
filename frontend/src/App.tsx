import React from 'react';
import { BrowserRouter as Router, Route, redirect } from 'react-router-dom'; //router 
import DashBoard from './Dashboard';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
