import Login from "./view/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./components/PrivateRoute";
import Dashboard from "./view/dashboard/Dashboard";
import Signup from "./view/Signup";
import ForgotPassword from "./view/forgotpassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
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
  );
}

export default App;
