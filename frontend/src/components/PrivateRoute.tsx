import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

interface accessToken{
  isAdmin:boolean;
  exp:number;
  iat:number;
  id:number;
}


function Protected({ children }) {
  const jwt = localStorage.getItem("jwt");
  if(jwt){
    const accessToken:accessToken = jwt_decode(jwt);
    if (!accessToken) {
      return <Navigate to="/login" replace />
    }
    return children
  }else{
    return <Navigate to="/login" replace />
  }
}
export default Protected