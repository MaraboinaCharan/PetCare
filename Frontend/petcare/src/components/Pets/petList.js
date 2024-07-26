import React, { useEffect, useState } from 'react';
import { getPets } from '../../utils/petOwner-utils.js';

const PetList = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getPets();
                setPets(response.data);
            } catch (error) {
                console.error('Failed to fetch pets:', error);
            }
        };

        fetchPets();
    }, []);

    return (
        <div>
            <h1>Pet List</h1>
            <ul>
                {pets.map(pet => (
                    <li key={pet._id}>{pet.petName}</li>
                ))}
            </ul>
        </div>
    );
};

export default PetList;
