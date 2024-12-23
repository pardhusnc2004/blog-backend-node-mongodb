import { userModel } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateToken } from '../utils/generate.token.js'

export const SignUp = async (req, res) => {
    try {
        const {username, useremail, userpassword} = req.body;
        // user already exists check
        const existingUserEmail = await userModel.findOne({useremail: useremail});
        if(existingUserEmail) {
            return res.status(409).json({message: "User email is already registered. Use a different one or Try logging in"});
        }
        const existingUserName = await userModel.findOne({username: username});
        if(existingUserName) {
            return res.status(409).json({message: "User name already registered. Use a different one or Try logging in"})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(userpassword, salt);
        const newUser = new userModel({
            username: username,
            useremail: useremail,
            userpassword: hashedPassword
        })
        newUser.save();
        generateToken(newUser._id, res);
        return res.status(201).json({message: "User registered successfully", userId: newUser._id});
    } catch (error) {
        console.log("error @SignUp->userController.js", error.message)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const Login = async (req, res) => {
    try {
        const {useremail, userpassword} = req.body;
        const validUser = await userModel.findOne({useremail: useremail});
        if(!validUser) {
            return res.status(404).json({message: "Invalid credentials"});
        }
        const validPassword = await bcryptjs.compare(userpassword, validUser.userpassword);
        if(!validPassword) {
            return res.status(404).json({message: "Invalid credentials"});
        }
        generateToken(validUser._id, res);
        return res.status(200).json({message: "User logged in successfully", userId: validUser._id});
    } catch (error) {
        console.log("error @Login->userController.js", error.message)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const Logout = async (req, res) => {
    try {
        res.cookie('jwt_secret', '', {maxAge: 0});
        return res.status(200).json({message: "User Logged out successfully"});
    } catch (error) {
        console.log("error @Logout->userController.js", error.message)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const Update = async (req, res) => {
    try {
        const { userId } = req.userId;
        const {userpassword} = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(userpassword, salt);
        await userModel.findByIdAndUpdate(userId, {userpassword: hashedPassword});
        return res.status(200).json({message: "Password updated successfully"});
    } catch (error) {
        console.log("error @Update->userController.js", error.message)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const Delete = async (req, res) => {
    try {
        const {userId} = req.userId;
        const deletedUser = await userModel.findByIdAndDelete(userId);
        res.cookie('jwt_secret', '', {maxAge: 0});
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log("error @Delete->userController.js", error.message)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const ListAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json(users.data);
    } catch (error) {
        console.log("error @ListAllUsers->userController.js", error.message)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}