import express from 'express';
import { requireAuth } from '@clerk/express';

import {
    getAppointments,
    getAppointmentByPatient,
    createAppointment,
    confirmPayment,
    updateAppointment,
    cancelAppointment,
    getStats,
    getAppointmentsByDoctor,
    getRegisteredUserCount
} from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

appointmentRouter.get("/", getAppointments);

appointmentRouter.get("/confirm", confirmPayment);

appointmentRouter.get("/stats/summary", getStats);

//authentic routes
appointmentRouter.post('/', requireAuth(), createAppointment);

appointmentRouter.get('/me', requireAuth(),getAppointmentByPatient);

appointmentRouter.get('/doctor/:doctorId', getAppointmentsByDoctor);

appointmentRouter.post("/:id/cancel", cancelAppointment);
appointmentRouter.get("/patients/count", getRegisteredUserCount);
appointmentRouter.put("/:id", updateAppointment);

export default appointmentRouter;