import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    posttitle: {
        type: String,
        required: true,
    },
    postcontent: {
        type: String,
        required: true,
    },
    postauthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    posttags: {
        type: [String],
        default: []
    },
}, { timestamps: true });

export const postModel = mongoose.model('Post', postSchema);