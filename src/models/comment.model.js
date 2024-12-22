import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    commentcontent: {
        type: String,
        required: true
    },
    commentauthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentpost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true });

export const commentModel = mongoose.model('Comment', commentSchema);