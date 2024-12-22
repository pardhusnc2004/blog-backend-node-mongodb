import { config } from "dotenv";
config();
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const generateToken = (userId, res) => {
    try {
        const payload = {userId: userId};
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('jwt_secret', token, {
            maxAge: 60*60*1000,
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        console.log("Token generation success");
    } catch (error) {
        console.log("Token generation failed")
    }
}