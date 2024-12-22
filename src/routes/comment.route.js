import { Router } from "express";
import { AddComment, UpdateComment, DeleteComment, ListAllComments_Post, ListAllComments_User } from "../controllers/comment.controller.js";
import { userAuth } from "../middlewares/user.auth.js";

const commentRoutes = Router();

commentRoutes.post('/add-comment/:postId', userAuth, AddComment);
commentRoutes.put('/update-comment/:commentId', userAuth, UpdateComment);
commentRoutes.delete('/delete-comment/:commentId', userAuth, DeleteComment);
commentRoutes.get('/list-all-comments-user', userAuth, ListAllComments_User);
commentRoutes.get('/list-all-comments-post/:postId', userAuth, ListAllComments_Post);

export default commentRoutes;