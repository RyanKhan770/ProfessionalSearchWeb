import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: JSX.Element;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

<<<<<<< HEAD
    // redirect to login if no token
    if (!token || !currentUser) {
        return <Navigate to="/login" replace />;
    } 

    // allow access to protected route if token and user exist
=======
    // If user is NOT logged in (no token and no user), redirect to login
    if (!token || !currentUser) {
        return <Navigate to="/login" replace />;
    } 
    
    // If user is logged in, allow access to protected route
>>>>>>> e383b20c27efaae52f850442894360ca316df6b6
    return children;
};

export default AuthGuard;