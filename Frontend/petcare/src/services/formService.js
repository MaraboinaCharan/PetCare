import axios from 'axios';

const API_BASE_URL = 'http://localhost:5600';

export const userLogin = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/user/user/login`, formData, { withCredentials: true });
    return response.data;
};

export const userSignup = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/user/user/signup`, formData, { withCredentials: true });
    return response.data;
};

export const petDoctorLogin = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/petDoctor/petDoctor/login`, formData, { withCredentials: true });
    return response.data;
};

export const petDoctorSignup = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/petDoctor/petDoctor/signup`, formData, { withCredentials: true });
    return response.data;
};



// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5600', // Adjust based on your backend URL
//     withCredentials: true,
// });

// export const userLogin = async (credentials) => {
//     const response = await api.post('/user/login', credentials);
//     return response.data;
// };

// export const userSignup = async (credentials) => {
//     const response = await api.post('/user/signup', credentials);
//     return response.data;
// };

// export const addPet = async (petData) => {
//     const response = await api.post('/user/addPet', petData);
//     return response.data;
// };

// export const getPets = async () => {
//     const response = await api.get('/user/allPets');
//     return response.data;
// };

// export const getPetDetails = async (petId) => {
//     const response = await api.get(`/user/pet/${petId}`);
//     return response.data;
// };

// export const updatePet = async (petId, petData) => {
//     const response = await api.patch(`/user/updatePetInfo/${petId}`, petData);
//     return response.data;
// };

// export const deletePet = async (petId) => {
//     const response = await api.delete(`/user/pet/${petId}`);
//     return response.data;
// };

// Add more API functions for health, appointments, chat etc. as needed
