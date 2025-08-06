import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import PetCard from '../components/PetCard';
// import { getPets } from '../api/pets'; // Example API call

const demoPets = [
  { name: "Buddy", species: "Dog", breed: "Labrador", age: 5, photoUrl: "https://placedog.net/200" },
  { name: "Mittens", species: "Cat", breed: "Siamese", age: 3, photoUrl: "https://placekitten.com/200/200" },
];

function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Example: getPets().then(setPets);
    setPets(demoPets); // Demo data for now
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>My Pets</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Pet
      </Button>
      {pets.map((pet, idx) => (
        <PetCard key={idx} pet={pet} />
      ))}
    </Container>
  );
}

export default Pets;
