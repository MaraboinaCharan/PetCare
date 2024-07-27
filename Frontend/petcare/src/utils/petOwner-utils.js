import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5600', // Adjust based on your backend URL
    withCredentials: true,
});

export const userLogin = async (credentials) => {
    const response = await api.post('/user/user/login', credentials);
    return response.data;
};

export const userSignup = async (credentials) => {
    const response = await api.post('/user/user/signup', credentials);
    return response.data;
};

export const addPet = async (petData) => {
    const response = await api.post('/user/addPet', petData);
    return response.data;
};

export const getPets = async () => {
    const response = await api.get('/user/allPets');
    return response.data;
};

export const getPetDetails = async (petId) => {
    const response = await api.get(`/user/pet/${petId}`);
    return response.data;
};

export const updatePet = async (petId, petData) => {
    const response = await api.patch(`/user/updatePetInfo/${petId}`, petData);
    return response.data;
};

export const deletePet = async (petId) => {
    const response = await api.delete(`/user/pet/${petId}`);
    return response.data;
};

// Pet Health-related API calls
export const addPetHealthInfo = async (petId, healthData) => {
    const response = await api.post(`/user/addPetHealthInfo/${petId}`, healthData);
    return response.data;
};

export const getPetHealthInfo = async (petId) => {
    const response = await api.get(`/user/getPetHealthInfo/${petId}`);
    return response.data;
};

export const updatePetHealthInfo = async (petId, healthData) => {
    const response = await api.patch(`/user/updatePetHealthInfo/${petId}`, healthData);
    return response.data;
};

export const deletePetHealthInfo = async (petId) => {
    const response = await api.delete(`/user/deletePetHealthInfo/${petId}`);
    return response.data;
};
