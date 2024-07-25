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
