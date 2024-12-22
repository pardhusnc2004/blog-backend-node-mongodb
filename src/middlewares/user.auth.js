import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const userAuth = (req, res, next) => {
    try {
        const token = req.cookies['jwt_secret'];
        if(!token) {
            // console.log("User not verified. Invalid/ Expired token");
            return res.status(403).json({message: "User not verified. Invalid/ Expired token"})
        }
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = payload;
        console.log("Checking payload and attaching it to the request");
        next();
    } catch (error) {
        console.log("error @userAuth->userAuth.js", error.message)
        return res.status(403).json({message: "Internal Server Error!"})
    }
}