import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPetHealthInfo, updatePetHealthInfo } from '../../utils/petOwner-utils.js';

const UpdatePetHealth = () => {
    const { id } = useParams();
    const [healthData, setHealthData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHealthDetails = async () => {
            try {
                const response = await getPetHealthInfo(id);
                setHealthData(response.data);
            } catch (error) {
                console.error('Failed to fetch health details:', error);
            }
        };

        fetchHealthDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHealthData({ ...healthData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePetHealthInfo(id, healthData);
            navigate(`/pets/details/${id}`);
        } catch (error) {
            console.error('Failed to update health info:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Pet Health Info</h1>
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
            <button type="submit">Update Health Info</button>
        </form>
    );
};

export default UpdatePetHealth;
