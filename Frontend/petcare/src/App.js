import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/authContext.js';
import PetOwner from './pages/PetOwnerPage/petOwner.js';
import veterenarian from './pages/VeterenarianPage/veterenarian.js';
import HomePage from './pages/HomePage/HomePage.js';
import ProtectedRoute from './services/protectRoute.js';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<HomePage/>} />
                    <Route path="/user" element={<ProtectedRoute element={PetOwner} userType="PetOwner" />}  />
                    <Route path="/veterinarian" element={<ProtectedRoute element={veterenarian} userType="Veterinarian" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
