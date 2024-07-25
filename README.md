**PetCare**
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PetCare is a  platform designed to manage pet profiles, health records, and appointments. It's basically for pet owners, veterinarians, and guests, providing an easy way for managing pet-related activities,petHealths,veterinarian appointments and for veterinarians to track their appoitnments and petHealths of a petOwner.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Table of Contents:**

Features 

Technologies Used

Prerequisites

Installation

Usage

API Documentation

Contributing

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Features :**

User Authentication (PetOwner, Veterinarian, Guest)

JWT Token Authentication

Pet Profile Management

Veterinarian Profile Management

Add Pets and their Health Info

Pet Health Records

Appointment Scheduling

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Technologies Used :**

Frontend: ReactJs, Sass,HTML

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT

Tools: Postman,Editor(VS Code)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Prerequisites :**

Node.js,MongoDB

ReactJs,Sass

npm 

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
**Installation :**

Clone the repository: git clone https://github.com/MaraboinaCharan/PetCare.git
cd PetCare

Install dependencies: npm i

Run the application: npm start

The server will start on http://localhost:{port}.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Usage :**

Register as a PetOwner or Veterinarian:

Navigate to the homepage and select your user type.

Fill out the registration form and submit.

Log in:

Use your credentials to log in.

Manage Pet Profiles:

Add, update, or delete pet profiles.

View detailed information about each pet.

Track Pet Health:

Record and view pet health records.

Schedule and manage appointments with veterinarians.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**API Documentation :**

The API endpoints for the PetCare platform are as follows:

**Auth Routes:**

POST /api/auth/user/login - Log in a user

POST /api/auth/user/signup - Register a new user

POST /api/auth/user/forgotPassword - Initiate the password reset process

PATCH /api/auth/user/resetPassword/:token - Reset the user's password

POST /api/auth/user/logout - Log out a user

GET /api/auth/petDoctor/login - Log in a pet doctor

POST /api/auth/petDoctor/signup - Register a new pet doctor

POST /api/auth/petDoctor/forgotPassword - Initiate the pet doctor's password reset process

PATCH /api/auth/petDoctor/resetPassword/:token - Reset the pet doctor's password

POST /api/auth/petDoctor/logout - Log out a pet doctor

**User Routes :**

PATCH /api/user/updatePassword - Update the user's password

PATCH /api/user/updateUserData - Update the user's data

DELETE /api/user/deleteUser - Delete the user's account


**Pet Profile Routes :**

POST /api/petProfiles - Create a new pet profile

GET /api/petProfiles - Get all pet profiles

GET /api/petProfiles/:id - Get a pet profile by ID

PATCH /api/petProfiles/:id - Update a pet profile

DELETE /api/petProfiles/:id - Delete a pet profile


**Pet Health Routes :**

POST /api/petHealth - Create a new pet health record

GET /api/petHealth - Get all pet health records

GET /api/petHealth/:id - Get a pet health record by ID

PATCH /api/petHealth/:id - Update a pet health record

DELETE /api/petHealth/:id - Delete a pet health record


**Appointment Routes:**

POST /api/appointments/user/bookAppointment - Book a new appointment

GET /api/appointments/user/getAppointments - Get all user appointments

PATCH /api/appointments/user/updateAppointment/:id - Update a user appointment

DELETE /api/appointments/user/deleteAppointment/:id - Delete a user appointment

GET /api/appointments/petDoctor/petDoctorAppointments - Get all pet doctor appointments


**Chat Routes :**

POST /api/chat/user/sendMessage - Send a message as a user

GET /api/chat/user/:chatId/history - Get chat history for a user

POST /api/chat/user/createChat - Create a new chat as a user

POST /api/chat/petDoctor/sendMessage - Send a message as a pet doctor

GET /api/chat/petDoctor/:chatId/history - Get chat history for a pet doctor

POST /api/chat/petDoctor/createChat - Create a new chat as a pet doctor



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Contributing :**

Contributions are welcome! Please follow the below steps for contributing:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature-name).

Open a pull request.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Thanks For Reading about my PetCare !! Happy Surfing !!


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
