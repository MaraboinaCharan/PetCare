import React from 'react';
import './Form.scss';

function Form({ userType, formMode, setFormMode, handleBackClick }) {
    const handleModeSwitch = () => {
        setFormMode(formMode === 'login' ? 'signup' : 'login');
    };

    const formFields = {
        login: ['email', 'password'],
        signup: {
            PetOwner: ['name', 'email', 'password', 'confirmPassword', 'contactNumber', 'address', 'gender'],
            Veterinarian: ['name', 'email', 'password', 'confirmPassword', 'contactNumber', 'clinicName', 'clinicAddress', 'specialization', 'gender', 'experience']
        }
    };

    return (
        <div className="form-container">
            <button className="back-button" onClick={handleBackClick}>Back</button>
            <form>
                <span className='name'>{userType}</span>
                {formMode === 'login' ? (
                    formFields.login.map((field, index) => (
                        <div key={index} className="form-field">
                            {/* <label htmlFor={field}>{field}</label> */}
                            <input type={field === 'password' ? 'password' : 'text'} id={field} name={field} required placeholder={field} />
                        </div>
                    ))
                ) : (
                    formFields.signup[userType].map((field, index) => (
                        <div key={index} className="form-field">
                            {/* <label htmlFor={field}>{field}</label> */}
                            <input type={field.includes('password') ? 'password' : 'text'} id={field} name={field} placeholder={field} required />
                        </div>
                    ))
                )}
                <div className='button-class'>
                <button type="submit">{formMode}</button>
            
            <button className="oppbutton" onClick={handleModeSwitch}>
             {formMode === 'login' ? 'Signup' : 'Login'}
            </button>
            </div>
            </form>
        </div>
    );
}

export default Form;
