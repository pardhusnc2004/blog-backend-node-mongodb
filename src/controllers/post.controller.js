import { postModel } from '../models/post.model.js';

export const AddPost = (req, res) => {
    try {
        const {userId} = req.userId;
        const {posttitle, postcontent, posttags} = req.body;
        const newPost = new postModel({
            posttitle: posttitle,
            postcontent: postcontent,
            postauthor: userId,
            posttags: posttags
        });
        newPost.save();
        return res.status(201).json({message: "Post creation successful"});
    } catch (error) {
        console.log("error @AddPost-->postController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const UpdatePost = async (req, res) => {
    try {
        const {userId} = req.userId;
        const {postId} = req.params;
        const {posttitle, postcontent, posttags} = req.body;
        const post = await postModel.findOne({postauthor: userId, _id: postId});
        if(!post) {
            return res.status(404).json({message: "Post not found/ invalid"});
        }
        await postModel.findByIdAndUpdate(postId, {posttitle: posttitle, postcontent: postcontent, posttags: posttags});
        return res.status(200).json({message: "Post updated successfully"});
    } catch (error) {
        console.log("error @UpdatePost-->postController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const ListAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find();
        return res.json(posts);
    } catch (error) {
        console.log("error @ListAllPosts-->postController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const ListUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const posts = await postModel.find({postauthor: userId});
        return res.json(posts);
    } catch (error) {
        console.log("error @ListUserPosts-->postController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const DeletePost = async (req, res) => {
    try {
        const {userId} = req.userId;
        const {postId} = req.params;
        const post = await postModel.findOne({postauthor: userId, _id: postId});
        if(!post) {
            return res.status(404).json({message: "Post not found/ invalid"});
        }
        await postModel.findByIdAndDelete(post._id);
        return res.status(200).json({message: "Post deleted successfully"});
    } catch (error) {
        console.log("error @DeletePost-->postController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }    
}