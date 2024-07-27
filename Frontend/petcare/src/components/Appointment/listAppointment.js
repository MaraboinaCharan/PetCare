import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/authContext.js';

const AppointmentList = () => {
    const { isAuthenticated } = useAuth();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            axios.get('/appointments', { withCredentials: true })
                .then(response => setAppointments(response.data.data))
                .catch(error => console.error(error));
        }
    }, [isAuthenticated]);

    return (
        <div>
            <h1>Appointment List</h1>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment._id}>{appointment.appointmentInformation}</li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
