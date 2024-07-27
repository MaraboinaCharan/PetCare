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
                    <Route path="/user/*" element={<ProtectedRoute element={PetOwner} userType="PetOwner" />}  />
                    <Route path="/veterinarian/*" element={<ProtectedRoute element={veterenarian} userType="Veterinarian" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './authContext';
// import PetList from './PetList';
// import PetDetails from './PetDetails';
// import UpdatePet from './UpdatePet';
// import AddPetHealth from './AddPetHealth';
// import UpdatePetHealth from './UpdatePetHealth';
// import BookAppointment from './BookAppointment';
// import AppointmentList from './AppointmentList';
// import UpdateAppointment from './UpdateAppointment';
// import Chat from './Chat';
// import ProtectedRoute from '../src/services/protectRoute'

// const App = () => {
//     return (
//         <Router>
//             <AuthProvider>
//                 <Routes>
//                     <Route path="/pets" element={<ProtectedRoute><PetList /></ProtectedRoute>} />
//                     <Route path="/pets/:id" element={<ProtectedRoute><PetDetails /></ProtectedRoute>} />
//                     <Route path="/pets/update/:id" element={<PrivateRoute><UpdatePet /></PrivateRoute>} />
//                     <Route path="/pets/:id/health/add" element={<PrivateRoute><AddPetHealth /></PrivateRoute>} />
//                     <Route path="/pets/:id/health/update" element={<PrivateRoute><UpdatePetHealth /></PrivateRoute>} />
//                     <Route path="/appointments/book" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
//                     <Route path="/appointments" element={<PrivateRoute><AppointmentList /></PrivateRoute>} />
//                     <Route path="/appointments/update/:id" element={<PrivateRoute><UpdateAppointment /></PrivateRoute>} />
//                     <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
//                 </Routes>
//             </AuthProvider>
//         </Router>
//     );
// };

// export default App;
