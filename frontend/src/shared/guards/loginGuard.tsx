import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface LoginGuardProps {
  children: JSX.Element;
}

const LoginGuard = ({ children }: LoginGuardProps) => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

<<<<<<< HEAD
    // If user is already logged in then redirect to home
   if (token && currentUser) {  
    return <Navigate to="/home" replace />;
  }
    
    // If user is not logged in allow access to login/register pages
=======
    // If user is already logged in, redirect to home
   if (token && currentUser) {  
    return <Navigate to="/home" replace />;
}
    
    // If user is not logged in, allow access to login/register pages
>>>>>>> e383b20c27efaae52f850442894360ca316df6b6
    return children;
};

export default LoginGuard;