import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/authContext.js'; // Import useAuth
import { userLogin, userSignup, petDoctorLogin, petDoctorSignup } from '../../../services/formService.js';
import './Form.scss';

function Form({ userType, formMode, setFormMode, handleBackClick }) {
    const [formData, setFormData] = useState({
        clinicAddress: {
            street: '',
            city: '',
            state: '',
            pincode: ''
        }
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from auth context

    const formFields = {
        login: ['email', 'password'],
        signup: {
            PetOwner: ['name', 'email', 'password', 'confirmPassword', 'contactNumber', 'address', 'gender'],
            Veterinarian: ['name', 'email', 'password', 'confirmPassword', 'contactNumber', 'clinicName', 'clinicAddress.street', 'clinicAddress.city', 'clinicAddress.state', 'clinicAddress.pincode', 'specialization', 'gender', 'experience']
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('clinicAddress.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                clinicAddress: {
                    ...formData.clinicAddress,
                    [addressField]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (formMode === 'login') {
                response = userType === 'PetOwner' ? await userLogin(formData) : await petDoctorLogin(formData);
            } else {
                response = userType === 'PetOwner' ? await userSignup(formData) : await petDoctorSignup(formData);
            }
            setMessage(`Success! ${formMode === 'login' ? 'Logged in' : 'Signed up'} successfully.`);
            
            // Set auth context
            login(userType);

            // Navigate to the appropriate page based on user type
            if (formMode === 'login') {
                navigate(userType === 'PetOwner' ? '/user' : '/veterinarian');
            }
        } catch (error) {
            setMessage(`Error: ${error.response?.data.message || error.message}`);
        }
    };

    const handleModeSwitch = () => {
        setFormMode(formMode === 'login' ? 'signup' : 'login');
        setMessage(''); // Clear message when switching modes
    };

    return (
        <div className="form-container">
            <button className="back-button" onClick={handleBackClick}>Back</button>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <span className='name'>{userType}</span>
                {formMode === 'login' ? (
                    formFields.login.map((field, index) => (
                        <div key={index} className="form-field">
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                id={field}
                                name={field}
                                required
                                placeholder={field}
                                onChange={handleChange}
                            />
                        </div>
                    ))
                ) : (
                    formFields.signup[userType].map((field, index) => (
                        <div key={index} className="form-field">
                            <input
                                type={field.includes('password') ? 'password' : 'text'}
                                id={field}
                                name={field}
                                placeholder={field}
                                required
                                onChange={handleChange}
                            />
                        </div>
                    ))
                )}
                <div className='button-class'>
                    <button type="submit">{formMode}</button>
                    <button type="button" className="oppbutton" onClick={handleModeSwitch}>
                        {formMode === 'login' ? 'Signup' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
