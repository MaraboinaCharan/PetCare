import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPet } from '../../utils/petOwner-utils.js';

const AddPet = () => {
    const [petName, setPetName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const navigate = useNavigate();

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            await addPet({ petName, age, breed, medicalHistory });
            navigate('/user/pets/list');
        } catch (error) {
            console.error('Failed to add pet:', error);
        }
    };

    return (
        <form onSubmit={handleAddPet}>
            <input
                type="text"
                placeholder="Pet Name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <input
                type="text"
                placeholder="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
            />
            <input
                type="text"
                placeholder="Medical History"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
            />
            <button type="submit">Add Pet</button>
        </form>
    );
};

export default AddPet;
