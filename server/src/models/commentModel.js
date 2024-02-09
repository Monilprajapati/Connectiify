import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    owner: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    commentData: String,
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    subComment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    userAvatar: String
}, {
    timestamps: true
});

export const Comment = model("Comment", commentSchema);
