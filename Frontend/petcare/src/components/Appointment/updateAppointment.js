import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateAppointment = () => {
    const { id } = useParams();
    const [appointmentData, setAppointmentData] = useState({});

    useEffect(() => {
        axios.get(`/appointments/${id}`, { withCredentials: true })
            .then(response => setAppointmentData(response.data.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData({ ...appointmentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/appointments/${id}`, appointmentData, { withCredentials: true })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Appointment</h1>
            <input type="text" name="petDoctor" value={appointmentData.petDoctor || ''} onChange={handleChange} placeholder="Pet Doctor ID" />
            <input type="text" name="pet" value={appointmentData.pet || ''} onChange={handleChange} placeholder="Pet ID" />
            <input type="date" name="appointmentDate" value={appointmentData.appointmentDate || ''} onChange={handleChange} />
            <textarea name="appointmentInformation" value={appointmentData.appointmentInformation || ''} onChange={handleChange} placeholder="Appointment Information"></textarea>
            <button type="submit">Update Appointment</button>
        </form>
    );
};

export default UpdateAppointment;
