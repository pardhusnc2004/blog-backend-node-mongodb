import { Router } from "express";
import { AddPost, UpdatePost, DeletePost, ListAllPosts } from "../controllers/post.controller.js";
import { userAuth } from "../middlewares/user.auth.js";

const postRoutes = Router();

postRoutes.post('/add-post', userAuth, AddPost);
postRoutes.put('/update-post/:postId', userAuth, UpdatePost);
postRoutes.delete('/delete-post/:postId', userAuth, DeletePost);
postRoutes.get('/list-all-posts', ListAllPosts);

export default postRoutes;