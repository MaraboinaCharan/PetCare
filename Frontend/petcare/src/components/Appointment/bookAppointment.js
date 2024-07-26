import React, { useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
    const [appointmentData, setAppointmentData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData({ ...appointmentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/appointments', appointmentData, { withCredentials: true })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Book Appointment</h1>
            <input type="text" name="petDoctor" placeholder="Pet Doctor ID" onChange={handleChange} />
            <input type="text" name="pet" placeholder="Pet ID" onChange={handleChange} />
            <input type="date" name="appointmentDate" placeholder="Appointment Date" onChange={handleChange} />
            <textarea name="appointmentInformation" placeholder="Appointment Information" onChange={handleChange}></textarea>
            <button type="submit">Book Appointment</button>
        </form>
    );
};

export default BookAppointment;
