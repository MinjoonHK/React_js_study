import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

axios.defaults.baseURL = "http://localhost:4000";
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const jwt = localStorage.getItem("jwt");
    if (jwt != null && jwt.length > 0) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
