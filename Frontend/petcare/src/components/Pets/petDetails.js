import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetDetails } from '../../utils/petOwner-utils.js';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await getPetDetails(id);
                setPet(response.data);
            } catch (error) {
                console.error('Failed to fetch pet details:', error);
            }
        };

        fetchPetDetails();
    }, [id]);

    return (
        <div>
            {pet && (
                <>
                    <h1>{pet.petName}</h1>
                    <p>Age: {pet.age}</p>
                    <p>Breed: {pet.breed}</p>
                    {/* Add more details as needed */}
                </>
            )}
        </div>
    );
};

export default PetDetails;
