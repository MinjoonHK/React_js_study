import { useEffect, useState } from "react";
import DashBoard from './components/Dashboard';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from '../src/css/Login.module.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Protected from './PrivateRoute'
import CompanyInformation from "./components/CompanyInformation";
import EnergyPerformance from "./components/EnergyPerformance";
import Pagemap from "./components/Pagemap";
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup";


interface User {
  accessToken: string;
  refreshToken: string;
  email: string;
  isAdmin: boolean;
}

interface Jwt_decoded {
  id: number;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

interface Res {
  data: {
    accessToken: string;
    refreshToken: string;
    email: string;
    isAdmin: boolean;
  }
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      <Route
          path="*"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
