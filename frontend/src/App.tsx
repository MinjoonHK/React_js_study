import React, { useState } from 'react';
import DashBoard from './Dashboard';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={}></Route>
      </Routes> */}
      {/* <Login/> */}
      <BrowserRouter>
      <DashBoard/>
          </BrowserRouter>
    </div>
  );
}

export default App;
