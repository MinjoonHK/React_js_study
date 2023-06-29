import Login from "./view/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./components/PrivateRoute";
import Dashboard from "./view/dashboard/Dashboard";
import Signup from "./view/Signup";
import ForgotPassword from "./view/forgotpassword";

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
  };
}

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
