import { Schema, model } from "mongoose";

const postSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    tag: [],
    image: String,
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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    room: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    userAvatar: String,
    username: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const Post = model('Post', postSchema);