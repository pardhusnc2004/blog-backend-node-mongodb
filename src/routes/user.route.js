import { Router } from "express"
import { SignUp, Login, Logout, Update, Delete, ListAllUsers } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/user.auth.js";

const userRoutes = Router();

userRoutes.post('/auth/signup', SignUp);
userRoutes.post('/auth/login', Login);
userRoutes.post('/auth/logout', userAuth, Logout);
userRoutes.post('/auth/update-user', userAuth, Update);
userRoutes.get('/users/get-all-users', userAuth, ListAllUsers);
userRoutes.delete('/users/list-user', userAuth, Delete);

export default userRoutes;