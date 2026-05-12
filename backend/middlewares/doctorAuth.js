import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';
const JWT_SECRET = process.env.JWT_SECRET;

export default async function doctorAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    //check if the authorization header is present and starts with "Bearer "
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        //verify the token
        const payload = jwt.verify(token, JWT_SECRET);
        if(payload.role !== 'doctor') {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        //find the doctor in the database
        const doctor = await Doctor.findById(payload.id).select('-password'); //exclude the password field
        if(!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        //attach the doctor object to the request for use in other routes
        req.doctor = doctor;
        next();
    } catch (error) {
        console.error('Error in doctorAuth middleware:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

