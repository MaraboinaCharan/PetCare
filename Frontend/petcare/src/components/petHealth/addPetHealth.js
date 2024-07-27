import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPetHealthInfo } from '../../utils/petOwner-utils.js';

const AddPetHealth = () => {
    const { id } = useParams();
    const [healthData, setHealthData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHealthData({ ...healthData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPetHealthInfo(id, healthData);
            navigate(`/pets/details/${id}`);
        } catch (error) {
            console.error('Failed to add health info:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Pet Health Info</h1>
            <input 
                type="text" 
                name="condition" 
                placeholder="Condition" 
                value={healthData.condition || ''} 
                onChange={handleChange} 
            />
            <input 
                type="date" 
                name="date" 
                placeholder="Date" 
                value={healthData.date || ''} 
                onChange={handleChange} 
            />
            {/* Add more fields as needed */}
            <button type="submit">Add Health Info</button>
        </form>
    );
};

export default AddPetHealth;
