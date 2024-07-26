import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sideBar.scss'; 

const Sidebar = () => {
    const [isPetsMenuOpen, setIsPetsMenuOpen] = useState(false);
    const [isAppointmentsMenuOpen, setIsAppointmentsMenuOpen] = useState(false);

    const togglePetsMenu = () => {
        setIsPetsMenuOpen(!isPetsMenuOpen);
    };

    const toggleAppointmentsMenu = () => {
        setIsAppointmentsMenuOpen(!isAppointmentsMenuOpen);
    };

    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <button className="menu-button" onClick={togglePetsMenu}>
                            Pets {isPetsMenuOpen ? '-' : '+'}
                        </button>
                        {isPetsMenuOpen && (
                            <ul className="submenu">
                                <li><NavLink to="/user/pets/list">Pet List</NavLink></li>
                                <li><NavLink to="/user/pets/add">Add Pet</NavLink></li>
                                <li><NavLink to="/user/pets/health/add">Add Pet Health Record</NavLink></li>
                                <li><NavLink to="/user/pets/health/update">Update Pet Health Record</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button className="menu-button" onClick={toggleAppointmentsMenu}>
                            Appointments {isAppointmentsMenuOpen ? '-' : '+'}
                        </button>
                        {isAppointmentsMenuOpen && (
                            <ul className="submenu">
                                <li><NavLink to="/user/appointments/list">Appointment List</NavLink></li>
                                <li><NavLink to="/user/appointments/book">Book Appointment</NavLink></li>
                                <li><NavLink to="/user/appointments/update">Update Appointment</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li><NavLink to="/user/chat">Chat with Vet</NavLink></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
