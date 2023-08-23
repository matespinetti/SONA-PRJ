import { Navigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext.tsx";
import React from "react";

const ProtectedRoute = ({ children } : {children: React.ReactNode}) => {
    const { isLoggedIn } = useAuthServiceContext(); // Make sure this hook returns the expected value

    if (!isLoggedIn) {
        return <Navigate to="/login" replace={true} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
