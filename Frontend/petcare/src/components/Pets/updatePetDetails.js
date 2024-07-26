import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPetDetails, updatePet } from '../../utils/petOwner-utils.js';

const UpdatePet = () => {
    const { id } = useParams();
    const [petData, setPetData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await getPetDetails(id);
                setPetData(response.data);
            } catch (error) {
                console.error('Failed to fetch pet details:', error);
            }
        };

        fetchPetDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData({ ...petData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePet(id, petData);
            navigate('/pets/list');
        } catch (error) {
            console.error('Failed to update pet:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Pet</h1>
            <input 
                type="text" 
                name="petName" 
                placeholder="Pet Name" 
                value={petData.petName || ''} 
                onChange={handleChange} 
            />
            <input 
                type="number" 
                name="age" 
                placeholder="Age" 
                value={petData.age || ''} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="breed" 
                placeholder="Breed" 
                value={petData.breed || ''} 
                onChange={handleChange} 
            />
            {/* Add more fields as needed */}
            <button type="submit">Update Pet</button>
        </form>
    );
};

export default UpdatePet;
