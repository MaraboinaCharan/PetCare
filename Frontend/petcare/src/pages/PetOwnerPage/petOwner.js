import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PetList from '../../components/Pets/petList.js';
import PetDetails from '../../components/Pets/petDetails.js';
import AddPet from '../../components/Pets/addPet.js';
import UpdatePet from '../../components/Pets/updatePetDetails.js';
import AddPetHealth from '../../components/petHealth/addPetHealth.js';
import UpdatePetHealth from '../../components/petHealth/updatePetHealth.js';
import BookAppointment from '../../components/Appointment/bookAppointment.js';
import AppointmentList from '../../components/Appointment/listAppointment.js';
import UpdateAppointment from '../../components/Appointment/updateAppointment.js';
import Chat from '../../components/Chat/chat.js';
import Sidebar from '../../components/common/SideBar/sideBar.js';
import './petOwner.scss'; 

const PetOwner = () => {
    return (
        <div className="petOwnerPage">
            <header className="header">
                <div className="logo">PetCare</div>
                <div className="profile">
                    <span>Welcome, Pet Owner</span>
                    <button className="logoutBtn">Logout</button>
                </div>
            </header>
            <div className="mainContent">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="pets/list" element={<PetList />} />
                        <Route path="pets/add" element={<AddPet />} />
                        <Route path="pets/details/:id" element={<PetDetails />} />
                        <Route path="pets/update/:id" element={<UpdatePet />} />
                        <Route path="pets/health/add/:id" element={<AddPetHealth />} />
                        <Route path="pets/health/update/:id" element={<UpdatePetHealth />} />
                        <Route path="appointments/list" element={<AppointmentList />} />
                        <Route path="appointments/book" element={<BookAppointment />} />
                        <Route path="appointments/update/:id" element={<UpdateAppointment />} />
                        <Route path="chat" element={<Chat />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default PetOwner;
