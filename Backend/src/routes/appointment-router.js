import express from 'express';
import authController from '../controllers/auth-controller.js';
import appoitnmentController from '../controllers/appointment-controller.js';


const appointmentRouter=express.Router();

appointmentRouter.post('/user/bookAppointment',authController.protectUserRoute,appoitnmentController.bookAppointment)
appointmentRouter.get('/user/getAppointments',authController.protectUserRoute,appoitnmentController.userAppointments)
appointmentRouter.patch('/user/updateAppointment/:id',authController.protectUserRoute,appoitnmentController.updateAppointment);
appointmentRouter.delete('/user/deleteAppointment/:id',authController.protectUserRoute,appoitnmentController.deleteAppointment);
appointmentRouter.get('/petDoctor/petDoctorAppointments',authController.protectPetDoctorRoute,appoitnmentController.petDoctorAppointments);


export default appointmentRouter;