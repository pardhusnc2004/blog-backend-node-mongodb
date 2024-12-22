import { commentModel } from '../models/comment.model.js'

export const AddComment = async (req, res) => {
    try {
        const {userId} = req.userId;
        const {postId} = req.params;
        const {commentcontent} = req.body;
        const newComment = new commentModel({
            commentauthor: userId,
            commentcontent: commentcontent,
            commentpost: postId
        });
        newComment.save();
        return res.status(201).json({message: "Comment added successfully"});
    } catch (error) {
        console.log("error @AddComment-->commentController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const UpdateComment = async (req, res) => {
    try {
        const {userId} = req.userId;
        const {commentId} = req.params;
        const {commentcontent} = req.body;
        const validComment = await commentModel.findOne({commentauthor: userId, _id: commentId});
        if(!validComment) {
            return res.status(404).json({message: "Comment not found/ invalid"});
        }
        await commentModel.findByIdAndUpdate(validComment._id, {commentcontent: commentcontent});
        return res.status(201).json({message: "Comment updated successfully"});
    } catch (error) {
        console.log("error @UpdateComment-->commentController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const DeleteComment = async (req, res) => {
    try {
        const {userId} = req.userId;
        const {commentId} = req.params;
        const validComment = await commentModel.findOne({commentauthor: userId, _id: commentId});
        if(!validComment) {
            return res.status(404).json({message: "Comment not found/ invalid"});
        }
        await commentModel.findByIdAndDelete(validComment._id);
        return res.status(201).json({message: "Comment deleted successfully"});
    } catch (error) {
        console.log("error @DeleteComment-->commentController.js", error.message);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const ListAllComments_User = async (req, res) => {
    try {
        const {userId} = req.userId;
        const comments = await commentModel.find({commentauthor: userId});
        return res.json(comments);
    } catch (error) {
        console.log("error @ListAllComments_User-->commentController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const ListAllComments_Post = async (req, res) => {
    try {
        const {postId} = req.params;
        const comments = await commentModel.find({commentpost: postId});
        return res.json(comments);
    } catch (error) {
        console.log("error @ListAllComments_User-->commentController.js");
        return res.status(500).json({message: "Internal Server Error!"});
    }
}