import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './authContext.js'; 

const ProtectedRoute = ({ element: Element, userType, ...rest }) => {
   
    const { isAuthenticated, userType: authUserType } = useAuth();
   
    const shouldRender = isAuthenticated && (!userType || userType === authUserType);
    console.log(shouldRender,authUserType)

    return shouldRender ? (
        <Element {...rest} />
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
