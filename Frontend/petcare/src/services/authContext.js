import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    console.log(userType);
    const login = (userType) => {
        setIsAuthenticated(true);
        setUserType(userType);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserType(null);
    };

    return (
    
        <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
