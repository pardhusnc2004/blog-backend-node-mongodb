import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userpassword: {
        type: String, 
        required: true,
    }
}, { timestamps: true });

export const userModel = mongoose.model('User', userSchema);